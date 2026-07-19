# Module 2: Operators & Type Casting

---

## 1. Concept Explanation

**Operators kya hain?**
Operators woh symbols hain jo values pe operations perform karte hain — jaise do numbers add karna, do values compare karna, ya conditions check karna. TypeScript mein operators 4 main categories mein aate hain:

- **Arithmetic** — math karne ke liye (`+`, `-`, `*`, `/`, waghera)
- **Comparison** — do values compare karne ke liye (`==`, `===`, `>`, `<`, waghera)
- **Logical** — multiple conditions combine karne ke liye (`&&`, `||`, `!`)
- **Assignment** — variable ko value assign karne ke liye (`=`, `+=`, waghera)

Module 1 mein humne seekha ke variables ka ek fixed type hota hai. Ab operators seekhte hue yeh dhyan rakhna hai ke TypeScript operators pe bhi type-checking apply karta hai — jaise agar aap `string` aur `number` ko galat tarah se compare karo, TypeScript warn kar sakta hai.

**Type Casting/Conversion kya hai aur kyun zaroori hai?**
Kabhi kabhi aapke paas data ek type mein hota hai, lekin aapko usay **doosre type mein convert** karna padta hai. Misaal: WhatsApp webhook se aapko `phoneNumber` `string` ke form mein milta hai, lekin agar aapko kisi calculation ke liye usay number chahiye, toh aapko explicitly convert karna padega.

TypeScript mein do cheezein hoti hain jo confuse ho sakti hain:
1. **Type Casting (`as` keyword)** — yeh sirf TypeScript ko batata hai "trust me, yeh value is type ki hai" — lekin **actual value change nahi hoti**, sirf compiler ko convince karte hain.
2. **Type Conversion (`Number()`, `String()`, `Boolean()`)** — yeh **actual runtime conversion** hai, jisme value khud badalti hai.

Roman Urdu mein: "Casting matlab TypeScript ko batana ke value ka type kya hai (compile-time), Conversion matlab value ko waqai badalna (runtime)." Yeh farak samajhna zaroori hai kyunki galat use se bugs aa sakte hain — especially jab aap external APIs (jaise Meta ka WhatsApp API) se data receive kar rahe hon jiska exact type guaranteed nahi hota.

---

## 2. Syntax & Methods

### Arithmetic Operators

```typescript
let total: number = 10 + 5;   // addition
let diff: number = 10 - 5;    // subtraction
let product: number = 10 * 5; // multiplication
let quotient: number = 10 / 5; // division
let remainder: number = 10 % 3; // modulus (baaki bacha hua hissa)
let power: number = 2 ** 3;    // exponent (2 ki power 3)
```

- `+` — do numbers jama karta hai (ya strings ko concatenate/jorta hai).
- `-` — subtraction karta hai.
- `*` — multiplication karta hai.
- `/` — division karta hai.
- `%` — modulus, division ke baad **jo baqi bachta hai** woh deta hai (jaise 10 % 3 = 1).
- `**` — exponentiation, ek number ko doosre ki power tak raise karta hai.

---

### Comparison Operators

```typescript
let a: number = 5;
let b: string = "5";

console.log(a == b);   // true  — value compare karta hai, type ignore
console.log(a === b);  // false — value AUR type dono compare karta hai
console.log(a != b);   // false
console.log(a !== b);  // true
console.log(a > 3);    // true
console.log(a <= 5);   // true
```

- `==` — sirf **value** compare karta hai, type ko convert (coerce) kar leta hai. Roman Urdu: "loose comparison — risky hai kyunki `5 == "5"` true ho jata hai."
- `===` — **value aur type dono** compare karta hai, koi conversion nahi. Roman Urdu: "strict comparison — hamesha isay prefer karo, safe aur predictable hai."
- `!=` / `!==` — inequality ke liye same farak (loose vs strict).
- `>`, `<`, `>=`, `<=` — greater/less than comparisons, numbers aur strings dono pe kaam karte hain.

**`==` vs `===` comparison:**

