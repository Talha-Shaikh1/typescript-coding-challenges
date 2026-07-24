# Phase 0 - Part 3

# Repository Structure

## Objective

Define the complete repository organization for the first version of the WhatsApp SDK.

The repository structure should provide:

- Clear separation of responsibilities
- Easy navigation
- Contributor-friendly development
- Scalable future growth
- Clean publishing workflow

The structure should remain simple while supporting professional open-source development.

---

# 1. Initial Repository Structure

The first version will follow a single package architecture.

```
whatsapp-sdk/

├── src/

├── tests/

├── examples/

├── docs/

├── scripts/

├── .github/

├── package.json

├── tsconfig.json

├── vitest.config.ts

├── eslint.config.js

├── prettier.config.js

├── README.md

├── LICENSE

└── CHANGELOG.md
```

---

# 2. Source Directory

## Purpose

The `src` directory contains all SDK source code.

Structure:

```
src/

├── client/

├── services/

├── http/

├── errors/

├── types/

├── utils/

├── constants/

└── index.ts
```

---

# 2.1 client/

## Purpose

Contains the public SDK client.

Example:

```
client/

└── WhatsAppClient.ts
```

Responsibilities:

- Initialize SDK
- Manage configuration
- Expose services
- Coordinate internal components

---

# 2.2 services/

## Purpose

Contains WhatsApp feature implementations.

Structure:

```
services/

├── messages/

├── media/

├── templates/

└── webhooks/
```

Each service represents one business capability.

Example:

```
messages/

├── MessageService.ts

├── message.types.ts

└── message.utils.ts
```

---

# 2.3 HTTP Layer

## Purpose

Handles communication with Meta Graph API.

Structure:

```
http/

├── HttpClient.ts

├── RequestBuilder.ts

├── ResponseParser.ts

└── headers.ts
```

Responsibilities:

- API requests
- Authentication
- Responses
- Networking errors

---

# 2.4 errors/

## Purpose

Contains SDK error definitions.

Structure:

```
errors/

├── WhatsAppError.ts

├── AuthenticationError.ts

├── ValidationError.ts

├── NetworkError.ts

└── index.ts
```

---

# 2.5 types/

## Purpose

Contains shared TypeScript definitions.

Examples:

```
types/

├── message.ts

├── media.ts

├── webhook.ts

└── common.ts
```

---

# 2.6 utils/

## Purpose

Contains reusable internal utilities.

Examples:

```
utils/

├── validation.ts

├── formatting.ts

└── helpers.ts
```

---

# 2.7 constants/

## Purpose

Contains shared constant values.

Examples:

```
constants/

├── api.ts

├── headers.ts

└── defaults.ts
```

---

# 3. Tests Directory

## Purpose

Contains automated tests.

Structure:

```
tests/

├── unit/

├── integration/

└── fixtures/
```

---

## Unit Tests

Test individual components.

Example:

```
tests/unit/http/HttpClient.test.ts
```

---

## Integration Tests

Test complete flows.

Example:

```
tests/integration/messages.test.ts
```

---

## Fixtures

Contains reusable test data.

Example:

```
tests/fixtures/message-response.json
```

---

# 4. Examples Directory

## Purpose

Provide working examples for developers.

Structure:

```
examples/

├── basic/

├── express/

└── webhook/
```

Examples should always use the public SDK API.

---

# 5. Docs Directory

## Purpose

Contains developer documentation.

Structure:

```
docs/

├── getting-started/

├── guides/

├── api-reference/

└── troubleshooting/
```

---

# 6. Scripts Directory

## Purpose

Contains development automation scripts.

Examples:

```
scripts/

├── build.ts

├── release.ts

└── generate-types.ts
```

---

# 7. GitHub Directory

## Purpose

Contains repository automation.

Structure:

```
.github/

├── workflows/

├── ISSUE_TEMPLATE/

└── PULL_REQUEST_TEMPLATE.md
```

---

# 8. Root Configuration Files

## package.json

Defines:

- Package information
- Dependencies
- Scripts
- Publishing configuration

---

## tsconfig.json

Defines TypeScript compiler settings.

---

## vitest.config.ts

Defines testing configuration.

---

## README.md

The first entry point for developers.

Contains:

- Introduction
- Installation
- Quick Start
- Examples
- Links

---

## CHANGELOG.md

Tracks:

- New features
- Fixes
- Breaking changes

---

# 9. Structure Principles

The repository follows these principles:

## Keep Related Files Together

Feature-related files should live together.

---

## Avoid Deep Nesting

Folders should remain easy to navigate.

---

## Public API Separation

Internal implementation should remain separate from exported APIs.

---

## Test Every Feature

Every major feature must have tests.

---

# Summary

The repository structure provides a clean foundation for building a production-grade TypeScript WhatsApp SDK.

The initial structure is intentionally simple while keeping the project ready for future ecosystem growth.

---

**Next Section**

3.2 Source Architecture

---

# 3.2 Source Architecture

## Purpose

The source architecture defines how SDK code is organized internally.

The goal is to create a predictable structure where developers can easily:

- Find code
- Add features
- Fix bugs
- Write tests
- Contribute changes

The source directory should clearly separate:

- Public APIs
- Internal implementation
- Business logic
- Shared utilities

---

# Source Directory Overview

The initial source structure:

```
src/

├── index.ts

├── client/

├── services/

├── http/

├── config/

├── errors/

├── types/

├── utils/

└── constants/
```

---

# 3.2.1 index.ts

## Purpose

`index.ts` is the public entry point of the SDK.

It controls what developers can import from the package.

Example:

```ts
import {
  WhatsAppClient
} from "@whatsapp-sdk/core"
```

---

## Responsibilities

The index file should:

- Export public classes
- Export public types
- Export public errors
- Hide internal implementation

---

## Example

```ts
export {
  WhatsAppClient
} from "./client/WhatsAppClient"

export {
  WhatsAppError
} from "./errors"
```

---

## Internal Code Protection

Developers should not import internal files directly.

