# Module 9: Final Project - Multi-Tenant WhatsApp SDK

---

## 1. Project Overview

Yeh final module hai — ab tak jo bhi seekha hai (types, arrays, objects/interfaces, functions, loops, OOP, async/await) sab ko combine karke ek real, production-shape multi-tenant WhatsApp SDK ka foundation banayenge, jo Meta ke current (2026) Cloud API architecture ke mutabiq design hoga.

**High-level flow:**

1. **Tenant Onboarding (Embedded Signup)** — Ek naya business SDK ke through onboard hota hai: popup launch → Facebook login → Business Portfolio selection → WABA + phone number selection → OAuth permission grant → Meta ek **short-lived code** return karta hai.
2. **Token Exchange** — SDK us short-lived code ko Meta ke sath exchange karke ek **long-lived access token (BISU token)** haasil karta hai — yeh token us specific tenant ke liye unique hota hai.
3. **Per-Tenant Storage** — Har tenant ka data (`tenantId`, `wabaId`, `phoneNumberId`, `accessToken`, `onboardedAt`) isolated tareeqe se store hota hai — `TenantManager` is storage ko manage karta hai.
4. **Message Sending** — Jab kisi tenant ki taraf se message bhejna ho, uska apna `WhatsAppClient` instance uske apne token/phone-number-id ke sath Meta Graph API ko call karta hai (`POST /{phone-number-id}/messages`).
5. **Webhook Routing** — Meta se incoming events (delivery status, incoming messages) ek nested payload structure mein aate hain; `WebhookRouter` in payloads ko parse karke sahi tenant tak route karta hai.

Yeh architecture ensure karta hai ke sab kuch **tenant-isolated** ho — koi bhi do tenants ka data ya token kabhi mix na ho.

---

## 2. Architecture Plan

Neeche woh core building blocks hain jo poore SDK ka structure banate hain (abhi sirf role samajhna hai, code Step-by-Step section mein likhenge):

**a) `Tenant` / `WABAAccount` interface**
Har tenant ka data shape define karta hai: `tenantId`, `wabaId`, `phoneNumberId`, `accessToken`, `onboardedAt`. Yeh poore SDK mein baar baar reuse hoga (Module 4 concept).

**b) `TenantManager` class**
Sab tenants ko internally store (Map-based) karta hai, add/get/remove operations provide karta hai, aur ek important business rule enforce karta hai: **rolling 7-din window mein sirf 10 naye business customers onboard ho sakte hain**. Isliye yeh class onboarding timestamps bhi track karta hai (Module 7: OOP + Module 6: date/array logic).

**c) `WhatsAppClient` class**
Ek specific tenant ke liye messages bhejne ka zimmedar hai — apne private token ka use karke Meta Graph API ke sahi endpoint ko call karta hai (Module 7 + Module 8: async).

**d) `MessageBuilder`**
Text, template, ya media message ka correct JSON payload banata hai — jaisa Meta Graph API expect karta hai (Module 4: interfaces for payload shape, Module 7: abstract class pattern).

**e) `WebhookRouter`**
Meta se aane wale nested webhook payload (`entry[].changes[].value`) ko parse karta hai, usme se `phone_number_id` nikal ke pehchan-ta hai ke yeh event kis tenant ka hai, aur sahi `WhatsAppClient`/tenant record tak route karta hai (Module 3: array/nested data traversal).

**f) `TokenExchangeService`**
Embedded Signup se mile short-lived OAuth code ko Meta ke token endpoint se exchange karke long-lived token haasil karta hai — yeh async operation hai (Module 8).

---

## 3. Step-by-Step Build Problems

**Problem A — Tenant Interface:** `WABAAccount` interface define karo jisme `tenantId` (readonly string), `wabaId` (string), `phoneNumberId` (string), `accessToken` (string), aur `onboardedAt` (Date ya number timestamp) properties hon.
*Concepts used:* Module 1 (types), Module 4 (interfaces).

