# Module 7: OOP - Object Oriented Programming (Classes, Inheritance, Access Modifiers)

---

## 1. Concept Explanation

Ab tak humne functions, objects, aur interfaces se kaam liya hai. Lekin jab tumhara system bada ho jata hai — jaise ek multi-tenant SDK jisme har business (tenant) ka apna state, config, aur behavior hota hai — to sirf plain objects/functions se cheezein manage karna mushkil ho jata hai. Yahan **OOP (Object-Oriented Programming)** kaam aata hai.

**Class kya hoti hai?** Class ek **template/blueprint** hai jisse tum objects banate ho. Interface (Module 4) sirf shape define karti hai (data ka structure), lekin class us shape ke sath **behavior (methods)** aur **internal state (properties)** bhi bundle karti hai, aur usko multiple baar "instantiate" (naya object banana) kar sakte ho.

**Object vs Class ka farak:**
- **Class** = blueprint (jaise `WhatsAppClient` ka design — kaise banega, kya kar sakega)
- **Object (instance)** = us blueprint se bana actual cheez (jaise `client1 = new WhatsAppClient(...)` — ek real, usable client)

Ek class se tum jitne chaho utne objects bana sakte ho, aur har object ki apni independent state hoti hai.

### Multi-Tenant Architecture mein OOP kaise use hota hai

Tumhare BotAura SDK mein yeh pattern bohat natural fit baithta hai:

- **`WhatsAppClient` class** — har tenant ke liye ek instance banega. Har instance ka apna `accessToken`, `phoneNumberId`, `tenantId` hoga — completely isolated. Class ki wajah se tum guarantee kar sakte ho ke har client independently kaam kare, ek dusre ka data touch na kare.
- **`TenantManager` class** — yeh ek "manager" hai jo internally multiple `WhatsAppClient` instances ko track karta hai (jaise `Map<string, WhatsAppClient>` mein). Jab koi request aati hai kisi specific tenant ke liye, `TenantManager` us tenant ka sahi instance dhund ke use karta hai.

Yeh pattern — ek Manager class jo multiple isolated instances handle kare — bohat common hai real-world multi-tenant systems mein, aur OOP ke bina isko clean tareeqe se likhna mushkil hota.

---

## 2. Syntax & Methods

### Class Declaration & Constructor

```typescript
class Client {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const c = new Client("BotAura");
```
> `constructor` woh special method hai jo `new` keyword se object banate waqt automatically chalta hai — initial values set karne ke liye.

### Properties aur Methods

```typescript
class Counter {
  count: number = 0; // property

  increment(): void { // method
    this.count++;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.count); // 1
```
> Properties class ka data hold karti hain, methods us data pe operations perform karte hain.

### Access Modifiers: `public`, `private`, `protected`

```typescript
class WhatsAppClient {
  public tenantId: string;
  private accessToken: string;
  protected apiVersion: string = "v20.0";

  constructor(tenantId: string, accessToken: string) {
    this.tenantId = tenantId;
    this.accessToken = accessToken;
  }
}

const client = new WhatsAppClient("t1", "secret-token");
console.log(client.tenantId);      // ✅ public — access ho sakta hai
// console.log(client.accessToken); // ❌ Error — private, bahar se access nahi
```

| Modifier | Kaam (Roman Urdu) |
|---|---|
| `public` (default) | Class ke bahar se bhi access ho sakta hai |
| `private` | Sirf usi class ke andar access ho sakta hai, bahar se ya child class se bhi nahi |
| `protected` | Usi class aur uski child classes (inheritance) mein access ho sakta hai, bahar se nahi |

> **Multi-tenant mein private data kyun critical hai:** Agar `accessToken` `public` ho, to koi bhi bahar se code galti se (ya jaan bujh kar) ek tenant ka token read ya overwrite kar sakta hai — yeh ek serious security risk hai. `private` rakhne se compiler khud enforce karta hai ke token sirf class ke andar hi accessible ho, aur bahar se sirf controlled methods (jaise getters) ke through hi access mile.

### Inheritance (`extends`) aur `super`

```typescript
class BaseMessage {
  to: string;
  constructor(to: string) {
    this.to = to;
  }
  describe(): string {
    return `Message to ${this.to}`;
  }
}

class TextMessage extends BaseMessage {
  body: string;
  constructor(to: string, body: string) {
    super(to); // parent class ka constructor call karna zaroori hai
    this.body = body;
  }
}

const tm = new TextMessage("923001234567", "Hello");
console.log(tm.describe()); // parent ka method inherit hua
```
> `extends` se ek class dusri class ki properties/methods inherit kar leti hai. `super()` parent class ka constructor call karta hai — child class ke constructor mein sabse pehle likhna zaroori hai.

