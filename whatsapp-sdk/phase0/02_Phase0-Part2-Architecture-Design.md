# Phase 0 - Part 2

# Architecture Design

> This document defines the engineering architecture of the WhatsApp SDK.
>
> The goal is to establish a clean, scalable, and maintainable foundation before writing production code.

---

# Document Outline

1. High Level Architecture
2. Design Principles
3. Layered Architecture
4. Core Components
5. Package Responsibilities
6. Dependency Rules
7. Request Lifecycle
8. Error Flow
9. Future Expansion
10. Architecture Decision Records (ADR)

---

# 2.1 High Level Architecture

## Objective

Design an SDK that is:

- Modular
- Easy to maintain
- Easy to test
- Framework agnostic
- Production ready
- Extendable without breaking existing APIs

The SDK should hide the complexity of the Meta Graph API while exposing a clean and intuitive developer experience.

---

# Architecture Philosophy

The SDK should act as a thin, reliable abstraction over the WhatsApp Cloud API.

Developers should think in terms of:

- Clients
- Messages
- Media
- Webhooks

—not HTTP requests, URLs, headers, or Graph API internals.

Example:

Instead of writing:

```ts
await fetch("https://graph.facebook.com/v23.0/...")
```

Developers should write:

```ts
await client.messages.sendText({
  to: "923001234567",
  text: "Hello World"
})
```

The SDK is responsible for handling everything else internally.

---

# High Level Components

The architecture is divided into several independent components.

```text
Application
      │
      ▼
WhatsAppClient
      │
      ▼
Service Layer
      │
      ▼
HTTP Layer
      │
      ▼
Meta Graph API
```

Each layer has a single responsibility.

---

# Responsibilities

## Application Layer

This is the developer's application.

Examples:

- Express API
- Next.js API Route
- NestJS
- Fastify
- CLI
- Custom Backend

The SDK never controls the application.

The application always controls the SDK.

---

## WhatsAppClient

The WhatsAppClient is the public entry point of the SDK.

Responsibilities:

- Store configuration
- Initialize services
- Validate configuration
- Provide a simple API
- Coordinate internal components

Developers should only need one client instance.

Example:

```ts
const client = new WhatsAppClient({
  accessToken,
  phoneNumberId
})
```

---

## Service Layer

The Service Layer contains business logic.

Examples:

- Messages
- Media
- Templates
- Contacts
- Webhooks

Each service focuses on one domain only.

Example:

```text
MessageService

↓

MediaService

↓

WebhookService

↓

TemplateService
```

No service should directly depend on another service unless absolutely necessary.

---

## HTTP Layer

The HTTP Layer is responsible for communication with Meta.

Responsibilities:

- HTTP requests
- Authentication headers
- Retry logic
- Request timeout
- Response parsing
- Error mapping

No business logic belongs here.

---

## Meta Graph API

This is the external dependency.

The SDK treats Meta as an external service.

If Meta changes its API, only the HTTP layer should require updates whenever possible.

---

# Architecture Goals

The architecture should satisfy the following goals.

## Simplicity

Developers should write minimal code.

---

## Separation of Concerns

Each layer has a single responsibility.

---

## Testability

Every component should be testable in isolation.

---

## Extensibility

New services should be added without modifying existing services.

---

## Maintainability

The project should remain easy to understand after several years of development.

---

## Scalability

The architecture should support future packages such as:

- @whatsapp-sdk/express
- @whatsapp-sdk/next
- @whatsapp-sdk/nest
- @whatsapp-sdk/testing
- @whatsapp-sdk/cli

without changing the core package.

---

# Layer Communication Rules

Allowed communication:

```text
Application

↓

WhatsAppClient

↓

Services

↓

HTTP Client

↓

Meta API
```

Forbidden communication:

```text
Application

↓

HTTP Client
```

Applications should never access internal HTTP components directly.

---

# Public API Boundary

Everything inside the SDK is private except the documented public API.

Only exported classes, interfaces, and functions are considered public.

Internal implementation details may change without notice.

---

# Future Compatibility

This architecture should remain valid for:

- v0.1.x
- v0.2.x
- v0.5.x
- v1.x

Major architectural redesigns should only occur if absolutely necessary.

---

# Summary

The WhatsApp SDK follows a layered architecture centered around a single public client.

Each layer has a clearly defined responsibility, allowing the project to remain modular, scalable, and maintainable while providing an excellent developer experience.

---

**Next Section**

2.2 Design Principles

---

# 2.2 Design Principles

## Objective

The design principles define the engineering philosophy of the WhatsApp SDK.

Every architectural decision, feature implementation, and code review should align with these principles.

If a proposed change conflicts with these principles, it should be carefully reviewed before being accepted.

---

# Principle 1 — Developer Experience First

The SDK exists to simplify WhatsApp development.

Developers should spend time building applications—not learning the Meta Graph API.

The public API should be intuitive, predictable, and well documented.

Example:

```ts
await client.messages.sendText({
  to: "923001234567",
  text: "Hello 👋"
})
```

instead of constructing HTTP requests manually.

---

# Principle 2 — Type Safety First

Every public API should expose complete TypeScript types.

Developers should receive:

- IntelliSense
- Compile-time validation
- Autocomplete
- Helpful type errors

The goal is to catch mistakes before runtime.

---

# Principle 3 — Single Responsibility Principle (SRP)

Each module should have one clear responsibility.

Examples:

✓ MessageService → Send messages

✓ MediaService → Upload and download media

✓ WebhookService → Verify and parse webhooks

Avoid creating modules that perform multiple unrelated tasks.

---

# Principle 4 — Composition over Inheritance

The SDK should favor composition instead of deep inheritance hierarchies.

