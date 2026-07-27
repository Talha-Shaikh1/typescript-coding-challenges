# 🟢 Day 03 — Easy Version: Arrays, Tuples & Type Aliases

Bhai ye same Day 03 hai lekin **zyada simple** language mein, taake concept dimagh mein permanently baith jaye. Har cheez ko roz marra ki zindagi se compare karke samjhaunga, phir WhatsApp SDK pe apply karenge.

---

## 1️⃣ Array — Ek Line Mein Samjho

> **Array = ek dabba jisme sirf ek hi type ki cheezein rakh sakte ho.**

Jaise: agar dabba "phone numbers" ka hai, to usme sirf phone numbers hi aayenge, koi "age" ya "name" nahi ghusega.

```typescript
let phoneNumbers: string[] = ["+923001234567", "+923011234567"];
```

Agar tum ne yahan number push kiya (`phoneNumbers.push(123)`), TypeScript chillayega ❌ — kyunke dabba sirf strings ka tha.

### Yaad rakhne wale 5 methods (SDK mein bar bar use honge)

| Method | Kaam kya karta hai | Example |
|---|---|---|
| `.push()` | end mein add | `list.push("new")` |
| `.filter()` | condition pe chaan kar nayi array | `list.filter(x => x.length > 5)` |
| `.map()` | har item ko transform karo | `list.map(x => x.toUpperCase())` |
| `.includes()` | exist karta hai ya nahi | `list.includes("hello")` |
| `.reduce()` | sab ko combine karke ek value | `list.reduce((a,b) => a+b, 0)` |

**Mental model:** `filter` = "chaan lo", `map` = "sab ko badal do", `reduce` = "sab ko mila kar ek jawab do".

---

## 2️⃣ Tuple — "Fixed Seats Wali Array"

> **Tuple = array jiski seats fixed hain, aur har seat ka apna type hai.**

Socho ek rickshaw mein 2 seats hain: pehli seat sirf **driver (string)** ke liye, dusri seat sirf **passenger count (number)** ke liye. Order badal nahi sakte.

```typescript
type Response = [boolean, string];

function sendMessage(): Response {
  return [true, "Message sent"];
}

let [success, msg] = sendMessage();
```

**Kab use karo tuple?**
👉 Jab tumhe **exact number of values, exact order mein** waapis chahiye ho — jaise function se `[success, message]` ya `[sent, failed]`.

**Farq array vs tuple:**
- Array → same type ki *variable length* list
- Tuple → *fixed length*, har position ka apna alag type

---

## 3️⃣ Type Alias — "Naam Rakh Do Taake Baar Baar Na Likhna Pade"

> **Type Alias = ek chhota naam jo ek lambi/complex type ko represent kare.**

Jaise ek bar bolo "WABA config" sab samajh jayen, baar baar poori detail na batani pade.

```typescript
type PhoneNumber = string;
type MessageStatus = "queued" | "sent" | "delivered" | "read" | "failed";

type ClientConfig = {
  accessToken: string;
  phoneNumberId: string;
  retryCount?: number; // ? matlab optional
};
```

**Kyun zaroori hai SDK ke liye?**
Tumhara SDK multi-tenant hai — har tenant ka `ClientConfig` hoga. Agar type alias na banao to har jagah wohi object shape likhna padega. Ek jagah define karo, har jagah reuse karo.

---

## 4️⃣ `readonly` — "Chhoo Sakte Ho, Badal Nahi Sakte"

```typescript
const SUPPORTED_MEDIA: readonly string[] = ["image", "video", "audio"];
// SUPPORTED_MEDIA.push("gif")  ❌ Error — locked hai
```

**Kab use karo?** Jab koi list/config **constant** honi chahiye — jaise supported media types, API version — jisko galti se bhi koi modify na kar sake.

---

## 🧠 Sirf Ek Cheez Yaad Rakhni Hai

| Concept | Ek line mein |
|---|---|
| Array | Same type, variable length |
| Tuple | Fixed length, mixed types, fixed order |
| Type Alias | Naam do kisi bhi type ko, reuse karo |
| readonly | Padho, likho mat |

---

## 🏋️ Practice Set (Khud Karna Hai — Solutions Nahi Diye)

Neeche sirf **hints** hain, code khud likhna hai. Jahan atko, mujhe bolna — main tumhe guide karunga, seedha answer nahi doonga (tum ne khud yehi kaha tha 😄).

### Practice 1 — Array Basics
Ek array banao `pendingMessages: string[]` jisme 3 message IDs ho.
- Usme ek naya message ID add karo (`.push`)
- Un IDs ko filter karo jo `"wamid_"` se start hote hain (hint: `.startsWith()`)

### Practice 2 — Tuple for SDK function
Ek function `validatePhone(phone: string)` banao jo tuple return kare `[boolean, string]`:
- Agar phone `+` se start ho → `[true, "Valid"]`
- Warna → `[false, "Invalid format"]`

### Practice 3 — Type Alias for Tenant Config
Apne BotAura SDK ke liye socho: har tenant ka apna `TenantConfig` hoga jisme `wabaId`, `accessToken`, aur optional `webhookUrl` ho.
- Ek `type TenantConfig` banao
- Ek array banao `tenants: TenantConfig[]` jisme 2 dummy tenants ho

### Practice 4 — Union Type
`type MessageType` banao jisme sirf ye values allowed hon: `"text" | "image" | "video" | "document"`.
- Ek function `getIcon(type: MessageType)` likho jo har type ke liye ek emoji string return kare (switch/if use karo)

### Practice 5 — readonly Challenge
`const SUPPORTED_LANGUAGES: readonly string[]` banao jisme `"en"`, `"ur"` ho.
- Try karo `.push()` karna — dekho TypeScript kya error deta hai (screenshot le kar samajhna)

### Practice 6 — Bonus (Thoda Mushkil)
Function `sendBulkMessages(phones: string[])` banao jo:
1. Har phone ko `validatePhone` (Practice 2 wala) se check kare
2. Valid aur invalid phones ko alag alag arrays mein daale
3. Tuple return kare: `[validCount: number, invalidCount: number]`

Hint: `.filter()` + tumhara Practice 2 wala function combine karna hai.

---

## ✅ Self-Check (Khud Se Poochho)

- [ ] Mujhe pata hai array aur tuple ka farq kya hai
- [ ] Main type alias khud bana sakta hoon kisi bhi shape ke liye
- [ ] Mujhe pata hai `readonly` kab use karna hai
- [ ] Maine saare 6 practice questions try kiye (chahe ghalat hi sahi)

Jab practice set complete ho jaye, mujhe bata dena — hum tumhara code review karenge (line by line samjha kar, seedha solution nahi denge) aur phir Day 04 (Objects & Interfaces) pe chalte hain. 💪