Avoid:

```ts
import {
 HttpClient
} from "@whatsapp-sdk/core/src/http"
```

Instead:

```ts
import {
 WhatsAppClient
} from "@whatsapp-sdk/core"
```

---

# 3.2.2 Client Layer

Directory:

```
client/

└── WhatsAppClient.ts
```

---

## Purpose

The client layer provides the main SDK interface.

---

## Responsibilities

The client:

- Initializes configuration
- Creates internal dependencies
- Initializes services
- Exposes public methods

Example:

```ts
const client = new WhatsAppClient({
 accessToken,
 phoneNumberId
})
```

---

## Restrictions

The client should NOT:

- Send API requests directly
- Contain WhatsApp business logic
- Handle response parsing

Those responsibilities belong to other layers.

---

# 3.2.3 Service Layer

Directory:

```
services/

├── messages/

├── media/

├── templates/

└── webhooks/
```

---

## Purpose

Services contain feature-specific business logic.

---

## Example

Message service:

```
messages/

├── MessageService.ts

├── message.types.ts

└── message.mapper.ts
```

---

## Responsibilities

Services:

- Accept developer input
- Validate data
- Prepare operations
- Call HTTP layer
- Return typed results

---

## Service Rule

Services should understand:

"What operation should happen?"

They should not understand:

"How HTTP request is executed?"

---

# 3.2.4 HTTP Layer

Directory:

```
http/

├── HttpClient.ts

├── RequestBuilder.ts

├── ResponseParser.ts

└── transport.ts
```

---

## Purpose

The HTTP layer handles all external communication.

---

## Responsibilities

- API requests
- Headers
- Authentication
- Response handling
- Network errors

---

## Rule

Only HTTP layer knows about:

- fetch
- HTTP methods
- URLs
- Request headers

---

# 3.2.5 Config Layer

Directory:

```
config/

├── Configuration.ts

└── defaults.ts
```

---

## Purpose

Centralized SDK configuration management.

---

## Responsibilities

- Store configuration
- Validate options
- Provide defaults

---

# 3.2.6 Error Layer

Directory:

```
errors/

├── WhatsAppError.ts

├── ApiError.ts

├── NetworkError.ts

└── ValidationError.ts
```

---

## Purpose

Provide consistent error handling.

---

## Responsibilities

- Define error classes
- Format errors
- Provide debugging information

---

# 3.2.7 Types Layer

Directory:

```
types/

├── messages.ts

├── media.ts

├── templates.ts

└── webhook.ts
```

---

## Purpose

Contains reusable TypeScript types.

---

## Rules

Types should:

- Be framework independent
- Be reusable
- Avoid implementation details

---

# 3.2.8 Utils Layer

Directory:

```
utils/

├── validation.ts

├── formatting.ts

└── helpers.ts
```

---

## Purpose

Contains small reusable internal functions.

---

## Rules

Utilities should:

- Have one responsibility
- Be easily testable
- Avoid business logic

---

# Dependency Flow

The source architecture follows this direction:

```
index.ts

↓

Client

↓

Services

↓

HTTP

↓

External API
```

Shared components:

```
Config

Errors

Types

Utils
```

can support multiple layers.

---

# Architecture Rules

The source code must follow:

1. Public API stays small.

2. Internal files remain private.

3. Business logic stays inside services.

4. HTTP logic stays inside HTTP layer.

5. Shared code should not be duplicated.

6. Every module should have a clear responsibility.

---

# Summary

The source architecture creates a clean separation between public interfaces, business features, infrastructure, and shared utilities.

This structure allows the WhatsApp SDK to grow while remaining understandable and maintainable.

---

**Next Section**

3.3 Public API Design

---

# 3.3 Public API Design

## Purpose

The Public API defines how developers interact with the WhatsApp SDK.

The goal is to provide an interface that is:

- Simple
- Predictable
- Type-safe
- Easy to discover
- Stable over time

Internal implementation details should never affect the developer experience.

---

# Public API Philosophy

The SDK should follow:

```
Simple to start

↓

Powerful when needed

↓

Predictable at scale
```

A beginner should be able to send their first message quickly, while advanced developers should have enough flexibility for production systems.

---

# 3.3.1 Client Initialization

The SDK starts with a single client instance.

Example:

```ts
const client = new WhatsAppClient({
  accessToken: process.env.WHATSAPP_TOKEN,
  phoneNumberId: process.env.PHONE_NUMBER_ID
})
```

---

## Initialization Rules

The client should:

- Validate configuration
- Initialize internal services
- Prepare dependencies
- Provide feature access

---

# 3.3.2 Service-Based API

Features should be organized through services.

Example:

```ts
client.messages

client.media

client.templates

client.webhooks
```

---

## Why Services?

A service-based API provides:

- Better discoverability
- Clear feature separation
- Easier future expansion

---

# 3.3.3 Messages API

Example:

```ts
await client.messages.sendText({
  to: "923001234567",
  text: "Hello World"
})
```

---

Possible future APIs:

```ts
client.messages.sendImage()

client.messages.sendDocument()

client.messages.sendTemplate()
```

---

# 3.3.4 Media API

Example:

```ts
await client.media.upload({
  file
})
```

---

Possible future APIs:

```ts
client.media.get()

client.media.delete()
```

---

# 3.3.5 Template API

Example:

```ts
await client.templates.send({
  name: "order_confirmation",
  language: "en",
  parameters: []
})
```

---

# 3.3.6 Webhook API

Example:

```ts
client.webhooks.verify(request)
```

---

Possible future APIs:

```ts
client.webhooks.parse()

client.webhooks.handle()
```

---

# Public API Rules

The public API must follow these rules:

---

## Rule 1 — Keep It Simple

Avoid unnecessary complexity.

Good:

```ts
client.messages.sendText()
```

Avoid:

```ts
client.services.messageService.executeTextMessageRequest()
```

---

## Rule 2 — Use Clear Names

Names should describe actions.

Good:

```ts
sendMessage()

uploadMedia()

verifyWebhook()
```

