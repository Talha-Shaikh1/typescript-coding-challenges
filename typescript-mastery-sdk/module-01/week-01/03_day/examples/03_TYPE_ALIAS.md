# 🟢 Example 3 Explained — Type Aliases (Easy Version)

Same pattern — section by section todke samjha raha hoon.

---

## 1️⃣ Problem Jo Type Alias Solve Karta Hai

```typescript
let user1: { name: string; age: number; email: string } = {
  name: "Ali", age: 25, email: "ali@example.com"
};
```

Ye poora shape `{ name: string; age: number; email: string }` agar tumhe **10 jagah** likhna pade, to:
1. Bohot lamba code
2. Agar kal `phone` field add karni ho, to 10 jagah jaake change karna padega

```typescript
type User = { name: string; age: number; email: string };
let user2: User = { name: "Ahmed", age: 30, email: "ahmed@example.com" };
```

Ab bas ek jagah `User` define kiya, jahan bhi zaroorat ho `User` likh do. Kal shape change karni ho to **sirf ek jagah** badlni hai.

> **Ek line mein yaad rakho:** Type alias = "shape ka naam" — jaise `User` ka naam sunte hi pata chal jaye iske andar `name, age, email` honge.

---

## 2️⃣ Primitive Type Aliases

```typescript
type UserID = string;
type Age = number;
type IsActive = boolean;
```

Ye thoda ajeeb lag sakta hai — `UserID` to bas `string` hi hai na? Haan technically, lekin isse **code padhna asaan** ho jata hai:

```typescript
let userId: UserID = "user_12345";   // turant samajh aata hai ye kya hai
let userId: string = "user_12345";   // ye bhi sahi hai, lekin kam meaningful
```

Jab tumhare function signatures lambe hote hain (jaise `sendMessage(to: PhoneNumber, id: MessageID)`), `PhoneNumber` aur `MessageID` dono `string` hi hain lekin naam se turant samajh aata hai kaunsa parameter kya hai — ghalti se swap karne ka chance kam ho jata hai (documentation jaisa kaam bhi kar deta hai).

---

## 3️⃣ Union Type Aliases

```typescript
type Status = "pending" | "success" | "error";
type ID = string | number;
```

Ye Day 03 se yaad hoga — `|` (pipe) ka matlab **"ya to ye, ya wo"**. `Status` sirf inn 3 exact strings mein se koi ek ho sakta hai, kuch aur likha (jaise `"done"`) to error aayega.

```typescript
let currentStatus: Status = "pending";  // ✅ sahi
// let wrong: Status = "completed";     // ❌ Error — ye value list mein nahi
```

**Kyun useful hai?** Typos pakadta hai. Agar tum ne kahin `"pendign"` likh diya (typo), TypeScript turant bata dega — plain `string` type ke sath ye possible nahi hota.

---

## 4️⃣ Array & Tuple Type Aliases — Revision

```typescript
type PhoneNumbers = string[];
type Coordinate = [number, number];
```

Ye Day 03 wali cheez hai bas ab poore example mein use ho rahi hai — array/tuple ko bhi naam de sakte ho, exact wahi jo pehle Arrays aur Tuples wale guides mein dekha.

---

## 5️⃣ Function Type Aliases — Ye Naya Hai

```typescript
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;
```

Ye ek **"function ka shape"** define kar raha hai: *"do numbers lo, ek number wapis do"*. Jo bhi function is shape ko follow karega, wo `MathOperation` type ka ban sakta hai.

**Fayda:** Agar tumhare SDK mein 5 alag callback functions hain jo sab `(text: string) => string` shape follow karte hain (jaise message transformers — uppercase, lowercase, trim, etc.), to har jagah poora signature likhne ke bajaye ek naam `StringTransformer` use kar sakte ho. Jab kal iska shape change karna ho, **ek hi jagah** badlega.

> **Analogy:** Ye aisa hai jaise ek job description likh do ("2 number lo, 1 number do"), phir jo bhi employee (function) is description ko follow kare use hire kar sakte ho.

---

## 6️⃣ Complex Nested Types — Types Ko Types Ke Andar Use Karna

```typescript
type MessagePayload = {
  to: string;
  type: MessageType;      // 👈 ek type dusre type ke andar use ho raha hai
  content: string;
  timestamp: number;
};

type APIResponse = {
  success: boolean;
  data?: MessagePayload;  // 👈 yahan bhi
  error?: string;
};
```

