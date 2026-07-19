# Module 3: Arrays & Array Methods

---

## 1. Concept Explanation

Arrays basically ek ordered collection hote hain values ki — jaise multiple phone numbers, messages, ya contacts ek jagah store karne hain to array use karte hain. TypeScript mein array **typed** hota hai, matlab agar tumne `string[]` bola hai to us array mein sirf strings hi aa sakti hain, number ya boolean dalne ki koshish karo to compiler hi error de dega. Yeh BotAura jaise project ke liye bohat useful hai kyunki agar tum `phoneNumbers: string[]` rakhte ho to accidentally kisi number ko integer form mein push nahi kar sakte — bugs early catch ho jate hain, runtime pe nahi.

Ab dusra important concept hai **mutable vs immutable operations**:

- **Mutable methods** — yeh original array ko directly badal dete hain (in-place modify). Jaise `push`, `pop`, `splice`, `sort`. Inka istemal karte waqt yaad rakhna ke original array change ho jayega.
- **Immutable / non-mutating methods** — yeh original array ko chhedte nahi, balke ek **naya** array ya value return karte hain. Jaise `map`, `filter`, `concat`, `slice`.

BotAura context mein yeh farak bohat matter karta hai — agar tum ek incoming messages ka array process kar rahe ho aur galti se `sort()` (mutating) use kar do jab tumhe original order preserve karna tha, to bug aa sakta hai. Isliye hamesha soch ke method choose karo.

---

## 2. Syntax & Methods

### Creation

```typescript
// Array literal (sabse common tareeqa)
const numbers: number[] = [1, 2, 3];

// Generic Array<type> syntax — same cheez, alag likhne ka style
const names: Array<string> = ["Ali", "Sara"];

// Array() constructor — kam use hota hai, empty ya fixed-length array banane ke liye
const empty = new Array<number>(5); // length 5, sab undefined
```

| Style | Explanation (Roman Urdu) |
|---|---|
| `type[]` | Sabse common, short and readable |
| `Array<type>` | Generic syntax, functionally same, kabhi kabhi complex types ke sath clearer lagta hai |
| `new Array(n)` | Fixed length ka empty array banata hai, values set nahi hoti |

### Adding / Removing (⚠️ yeh sab **mutating** hain — original array change karte hain)

```typescript
const queue: string[] = ["msg1", "msg2"];

queue.push("msg3");        // end mein add karta hai
queue.pop();                // end se remove karke wo value return karta hai
queue.unshift("msg0");      // start mein add karta hai
queue.shift();               // start se remove karke wo value return karta hai
queue.splice(1, 1, "new");  // index 1 se 1 item remove, "new" insert
```

| Method | Kaam (Roman Urdu) |
|---|---|
| `push()` | End mein ek ya zyada items add karta hai |
| `pop()` | End se last item remove karta hai |
| `unshift()` | Start mein item add karta hai |
| `shift()` | Start se first item remove karta hai |
| `splice()` | Kisi bhi index pe remove/insert/replace karta hai |

### Searching (non-mutating)

```typescript
const statuses: string[] = ["sent", "delivered", "read"];

statuses.indexOf("delivered");           // index return karta hai, na mile to -1
statuses.includes("read");                // true/false — element hai ya nahi
statuses.find(s => s === "read");         // pehla matching element return karta hai
statuses.findIndex(s => s === "read");    // pehla matching element ka index
```

| Method | Kaam (Roman Urdu) |
|---|---|
| `indexOf()` | Element ka index dhundta hai (strict equality) |
| `includes()` | Sirf true/false batata hai element hai ya nahi |
| `find()` | Condition ke hisab se pehla element return karta hai |
| `findIndex()` | Condition ke hisab se pehla index return karta hai |

### Transforming (non-mutating — naya array/value return karte hain)

```typescript
const nums: number[] = [1, 2, 3];

const doubled = nums.map(n => n * 2);              // har element transform karke naya array
const evens = nums.filter(n => n % 2 === 0);        // condition pass karne wale elements ka naya array
const total = nums.reduce((sum, n) => sum + n, 0);  // sab ko combine karke ek value
nums.forEach(n => console.log(n));                   // loop, kuch return nahi karta
```

| Method | Kaam (Roman Urdu) |
|---|---|
| `map()` | Har element transform karke naya array deta hai |
| `filter()` | Condition pe based naya (chhota) array deta hai |
| `reduce()` | Poore array ko ek single value mein combine karta hai |
| `forEach()` | Sirf loop chalata hai, return kuch nahi karta |

