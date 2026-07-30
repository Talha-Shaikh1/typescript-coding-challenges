---
title: Functional Requirements - Part 06
document: Product Requirements Document (PRD)
project: WhatsApp SDK
chapter: 11
part: 06
version: 0.1.0
status: Draft
author: Talha
last_updated: 2026-07-28
---

# Chapter 11 — Functional Requirements

# Part 06 — Multi-Tenancy Support

> **Purpose:** Define how the SDK supports both single-tenant and multi-tenant architectures. This is a core design requirement that affects the entire SDK architecture, not a future add-on feature.

---

# 1. Introduction

The WhatsApp SDK must support two fundamentally different deployment patterns:

1. **Single-Tenant:** A business integrates WhatsApp into their own application with one WhatsApp Business Account (WABA).
2. **Multi-Tenant:** A SaaS platform (like BotAura) manages WhatsApp integrations for multiple customers, each with their own WABA, tokens, and configuration.

This requirement is a **core architectural constraint**, not an optional feature.

Failure to design for multi-tenancy from the beginning would force SaaS platforms to fork the SDK or build complex workarounds.

---

# 2. Why This Matters

### Single-Tenant Use Case

A restaurant booking system integrates WhatsApp to send confirmations:

```ts
const client = new WhatsAppClient({
    accessToken: process.env.ACCESS_TOKEN!,
    phoneNumberId: process.env.PHONE_NUMBER_ID!,
});

await client.sendText({
    to: "923001234567",
    text: "Your booking is confirmed"
});
```

- One application instance
- One WhatsApp Business Account
- Static configuration
- Simple deployment

---

### Multi-Tenant Use Case

A SaaS platform like BotAura manages WhatsApp for 100 different businesses:

```ts
// Tenant A: Restaurant chain
// Token: EAAxxxx1111, Phone: 123456

// Tenant B: E-commerce store  
// Token: EAAxxxx2222, Phone: 789012

// Tenant C: Healthcare clinic
// Token: EAAxxxx3333, Phone: 345678
```

Requirements:

- One application instance serves all tenants
- Each tenant has isolated credentials
- Dynamic tenant onboarding
- Complete token isolation
- Per-tenant rate limiting
- Per-tenant error handling
- No cross-tenant data leakage

---

# 3. Design Constraint

The SDK architecture must guarantee:

1. **Complete Isolation:** No shared state between tenants
2. **Zero Cross-Contamination:** Tenant A's token never reaches Tenant B's request
3. **Independent Failures:** Tenant A's rate limit doesn't affect Tenant B
4. **Scalability:** Support hundreds of tenants in a single process
5. **Simplicity for Single-Tenant:** Multi-tenant support adds zero complexity for simple use cases

---

# 4. Architecture Options

## Option A: Stateless SDK with Multiple Instances (RECOMMENDED)

The SDK remains completely stateless and tenant-agnostic.

Developers create independent client instances per tenant:

```ts
// Multi-tenant service layer (developer's code)
class WhatsAppService {
    private clients = new Map<string, WhatsAppClient>();

    registerTenant(tenantId: string, config: WhatsAppConfig) {
        const client = new WhatsAppClient(config);
        this.clients.set(tenantId, client);
    }

    async sendMessage(tenantId: string, message: MessagePayload) {
        const client = this.clients.get(tenantId);
        if (!client) throw new Error('Tenant not found');
        return await client.sendText(message);
    }
}
```

### Advantages

- **Zero SDK complexity:** SDK doesn't know about tenancy
- **Complete isolation by design:** Each instance is independent
- **No shared state risks:** Impossible to leak between tenants
- **Flexible orchestration:** Developer chooses storage (Map, Redis, DB)
- **Simple single-tenant path:** No unused abstractions
- **Easy to reason about:** Standard object-oriented pattern

### Disadvantages

- **Developer responsibility:** Multi-tenant apps must implement orchestration
- **Memory overhead:** Multiple HTTP client instances (acceptable tradeoff)
- **No built-in helpers:** No tenant registry, no dynamic loading

---

## Option B: SDK with Built-In Tenant Registry

The SDK provides tenant management primitives:

```ts
// Hypothetical SDK-managed approach
const manager = new WhatsAppClientManager();

manager.registerTenant('tenant-a', {
    accessToken: 'EAAxxxx1111',
    phoneNumberId: '123456',
});

manager.registerTenant('tenant-b', {
    accessToken: 'EAAxxxx2222', 
    phoneNumberId: '789012',
});

const client = manager.getClient('tenant-a');
await client.sendText({...});
```

### Advantages

- **Convenience:** Built-in orchestration
- **Consistency:** Standard pattern across projects
- **Potential optimizations:** Shared HTTP connection pools

### Disadvantages