| | `==` (loose) | `===` (strict) |
|---|---|---|
| Type conversion | Karta hai (coercion) | Nahi karta |
| `5 == "5"` result | `true` | `false` |
| Recommended? | ❌ Avoid karo | ✅ Hamesha use karo |
| Predictability | Kam — surprising results de sakta hai | Zyada — jo dikhta hai wahi hota hai |

---

### Logical Operators

```typescript
let isVerified: boolean = true;
let hasCredits: boolean = false;

console.log(isVerified && hasCredits); // AND — dono true hon tabhi true
console.log(isVerified || hasCredits); // OR — koi ek bhi true ho toh true
console.log(!isVerified);              // NOT — value ulti kar deta hai

// Nullish coalescing (??)
let apiTimeout: number | undefined = undefined;
let finalTimeout = apiTimeout ?? 5000; // agar null/undefined ho toh default use karo

// Optional chaining (?.)
let user: { profile?: { name: string } } = {};
let userName = user.profile?.name; // agar profile exist nahi karta toh undefined, error nahi
```

- `&&` (AND) — **dono conditions true** hon tabhi result true. Roman Urdu: "jaise: agar tenant verified HAI aur credits bhi HAIN, tabhi message bhejo."
- `||` (OR) — **koi bhi ek condition true** ho toh result true. Roman Urdu: "jaise: agar phone number ya email mein se koi ek diya gaya ho."
- `!` (NOT) — boolean value ulti kar deta hai. Roman Urdu: "true ko false, false ko true bana deta hai."
- `??` (Nullish Coalescing) — agar left side ki value `null` ya `undefined` ho, tabhi right side wali default value use hoti hai. Roman Urdu: "`||` se farak yeh hai ke `??` sirf null/undefined ko check karta hai, `0` ya `""` (empty string) ko valid maanta hai."
- `?.` (Optional Chaining) — agar object ka koi property exist nahi karta, error dene ke bajaye `undefined` return karta hai. Roman Urdu: "deeply nested objects access karte waqt crash hone se bachata hai — jaise `webhook.data?.messages?.[0]`."

---

### Type Casting: `as`, Angle Brackets, `Number()`, `String()`, `Boolean()`

```typescript
// "as" keyword — compile-time casting
let responseData: unknown = "some webhook payload";
let castedData = responseData as string;

// Angle bracket syntax — same kaam, purana style (JSX mein use nahi hota)
let castedData2 = <string>responseData;

// Runtime conversion functions — actual value convert karte hain
let numericId: number = Number("42");     // "42" -> 42
let textValue: string = String(42);       // 42 -> "42"
let boolValue: boolean = Boolean("");     // "" -> false
```

- `as` — TypeScript ko batata hai ke value ka type kya treat karna hai (compile-time only, value change nahi hoti). Roman Urdu: "jab aapko value ka type pata ho lekin TypeScript khud infer na kar paaye — jaise `unknown` data ko specific type assert karna."
- Angle bracket (`<Type>value`) — `as` jaisa hi kaam karta hai, lekin `.tsx` files mein avoid karo kyunki JSX se conflict hota hai.
- `Number()` — kisi bhi value ko actual number mein convert karta hai (runtime conversion).
- `String()` — kisi bhi value ko actual string mein convert karta hai.
- `Boolean()` — kisi bhi value ko `true`/`false` mein convert karta hai (empty string, `0`, `null`, `undefined` sab `false` bante hain).

---

### Ternary Operator

```typescript
let creditBalance: number = 0;
let status: string = creditBalance > 0 ? "active" : "suspended";
```

- `condition ? valueIfTrue : valueIfFalse` — ek line mein if-else likhne ka short tareeqa. Roman Urdu: "jab simple condition ke basis pe do values mein se ek choose karni ho, poora if-else block likhne ke bajaye yeh use karo."

---

## 3. Practice Problems (Sirf Operators & Type Casting)

**Problem 1:** Do `number` variables banao aur `%` operator use karke check karo ke unka remainder kya hai.

*Example pattern:*
```typescript
let x: number = 17;
let y: number = 4;
let rem: number = x % y;
```

