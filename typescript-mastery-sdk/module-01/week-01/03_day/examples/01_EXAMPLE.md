# 🟢 Example 1 Explained — Arrays Basics (Easy Version)

Ye wahi code hai jo tumhein mila, bas main isko section by section tod kar simple Roman Urdu mein samjha raha hoon. Same pattern jo Day 03 guide mein tha.

---

## 1️⃣ Basic Array Declarations

```typescript
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Ali", "Ahmed", "Hassan"];
let flags: boolean[] = [true, false, true];
```

**Kya ho raha hai?**
Teen dabbe bana rahe ho, har dabbe ka apna type fix hai:
- `numbers` → sirf numbers ka dabba
- `names` → sirf strings ka dabba
- `flags` → sirf true/false ka dabba

`: number[]` ka matlab hai *"is variable mein sirf number ki array aani chahiye, kuch aur nahi"*. Agar tum ne `numbers` mein `"hello"` daalne ki koshish ki, TypeScript turant rok dega.

---

## 2️⃣ `Array<string>` — Wahi Cheez, Alag Likhne Ka Style

```typescript
let cities: Array<string> = ["Karachi", "Lahore", "Islamabad"];
```

`Array<string>` aur `string[]` **bilkul same** hain. Bas do tareeqe likhne ke. 99% developers `string[]` use karte hain kyunke chhota hai. Ye sirf isliye dikhaya gaya taake tumhe pata ho dono forms exist karti hain — kahin dekho to confuse na ho.

---

## 3️⃣ Type Inference

```typescript
let ages = [20, 25, 30];  // TypeScript infers: number[]
```

Yahan tum ne `: number[]` likha hi nahi, phir bhi TypeScript khud samajh gaya ke ye numbers ki array hai — kyunke jo values di hain sab numbers hain. Isko **inference** kehte hain — TypeScript "guess" kar leta hai type, tumhe har jagah likhne ki zaroorat nahi.

👉 **Rule of thumb:** Jab value declare karte hi assign kar rahe ho, type likhna optional hai (TS khud samajh lega). Jab baad mein assign karna ho ya empty array ho, tab type zaroor likho.

---

## 4️⃣ Adding Elements — `push()` aur `unshift()`

```typescript
numbers.push(6);       // end mein add
numbers.unshift(0);    // shuru mein add
```

**Yaad rakhne ka tarika:**
- `push` = "peeche dhakka do" → end mein jaata hai
- `unshift` = "aage khisko" → shuru mein jaata hai

Pehle: `[1,2,3,4,5]` → push(6) → `[1,2,3,4,5,6]` → unshift(0) → `[0,1,2,3,4,5,6]`

---

## 5️⃣ Removing Elements — `pop()` aur `shift()`

```typescript
let last = numbers.pop();     // end se nikalta hai, aur wo value return karta hai
let first = numbers.shift();  // shuru se nikalta hai
```

**Important cheez:** `pop()` aur `shift()` sirf remove nahi karte — jo element nikala usko **return** bhi karte hain. Isliye tum `let last = numbers.pop()` likh kar us value ko store kar sakte ho.

---

## 6️⃣ Accessing Elements

```typescript
names[0]                    // pehla element
names[names.length - 1]     // aakhri element
```

Array mein index **0 se start** hota hai — ye sabse zyada confusion wali cheez hai beginners ke liye. Isliye "last element" nikalne ke liye `length - 1` karna padta hai (agar 3 elements hain, last index 2 hoga, na ke 3).

---

## 7️⃣ Finding Elements

```typescript
let index = names.indexOf("Ahmed");   // kis position pe hai
let exists = names.includes("Ali");   // hai ya nahi (true/false)
```

- `indexOf` → position batata hai (nahi mila to `-1`)
- `includes` → sirf yes/no batata hai

**Kab konsa use karo?** Agar sirf "hai ya nahi" jaanna hai → `includes`. Agar "kahan hai" jaanna hai (jaise baad mein us position pe kuch karna ho) → `indexOf`.

---

## 8️⃣ Transforming Arrays — `map`, `filter`, `reduce`

Ye teeno **sabse important** hain SDK banane ke liye. Ek analogy se samjho:

Socho tumhare paas fruits ki tokri hai 🧺

```typescript
let doubled = numbers.map(n => n * 2);
```
> **map** = "har fruit ko process karke naya fruit banao" — original tokri wahi rehti hai, ek **nayi tokri** banti hai jisme transformed values hain. Original `numbers` change nahi hota.

```typescript
let evens = numbers.filter(n => n % 2 === 0);
```
> **filter** = "tokri se sirf wo fruits chaan lo jo condition pass karein" — jo pass nahi karte wo nayi tokri mein nahi aate.