- **SDK complexity:** Violates single responsibility principle
- **Storage assumptions:** Where do tenant configs live? Memory? Redis?
- **Framework coupling risk:** Different apps have different storage needs
- **Harder to test:** More surface area
- **Overkill for single-tenant:** Unused abstraction layer
- **Security risk:** Centralized tenant registry increases blast radius

---

# 5. Recommended Approach

**Option A: Stateless SDK with Multiple Instances**

### Rationale

1. **Simplicity:** Aligns with "avoid early complexity" principle
2. **Security:** Complete isolation by default—no shared state means no leakage
3. **Flexibility:** Developers choose how to store/manage tenant configs (Map, Redis, Database, Vault)
4. **Framework Agnostic:** Works in any architecture (serverless, monolith, microservices)
5. **Single Responsibility:** SDK handles WhatsApp API, not tenant management
6. **Testability:** Easier to test isolated instances

### Implementation Guidance

The SDK should document multi-tenant patterns in the guides:

**Recommended Pattern:**

```ts
// Example: Multi-tenant service with in-memory storage
import { WhatsAppClient, WhatsAppConfig } from '@whatsapp-sdk/core';

export class MultiTenantWhatsAppService {
    private clients = new Map<string, WhatsAppClient>();

    async initialize(tenants: Array<{id: string, config: WhatsAppConfig}>) {
        for (const tenant of tenants) {
            this.clients.set(tenant.id, new WhatsAppClient(tenant.config));
        }
    }

    getClient(tenantId: string): WhatsAppClient {
        const client = this.clients.get(tenantId);
        if (!client) throw new Error(`Tenant ${tenantId} not initialized`);
        return client;
    }

    async sendTextForTenant(tenantId: string, to: string, text: string) {
        const client = this.getClient(tenantId);
        return await client.sendText({ to, text });
    }
}
```

**With Redis Storage:**

```ts
import { WhatsAppClient } from '@whatsapp-sdk/core';
import Redis from 'ioredis';

export class RedisTenantService {
    private clients = new Map<string, WhatsAppClient>();
    private redis: Redis;

    async getClient(tenantId: string): Promise<WhatsAppClient> {
        // Check in-memory cache first
        if (this.clients.has(tenantId)) {
            return this.clients.get(tenantId)!;
        }

        // Load from Redis
        const config = await this.redis.get(`tenant:${tenantId}:config`);
        if (!config) throw new Error('Tenant not found');

        const client = new WhatsAppClient(JSON.parse(config));
        this.clients.set(tenantId, client);
        return client;
    }
}
```

---

# 6. Security Implications

## Token Isolation

**Guarantee:** Each `WhatsAppClient` instance maintains its own configuration object.

```ts
const clientA = new WhatsAppClient({ accessToken: 'TOKEN_A', ... });
const clientB = new WhatsAppClient({ accessToken: 'TOKEN_B', ... });

// TOKEN_A and TOKEN_B never share memory or execution context
```

**Implementation Requirement:**

- Configuration must be stored per-instance (not in global scope)
- No static/shared configuration variables
- Each client's HTTP layer uses instance-scoped config

---

## State Isolation

**Requirement:** Internal SDK state must be isolated per-instance.

### HTTP Client State

Each `WhatsAppClient` creates its own HTTP client instance:

```ts
class WhatsAppClient {
    private httpClient: HttpClient;

    constructor(config: WhatsAppConfig) {
        this.httpClient = new HttpClient(config); // Per-instance
    }
}
```

**Not Allowed:**

```ts
// ❌ WRONG - Shared global HTTP client
const globalHttpClient = new HttpClient();

class WhatsAppClient {
    constructor(config: WhatsAppConfig) {
        globalHttpClient.setConfig(config); // Race condition!
    }
}
```

---

### Retry State

Each client maintains independent retry counters:

```ts
// Tenant A: Request failed 2 times, retry again
// Tenant B: Independent retry counter, not affected
```

**Implementation:** Retry state must be instance-scoped, not static.

---

### Rate Limit Tracking

If SDK implements client-side rate limiting (future feature):

```ts
// Each tenant has independent rate limit buckets
clientA.sendText() // Uses Tenant A's rate limit quota
clientB.sendText() // Uses Tenant B's rate limit quota
```

**Not Allowed:** Global rate limiter that affects all tenants.

---

### Cache Isolation (Future)

If SDK introduces caching (media URLs, template IDs):

```ts
// Each client instance maintains its own cache
const clientA = new WhatsAppClient(configA);
const clientB = new WhatsAppClient(configB);

// clientA.cache is completely separate from clientB.cache
```

**Implementation:** Cache must be instance property, not static/global.

---

## Error Handling Isolation

Errors in one tenant's requests must not affect others:

