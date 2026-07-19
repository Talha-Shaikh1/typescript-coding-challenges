# Module 8: Async/Await & Promises

---

## 1. Concept Explanation

### Synchronous vs Asynchronous Code

**Synchronous code** line by line chalta hai — jab tak ek line khatam nahi hoti, agli line start nahi hoti. Yeh simple hai lekin problem tab aati hai jab koi operation time le (jaise network request, file read, database call) — synchronous tareeqe se poora program us operation ke complete hone tak "block" ho jayega, kuch aur nahi ho sakega.

**Asynchronous code** operations ko background mein chalne deta hai — jab tak koi slow operation (jaise Meta Graph API ko message bhejna) complete ho raha ho, baaki program rukta nahi, aage chalta rehta hai. Jab operation complete ho jaye, uska result "later" handle kiya jata hai. Yeh multi-tenant SDK ke liye zaroori hai kyunki tumhe ek tenant ka API call complete hone ka wait nahi karna — dusre tenants ke calls bhi sath mein chal sakte hain.

### Promise kya hai

**Promise** ek object hai jo represent karta hai ke ek async operation **abhi complete nahi hui, lekin future mein hogi** — aur uska result ya error tab milega. Promise teen states mein ho sakta hai:

- **pending** — operation abhi chal rahi hai, result nahi mila
- **fulfilled** — operation successfully complete hui, result mil gaya
- **rejected** — operation fail hui, error mila

### async/await Promises ko readable kaise banata hai

Promises ko `.then()/.catch()` se handle karna kaam to karta hai, lekin jab multiple async steps chain karne hon to code nested aur padhne mein mushkil ho jata hai. `async/await` syntax sugar hai jo Promise-based code ko **synchronous jaisa dikhta hai**, lekin behave asynchronously hi karta hai — bohat zyada readable ho jata hai.

### Callback Hell aur async/await Isay Kaise Solve Karta Hai

Purane JavaScript mein async operations ke liye **callbacks** use hote the — ek function dusre function ke andar pass hota, wo aage teesre ke andar, aur is tarah nested callbacks ka pyramid ban jata tha ("callback hell" / "pyramid of doom"), jo padhna aur debug karna bohat mushkil hota:

```typescript
// Callback hell example (isse bachna hai)
getTenant(id, (tenant) => {
  getToken(tenant, (token) => {
    sendMessage(token, (result) => {
      console.log(result);
    });
  });
});
```

`async/await` isko flat, top-to-bottom readable code mein convert kar deta hai (neeche syntax section mein dekhenge).

### Multi-Tenant SDK mein Parallel Async Operations kyun zaroori hain

Agar tumhare SDK mein 100 tenants hain aur har ek ko message bhejna hai, aur tum `await` sequentially (ek ke baad ek) use karo, to total time = 100 × (ek API call ka time) — bohat slow. Isliye tumhe operations ko **parallel** chalana hai (sab tenants ke calls ek sath start karo, sab ka result ek sath collect karo) — is se total time sirf sabse slow call jitna hoga, na ke sabka sum. Iske liye `Promise.all`/`Promise.allSettled` use hote hain (aage dekhenge).

---

## 2. Syntax & Methods

### Promise Creation: `new Promise()`

```typescript
const myPromise = new Promise<string>((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Operation done");
  } else {
    reject("Operation failed");
  }
});
```
> `resolve()` promise ko fulfilled banata hai (result ke sath), `reject()` usko rejected banata hai (error ke sath). `<string>` batata hai ke resolve hone pe kya type milega.

### `.then()`, `.catch()`, `.finally()`

```typescript
myPromise
  .then((result) => console.log("Success:", result))
  .catch((error) => console.log("Error:", error))
  .finally(() => console.log("Done, chahe success ho ya fail"));
```
> `.then()` fulfilled result handle karta hai, `.catch()` rejected error handle karta hai, `.finally()` dono cases mein chalta hai.

### `async` Function Declaration

```typescript
async function fetchData(): Promise<string> {
  return "Data fetched";
}
```
> `async` keyword function ko batata hai ke yeh hamesha ek Promise return karega — chahe tum khud `Promise` na likho, JS automatically wrap kar deta hai.

### `await` Keyword

```typescript
async function run() {
  const result = await fetchData(); // yahan wait karta hai jab tak Promise resolve na ho
  console.log(result);
}
```
> `await` sirf `async` function ke andar use hota hai — Promise ke resolve hone tak wait karta hai, aur uska result direct value ki tarah return karta hai (Promise unwrap ho jata hai).

### `try/catch` with async/await

```typescript
async function sendData(): Promise<void> {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}
```
> `async/await` ke sath error handling ke liye `try/catch` use karte hain — `.catch()` ki jagah, jo normal synchronous error handling jaisa hi feel hota hai.

