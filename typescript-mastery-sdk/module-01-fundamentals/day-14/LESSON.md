# 🎯 Day 14: Week 2 Practice Project - SDK Foundation

**Module:** Fundamentals - Week 2  
**Duration:** 3-4 hours  
**Goal:** Week 2 ke saare concepts ko ek complete, production-ready SDK foundation mein integrate karna

---

## 🎓 What You've Learned This Week

**Week 2 Summary:**

✅ **Day 08:** npm packages & package.json  
✅ **Day 09:** TypeScript configuration (tsconfig.json)  
✅ **Day 10:** Module systems & exports  
✅ **Day 11:** Build process & compilation  
✅ **Day 12:** Project structure & organization  
✅ **Day 13:** Declaration files & type definitions  

**Today:** Bring it ALL together! 🚀

---

## 🎯 Project Goal

**Build the complete foundation for WhatsApp SDK:**

A production-ready npm package that:
- ✅ Has proper npm package structure
- ✅ Uses correct TypeScript configuration
- ✅ Exports clean public API with barrel files
- ✅ Compiles correctly to JavaScript
- ✅ Has professional folder organization
- ✅ Generates type definitions for users
- ✅ Is ready to publish to npm

**Not implementing full features yet** - just the solid foundation!

---

## 📋 Project Requirements

### Core Structure:

```
whatsapp-sdk-foundation/
├── src/
│   ├── client/
│   │   ├── WhatsAppClient.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── messages/
│   │   │   ├── MessageService.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── client.ts
│   │   ├── messages.ts
│   │   └── index.ts
│   ├── errors/
│   │   ├── APIError.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   └── index.ts
│   └── index.ts
├── tests/
│   └── (future)
├── dist/ (generated)
├── tsconfig.json
├── package.json
├── .gitignore
└── README.md
```

### Functionality Requirements:

**Minimal but complete:**

1. **WhatsAppClient class**
   - Constructor accepts configuration
   - Has `messages` property (MessageService)
   - Can be instantiated

2. **MessageService class**
   - Has `send()` method signature
   - Returns Promise (stub implementation)

3. **Types**
   - ClientConfig interface
   - Message interface
   - SendMessageRequest interface

4. **Errors**
   - APIError class
   - ValidationError class

5. **Utils**
   - validatePhone() function
   - validateMessage() function

---

## 📝 Step-by-Step Implementation

### Phase 1: Project Setup (30 min)

#### Step 1.1: Initialize Project

```bash
mkdir whatsapp-sdk-foundation
cd whatsapp-sdk-foundation
npm init -y
```

#### Step 1.2: Install Dependencies

```bash
npm install --save-dev typescript
npm install --save-dev rimraf
```

#### Step 1.3: Create .gitignore

```
# .gitignore
node_modules/
dist/
*.log
.DS_Store
*.tsbuildinfo
```

---

### Phase 2: TypeScript Configuration (20 min)

#### Step 2.1: Create tsconfig.json

Apply everything from Day 09:

```json
{
  "compilerOptions": {
    // Target & Module
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",

    // Output
    "outDir": "./dist",
    "rootDir": "./src",

    // Declaration Files
    "declaration": true,
    "declarationMap": true,

    // Source Maps
    "sourceMap": true,

    // Type Checking
    "strict": true,
    "noEmitOnError": true,

    // Interop
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Checklist:**
- [ ] Correct target for Node.js 18+
- [ ] Declaration files enabled
- [ ] Strict mode enabled
- [ ] Output goes to dist/

---

### Phase 3: Folder Structure (15 min)

#### Step 3.1: Create Directory Structure

```bash
mkdir -p src/{client,services/messages,types,errors,utils}
```

#### Step 3.2: Create index.ts Files (Barrels)

Apply Day 10 concepts - create barrel exports:

```bash
touch src/client/index.ts
touch src/services/messages/index.ts
touch src/services/index.ts
touch src/types/index.ts
touch src/errors/index.ts
touch src/utils/index.ts
touch src/index.ts
```

**Checklist:**
- [ ] Domain-driven structure
- [ ] Barrel files for clean imports
- [ ] Clear separation of concerns

---

### Phase 4: Type Definitions (30 min)

#### Step 4.1: Create Client Types

```typescript
// src/types/client.ts

export interface ClientConfig {
  apiKey: string;
  apiUrl?: string;
  timeout?: number;
}

export interface ClientOptions {
  retryAttempts?: number;
  logLevel?: 'debug' | 'info' | 'error';
}
```

#### Step 4.2: Create Message Types

```typescript
// src/types/messages.ts

export interface Message {
  id: string;
  to: string;
  from: string;
  text: string;
  timestamp: number;
}

export interface SendMessageRequest {
  to: string;
  text: string;
}