Good:

```text
WhatsAppClient

↓

MessageService

↓

HttpClient
```

Avoid:

```text
BaseClient

↓

AdvancedClient

↓

EnterpriseClient

↓

CustomClient
```

Composition keeps the architecture flexible and easier to maintain.

---

# Principle 5 — Encapsulation

Internal implementation details should remain private.

Developers interact only with the documented public API.

This allows the internal architecture to evolve without breaking applications.

---

# Principle 6 — Separation of Concerns

Every layer has a specific responsibility.

Application

↓

WhatsAppClient

↓

Services

↓

HTTP Client

↓

Meta API

Business logic must never be mixed with networking logic.

---

# Principle 7 — Framework Agnostic

The SDK should not depend on any specific framework.

It must work equally well with:

- Express
- Fastify
- Next.js
- NestJS
- Hono
- Plain Node.js

Framework-specific integrations belong in separate packages.

---

# Principle 8 — Explicit over Implicit

The SDK should prefer explicit configuration.

Good:

```ts
new WhatsAppClient({
  accessToken,
  phoneNumberId
})
```

Avoid hidden configuration or unexpected behavior.

Developers should always know what the SDK is doing.

---

# Principle 9 — Fail Fast

Configuration errors should be detected immediately.

Examples:

- Missing access token
- Invalid phone number ID
- Invalid webhook secret

The SDK should provide clear, actionable error messages instead of failing later during execution.

---

# Principle 10 — Backward Compatibility

Public APIs should remain stable whenever possible.

Breaking changes should:

- Be minimized.
- Be documented.
- Follow Semantic Versioning.
- Include migration guidance.

Developer trust depends on API stability.

---

# Principle 11 — Testability

Every component should be testable independently.

Avoid tightly coupled modules that are difficult to mock or isolate.

The architecture should encourage automated testing from the beginning.

---

# Principle 12 — Performance by Default

The SDK should introduce minimal overhead.

Guidelines:

- Avoid unnecessary object creation.
- Minimize dependencies.
- Reuse internal utilities where appropriate.
- Optimize for common use cases before edge cases.

---

# Principle 13 — Security First

Security is a core requirement, not an optional feature.

Examples:

- Never expose access tokens.
- Verify webhook signatures.
- Avoid logging sensitive information.
- Follow secure defaults.

---

# Principle 14 — Documentation Driven Development

Every public feature must include documentation before release.

Documentation should include:

- Overview
- Installation
- Examples
- API Reference
- Error Handling
- Migration Notes (if applicable)

Documentation is considered part of the feature—not an afterthought.

---

# Principle 15 — Long-Term Maintainability

Short-term convenience should never compromise long-term quality.

The project should remain understandable, extensible, and maintainable even after years of development.

Architectural consistency is more valuable than rapid feature growth.

---

# Design Principles Summary

The WhatsApp SDK follows a developer-first engineering philosophy built on:

- Simplicity
- Type Safety
- Modularity
- Testability
- Performance
- Security
- Documentation
- Long-Term Maintainability

These principles guide every architectural and implementation decision throughout the project lifecycle.

---

**Next Section**

2.3 Layered Architecture

---

# 2.3 Layered Architecture

## Objective

The WhatsApp SDK follows a layered architecture to ensure separation of concerns, maintainability, and scalability.

Each layer has a single responsibility and communicates only with the layer directly below it.

No layer should bypass another layer.

---

# Why Layered Architecture?

Without a layered architecture, business logic, HTTP requests, validation, and configuration quickly become mixed together.

This leads to:

- Difficult testing
- Tight coupling
- Duplicate code
- Poor maintainability
- Hard-to-debug applications

A layered architecture keeps responsibilities clear and independent.

---

# Architecture Overview

```text
┌──────────────────────────────┐
│      User Application        │
│ Express / Next / Nest / CLI  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      WhatsAppClient          │
│     Public SDK Interface     │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         Services             │
│ Messages │ Media │ Webhooks  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        HTTP Client           │
│ Request │ Response │ Retry   │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│     Meta Graph API           │
└──────────────────────────────┘
```

Each layer performs one well-defined task.

---

# Layer 1 — User Application

This is the developer's own project.

Examples:

- Express API
- Fastify
- NestJS
- Next.js
- Serverless Function
- CLI
- Custom Backend

The SDK never owns the application lifecycle.

The application owns the SDK.

---

# Layer 2 — WhatsAppClient

The WhatsAppClient is the only public entry point into the SDK.

Responsibilities:

- Store configuration
- Initialize services
- Share dependencies
- Validate startup configuration
- Expose public APIs

Example:

```ts
const client = new WhatsAppClient({
  accessToken,
  phoneNumberId
})
```

The application should never instantiate internal services directly.

---

# Layer 3 — Services

The Service Layer contains the business logic.

Each service represents one feature area.

Examples:

```text
MessageService

MediaService

WebhookService

TemplateService

ContactService
```

Responsibilities:

- Validate inputs
- Prepare API requests
- Call HTTP client
- Transform responses
- Return typed objects

Services should never know how HTTP works internally.

---

# Layer 4 — HTTP Client

The HTTP Client is responsible for all communication with Meta.

Responsibilities:

- Build URLs
- Send requests
- Parse responses
- Retry failed requests
- Handle authentication
- Handle headers
- Map HTTP errors

The HTTP Client should never contain business logic.

---

# Layer 5 — Meta Graph API

This is the external dependency.

The SDK has no control over:

- API availability
- Rate limits
- Response format
- API versioning

The SDK adapts to Meta—it does not control Meta.

---

# Dependency Direction

Dependencies always move downward.