Avoid:

```ts
process()

execute()

handle()
```

---

## Rule 3 — Avoid Exposing Internals

Developers should not interact with:

- Request builders
- HTTP clients
- Internal parsers
- Private utilities

---

## Rule 4 — Stable APIs

Once released, public APIs should remain stable.

Breaking changes require:

- Major version bump
- Migration guide
- Documentation update

---

# TypeScript Experience

The API should provide excellent autocomplete.

Example:

Developer writes:

```ts
client.
```

Editor should suggest:

```
messages
media
templates
webhooks
```

---

# Error Experience

Errors should also be part of the public API.

Example:

```ts
try {

 await client.messages.sendText(data)

}

catch(error){

 if(error instanceof WhatsAppError){

 }

}
```

---

# Configuration Experience

Configuration should remain simple.

Beginner:

```ts
new WhatsAppClient({
 accessToken,
 phoneNumberId
})
```

Advanced:

```ts
new WhatsAppClient({
 accessToken,
 phoneNumberId,
 timeout,
 retryPolicy,
 logger
})
```

---

# Future API Expansion

Future capabilities may include:

```ts
client.catalog

client.flows

client.analytics

client.businessProfile
```

However, new features should only be added when they provide real value.

---

# Public API Review Checklist

Before releasing a feature:

- Is the API easy to understand?
- Is naming clear?
- Are types complete?
- Are errors documented?
- Is backward compatibility considered?

---

# Summary

The Public API is the face of the WhatsApp SDK.

A carefully designed API creates a better developer experience, encourages adoption, and builds long-term trust with the community.

---

**Next Section**

3.4 Internal Module Boundaries

---

# 3.4 Internal Module Boundaries

## Purpose

Internal module boundaries define how different parts of the SDK communicate with each other.

The purpose is to maintain:

- Clear responsibilities
- Low coupling
- Better testing
- Easier maintenance
- Predictable code structure

Every module should know only what it needs to know.

---

# Module Dependency Philosophy

The SDK follows a controlled dependency direction.

The dependency flow is:

```text
Client

↓

Services

↓

Infrastructure

↓

External API
```

Shared modules:

```text
Types

Errors

Config

Utils
```

can support multiple layers.

---

# 3.4.1 Client Boundary

## Responsibility

The Client layer is the public coordinator of the SDK.

It is responsible for:

- Creating services
- Managing configuration
- Sharing dependencies

---

## Client Can Access

Allowed:

```
Client

↓

Config

↓

Services

↓

Infrastructure
```

---

## Client Cannot Do

The client should not:

- Build API payloads
- Send HTTP requests directly
- Handle Meta responses

Example:

❌ Wrong:

```ts
client.sendRequest()
```

---

Correct:

```ts
client.messages.sendText()
```

---

# 3.4.2 Service Boundary

## Responsibility

Services contain feature-level business logic.

Examples:

```
MessageService

MediaService

TemplateService
```

---

## Services Can Access

Allowed:

```
Services

↓

Http Client

↓

Types

↓

Errors

↓

Utils
```

---

## Services Cannot Access

Services should not directly access:

- fetch()
- HTTP headers
- Authentication tokens
- Environment variables

Example:

❌ Wrong:

```ts
fetch(
 "https://graph.facebook.com"
)
```

inside:

```
MessageService.ts
```

---

Correct:

```ts
MessageService

↓

HttpClient

↓

Meta API
```

---

# 3.4.3 HTTP Boundary

## Responsibility

The HTTP layer handles external communication.

---

## HTTP Can Access

Allowed:

```
HTTP

↓

Config

↓

Types

↓

Errors
```

---

## HTTP Cannot Access

HTTP should not know about:

- Messages
- Media
- Templates
- Business operations

Example:

❌ Wrong:

```ts
if(messageType==="image")
```

inside:

```
HttpClient.ts
```

---

The HTTP layer only understands requests and responses.

---

# 3.4.4 Types Boundary

## Responsibility

Types provide shared contracts.

---

## Rules

Types should:

- Not import services
- Not contain business logic
- Remain reusable

Example:

Good:

```ts
interface MessageResponse {

 id:string

}
```

Bad:

```ts
class MessageService {

}
```

inside types.

---

# 3.4.5 Error Boundary

## Responsibility

Errors provide consistent failure handling.

---

## Rules

All layers may create or use SDK errors.

Example:

```
ValidationError

NetworkError

ApiError
```

---

Errors should not depend on:

- Services
- HTTP implementation
- Frameworks

---

# 3.4.6 Utility Boundary

## Responsibility

Utilities provide small reusable helpers.

---

## Rules

Utilities should:

- Stay generic
- Avoid business logic
- Be independently testable

---

Example:

Good:

```ts
formatPhoneNumber()
```

Bad:

```ts
sendWhatsAppMessage()
```

---

# Circular Dependency Prevention

Circular dependencies are forbidden.

Example:

❌ Wrong:

```text
Service

↓

Client

↓

Service
```

---

Another example:

❌ Wrong:

```text
HttpClient

↓

MessageService

↓

HttpClient
```

---

# Import Rules

Internal imports should follow:

```
Lower layers cannot import higher layers
```

Example:

Allowed:

```
Service

↓

HTTP
```

Not allowed:

```
HTTP

↓

Service
```

---

# Public vs Private Code

Public:

```
src/index.ts
```

Exports:

- Client
- Types
- Errors

---

Private:

```
src/http/

src/utils/

src/internal/
```

Internal code can change without breaking users.

---

# Testing Benefits

Clear boundaries make testing easier.

Example:

MessageService can be tested with a mocked HttpClient.

No real API call required.

---

# Contributor Guidelines

Before adding a new module, contributors should ask:

1. What responsibility does this module own?
2. Which modules can it depend on?
3. Is it public or internal?
4. Can it be tested independently?

---

# Summary

Internal module boundaries keep the WhatsApp SDK clean and maintainable.

By controlling dependencies and responsibilities, the project can grow without becoming difficult to understand or modify.