### `Promise.all`, `Promise.race`, `Promise.allSettled`

```typescript
const p1 = Promise.resolve("Tenant A done");
const p2 = Promise.resolve("Tenant B done");
const p3 = Promise.reject("Tenant C failed");

// Promise.all — SAB resolve hone chahiye, agar EK bhi reject ho to poora Promise.all reject ho jata hai
Promise.all([p1, p2]).then(results => console.log(results));

// Promise.race — jo sabse pehle settle (resolve ya reject) ho, wahi result milta hai
Promise.race([p1, p2]).then(result => console.log(result));

// Promise.allSettled — HAR promise ka result milta hai (fulfilled ya rejected), koi bhi fail ho to baaki affect nahi hote
Promise.allSettled([p1, p2, p3]).then(results => console.log(results));
```

| Method | Kaam (Roman Urdu) |
|---|---|
| `Promise.all()` | Sab promises resolve hone ka wait karta hai — ek bhi fail ho to poora reject ho jata hai |
| `Promise.race()` | Jo sabse pehle settle ho (win/lose dono), uska result deta hai |
| `Promise.allSettled()` | Har promise ka result deta hai (status: fulfilled/rejected) — ek ka fail hona baaki ko affect nahi karta |

> **Multi-tenant ke liye `Promise.allSettled` bohat important hai:** Agar ek tenant ka Meta API call fail ho jaye (jaise expired token), to `Promise.all` poora operation reject kar dega — matlab baaki sab tenants ke successful results bhi lost ho jayenge. `Promise.allSettled` se har tenant ka apna result independently milta hai — ek ki failure dusron ko block nahi karti.

### `fetch()` API Basics with TypeScript Typing

```typescript
interface GraphApiResponse {
  message_id: string;
  status: string;
}

async function callMetaApi(url: string, token: string): Promise<GraphApiResponse> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data: GraphApiResponse = await response.json();
  return data;
}
```
> `fetch()` khud ek Promise return karta hai jo `Response` object deta hai; `.json()` bhi async hai (khud ek Promise), isliye usko bhi `await` karna padta hai. Response ko interface se type karna response ka shape guarantee karta hai.

### Typing Async Function Return Values: `Promise<Type>`

```typescript
async function getStatus(): Promise<"verified" | "pending" | "failed"> {
  return "verified";
}
```
> Async function ka return type hamesha `Promise<X>` likha jata hai, jahan `X` woh actual value ka type hai jo `await` karne pe milega.

---

## 3. Practice Problems (Sirf Module 8 ka topic)

**Problem 1 (Easy):** Ek Promise banao jo 1 second ke baad (setTimeout ke sath) resolve ho ke `"Done"` string return kare.

*Example pattern:*
```typescript
const wait = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Finished"), 1000);
});
```

**Problem 2 (Easy):** Ek `async function` banao jo ek number leti hai aur usko double karke return karti hai (`Promise<number>` return type ke sath).

*Example pattern:*
```typescript
async function triple(n: number): Promise<number> {
  return n * 3;
}
```

**Problem 3 (Easy-Medium):** Problem 1 ka Promise `await` karo ek `async function` ke andar aur result console.log karo, `try/catch` ke sath.

*Example pattern:*
```typescript
async function run(): Promise<void> {
  try {
    const result = await wait;
    console.log(result);
  } catch (e) {
    console.log("Error:", e);
  }
}
```

**Problem 4 (Medium):** Do async functions banao jo alag alag values return karti hain, phir `Promise.all()` use karke dono ko parallel chalao aur combined result print karo.

*Example pattern:*
```typescript
async function getA(): Promise<string> { return "A"; }
async function getB(): Promise<string> { return "B"; }
async function combine() {
  const [a, b] = await Promise.all([getA(), getB()]);
  console.log(a, b);
}
```

**Problem 5 (Medium):** 3 promises banao jinme se ek reject ho jaye. `Promise.allSettled()` use karke dekho ke kaunse fulfilled hue aur kaunsa rejected, aur loop (Module 6) se har result ka status print karo.

*Example pattern:*
```typescript
const tasks = [Promise.resolve(1), Promise.reject("fail"), Promise.resolve(3)];
Promise.allSettled(tasks).then(results => {
  for (const r of results) {
    console.log(r.status);
  }
});
```

**Problem 6 (Medium-Hard):** `fetch()` use karke koi bhi public API call karo (jaise `https://jsonplaceholder.typicode.com/todos/1`), response ko ek interface se type karo, aur data print karo.

*Example pattern:*
```typescript
interface Post { id: number; title: string; }
async function getPost(): Promise<Post> {
  const res = await fetch("https://example.com/post/1");
  return res.json();
}
```