### Abstract Classes

```typescript
abstract class MessageBuilder {
  abstract build(): string; // sirf signature, implementation child classes dengi

  logCreation(): void {
    console.log("Building a message...");
  }
}

class TemplateMessageBuilder extends MessageBuilder {
  build(): string {
    return "Template message built";
  }
}

// const m = new MessageBuilder(); // ❌ Error — abstract class ka direct instance nahi ban sakta
const t = new TemplateMessageBuilder(); // ✅ valid
```
> `abstract` class ka khud object nahi ban sakta — yeh sirf ek base define karti hai jise child classes ko `extends` karke complete karna hota hai. Jab tumhare paas multiple message types (Text, Template, Image) hon jo ek common structure share karte hon lekin `build()` alag alag implement karein, yeh perfect pattern hai.

### Implementing Interfaces (`implements`)

```typescript
interface Sendable {
  send(): void;
}

class EmailMessage implements Sendable {
  send(): void {
    console.log("Email sent");
  }
}
```
> `implements` batata hai ke class kisi interface ka contract follow karegi — class ko us interface ki saari properties/methods provide karni zaroori hain.

### Static Properties/Methods

```typescript
class TenantCounter {
  static totalTenants: number = 0;

  static incrementCount(): void {
    TenantCounter.totalTenants++;
  }
}

TenantCounter.incrementCount();
console.log(TenantCounter.totalTenants); // 1
```
> `static` members class pe directly belong karte hain, kisi instance pe nahi — inhe `ClassName.property` se access karte hain, `new` karne ki zaroorat nahi. Jaise total kitne tenants system mein register hue, yeh global count track karne ke liye useful hai.

### Getters aur Setters

```typescript
class VerificationStatus {
  private _isVerified: boolean = false;

  get isVerified(): boolean {
    return this._isVerified;
  }

  set isVerified(value: boolean) {
    console.log("Status changing to:", value);
    this._isVerified = value;
  }
}

const v = new VerificationStatus();
v.isVerified = true;       // setter chalta hai
console.log(v.isVerified); // getter chalta hai
```
> Getter/setter se tum private property ko controlled tareeqe se read/write karne dete ho — jaise beech mein validation ya logging add kar sakte ho, jo simple public property se possible nahi.

---

## 3. Practice Problems (Sirf Module 7 ka topic)

**Problem 1 (Easy):** Ek `Person` class banao jisme `name` property ho aur constructor mein set ho. Ek `greet()` method banao jo `"Hello, <name>"` return kare.

*Example pattern:*
```typescript
class Animal {
  species: string;
  constructor(species: string) {
    this.species = species;
  }
  describe(): string {
    return `This is a ${this.species}`;
  }
}
```

**Problem 2 (Easy):** Ek class banao jisme ek `private` property ho aur ek `public` method ho jo us private property ki value return kare.

*Example pattern:*
```typescript
class Wallet {
  private balance: number = 100;
  getBalance(): number {
    return this.balance;
  }
}
```

**Problem 3 (Medium):** `Vehicle` class banao (`brand` property), phir `Car` class banao jo `Vehicle` ko `extends` kare aur `super()` call kare, plus apni ek extra property `doors` add kare.

*Example pattern:*
```typescript
class Shape {
  color: string;
  constructor(color: string) {
    this.color = color;
  }
}
class Circle extends Shape {
  radius: number;
  constructor(color: string, radius: number) {
    super(color);
    this.radius = radius;
  }
}
```

**Problem 4 (Medium):** Ek `abstract class Shape` banao jisme `abstract area(): number` ho, phir do classes (`Square`, `Circle`) banao jo isko extend karke apna `area()` implement karein.

*Example pattern:*
```typescript
abstract class Instrument {
  abstract play(): string;
}
class Guitar extends Instrument {
  play(): string {
    return "Strumming";
  }
}
```

**Problem 5 (Medium-Hard):** Ek interface `Printable` banao jisme `print(): void` ho, phir ek class banao jo `implements Printable` kare.

*Example pattern:*
```typescript
interface Loggable {
  log(): void;
}
class Report implements Loggable {
  log(): void {
    console.log("Logging report...");
  }
}
```

**Problem 6 (Hard):** Ek class banao jisme ek `static` property `instanceCount` ho jo har naye object banne pe automatically increment ho (hint: constructor ke andar increment karo).

*Example pattern:*
```typescript
class Session {
  static activeSessions: number = 0;
  constructor() {
    Session.activeSessions++;
  }
}
```