export interface MessageResponse {
  messageId: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
}
```

#### Step 4.3: Create Types Barrel

```typescript
// src/types/index.ts

export type {
  ClientConfig,
  ClientOptions
} from './client';

export type {
  Message,
  SendMessageRequest,
  MessageResponse
} from './messages';
```

**Checklist:**
- [ ] All interfaces defined
- [ ] Barrel export with `export type`
- [ ] Clear, descriptive names

---

### Phase 5: Error Classes (20 min)

#### Step 5.1: Create APIError

```typescript
// src/errors/APIError.ts

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errorCode: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}
```

#### Step 5.2: Create ValidationError

```typescript
// src/errors/ValidationError.ts

export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

#### Step 5.3: Create Errors Barrel

```typescript
// src/errors/index.ts

export { APIError } from './APIError';
export { ValidationError } from './ValidationError';
```

**Checklist:**
- [ ] Error classes extend Error
- [ ] Custom properties added
- [ ] Barrel export

---

### Phase 6: Utilities (20 min)

#### Step 6.1: Create Validators

```typescript
// src/utils/validators.ts

export function validatePhone(phone: string): boolean {
  if (!phone) {
    return false;
  }
  return /^\+\d{10,15}$/.test(phone);
}

export function validateMessage(text: string): boolean {
  if (!text) {
    return false;
  }
  return text.length > 0 && text.length <= 4096;
}
```

#### Step 6.2: Create Utils Barrel

```typescript
// src/utils/index.ts

export { validatePhone, validateMessage } from './validators';
```

**Checklist:**
- [ ] Pure functions
- [ ] Input validation
- [ ] Barrel export

---

### Phase 7: Services (40 min)

#### Step 7.1: Create MessageService

```typescript
// src/services/messages/MessageService.ts

import type {
  Message,
  SendMessageRequest,
  MessageResponse
} from '../../types';
import { ValidationError } from '../../errors';
import { validatePhone, validateMessage } from '../../utils';

export class MessageService {
  constructor() {
    // Future: Accept API client
  }

  async send(request: SendMessageRequest): Promise<MessageResponse> {
    // Validation
    if (!validatePhone(request.to)) {
      throw new ValidationError('Invalid phone number', 'to');
    }

    if (!validateMessage(request.text)) {
      throw new ValidationError('Invalid message text', 'text');
    }

    // TODO: Actual API call will go here
    // For now, return stub response
    return {
      messageId: Math.random().toString(36).substring(7),
      status: 'sent'
    };
  }

  async get(messageId: string): Promise<Message> {
    // TODO: Implement
    throw new Error('Not implemented yet');
  }
}
```

#### Step 7.2: Create Message Service Barrel

```typescript
// src/services/messages/index.ts

export { MessageService } from './MessageService';
```

#### Step 7.3: Create Services Barrel

```typescript
// src/services/index.ts

export { MessageService } from './messages';
```

**Checklist:**
- [ ] Uses types from types/
- [ ] Uses errors from errors/
- [ ] Uses utils from utils/
- [ ] Proper imports (no circular deps)

---

### Phase 8: Main Client (40 min)

#### Step 8.1: Create WhatsAppClient

```typescript
// src/client/WhatsAppClient.ts

import type { ClientConfig } from '../types';
import { MessageService } from '../services';

export class WhatsAppClient {
  public readonly messages: MessageService;

  constructor(private config: ClientConfig) {
    // Initialize services
    this.messages = new MessageService();
  }

  getConfig(): Readonly<ClientConfig> {
    return { ...this.config };
  }
}
```

#### Step 8.2: Create Client Barrel

```typescript
// src/client/index.ts

export { WhatsAppClient } from './WhatsAppClient';
```

**Checklist:**
- [ ] Accepts configuration
- [ ] Initializes services
- [ ] Clean, focused class

---

### Phase 9: Public API (30 min)

#### Step 9.1: Create Main Entry Point

Apply Day 10 & Day 12 concepts - define clean public API:

```typescript
// src/index.ts

// ============================================
// WhatsApp SDK - Public API
// ============================================

// Main Client
export { WhatsAppClient } from './client';

// Services (if users need direct access)
export { MessageService } from './services';

// Types (type-only exports)
export type {
  ClientConfig,
  ClientOptions,
  Message,
  SendMessageRequest,
  MessageResponse
} from './types';

// Errors
export { APIError, ValidationError } from './errors';

// Public Utilities
export { validatePhone, validateMessage } from './utils';

// ============================================
// Internal modules NOT exported:
// - API layer (future)
// - Internal utilities
// ============================================
```

**Checklist:**
- [ ] Only public API exported
- [ ] Type-only exports for types
- [ ] Clear comments
- [ ] No internal leaks

---

### Phase 10: Package Configuration (30 min)

#### Step 10.1: Configure package.json

