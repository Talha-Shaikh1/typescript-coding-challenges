# Plan: Update Architecture for Multi-Tenant SDK

## Goal
Update existing architecture documentation to incorporate factory-pattern multi-tenant design while keeping the broader MVP scope unchanged.

## Context
- Existing docs use instance isolation approach: `new WhatsAppClient(config)`
- New approach uses factory pattern: `createClient(tenant: Tenant)`
- Keep existing MVP scope (text, media, templates, webhooks, etc.)
- Change package name to `wasync`

## Changes Required

### 1. Update Phase 0 - Part 2: Architecture Design
**File:** `phase0/02_Phase0-Part2-Architecture-Design.md`

**Updates:**
- Section 2.4.1 (WhatsAppClient): Update to reflect factory pattern
- Add new section 2.4.9: Tenant Management
- Update ADR-008: Change from instance isolation to factory pattern with TenantStore
- Add package name as `wasync` instead of `@whatsapp-sdk/core`
- Update webhook architecture to include tenant resolution

**Specific Changes:**
- Replace `new WhatsAppClient({...})` examples with `createClient(tenant)`
- Add `Tenant` interface documentation
- Add `TenantStore` interface documentation
- Document per-tenant rate limiting architecture
- Document webhook routing via tenant store

### 2. Update PRD Part 6: Multi-Tenancy Support
**File:** `project-prd/11_Functional-Requirements_Part-06-Multi-Tenancy-Support.md`

**Updates:**
- Replace "Option A" with factory pattern approach
- Add Tenant interface specification
- Add TenantStore interface specification
- Update code examples to use `createClient(tenant)`
- Add webhook routing documentation
- Document per-tenant rate limiting

### 3. Update PROJECT_SUMMARY.md
**File:** `PROJECT_SUMMARY.md`

**Updates:**
- Update package name from `@whatsapp-sdk/core` to `wasync`
- Add multi-tenant factory pattern to architecture summary
- Update code examples

### 4. Files to Create/Update

#### Architecture Updates:
- [x] Plan file (this document)
- [ ] phase0/02_Phase0-Part2-Architecture-Design.md
- [ ] project-prd/11_Functional-Requirements_Part-06-Multi-Tenancy-Support.md  
- [ ] PROJECT_SUMMARY.md

## Implementation Details

### Tenant Interface
```typescript
interface Tenant {
  id: string;                    // Unique tenant identifier
  phoneNumberId: string;         // WhatsApp Business phone number ID
  accessToken: string;           // Meta access token
  webhookSecret?: string;        // Webhook verification secret
}
```

### TenantStore Interface
```typescript
interface TenantStore {
  get(tenantId: string): Promise<Tenant | null>;
  getByPhoneNumberId(phoneNumberId: string): Promise<Tenant | null>;
  set(tenant: Tenant): Promise<void>;
  delete(tenantId: string): Promise<void>;
}
```

### Factory Pattern
```typescript
// Old approach (remove)
const client = new WhatsAppClient({ accessToken, phoneNumberId });

// New approach (add)
const client = createClient(tenant);
```

### Webhook Routing
```typescript
async function routeWebhook(
  rawBody: string,
  signature: string,
  store: TenantStore
): Promise<void> {
  // 1. Extract phone_number_id from payload
  // 2. Resolve tenant from store
  // 3. Verify signature with tenant's webhookSecret
  // 4. Route to tenant-specific handler
}
```

### Per-Tenant Rate Limiting
- Each client instance maintains its own token bucket
- Default: 80 messages/minute per phone number
- NOT shared across tenants

### Per-Tenant Retry Logic
- Exponential backoff per client instance
- Retry state NOT shared across tenants

## MVP Scope (Keep Unchanged)
✅ Text messages
✅ Image, video, audio, document messages
✅ Templates
✅ Media upload/download/delete
✅ Webhooks (signature verification, parsing)
✅ Mark as read
✅ Phone number utilities

## What NOT to Change
- Do not reduce MVP scope
- Do not remove existing features from documentation
- Keep all existing PRD sections intact

## Success Criteria
- [ ] Architecture reflects factory pattern approach
- [ ] Tenant and TenantStore interfaces documented
- [ ] Webhook routing architecture documented
- [ ] Per-tenant rate limiting documented
- [ ] Per-tenant retry logic documented
- [ ] Package name updated to `wasync`
- [ ] Code examples updated throughout
- [ ] ADR-008 reflects new approach
- [ ] Multi-tenancy PRD updated
- [ ] Existing MVP scope unchanged
