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
import { createClient, Tenant } from 'wasync';

const tenant: Tenant = {
    id: 'restaurant-app',
    accessToken: process.env.ACCESS_TOKEN!,
    phoneNumberId: process.env.PHONE_NUMBER_ID!,
};

const client = createClient(tenant);

await client.messages.sendText({
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
// Tenant ID: restaurant-chain-123
// Token: EAAxxxx1111, Phone: 123456

// Tenant B: E-commerce store
// Tenant ID: ecommerce-store-456
// Token: EAAxxxx2222, Phone: 789012

// Tenant C: Healthcare clinic
// Tenant ID: healthcare-clinic-789
// Token: EAAxxxx3333, Phone: 345678
```

Requirements:

- One application instance serves all tenants
- Each tenant has isolated credentials via `Tenant` interface
- Dynamic tenant onboarding via `TenantStore`
- Complete token isolation via factory pattern
- Per-tenant rate limiting (independent quotas)
- Per-tenant retry logic (independent state)
- Webhook routing via phone number resolution
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

## Option A: Factory Pattern with Tenant Interfaces (RECOMMENDED)

The SDK provides explicit interfaces for tenant management and uses a factory function to create isolated client instances.

Core interfaces:

```ts
interface Tenant {
  id: string;                    // Unique tenant identifier
  phoneNumberId: string;         // WhatsApp Business phone number ID
  accessToken: string;           // Meta access token
  webhookSecret?: string;        // Optional webhook verification secret
}

interface TenantStore {
  get(tenantId: string): Promise<Tenant | null>;
  getByPhoneNumberId(phoneNumberId: string): Promise<Tenant | null>;
  set(tenant: Tenant): Promise<void>;
  delete(tenantId: string): Promise<void>;
}
```

Factory function:

```ts
function createClient(tenant: Tenant): WhatsAppClient;
```

Multi-tenant service example:

```ts
import { createClient, TenantStore, Tenant } from 'wasync';

class WhatsAppService {
    private clients = new Map<string, any>();

    constructor(private store: TenantStore) {}

    async getClient(tenantId: string) {
        if (this.clients.has(tenantId)) {
            return this.clients.get(tenantId);
        }

        const tenant = await this.store.get(tenantId);
        if (!tenant) throw new Error('Tenant not found');

        const client = createClient(tenant);
        this.clients.set(tenantId, client);
        return client;
    }

    async sendMessage(tenantId: string, to: string, text: string) {
        const client = await this.getClient(tenantId);
        return await client.messages.sendText({ to, text });
    }

    async handleWebhook(rawBody: string, signature: string) {
        const payload = JSON.parse(rawBody);
        const phoneNumberId = payload.entry[0].changes[0].value.metadata.phone_number_id;
        
        const tenant = await this.store.getByPhoneNumberId(phoneNumberId);
        if (!tenant) {
            console.warn('Dead letter: unknown phone number', phoneNumberId);
            return; // Return 200 to Meta
        }

        // Verify signature
        const isValid = verifySignature(rawBody, signature, tenant.webhookSecret);
        if (!isValid) throw new Error('Invalid signature');

        // Process webhook
        const client = await this.getClient(tenant.id);
        // ... handle webhook events
    }
}
```

### Advantages

- **Explicit tenant context:** `Tenant` interface makes structure clear
- **Webhook routing built-in:** `getByPhoneNumberId()` resolves tenants from webhooks
- **Complete isolation by design:** Each instance is independent via factory pattern
- **No shared state risks:** Impossible to leak between tenants
- **Clear conventions:** Standard interfaces guide implementation
- **Flexible orchestration:** Developer chooses storage (Map, Redis, DB, Vault)
- **Simple single-tenant path:** No unused abstractions
- **Easy to reason about:** Standard factory pattern
- **Framework agnostic:** Works everywhere

### Disadvantages

- **Developer responsibility:** Multi-tenant apps must implement `TenantStore`
- **Memory overhead:** Multiple HTTP client instances (acceptable tradeoff)
- **Interface learning curve:** Developers must understand `Tenant` and `TenantStore` interfaces

---

## Option B: Constructor Pattern Only (Not Recommended)

The SDK provides only a constructor with no tenant interfaces:

```ts
// Hypothetical alternative
const client = new WhatsAppClient({
    accessToken: 'EAAxxxx1111',
    phoneNumberId: '123456',
});
```

Developers build their own tenant management with no SDK guidance.

### Advantages

- **Maximum flexibility:** No prescribed patterns
- **Simpler SDK surface:** Fewer exports

### Disadvantages

- **No webhook routing conventions:** Every developer solves it differently
- **No standard tenant structure:** Inconsistent implementations
- **Harder to document:** No clear multi-tenant pattern
- **More developer work:** No interfaces to guide implementation
- **Fragmented ecosystem:** Everyone builds incompatible solutions

---

# 5. Recommended Approach

**Option A: Factory Pattern with Tenant Interfaces**

### Rationale

1. **Clarity:** Explicit `Tenant` interface documents expected structure
2. **Webhook Support:** `TenantStore.getByPhoneNumberId()` enables webhook routing
3. **Security:** Complete isolation by factory pattern and object boundaries
4. **Flexibility:** Developers choose storage implementation (Map, Redis, Database, Vault)
5. **Framework Agnostic:** Works in any architecture (serverless, monolith, microservices)
6. **Single Responsibility:** SDK handles WhatsApp API and defines interfaces; apps handle storage
7. **Testability:** Clear interfaces make testing easier
8. **Conventions:** Standard pattern guides ecosystem

### Implementation Guidance

The SDK exports:

```ts
// Core interfaces
export interface Tenant {
  id: string;
  phoneNumberId: string;
  accessToken: string;
  webhookSecret?: string;
}

export interface TenantStore {
  get(tenantId: string): Promise<Tenant | null>;
  getByPhoneNumberId(phoneNumberId: string): Promise<Tenant | null>;
  set(tenant: Tenant): Promise<void>;
  delete(tenantId: string): Promise<void>;
}

// Factory function
export function createClient(tenant: Tenant): WhatsAppClient;

// Webhook utilities
export function verifySignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean;

export async function routeWebhook(
  rawBody: string,
  signature: string,
  store: TenantStore
): Promise<void>;
```

The SDK provides **interfaces and utilities**. Developers provide **implementations**.

### Recommended Pattern

**In-Memory TenantStore (Simple):**

```ts
import { TenantStore, Tenant } from 'wasync';

export class InMemoryTenantStore implements TenantStore {
    private tenants = new Map<string, Tenant>();
    private phoneIndex = new Map<string, string>();

    async get(tenantId: string): Promise<Tenant | null> {
        return this.tenants.get(tenantId) || null;
    }

    async getByPhoneNumberId(phoneNumberId: string): Promise<Tenant | null> {
        const tenantId = this.phoneIndex.get(phoneNumberId);
        return tenantId ? this.tenants.get(tenantId) || null : null;
    }

    async set(tenant: Tenant): Promise<void> {
        this.tenants.set(tenant.id, tenant);
        this.phoneIndex.set(tenant.phoneNumberId, tenant.id);
    }

    async delete(tenantId: string): Promise<void> {
        const tenant = this.tenants.get(tenantId);
        if (tenant) {
            this.phoneIndex.delete(tenant.phoneNumberId);
            this.tenants.delete(tenantId);
        }
    }
}
```

**Redis TenantStore (Distributed):**

```ts
import { TenantStore, Tenant } from 'wasync';
import Redis from 'ioredis';

export class RedisTenantStore implements TenantStore {
    constructor(private redis: Redis) {}

    async get(tenantId: string): Promise<Tenant | null> {
        const data = await this.redis.get(`tenant:${tenantId}`);
        return data ? JSON.parse(data) : null;
    }

    async getByPhoneNumberId(phoneNumberId: string): Promise<Tenant | null> {
        const tenantId = await this.redis.get(`phone:${phoneNumberId}`);
        return tenantId ? this.get(tenantId) : null;
    }

    async set(tenant: Tenant): Promise<void> {
        const pipeline = this.redis.pipeline();
        pipeline.set(`tenant:${tenant.id}`, JSON.stringify(tenant));
        pipeline.set(`phone:${tenant.phoneNumberId}`, tenant.id);
        await pipeline.exec();
    }

    async delete(tenantId: string): Promise<void> {
        const tenant = await this.get(tenantId);
        if (tenant) {
            await this.redis.del(`tenant:${tenantId}`, `phone:${tenant.phoneNumberId}`);
        }
    }
}
```

**Database TenantStore (Persistent):**

```ts
import { TenantStore, Tenant } from 'wasync';
import { Pool } from 'pg';

export class PostgresTenantStore implements TenantStore {
    constructor(private pool: Pool) {}

    async get(tenantId: string): Promise<Tenant | null> {
        const result = await this.pool.query(
            'SELECT * FROM tenants WHERE id = $1',
            [tenantId]
        );
        return result.rows[0] ? this.mapRow(result.rows[0]) : null;
    }

    async getByPhoneNumberId(phoneNumberId: string): Promise<Tenant | null> {
        const result = await this.pool.query(
            'SELECT * FROM tenants WHERE phone_number_id = $1',
            [phoneNumberId]
        );
        return result.rows[0] ? this.mapRow(result.rows[0]) : null;
    }

    async set(tenant: Tenant): Promise<void> {
        await this.pool.query(
            `INSERT INTO tenants (id, phone_number_id, access_token, webhook_secret)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (id) DO UPDATE SET
               phone_number_id = EXCLUDED.phone_number_id,
               access_token = EXCLUDED.access_token,
               webhook_secret = EXCLUDED.webhook_secret`,
            [tenant.id, tenant.phoneNumberId, tenant.accessToken, tenant.webhookSecret]
        );
    }

    async delete(tenantId: string): Promise<void> {
        await this.pool.query('DELETE FROM tenants WHERE id = $1', [tenantId]);
    }

    private mapRow(row: any): Tenant {
        return {
            id: row.id,
            phoneNumberId: row.phone_number_id,
            accessToken: row.access_token,
            webhookSecret: row.webhook_secret || undefined,
        };
    }
}
```

---

# 6. Security Implications

## Token Isolation

**Guarantee:** Each client instance created by `createClient(tenant)` maintains its own tenant configuration.

```ts
const tenantA: Tenant = { id: 'a', phoneNumberId: '111', accessToken: 'TOKEN_A' };
const tenantB: Tenant = { id: 'b', phoneNumberId: '222', accessToken: 'TOKEN_B' };

const clientA = createClient(tenantA);
const clientB = createClient(tenantB);

// TOKEN_A and TOKEN_B never share memory or execution context
```

**Implementation Requirement:**

- Configuration must be stored per-instance (not in global scope)
- No static/shared configuration variables
- Each client's HTTP layer uses instance-scoped config
- Factory function validates tenant before creating instance

---

## State Isolation

**Requirement:** Internal SDK state must be isolated per-instance.

### HTTP Client State

Each client instance creates its own HTTP client:

```ts
class WhatsAppClient {
    private httpClient: HttpClient;

    constructor(tenant: Tenant) {
        this.httpClient = new HttpClient(tenant); // Per-instance
    }
}
```

**Not Allowed:**

```ts
// ❌ WRONG - Shared global HTTP client
const globalHttpClient = new HttpClient();

class WhatsAppClient {
    constructor(tenant: Tenant) {
        globalHttpClient.setConfig(tenant); // Race condition!
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

**Retry Logic:**
- Exponential backoff: `delay = 2^attempt * 1000ms`
- Max 3 retries
- Retry on: network errors, 5xx, 429
- Do NOT retry on: 4xx (except 429), auth errors
- Dead letter after 3 failures

---

### Rate Limit Tracking

Each client maintains its own token bucket for rate limiting:

```ts
class RateLimiter {
    private tokens: number = 80;
    private lastRefill: number = Date.now();
    private readonly capacity = 80;        // messages per minute
    private readonly refillRate = 80/60;   // tokens per second
    
    async acquire(): Promise<void> {
        // Refill tokens based on time elapsed
        const now = Date.now();
        const elapsed = (now - this.lastRefill) / 1000;
        this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
        this.lastRefill = now;
        
        // Wait if no tokens available
        if (this.tokens < 1) {
            const waitTime = (1 - this.tokens) / this.refillRate * 1000;
            await sleep(waitTime);
            this.tokens = 1;
        }
        
        this.tokens -= 1;
    }
}

class WhatsAppClient {
    private rateLimiter: RateLimiter;
    
    constructor(tenant: Tenant) {
        this.rateLimiter = new RateLimiter(); // Per-instance
    }
}
```

**Token Bucket Per Tenant:**

```ts
// Tenant A sends 80 messages/minute → rate limited
// Tenant B sends 80 messages/minute → independent quota, not affected
```

**Not Allowed:** Global rate limiter that affects all tenants.

---

### Cache Isolation (Future)

If SDK introduces caching (media URLs, template IDs):

```ts
// Each client instance maintains its own cache
const clientA = createClient(tenantA);
const clientB = createClient(tenantB);

// clientA.cache is completely separate from clientB.cache
```

**Implementation:** Cache must be instance property, not static/global.

---

## Error Handling Isolation

Errors in one tenant's requests must not affect others:

```ts
try {
    await clientA.messages.sendText({...}); // Fails with rate limit error
} catch (error) {
    // Only affects clientA
    // clientB continues working normally
}

await clientB.messages.sendText({...}); // Success
```

**Requirement:** No shared error state or circuit breakers across instances.

---

## Webhook Security

### Signature Verification

Each tenant's webhooks are verified with their own `webhookSecret`:

```ts
async function routeWebhook(
    rawBody: string,
    signature: string,
    store: TenantStore
): Promise<void> {
    const payload = JSON.parse(rawBody);
    const phoneNumberId = payload.entry[0].changes[0].value.metadata.phone_number_id;
    
    // Resolve tenant
    const tenant = await store.getByPhoneNumberId(phoneNumberId);
    if (!tenant) {
        console.warn('Dead letter: unknown phone', phoneNumberId);
        return; // Return 200 OK to Meta
    }
    
    // Verify signature with tenant's secret
    const isValid = verifySignature(rawBody, signature, tenant.webhookSecret);
    if (!isValid) {
        throw new Error('Invalid webhook signature');
    }
    
    // Process webhook
    const client = createClient(tenant);
    // ... handle events
}
```

### Dead Letter Handling

If a webhook arrives for an unknown phone number:

```ts
// Tenant not found in store
const tenant = await store.getByPhoneNumberId(phoneNumberId);
if (!tenant) {
    // Log to dead letter queue
    console.warn('Dead letter webhook:', { phoneNumberId, timestamp: Date.now() });
    
    // Return 200 OK to Meta (prevent retries)
    return;
}
```

**Important:** Never expose tenant tokens or secrets in logs.

---

## TenantStore Security

Implementations should follow security best practices:

### Encryption at Rest

```ts
// Example: Encrypt tokens before storing in database
import { encrypt, decrypt } from './crypto';

class SecureTenantStore implements TenantStore {
    async set(tenant: Tenant): Promise<void> {
        const encrypted = {
            ...tenant,
            accessToken: encrypt(tenant.accessToken),
            webhookSecret: tenant.webhookSecret ? encrypt(tenant.webhookSecret) : undefined,
        };
        await this.db.save(encrypted);
    }
    
    async get(tenantId: string): Promise<Tenant | null> {
        const row = await this.db.findById(tenantId);
        if (!row) return null;
        
        return {
            ...row,
            accessToken: decrypt(row.accessToken),
            webhookSecret: row.webhookSecret ? decrypt(row.webhookSecret) : undefined,
        };
    }
}
```

### Secure Connections

- Use TLS for Redis connections
- Use SSL for database connections
- Store encryption keys in environment variables or secret managers (AWS Secrets Manager, HashiCorp Vault)

### Access Control

```ts
// Example: Implement access control
class RBACTenantStore implements TenantStore {
    async get(tenantId: string, userId: string): Promise<Tenant | null> {
        // Check if user has access to this tenant
        const hasAccess = await this.checkAccess(userId, tenantId);
        if (!hasAccess) throw new Error('Access denied');
        
        return this.store.get(tenantId);
    }
}
```

### Audit Logging

```ts
// Log tenant access for security audits
class AuditedTenantStore implements TenantStore {
    async get(tenantId: string): Promise<Tenant | null> {
        await this.auditLog.log({
            action: 'GET_TENANT',
            tenantId,
            timestamp: Date.now(),
            userId: this.context.userId,
        });
        
        return this.store.get(tenantId);
    }
}
```

### Never Log Secrets

```ts
// ❌ WRONG
console.log('Tenant:', tenant);

// ✅ CORRECT
console.log('Tenant:', { id: tenant.id, phoneNumberId: tenant.phoneNumberId });

// ✅ CORRECT - Mask tokens
console.log('Tenant:', {
    ...tenant,
    accessToken: maskToken(tenant.accessToken),
    webhookSecret: tenant.webhookSecret ? '***' : undefined,
});

function maskToken(token: string): string {
    return token.slice(0, 8) + '...' + token.slice(-4);
}
```

---

# 7. Single-Tenant Simplicity

For single-tenant use cases, the factory pattern remains simple and intuitive:

```ts
import { createClient, Tenant } from 'wasync';

// Define your tenant
const tenant: Tenant = {
    id: 'my-business',
    phoneNumberId: process.env.PHONE_NUMBER_ID!,
    accessToken: process.env.ACCESS_TOKEN!,
    webhookSecret: process.env.WEBHOOK_SECRET,
};

// Create client
const client = createClient(tenant);

// Use normally
await client.messages.sendText({ to: '923001234567', text: 'Hello World' });
await client.messages.sendImage({ to: '923001234567', image: { link: 'https://...' } });
await client.media.upload(buffer, 'image/jpeg');
```

**No TenantStore needed for single-tenant apps.**

The `Tenant` interface provides structure but doesn't add complexity—it's just an object with four fields.

---

## Comparison

**Before (hypothetical constructor pattern):**
```ts
const client = new WhatsAppClient({
    accessToken: process.env.ACCESS_TOKEN!,
    phoneNumberId: process.env.PHONE_NUMBER_ID!,
});
```

**After (factory pattern):**
```ts
const tenant: Tenant = {
    id: 'my-app',
    accessToken: process.env.ACCESS_TOKEN!,
    phoneNumberId: process.env.PHONE_NUMBER_ID!,
};
const client = createClient(tenant);
```

The difference is minimal—just one extra field (`id`) and a factory function instead of constructor.

The benefit: **consistent pattern** for both single-tenant and multi-tenant use cases.

---

## Webhook Handling (Single-Tenant)

Even for single-tenant apps, webhook verification is built-in:

```ts
import { createClient, verifySignature, Tenant } from 'wasync';

const tenant: Tenant = {
    id: 'my-business',
    phoneNumberId: process.env.PHONE_NUMBER_ID!,
    accessToken: process.env.ACCESS_TOKEN!,
    webhookSecret: process.env.WEBHOOK_SECRET!,
};

const client = createClient(tenant);

app.post('/webhooks/whatsapp', async (req, res) => {
    const signature = req.headers['x-hub-signature-256'];
    const rawBody = JSON.stringify(req.body);
    
    // Verify signature
    const isValid = verifySignature(rawBody, signature, tenant.webhookSecret);
    if (!isValid) {
        return res.status(403).send('Invalid signature');
    }
    
    // Process webhook
    const payload = req.body;
    // ... handle incoming messages
    
    res.status(200).send('OK');
});
```

No need for `TenantStore`—just verify directly with tenant's secret.

---

**Guarantee:** Single-tenant apps see zero multi-tenant complexity.

---

# 8. Future Enhancements

While the core SDK (`wasync`) remains simple with interfaces only, future optional packages may provide convenience implementations.

**Potential Future Package:** `@whatsapp-sdk/multi-tenant`

```ts
import { MultiTenantManager } from '@whatsapp-sdk/multi-tenant';
import { RedisStorage } from '@whatsapp-sdk/multi-tenant/redis';

const manager = new MultiTenantManager({
    storage: new RedisStorage(redis),
    cacheClients: true,
    maxClients: 1000,
});

await manager.register('tenant-a', {
    id: 'tenant-a',
    phoneNumberId: '123456',
    accessToken: 'EAAxxxxx',
    webhookSecret: 'secret',
});

const client = await manager.getClient('tenant-a');
await client.messages.sendText({ to: '923001234567', text: 'Hello' });
```

### Possible Features

**Pre-built TenantStore Implementations:**
- `RedisStorage` - Redis-backed tenant storage
- `PostgresStorage` - PostgreSQL-backed storage
- `MongoStorage` - MongoDB-backed storage
- `DynamoDBStorage` - AWS DynamoDB storage

**Client Pooling:**
- LRU cache for client instances
- Automatic client eviction
- Configurable pool size

**Tenant Lifecycle:**
- `onTenantAdded` hooks
- `onTenantRemoved` hooks
- Automatic token refresh
- Health checks

**Metrics & Monitoring:**
- Per-tenant request counters
- Per-tenant error rates
- Rate limit tracking
- Dead letter queue monitoring

**Example Usage:**

```ts
import { MultiTenantManager, PostgresStorage } from '@whatsapp-sdk/multi-tenant';

const manager = new MultiTenantManager({
    storage: new PostgresStorage(pool),
    cacheClients: true,
    maxClients: 500,
    onTenantAdded: (tenant) => {
        console.log('Tenant added:', tenant.id);
    },
    metrics: {
        enabled: true,
        exporter: prometheusExporter,
    },
});

// Automatic webhook routing
app.post('/webhooks/whatsapp', manager.webhookHandler());
```

**Note:** This would be a **separate optional package**, not part of `wasync`. The core SDK remains simple with interfaces only.

---

## Future Core SDK Enhancements

The core `wasync` package may add:

### Tenant Validation Schemas

```ts
import { createClient, validateTenant } from 'wasync';

const tenant = {
    id: 'test',
    phoneNumberId: '123',
    accessToken: 'token',
};

// Validate before creating client
const errors = validateTenant(tenant);
if (errors.length > 0) {
    throw new Error('Invalid tenant: ' + errors.join(', '));
}

const client = createClient(tenant);
```

### Tenant Configuration Builder

```ts
import { TenantBuilder } from 'wasync';

const tenant = new TenantBuilder()
    .setId('my-tenant')
    .setPhoneNumberId('123456')
    .setAccessToken(process.env.ACCESS_TOKEN!)
    .setWebhookSecret(process.env.WEBHOOK_SECRET)
    .build();

const client = createClient(tenant);
```

### Webhook Event Types

```ts
import { routeWebhook, WebhookEvent } from 'wasync';

await routeWebhook(rawBody, signature, store, {
    onMessage: (event: WebhookEvent, client) => {
        console.log('Message received:', event.message);
    },
    onStatus: (event: WebhookEvent, client) => {
        console.log('Status update:', event.status);
    },
});
```

These enhancements maintain simplicity while improving developer experience.

---

# 9. Documentation Requirements

The SDK documentation must include comprehensive guides for both single-tenant and multi-tenant use cases.

---

## Getting Started (Single-Tenant)

Standard quick-start guide showing simple usage:

**Required Topics:**
- Installation (`npm install wasync`)
- Basic setup with factory pattern
- Creating a client with `Tenant` interface
- Sending first message
- Webhook verification

**Example Structure:**

```markdown
# Getting Started

## Installation
npm install wasync

## Quick Start
import { createClient, Tenant } from 'wasync';

const tenant: Tenant = {
  id: 'my-business',
  phoneNumberId: process.env.PHONE_NUMBER_ID!,
  accessToken: process.env.ACCESS_TOKEN!,
};

const client = createClient(tenant);
await client.messages.sendText({ to: '923001234567', text: 'Hello!' });
```

---

## Advanced Guide: Multi-Tenant Architecture

Comprehensive guide for SaaS platforms:

**Required Topics:**

### 1. Introduction to Multi-Tenancy
- What is multi-tenancy?
- When do you need it?
- Architecture overview

### 2. Core Interfaces
- `Tenant` interface explanation
- `TenantStore` interface explanation
- Factory pattern vs constructor pattern

### 3. Implementing TenantStore

**In-Memory Implementation:**
- Code example
- Use cases (development, single-server)
- Limitations

**Redis Implementation:**
- Code example
- Use cases (distributed systems, horizontal scaling)
- Configuration best practices

**Database Implementation:**
- PostgreSQL example
- MySQL example
- Migration scripts
- Indexing recommendations

**Vault/Secrets Manager:**
- AWS Secrets Manager example
- HashiCorp Vault example
- Security considerations

### 4. Client Management Patterns

**Lazy Loading:**
```ts
class LazyTenantService {
  private clients = new Map<string, any>();
  
  async getClient(tenantId: string) {
    if (!this.clients.has(tenantId)) {
      const tenant = await this.store.get(tenantId);
      const client = createClient(tenant);
      this.clients.set(tenantId, client);
    }
    return this.clients.get(tenantId);
  }
}
```

**Eager Loading:**
```ts
async function initializeClients(tenants: Tenant[]) {
  const clients = new Map();
  for (const tenant of tenants) {
    clients.set(tenant.id, createClient(tenant));
  }
  return clients;
}
```

**LRU Caching:**
```ts
import { LRUCache } from 'lru-cache';

const clientCache = new LRUCache<string, any>({
  max: 1000,
  ttl: 1000 * 60 * 60, // 1 hour
  dispose: (client) => client.destroy?.(),
});
```

### 5. Webhook Routing

**Complete Implementation:**
```ts
import { routeWebhook, verifySignature, createClient } from 'wasync';

app.post('/webhooks/whatsapp', async (req, res) => {
  try {
    const signature = req.headers['x-hub-signature-256'];
    const rawBody = JSON.stringify(req.body);
    
    // Extract phone number ID
    const payload = req.body;
    const phoneNumberId = payload.entry?.[0]?.changes?.[0]?.value?.metadata?.phone_number_id;
    
    if (!phoneNumberId) {
      return res.status(400).send('Invalid payload');
    }
    
    // Resolve tenant
    const tenant = await tenantStore.getByPhoneNumberId(phoneNumberId);
    if (!tenant) {
      console.warn('Dead letter webhook:', phoneNumberId);
      return res.status(200).send('OK'); // Return 200 to prevent Meta retries
    }
    
    // Verify signature
    const isValid = verifySignature(rawBody, signature, tenant.webhookSecret);
    if (!isValid) {
      return res.status(403).send('Invalid signature');
    }
    
    // Process webhook
    const client = createClient(tenant);
    // ... handle webhook events
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal error');
  }
});
```

**Dead Letter Queue:**
```ts
const deadLetterQueue = [];

function handleDeadLetter(phoneNumberId: string, payload: any) {
  deadLetterQueue.push({
    phoneNumberId,
    payload,
    timestamp: Date.now(),
  });
  
  // Send to monitoring system
  metrics.increment('webhook.dead_letter');
}
```

### 6. Security Best Practices

**Topics to Cover:**
- Encrypt tokens at rest
- Use secure connections (TLS/SSL)
- Implement access control
- Audit tenant access
- Rotate tokens regularly
- Never log secrets
- Mask tokens in logs
- Environment variable management
- Secret rotation strategies

### 7. Performance Optimization

**Topics to Cover:**
- Client instance caching
- LRU eviction strategies
- Memory management (1000+ tenants)
- Connection pooling (if applicable)
- Rate limiting per tenant
- Monitoring and metrics

### 8. Error Handling

**Per-Tenant Error Isolation:**
```ts
try {
  await clientA.messages.sendText({...});
} catch (error) {
  // Log with tenant context
  logger.error('Send failed', {
    tenantId: tenantA.id,
    error: error.message,
  });
  
  // Don't affect other tenants
}
```

### 9. Testing Multi-Tenant Apps

**Topics to Cover:**
- Mocking TenantStore
- Testing tenant isolation
- Integration tests
- Load testing with multiple tenants

### 10. Deployment Patterns

**Single Server:**
- In-memory TenantStore
- Suitable for < 100 tenants

**Horizontal Scaling:**
- Redis TenantStore
- Load balancer configuration
- Session affinity considerations

**Microservices:**
- Distributed TenantStore
- Service discovery
- Circuit breakers

---

## API Reference

**Required Documentation:**

### Interfaces

```ts
/**
 * Tenant configuration for WhatsApp Business Account
 */
interface Tenant {
  /** Unique identifier for the tenant */
  id: string;
  
  /** WhatsApp Business phone number ID from Meta */
  phoneNumberId: string;
  
  /** Meta Graph API access token */
  accessToken: string;
  
  /** Optional webhook verification secret */
  webhookSecret?: string;
}

/**
 * Storage interface for tenant management
 */
interface TenantStore {
  /** Get tenant by ID */
  get(tenantId: string): Promise<Tenant | null>;
  
  /** Get tenant by phone number ID (for webhook routing) */
  getByPhoneNumberId(phoneNumberId: string): Promise<Tenant | null>;
  
  /** Create or update tenant */
  set(tenant: Tenant): Promise<void>;
  
  /** Delete tenant */
  delete(tenantId: string): Promise<void>;
}
```

### Functions

```ts
/**
 * Create isolated WhatsApp client instance for a tenant
 * 
 * @param tenant - Tenant configuration
 * @returns WhatsApp client instance
 * @throws Error if tenant configuration is invalid
 */
function createClient(tenant: Tenant): WhatsAppClient;

/**
 * Verify webhook signature using HMAC-SHA256
 * 
 * @param rawBody - Raw webhook payload as string
 * @param signature - X-Hub-Signature-256 header value
 * @param secret - Webhook verification secret
 * @returns true if signature is valid
 */
function verifySignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean;

/**
 * Route incoming webhook to the correct tenant
 * 
 * @param rawBody - Raw webhook payload
 * @param signature - X-Hub-Signature-256 header
 * @param store - TenantStore implementation
 * @throws Error if signature verification fails
 */
async function routeWebhook(
  rawBody: string,
  signature: string,
  store: TenantStore
): Promise<void>;
```

---

## Migration Guide (Future)

If transitioning from another SDK or pattern:

**Topics to Cover:**
- Mapping existing config to `Tenant` interface
- Implementing `TenantStore` for existing storage
- Webhook routing migration
- Testing strategy during migration
- Rollback plan

---

# 10. Testing Requirements

The SDK test suite must verify tenant isolation and multi-tenant functionality.

---

## Unit Tests

### Token Isolation

```ts
describe('Token Isolation', () => {
    it('should not leak tokens between client instances', () => {
        const tenantA: Tenant = {
            id: 'tenant-a',
            phoneNumberId: '111',
            accessToken: 'TOKEN_A',
        };
        
        const tenantB: Tenant = {
            id: 'tenant-b',
            phoneNumberId: '222',
            accessToken: 'TOKEN_B',
        };
        
        const clientA = createClient(tenantA);
        const clientB = createClient(tenantB);

        // Mock HTTP layer and verify each client uses its own token
        const requestA = captureRequest(clientA);
        const requestB = captureRequest(clientB);
        
        expect(requestA.headers.Authorization).toBe('Bearer TOKEN_A');
        expect(requestB.headers.Authorization).toBe('Bearer TOKEN_B');
    });
    
    it('should create completely independent client instances', () => {
        const tenant: Tenant = { id: 'test', phoneNumberId: '123', accessToken: 'TOKEN' };
        
        const client1 = createClient(tenant);
        const client2 = createClient(tenant);
        
        // Different instances even with same tenant
        expect(client1).not.toBe(client2);
    });
});
```

### Retry State Isolation

```ts
describe('Retry State Isolation', () => {
    it('should not share retry state between instances', async () => {
        const tenantA: Tenant = { id: 'a', phoneNumberId: '111', accessToken: 'TOKEN_A' };
        const tenantB: Tenant = { id: 'b', phoneNumberId: '222', accessToken: 'TOKEN_B' };
        
        const clientA = createClient(tenantA);
        const clientB = createClient(tenantB);

        // Simulate clientA hitting retry limit
        mockHttpClient.mockRejectedValue(new Error('Network error'));
        
        await expect(clientA.messages.sendText({...})).rejects.toThrow();
        
        // Verify clientB is unaffected
        mockHttpClient.mockResolvedValue({ messageId: '123' });
        await expect(clientB.messages.sendText({...})).resolves.toBeDefined();
    });
    
    it('should maintain independent retry counters', async () => {
        const tenant: Tenant = { id: 'test', phoneNumberId: '123', accessToken: 'TOKEN' };
        const client = createClient(tenant);
        
        let attempts = 0;
        mockHttpClient.mockImplementation(() => {
            attempts++;
            if (attempts <= 3) throw new Error('Temporary error');
            return { messageId: '123' };
        });
        
        // Should retry 3 times then succeed
        await client.messages.sendText({...});
        expect(attempts).toBe(4); // 1 initial + 3 retries
    });
});
```

### Rate Limit Isolation

```ts
describe('Rate Limit Isolation', () => {
    it('should maintain independent rate limiters per client', async () => {
        const tenantA: Tenant = { id: 'a', phoneNumberId: '111', accessToken: 'TOKEN_A' };
        const tenantB: Tenant = { id: 'b', phoneNumberId: '222', accessToken: 'TOKEN_B' };
        
        const clientA = createClient(tenantA);
        const clientB = createClient(tenantB);
        
        // Send 80 messages with clientA (hit rate limit)
        const promisesA = Array.from({ length: 80 }, () =>
            clientA.messages.sendText({ to: '123', text: 'test' })
        );
        await Promise.all(promisesA);
        
        // clientB should still have full quota
        const start = Date.now();
        await clientB.messages.sendText({ to: '123', text: 'test' });
        const elapsed = Date.now() - start;
        
        // Should not be delayed (< 100ms)
        expect(elapsed).toBeLessThan(100);
    });
});
```

### Factory Function Validation

```ts
describe('createClient Factory', () => {
    it('should validate tenant configuration', () => {
        expect(() => createClient({} as Tenant)).toThrow('Tenant ID required');
        
        expect(() => createClient({
            id: 'test',
        } as Tenant)).toThrow('Phone Number ID required');
        
        expect(() => createClient({
            id: 'test',
            phoneNumberId: '123',
        } as Tenant)).toThrow('Access Token required');
    });
    
    it('should create client with valid tenant', () => {
        const tenant: Tenant = {
            id: 'test',
            phoneNumberId: '123',
            accessToken: 'TOKEN',
        };
        
        const client = createClient(tenant);
        expect(client).toBeDefined();
        expect(client.messages).toBeDefined();
    });
});
```

---

## Integration Tests

### TenantStore Implementations

```ts
describe('TenantStore Implementations', () => {
    describe('InMemoryTenantStore', () => {
        let store: TenantStore;
        
        beforeEach(() => {
            store = new InMemoryTenantStore();
        });
        
        it('should store and retrieve tenants by ID', async () => {
            const tenant: Tenant = {
                id: 'test-123',
                phoneNumberId: '123456',
                accessToken: 'TOKEN',
            };
            
            await store.set(tenant);
            const retrieved = await store.get('test-123');
            
            expect(retrieved).toEqual(tenant);
        });
        
        it('should retrieve tenants by phone number ID', async () => {
            const tenant: Tenant = {
                id: 'test-123',
                phoneNumberId: '123456',
                accessToken: 'TOKEN',
            };
            
            await store.set(tenant);
            const retrieved = await store.getByPhoneNumberId('123456');
            
            expect(retrieved).toEqual(tenant);
        });
        
        it('should delete tenants', async () => {
            const tenant: Tenant = {
                id: 'test-123',
                phoneNumberId: '123456',
                accessToken: 'TOKEN',
            };
            
            await store.set(tenant);
            await store.delete('test-123');
            
            const retrieved = await store.get('test-123');
            expect(retrieved).toBeNull();
        });
        
        it('should return null for non-existent tenant', async () => {
            const retrieved = await store.get('non-existent');
            expect(retrieved).toBeNull();
        });
    });
});
```

### Webhook Routing

```ts
describe('Webhook Routing', () => {
    let store: TenantStore;
    
    beforeEach(() => {
        store = new InMemoryTenantStore();
    });
    
    it('should route webhook to correct tenant', async () => {
        const tenant: Tenant = {
            id: 'tenant-123',
            phoneNumberId: '123456',
            accessToken: 'TOKEN',
            webhookSecret: 'SECRET',
        };
        
        await store.set(tenant);
        
        const payload = {
            entry: [{
                changes: [{
                    value: {
                        metadata: { phone_number_id: '123456' },
                        messages: [{ from: '123', text: { body: 'Hello' } }],
                    },
                }],
            }],
        };
        
        const rawBody = JSON.stringify(payload);
        const signature = generateSignature(rawBody, 'SECRET');
        
        await expect(routeWebhook(rawBody, signature, store)).resolves.not.toThrow();
    });
    
    it('should handle webhook for unknown phone number', async () => {
        const payload = {
            entry: [{
                changes: [{
                    value: {
                        metadata: { phone_number_id: 'unknown' },
                    },
                }],
            }],
        };
        
        const rawBody = JSON.stringify(payload);
        const signature = 'dummy';
        
        // Should not throw - returns 200 and logs dead letter
        await expect(routeWebhook(rawBody, signature, store)).resolves.not.toThrow();
    });
    
    it('should reject invalid signature', async () => {
        const tenant: Tenant = {
            id: 'tenant-123',
            phoneNumberId: '123456',
            accessToken: 'TOKEN',
            webhookSecret: 'SECRET',
        };
        
        await store.set(tenant);
        
        const payload = {
            entry: [{
                changes: [{
                    value: {
                        metadata: { phone_number_id: '123456' },
                    },
                }],
            }],
        };
        
        const rawBody = JSON.stringify(payload);
        const invalidSignature = 'invalid';
        
        await expect(routeWebhook(rawBody, invalidSignature, store))
            .rejects.toThrow('Invalid signature');
    });
});
```

---

## Performance Tests

### Memory Usage

```ts
describe('Memory Usage', () => {
    it('should handle 1000 client instances efficiently', () => {
        const clients = [];
        const memBefore = process.memoryUsage().heapUsed;
        
        for (let i = 0; i < 1000; i++) {
            const tenant: Tenant = {
                id: `tenant-${i}`,
                phoneNumberId: `phone-${i}`,
                accessToken: `token-${i}`,
            };
            clients.push(createClient(tenant));
        }
        
        const memAfter = process.memoryUsage().heapUsed;
        const memPerClient = (memAfter - memBefore) / 1000;
        
        // Should be < 100KB per client
        expect(memPerClient).toBeLessThan(100 * 1024);
    });
});
```

### Concurrent Operations

```ts
describe('Concurrent Operations', () => {
    it('should handle concurrent requests from multiple tenants', async () => {
        const tenants = Array.from({ length: 10 }, (_, i) => ({
            id: `tenant-${i}`,
            phoneNumberId: `phone-${i}`,
            accessToken: `token-${i}`,
        }));
        
        const clients = tenants.map(createClient);
        
        // Send 10 messages from each client concurrently
        const promises = clients.flatMap(client =>
            Array.from({ length: 10 }, () =>
                client.messages.sendText({ to: '123', text: 'test' })
            )
        );
        
        // All 100 requests should complete
        const results = await Promise.allSettled(promises);
        const successful = results.filter(r => r.status === 'fulfilled');
        
        expect(successful.length).toBeGreaterThan(90); // Allow some failures
    });
});
```

---

## Security Tests

### Token Masking

```ts
describe('Token Masking', () => {
    it('should not expose tokens in error messages', async () => {
        const tenant: Tenant = {
            id: 'test',
            phoneNumberId: '123',
            accessToken: 'EAAxxxxxxxxxxxxxxxxx',
        };
        
        const client = createClient(tenant);
        
        mockHttpClient.mockRejectedValue(new Error('Auth failed'));
        
        try {
            await client.messages.sendText({ to: '123', text: 'test' });
        } catch (error) {
            expect(error.message).not.toContain('EAAxxxxxxxxxxxxxxxxx');
            expect(error.message).not.toContain(tenant.accessToken);
        }
    });
});
```

---

## Test Coverage Requirements

- **Unit Tests:** > 90% code coverage
- **Integration Tests:** All core flows covered
- **Performance Tests:** Memory and concurrency benchmarks
- **Security Tests:** Token isolation and masking verified

---

# 11. Acceptance Criteria

Multi-tenancy support is considered complete when:

- ✅ `Tenant` interface is exported with all required fields (id, phoneNumberId, accessToken, webhookSecret?)
- ✅ `TenantStore` interface is exported with all required methods (get, getByPhoneNumberId, set, delete)
- ✅ `createClient(tenant)` factory function is exported and functional
- ✅ Multiple client instances can coexist in the same process without interference
- ✅ Each instance maintains completely isolated configuration
- ✅ No shared static state exists in the SDK codebase
- ✅ Rate limiting is per-instance (independent token buckets)
- ✅ Retry state is per-instance (independent retry counters)
- ✅ HTTP clients are per-instance (no shared connections)
- ✅ `verifySignature()` utility function is exported
- ✅ `routeWebhook()` utility function is exported and resolves tenants via TenantStore
- ✅ Webhook routing extracts phone_number_id from payload correctly
- ✅ Dead letter handling works (unknown phone numbers logged, 200 OK returned)
- ✅ Errors in one instance do not affect others
- ✅ Memory overhead is acceptable (benchmark: 1000 instances < 100 MB)
- ✅ Documentation includes:
  - Single-tenant quick start
  - Multi-tenant architecture guide
  - TenantStore implementation examples (In-Memory, Redis, Database)
  - Webhook routing guide
  - Security best practices
  - Performance considerations
- ✅ Test suite verifies:
  - Token isolation
  - Retry state isolation
  - Rate limit isolation
  - Webhook routing
  - Dead letter handling
  - Memory benchmarks
- ✅ API reference documents all interfaces and functions
- ✅ Package name is `wasync`

---

## Verification Checklist

### Code Requirements

```ts
// ✅ Interfaces exported
import { Tenant, TenantStore } from 'wasync';

// ✅ Factory function exported
import { createClient } from 'wasync';

// ✅ Webhook utilities exported
import { verifySignature, routeWebhook } from 'wasync';

// ✅ Client creation works
const tenant: Tenant = {
  id: 'test',
  phoneNumberId: '123',
  accessToken: 'TOKEN',
};
const client = createClient(tenant);

// ✅ Multiple instances work
const clientA = createClient(tenantA);
const clientB = createClient(tenantB);

// ✅ Webhook routing works
await routeWebhook(rawBody, signature, store);
```

### Documentation Requirements

- [ ] README.md includes factory pattern example
- [ ] Getting Started guide shows single-tenant usage
- [ ] Advanced guide covers multi-tenant architecture
- [ ] TenantStore implementations documented with examples
- [ ] Webhook routing fully documented
- [ ] API reference complete for all exports
- [ ] Security best practices documented

### Testing Requirements

- [ ] Unit tests for token isolation (passing)
- [ ] Unit tests for retry state isolation (passing)
- [ ] Unit tests for rate limit isolation (passing)
- [ ] Integration tests for TenantStore implementations (passing)
- [ ] Integration tests for webhook routing (passing)
- [ ] Performance tests for 1000 instances (passing, < 100 MB)
- [ ] Security tests for token masking (passing)
- [ ] Test coverage > 90%

### Quality Gates

- [ ] No `any` types in public API
- [ ] No shared static state in codebase
- [ ] All public exports have JSDoc comments
- [ ] TypeScript strict mode enabled
- [ ] Linter passing (no warnings)
- [ ] Build passing
- [ ] All tests passing

---

# 12. Non-Goals

This design explicitly **does not** include:

- ❌ Built-in tenant registry or manager (use `TenantStore` interface instead)
- ❌ Tenant authentication/authorization (application responsibility)
- ❌ Tenant data storage implementation (SDK provides interface only)
- ❌ Tenant billing/metering (application responsibility)
- ❌ Admin APIs for tenant management (application responsibility)
- ❌ Shared connection pooling across tenants (each client has own HTTP client)
- ❌ Tenant lifecycle hooks (implement in your TenantStore)
- ❌ Built-in tenant caching (implement in your service layer)
- ❌ Tenant migration utilities (application responsibility)
- ❌ Multi-region tenant routing (application responsibility)
- ❌ Tenant usage analytics (application responsibility)
- ❌ Automatic token refresh (application responsibility)

These concerns belong to the application layer, not the SDK.

The SDK provides:
- ✅ `Tenant` interface (structure)
- ✅ `TenantStore` interface (storage contract)
- ✅ `createClient()` factory (instance creation)
- ✅ Webhook routing utilities (tenant resolution)
- ✅ Complete instance isolation (security guarantee)

Everything else is application-specific.

---

# 13. Design Trade-Offs

## Factory Pattern vs Constructor Pattern

**Decision:** Use factory function `createClient(tenant)` instead of constructor `new WhatsAppClient(config)`.

**Trade-off:**
- **Pro:** Explicit tenant structure via `Tenant` interface
- **Pro:** Standard pattern for multi-tenant SDKs
- **Pro:** Easier to add validation logic in factory
- **Pro:** Future-proof for dependency injection
- **Con:** Slightly more verbose than direct constructor
- **Con:** Breaking change from typical SDK patterns

**Verdict:** Benefits outweigh costs. Clear interfaces improve developer experience.

---

## Interface Definition vs Complete Freedom

**Decision:** Define `Tenant` and `TenantStore` interfaces instead of leaving structure completely open.

**Trade-off:**
- **Pro:** Establishes conventions across ecosystem
- **Pro:** Makes documentation easier
- **Pro:** Enables webhook routing pattern
- **Pro:** Guides developers toward best practices
- **Con:** Some flexibility lost
- **Con:** Developers must follow interface contract

**Verdict:** Correct tradeoff. Conventions improve ecosystem consistency without being overly restrictive.

---

## Memory Overhead

Each client instance creates its own HTTP client, configuration object, and internal state.

**Estimated overhead per instance:** ~50-100 KB

**Impact:** For 1000 tenants = ~50-100 MB

**Trade-off:**
- **Pro:** Complete isolation guaranteed
- **Pro:** No shared state bugs possible
- **Pro:** Independent lifecycle per tenant
- **Con:** Higher memory usage than shared HTTP client
- **Con:** More GC pressure with many tenants

**Verdict:** Acceptable tradeoff. Modern servers have plenty of RAM, and isolation is worth the cost.

**Mitigation:** Applications can implement LRU caching to evict inactive clients.

---

## Developer Responsibility

Multi-tenant apps must implement `TenantStore` themselves.

**Trade-off:**
- **Pro:** SDK stays simple and focused
- **Pro:** Developers control storage architecture
- **Pro:** No forced storage dependencies
- **Pro:** Easier to maintain SDK
- **Con:** More work for developers
- **Con:** No out-of-box solution

**Verdict:** Correct tradeoff. SDK defines interface, developers implement storage. This is standard practice for database-agnostic SDKs.

**Mitigation:** Provide comprehensive examples (In-Memory, Redis, Postgres) in documentation.

---

## Webhook Routing in Core

**Decision:** Include `routeWebhook()` utility in core SDK.

**Trade-off:**
- **Pro:** Standard pattern for webhook handling
- **Pro:** Reduces duplication across apps
- **Pro:** Demonstrates correct usage of TenantStore
- **Con:** Adds complexity to core
- **Con:** May not fit all frameworks

**Verdict:** Beneficial addition. Webhook routing is common enough to warrant core support, and the function is small and framework-agnostic.

---

## No Built-In Caching

**Decision:** No built-in client instance caching or pooling.

**Trade-off:**
- **Pro:** SDK stays simple
- **Pro:** Applications choose caching strategy
- **Pro:** Avoids memory management complexity
- **Con:** Developers must implement caching
- **Con:** Potential for inefficient repeated client creation

**Verdict:** Correct tradeoff. Caching policies are application-specific (LRU size, TTL, eviction strategy). Documentation shows patterns.

---

## Per-Tenant Rate Limiting

**Decision:** Each client has independent rate limiter (token bucket).

**Trade-off:**
- **Pro:** Tenants can't affect each other
- **Pro:** Fair quota distribution
- **Pro:** Simpler to reason about
- **Con:** Can't share unused quota across tenants
- **Con:** Slightly higher memory per client

**Verdict:** Correct tradeoff. Isolation is more important than quota optimization. Meta enforces limits per phone number anyway.

---

## Explicit Tenant ID Field

**Decision:** `Tenant` interface requires `id` field separate from `phoneNumberId`.

**Trade-off:**
- **Pro:** Applications can use their own tenant identifiers
- **Pro:** Decouples business logic from WhatsApp IDs
- **Pro:** Supports one tenant having multiple phone numbers (future)
- **Con:** Redundant field for simple use cases
- **Con:** Must maintain index: phoneNumberId → tenantId

**Verdict:** Correct tradeoff. `phoneNumberId` is a Meta concept; `id` is the application's tenant identifier. Separation is cleaner.

---

## Summary

All trade-offs prioritize:
1. **Security:** Isolation over optimization
2. **Simplicity:** Interfaces over implementations
3. **Flexibility:** Developer control over opinionated defaults
4. **Clarity:** Explicit over implicit

These align with the SDK's core principles.

---

# 14. Chapter Summary

Multi-tenancy is a **core architectural requirement**, not a feature.

The SDK achieves multi-tenancy through a **factory pattern with explicit tenant interfaces** rather than built-in tenant management.

## Core Components

**Interfaces:**
- `Tenant` - Structure for tenant configuration (id, phoneNumberId, accessToken, webhookSecret)
- `TenantStore` - Contract for tenant storage (get, getByPhoneNumberId, set, delete)

**Factory Function:**
- `createClient(tenant)` - Creates isolated WhatsApp client instance

**Utilities:**
- `verifySignature()` - Webhook signature verification
- `routeWebhook()` - Automatic tenant resolution from webhooks

## Key Principles

This approach:
- **Maintains SDK simplicity:** Interfaces only, no implementations
- **Guarantees security by design:** Complete isolation via factory pattern
- **Supports both single-tenant and multi-tenant:** Same pattern for both
- **Preserves framework agnosticism:** Works everywhere
- **Follows single responsibility:** SDK defines structure, apps provide storage
- **Enables webhook routing:** Built-in tenant resolution pattern
- **Establishes conventions:** Standard interfaces guide ecosystem

## Technical Guarantees

- ✅ No shared state between tenants
- ✅ Independent rate limiting per tenant (80 msg/min each)
- ✅ Independent retry logic per tenant (exponential backoff)
- ✅ Complete token isolation
- ✅ Webhook routing via phone number resolution
- ✅ Dead letter handling for unknown tenants
- ✅ Per-instance HTTP clients
- ✅ Memory efficient (~50-100 KB per tenant)

---

# Decision Summary

**Adopted Approach:** Factory pattern with `Tenant` and `TenantStore` interfaces.

**Rationale:** 
- Security through explicit tenant context
- Clarity through interface definitions
- Flexibility through storage abstraction
- Webhook support through standardized routing
- Alignment with SDK principles (simplicity, single responsibility)

**Package Name:** `wasync`

**Core Exports:**
```ts
// Interfaces
export interface Tenant { ... }
export interface TenantStore { ... }

// Factory
export function createClient(tenant: Tenant): WhatsAppClient

// Utilities
export function verifySignature(rawBody, signature, secret): boolean
export function routeWebhook(rawBody, signature, store): Promise<void>
```

**Impact:** 
- Multi-tenant applications implement `TenantStore` interface for their chosen storage (Map, Redis, Database, Vault)
- Single-tenant applications use factory pattern directly with one tenant
- Webhook routing uses `TenantStore.getByPhoneNumberId()` to resolve tenants
- SDK remains simple and focused on WhatsApp API
- Complete isolation guaranteed by factory pattern and instance-scoped state

**Developer Responsibility:**
- Implement `TenantStore` interface
- Manage tenant lifecycle (create, update, delete)
- Choose storage solution (provided by examples in documentation)
- Implement client caching strategy (optional, guided by examples)

---

# Related Documents

- Part 01 — Client & Configuration
- Chapter 12 — Non-Functional Requirements
- Phase 0 — Architecture Design (ADR-008)
- Advanced Guide: Multi-Tenant Patterns (Future)