Apply Days 08, 11, 13 concepts:

```json
{
  "name": "@your-username/whatsapp-sdk-core",
  "version": "0.1.0",
  "description": "WhatsApp SDK for Node.js - Foundation",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "type": "module",

  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },

  "files": [
    "dist"
  ],

  "scripts": {
    "dev": "tsc --watch",
    "build": "npm run clean && tsc",
    "clean": "rimraf dist",
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "npm run build"
  },

  "keywords": [
    "whatsapp",
    "sdk",
    "api",
    "messaging"
  ],

  "author": "Your Name",
  "license": "MIT",

  "devDependencies": {
    "typescript": "^5.0.0",
    "rimraf": "^5.0.0"
  }
}
```

**Checklist:**
- [ ] Correct entry points (main, types)
- [ ] Build scripts configured
- [ ] Files array includes only dist/
- [ ] prepublishOnly hook set

---

### Phase 11: Build & Verify (20 min)

#### Step 11.1: Compile

```bash
npm run build
```

**Expected output:**
```
dist/
├── client/
│   ├── WhatsAppClient.js
│   ├── WhatsAppClient.d.ts
│   └── index.js, index.d.ts
├── services/
│   └── messages/
│       ├── MessageService.js
│       ├── MessageService.d.ts
│       └── ...
├── types/
├── errors/
├── utils/
└── index.js, index.d.ts
```

#### Step 11.2: Type Check

```bash
npm run typecheck
```

Should pass with no errors!

#### Step 11.3: Test Locally

Create test file:

```typescript
// test-usage.ts
import {
  WhatsAppClient,
  type ClientConfig,
  type SendMessageRequest
} from './dist/index.js';

const config: ClientConfig = {
  apiKey: 'test-key'
};

const client = new WhatsAppClient(config);

const request: SendMessageRequest = {
  to: '+1234567890',
  text: 'Hello World'
};

client.messages.send(request).then(response => {
  console.log('Message sent:', response.messageId);
});
```

Run:
```bash
npx tsx test-usage.ts
```

**Checklist:**
- [ ] Builds without errors
- [ ] All .d.ts files generated
- [ ] Type checking passes
- [ ] Can import and use SDK

---

### Phase 12: Documentation (20 min)

#### Step 12.1: Create README.md

```markdown
# WhatsApp SDK Foundation

Production-ready TypeScript SDK foundation for WhatsApp API.

## Installation

\`\`\`bash
npm install @your-username/whatsapp-sdk-core
\`\`\`

## Usage

\`\`\`typescript
import { WhatsAppClient } from '@your-username/whatsapp-sdk-core';

const client = new WhatsAppClient({
  apiKey: 'your-api-key'
});

await client.messages.send({
  to: '+1234567890',
  text: 'Hello World'
});
\`\`\`

## Features

- ✅ Type-safe API
- ✅ Promise-based
- ✅ Full TypeScript support
- ✅ Modular architecture

## Status

🚧 Foundation phase - core structure complete, features in progress.

## License

MIT
```

**Checklist:**
- [ ] Installation instructions
- [ ] Usage example
- [ ] Features listed
- [ ] Status clear

---

## ✅ Final Checklist

### Structure:
- [ ] Proper folder organization (domain-driven)
- [ ] Barrel exports in all folders
- [ ] Clear public vs internal separation

### Configuration:
- [ ] tsconfig.json with declaration: true
- [ ] package.json with correct entry points
- [ ] Build scripts working

### Code Quality:
- [ ] All files compile without errors
- [ ] Type checking passes
- [ ] No circular dependencies
- [ ] Clean imports (no ../..)

### Output:
- [ ] dist/ folder generated
- [ ] .d.ts files present
- [ ] .d.ts.map files present
- [ ] Can import SDK in test file

### Documentation:
- [ ] README.md created
- [ ] Code comments present
- [ ] Clear API surface

---

## 🎯 Success Criteria

You've completed Week 2 when:

1. ✅ SDK compiles without errors
2. ✅ All type definitions generated
3. ✅ Can import and use WhatsAppClient
4. ✅ Autocomplete works in IDE
5. ✅ Professional folder structure
6. ✅ Ready for npm publish (npm pack works)

---

## 🚀 Next Steps

**Week 3 Preview:**

Now that foundation is solid, you'll add:
- HTTP client implementation
- Real API integration
- Error handling
- Testing
- More services (media, templates)

**Foundation First, Features Second!**

You've built a professional SDK structure. Now it's ready to grow! 💪

---

## 💡 Reflection Questions

After completing:

1. How does each Week 2 concept fit together?
2. Why is structure important before features?
3. What would break if you skipped any step?
4. How easy is it to find any code?
5. Would you be proud to publish this?

**Congratulations on completing Week 2!** 🎉