*Example pattern:*
```typescript
interface Subscription {
  readonly subId: string;
  planId: string;
  startedAt: number;
}
```

**Problem B — TenantManager with Onboarding Limit:** `TenantManager` class banao jisme `private tenants: Map<string, WABAAccount>` ho. `onboardTenant()` method banao jo naya tenant add karne se pehle check kare ke pichle 7 dinon mein kitne tenants onboard hue hain (`onboardedAt` timestamps array filter karke) — agar 10 se kam hain to allow karo, warna reject karo.
*Concepts used:* Module 3 (filter), Module 6 (date/loop logic), Module 7 (class, private storage).

*Example pattern:*
```typescript
class RateLimitedRegistry {
  private records: { id: string; addedAt: number }[] = [];

  canAddNew(windowDays: number, maxAllowed: number): boolean {
    const cutoff = Date.now() - windowDays * 24 * 60 * 60 * 1000;
    const recent = this.records.filter(r => r.addedAt > cutoff);
    return recent.length < maxAllowed;
  }
}
```

**Problem C — MessageBuilder for Text & Template Messages:** `MessageBuilder` class (ya abstract class + subclasses) banao jo `buildTextMessage(to: string, body: string)` aur `buildTemplateMessage(to: string, templateName: string, lang: string)` methods provide kare, jo Meta ke expected JSON shape return karein (`messaging_product: "whatsapp"`, `to`, `type`, aur type-specific fields).
*Concepts used:* Module 4 (interfaces for payload shape), Module 7 (class/abstract pattern).

*Example pattern:*
```typescript
interface GraphPayload {
  messaging_product: "whatsapp";
  to: string;
  type: string;
}

function buildBasicPayload(to: string, type: string): GraphPayload {
  return { messaging_product: "whatsapp", to, type };
}
```

**Problem D — WhatsAppClient async sendMessage:** `WhatsAppClient` class mein `async sendMessage(payload: GraphPayload): Promise<{ success: boolean }>` method banao jo `fetch()` se `https://graph.facebook.com/v20.0/{phoneNumberId}/messages` (POST) ko apne private token ke sath call kare — `try/catch` ke sath.
*Concepts used:* Module 7 (private token), Module 8 (async/await, fetch, error handling).

*Example pattern:*
```typescript
class ApiSender {
  constructor(private token: string, private endpointId: string) {}

  async post(payload: object): Promise<boolean> {
    try {
      const res = await fetch(`https://api.example.com/${this.endpointId}/send`, {
        method: "POST",
        headers: { Authorization: `Bearer ${this.token}` },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
```

**Problem E — WebhookRouter:** Ek function ya class banao jo incoming webhook body (`{ entry: [{ changes: [{ value: { metadata: { phone_number_id: string }, messages?: any[], statuses?: any[] } }] }] }`) leta hai, `phone_number_id` nikalta hai, aur `TenantManager` se us `phoneNumberId` wale tenant ko dhund ke us tenant ke record ko event pass karta hai.
*Concepts used:* Module 3 (nested array traversal), Module 4 (interfaces for webhook shape), Module 5 (higher-order function passing handler).

*Example pattern:*
```typescript
interface WebhookBody {
  entry: { changes: { value: { metadata: { phone_number_id: string } } }[] }[];
}

function extractPhoneNumberId(body: WebhookBody): string | undefined {
  return body.entry[0]?.changes[0]?.value.metadata.phone_number_id;
}
```

**Problem F — TokenExchangeService:** Ek `async exchangeCodeForToken(shortLivedCode: string): Promise<string>` method banao jo (simulate karke) short-lived OAuth code ko Meta ke token endpoint ko `fetch` karke long-lived token mein exchange kare, aur `try/catch` se error handle kare.
*Concepts used:* Module 8 (async/await, fetch, typed return `Promise<string>`).

*Example pattern:*
```typescript
async function exchangeToken(code: string): Promise<string> {
  const res = await fetch(`https://oauth.example.com/token?code=${code}`);
  const data: { access_token: string } = await res.json();
  return data.access_token;
}
```

**Problem G — Rate Limit Tracker:** Ek class ya function banao jo per-tenant daily message count track kare (`Map<tenantId, count>`), aur ek `canSendMessage(tenantId, isVerifiedBusiness: boolean): boolean` method de jo check kare ke count `250` (unverified) ya `100000` (verified) se kam hai ya nahi.
*Concepts used:* Module 2 (comparison operators), Module 3/7 (Map-based tracking in a class).

*Example pattern:*
```typescript
class DailyLimiter {
  private counts: Map<string, number> = new Map();