```text
Application
      │
      ▼
WhatsAppClient
      │
      ▼
Services
      │
      ▼
HttpClient
      │
      ▼
Meta API
```

Reverse dependencies are not allowed.

For example:

❌ HttpClient should never import MessageService.

❌ Services should never import the Application.

This keeps the architecture clean and prevents circular dependencies.

---

# Layer Independence

Each layer should be replaceable without affecting the others.

For example:

- Replace the HTTP implementation.
- Improve retry logic.
- Optimize request handling.

These changes should not require modifications to the Service Layer or the public API.

---

# Benefits

This architecture provides:

- Clear responsibilities
- Easy testing
- Low coupling
- High cohesion
- Better maintainability
- Easier onboarding for contributors
- Safer refactoring

---

# Future Expansion

New capabilities should be introduced as new services rather than modifying existing ones.

Example:

```text
Current

MessageService
MediaService
WebhookService

↓

Future

FlowService
CatalogService
AnalyticsService
TemplateService
```

This approach minimizes breaking changes and keeps the architecture modular.

---

# Summary

The layered architecture forms the foundation of the WhatsApp SDK.

By separating responsibilities into independent layers, the SDK remains scalable, testable, and maintainable while providing a clean developer experience.

---

**Next Section**

2.4 Core Components

---

# 2.4 Core Components

## Objective

The SDK is composed of a small number of reusable core components.

Each component has a clearly defined responsibility.

Components should be:

- Independent
- Testable
- Reusable
- Replaceable
- Well documented

Business logic should always be implemented inside these components rather than duplicated across the SDK.

---

# 2.4.1 WhatsAppClient

## Purpose

The `WhatsAppClient` is the main entry point of the SDK.

Every interaction with the SDK begins with a single client instance.

Applications should never communicate directly with internal services.

Instead, all communication flows through the client.

---

## Responsibilities

The client is responsible for:

- Initializing the SDK
- Validating configuration
- Creating internal services
- Sharing dependencies
- Providing a unified public API
- Managing SDK lifecycle

The client should not contain business logic.

---

## Public API

The client will expose feature modules such as:

```ts
client.messages
client.media
client.templates
client.webhooks
client.contacts
```

Future releases may include:

```ts
client.flows
client.catalog
client.analytics
```

The public API should remain small, predictable, and easy to discover.

---

## Internal Dependencies

The client owns shared infrastructure, including:

- Configuration Manager
- HttpClient
- Logger
- Validator
- Error Handler

These dependencies are created once and shared across all services.

---

## Lifecycle

The typical lifecycle is:

```text
Create Client

↓

Validate Configuration

↓

Initialize Core Components

↓

Initialize Services

↓

SDK Ready
```

The initialization process should fail immediately if required configuration is invalid.

---

## Design Rules

The `WhatsAppClient` must:

- Have a single responsibility.
- Avoid business logic.
- Hide implementation details.
- Expose only documented APIs.
- Remain framework agnostic.

Only one client instance is typically required per application.

---

## Future Expansion

As the SDK grows, the client may support:

- Multiple phone number configurations
- Plugin registration
- Middleware pipeline
- Request interceptors
- Custom transports

These additions should not break the existing public API.

---

## Summary

The `WhatsAppClient` acts as the central coordinator of the SDK.

It provides a stable and intuitive interface while delegating all feature-specific work to specialized internal components.


---

# 2.4.2 Configuration Manager

## Purpose

The Configuration Manager is responsible for managing all SDK configuration.

Instead of allowing every component to read configuration independently, the SDK centralizes configuration into a single source of truth.

This improves consistency, validation, maintainability, and future extensibility.

---

## Responsibilities

The Configuration Manager is responsible for:

- Storing SDK configuration
- Validating required options
- Applying default values
- Providing configuration to internal components
- Preventing invalid startup states

Configuration should be initialized only once during client creation.

---

## Initial Configuration

The first release of the SDK requires only a minimal configuration.

Example:

```ts
const client = new WhatsAppClient({
  accessToken: "...",
  phoneNumberId: "...",
})
```

Future releases may support additional options while remaining backward compatible.

---

## Future Configuration Options

Possible future configuration fields include:

- apiVersion
- baseUrl
- timeout
- retryPolicy
- logger
- debug
- webhookSecret
- userAgent
- customHeaders

These options should remain optional unless required for correct SDK operation.

---

## Validation Rules

Configuration validation occurs during SDK initialization.

Examples of validation include:

- Access Token must be provided.
- Phone Number ID must be provided.
- Configuration values must have valid types.
- Unsupported configuration values should produce descriptive errors.

The SDK should fail fast rather than allowing invalid configuration to propagate.

---

## Default Values

Where appropriate, sensible defaults should be applied.

Examples:

```text
API Version

↓

Latest supported Graph API version

Timeout

↓

30 seconds

Debug Mode

↓

false
```

Defaults reduce boilerplate while preserving predictable behavior.

---

## Access Pattern

Internal components should never maintain their own copies of configuration.

Instead, they receive configuration from the Configuration Manager.

Example flow:

```text
Application

↓

WhatsAppClient

↓

Configuration Manager

↓

Services

↓

HTTP Client
```

This guarantees consistency across the SDK.

---

## Design Rules

The Configuration Manager must:

- Have a single responsibility.
- Be immutable after initialization whenever possible.
- Avoid business logic.
- Expose a simple internal interface.
- Remain independent of framework-specific code.

Configuration should be treated as application state rather than runtime data.

---

## Security Considerations

The Configuration Manager may contain sensitive information.

Examples include:

- Access Tokens
- Webhook Secrets

Sensitive values must never:

- Be logged.
- Be exposed through public APIs.
- Be included in error messages.

Internal debugging tools should automatically mask sensitive fields.

