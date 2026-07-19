# Module 1: Variables & Data Types

---

## 1. Concept Explanation

**Variables kya hote hain?**
Variable ek "container" hai jo data store karta hai — chahe woh number ho, text ho, ya kuch aur. JavaScript mein aap koi bhi variable mein koi bhi type ka data daal sakte hain, aur baad mein woh type change bhi kar sakta hai. Yehi flexibility kabhi kabhi bugs ka sabab banti hai — especially bade projects mein jaise ek SDK jo multiple tenants (businesses) ko handle kare.

**TypeScript ka fayda — Static Typing:**
TypeScript, JavaScript ka "superset" hai jo **static typing** add karta hai. Iska matlab: aap variable banate waqt uska type fix kar dete hain (ya TypeScript khud guess kar leta hai), aur agar aap galat type ka data assign karne ki koshish karein, toh TypeScript aapko **code likhte waqt hi** error de deta hai — app run karne se pehle, browser mein crash hone se pehle.

Socho: aap BotAura ke SDK mein `phoneNumber` ek variable rakhte hain jo hamesha `string` hona chahiye. Agar koi galti se usme `number` ya `undefined` daal de, JavaScript chup chap chalta rahega (aur baad mein WhatsApp API call fail hogi, error samajh nahi aayega). Lekin TypeScript aapko turant bata dega: *"Type 'number' is not assignable to type 'string'"* — code editor mein hi, red underline ke sath.

**Simple comparison:**

| | JavaScript | TypeScript |
|---|---|---|
| Type checking | Runtime pe (jab code chalta hai) | Compile-time pe (code likhte waqt) |
| Errors kab pakde jaate hain | Late — production mein bhi ho sakta hai | Early — editor mein hi |
| Multi-tenant SDK ke liye | Risky, kyunki types guarantee nahi | Safe, kyunki har tenant ka data shape fixed hota hai |

Chunki aap ek SDK bana rahe hain jo **multiple businesses (tenants)** use karengi, static typing bohot zaroori hai — kyunki agar ek tenant ka data shape doosre se mismatch ho jaye, TypeScript aapko development ke dauran hi warn kar dega.

---

## 2. Syntax & Methods

### `let`, `const`, `var`

```typescript
let messageCount = 5;       // value change ho sakti hai
const apiKey = "abc123";    // value fix hai, change nahi ho sakti
var oldStyle = "avoid this"; // purana tareeqa, avoid karo
```

- `let` — variable jiski value **badal sakti hai**. Roman Urdu: "yeh naya standard hai jab value change honi ho."
- `const` — variable jiski value **fix rehti hai** (reassign nahi ho sakti). Roman Urdu: "jab value kabhi change nahi hogi, hamesha `const` use karo — jaise API keys, config values."
- `var` — purana JavaScript tareeqa, **avoid karo**. Roman Urdu: "`var` ka scope function-level hota hai, jabke `let`/`const` ka block-level — isliye `var` bugs create karta hai (especially loops aur conditions mein)."

**`let` vs `const` vs `var` comparison:**

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function-level | Block-level | Block-level |
| Reassignment | ✅ Allowed | ✅ Allowed | ❌ Not allowed |
| Redeclaration | ✅ Allowed | ❌ Not allowed | ❌ Not allowed |
| Modern code mein use | ❌ Avoid karo | ✅ Use karo | ✅ Preferred |

---

### Basic Types: `string`, `number`, `boolean`, `null`, `undefined`

```typescript
let businessName: string = "Karachi Electronics";
let messageLimit: number = 1000;
let isVerified: boolean = true;
let lastError: null = null;
let webhookUrl: undefined = undefined;
```

- `string` — text data. Roman Urdu: "koi bhi text — naam, phone number (as text), message body."
- `number` — integer ya decimal, dono ke liye ek hi type. Roman Urdu: "JavaScript ki tarah, TypeScript mein bhi int aur float alag nahi hain."
- `boolean` — sirf `true` ya `false`. Roman Urdu: "flags ke liye use hota hai, jaise `isVerified`, `isActive`."
- `null` — jaan-boojh kar "koi value nahi" batana. Roman Urdu: "matlab value intentionally empty hai."
- `undefined` — variable declare hua lekin abhi tak koi value assign nahi hui. Roman Urdu: "matlab value abhi set hi nahi hui."

---

### Array Typing: `string[]`, `number[]`

