# Phase 0 - Part 1

# Repository Foundation

## Objective

Define the vision, scope, engineering principles and repository
decisions before writing code.

## 1. Vision

Build the best production-grade open-source TypeScript SDK for the
WhatsApp Cloud API.

### Mission

-   Make Meta Graph API simple.
-   Type-safe API.
-   Framework agnostic.
-   Production ready.
-   Excellent developer experience.

## 2. Goals

### Primary

-   TypeScript first
-   Modular architecture
-   Enterprise ready
-   Framework agnostic
-   Excellent documentation
-   Strong testing
-   Open source

### Secondary

-   CLI
-   Plugin system
-   Tree shaking
-   Small bundle size

## 3. Non-goals

-   CRM
-   Chatbot Builder
-   Dashboard
-   Database
-   AI Platform
-   Queue Service

## 4. Target Users

-   Beginners
-   Backend developers
-   Full-stack developers
-   SaaS companies
-   Agencies

## 5. Engineering Principles

1.  Developer Experience First
2.  Type Safety
3.  Consistency
4.  Small Public API
5.  Modular Design
6.  Composition over inheritance
7.  Backward compatibility
8.  Documentation with every feature
9.  Tests before merge

## 6. Initial Tech Stack

-   TypeScript
-   Node.js
-   pnpm
-   tsup
-   Vitest
-   ESLint
-   Prettier
-   GitHub Actions
-   Changesets
-   Docusaurus

## 7. Repository Strategy

Monorepo from day one.

Future packages:

-   @whatsapp-sdk/core
-   @whatsapp-sdk/express
-   @whatsapp-sdk/next
-   @whatsapp-sdk/nest
-   @whatsapp-sdk/cli
-   @whatsapp-sdk/testing

## 8. Folder Vision

packages/ docs/ examples/ tests/ scripts/ .github/

## 9. Naming

Repository: whatsapp-sdk

Package: @whatsapp-sdk/core

## 10. License

MIT

## 11. Versioning

Semantic Versioning

0.1.0 0.2.0 0.3.0 1.0.0

## 12. Documentation Philosophy

Every feature must include: - Overview - Installation - Example - API
Reference - Error Handling

## 13. Repository Protection

-   Protected main branch
-   Pull Requests required
-   CI required
-   Reviews required

## 14. Success Metrics

-   Active contributors
-   Stable API
-   Production adoption
-   High test coverage
-   Excellent documentation

## Pending RFC Decisions

-   HTTP client
-   Monorepo tooling
-   Logger implementation
-   Build tooling
-   Package naming (final)
