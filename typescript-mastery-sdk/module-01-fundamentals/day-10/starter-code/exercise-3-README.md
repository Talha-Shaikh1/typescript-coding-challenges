# Exercise 3: Build Barrel File System

Create barrel files (index.ts) for a clean import structure.

## Given File Structure

Create these files in this directory:

```
exercise-3/
├── services/
│   ├── messages/
│   │   ├── MessageService.ts
│   │   ├── MessageValidator.ts
│   │   └── index.ts (TODO: Create this barrel)
│   ├── media/
│   │   ├── MediaService.ts
│   │   ├── MediaUploader.ts
│   │   └── index.ts (TODO: Create this barrel)
│   ├── templates/
│   │   ├── TemplateService.ts
│   │   ├── TemplateValidator.ts
│   │   └── index.ts (TODO: Create this barrel)
│   └── index.ts (TODO: Create main services barrel)
└── test-imports.ts (TODO: Create test file)
```

## Tasks

### Step 1: Create the service files

We've provided starter implementations below. Create these files:

**services/messages/MessageService.ts**
```typescript
export class MessageService {
  async send(text: string): Promise<void> {
    console.log(`Sending: ${text}`);
  }
}
```

**services/messages/MessageValidator.ts**
```typescript
export function validateMessage(text: string): boolean {
  return text.length > 0 && text.length <= 4096;
}
```

(Create similar files for media/ and templates/)

### Step 2: Create barrel files

**services/messages/index.ts**
```typescript
// TODO: Export MessageService and validateMessage
```

**services/media/index.ts**
```typescript
// TODO: Export MediaService and MediaUploader
```

**services/templates/index.ts**
```typescript
// TODO: Export TemplateService and TemplateValidator
```

**services/index.ts** (main barrel)
```typescript
// TODO: Re-export everything from messages, media, templates
// Users should be able to:
// import { MessageService, MediaService, TemplateService } from './services';
```

### Step 3: Test your barrels

**test-imports.ts**
```typescript
// TODO: Import multiple services using only ONE import statement
// import { MessageService, MediaService, TemplateService } from './services';
```

## Success Criteria

✅ All services importable from `'./services'`
✅ Only ONE import statement needed
✅ No deep paths like `'./services/messages/MessageService'`

## Bonus

Export everything EXCEPT validators. How would you do that?
