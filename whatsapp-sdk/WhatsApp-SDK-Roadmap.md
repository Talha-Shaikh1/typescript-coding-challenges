# WhatsApp SDK Roadmap

## Vision

Build a production-grade open-source WhatsApp Cloud API ecosystem.
Release early, iterate often.

Version flow:

    v0.1.0 -> Feedback -> v0.2.0 -> v0.3.0 -> v0.5.0 -> v0.8.0 -> v1.0.0

# Phases

## Phase 0 - Foundation (private)

-   Repository setup
-   MIT License
-   README
-   CONTRIBUTING.md
-   CODE_OF_CONDUCT.md
-   SECURITY.md
-   Issue / PR templates
-   TypeScript
-   ESLint + Prettier
-   tsup
-   Vitest
-   Husky
-   lint-staged
-   GitHub Actions
-   Changesets / Semantic Release
-   Dependabot

Folder structure:

    src/
    tests/
    examples/
    docs/
    .github/
    packages/

Release: **v0.0.1**

------------------------------------------------------------------------

## Phase 1 - Core SDK (First Public Release)

Release: **v0.1.0**

### Client

-   WhatsAppClient

### Messaging

-   sendText()
-   sendImage()
-   sendVideo()
-   sendAudio()
-   sendDocument()
-   sendSticker()
-   sendLocation()
-   sendContact()
-   sendReaction()
-   markAsRead()

### Media

-   uploadMedia()
-   downloadMedia()
-   deleteMedia()

### Utilities

-   Phone formatter
-   Phone validator
-   Meta error parser
-   Logger
-   HTTP client
-   Retry wrapper

### DX

-   TypeScript types
-   Promise API
-   Auto-complete
-   ESM + CJS

### Examples

-   Node
-   Express
-   Fastify
-   Next.js

------------------------------------------------------------------------

## Phase 2 - Webhooks (v0.2.0)

-   Signature verification
-   Webhook verification
-   Payload parser
-   Event router
-   Message events
-   Status events
-   Media events
-   Template events
-   Unknown event handler

------------------------------------------------------------------------

## Phase 3 - Interactive Messages (v0.3.0)

-   Buttons
-   Lists
-   Flows
-   CTA
-   Catalog
-   Product messages
-   Builder API

------------------------------------------------------------------------

## Phase 4 - Templates (v0.4.0)

-   Send template
-   List templates
-   Create template
-   Update template
-   Delete template
-   Dynamic variables
-   Media headers
-   Language support

------------------------------------------------------------------------

## Phase 5 - Business APIs (v0.5.0)

-   Phone numbers
-   Business profile
-   Display name
-   Business hours
-   Profile picture
-   WABA APIs
-   Quality rating
-   Analytics

------------------------------------------------------------------------

## Phase 6 - Production Toolkit (v0.6.0)

-   Retry
-   Exponential backoff
-   Timeout
-   Circuit breaker
-   Queue
-   Idempotency
-   Duplicate detection
-   Rate limiter
-   Redis adapter
-   Memory adapter

------------------------------------------------------------------------

## Phase 7 - Multi Tenant (v0.7.0)

-   Tenant resolver
-   Token resolver
-   Phone resolver
-   Database adapter
-   Context API

------------------------------------------------------------------------

## Phase 8 - Framework Packages

-   @whatsapp-sdk/core
-   @whatsapp-sdk/express
-   @whatsapp-sdk/next
-   @whatsapp-sdk/nest
-   @whatsapp-sdk/fastify
-   @whatsapp-sdk/hono

------------------------------------------------------------------------

## Phase 9 - CLI (v0.9.0)

Commands: - wa init - wa doctor - wa webhook - wa send - wa config - wa
test - wa generate

------------------------------------------------------------------------

## Phase 10 - Documentation

-   API docs
-   Tutorials
-   Cookbooks
-   FAQ
-   Error codes
-   Best practices
-   Architecture
-   Migration guides

Suggested: Docusaurus

------------------------------------------------------------------------

## Phase 11 - Stable (v1.0.0)

Goals: - 90%+ test coverage - Stable API - Production ready - Community
contributors - CI passing - Complete documentation

# Open Source Workflow

## Branches

    main
    develop
    feature/*
    fix/*

## Commit Convention

-   feat:
-   fix:
-   docs:
-   test:
-   refactor:
-   perf:
-   ci:
-   build:
-   chore:

Examples:

    feat(core): add sendImage
    fix(media): upload bug
    docs(readme): improve quickstart

## Release Strategy

-   0.1.0
-   0.1.1
-   0.1.2
-   0.2.0
-   0.2.1
-   1.0.0

## CI Pipeline

Lint -\> Typecheck -\> Build -\> Tests -\> Coverage -\> Merge

## Labels

-   bug
-   enhancement
-   documentation
-   question
-   help wanted
-   good first issue
-   duplicate
-   wontfix

## PR Rules

Every PR must include: - Code - Tests - Documentation

# Long-Term Ecosystem

    @whatsapp-sdk/core
    @whatsapp-sdk/express
    @whatsapp-sdk/next
    @whatsapp-sdk/nest
    @whatsapp-sdk/logger
    @whatsapp-sdk/testing
    @whatsapp-sdk/cli

Goal: Build an ecosystem, not just an npm package.