---

## Future Expansion

The Configuration Manager should be designed to support future capabilities such as:

- Multiple phone numbers
- Multiple business accounts
- Plugin configuration
- Environment-specific configuration
- Runtime feature flags

These enhancements should not require breaking changes to existing applications.

---

## Summary

The Configuration Manager provides a centralized, validated, and secure configuration system for the SDK.

By establishing a single source of truth, it ensures consistency across all components while preparing the project for future growth.


---

# 2.4.3 HTTP Client

## Purpose

The HTTP Client is the networking engine of the SDK.

It is responsible for all communication with the Meta Graph API.

No other component is allowed to perform HTTP requests directly.

This creates a single, centralized networking layer that is easier to maintain, test, and extend.

---

# Responsibilities

The HTTP Client is responsible for:

- Building HTTP requests
- Sending requests
- Receiving responses
- Parsing JSON
- Authentication
- Header management
- Timeout handling
- Retry strategy
- Error mapping
- Returning typed responses

The HTTP Client should never contain business logic.

---

# Why a Dedicated HTTP Client?

Without a centralized HTTP layer, networking code would become duplicated across services.

Instead of:

MessageService

↓

fetch()

MediaService

↓

fetch()

WebhookService

↓

fetch()

The SDK follows:

MessageService

↓

HttpClient

↓

fetch()

MediaService

↓

HttpClient

↓

fetch()

Every service shares the same networking implementation.

---

# Responsibilities Flow

```text
Service

↓

Build Request

↓

HttpClient

↓

Prepare Headers

↓

Authentication

↓

fetch()

↓

Receive Response

↓

Parse Response

↓

Return Typed Result
```

---

# Features

The HTTP Client should support:

- GET
- POST
- DELETE

Future versions may include additional methods if required.

---

# Authentication

The HTTP Client automatically attaches authentication headers.

Applications should never manually construct authorization headers.

Example:

Authorization

Bearer <Access Token>

The access token is retrieved from the Configuration Manager.

---

# URL Construction

Services should never build Graph API URLs manually.

Instead, they provide only endpoint information.

Example:

```text
/messages

↓

HttpClient

↓

https://graph.facebook.com/v23.0/{phoneNumberId}/messages
```

The HTTP Client is responsible for constructing the final URL.

---

# Header Management

The HTTP Client automatically attaches required headers.

Examples:

- Authorization
- Content-Type
- User-Agent

Future versions may support custom headers.

---

# Response Handling

Successful responses should be converted into typed objects before being returned to services.

Services should never parse raw JSON.

---

# Error Handling

All networking errors should be normalized into SDK errors.

The SDK should never expose raw fetch errors directly to developers.

Examples include:

- Authentication errors
- Rate limit errors
- Validation errors
- Network failures
- Timeout errors

Error normalization improves developer experience and simplifies debugging.

---

# Logging

Future versions may support optional request logging.

Logging should never expose sensitive information such as:

- Access Tokens
- Webhook Secrets
- Authorization Headers

Sensitive values must always be masked.

---

# Design Rules

The HTTP Client must:

- Be framework agnostic.
- Be reusable.
- Avoid business logic.
- Be independently testable.
- Support dependency injection.
- Remain isolated from services.

---

# Future Expansion

The HTTP Client should be designed to support:

- Retry strategies
- Middleware pipeline
- Request interceptors
- Response interceptors
- Metrics collection
- Distributed tracing
- Custom transports

These capabilities should be introduced without changing the public SDK API.

---

# Summary

The HTTP Client is the networking backbone of the WhatsApp SDK.

By centralizing all HTTP communication, the SDK achieves consistency, maintainability, testability, and future scalability while keeping business logic focused on WhatsApp features rather than networking concerns.

---

**Next Section**

2.4.3.1 Request Pipeline

---

# 2.4.3.1 Request Pipeline

## Purpose

The Request Pipeline defines the complete lifecycle of every outgoing API request.

Every request sent by the SDK must follow the same sequence of processing steps.

This ensures consistency, maintainability, and predictable behavior across all services.

---

# Why a Request Pipeline?

Instead of allowing every service to implement its own networking logic, all requests pass through a shared pipeline.

Benefits include:

- Consistent behavior
- Centralized validation
- Easier debugging
- Better testing
- Reusable networking logic
- Simplified maintenance

---

# Request Flow

Every request follows this lifecycle:

```text
Application
      │
      ▼
WhatsAppClient
      │
      ▼
MessageService
      │
      ▼
Request Builder
      │
      ▼
Configuration Manager
      │
      ▼
Authentication
      │
      ▼
HTTP Client
      │
      ▼
Meta Graph API
      │
      ▼
HTTP Response
      │
      ▼
Response Parser
      │
      ▼
Error Mapper
      │
      ▼
Typed SDK Response
      │
      ▼
Application
```

Every request should follow this exact order.

---

# Step 1 — Application Request

The application initiates an operation.

Example:

```ts
await client.messages.sendText({
  to: "923001234567",
  text: "Hello"
})
```

The application should never construct HTTP requests manually.

---

# Step 2 — Service Validation

The responsible service validates the input.

Examples:

- Required fields
- Phone number format
- Payload structure

If validation fails, the request is rejected before any network call is made.

---

# Step 3 — Request Builder

The Request Builder prepares the request.

Responsibilities include:

- Selecting the endpoint
- Setting the HTTP method
- Preparing the request body
- Preparing query parameters

Services provide business data only.

The Request Builder converts it into an HTTP request.

---

# Step 4 — Configuration Resolution

The Configuration Manager provides shared configuration.

Examples:

- Access Token
- Phone Number ID
- API Version
- Timeout
- Base URL

