---
title: Non-Goals
document: Product Requirements Document (PRD)
project: WhatsApp SDK
chapter: 07
version: 0.1.0
status: Draft
author: Talha
last_updated: 2026-07-22
---

# Chapter 7 — Non-Goals

> **Purpose:** Clearly define what this project is **not** trying to build. Establishing non-goals prevents scope creep and helps contributors make better engineering decisions.

---

# 1. Why Non-Goals Matter

Every successful engineering project has clear boundaries.

Without explicit non-goals, contributors may unintentionally add features that increase complexity, dilute the project's focus, or create unnecessary maintenance burdens.

This document defines those boundaries.

---

# 2. Product Non-Goals

The WhatsApp SDK **is not** intended to become:

- A CRM platform
- A chatbot builder
- A no-code automation platform
- A marketing platform
- A customer support dashboard
- A campaign management tool
- A WhatsApp Business Manager replacement
- A hosted SaaS platform

The SDK exists to simplify development—not to replace business applications.

---

# 3. Technical Non-Goals

The SDK will not:

- Store user messages
- Store conversations
- Manage databases
- Provide authentication systems
- Host webhook servers
- Replace web frameworks
- Replace queue systems
- Replace logging platforms

Instead, it integrates cleanly with these technologies.

---

# 4. Infrastructure Non-Goals

The SDK will not include:

- Built-in Redis servers
- Built-in databases
- Docker orchestration
- Kubernetes tooling
- Cloud deployment automation

Infrastructure decisions remain the responsibility of the application using the SDK.

---

# 5. Business Non-Goals

This project will not attempt to:

- Sell WhatsApp services
- Compete with Meta
- Replace Business Solution Providers
- Manage WhatsApp accounts
- Provide hosting

Its purpose is to provide development tools.

---

# 6. Engineering Philosophy

When deciding whether to add a feature, contributors should ask:

> "Does this improve the developer experience of integrating the WhatsApp Cloud API?"

If the answer is **No**, the feature likely does not belong in this project.

---

# 7. Scope Protection

The following principles help protect the project from scope creep:

- Keep the public API focused.
- Prefer plugins over core features.
- Avoid unnecessary dependencies.
- Separate framework-specific logic from the core SDK.
- Keep infrastructure optional.

---

# 8. Future Considerations

Some features excluded from the core SDK may later be implemented as separate packages, for example:

- @whatsapp-sdk/cli
- @whatsapp-sdk/testing
- @whatsapp-sdk/express
- @whatsapp-sdk/next
- @whatsapp-sdk/nest

This allows the ecosystem to grow without making the core package unnecessarily large.

---

# 9. Chapter Summary

The long-term success of the project depends not only on the features it includes, but also on the features it intentionally excludes.

Maintaining a clear scope improves maintainability, consistency, and developer experience.

---

# Decision Summary

Every new feature proposal should be evaluated against the project's mission, goals, and non-goals before implementation.

---

# Related Documents

- Chapter 05 — Mission
- Chapter 06 — Product Goals
- Chapter 08 — Target Audience
- Phase 0 — Repository Foundation