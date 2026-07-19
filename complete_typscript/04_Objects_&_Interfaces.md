# Module 4: Objects & Interfaces

---

## 1. Concept Explanation

Objects wo structures hain jisme related data key-value pairs ki shakal mein store hota hai — jaise ek WhatsApp message ka `to`, `type`, `timestamp` sab ek object mein hote hain. Module 1 mein humne basic object type annotations dekhi thi (`{ name: string }` type ka style), lekin jab objects complex ho jate hain — nested properties, optional fields, reusable shapes — to inline annotations likhna repetitive aur messy ho jata hai.

Yahan **interface** kaam aati hai. Interface basically ek **blueprint/contract** hoti hai jo batati hai ke ek object ka shape kaisa hona chahiye — kaunse properties honi chahiye, unka type kya hai. Ek baar interface define kar lo to usko baar baar reuse kar sakte ho.

**Interface vs Type Alias ka farak:** Dono se tum object ka shape define kar sakte ho, aur zyada tar cases mein yeh interchangeable hain. Lekin kuch differences hain:

- `interface` sirf objects/classes ke shape define karne ke liye hoti hai, aur usko baad mein **extend** kiya ja sakta hai ya **merge** (same naam se dobara declare karo to properties add ho jati hain).
- `type` zyada flexible hai — objects ke ilawa union types, tuples, primitives sab ke liye use ho sakta hai, lekin ek baar declare hone ke baad usko dobara declare karke merge nahi kar sakte.

General convention: agar sirf ek object shape define kar rahe ho jo extend hoga, `interface` use karo. Agar union types ya complex combinations chahiye, `type` use karo.

### Multi-Tenant Systems mein Interfaces kyun critical hoti hain

Tumhare open-source SDK mein ek hi codebase multiple businesses (tenants) ko serve karega — har tenant ka apna `accessToken`, `wabaId`, `phoneNumberId` hoga. Agar in sab ka shape strict interface se define na kiya jaye to bohat risky ho sakta hai:

- **Data isolation:** Agar `Tenant` interface strictly define ho, to compiler khud ensure karega ke kisi tenant ka object galti se dusre tenant ke required fields miss na kare (jaise accidentally `accessToken` undefined reh jaye aur wo kisi aur tenant ka message bhej de).
- **Consistent shape across tenants:** Chahe tumhare paas 5 tenants hon ya 5000, sab `Tenant` interface follow karenge — matlab jahan bhi tenant object process ho raha hai (billing, message sending, webhook handling), sab jagah same guaranteed structure milega.
- **Runtime bugs prevent hote hain compile-time pe hi** — agar kisi function ko `Tenant` object chahiye aur tum galti se incomplete object pass karo (jaise `wabaId` missing), TypeScript turant error de dega, production mein jane se pehle hi.

Isliye multi-tenant SDK design mein interfaces sirf "good practice" nahi, balke **security aur reliability ka bunyadi hissa** hain.

---

## 2. Syntax & Methods

### Object Creation aur Nested Objects

```typescript
const user: { name: string; age: number } = { name: "Ali", age: 25 };

const contact: { name: string; address: { city: string; country: string } } = {
  name: "Sara",
  address: { city: "Karachi", country: "Pakistan" }
};
```

### Interface Declaration Syntax

```typescript
interface User {
  name: string;
  age: number;
}

const user: User = { name: "Ali", age: 25 };
```
> `interface` ek naam ke sath object ka shape define karti hai — code reusable aur readable ban jata hai.

### Optional Properties (`?`)

```typescript
interface Message {
  to: string;
  caption?: string; // yeh property hona zaroori nahi
}

const msg1: Message = { to: "923001234567" };
const msg2: Message = { to: "923001234567", caption: "Hi" };
```
> `?` lagane se property optional ho jati hai — object bina us field ke bhi valid rahega.

### Readonly Properties

```typescript
interface Waba {
  readonly wabaId: string;
  status: string;
}

const waba: Waba = { wabaId: "waba_123", status: "active" };
// waba.wabaId = "waba_999"; // Error — readonly property reassign nahi ho sakti
```
> `readonly` property ko object banne ke baad change hone se rok deta hai — multi-tenant SDK mein `tenantId` ya `wabaId` jaisi identity fields ke liye yeh bohat zaroori hai.