```typescript
let tenantNames: string[] = ["BotAura Client A", "BotAura Client B"];
let retryDelays: number[] = [1000, 2000, 5000];
```

- `Type[]` syntax batata hai ke array ke andar **sirf usi type ke elements** allowed hain. Roman Urdu: "agar array `string[]` hai, toh usme number daalne ki koshish karoge toh error aayega."

---

### Tuples: `[number, number]`

```typescript
let coordinates: [number, number] = [24.8607, 67.0011]; // lat, long
let statusCode: [number, string] = [200, "OK"];
```

- Tuple ek **fixed-length array** hai jisme har position ka type pehle se fixed hota hai. Roman Urdu: "array jaisa hi hai, lekin har index ka type aur order strictly defined hota hai — jaise `[number, string]` ka matlab pehla element number, doosra string hi hona chahiye."

---

### Union Types: `"sent" | "delivered" | "read"`

```typescript
let messageStatus: "sent" | "delivered" | "read" = "sent";
let responseType: string | number = "success";
```

- Union type batata hai ke variable **in listed values/types mein se koi ek** ho sakta hai, aur kuch nahi. Roman Urdu: "jab aapko pata ho ke value ke sirf limited possible options hain (jaise WhatsApp message status), toh union type use karo — yeh typos aur invalid values se bachata hai."

---

### `any` vs `unknown` ka farak

```typescript
let dataA: any = "hello";
dataA = 42;           // koi error nahi — any kuch bhi accept karta hai
dataA.toUpperCase();  // koi error nahi, chahe yeh crash kar sakta hai

let dataB: unknown = "hello";
dataB = 42;                // koi error nahi
// dataB.toUpperCase();    // ERROR! Pehle type check karna zaroori hai

if (typeof dataB === "string") {
  dataB.toUpperCase(); // ab safe hai, kyunki type confirm ho gaya
}
```

**`any` vs `unknown` comparison:**

| | `any` | `unknown` |
|---|---|---|
| Type safety | Bilkul off — kuch bhi allowed | On — pehle type check karna padta hai |
| Methods call karna | Bina check ke allowed (risky) | Sirf type-check ke baad allowed |
| Kab use karo | Bohot rarely, jab type track karna impossible ho | Jab external/unpredictable data ho (jaise API response) |

Roman Urdu: "`any` matlab TypeScript ka safety net poora hata dena. `unknown` matlab safety net rakhna, lekin variable use karne se pehle uska asli type confirm karna — jaise jab WhatsApp API se webhook data aaye jiska shape pata na ho."

---

### Object Type Annotations: `{ name: string; phone: string }`

```typescript
let contact: { name: string; phone: string } = {
  name: "Ali Khan",
  phone: "+923001234567"
};
```

- Object ke andar har property ka type define karna. Roman Urdu: "batata hai ke object mein exactly kaunse fields hain aur unka type kya hai — agar koi field missing ho ya galat type ho, TypeScript turant error dega."

---

### Type Inference vs Type Annotation

```typescript
// Type Inference — TypeScript khud samajh leta hai
let city = "Karachi"; // TypeScript ne khud "string" infer kar liya

// Type Annotation — aap khud batate ho
let country: string = "Pakistan";
```

- **Inference:** jab aap value assign karte ho, TypeScript khud type figure kar leta hai. Roman Urdu: "kam likhna padta hai, lekin sirf tab kaam karta hai jab value turant assign ho rahi ho."
- **Annotation:** jab aap explicitly type likhte ho. Roman Urdu: "zaroori hai jab variable declare karte waqt value na ho (jaise function parameters), ya jab aap chahte ho ke type clearly documented ho."

**Kab kya use karo:** Agar value turant mil rahi hai, inference pe chhod do. Agar value baad mein aayegi, ya function ka parameter/return type hai, toh annotation zaroor likho.

---

### `readonly` aur `enum`

```typescript
// readonly — value ek baar set hone ke baad change nahi ho sakti
interface TenantConfig {
  readonly tenantId: string;
  apiLimit: number;
}

// enum — named constants ka group
enum MessageStatus {
  Sent = "SENT",
  Delivered = "DELIVERED",
  Read = "READ",
  Failed = "FAILED"
}

let status: MessageStatus = MessageStatus.Sent;
```