**Problem 2:** Ek `string` variable banao jo number jaisi dikhती ho (jaise `"250"`), phir `Number()` use karke usay actual number mein convert karo.

*Example pattern:*
```typescript
let priceText: string = "99";
let priceNumber: number = Number(priceText);
```

**Problem 3:** Do variables banao — ek `number` aur ek same value ki `string` (jaise `10` aur `"10"`) — phir `==` aur `===` dono se compare karo aur result console.log karo.

*Example pattern:*
```typescript
let val1: number = 3;
let val2: string = "3";
console.log(val1 == val2, val1 === val2);
```

**Problem 4:** `&&` aur `||` use karke do `boolean` variables ka combination check karo.

*Example pattern:*
```typescript
let isOnline: boolean = true;
let hasPermission: boolean = false;
console.log(isOnline && hasPermission);
console.log(isOnline || hasPermission);
```

**Problem 5:** Ek variable banao jo `undefined` ho, phir `??` operator use karke usay ek default value do.

*Example pattern:*
```typescript
let savedTheme: string | undefined = undefined;
let activeTheme = savedTheme ?? "light";
```

**Problem 6:** Ternary operator use karke ek `number` variable check karo ke woh even hai ya odd, aur result ek `string` variable mein store karo.

*Example pattern:*
```typescript
let n: number = 7;
let type: string = n > 10 ? "big" : "small";
```

---

## 4. Mixed Real-World Problems (Module 1 + Module 2 Combo)

**Problem 1:** Ek `union type` variable banao (Module 1 se) jo WABA status store kare (`"verified" | "pending" | "rejected"`), phir `===` use karke check karo ke status `"verified"` hai ya nahi, aur result ek `boolean` variable mein store karo.

*Example pattern:*
```typescript
let orderStatus: "paid" | "unpaid" = "paid";
let isPaid: boolean = orderStatus === "paid";
```

**Problem 2:** Ek object type annotation banao (`{ phone: string; countryCode: string }`) jisme phone number stored ho as `string`, phir optional chaining (`?.`) use karke check karo ke agar koi nested `metadata` property missing ho toh crash na ho.

*Example pattern:*
```typescript
let session: { deviceId: string; info?: { os: string } } = { deviceId: "d1" };
let osName = session.info?.os ?? "unknown";
```

**Problem 3:** Ek `enum` banao (Module 1 se) message status ke liye (`Sent`, `Delivered`, `Read`), phir ternary operator use karke ek human-readable string generate karo based on current status.

*Example pattern:*
```typescript
enum Priority {
  Low = "LOW",
  High = "HIGH"
}
let current: Priority = Priority.High;
let label: string = current === Priority.High ? "Urgent" : "Normal";
```

**Problem 4:** Ek `unknown` type variable banao jo webhook se aane wale raw data ko represent kare (Module 1 se), phir `as` keyword use karke usay `string` type assert karo, aur phir usay `Number()` se convert karke ek numeric ID nikalo.

*Example pattern:*
```typescript
let rawPayload: unknown = "1024";
let asString = rawPayload as string;
let numericValue: number = Number(asString);
```

---

## 5. Key Takeaways

- Hamesha `===` aur `!==` use karo, `==` aur `!=` avoid karo — strict comparison predictable results deta hai, type coercion ke surprises se bachata hai.
- `??` sirf `null`/`undefined` ko check karta hai (unlike `||` jo `0` aur `""` ko bhi falsy treat karta hai) — defaults set karne ke liye `??` zyada safe hai.
- `?.` (optional chaining) nested objects access karte waqt crashes se bachata hai — especially useful jab external API responses (jaise WhatsApp webhooks) ka structure guarantee na ho.
- Type **casting** (`as`) sirf compiler ko batata hai type kya hai (value change nahi hoti), jabke type **conversion** (`Number()`, `String()`, `Boolean()`) actual runtime mein value badalta hai — dono ka farak samajhna zaroori hai.
- Ternary operator chhoti conditions ke liye clean, one-line syntax deta hai — lekin complex logic ke liye normal if-else zyada readable rehta hai.