### Extending Interfaces

```typescript
interface BaseMessage {
  to: string;
  timestamp: number;
}

interface TextMessage extends BaseMessage {
  type: "text";
  body: string;
}

const tm: TextMessage = { to: "923001234567", timestamp: 123456, type: "text", body: "Hello" };
```
> `extends` se ek interface dusri interface ki saari properties inherit kar leti hai — multi-tenant SDK mein `BaseTenant` se `PremiumTenant` jaisi cheezein banane ke liye yeh perfect pattern hai.

### Object Methods

```typescript
const template = { name: "welcome", lang: "en", status: "approved" };

Object.keys(template);
Object.values(template);
Object.entries(template);

const updated = Object.assign({}, template, { status: "rejected" });
const merged = { ...template, status: "rejected" };
```

| Method | Kaam (Roman Urdu) |
|---|---|
| `Object.keys()` | Object ki sab keys ka array deta hai |
| `Object.values()` | Object ki sab values ka array deta hai |
| `Object.entries()` | Key-value pairs ka array deta hai (loops ke liye useful) |
| `Object.assign()` | Objects ko merge karta hai (target ko mutate bhi kar sakta hai) |
| `{...obj}` (spread) | Object ko copy/merge karne ka modern tareeqa, original safe rehta hai |

### Type Alias (`type` keyword)

```typescript
type Status = "sent" | "delivered" | "read" | "failed";

type MessagePayload = {
  to: string;
  status: Status;
};

const payload: MessagePayload = { to: "923001234567", status: "sent" };
```
> `type` ek naam de deta hai kisi bhi type ko — object shapes ke ilawa unions, tuples waghera ke liye bhi use hota hai.

### Interface vs Type — Comparison Table

| Feature | `interface` | `type` |
|---|---|---|
| Object shape define karna | Haan | Haan |
| Union types (`"a" \| "b"`) | Nahi | Haan |
| Extend/inherit karna | `extends` keyword se | Intersection (`&`) se possible |
| Same naam se dobara declare (merge) | Automatically merge ho jati hai | Error — duplicate declaration |
| Primitives/tuples ko naam dena | Nahi | Haan |
| Convention | Objects/classes ke shape ke liye (jaise `Tenant`, `Message`) | Unions, complex/combined types ke liye (jaise `Status`, `TenantPlan`) |

---

## 3. Practice Problems (Sirf Module 4 ka topic)

**Problem 1 (Easy):** Ek `Product` interface banao jisme `id` (number) aur `name` (string) properties hon. Ek object bana ke usko assign karo.

*Example pattern:*
```typescript
interface Book {
  isbn: string;
  title: string;
}
const b: Book = { isbn: "123", title: "TS Basics" };
```

**Problem 2 (Easy):** Ek `Order` interface banao jisme `orderId` (number) required ho aur `discountCode` (string) optional ho.

*Example pattern:*
```typescript
interface Ticket {
  ticketId: number;
  note?: string;
}
const t1: Ticket = { ticketId: 1 };
```

**Problem 3 (Easy-Medium):** Ek `Account` interface banao jisme `accountId` `readonly` ho. Object banao aur try karo `accountId` ko change karne ki (dekho error aata hai ya nahi).

*Example pattern:*
```typescript
interface Card {
  readonly cardNumber: string;
  balance: number;
}
const c: Card = { cardNumber: "1111", balance: 500 };
```

**Problem 4 (Medium):** `Animal` interface banao jisme `name` ho, phir `Dog` interface banao jo `Animal` ko extend kare aur ek extra property `breed` add kare.

*Example pattern:*
```typescript
interface Vehicle {
  brand: string;
}
interface Car extends Vehicle {
  doors: number;
}
```

**Problem 5 (Medium):** Ek object diya hai `{ a: 1, b: 2, c: 3 }`. `Object.entries()` use karke har key-value pair ko console mein print karo (loop ke sath).

*Example pattern:*
```typescript
const scores = { math: 90, science: 85 };
Object.entries(scores).forEach(([subject, marks]) => console.log(subject, marks));
```

**Problem 6 (Medium-Hard):** Spread operator use karke ek existing object mein ek naya property add karo, bina original object ko change kiye.

*Example pattern:*
```typescript
const base = { theme: "dark" };
const updated = { ...base, fontSize: 14 };
```

