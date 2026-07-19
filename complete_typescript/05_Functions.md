# Module 5: Functions (Regular, Arrow, Callbacks, Higher-Order, Generics)

---

## 1. Concept Explanation

**Functions kya hain?**
Function ek reusable block of code hai jo koi specific kaam karta hai — input leta hai (parameters), kuch process karta hai, aur output deta hai (return value). Module 4 mein humne `Tenant` interface design kiya tha; ab hum seekhenge ke us Tenant data pe **operations** kaise define karte hain — jaise "tenant ka config fetch karo", "message tenant ki taraf se bhejo", waghera.

**Parameters aur Return Types ka Typing:**
TypeScript mein aap function ke har parameter ka type likh sakte hain, aur function ka return type bhi specify kar sakte hain. Isse yeh guarantee milti hai ke function ko galat type ka data pass nahi kiya ja sakta, aur function jo return karega uska type bhi predictable hoga — jo ek multi-tenant SDK mein bohot zaroori hai, kyunki alag alag jagah se yeh functions call hongi aur aapko pata hona chahiye ke kya expect karna hai.

**Callback Functions:**
Callback woh function hai jo **kisi doosre function ko parameter ke taur pe pass kiya jata hai**, taake woh baad mein (ya kisi event ke baad) call ho sake. Roman Urdu: "jaise aap kisi ko bolte ho 'yeh kaam khatam hone ke baad mujhe yeh function call kar dena' — WhatsApp message send hone ke baad webhook trigger karna is ka classic example hai."

**Higher-Order Functions:**
Higher-order function woh function hai jo **ya toh dusre function ko parameter ke taur pe leta hai, ya function return karta hai**. Roman Urdu: "yeh function factories banane ke kaam aata hai — jaise ek function jo tenant ke access token ke sath ek naya API-calling function 'generate' kar de."

**Generics — Multi-Tenant SDK mein Kyun Useful Hain:**
Generics aapko ek function likhne dete hain jo **kisi bhi type ke sath kaam kare**, bina specific type hardcode kiye — lekin phir bhi type-safety maintain rehti hai. Roman Urdu: "socho aapki SDK mein alag alag tenant types hain — `BasicTenant`, `PremiumTenant`, `EnterpriseTenant` — sabka shape thora different hai lekin sab `Tenant` interface se extend hote hain (Module 4 se yaad karo). Agar aap har type ke liye alag function likhein (`filterBasicTenants`, `filterPremiumTenants`), yeh repetitive aur maintenance-heavy ho jayega. Generics se aap **ek** function likh sakte ho jo kisi bhi Tenant-based type ke sath kaam kare, aur TypeScript phir bhi exact type track karta rahega."

---

## 2. Syntax & Methods

### Regular Function Declaration with Typed Params/Return

```typescript
function calculateMessageCost(messageCount: number, ratePerMessage: number): number {
  return messageCount * ratePerMessage;
}
```

- Function declare karte waqt har parameter ke aage `: type` likhte hain, aur function name/parentheses ke baad `: returnType` likhte hain. Roman Urdu: "yeh batata hai ke function kya input leta hai aur kya wapas deta hai — kisi bhi galat type se call karoge toh error milega."

---

### Arrow Functions

```typescript
const calculateMessageCost = (messageCount: number, ratePerMessage: number): number => {
  return messageCount * ratePerMessage;
};

// Concise body (single expression, implicit return)
const isTenantActive = (status: string): boolean => status === "active";
```

- Arrow function `function` keyword ke bajaye `=>` syntax use karta hai, aur zyada concise hota hai. Roman Urdu: "modern TypeScript/JavaScript mein arrow functions zyada common hain, especially callbacks ke liye — agar body sirf ek expression hai, `{}` aur `return` bhi skip kar sakte ho."

---

### Optional Parameters (`?`), Default Parameters, Rest Parameters (`...`)

```typescript
function sendMessage(phone: string, message: string, retries?: number): void {
  console.log(phone, message, retries);
}

function connectTenant(tenantId: string, timeout: number = 5000): void {
  console.log(tenantId, timeout);
}

function logTenantEvents(tenantId: string, ...events: string[]): void {
  console.log(tenantId, events);
}
```