- `readonly` — object property jo initialize hone ke baad **kabhi change nahi ho sakti**. Roman Urdu: "jaise `const` hai variables ke liye, waise `readonly` hai object properties ke liye."
- `enum` — related constants ka ek named set. Roman Urdu: "jab aapke paas fixed options ka group ho (jaise message status types), enum unhe ek jagah organize karta hai aur readable naam deta hai — union type ka alternative, lekin zyada structured."

---

## 3. Practice Problems (Sirf Variables & Types)

Neeche har problem ke sath ek **similar pattern ka example** diya gaya hai — apna khud ka solution likho.

**Problem 1:** Ek `const` variable banao jo aapki SDK ka version number (string, jaise `"1.0.0"`) store kare.

*Example pattern:*
```typescript
const libraryName: string = "axios";
```

**Problem 2:** Ek `let` variable banao jo `number` type ka ho aur retry attempts count kare (start 0 se).

*Example pattern:*
```typescript
let attemptCount: number = 0;
```

**Problem 3:** Ek array banao `boolean[]` type ka jo 5 tenants ke active/inactive status store kare.

*Example pattern:*
```typescript
let notificationFlags: boolean[] = [true, false, true];
```

**Problem 4:** Ek tuple banao jo `[string, number]` type ka ho — pehla element error message, doosra error code.

*Example pattern:*
```typescript
let userInfo: [string, number] = ["Ahmed", 25];
```

**Problem 5:** Ek union type variable banao jiski value sirf `"active"`, `"paused"`, ya `"cancelled"` ho sakti hai.

*Example pattern:*
```typescript
let orderStatus: "pending" | "shipped" | "cancelled" = "pending";
```

**Problem 6:** Ek object type annotation likho jisme `id: number`, `email: string`, aur `isPremium: boolean` fields hon, phir usme values assign karo.

*Example pattern:*
```typescript
let product: { title: string; price: number; inStock: boolean } = {
  title: "Laptop",
  price: 50000,
  inStock: true
};
```

**Problem 7:** Ek `enum` banao `LogLevel` naam ka jisme `Info`, `Warning`, aur `Error` values hon, phir ek variable us enum type ka banao.

*Example pattern:*
```typescript
enum Theme {
  Light = "LIGHT",
  Dark = "DARK"
}
let currentTheme: Theme = Theme.Light;
```

---

## 4. Mixed Real-World Problems (BotAura / WhatsApp Context)

**Problem 1:** Ek `enum` banao `WABAStatus` naam ka jo WhatsApp Business Account ke possible statuses represent kare: `Verified`, `Pending`, `Rejected`, `Suspended`. Phir ek variable us enum type ka declare karo current account status store karne ke liye.

*Example pattern:*
```typescript
enum SubscriptionPlan {
  Free = "FREE",
  Pro = "PRO",
  Enterprise = "ENTERPRISE"
}
let currentPlan: SubscriptionPlan = SubscriptionPlan.Free;
```

**Problem 2:** Ek object type annotation banao `Contact` shape ke liye jisme `name: string`, `phoneNumber: string`, aur `isBlocked: boolean` fields hon. Phir ek sample contact object banao.

*Example pattern:*
```typescript
let session: { userId: string; deviceId: string; isOnline: boolean } = {
  userId: "u_9081",
  deviceId: "dev_223",
  isOnline: true
};
```

**Problem 3:** Ek union type banao `PhoneCountryCode` naam ka jo sirf `"+92" | "+1" | "+44"` values allow kare (Pakistan, US, UK). Phir ek variable declare karo is type ka.

*Example pattern:*
```typescript
type Currency = "PKR" | "USD" | "EUR";
let paymentCurrency: Currency = "PKR";
```

---

## 5. Key Takeaways

- TypeScript static typing deta hai jo errors ko **runtime se pehle, compile-time pe hi** pakad leta hai — multi-tenant SDK ke liye yeh bohot valuable hai.
- `let` aur `const` use karo, `var` avoid karo — `const` default choice honi chahiye jab tak value change nahi honi.
- Union types (`"sent" | "delivered"`) aur `enum` dono fixed/limited values represent karne ke kaam aate hain — union types lightweight hain, `enum` zyada structured aur named hai.
- `any` type safety poori tarah off kar deta hai — jab bhi possible ho, `unknown` use karo taake external ya unpredictable data (jaise WhatsApp webhook payloads) safely handle ho sake.
- Type inference use karo jab value turant assign ho rahi ho; explicit type annotation likho jab type clear karna zaroori ho (jaise function parameters ya empty declarations).