---

**Next Section**

3.5 File Naming Conventions

---

# 3.5 File Naming Conventions

## Purpose

File naming conventions define the standard way files, folders, classes, types, and tests should be named throughout the project.

Consistent naming improves:

- Code readability
- Developer experience
- Searchability
- Contributor onboarding
- Long-term maintenance

---

# General Naming Rules

The project follows:

- Clear names
- Descriptive names
- Consistent casing
- No unnecessary abbreviations

Names should explain the responsibility of the file.

---

# 3.5.1 TypeScript File Naming

All TypeScript files should use:

```text
camelCase
```

Example:

```
messageService.ts

httpClient.ts

requestBuilder.ts
```

---

Avoid:

```
MessageService.ts

HTTP_CLIENT.ts

request-builder.ts
```

---

# 3.5.2 Class Naming

Classes use:

```text
PascalCase
```

Example:

File:

```
whatsappClient.ts
```

Class:

```ts
class WhatsAppClient {

}
```

---

More examples:

```ts
class MessageService {}

class HttpClient {}

class ValidationError {}
```

---

# 3.5.3 Interface Naming

Interfaces use:

```text
PascalCase
```

Example:

```ts
interface MessageOptions {

}
```

---

The project should avoid unnecessary prefixes.

Avoid:

```ts
interface IMessageOptions {}
```

Reason:

Modern TypeScript does not require interface prefixes.

---

# 3.5.4 Type Naming

Types use:

```text
PascalCase
```

Example:

```ts
type MessageStatus = "sent" | "failed"
```

---

Examples:

```ts
type MediaType

type WebhookEvent

type ApiResponse
```

---

# 3.5.5 Function Naming

Functions use:

```text
camelCase
```

Examples:

```ts
sendMessage()

uploadMedia()

verifyWebhook()
```

---

Functions should describe actions.

Good:

```ts
createRequest()
parseResponse()
```

Bad:

```ts
handler()
process()
doStuff()
```

---

# 3.5.6 Constant Naming

Constants use:

```text
UPPER_SNAKE_CASE
```

Examples:

```ts
DEFAULT_TIMEOUT

API_VERSION

MAX_RETRY_COUNT
```

---

# 3.5.7 Folder Naming

Folders use:

```text
lowercase
```

Examples:

```
services/

messages/

errors/

utils/
```

---

Avoid:

```
Services/

Message_Service/

UtilsFolder/
```

---

# 3.5.8 Service Naming

Services follow:

```
<Name>Service
```

Examples:

```
MessageService

MediaService

TemplateService

WebhookService
```

---

# 3.5.9 Error Naming

Errors follow:

```
<Name>Error
```

Examples:

```ts
AuthenticationError

ValidationError

NetworkError
```

---

# 3.5.10 Test File Naming

Test files should match the original file.

Pattern:

```
<filename>.test.ts
```

Example:

Source:

```
httpClient.ts
```

Test:

```
httpClient.test.ts
```

---

Example:

```
MessageService.ts

MessageService.test.ts
```

---

# 3.5.11 Type File Naming

Type-only files should describe their domain.

Examples:

```
message.types.ts

media.types.ts

webhook.types.ts
```

---

# 3.5.12 Utility File Naming

Utility files should describe their purpose.

Examples:

```
validation.ts

formatting.ts

phoneNumber.ts
```

---

Avoid generic names:

```
helpers.ts

common.ts

misc.ts
```

unless the content is truly generic.

---

# 3.5.13 Index Files

Index files are used only for exports.

Example:

```
errors/

├── ValidationError.ts

├── NetworkError.ts

└── index.ts
```

---

Example:

```ts
export * from "./ValidationError"
export * from "./NetworkError"
```

---

Index files should not contain business logic.

---

# 3.5.14 Naming Philosophy

Names should answer:

"What does this file do?"

Good:

```
responseParser.ts
```

Immediately understandable.

Bad:

```
processor.ts
```

Unclear responsibility.

---

# Summary

Consistent naming conventions create a predictable codebase.

Every contributor should be able to understand the project structure by reading file and folder names alone.

---

**Next Section**

3.6 Configuration Files Structure

---

# 3.6 Configuration Files Structure

## Purpose

Configuration files define how the WhatsApp SDK is built, tested, formatted, published, and maintained.

A clear configuration strategy ensures:

- Consistent development environment
- Reliable builds
- Automated quality checks
- Easier contributor onboarding

---

# Root Configuration Overview

The initial repository contains:

```
whatsapp-sdk/

├── package.json

├── tsconfig.json

├── vitest.config.ts

├── eslint.config.js

├── prettier.config.js

├── .gitignore

├── .npmignore

└── release configuration
```

---

# 3.6.1 package.json

## Purpose

`package.json` is the central configuration file for the npm package.

It defines:

- Package identity
- Dependencies
- Scripts
- Publishing information
- Package exports

---

## Responsibilities

Example:

```json
{
  "name": "@whatsapp-sdk/core",
  "version": "0.1.0",
  "type": "module"
}
```

---

## Scripts

The package should provide standard commands.

Example:

```json
{
  "scripts": {
    "dev": "",
    "build": "",
    "test": "",
    "lint": "",
    "format": ""
  }
}
```

---

# 3.6.2 TypeScript Configuration

File:

```
tsconfig.json
```

---

## Purpose

Defines TypeScript compiler behavior.

---

## Responsibilities

Controls:

- Target JavaScript version
- Module system
- Strict mode
- Path handling
- Type checking

---

## Requirements

The SDK should enable:

```json
{
  "strict": true
}
```

Reason:

Strict mode improves reliability and catches errors early.

---

# 3.6.3 Build Configuration

## Purpose

Defines how TypeScript source code is converted into a published npm package.

---

Possible build tool:

```
tsup
```

---

Responsibilities:

- Compile TypeScript
- Generate JavaScript
- Generate type declarations
- Create optimized output

---

Expected output:

```
dist/

├── index.js

├── index.d.ts

└── chunks/
```

---