```ts
try {
    await clientA.sendText({...}); // Fails with rate limit error
} catch (error) {
    // Only affects clientA
    // clientB continues working normally
}

await clientB.sendText({...}); // Success
```

**Requirement:** No shared error state or circuit breakers across instances.

---

# 7. Single-Tenant Simplicity

For single-tenant use cases, multi-tenancy support is invisible:

```ts
// Simple single-tenant app - no complexity added
const client = new WhatsAppClient({
    accessToken: process.env.ACCESS_TOKEN!,
    phoneNumberId: process.env.PHONE_NUMBER_ID!,
});

await client.sendText({ to: "923001234567", text: "Hello" });
```

**Guarantee:** No unused abstractions, no tenant-related concepts in the API.

---

# 8. Future Enhancements

While the core SDK remains stateless, future optional packages may provide convenience:

**Potential Future Package:** `@whatsapp-sdk/multi-tenant`

```ts
import { MultiTenantManager } from '@whatsapp-sdk/multi-tenant';

const manager = new MultiTenantManager({
    storage: new RedisStorage(redis),
    cacheClients: true,
});

await manager.register('tenant-a', configA);
const client = await manager.getClient('tenant-a');
```

**Note:** This would be a separate package, not part of core. Core SDK remains stateless.

---

# 9. Documentation Requirements

The SDK documentation must include:

### Getting Started (Single-Tenant)

Standard quick-start guide with one client instance.

### Advanced Guide: Multi-Tenant Architecture

- Conceptual overview
- Example implementations (Map, Redis, Database)
- Security best practices
- Memory considerations
- Dynamic tenant loading patterns
- Tenant lifecycle management (add/remove/update)

### API Reference

No tenant-specific APIs in core—standard `WhatsAppClient` works for both cases.

---

# 10. Testing Requirements

The SDK test suite must verify isolation:

```ts
describe('Multi-tenant isolation', () => {
    it('should not leak tokens between instances', async () => {
        const clientA = new WhatsAppClient({ accessToken: 'TOKEN_A', ... });
        const clientB = new WhatsAppClient({ accessToken: 'TOKEN_B', ... });

        // Mock HTTP layer and verify each client uses its own token
    });

    it('should not share retry state', async () => {
        const clientA = new WhatsAppClient(configA);
        const clientB = new WhatsAppClient(configB);

        // Simulate clientA hitting retry limit
        // Verify clientB is unaffected
    });
});
```

---

# 11. Acceptance Criteria

Multi-tenancy support is considered complete when:

- ✅ Multiple `WhatsAppClient` instances can coexist in the same process
- ✅ Each instance maintains completely isolated configuration
- ✅ No shared static state exists in the SDK
- ✅ Retry state is per-instance
- ✅ HTTP clients are per-instance
- ✅ Errors in one instance do not affect others
- ✅ Memory overhead is acceptable (benchmark: 1000 instances)
- ✅ Documentation includes multi-tenant patterns
- ✅ Test suite verifies isolation guarantees

---

# 12. Non-Goals

This design explicitly **does not** include:

- Built-in tenant registry or manager
- Tenant authentication/authorization
- Tenant data storage
- Tenant billing/metering
- Admin APIs for tenant management
- Shared connection pooling across tenants

These concerns belong to the application layer, not the SDK.

---

# 13. Design Trade-Offs

### Memory Overhead

Each client instance creates its own HTTP client, configuration object, and internal state.

**Estimated overhead per instance:** ~50-100 KB

**Impact:** For 1000 tenants = ~50-100 MB

**Verdict:** Acceptable tradeoff for guaranteed isolation.

### Developer Responsibility

Multi-tenant apps must implement tenant orchestration themselves.

**Verdict:** Correct tradeoff. SDK stays simple, developers retain control over storage/architecture.

---

# 14. Chapter Summary

Multi-tenancy is a **core architectural requirement**, not a feature.

The SDK achieves multi-tenancy through **instance isolation** rather than built-in tenant management.

This approach:
- Maintains SDK simplicity
- Guarantees security by design
- Supports both single-tenant and multi-tenant use cases
- Preserves framework agnosticism
- Follows single responsibility principle

---

# Decision Summary

**Adopted Approach:** Stateless SDK with multiple independent instances.

**Rationale:** Security, simplicity, flexibility, and alignment with existing architecture principles.

**Impact:** Multi-tenant applications create multiple `WhatsAppClient` instances and manage them via application-specific orchestration (Map, Redis, Database, etc.).

---

# Related Documents

- Part 01 — Client & Configuration
- Chapter 12 — Non-Functional Requirements
- Phase 0 — Architecture Design (ADR-008)
- Advanced Guide: Multi-Tenant Patterns (Future)
