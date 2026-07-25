# Day 12 Exercises: Professional Library Project Structure

Master organizing production-ready SDKs!

---

## 📝 Exercise 1: Analyze Bad Structure (Conceptual)

**Goal:** Samajhna ke bad organization ke kya problems hain

### Given: Poorly Organized SDK

```
messy-sdk/
├── everything.ts         (800 lines!)
├── stuff.ts
├── helpers.ts
├── utils.ts
├── misc.ts
├── functions.ts
└── index.ts
```

### Questions:

1. **What problems would you face as a developer?**
   - Finding code?
   - Understanding responsibility?
   - Testing?
   - What else?

2. **What problems would users face?**
   - Importing?
   - Understanding what's public?
   - Documentation?

3. **How would you refactor this?**
   - What folders would you create?
   - How would you group files?
   - What principles would you follow?

### Expected Answer:

<details>
<summary>Click for answer</summary>

**Problems for developers:**
1. Hard to find anything - which file has MessageService?
2. No clear responsibility - what does "stuff.ts" do?
3. 800-line files are overwhelming and hard to maintain
4. Can't test in isolation - everything is coupled
5. Merge conflicts when multiple people edit same big file

**Problems for users:**
1. Don't know what's public vs internal
2. Confusing imports - `import { X } from 'sdk/stuff'`
3. No clear entry point
4. Hard to understand SDK structure

**Refactoring approach:**
```
organized-sdk/
├── src/
│   ├── client/          # Main client class
│   ├── services/        # Feature-based services
│   │   ├── messages/
│   │   └── media/
│   ├── api/             # HTTP layer (internal)
│   ├── types/           # Type definitions
│   ├── errors/          # Error classes
│   ├── utils/           # Utilities
│   └── index.ts         # Public API
```

**Principles:**
- Domain-driven (group by feature, not file type)
- Clear responsibility (one folder, one purpose)
- Public vs internal separation
- Scalable structure (can add features without restructuring)

</details>

---

## 📝 Exercise 2: Design WhatsApp SDK Structure

**Goal:** Create folder structure from scratch

### Requirements:

Your WhatsApp SDK needs to support:

1. **Core Features:**
   - Send messages
   - Upload media
   - Manage templates
   - Handle webhooks

2. **Technical Needs:**
   - HTTP client for API calls
   - Type definitions
   - Error handling
   - Validation utilities
   - Configuration

3. **User Experience:**
   - Clear public API
   - Hide implementation details
   - Easy imports

### Your Task:

Design the complete folder structure. For each folder, explain:
1. **Purpose** - What goes here?
2. **Public/Internal** - Do users see this?
3. **Files** - What files would be in this folder?

### Template:

```
whatsapp-sdk/
├── src/
│   ├── ??? /          # Purpose: ???
│   │   ├── ???.ts
│   │   └── index.ts
│   ├── ??? /
│   └── index.ts
├── tests/
└── package.json
```

### Deliverable:

Complete folder structure with:
- All necessary folders
- Key files in each folder
- Barrel files (index.ts)
- Clear public vs internal separation

---

## 📝 Exercise 3: Separate Concerns (Refactoring)

**Goal:** Break a monolithic file into proper structure

### Given: Monolithic Code

```typescript
// src/everything.ts (400 lines)

// Types
interface Message {
  id: string;
  to: string;
  text: string;
}

interface ClientConfig {
  apiKey: string;
}

// Errors
class APIError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

// Utilities
function validatePhone(phone: string): boolean {
  return /^\+\d{10,15}$/.test(phone);
}

// HTTP Client
class HttpClient {
  constructor(private apiKey: string) {}
  
  async post(url: string, data: any): Promise<any> {
    // HTTP implementation
  }
}

// Service
class MessageService {
  constructor(private http: HttpClient) {}
  
  async send(to: string, text: string): Promise<Message> {
    validatePhone(to);
    const response = await this.http.post('/messages', { to, text });
    return response;
  }
}

// Main Client
export class WhatsAppClient {
  messages: MessageService;
  
  constructor(config: ClientConfig) {
    const http = new HttpClient(config.apiKey);
    this.messages = new MessageService(http);
  }
}
```

### Your Task:

Refactor into proper folder structure:

**Step 1:** Plan the structure
```
src/
├── ??? /     # Where should WhatsAppClient go?
├── ??? /     # Where should MessageService go?
├── ??? /     # Where should HttpClient go?
├── ??? /     # Where should types go?
├── ??? /     # Where should errors go?
├── ??? /     # Where should utilities go?
└── index.ts  # What should be exported?
```

**Step 2:** Split the code
- Create separate files for each class/function
- Add barrel exports (index.ts)
- Ensure proper imports between files

**Step 3:** Define public API
- What should `src/index.ts` export?
- What should be internal?

### Success Criteria:

- ✅ Each file has one clear responsibility
- ✅ Proper folder organization
- ✅ Clear public API in src/index.ts
- ✅ Internal code hidden from users
- ✅ Clean imports (no ../../.. paths with barrels)

---

## 📝 Exercise 4: Public vs Internal API Design

**Goal:** Understand what to expose vs hide

### Scenario: Your SDK Structure