Ye sabse important concept hai iss example ka: **types apas mein combine ho sakte hain**, jaise LEGO blocks. `MessageType` chhota union hai, `MessagePayload` usko istemal karta hai, `APIResponse` `MessagePayload` ko istemal karta hai.

`data?:` mein `?` ka matlab optional hai (Day 03 se yaad hoga) — matlab **success response mein `data` hoga, error response mein nahi** (dekho `errorResponse` mein `data` diya hi nahi gaya):

```typescript
let successResponse: APIResponse = { success: true, data: textMessage };
let errorResponse: APIResponse = { success: false, error: "Invalid phone number" };
```

Dono valid hain kyunke `data` aur `error` dono optional (`?`) the.

---

## 7️⃣ SDK Types — Ye Tumhare BotAura Ke Liye Blueprint Hai

```typescript
type PhoneNumber = string;
type MessageID = string;
type Timestamp = number;
type MessageStatus = "queued" | "sent" | "delivered" | "read" | "failed";

type WhatsAppMessage = {
  id: MessageID;
  to: PhoneNumber;
  text: string;
  status: MessageStatus;
  sentAt: Timestamp;
};
```

Dekho kaise sab kuch layer by layer bana hai:
1. Chhote primitive aliases (`PhoneNumber`, `MessageID`, `Timestamp`) — **naming clarity** ke liye
2. Union type (`MessageStatus`) — **fixed valid values** ke liye
3. Bada object type (`WhatsAppMessage`) — jo upar wale sabko combine karta hai

Ye exact wahi tareeqa hai jaise tumhe apna **multi-tenant SDK** structure karna chahiye: chhote building-block types banao, phir unko combine karke bade types banao. Ek dam se ek bada complex type mat likho — LEGO blocks ki tarah piece by piece.

```typescript
type ClientConfig = {
  accessToken: string;
  phoneNumberId: string;
  maxRetries?: number;
  enableLogging?: boolean;
};
```

Ye tumhare per-tenant config ka **exact pattern** hai jo tumne pehle discuss kiya tha (BISU token model). Har tenant ka apna `ClientConfig` hoga is shape ka.

---

## 🧠 Poore Example Ka Ek Line Summary

| Part | Kya sikhaya |
|---|---|
| Object type alias | Repeated shape ko ek naam do |
| Primitive alias | `UserID = string` — clarity ke liye, safety ke liye nahi |
| Union alias | Fixed set of valid values, typo-proof |
| Function type alias | Function ka "shape"/contract define karna |
| Nested types | Types ko types ke andar combine karna (LEGO blocks) |
| SDK layering | Chhote types se bade types banao, ek sath nahi |

---

## 🏋️ Practice Set (Khud Karna Hai — Solutions Nahi Diye)

### Practice 1 — Basic object alias
`type Tenant` banao jisme `wabaId: string`, `businessName: string`, `isVerified: boolean` ho. Do tenant objects banao isi type ke.

### Practice 2 — Union alias
`type WebhookEventType = "message" | "status" | "error"` banao. Function `logEvent(type: WebhookEventType)` likho jo har type ke liye alag console message print kare.

### Practice 3 — Function type alias
`type Validator = (input: string) => boolean` banao. Do functions banao is type ke: `isValidPhone` aur `isValidEmail` (apni marzi ki simple logic use karo, jaise `.includes('@')` email ke liye).

### Practice 4 — Nested types (Bonus)
`type Tenant` (Practice 1 wala) ko use karke `type TenantListResponse` banao jisme:
- `success: boolean`
- `tenants?: Tenant[]` (optional array of tenants)
- `error?: string`

Phir ek success response aur ek error response object banao.

### Practice 5 — SDK layering (Mushkil)
Apne BotAura SDK ke liye socho aur banao:
1. `type WABAId = string` aur `type AccessToken = string` (primitive aliases)
2. `type TenantConfig` jo dono ko use kare + ek optional `webhookUrl?: string`
3. `type SDKInstance` jisme `tenants: TenantConfig[]` aur ek function type `getTenant: (id: WABAId) => TenantConfig | undefined`

---

## ✅ Self-Check

- [ ] Object type alias kyun zaroori hai (repetition + maintainability) samajh aa gaya
- [ ] Primitive alias (`type UserID = string`) ka fayda pata hai — clarity, safety nahi
- [ ] Function type alias khud likh sakta hoon
- [ ] Nested types (type ke andar type) ka concept clear hai
- [ ] Saare 5 practice questions try kiye

Complete ho jaye to code bhej dena — review karenge. Phir tumhare BotAura SDK ke asli types (Practice 5 jaisa, real scale pe) design karna shuru karenge. 💪