No service should access configuration directly.

---

# Step 5 — Authentication

Authentication headers are added automatically.

Required headers include:

- Authorization
- Content-Type
- User-Agent

Applications never create these headers manually.

---

# Step 6 — HTTP Execution

The HTTP Client performs the network request.

Responsibilities include:

- Opening the connection
- Sending data
- Waiting for the response
- Handling network failures

No business logic exists at this stage.

---

# Step 7 — Response Parsing

Successful responses are parsed into typed SDK objects.

Services should never receive raw JSON.

This ensures a consistent developer experience.

---

# Step 8 — Error Mapping

If Meta returns an error, it is converted into a standardized SDK error.

The SDK should expose meaningful, typed errors rather than raw Graph API responses.

This makes error handling simpler for developers.

---

# Step 9 — Return Result

The final typed result is returned to the application.

The application receives either:

- A successful typed response
- A standardized SDK error

No internal implementation details should be exposed.

---

# Pipeline Rules

Every request must follow the same pipeline.

No service may:

- Skip validation
- Bypass the HTTP Client
- Build authentication headers
- Parse raw responses independently

These responsibilities belong exclusively to the shared pipeline.

---

# Future Enhancements

The Request Pipeline is designed to support future capabilities such as:

- Retry policies
- Middleware
- Request interceptors
- Response interceptors
- Metrics collection
- Distributed tracing
- Request caching (where appropriate)

These enhancements should integrate into the existing pipeline without requiring changes to service implementations.

---

# Summary

The Request Pipeline establishes a standardized flow for all outgoing requests.

By centralizing request processing, the SDK ensures consistent behavior, easier maintenance, improved testability, and a cleaner separation of responsibilities.


---

# 2.5 Package Responsibilities

## Purpose

The WhatsApp SDK follows a monorepo architecture where each package has a specific responsibility.

Packages should remain focused, independent, and loosely coupled.

A package should only contain functionality that belongs to its domain.

---

# Monorepo Overview

Future repository structure:

```text
whatsapp-sdk/

├── packages/

│   ├── core/

│   ├── express/

│   ├── next/

│   ├── nest/

│   ├── cli/

│   └── testing/

│

├── docs/

├── examples/

├── scripts/

└── tests/
```

---

# Package 1 — @whatsapp-sdk/core

## Purpose

The core package is the foundation of the entire SDK.

Every other package depends on core.

---

## Responsibilities

Core handles:

- WhatsApp API communication
- Client initialization
- Message sending
- Media handling
- Template management
- Webhook utilities
- Error handling
- Type definitions
- Internal utilities

---

## Does Not Include

Core should NOT include:

- Express middleware
- Next.js helpers
- CLI commands
- Framework-specific code

The core package must remain framework agnostic.

---

# Package 2 — @whatsapp-sdk/express

## Purpose

Provide Express.js specific integrations.

---

## Responsibilities

Examples:

- Express middleware
- Webhook route helpers
- Request handlers
- Express type helpers

Example:

```ts
app.use(
  whatsappWebhook({
    client
  })
)
```

---

## Dependency

```text
express

↓

@whatsapp-sdk/core
```

Express package depends on core.

Core never depends on Express.

---

# Package 3 — @whatsapp-sdk/next

## Purpose

Provide Next.js specific utilities.

---

## Responsibilities

Examples:

- Route Handler helpers
- Server Action utilities
- Next.js webhook examples
- Edge compatibility helpers (if possible)

Example:

```ts
export const POST =
  createWhatsAppWebhookHandler(client)
```

---

## Dependency

```text
next

↓

@whatsapp-sdk/core
```

---

# Package 4 — @whatsapp-sdk/nest

## Purpose

Provide NestJS integrations.

---

## Responsibilities

Examples:

- Injectable services
- Modules
- Controllers
- Dependency injection helpers

---

## Dependency

```text
nestjs

↓

@whatsapp-sdk/core
```

---

# Package 5 — @whatsapp-sdk/cli

## Purpose

Provide command-line tooling.

---

## Possible Features

Future CLI commands:

```bash
whatsapp-sdk init

whatsapp-sdk webhook

whatsapp-sdk doctor

whatsapp-sdk generate
```

---

## Responsibilities

CLI may handle:

- Project initialization
- Configuration generation
- Debug tools
- Development helpers

CLI should use core APIs internally.

---

# Package 6 — @whatsapp-sdk/testing

## Purpose

Provide testing utilities for developers using the SDK.

---

## Possible Features

Examples:

- Mock WhatsApp Client
- Fake webhook events
- Test helpers
- Mock responses

Example:

```ts
const mockClient =
  createMockWhatsAppClient()
```

---

# Package Dependency Rules

The dependency direction must always remain:

```text
express
next
nest
cli
testing

        ↓

      core
```

Core is the foundation.

Core must never depend on:

- Frameworks
- CLI tools
- External application code

---

# Adding New Packages

A new package should only be created when:

- It solves a separate problem.
- It has a clear audience.
- It does not belong inside core.
- It can be maintained independently.

Avoid creating packages unnecessarily.

---

# Package Naming Rules

All official packages follow:

```text
@whatsapp-sdk/<package-name>
```

Examples:

```text
@whatsapp-sdk/core

@whatsapp-sdk/express

@whatsapp-sdk/next
```

Naming should remain consistent across the ecosystem.

---

# Summary

The monorepo architecture separates core SDK functionality from framework integrations and developer tooling.

This keeps the core package lightweight while allowing the ecosystem to grow independently.

A clear package boundary ensures scalability, maintainability, and easier community contribution.


---

# 2.6 Dependency Rules

## Purpose

Dependency rules define how packages, modules, and external libraries communicate with each other.