# 3.6.4 Testing Configuration

File:

```
vitest.config.ts
```

---

## Purpose

Defines automated testing behavior.

---

Responsibilities:

- Test environment
- Coverage configuration
- Test paths
- Mock handling

---

Expected command:

```bash
npm test
```

---

# 3.6.5 ESLint Configuration

File:

```
eslint.config.js
```

---

## Purpose

Maintains code quality standards.

---

Checks:

- Possible bugs
- Bad patterns
- Unused code
- Inconsistent practices

---

Example rules:

- No unused variables
- No unsafe any usage
- Consistent imports

---

# 3.6.6 Prettier Configuration

File:

```
prettier.config.js
```

---

## Purpose

Maintains consistent code formatting.

---

Controls:

- Line width
- Quotes
- Semicolons
- Trailing commas

---

All contributors should use the same formatting rules.

---

# 3.6.7 Git Ignore

File:

```
.gitignore
```

---

## Purpose

Prevents unnecessary files from being committed.

---

Examples:

```
node_modules/

dist/

.env

coverage/

```

---

# 3.6.8 npm Ignore

File:

```
.npmignore
```

---

## Purpose

Controls which files are excluded when publishing to npm.

---

Should exclude:

```
tests/

.github/

internal scripts/

development files
```

---

Should include:

```
dist/

README.md

LICENSE

package.json
```

---

# 3.6.9 Environment Configuration

Development secrets should never be stored in code.

Example:

```
.env
```

contains:

```
WHATSAPP_ACCESS_TOKEN=

PHONE_NUMBER_ID=
```

---

Rules:

- Never commit `.env`
- Never log secrets
- Use environment variables

---

# 3.6.10 Configuration Philosophy

Configuration files should:

- Have one responsibility
- Remain minimal
- Be documented
- Avoid unnecessary complexity

---

# Summary

A well-designed configuration system creates a reliable development and publishing workflow.

These configuration files provide the foundation for building, testing, and maintaining a professional TypeScript SDK.

---

**Next Section**

3.7 Build and Distribution Structure

---

# 3.7 Build and Distribution Structure

## Purpose

The Build and Distribution Structure defines how the TypeScript source code is transformed into a production-ready npm package.

The build system must provide:

- Reliable compilation
- Small package size
- Type safety
- Multiple environment compatibility
- Easy installation

---

# Build Pipeline

The complete build flow:

```
Developer Code

        │

        ▼

src/

        │

        ▼

TypeScript Compiler

        │

        ▼

Build Tool

        │

        ▼

dist/

        │

        ▼

npm Package

        │

        ▼

Developer Application
```

---

# 3.7.1 Source Directory

The source code lives inside:

```
src/
```

Example:

```
src/

├── client/

├── services/

├── http/

├── errors/

├── types/

└── index.ts
```

---

The source directory contains:

- TypeScript code
- Internal implementation
- Public exports

---

# 3.7.2 Build Tool

## Purpose

The build tool converts TypeScript into distributable JavaScript.

Initial build tool:

```
tsup
```

---

## Why tsup?

Benefits:

- Fast builds
- TypeScript support
- ESM support
- Type declaration generation
- Simple configuration

---

# 3.7.3 Distribution Directory

Generated output:

```
dist/
```

Example:

```
dist/

├── index.js

├── index.d.ts

└── chunks/
```

---

The `dist` directory contains only production files.

---

# 3.7.4 Package Output

The published npm package should contain:

```
@whatsapp-sdk/core
```

Users install:

```bash
npm install @whatsapp-sdk/core
```

---

After installation:

```ts
import {
 WhatsAppClient
} from "@whatsapp-sdk/core"
```

---

# 3.7.5 Module Format

The SDK should support modern JavaScript environments.

Primary format:

```
ES Modules (ESM)
```

Example:

```js
import { WhatsAppClient } from "@whatsapp-sdk/core"
```

---

Future compatibility may include:

```
CommonJS (CJS)
```

for older Node.js applications.

---

# 3.7.6 Type Declaration Generation

Because the SDK is TypeScript-first, every release must include type definitions.

Generated file:

```
index.d.ts
```

---

Example:

```ts
declare class WhatsAppClient {

}
```

---

Benefits:

- Autocomplete
- Type checking
- Better developer experience

---

# 3.7.7 Package Exports

The package should control public exports.

Example:

```json
{
 "exports": {
   ".": "./dist/index.js"
 }
}
```

---

This prevents developers from importing internal files.

Avoid:

```ts
import {
 HttpClient
} from "@whatsapp-sdk/core/dist/http"
```

---

# 3.7.8 Build Commands

Standard commands:

Build:

```bash
npm run build
```

Test:

```bash
npm test
```

Lint:

```bash
npm run lint
```

---

# 3.7.9 Publishing Workflow

Release flow:

```
Code Change

↓

Tests Pass

↓

Version Update

↓

Build Package

↓

Generate Changelog

↓

Publish npm Package
```

---

# 3.7.10 Version Strategy

The SDK follows:

```
Semantic Versioning
```

Format:

```
MAJOR.MINOR.PATCH
```

Example:

```
1.2.3
```

---

Meaning:

Major:

```
Breaking changes
```

Minor:

```
New features
```

Patch:

```
Bug fixes
```

---

# 3.7.11 Package Quality Checks

Before publishing:

Required:

- Build successful
- Tests passing
- Type checking passing
- Documentation updated
- Changelog updated

---

# 3.7.12 Distribution Principles

The package should:

- Ship only required files
- Avoid unnecessary dependencies
- Keep bundle size small
- Maintain backward compatibility

---

# Summary

The build and distribution architecture transforms the SDK source code into a professional npm package.

A reliable build system ensures developers receive a stable, type-safe, and production-ready WhatsApp SDK.

---

**Next Section**

3.8 Documentation Structure

---

# 3.8 Documentation Structure

## Purpose

The documentation structure defines how developers learn, understand, and use the WhatsApp SDK.

The documentation system should provide:

- Fast onboarding
- Clear examples
- Complete API reference
- Troubleshooting support
- Contribution guidance

---

# Documentation Philosophy

The documentation follows:

```
Simple Start

↓

Progressive Learning

↓

Advanced Usage

↓

Production Knowledge
```

---

# Documentation Directory

The documentation structure:

```
docs/

├── getting-started/

├── guides/

├── api-reference/

├── examples/

├── troubleshooting/

└── contributing/
```

---

# 3.8.1 Getting Started

Directory:

```
docs/getting-started/
```

## Purpose

Helps new developers start using the SDK quickly.

---

Contains:

```
getting-started/

├── installation.md

├── quick-start.md

├── configuration.md

└── first-message.md
```

---

## Installation

Explains:

- npm installation
- Requirements
- Node.js versions
- Environment setup

Example:

```bash
npm install @whatsapp-sdk/core
```

---

## Quick Start

A developer should send the first message within minutes.

Example:

```ts
const client = new WhatsAppClient(config)

await client.messages.sendText(data)
```

---

# 3.8.2 Guides

Directory:

```
docs/guides/
```

## Purpose

Contains practical tutorials.

---

Examples:

```
guides/

├── sending-messages.md

├── media-upload.md

├── templates.md

├── webhooks.md

└── error-handling.md
```

---

Guides explain:

- Real-world usage
- Best practices
- Common workflows

---

# 3.8.3 API Reference

Directory:

```
docs/api-reference/
```

## Purpose

Provides complete technical documentation.

---

Contains:

```
api-reference/

├── client.md

├── messages.md

├── media.md

├── errors.md

└── types.md
```

---

API Reference includes:

- Classes
- Methods
- Parameters
- Return types
- Examples

---

# 3.8.4 Examples

Directory:

```
docs/examples/
```

## Purpose

Provides copy-paste examples.

---

Examples:

```
examples/

├── basic-message.md

├── webhook-server.md

├── express-example.md

└── production-setup.md
```

---

Examples should:

- Be simple
- Work correctly
- Follow latest SDK version

---

# 3.8.5 Troubleshooting

Directory:

```
docs/troubleshooting/
```

## Purpose

Helps developers solve common problems.

---

Examples:

```
troubleshooting/

├── authentication-errors.md

├── webhook-errors.md

├── api-errors.md

└── common-issues.md
```

---

Each troubleshooting guide should contain:

```
Problem

↓

Cause

↓

Solution
```

---

# 3.8.6 Contributing Documentation

Directory:

```
docs/contributing/
```

## Purpose

Helps contributors understand the project.

---

Contains:

```
contributing/

├── development.md

├── architecture.md

├── testing.md

└── pull-request.md
```

---

# 3.8.7 README Strategy

The root README is the first impression.

README should contain:

```
README.md

├── Introduction

├── Features

├── Installation

├── Quick Example

├── Documentation Link

├── Contribution Link

└── License
```

---

# 3.8.8 Documentation Rules

Every new feature must include:

## Overview

What does this feature do?

---

## Installation

How to use it?

---

## Example

Working code example.

---

## API Reference

Available methods and options.

---

## Error Handling

Possible errors and solutions.

---

# 3.8.9 Documentation Quality Standards

Documentation should be:

- Accurate
- Updated with releases
- Example-driven
- Beginner friendly
- Technically complete

---

# 3.8.10 Future Documentation Platform

The project may use:

```
Docusaurus
```

for a complete documentation website.

Possible structure:

```
website/

├── docs/

├── blog/

├── components/

└── sidebars.js
```

---

# Summary

A strong documentation structure makes the WhatsApp SDK easier to learn, adopt, and contribute to.

Documentation is considered a core product feature, not an afterthought.

---

**Next Section**

3.9 Examples and Demo Structure

---

# 3.9 Examples and Demo Structure

## Purpose

The Examples and Demo Structure defines how practical SDK examples are organized.

Examples should help developers understand:

- SDK installation
- Basic usage
- Common workflows
- Production patterns
- Framework integrations

---

# Example Philosophy

Examples should follow:

```
Simple

↓

Realistic

↓

Production Ready
```

Examples are not just demonstrations.

They are learning resources for developers.

---

# Examples Directory

The repository contains:

```
examples/

├── basic/

├── messages/

├── webhooks/

├── frameworks/

└── advanced/
```

---

# 3.9.1 Basic Examples

Directory:

```
examples/basic/
```

## Purpose

Contains the simplest possible SDK usage.

---

Example:

```
basic/

└── send-text-message.ts
```

---

Example:

```ts
import { WhatsAppClient } from "@whatsapp-sdk/core"

const client = new WhatsAppClient({
  accessToken,
  phoneNumberId
})

await client.messages.sendText({
  to: "923001234567",
  text: "Hello World"
})
```

---

# 3.9.2 Message Examples

Directory:

```
examples/messages/
```

## Purpose

Demonstrates different message types.

---

Contains:

```
messages/

├── text.ts

├── image.ts

├── document.ts

└── template.ts
```

---

Examples should cover:

- Text messages
- Media messages
- Template messages
- Interactive messages

---

# 3.9.3 Webhook Examples

Directory:

```
examples/webhooks/
```

## Purpose

Shows how developers receive WhatsApp events.

---

Structure:

```
webhooks/

├── verify.ts

├── receive-message.ts

└── event-handler.ts
```

---

Examples cover:

- Webhook verification
- Incoming messages
- Status updates
- Event processing

---

# 3.9.4 Framework Examples

Directory:

```
examples/frameworks/
```

## Purpose

Demonstrates SDK usage with popular frameworks.

---

Future examples:

```
frameworks/

├── express/

├── nextjs/

└── nestjs/
```

---

Important:

Framework examples should remain separate from core SDK.

---

# 3.9.5 Advanced Examples

Directory:

```
examples/advanced/
```

## Purpose

Contains production-level patterns.

---

Examples:

```
advanced/

├── error-handling.ts

├── retry-strategy.ts

├── custom-logger.ts

└── production-config.ts
```