```
src/
├── client/
│   └── WhatsAppClient.ts
├── services/
│   ├── MessageService.ts
│   └── MediaService.ts
├── api/
│   ├── HttpClient.ts
│   └── endpoints/
│       └── messages.ts
├── types/
│   ├── public/
│   │   └── client.ts
│   └── internal/
│       └── http.ts
├── errors/
│   ├── APIError.ts
│   └── NetworkError.ts
└── utils/
    ├── validators.ts      # validatePhone()
    └── internal/
        └── retry.ts       # retry logic
```

### Questions:

1. **What should src/index.ts export?**
   List everything that should be public.

2. **What should remain internal?**
   List what should NOT be exported.

3. **Why is HttpClient internal?**
   Explain the reasoning.

4. **Should retry.ts be public?**
   Why or why not?

### Task: Write src/index.ts

Create the complete public API export:

```typescript
// src/index.ts

// TODO: Export client


// TODO: Export services


// TODO: Export types (type-only)


// TODO: Export errors


// TODO: Export public utilities


// DON'T EXPORT:
// - HttpClient (internal implementation)
// - retry utilities (internal logic)
// - Internal types
```

---

## 📝 Exercise 5: Scale the Structure

**Goal:** Add new features without breaking organization

### Scenario: Feature Requests

Your WhatsApp SDK needs to add:

1. **New service:** Contact management
2. **New service:** Group management  
3. **New endpoint:** Webhooks
4. **New utility:** Rate limiting
5. **New error type:** RateLimitError

### Your Task:

**Part A:** Where does each go?

For each addition, specify:
- Which folder?
- What file names?
- Any new subfolders?

**Part B:** Update structure

Show the updated folder structure after adding all features:

```
src/
├── client/
├── services/
│   ├── messages/
│   ├── media/
│   ├── ??? /        # Contact management?
│   └── ??? /        # Group management?
├── api/
│   └── endpoints/
│       ├── messages.ts
│       └── ??? .ts   # Webhooks?
├── errors/
│   ├── APIError.ts
│   └── ??? .ts       # RateLimitError?
└── utils/
    ├── validators.ts
    └── ??? .ts        # Rate limiting?
```

**Part C:** Maintain public API

How do you expose new features without breaking existing users?

```typescript
// src/index.ts

// Existing exports (DON'T BREAK THESE)
export { WhatsAppClient } from './client';
export { MessageService } from './services/messages';

// TODO: Add new exports for contacts and groups
```

---

## 📝 Exercise 6: Test Organization

**Goal:** Mirror test structure to src structure

### Given src/ structure:

```
src/
├── services/
│   ├── messages/
│   │   ├── MessageService.ts
│   │   └── MessageValidator.ts
│   └── media/
│       └── MediaService.ts
└── utils/
    └── validators.ts
```

### Your Task:

Design the tests/ folder structure.

**Requirements:**
1. Mirror src/ structure
2. Separate unit vs integration tests
3. Include test helpers

**Template:**

```
tests/
├── unit/
│   ├── ??? /
│   └── ??? /
├── integration/
│   └── ??? /
└── helpers/
    └── mocks.ts
```

### Questions:

1. **Why mirror src/ structure?**
2. **Where would MessageService.test.ts go?**
3. **Where would integration tests for API go?**
4. **What goes in helpers/?**

---

## 🎯 Bonus Challenge: Real-World Migration

**Scenario:** You inherit a messy codebase:

```
old-sdk/
├── index.ts            (500 lines - everything!)
├── api.ts              (300 lines - mixed concerns)
├── helpers.ts          (200 lines - random utilities)
└── package.json
```

### Your Task:

**Step 1:** Analyze the code
- Read index.ts
- Identify distinct responsibilities
- Group related code

**Step 2:** Plan migration
- Design new structure
- Create migration checklist
- Identify breaking changes

**Step 3:** Execute refactoring
- Create new folder structure
- Move code incrementally
- Update imports
- Verify nothing breaks

**Step 4:** Update public API
- Maintain backward compatibility
- Deprecate old exports
- Document migration path

### Deliverable:

- New folder structure
- Migration plan document
- Before/after comparison
- User migration guide

---

## 🏁 Exercise Completion Checklist

- [ ] Exercise 1: Analyzed bad structure
- [ ] Exercise 2: Designed SDK structure
- [ ] Exercise 3: Refactored monolithic code
- [ ] Exercise 4: Defined public API
- [ ] Exercise 5: Scaled structure with new features
- [ ] Exercise 6: Organized tests
- [ ] Bonus: Planned real-world migration

---

## 💡 Key Takeaways

After completing these exercises:

✅ **WHY** structure matters (maintainability, scalability, clarity)  
✅ **HOW** to organize by domain, not file type  
✅ **WHAT** to expose publicly vs keep internal  
✅ **WHEN** to nest folders (when complexity grows)  
✅ **WHERE** each type of code belongs  

**Most Important:** Good structure = Easy to find code, easy to add features, easy for new developers! 🚀

---

## 📚 Next Steps

1. Complete all exercises
2. Apply structure to your own project
3. Review real SDKs (AWS, Stripe) for patterns
4. Move to Day 13: Declaration Files

**Remember:** Structure is foundation - get it right early! 💪