**Problem 7 (Hard):** Ek class banao jisme private property `_status` ho, aur getter/setter dono ho — setter mein condition lagao ke agar invalid value di jaye (jaise empty string) to error throw kare.

*Example pattern:*
```typescript
class Temperature {
  private _celsius: number = 0;
  get celsius(): number {
    return this._celsius;
  }
  set celsius(value: number) {
    if (value < -273) throw new Error("Invalid temperature");
    this._celsius = value;
  }
}
```

---

## 4. Mixed Real-World Problems (Module 1-7 combo, Multi-Tenant WhatsApp SDK context)

**Problem 1 — WhatsAppClient Class:** Ek `WhatsAppClient` class banao jiska constructor `tenantId`, `accessToken`, aur `phoneNumberId` (Module 4: Tenant interface se related fields) le, jahan `accessToken` `private` ho aur baaki `public`. Ek `getMaskedToken()` public method banao jo token ka sirf last 4 characters dikhaye (Module 2: string operations use karke).

*Example pattern:*
```typescript
class ApiConnection {
  public serviceName: string;
  private apiKey: string;

  constructor(serviceName: string, apiKey: string) {
    this.serviceName = serviceName;
    this.apiKey = apiKey;
  }

  getMaskedKey(): string {
    return "****" + this.apiKey.slice(-4);
  }
}
```

**Problem 2 — TenantManager Class:** Ek `TenantManager` class banao jo internally `private clients: Map<string, WhatsAppClient>` (ya array, Module 3 concept) store kare, aur `addTenant()`, `getTenant()`, `removeTenant()` public methods provide kare.

*Example pattern:*
```typescript
class Registry {
  private items: Map<string, string> = new Map();

  add(id: string, value: string): void {
    this.items.set(id, value);
  }
  get(id: string): string | undefined {
    return this.items.get(id);
  }
  remove(id: string): void {
    this.items.delete(id);
  }
}
```

**Problem 3 — MessageBuilder Abstract Class:** Ek `abstract class MessageBuilder` banao jisme `abstract build(): object` ho, phir `TextMessage` aur `TemplateMessage` classes banao jo isko extend karke apna `build()` implement karein (Module 4: return type mein interface use kar sakte ho).

*Example pattern:*
```typescript
abstract class NotificationBuilder {
  abstract build(): { type: string };
}
class PushNotification extends NotificationBuilder {
  build(): { type: string } {
    return { type: "push" };
  }
}
```

**Problem 4 — Verification Status Tracking:** Ek `NumberVerification` class banao jisme private state `_status: "pending" | "verified" | "failed"` (Module 1: union type) ho, ek public getter `status` ho jo current status return kare, aur ek method `markVerified()` jo status ko update kare (Module 6: loop se multiple numbers ka status batch mein check karne wala function bhi likh sakte ho).

*Example pattern:*
```typescript
class UploadStatus {
  private _state: "waiting" | "done" | "error" = "waiting";
  get state() {
    return this._state;
  }
  markDone(): void {
    this._state = "done";
  }
}
```

**Problem 5 — Combining Everything:** `TenantManager` (Problem 2) ke andar ek method `getActiveClientIds(): string[]` banao jo loop (Module 6) ya array methods (Module 3) use karke sirf un tenants ki IDs return kare jinka `NumberVerification` status `"verified"` hai.

*Example pattern:*
```typescript
class Fleet {
  private vehicles: { id: string; active: boolean }[] = [];
  getActiveIds(): string[] {
    return this.vehicles.filter(v => v.active).map(v => v.id);
  }
}
```

---

## 5. Key Takeaways

- Class ek blueprint hai jisse tum multiple independent objects (instances) bana sakte ho — multi-tenant SDK mein har tenant ka apna `WhatsAppClient` instance hoga, sab isolated.
- Access modifiers (`public`, `private`, `protected`) security ka core tool hain — `accessToken` jaisi sensitive fields hamesha `private` rakho taake koi tenant dusre tenant ka token access na kar sake.
- `extends` + `super()` se inheritance milta hai — common logic (jaise `BaseMessage`) ek jagah likho, aur specific types (`TextMessage`, `TemplateMessage`) usko extend karke apna behavior add karein.
- `abstract class` tab use karo jab tumhe ek common structure force karna ho (jaise sab message builders ko `build()` implement karna hi hoga), lekin base class ka khud instance na banaya ja sake.
- Getters/setters private data ko controlled tareeqe se expose karne ka tareeqa dete hain — jaise verification status ko directly change karne ki bajaye, ek method/setter ke through hi update hone dena, taake validation/logging beech mein add ho sake.