---

# 3.9.6 Example Requirements

Every example should include:

## Clear Purpose

Explain what problem it solves.

---

## Complete Code

The example should run with minimum changes.

---

## Comments

Important steps should be explained.

---

## Expected Result

Developer should know what happens after execution.

---

# 3.9.7 Example Rules

Examples should:

- Use public SDK APIs only
- Avoid internal imports
- Avoid outdated methods
- Follow latest version
- Include error handling

---

# 3.9.8 Example Testing

Important examples should be tested.

Possible approach:

```
Example Code

↓

Automated Test

↓

CI Verification
```

This prevents broken documentation.

---

# 3.9.9 Demo Applications

Future demo applications may include:

```
demos/

├── customer-support-bot/

├── ecommerce-notifications/

└── appointment-reminders/
```

---

These demos show real business use cases.

---

# Summary

Examples provide developers with practical knowledge of using the WhatsApp SDK.

A strong example system reduces learning time and increases adoption.

---

**Next Section**

3.10 Repository Maintenance Structure

---

# 3.10 Repository Maintenance Structure

## Purpose

The Repository Maintenance Structure defines how the WhatsApp SDK repository will be managed after development begins.

The goal is to create a professional open-source workflow that supports:

- Community contribution
- Code quality
- Issue tracking
- Stable releases
- Long-term maintenance

---

# Maintenance Philosophy

The project follows:

```
Transparent Development

↓

Community Contribution

↓

Code Review

↓

Automated Validation

↓

Stable Release
```

---

# 3.10.1 GitHub Repository Structure

The `.github` directory manages repository automation.

Structure:

```
.github/

├── workflows/

├── ISSUE_TEMPLATE/

├── PULL_REQUEST_TEMPLATE.md

├── CODE_OF_CONDUCT.md

└── CONTRIBUTING.md
```

---

# 3.10.2 GitHub Actions

Directory:

```
.github/workflows/
```

## Purpose

Automates development checks.

---

Possible workflows:

```
workflows/

├── ci.yml

├── release.yml

└── npm-publish.yml
```

---

## CI Workflow

Runs automatically on:

- Pull requests
- Main branch changes

Checks:

- Install dependencies
- Type checking
- Tests
- Linting
- Build

---

Example flow:

```
Pull Request

↓

GitHub Actions

↓

Tests Pass

↓

Merge Allowed
```

---

# 3.10.3 Issue Templates

Directory:

```
.github/ISSUE_TEMPLATE/
```

## Purpose

Creates structured issue reports.

---

Templates:

```
issue_template/

├── bug_report.md

├── feature_request.md

└── documentation.md
```

---

## Bug Report

Should include:

- Description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment information

---

## Feature Request

Should include:

- Problem
- Proposed solution
- Alternatives considered

---

# 3.10.4 Pull Request Template

File:

```
PULL_REQUEST_TEMPLATE.md
```

---

## Purpose

Ensures contributors provide required information.

---

Example:

```md
## Description

What changed?

## Type

- Bug fix
- Feature
- Documentation

## Testing

How was it tested?
```

---

# 3.10.5 Contribution Guide

File:

```
CONTRIBUTING.md
```

---

## Purpose

Explains how developers can contribute.

---

Contains:

- Development setup
- Branch rules
- Coding standards
- Testing process
- Pull request process

---

# 3.10.6 Code Ownership

File:

```
CODEOWNERS
```

---

## Purpose

Defines who reviews specific areas.

Example:

```
/src/http/
@maintainer

/src/services/
@maintainer
```

---

Benefits:

- Clear responsibility
- Better reviews
- Faster decisions

---

# 3.10.7 Changelog Management

File:

```
CHANGELOG.md
```

---

## Purpose

Tracks project history.

---

Contains:

- New features
- Bug fixes
- Breaking changes
- Deprecations

---

Example:

```
## 0.2.0

Added:

- Media upload support

Fixed:

- Authentication issue
```

---

# 3.10.8 Release Notes

Every release should include:

- Version number
- Changes
- Migration notes
- Known issues

---

Release example:

```
v1.0.0

Major stable release

Features:

- Messages API
- Templates API
- Webhooks
```

---

# 3.10.9 Branch Strategy

Initial branches:

```
main

develop

feature/*
bugfix/*
```

---

## Main Branch

Contains:

- Stable releases
- Production-ready code

---

## Feature Branch

Example:

```
feature/message-service
```

Used for:

- New features
- Improvements

---

# 3.10.10 Review Process

Every change should follow:

```
Code Change

↓

Pull Request

↓

Automated Checks

↓

Review

↓

Merge
```

---

# 3.10.11 Maintenance Rules

The repository should:

- Keep issues organized
- Review contributions
- Update documentation
- Maintain backward compatibility
- Communicate breaking changes

---

# Summary

A strong maintenance structure allows the WhatsApp SDK to grow as a reliable open-source project.

Clear workflows, automation, and contribution rules help maintain quality as more developers join.

---

**Next Section**

3.11 Repository Security Structure

---

# 3.11 Repository Security Structure

## Purpose

The Repository Security Structure defines security practices required to protect the SDK source code, contributors, users, and sensitive credentials.

The goal is to build a secure and trustworthy open-source project.

---

# Security Philosophy

The project follows:

```
Security By Default

↓

Least Privilege

↓

No Secret Exposure

↓

Continuous Improvement
```

---

# 3.11.1 Secret Management

## Purpose

Sensitive information must never be stored directly in source code.

---

Examples of secrets:

- WhatsApp Access Token
- API Keys
- Webhook Secrets
- Private Credentials

---

## Wrong

```ts
const token = "EAAGxxxxxxxx"
```

---

## Correct

```ts
const token = process.env.WHATSAPP_TOKEN
```

---

# 3.11.2 Environment Variables

Sensitive configuration should use environment variables.

Example:

```
.env
```

Contains:

```
WHATSAPP_ACCESS_TOKEN=

PHONE_NUMBER_ID=

WEBHOOK_SECRET=
```