  canProceed(id: string, limit: number): boolean {
    const current = this.counts.get(id) ?? 0;
    return current < limit;
  }
}
```

---

## 4. Final Integration Challenge

Ab sab kuch combine karo ek poore flow mein — yeh ek bada, multi-step problem hai jisme upar wale sab pieces milke kaam karenge:

**Scenario:** Ek naya business BotAura pe onboard hona chahta hai.

1. Embedded Signup complete hone ke baad `TokenExchangeService` (Problem F) us short-lived code ko exchange kare aur long-lived token haasil kare.
2. `TenantManager` (Problem B) us naye tenant ko `WABAAccount` (Problem A) shape mein store kare — lekin pehle 7-din rolling limit check kare.
3. `MessageBuilder` (Problem C) se ek template message ka payload banao (jaise welcome message).
4. `WhatsAppClient` (Problem D) us tenant ke apne token se async message send kare.
5. Kuch der baad Meta se ek webhook aata hai delivery status ke sath — `WebhookRouter` (Problem E) us payload ko parse kare, sahi tenant identify kare, aur us tenant ke message record ka status update kare (jaise "sent" → "delivered").

Poora flow ek `async function onboardAndSendWelcome(shortLivedCode: string, templateName: string): Promise<void>` ke andar likho jo upar ke sab steps ko sequence mein call kare, aur har step pe proper error handling (`try/catch`) ho taake agar koi step fail ho (jaise rate limit exceed, ya token exchange fail), poora system crash na ho balke graceful error return kare.

*Hint:* is problem ka koi single "sample" nahi diya ja raha — yeh tumhara integration exercise hai jisme tumhe upar ke sab patterns ko khud jodna hai.

---

## 5. Key Takeaways & Next Steps

**Poore course ka summary:**
- Module 1-2 ne foundation di: types, operators, casting — yeh sab kuch ka base hai.
- Module 3-4 ne data ko structure karna sikhaya: arrays aur interfaces se real-world entities (jaise `Tenant`, `Message`) represent karna.
- Module 5-6 ne logic likhna sikhaya: functions, higher-order functions, generics, aur loops se data process karna.
- Module 7 ne architecture di: OOP se isolated, reusable components (`WhatsAppClient`, `TenantManager`) banana.
- Module 8-9 ne sab ko real-world async, multi-tenant, aur production-shape system mein combine kiya — jahan network calls, parallel processing, aur webhook routing sab milke kaam karte hain.

**Age kya seekhna chahiye (SDK ko production-ready banane ke liye):**
- **Rate limiting libraries** — apna khud ka limiter likhne ki bajaye battle-tested libraries (jaise `bottleneck`) explore karo bade scale ke liye.
- **Retry/backoff logic** — jab Meta API temporarily fail ho (network issue, rate limit hit), exponential backoff ke sath retry karna seekho.
- **Database persistence** — abhi tenants in-memory (`Map`) mein store ho rahe hain; production mein yeh ek real database (Postgres, MongoDB) mein jana chahiye.
- **Webhook signature verification** — Meta webhooks ko cryptographically verify karna zaroori hai (security) taake fake/spoofed webhooks accept na hon.
- **Open-source packaging** — SDK ko `npm publish` ke liye ready karna: proper `package.json`, TypeScript declaration files (`.d.ts`), README, aur semantic versioning.