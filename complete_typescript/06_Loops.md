# Module 6: Loops

---

## 1. Concept Explanation

Loops tab use hote hain jab tumhe koi kaam **baar baar** karna ho — jaise 100 contacts ko ek ek karke message bhejna, ya kisi array ke har element ko check karna. Bina loop ke tumhe wahi code 100 baar manually likhna padta, jo na practical hai na maintainable.

**Kaunsa loop kab use karna chahiye — quick guide:**
- Fixed number of times loop chalana ho (jaise index ke sath kaam) → `for`
- Kisi array ke har element pe kaam karna ho → `for...of`
- Object ki keys pe iterate karna ho → `for...in`
- Loop chalana hai jab tak koi condition true rahe, aur pata nahi kitni baar chalega → `while`
- Kam se kam ek baar zaroor chalana hai, condition baad mein check karni hai → `do...while`

### `return`, `break`, aur `continue` ka farak

Yeh teeno loop ke flow ko control karte hain, lekin bohat differently:

- **`break`** — loop ko **turant band** kar deta hai, aur loop ke baad wale code pe chala jata hai. Sirf us loop ko rokta hai jisme woh likha hai.
- **`continue`** — current iteration ko **skip** karke, agli iteration pe chala jata hai. Loop khatam nahi hota, sirf current step chhod deta hai.
- **`return`** — yeh loop ko nahi, balke **poori function** ko wahin khatam kar deta hai. Agar `return` ek loop ke andar function ke andar likha ho, to jaise hi wo line chalti hai, function turant exit ho jata hai — loop ki baaki iterations bhi nahi chalti, aur function ke baad ka code bhi skip ho jata hai.

Yeh farak samajhna bohat zaroori hai kyunki ek common bug pattern yeh hota hai: agar tum `find`-type logic khud loop se likh rahe ho aur galti se `return` ki jagah kuch aur expect kar rahe ho (ya vice versa), to function pehle hi element pe exit ho jayega jabke tumhara intention sirf loop se nikalna (`break`) tha — ya ulta, tum `break` use kar rahe ho jabke actually function ko turant result ke sath return karna chahiye tha. **Rule of thumb:** agar tumhe loop khatam karke function se bahar bhi nikalna hai (result ke sath), `return` use karo. Agar sirf loop rokna hai lekin function mein aage aur kaam karna hai, `break` use karo.

```typescript
function findFailedMessage(messages: { status: string }[]): string {
  for (const msg of messages) {
    if (msg.status === "failed") {
      return "Found a failed message"; // function yahi khatam ho jata hai
    }
  }
  return "All good";
}
```

---

## 2. Syntax & Methods

### `for` loop

```typescript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```
> Classic loop — initialization, condition, aur increment teeno ek line mein. Jab index number chahiye ho tab useful hai.

### `for...of` (arrays ke liye)

```typescript
const numbers: number[] = [10, 20, 30];
for (const n of numbers) {
  console.log(n);
}
```
> Array ke har **value** pe directly iterate karta hai — index manually track nahi karna padta.

### `for...in` (objects ke liye)

```typescript
const tenant = { tenantId: "t1", plan: "premium" };
for (const key in tenant) {
  console.log(key, tenant[key as keyof typeof tenant]);
}
```
> Object ki har **key** pe iterate karta hai. Note: arrays pe `for...in` use karna avoid karo — `for...of` behtar hai arrays ke liye.

### `while`

```typescript
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}
```
> Jab tak condition `true` rahe, loop chalta rahega — condition pehle check hoti hai.

### `do...while`

```typescript
let attempts = 0;
do {
  console.log("Attempt", attempts);
  attempts++;
} while (attempts < 3);
```
> Body pehle **ek baar zaroor chalti hai**, phir condition check hoti hai — matlab kam se kam ek iteration guaranteed hai.

### `break`

```typescript
const statuses = ["sent", "delivered", "failed", "read"];
for (const s of statuses) {
  if (s === "failed") {
    break; // loop yahin ruk jayega
  }
  console.log(s);
}
```
> Loop ko turant band kar deta hai, chahe condition abhi false na hui ho.

### `continue`

```typescript
for (const n of [1, 2, 3, 4, 5]) {
  if (n % 2 === 0) {
    continue; // even numbers skip
  }
  console.log(n);
}
```
> Current iteration skip karke agli pe chala jata hai — loop chalta rehta hai.

### Nested Loops

```typescript
const tenants = ["t1", "t2"];
const messages = ["msg1", "msg2"];

for (const t of tenants) {
  for (const m of messages) {
    console.log(t, m);
  }
}
```
> Ek loop ke andar dusra loop — har outer iteration pe poora inner loop chalta hai. Combinations banane ke liye useful.

### Loops vs Array Methods (`map`/`forEach`) — kab kya use karna behtar hai

| Situation | Behtar Choice |
|---|---|
| Naya transformed array chahiye | `map()` (Module 3) |
| Sirf side-effect karna hai (jaise console.log, API call) | `forEach()` ya `for...of` |
| Beech mein `break` karke rokna ho | `for`/`for...of` (map/forEach mein break nahi hota) |
| Index ke sath complex control chahiye | `for` loop |
| Simple iteration, readability priority | `for...of` ya array methods |

> `map`/`forEach` ko beech mein `break` nahi kar sakte — agar early exit chahiye (jaise pehla matching element milte hi rukna hai), to plain `for`/`for...of` loop ya `find()` behtar rahega.