The goal is to maintain:

- Clean architecture
- Small bundle size
- Low coupling
- Easy maintenance
- Long-term stability

Every dependency must have a clear reason before being introduced.

---

# Core Dependency Principle

The core package should have the minimum possible dependencies.

The core package is the foundation of the ecosystem.

Every additional dependency increases:

- Bundle size
- Security surface
- Maintenance cost
- Potential breaking changes

---

# Dependency Direction

Dependencies must always flow in one direction.

Allowed:

```text
Framework Packages

        ↓

    Core Package

        ↓

 External APIs
```

Example:

```text
@whatsapp-sdk/express

        ↓

@whatsapp-sdk/core
```

---

# Forbidden Dependencies

The following are not allowed:

```text
@whatsapp-sdk/core

        ↓

express
```

Core must never depend on framework-specific packages.

---

Example:

❌ Wrong:

```ts
import express from "express"
```

inside:

```text
packages/core
```

---

✅ Correct:

```text
packages/express

uses

packages/core
```

---

# Internal Package Rules

Packages may only import from public package exports.

Example:

Allowed:

```ts
import {
 WhatsAppClient
} from "@whatsapp-sdk/core"
```

Not allowed:

```ts
import {
 InternalHttpClient
} from "@whatsapp-sdk/core/src/internal/http"
```

Internal implementation details should remain private.

---

# External Dependency Rules

Before adding a dependency, contributors should evaluate:

## 1. Necessity

Can this functionality be implemented internally?

If yes, avoid adding dependency.

---

## 2. Maintenance

Is the dependency actively maintained?

Consider:

- Last release date
- Community adoption
- Security history

---

## 3. Size Impact

Does the dependency unnecessarily increase package size?

Small and focused dependencies are preferred.

---

## 4. Security

Dependencies must not introduce unnecessary security risks.

---

# Preferred Dependencies

The project should prefer:

- Official libraries
- Well-maintained packages
- TypeScript-compatible packages
- Lightweight solutions

---

# Avoid Dependency Duplication

The project should avoid multiple libraries solving the same problem.

Example:

❌ Multiple HTTP clients:

```text
axios

fetch

got

node-fetch
```

Choose one approach.

---

# Runtime Dependencies vs Development Dependencies

Runtime dependencies:

Used by the published package.

Example:

```json
dependencies
```

Development dependencies:

Used only during development.

Examples:

- Testing tools
- Build tools
- Formatting tools

Example:

```json
devDependencies
```

Dependencies should always be placed correctly.

---

# Core Package Dependency Policy

The core package should ideally rely on native platform features where possible.

Examples:

Preferred:

```text
Native fetch API
Native URL API
Native Crypto API
```

Instead of unnecessary third-party alternatives.

---

# Circular Dependency Prevention

Circular dependencies are forbidden.

Example:

❌

```text
Client

↓

Service

↓

Client
```

This creates unpredictable behavior.

---

# Dependency Injection

Where flexibility is required, dependencies should be injected.

Example:

```ts
new WhatsAppClient({
  httpClient
})
```

This allows:

- Easier testing
- Custom implementations
- Better flexibility

---

# Version Management

Dependencies should be managed consistently across the monorepo.

Rules:

- Lock dependency versions
- Review updates before merging
- Use automated dependency checks
- Avoid unnecessary upgrades

---

# Dependency Review Process

Before adding a new dependency, contributors should answer:

1. Why is this dependency required?
2. Can it be replaced with existing functionality?
3. Does it affect package size?
4. Does it introduce security risks?
5. Does it align with project goals?

---

# Summary

The dependency strategy keeps the WhatsApp SDK lightweight, secure, and maintainable.

By controlling dependency growth and enforcing clear boundaries, the project can scale without losing architectural quality.

---

**Next Section**

2.7 Request Lifecycle

---

# 2.7 Request Lifecycle

## Purpose

The Request Lifecycle defines the complete journey of a request inside the WhatsApp SDK.

It explains how a developer action is transformed into a Meta Graph API request and how the response returns back to the application.

A consistent lifecycle ensures predictable behavior across all SDK features.

---

# Complete Request Flow

```text
Developer Application

        │

        ▼

WhatsAppClient

        │

        ▼

Service Layer

        │

        ▼

Input Validation

        │

        ▼

Request Builder

        │

        ▼

HTTP Client

        │

        ▼

Meta Graph API

        │

        ▼

Response Parser

        │

        ▼

Error Handler

        │

        ▼

Typed SDK Response

        │

        ▼

Developer Application
```

---

# Step 1 — Developer Application

The lifecycle begins when a developer calls an SDK method.

Example:

```ts
await client.messages.sendText({
  to: "923001234567",
  text: "Hello World"
})
```

The developer only interacts with the public SDK API.

The developer does not need to know:

- API endpoints
- Headers
- Authentication
- Request format

---

# Step 2 — WhatsAppClient Receives Request

The WhatsAppClient acts as the main coordinator.

Responsibilities:

- Route request to correct service
- Provide shared configuration
- Provide shared dependencies

Example:

```text
client.messages

        ↓

MessageService
```

The client does not perform message-specific logic.

---

# Step 3 — Service Processing

The service handles the requested operation.

Example:

```text
MessageService

↓

sendText()
```

Responsibilities:

- Understand business operation
- Validate required data
- Prepare service-level request

The service does not communicate directly with Meta.

---

# Step 4 — Input Validation

Before sending a network request, the SDK validates input.

Examples:

Phone number:

```text
Required

Valid format

Correct type
```

Message:

```text
Text exists

Length validation

Required fields
```

Invalid requests should fail immediately.

---

# Step 5 — Request Building

The Request Builder converts SDK data into an HTTP request.