### Sorting (⚠️ **mutating**)

```typescript
const arr: number[] = [3, 1, 2];
arr.sort();                          // default: string comparison (bug-prone for numbers!)
arr.sort((a, b) => a - b);          // ascending numeric sort
arr.reverse();                       // order ulta kar deta hai
```

| Method | Kaam (Roman Urdu) |
|---|---|
| `sort()` | Array ko sort karta hai (numbers ke liye compare function zaroor dena) |
| `reverse()` | Array ka order reverse kar deta hai |

### Combining (non-mutating)

```typescript
const a: number[] = [1, 2];
const b: number[] = [3, 4];

const combined1 = a.concat(b);      // [1,2,3,4] — naya array
const combined2 = [...a, ...b];      // spread operator — same result, more common in modern TS
const joined = a.join("-");          // "1-2" — array ko string bana deta hai
const part = a.slice(0, 1);          // [1] — copy ka portion, original untouched
```

| Method | Kaam (Roman Urdu) |
|---|---|
| `concat()` | Do arrays ko jodta hai, naya array return karta hai |
| `...spread` | Modern tareeqa arrays combine/copy karne ka |
| `join()` | Array ko separator ke sath string bana deta hai |
| `slice()` | Array ka portion copy karta hai (original safe rehta hai) |

### Checking

```typescript
Array.isArray([1, 2, 3]);                          // true
[1, 2, 3].some(n => n > 2);                          // true — koi ek bhi condition pass kare
[1, 2, 3].every(n => n > 0);                         // true — sab elements condition pass karein
```

| Method | Kaam (Roman Urdu) |
|---|---|
| `Array.isArray()` | Check karta hai ke value array hai ya nahi |
| `some()` | Kam se kam ek element condition pass karta hai to true |
| `every()` | Sab elements condition pass karein to hi true |

### ⚡ Mutating vs Non-Mutating — Quick Reference

| Category | Mutates Original? | Methods |
|---|---|---|
| Add/Remove | ✅ Haan | `push`, `pop`, `shift`, `unshift`, `splice` |
| Sorting | ✅ Haan | `sort`, `reverse` |
| Search | ❌ Nahi | `indexOf`, `includes`, `find`, `findIndex` |
| Transform | ❌ Nahi | `map`, `filter`, `reduce`, `forEach` |
| Combine | ❌ Nahi | `concat`, `slice`, `join`, spread `...` |
| Check | ❌ Nahi | `Array.isArray`, `some`, `every` |

---

## 3. Practice Problems (Sirf Module 3 ka topic)

**Problem 1 (Easy):** Ek `number[]` array diya hai jisme kuch numbers hain. Sab numbers ko 10 se multiply karke naya array banao.

*Example pattern:*
```typescript
const prices: number[] = [100, 200, 300];
const withTax = prices.map(p => p * 1.1);
console.log(withTax);
```

**Problem 2 (Easy):** Ek `string[]` array of names diya hai. Us mein se sirf wo names filter karo jinki length 4 se zyada hai.

*Example pattern:*
```typescript
const words: string[] = ["hi", "hello", "yo", "welcome"];
const longWords = words.filter(w => w.length > 3);
console.log(longWords);
```

**Problem 3 (Easy-Medium):** Ek array of numbers ka sum aur average dono nikalo `reduce()` use karke.

*Example pattern:*
```typescript
const scores: number[] = [10, 20, 30];
const sum = scores.reduce((acc, n) => acc + n, 0);
console.log(sum);
```

**Problem 4 (Medium):** Ek array of objects diya hai jisme har object ek user hai `{ id: number, active: boolean }`. `find()` use karke pehla active user dhundo.

*Example pattern:*
```typescript
type Item = { id: number; done: boolean };
const items: Item[] = [{ id: 1, done: false }, { id: 2, done: true }];
const firstDone = items.find(i => i.done);
console.log(firstDone);
```

**Problem 5 (Medium):** Ek array of strings ko alphabetically sort karo, phir usko reverse bhi karo (dono operations chain karo).

*Example pattern:*
```typescript
const fruits: string[] = ["banana", "apple", "cherry"];
fruits.sort();
fruits.reverse();
console.log(fruits);
```