---

## 3. Practice Problems (Sirf Module 6 ka topic)

**Problem 1 (Easy):** `for` loop use karke 1 se 10 tak sab numbers print karo.

*Example pattern:*
```typescript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

**Problem 2 (Easy):** `for...of` use karke ek `string[]` array ke har element ko uppercase karke print karo.

*Example pattern:*
```typescript
const fruits = ["apple", "mango"];
for (const f of fruits) {
  console.log(f.toUpperCase());
}
```

**Problem 3 (Easy-Medium):** `for...in` use karke ek object ki sab keys aur values print karo.

*Example pattern:*
```typescript
const config = { theme: "dark", lang: "en" };
for (const key in config) {
  console.log(key, config[key as keyof typeof config]);
}
```

**Problem 4 (Medium):** `while` loop use karke 1 se 100 tak sab numbers ka sum nikalo.

*Example pattern:*
```typescript
let i = 1;
let sum = 0;
while (i <= 5) {
  sum += i;
  i++;
}
console.log(sum);
```

**Problem 5 (Medium):** Ek `number[]` array mein loop chalao aur `continue` use karke sirf negative numbers ko skip karo, baaki print karo.

*Example pattern:*
```typescript
const nums = [1, -2, 3, -4];
for (const n of nums) {
  if (n < 0) continue;
  console.log(n);
}
```

**Problem 6 (Medium-Hard):** Ek `number[]` array mein loop chalao aur `break` use karke jaise hi koi number 50 se bada mile, loop ruk jaye.

*Example pattern:*
```typescript
const values = [10, 20, 60, 30];
for (const v of values) {
  if (v > 50) break;
  console.log(v);
}
```

**Problem 7 (Hard):** Nested loop use karke 2 arrays ke har possible combination (Cartesian product) print karo.

*Example pattern:*
```typescript
const colors = ["red", "blue"];
const sizes = ["S", "M"];
for (const c of colors) {
  for (const s of sizes) {
    console.log(c, s);
  }
}
```

---

## 4. Mixed Real-World Problems (Module 1-6 combo, BotAura context)

**Problem 1:** Tumhare paas `contacts: string[]` array hai jisme phone numbers hain (kuch duplicate bhi ho sakte hain). Nested loop ya loop + `includes()` (Module 3) use karke duplicate numbers dhundo aur print karo.

*Example pattern:*
```typescript
const ids = ["a1", "a2", "a1", "a3"];
const seen: string[] = [];
const duplicates: string[] = [];
for (const id of ids) {
  if (seen.includes(id)) {
    duplicates.push(id);
  } else {
    seen.push(id);
  }
}
console.log(duplicates);
```

**Problem 2:** Ek `Message[]` (Module 4: interface) array hai. `for...of` loop use karke har message process karo, aur jaise hi ek message ka `status === "failed"` (Module 2) mile, `break` karke loop ruk jaye aur ek counter batao kitne messages process hue pehle failed milne se.

*Example pattern:*
```typescript
interface Item { id: number; status: string; }
const items: Item[] = [{ id: 1, status: "ok" }, { id: 2, status: "error" }];
let processed = 0;
for (const item of items) {
  if (item.status === "error") break;
  processed++;
}
console.log(processed);
```

**Problem 3:** Ek function banao jo `Tenant[]` (Module 4) array leta hai aur `for` loop use karke pehla `isActive: true` tenant dhundta hai — jaise hi mil jaye, `return` us tenant ka `tenantId` kar do (function turant khatam ho jaye). Agar koi na mile, loop khatam hone ke baad `return null`.

*Example pattern:*
```typescript
interface Task { id: number; done: boolean; }
function findFirstDoneId(tasks: Task[]): number | null {
  for (const t of tasks) {
    if (t.done) {
      return t.id;
    }
  }
  return null;
}
```

**Problem 4:** Webhook se aane wale `events: { type: string }[]` array ko loop se categorize karo — do alag arrays banao, ek `messageEvents` aur ek `statusEvents`, aur nested loop ki zaroorat nahi, sirf ek loop mein `if/else` (Module 2) se dono arrays mein push karo.

*Example pattern:*
```typescript
interface Event { type: string; }
const events: Event[] = [{ type: "message" }, { type: "status" }];
const groupA: Event[] = [];
const groupB: Event[] = [];
for (const e of events) {
  if (e.type === "message") {
    groupA.push(e);
  } else {
    groupB.push(e);
  }
}
```

---

## 5. Key Takeaways

- Loop choose karte waqt data ki shape dekho: arrays ke liye `for...of`, objects ke liye `for...in`, aur jab exact iterations pata na ho to `while`.
- **`break`** loop ko rok deta hai, **`continue`** sirf current step skip karta hai, aur **`return`** poori function ko wahin khatam kar deta hai — teeno alag scope pe kaam karte hain, inko mix-up karna common bug ka source hai.
- Agar function ko loop ke andar hi result ke sath exit hona hai (jaise pehla matching item milte hi), `return` use karo — lekin agar sirf loop rokna hai aur function mein aage bhi kaam baaki hai, `break` sahi choice hai.
- `map`/`forEach` jaise array methods mein `break` possible nahi hota — early exit chahiye ho to plain loop (`for`/`for...of`) ya `find()` use karo.
- Nested loops combinations ke liye useful hain, lekin bade datasets pe inka performance impact hota hai — jahan possible ho, single loop ya array methods (filter/map) ko prefer karo.