Example:

SDK Input:

```ts
{
 to: "923001234567",
 text: "Hello"
}
```

Converted into:

```json
{
 "messaging_product": "whatsapp",
 "to": "923001234567",
 "type": "text",
 "text": {
   "body": "Hello"
 }
}
```

The service should not manually construct HTTP payloads.

---

# Step 6 — HTTP Client Processing

The HTTP Client handles communication details.

Responsibilities:

- Add authentication
- Add headers
- Build final URL
- Execute request
- Handle network errors

Example:

```text
POST

https://graph.facebook.com/{version}/{phone-id}/messages
```

---

# Step 7 — Meta Graph API

The request reaches Meta's servers.

Possible results:

Success:

```json
{
 "message_id": "12345"
}
```

Failure:

```json
{
 "error": {
   "code": 131026,
   "message": "Invalid parameter"
 }
}
```

---

# Step 8 — Response Processing

The SDK receives Meta's response.

The response parser converts it into SDK-friendly objects.

Raw API responses should not leak directly to developers.

---

# Step 9 — Error Handling

If Meta returns an error, the SDK converts it into meaningful SDK errors.

Example:

Instead of:

```text
Graph API Error 131026
```

Developer receives:

```ts
WhatsAppValidationError
```

with:

```text
message

code

details

solution
```

---

# Step 10 — Return Result

The final result returns to the developer.

Success example:

```ts
{
 messageId: "12345"
}
```

Error example:

```ts
catch(error) {

 if(error instanceof WhatsAppError){

 }

}
```

---

# Request Lifecycle Rules

Every feature must follow the same lifecycle.

Services must not:

- Directly call fetch
- Handle authentication
- Parse raw responses
- Create custom error formats

All requests must use shared infrastructure.

---

# Benefits

A standardized request lifecycle provides:

- Predictable behavior
- Easier debugging
- Better testing
- Consistent developer experience
- Easier future improvements

---

# Future Improvements

The lifecycle is designed to support:

- Request middleware
- Response middleware
- Automatic retries
- Rate limit handling
- Metrics collection
- Distributed tracing
- Request caching

---

# Summary

The Request Lifecycle defines how every operation moves through the WhatsApp SDK.

By enforcing a consistent flow from developer code to Meta API and back, the SDK remains reliable, maintainable, and easy to extend.

---

**Next Section**

2.8 Error Flow

---

# 2.8 Error Flow

## Purpose

The Error Flow defines how errors are detected, processed, transformed, and exposed to developers.

The goal is to provide meaningful, predictable, and actionable errors instead of exposing raw Meta API responses.

---

# Error Handling Philosophy

The SDK should follow these principles:

- Fail fast
- Provide clear messages
- Preserve original error information
- Never expose sensitive data
- Use typed errors
- Make debugging easier

---

# Error Lifecycle

```text
Error Occurs

      │

      ▼

Detection Layer

      │

      ▼

Error Parser

      │

      ▼

Error Mapper

      │

      ▼

SDK Error Class

      │

      ▼

Developer Application
```

---

# Error Sources

Errors can originate from multiple places.

## 1. Configuration Errors

Generated during SDK initialization.

Examples:

- Missing access token
- Missing phone number ID
- Invalid configuration type

Example:

```ts
new WhatsAppClient({
  accessToken: ""
})
```

Result:

```text
ConfigurationError
```

---

# 2. Validation Errors

Generated before sending requests.

Examples:

- Missing required field
- Invalid phone number
- Empty message body

Example:

```ts
sendText({
 text: ""
})
```

Result:

```text
ValidationError
```

---

# 3. Network Errors

Generated during HTTP communication.

Examples:

- Connection failure
- Timeout
- DNS failure
- Network unavailable

Result:

```text
NetworkError
```

---

# 4. Meta API Errors

Generated by WhatsApp Cloud API.

Examples:

```json
{
 "error": {
   "code": 131026,
   "message": "Message failed"
 }
}
```

The SDK should convert these into meaningful errors.

---

# Error Mapping Flow

Raw Meta Error:

```json
{
 "code":131026,
 "message":"Message failed"
}
```

↓

Error Mapper

↓

SDK Error:

```ts
WhatsAppApiError
```

with:

```ts
{
 code,
 message,
 details,
 suggestion
}
```

---

# Error Class Design

The SDK should use a hierarchy of errors.

Example:

```text
WhatsAppError

├── ConfigurationError

├── ValidationError

├── AuthenticationError

├── AuthorizationError

├── RateLimitError

├── NetworkError

└── ApiError
```

This allows developers to handle errors specifically.

---

# Example Usage

```ts
try {

 await client.messages.sendText(data)

}

catch(error){

 if(error instanceof RateLimitError){

   // Retry later

 }

 if(error instanceof AuthenticationError){

   // Refresh token

 }

}
```

---

# Error Information

Every SDK error should provide:

## Error Name

Example:

```text
AuthenticationError
```

---

## Error Code

Example:

```text
AUTH_TOKEN_EXPIRED
```

---

## Message

Human-readable explanation.

Example:

```text
The access token has expired.
```

---

## Original Error

Original Meta response should be preserved internally for debugging.

---

## Solution

Whenever possible, provide a recommended fix.

Example:

```text
Generate a new permanent access token.
```

---

# Security Rules

Errors must never expose:

- Access tokens
- Authorization headers
- Webhook secrets
- Private configuration

Example:

❌

```text
Invalid token:
EAAGxxxxxxxxxxxx
```

✅

```text
Invalid access token.
```

---

# Logging Rules

Errors may be logged for debugging.

However:

Sensitive information must always be masked.

Example:

```text
Token:
EAAG****1234
```