**Problem 7 (Hard):** Ek async function banao jo error throw kare agar input invalid ho (jaise negative number), aur usko call karke `try/catch` se error handle karo.

*Example pattern:*
```typescript
async function validateAge(age: number): Promise<number> {
  if (age < 0) throw new Error("Invalid age");
  return age;
}
```

---

## 4. Mixed Real-World Problems (Module 1-8 combo, Multi-Tenant WhatsApp SDK context)

**Problem 1 — Async sendMessage on WhatsAppClient:** `WhatsAppClient` class (Module 7) mein ek `async sendMessage(to: string, body: string): Promise<{ success: boolean }>` method add karo jo apni `private accessToken` (Module 7) use karke `fetch()` se ek Meta Graph API call simulate kare, `try/catch` ke sath.

*Example pattern:*
```typescript
class ApiService {
  constructor(private apiKey: string) {}

  async postData(payload: object): Promise<{ ok: boolean }> {
    try {
      const res = await fetch("https://example.com/api", {
        method: "POST",
        headers: { Authorization: `Bearer ${this.apiKey}` },
        body: JSON.stringify(payload),
      });
      return { ok: res.ok };
    } catch (e) {
      return { ok: false };
    }
  }
}
```

**Problem 2 — Parallel Messages with allSettled:** `TenantManager` (Module 7) mein ek `async sendToAllTenants(message: string)` method banao jo sab tenants ke `WhatsAppClient` instances (Module 3: array/Map se loop) pe `Promise.allSettled` use karke parallel message bheje — taake ek tenant ka fail hona baaki ko block na kare.

*Example pattern:*
```typescript
class BatchSender {
  private clients: { id: string; send: () => Promise<boolean> }[] = [];

  async sendToAll(): Promise<void> {
    const results = await Promise.allSettled(this.clients.map(c => c.send()));
    console.log(results);
  }
}
```

**Problem 3 — Async Number Verification Flow:** Ek `async function verifyNumber(tenantId: string): Promise<"verified" | "failed">` banao jo pehle ek "request verification" API call kare (`await`), phir loop (Module 6) mein status "poll" kare har kuch second baad (setTimeout + Promise wrap karke) jab tak status `"verified"` ya `"failed"` na ho jaye.

*Example pattern:*
```typescript
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function pollStatus(): Promise<string> {
  let status = "pending";
  while (status === "pending") {
    await delay(500);
    status = "verified"; // simulate a status check
  }
  return status;
}
```

**Problem 4 — Async Tenant Registration:** `TenantManager` (Module 7) mein ek `async registerTenant(tenantData: Tenant): Promise<boolean>` method banao jo pehle `await` se token ko validate kare (ek mock async function `validateToken()` call karke), aur agar valid ho to hi tenant ko internal storage (Map/array) mein add kare — `if/else` (Module 2) ke sath.

*Example pattern:*
```typescript
async function isTokenValid(token: string): Promise<boolean> {
  return token.length > 5;
}

class UserRegistry {
  private users: string[] = [];

  async register(token: string): Promise<boolean> {
    const valid = await isTokenValid(token);
    if (valid) {
      this.users.push(token);
      return true;
    }
    return false;
  }
}
```

**Problem 5 — Combining Loops + Async Batch Processing:** Ek array of tenant IDs (Module 3) liya, `map()` se har ek ke liye ek async `sendMessage`-type Promise banao, `Promise.allSettled` se sabko parallel run karo, aur phir loop (Module 6) se count karo kitne successful hue aur kitne failed.

*Example pattern:*
```typescript
async function processAll(ids: string[]): Promise<void> {
  const promises = ids.map(id => Promise.resolve(id.length > 2));
  const results = await Promise.allSettled(promises);
  let successCount = 0;
  for (const r of results) {
    if (r.status === "fulfilled") successCount++;
  }
  console.log(successCount);
}
```

---

## 5. Key Takeaways

- Asynchronous code se slow operations (jaise Meta Graph API calls) baaki program ko block nahi karte — yeh multi-tenant SDK ke liye zaroori hai jahan bohat saare independent operations parallel chalne hain.
- `async/await` Promise-based code ko synchronous jaisa readable bana deta hai, aur `.then()` chains ya callback hell se bachata hai.
- `try/catch` `async/await` ke sath errors handle karne ka standard tareeqa hai — har external API call ke around isko use karna chahiye.
- `Promise.all` ek fail hone pe sab kuch reject kar deta hai, jabke `Promise.allSettled` har operation ka independent result deta hai — multi-tenant messaging mein `allSettled` isliye zyada safe choice hai, taake ek tenant ki failure baaki tenants ko affect na kare.
- Async function ka return type hamesha `Promise<Type>` likhna chahiye — isse compile-time pe hi pata chal jata hai ke `await` karne pe kya milega.