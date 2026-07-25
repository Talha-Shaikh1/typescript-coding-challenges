# Exercise 2: Design WhatsApp SDK Structure

Design the complete folder structure for a WhatsApp SDK from scratch.

---

## Requirements

Your SDK needs to support:

### Core Features:
1. Send messages
2. Upload media (images, videos)
3. Manage templates
4. Handle webhooks

### Technical Needs:
- HTTP client for API calls
- Type definitions for all entities
- Error handling (API errors, validation errors)
- Validation utilities (phone, message)
- Configuration management

### User Experience:
- Clear public API
- Hide implementation details
- Easy imports (barrel exports)

---

## Your Task

Design the folder structure and fill in the template below.

For each folder, explain:
1. **Purpose** - What is this folder responsible for?
2. **Public/Internal** - Can users import from this?
3. **Key Files** - What files will be in this folder?

---

## Template

```
whatsapp-sdk/
├── src/
│   ├── _________ /          # Purpose: _______________
│   │                        # Public/Internal: _______
│   │   ├── _________.ts
│   │   └── index.ts
│   │
│   ├── _________ /          # Purpose: _______________
│   │                        # Public/Internal: _______
│   │   ├── _________ /
│   │   │   ├── _________.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── _________ /          # Purpose: _______________
│   │                        # Public/Internal: _______
│   │   ├── _________ /
│   │   │   └── _________.ts
│   │   └── _________ /
│   │       └── _________.ts
│   │
│   ├── _________ /          # Purpose: _______________
│   │                        # Public/Internal: _______
│   │   ├── _________.ts
│   │   └── index.ts
│   │
│   ├── _________ /          # Purpose: _______________
│   │                        # Public/Internal: _______
│   │   ├── _________.ts
│   │   └── index.ts
│   │
│   ├── _________ /          # Purpose: _______________
│   │                        # Public/Internal: _______
│   │   ├── _________.ts
│   │   └── index.ts
│   │
│   └── index.ts             # Purpose: Main entry point (public API)
│
├── tests/
│   ├── _________ /
│   └── _________ /
│
├── examples/
│   └── basic-usage.ts
│
└── package.json
```

---

## Questions to Answer

1. **Where does WhatsAppClient go?**
   Folder: _______________
   Why: _______________

2. **Where does MessageService go?**
   Folder: _______________
   Why: _______________

3. **Where does HttpClient go?**
   Folder: _______________
   Public or Internal: _______________
   Why: _______________

4. **Where do type definitions go?**
   Folder: _______________
   Organization: (one types/ folder or per-domain?)
   Why: _______________

5. **Where do error classes go?**
   Folder: _______________
   Why: _______________

6. **Where do validation utilities go?**
   Folder: _______________
   Why: _______________

---

## src/index.ts Design

What should be exported from the main entry point?

```typescript
// src/index.ts

// TODO: Export client


// TODO: Export services (if users need direct access)


// TODO: Export types (type-only)


// TODO: Export errors


// TODO: Export public utilities


// DON'T EXPORT (list what stays internal):
// -
// -
// -
```

---

## Principles Checklist

- [ ] Organized by domain/feature (not by technical type)
- [ ] Clear layering (client → services → API → utils)
- [ ] Public vs internal separation
- [ ] Each folder has single responsibility
- [ ] Easy to find any code
- [ ] Scalable (can add features without restructuring)

---

## Bonus: Explain Your Choices

Write a brief explanation of your design decisions:

1. Why did you organize folders this way?
2. How does this support adding new features?
3. What would happen if you needed to add "contacts" management?
4. How easy is it to find the message validation logic?