- `param?: type` — **optional parameter**, call karte waqt dena zaroori nahi. Roman Urdu: "jaise `retries` — agar na do toh `undefined` hoga."
- `param: type = value` — **default parameter**, agar na do toh yeh default value use hogi. Roman Urdu: "jaise `timeout` — agar specify na karo toh khud-ba-khud `5000` use hoga."
- `...param: type[]` — **rest parameter**, jitne bhi extra arguments pass karo, sab ek array mein collect ho jaate hain. Roman Urdu: "jab pata na ho ke kitne arguments aayenge (variable count), rest parameter use karo."

---

### Function as Parameter (Callback Typing)

```typescript
function sendMessageWithCallback(
  phone: string,
  message: string,
  onComplete: (success: boolean) => void
): void {
  // message bhejne ke baad
  onComplete(true);
}

sendMessageWithCallback("+923001234567", "Hello!", (success) => {
  console.log("Message sent:", success);
});
```

- Callback ka type function-signature jaisa likha jata hai: `(params) => returnType`. Roman Urdu: "yeh batata hai ke callback function kya parameters lega aur kya return karega — is se aap galat callback pass nahi kar sakte."

---

### Higher-Order Function Example

```typescript
function withLogging(fn: (msg: string) => void): (msg: string) => void {
  return (msg: string) => {
    console.log("Log before:", msg);
    fn(msg);
  };
}
```

- Yeh function ek function **return** kar raha hai — jo higher-order function ka classic pattern hai. Roman Urdu: "aisa function jo naya, "wrapped" version of a function generate karta hai — extra behavior add karne ke liye (jaise logging, authentication check)."

---

### Basic Generic Function

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let numResult = identity<number>(42);       // T = number
let strResult = identity<string>("hello");  // T = string
```

- `<T>` ek **type placeholder** hai — jo bhi type function call karte waqt pass ho, `T` uska represent karta hai. Roman Urdu: "function ek hi baar likha jata hai, lekin har call pe TypeScript apne aap sahi type track karta hai."

---

### Generic Function with Interface Constraint (`T extends Tenant`)

```typescript
interface Tenant {
  tenantId: string;
  businessName: string;
}

function getTenantLabel<T extends Tenant>(tenant: T): string {
  return `${tenant.businessName} (${tenant.tenantId})`;
}
```

- `T extends Tenant` — yeh generic ko **constraint** karta hai ke `T` chahe kuch bhi ho, usme **kam se kam** `Tenant` interface ki properties zaroor honi chahiye. Roman Urdu: "matlab aap kisi bhi tenant-type (Basic, Premium, Enterprise) pass kar sakte ho jab tak woh `Tenant` ki shape follow karta ho — function phir bhi safely `tenantId` aur `businessName` access kar sakta hai."

---

### `void` vs `never` Return Types

```typescript
function logMessage(msg: string): void {
  console.log(msg); // kuch return nahi karta
}

function throwTenantError(msg: string): never {
  throw new Error(msg); // function kabhi normally return hi nahi karta
}
```

- `void` — function **kuch bhi return nahi karta** (ya `undefined` return karta hai). Roman Urdu: "jab function sirf koi action perform karta hai (jaise console.log, ya kisi API ko call karna) aur value wapas nahi deta."
- `never` — function **kabhi bhi normally complete nahi hota** — ya toh hamesha error throw karta hai, ya infinite loop mein chala jata hai. Roman Urdu: "`void` se farak yeh hai ke `void` wala function return toh hota hai (bina value ke), lekin `never` wala function kabhi return hi nahi hota."

---

## 3. Practice Problems (Sirf Functions)

**Problem 1:** Ek regular function banao jo do `number` parameters le aur unka sum `number` return kare.

*Example pattern:*
```typescript
function multiplyValues(a: number, b: number): number {
  return a * b;
}
```

**Problem 2:** Ek arrow function banao jo ek `string` parameter le aur uski length `number` mein return kare.

*Example pattern:*
```typescript
const getFirstChar = (text: string): string => text[0];
```

**Problem 3:** Ek function banao jisme ek optional parameter ho (jaise `nickname?: string`), aur function usay handle kare agar na diya jaye.

*Example pattern:*
```typescript
function greetUser(name: string, title?: string): string {
  return title ? `${title} ${name}` : name;
}
```

**Problem 4:** Ek function banao jo rest parameters (`...`) use karke unlimited `number` arguments le aur unka total sum return kare.

*Example pattern:*
```typescript
function joinWords(separator: string, ...words: string[]): string {
  return words.join(separator);
}
```

**Problem 5:** Ek function banao jo dusre function ko parameter ke taur pe le (callback typing use karke), aur usay ek fixed value ke sath call kare.

*Example pattern:*
```typescript
function runTask(task: (result: number) => void): void {
  task(100);
}
```

**Problem 6:** Ek higher-order function banao jo ek function return kare (jaise ek "multiplier factory" jo ek number leke aisa function return kare jo kisi bhi number ko usse multiply kare).

*Example pattern:*
```typescript
function createAdder(baseValue: number): (x: number) => number {
  return (x: number) => x + baseValue;
}
```

**Problem 7:** Ek generic function banao `firstElement<T>` naam ka jo kisi bhi type ka array le aur uska pehla element return kare.

*Example pattern:*
```typescript
function lastElement<T>(arr: T[]): T {
  return arr[arr.length - 1];
}
```

---

## 4. Mixed Real-World Problems (Multi-Tenant WhatsApp SDK Context)

**Problem 1:** Ek function banao `getTenantConfig` naam ka jo `tenantId: string` parameter le aur us tenant ka config object (`{ tenantId: string; apiLimit: number }` shape ka — Module 4 ke interfaces yaad karo) return kare.

*Example pattern:*
```typescript
interface AppSettings {
  appId: string;
  region: string;
}

