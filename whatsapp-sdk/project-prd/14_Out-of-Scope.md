---
title: Chapter 14 - Out of Scope
document: Product Requirements Document (PRD)
project: WhatsApp SDK
chapter: 14
version: 0.1.0
status: Draft
---

# Chapter 14 — Out of Scope

> **Purpose:** Clearly define what is intentionally excluded from the initial release of the WhatsApp SDK to maintain focus and prevent scope creep.

---

# 1. Introduction

Every successful project defines not only what it will build, but also what it will deliberately postpone.

The features listed below are intentionally excluded from v0.1.0.

Their exclusion does not indicate that they lack value; rather, they are deferred to keep the first release focused, stable, and maintainable.

---

# 2. Features Excluded from v0.1.0

## Advanced WhatsApp Features

The following capabilities will not be included in the initial release:

- WhatsApp Flows
- Interactive Buttons
- List Messages
- Poll Messages
- Product Catalog APIs
- Commerce APIs
- Marketing Campaign Helpers

**Reason**

These features introduce additional complexity and require a stable core before implementation.

---

## Multi-Package Ecosystem

The following packages are not part of v0.1.0:

- @whatsapp-sdk/express
- @whatsapp-sdk/next
- @whatsapp-sdk/nest
- @whatsapp-sdk/testing
- @whatsapp-sdk/logger
- @whatsapp-sdk/cli

**Reason**

The project will first establish a reliable core package before expanding the ecosystem.

---

## Browser Support

Browser environments are not officially supported.

**Reason**

The WhatsApp Cloud API requires secure server-side credentials.

---

## Multiple Runtime Support

The following runtimes are not part of the first release:

- Deno
- Cloudflare Workers
- Bun-specific optimizations

**Reason**

The SDK will first target the Node.js ecosystem.

---

## Plugin Marketplace

Custom plugins and third-party extensions are excluded.

**Reason**

The plugin architecture will be introduced only after the public API becomes stable.

---

## AI Features

The SDK will not include:

- AI Agents
- AI Auto Replies
- AI Prompt Management
- AI Workflows

**Reason**

The SDK focuses exclusively on WhatsApp API integration.

AI belongs in higher-level applications, not the core SDK.

---

## Dashboard

No web dashboard will be included.

**Reason**

The SDK is a developer library, not a SaaS product.

---

# 3. Future Consideration

The excluded features may be evaluated after:

- Stable v1.0 release
- Community demand
- Contributor availability
- Meta API maturity

---

# 4. Decision Summary

The project intentionally limits the first release to the core WhatsApp Cloud API capabilities.

This allows the team to prioritize quality, maintainability, and developer experience over feature quantity.

---

# 5. Related Documents

- Chapter 13 — Product Scope
- Chapter 20 — Roadmap
- Chapter 21 — Future Vision

---

# 6. Implementation Notes

Items listed in this chapter should not be implemented during v0.1.0 development unless the Product Scope is formally updated.