**Problem 7 (Hard):** `type` keyword use karke ek union type banao `Role = "admin" | "agent" | "customer"`, phir ek interface `Employee` banao jisme `role` property us union type ki ho.

*Example pattern:*
```typescript
type Priority = "low" | "medium" | "high";
interface Task {
  priority: Priority;
}
```

---

## 4. Mixed Real-World Problems (Module 1 + 2 + 3 + 4 combo, Multi-Tenant SDK context)

**Problem 1 — Tenant Interface:** Ek `Tenant` interface design karo jisme `tenantId` (readonly string), `wabaId` (string), `accessToken` (string), aur `phoneNumberId` (string) properties hon. Ek sample tenant object bana ke type-check karo.

*Example pattern:*
```typescript
interface ApiClient {
  readonly clientId: string;
  apiKey: string;
  region: string;
}
const client: ApiClient = { clientId: "c1", apiKey: "abc123", region: "us-east" };
```

**Problem 2 — Message Interface:** `Message` interface banao jisme `to` (string), `type` (union type: `"text" | "image" | "template"`), `timestamp` (number), aur `status` (union type: `"sent" | "delivered" | "read" | "failed"`) ho.

*Example pattern:*
```typescript
type MsgType = "text" | "audio";
interface ChatMessage {
  to: string;
  type: MsgType;
  timestamp: number;
}
const cm: ChatMessage = { to: "923001111111", type: "text", timestamp: 1720000000 };
```

**Problem 3 — Filtering Tenants:** `Tenant[]` (Module 3: array of interface objects) ka ek array banao jisme 4-5 tenants hon, har ek mein ek extra `isActive: boolean` field ho. `filter()` (Module 3) use karke sirf `isActive === true` (Module 2: `===` operator) wale tenants nikalo.

*Example pattern:*
```typescript
interface Order { id: number; isPaid: boolean; }
const orders: Order[] = [{ id: 1, isPaid: true }, { id: 2, isPaid: false }];
const paidOrders = orders.filter(o => o.isPaid === true);
```

**Problem 4 — Nested Config Interface:** Ek `TenantConfig` interface design karo jisme `tenantId` (string) ho, aur ek nested `webhookSettings` object ho (`{ url: string; secret: string }`), aur ek nested `rateLimit` object ho (`{ maxPerMinute: number; maxPerDay: number }`) — matlab interface ke andar interface (ya inline nested type) use karna.

*Example pattern:*
```typescript
interface AppSettings {
  appName: string;
  notification: { email: boolean; sms: boolean };
  limits: { maxUsers: number; maxStorageGB: number };
}
```

**Problem 5 — Extending Base Interface:** `BaseTenant` interface banao jisme `tenantId`, `wabaId` common fields hon. Phir `PremiumTenant` interface banao jo `BaseTenant` ko `extends` kare aur extra properties add kare jaise `prioritySupport: boolean` aur `customRateLimit: number`.

*Example pattern:*
```typescript
interface BaseUser {
  userId: string;
  email: string;
}
interface AdminUser extends BaseUser {
  permissions: string[];
  canDeleteUsers: boolean;
}
```

---

## 5. Key Takeaways

- Interface ek reusable blueprint hai jo object ke shape ko define karti hai — multi-tenant SDK mein `Tenant`, `Message`, `TenantConfig` jaisi shapes baar baar use hongi, isliye interfaces se consistency milti hai.
- Multi-tenant systems mein interfaces sirf convenience nahi balke **data isolation aur safety** ka zaroori hissa hain — strict typing se galti se ek tenant ka incomplete ya galat-shape data process hone se bachte hain.
- `?` (optional) aur `readonly` properties se tum bata sakte ho ke kaunsi fields zaroori hain aur kaunsi fixed/unchangeable honi chahiye — jaise `tenantId` ko `readonly` rakhna taake accidentally change na ho.
- `interface` ko `extends` se badha sakte ho (jaise `BaseTenant` se `PremiumTenant`), jabke `type` ko union/intersection se combine karte hain — dono ka apna use-case hai.
- Nested interfaces (interface ke andar interface, jaise `TenantConfig` mein `webhookSettings` aur `rateLimit`) real-world SDK design mein bohat common pattern hai, especially jab config layers ho.