function getAppSettings(appId: string): AppSettings {
  return { appId, region: "asia-south" };
}
```

**Problem 2:** Ek callback-based function banao `sendTenantMessage` naam ka jo `tenantId`, `message`, aur ek `onSent: (webhookPayload: { tenantId: string; status: string }) => void` callback le, aur message "send" hone ke baad us callback ko trigger kare.

*Example pattern:*
```typescript
function processOrder(
  orderId: string,
  onDone: (result: { orderId: string; status: string }) => void
): void {
  onDone({ orderId, status: "completed" });
}
```

**Problem 3:** Ek generic function banao `filterTenants<T extends Tenant>` naam ka jo kisi bhi Tenant-based array ko le aur usay ek condition (jaise `businessName` ka length check) ke basis pe filter kare.

*Example pattern:*
```typescript
interface Product {
  id: string;
  price: number;
}

function filterExpensive<T extends Product>(items: T[], minPrice: number): T[] {
  return items.filter(item => item.price >= minPrice);
}
```

**Problem 4:** Ek higher-order function banao `createTenantApiCaller` naam ka jo `accessToken: string` le aur ek naya function return kare jo (jab call ho) us access token ke sath ek API endpoint "call" kare (console.log se simulate karo).

*Example pattern:*
```typescript
function createAuthorizedFetcher(apiKey: string): (endpoint: string) => void {
  return (endpoint: string) => {
    console.log(`Calling ${endpoint} with key ${apiKey}`);
  };
}
```

**Problem 5:** Ek function banao `validateTenantOrThrow` naam ka jo ek `Tenant` object le, aur agar `tenantId` empty string ho toh error throw kare (return type `never` ka use socho for the throwing part) — warna kuch return na kare (`void`).

*Example pattern:*
```typescript
function assertNonEmptyToken(token: string): void {
  if (token.length === 0) {
    throw new Error("Token cannot be empty");
  }
}
```

---

## 5. Key Takeaways

- Function parameters aur return types dono ko type karna, multi-tenant SDK mein predictable behavior guarantee karta hai — har jagah se function call karne wale ko exactly pata hota hai kya expect karna hai.
- Callback functions aur higher-order functions saath mil kar aapko flexible, reusable patterns dete hain — jaise "message send hone ke baad webhook trigger karo" ya "API caller function factory banao."
- Generics (`<T>`) aapko ek hi function/logic likhne dete hain jo multiple types ke sath kaam kare, bina type-safety qurbaan kiye — `T extends Tenant` jaisa constraint use karke aap generic ko limited-lekin-flexible bana sakte ho.
- Optional (`?`), default (`= value`), aur rest (`...`) parameters function ko zyada flexible banate hain bina multiple overloaded versions likhe.
- `void` matlab function kuch return nahi karta (lekin normally complete hota hai), jabke `never` matlab function kabhi normally complete hi nahi hota (hamesha throw ya infinite loop) — dono ka farak samajhna zaroori hai jab error-handling functions design karo.