```typescript
let sum = numbers.reduce((acc, n) => acc + n, 0);
```
> **reduce** = "sari tokri ko mila kar ek single cheez bana do" (jaise sab fruits ko juice bana dena). `acc` (accumulator) har step pe result carry karta hai, `0` starting value hai.

**Trick to remember:**
- `map` → array in, **same size** array out (transformed)
- `filter` → array in, **smaller ya equal size** array out (chaana hua)
- `reduce` → array in, **ek single value** out (combined)

---

## 9️⃣ SDK Real-World Part — Ye Sabse Important Hai Tumhare Liye

```typescript
let recipients: string[] = ["+923001234567", "+923001234568", "invalid"];

let validRecipients = recipients.filter(phone =>
  phone.startsWith('+') && phone.length >= 10
);
```

Yahan `filter` use ho raha hai taake **ganda data nikal do** — jo phone number `+` se start nahi hota ya chhota hai, wo discard ho jata hai. Real SDK mein ye pattern bohot common hai: user se input aata hai, usme se **valid entries** filter karke aage bhejo.

```typescript
type Message = { to: string; text: string };
let messages: Message[] = validRecipients.map(phone => ({
  to: phone,
  text: "Hello from SDK"
}));
```

Yahan do cheezein ek saath ho rahi hain:
1. `type Message` — ek chhota object shape define kiya (`to` aur `text`)
2. `.map()` — har valid phone number ko **ek plain string se ek Message object** mein convert kar diya

**Ye pattern tumhare BotAura SDK mein bar bar aayega:**
raw data (phone numbers list) → filter (ganda hatao) → map (proper object shape banao) → API ko bhejo.

---

## 🧠 Poore Example Ka Ek Line Summary

| Part | Kaam |
|---|---|
| `push/unshift` | Array mein add karna (end / start) |
| `pop/shift` | Array se nikalna (end / start), aur value return karna |
| `indexOf/includes` | Dhoondna (position / haan-na) |
| `map` | Har element ko transform karna |
| `filter` | Condition pe chaan-na |
| `reduce` | Sab ko mila kar ek result banana |
| SDK part | filter + map ka real combo — data clean karke shape do |

---

## 🏋️ Practice Set (Khud Karna Hai — Solutions Nahi Diye)

Same pattern jo Day 03 guide mein tha — sirf hints, code khud likhna hai. Jahan atko, bata dena, guide karunga seedha answer nahi.

### Practice 1 — push/pop revision
`names` array mein `"Bilal"` end mein add karo, phir `"Ali"` ko shuru se remove karo (hint: `push` + `shift`). Har step ke baad `console.log` karke dekho array kaisi dikh rahi hai.

### Practice 2 — filter warm-up
`names` array se sirf wo names filter karo jo `"A"` se start hote hain (hint: `.startsWith('A')` string method hai).

### Practice 3 — reduce for average
`numbers` array ko `.reduce()` use karke **average** nikalo (sum nikaal ke length se divide karo).

### Practice 4 — indexOf vs includes
`flags` array mein `true` pehli baar kis index pe hai, wo nikaalo. Phir check karo `false` array mein exist karta hai ya nahi — dono alag methods se (jo upar section 7 mein bataye hain).

### Practice 5 — SDK filter+map combo
Socho tumhare paas `messageIds: string[]` hai jisme kuch IDs `"wamid_"` se start hote hain aur kuch nahi (jaise ganda data). 
1. Pehle `.filter()` se sirf valid (wamid_ wale) IDs nikaalo
2. Phir `.map()` se un IDs ko `{ id: string, verified: boolean }[]` shape mein convert karo (verified hamesha `true` hoga kyunke already filter kar chuke ho)

### Practice 6 — Bonus (Combine karna)
`cities` array lo aur ek function `formatCities(cities: string[])` banao jo:
1. `.filter()` se sirf wo cities rakho jinke naam 6 letters se zyada hon
2. `.map()` se unko `"City: " + name` format mein badlo
3. `.reduce()` se sab ko ek single comma-separated string bana do

Hint: teeno methods ko chain kar sakte ho: `cities.filter(...).map(...).reduce(...)`.

---

## ✅ Self-Check

- [ ] `push/pop/shift/unshift` ka farq yaad hai bina dekhe
- [ ] `map` vs `filter` vs `reduce` ka fruits-tokri wala analogy samajh aa gaya
- [ ] Practice 5 wala filter+map combo khud se likh liya (ye SDK ka core pattern hai)
- [ ] Saare 6 practice questions try kiye, chahe ghalat hi sahi

Jab ye complete ho jaye, code paste kar dena — review karenge line by line. 💪