**Problem 6 (Medium-Hard):** Do arrays diye hain — `existingIds: number[]` aur `newIds: number[]`. In dono ko combine karo aur duplicates hata ke ek unique array return karo (hint: `Set` + spread ya `includes` + `filter` use kar sakte ho).

*Example pattern:*
```typescript
const a: number[] = [1, 2, 3];
const b: number[] = [3, 4, 5];
const unique = [...new Set([...a, ...b])];
console.log(unique);
```

**Problem 7 (Hard):** Ek array of numbers diya hai. `every()` aur `some()` dono use karke check karo ke (a) sab numbers positive hain ya nahi, aur (b) koi bhi number 100 se bada hai ya nahi.

*Example pattern:*
```typescript
const nums: number[] = [5, 10, 15];
const allPositive = nums.every(n => n > 0);
const anyLarge = nums.some(n => n > 50);
console.log(allPositive, anyLarge);
```

---

## 4. Mixed Real-World Problems (Module 1 + 2 + 3 combo, BotAura context)

**Problem 1:** Tumhare paas `contacts: string[]` hai jisme phone numbers hain (kuch valid, kuch empty strings ya galat format). `filter()` (Module 3) aur optional chaining/nullish coalescing (Module 2) use karke sirf valid numbers ka array banao jo `+92` se start hote hain.

*Example pattern:*
```typescript
const rawContacts: string[] = ["+923001234567", "", "923009999999"];
const validContacts = rawContacts.filter(c => c?.startsWith("+92"));
console.log(validContacts);
```

**Problem 2:** Tumhare paas messages ka array hai jisme har message object hai `{ id: number, status: string }` (readonly `id` field, Module 1 concept). `map()` (Module 3) use karke sirf `status` values ka naya array banao, phir check karo `includes()` se ke koi message "failed" status ka hai ya nahi.

*Example pattern:*
```typescript
type Msg = { readonly id: number; status: string };
const messages: Msg[] = [{ id: 1, status: "sent" }, { id: 2, status: "failed" }];
const allStatuses = messages.map(m => m.status);
const hasFailed = allStatuses.includes("failed");
console.log(hasFailed);
```

**Problem 3:** WABA (WhatsApp Business Account) ka status ek `enum` hai (Module 1: `PENDING`, `APPROVED`, `REJECTED`). Ek array of WABA accounts diya hai `{ wabaId: string, status: WabaStatus }[]`. `filter()` aur `===` (Module 2) use karke sirf `APPROVED` accounts nikalo, aur `.length` se count batao.

*Example pattern:*
```typescript
enum WabaStatus { PENDING, APPROVED, REJECTED }
type Waba = { wabaId: string; status: WabaStatus };
const wabas: Waba[] = [
  { wabaId: "w1", status: WabaStatus.APPROVED },
  { wabaId: "w2", status: WabaStatus.PENDING },
];
const approved = wabas.filter(w => w.status === WabaStatus.APPROVED);
console.log(approved.length);
```

**Problem 4:** Tumhare paas bulk message templates ka array hai, har template ek tuple hai `[templateName: string, isActive: boolean]` (Module 1: tuple concept). `reduce()` (Module 3) use karke sirf active templates ke names ka ek comma-separated string banao (`join()` se).

*Example pattern:*
```typescript
type Template = [string, boolean];
const templates: Template[] = [["welcome", true], ["promo", false], ["otp", true]];
const activeNames = templates
  .filter(t => t[1] === true)
  .map(t => t[0])
  .join(", ");
console.log(activeNames);
```

---

## 5. Key Takeaways

- Typed arrays (`string[]`, `number[]`) TypeScript mein bugs ko compile-time pe hi pakad lete hain — WhatsApp numbers, message IDs waghera process karte waqt yeh bohat safety deta hai.
- **Mutating methods** (`push`, `pop`, `splice`, `sort`, `reverse`) original array badal dete hain — inhe sochke use karo, especially jab original data preserve karna ho.
- **Non-mutating methods** (`map`, `filter`, `reduce`, `slice`, `concat`) naya array/value return karte hain — modern TypeScript code mein yeh zyada prefer kiye jate hain kyunki predictable behavior dete hain.
- `map` + `filter` + `reduce` teeno milke almost har array transformation problem solve kar dete hain — inko achi tarah practice karo, BotAura mein bulk contacts/messages process karne mein yeh roz kaam aayenge.
- Spread operator (`...`) arrays combine/copy karne ka modern aur clean tareeqa hai, `concat()` se zyada common hai aaj kal.