---

Rules:

- `.env` must never be committed
- Secrets must be documented
- Example files should use placeholders

---

Example:

```
.env.example
```

```env
WHATSAPP_ACCESS_TOKEN=your_token_here
PHONE_NUMBER_ID=your_phone_id
```

---

# 3.11.3 Git Security Rules

The repository should prevent accidental secret commits.

Required:

```
.gitignore
```

should include:

```
.env

.env.*

node_modules/

dist/
```

---

# 3.11.4 Dependency Security

The project must regularly check dependencies.

Checks:

- Vulnerable packages
- Outdated dependencies
- Security advisories

---

Possible tools:

```
npm audit

Dependabot

GitHub Security Alerts
```

---

# 3.11.5 npm Publishing Security

Before publishing a package:

Verify:

- No secrets included
- No internal files exposed
- Correct package contents

---

The published package should contain:

```
dist/

README.md

LICENSE

package.json
```

---

Should not contain:

```
.env

tests/

internal notes

development files
```

---

# 3.11.6 Token Handling Rules

The SDK should:

- Never log access tokens
- Never expose tokens in errors
- Never store tokens unnecessarily

---

Example:

Bad:

```
Authentication failed:
EAAGxxxxxxxx
```

Good:

```
Authentication failed.
```

---

# 3.11.7 Webhook Security

Webhook functionality must support:

- Signature verification
- Secret validation
- Payload validation

---

Example flow:

```
Incoming Webhook

↓

Verify Signature

↓

Validate Payload

↓

Process Event
```

---

# 3.11.8 Error Security

Errors must not leak sensitive data.

Avoid exposing:

- Tokens
- Headers
- Credentials
- Private URLs

---

# 3.11.9 CI Security

GitHub Actions should:

- Use secure secrets
- Limit permissions
- Avoid printing sensitive values

---

Example:

```yaml
permissions:
  contents: read
```

---

# 3.11.10 Security Reporting

The project should provide a security reporting method.

Example:

```
SECURITY.md
```

Contains:

- How to report vulnerabilities
- Response expectations
- Responsible disclosure process

---

# 3.11.11 Security Checklist

Before every release:

- No secrets exposed
- Dependencies checked
- Tests passed
- Package reviewed
- Documentation updated

---

# Summary

Security is a core requirement of the WhatsApp SDK.

By protecting credentials, validating inputs, and following secure development practices, the project can become a trusted foundation for developers and businesses.

---

**Next Section**

3.12 Final Repository Structure

---

# 3.12 Final Repository Structure

## Purpose

This section defines the approved repository structure for the first version of the WhatsApp SDK.

The structure combines all previous architecture decisions:

- Single package approach
- Clean module boundaries
- TypeScript-first development
- Strong testing strategy
- Professional open-source workflow

---

# Final V1 Repository Tree

```
whatsapp-sdk/

├── src/

│   ├── client/

│   │   └── WhatsAppClient.ts

│   │

│   ├── services/

│   │   ├── messages/

│   │   ├── media/

│   │   ├── templates/

│   │   └── webhooks/

│   │

│   ├── http/

│   │   ├── HttpClient.ts

│   │   ├── RequestBuilder.ts

│   │   └── ResponseParser.ts

│   │

│   ├── config/

│   │   └── Configuration.ts

│   │

│   ├── errors/

│   │   ├── WhatsAppError.ts

│   │   ├── AuthenticationError.ts

│   │   └── ValidationError.ts

│   │

│   ├── types/

│   │   ├── message.types.ts

│   │   ├── media.types.ts

│   │   └── webhook.types.ts

│   │

│   ├── utils/

│   │   ├── validation.ts

│   │   └── formatting.ts

│   │

│   └── index.ts

│

├── tests/

│   ├── unit/

│   ├── integration/

│   └── fixtures/

│

├── examples/

│   ├── basic/

│   ├── messages/

│   ├── webhooks/

│   └── advanced/

│

├── docs/

│   ├── getting-started/

│   ├── guides/

│   ├── api-reference/

│   ├── troubleshooting/

│   └── contributing/

│

├── scripts/

│   ├── build.ts

│   └── release.ts

│

├── .github/

│   ├── workflows/

│   ├── ISSUE_TEMPLATE/

│   └── PULL_REQUEST_TEMPLATE.md

│

├── package.json

├── tsconfig.json

├── vitest.config.ts

├── eslint.config.js

├── prettier.config.js

├── .gitignore

├── .npmignore

├── README.md

├── CHANGELOG.md

├── CONTRIBUTING.md

├── SECURITY.md

└── LICENSE
```

---

# Repository Layer Summary

## Source Layer

```
src/
```

Contains all SDK implementation.

---

## Testing Layer

```
tests/
```

Ensures reliability and prevents regressions.

---

## Example Layer

```
examples/
```

Helps developers learn usage patterns.

---

## Documentation Layer

```
docs/
```

Provides complete learning material.

---

## Automation Layer

```
.github/
```

Handles CI, issues, and contribution workflow.

---

# Architectural Rules

The repository must follow:

## Rule 1

Public code is exported only through:

```
src/index.ts
```

---

## Rule 2

Internal modules should not be imported directly by users.

---

## Rule 3

Every feature requires:

- Source code
- Tests
- Documentation
- Example

---

## Rule 4

New folders require a clear responsibility.

---

## Rule 5

Avoid adding complexity without a real requirement.

---

# Future Evolution

This structure supports future growth.

Possible evolution:

```
V1

Single Package

↓

Growing Community

↓

Framework Integrations

↓

Monorepo

↓

Complete SDK Ecosystem
```

---

# Final Decision

The WhatsApp SDK repository will begin with a clean single-package architecture designed for:

- Professional development
- Open-source contribution
- npm distribution
- Future scalability

---

# Phase 0 - Part 3 Complete

Repository Structure Design Completed.

```
03_Phase0-Part3-Repository-Structure.md
```

---

**Next Phase**

Phase 0 - Part 4

Development Standards