---

# Retryable Errors

Not every error should be retried.

The SDK should classify errors.

Retryable:

- Network timeout
- Temporary server error
- Rate limit

Non-Retryable:

- Invalid token
- Invalid parameter
- Permission denied

---

# Error Handling Benefits

A strong error system provides:

- Better developer experience
- Faster debugging
- Safer production usage
- Consistent behavior
- Easier monitoring

---

# Future Improvements

Future versions may support:

- Automatic retry decisions
- Error analytics
- Better troubleshooting links
- Error documentation pages
- Debug mode

---

# Summary

The Error Flow converts complex API failures into simple, meaningful, and actionable SDK errors.

A predictable error system improves reliability and developer confidence while keeping internal implementation details protected.

---

**Next Section**

2.9 Future Expansion

---

# 2.9 Future Expansion

## Purpose

This section defines how the WhatsApp SDK architecture can evolve in the future without introducing unnecessary complexity in the initial release.

The project should start simple while keeping enough flexibility for long-term growth.

---

# Initial Release Strategy

The first versions of the SDK will follow a simple single-package architecture.

The goal is to:

- Launch faster
- Reduce unnecessary complexity
- Validate developer needs
- Collect community feedback
- Maintain a stable foundation

Initial package:

```text
@whatsapp-sdk/core


---

# 2.10 Architecture Decision Records (ADR)

## Purpose

Architecture Decision Records (ADR) document important technical decisions made during the development of the WhatsApp SDK.

Each decision explains:

- What decision was made
- Why it was chosen
- What alternatives were considered
- What consequences it creates

ADRs prevent future contributors from repeating old discussions and provide historical context.

---

# ADR-001 — Single Package First Approach

## Status

Accepted

---

## Decision

The initial version of the WhatsApp SDK will be developed as a single npm package.

Package:

```text
@whatsapp-sdk/core
```

---

## Reason

The early goal is to build a stable and production-ready SDK before expanding the ecosystem.

Starting with multiple packages would introduce unnecessary complexity.

---

## Alternatives Considered

### Monorepo From Day One

Rejected because:

- More tooling complexity
- More build management
- More maintenance overhead
- Slower initial development

---

## Consequences

Positive:

- Faster development
- Easier contribution
- Simple publishing process

Negative:

- Future migration to monorepo may require planning

---

# ADR-002 — TypeScript First Architecture

## Status

Accepted

---

## Decision

The SDK will be written in TypeScript.

---

## Reason

WhatsApp API integrations involve many structured objects.

TypeScript provides:

- Better developer experience
- Strong typing
- Better autocomplete
- Compile-time safety

---

## Alternatives Considered

### JavaScript Only

Rejected because:

- Less type safety
- More runtime errors
- Poorer SDK experience

---

## Consequences

Positive:

- Better API design
- Easier maintenance

Negative:

- Additional build step required

---

# ADR-003 — Framework Agnostic Core

## Status

Accepted

---

## Decision

The core SDK will not depend on any web framework.

---

## Reason

Developers use different environments:

- Express
- Next.js
- NestJS
- Fastify
- Plain Node.js

The SDK should work everywhere.

---

## Alternatives Considered

### Express-Based Core

Rejected because it limits adoption.

---

## Consequences

Positive:

- Wider usage
- Cleaner architecture

Negative:

- Framework integrations require separate work

---

# ADR-004 — Dedicated HTTP Client Layer

## Status

Accepted

---

## Decision

All Meta API communication will go through an internal HTTP Client.

---

## Reason

Centralizing HTTP communication allows:

- Consistent requests
- Shared error handling
- Retry support
- Easier testing

---

## Alternatives Considered

### Direct fetch in Services

Rejected because it creates duplication and tight coupling.

---

## Consequences

Positive:

- Cleaner services
- Easier improvements

Negative:

- Additional abstraction layer

---

# ADR-005 — Custom Error System

## Status

Accepted

---

## Decision

The SDK will provide its own typed error system.

---

## Reason

Raw Meta API errors are difficult for developers to understand.

The SDK should provide:

- Clear error types
- Better messages
- Helpful solutions

---

## Alternatives Considered

### Expose Raw API Errors

Rejected because developer experience suffers.

---

## Consequences

Positive:

- Easier debugging
- Better production handling

Negative:

- Requires maintaining error mappings

---

# ADR-006 — Documentation Driven Development

## Status

Accepted

---

## Decision

Every public feature must include documentation before release.

---

## Reason

An SDK is not only code.

Developer experience depends on:

- Examples
- Guides
- API references

---

## Consequences

Positive:

- Easier adoption
- Better community contribution

Negative:

- More work before releases

---

# ADR-007 — Future Monorepo Migration

## Status

Accepted

---

## Decision

The project may migrate to a monorepo architecture after achieving adoption.

---

## Reason

Early complexity should be avoided.

Multiple packages make sense only when real ecosystem needs appear.

---

## Migration Trigger

Possible triggers:

- Framework integrations required
- Multiple maintainers
- Large contributor community
- Separate package release cycles

---

## Consequences

Positive:

- Simple beginning
- Scalable future

Negative:

- Migration planning required

---

# ADR Summary

Current architectural decisions:

| Decision | Choice |
|---|---|
| Language | TypeScript |
| Initial Structure | Single Package |
| Core Design | Framework Agnostic |
| HTTP Communication | Dedicated HTTP Client |
| Error Handling | Custom Error System |
| Documentation | Required |
| Future Growth | Possible Monorepo |

---

# Final Note

Architecture decisions should evolve when project requirements change.

However, changes must be intentional, documented, and reviewed before implementation.

---

**End of Phase 0 - Part 2**

Architecture Design Complete