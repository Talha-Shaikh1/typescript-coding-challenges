// Practice 1 — Basic object alias
// type Tenant banao jisme wabaId: string, businessName: string, isVerified: boolean ho. Do tenant objects banao isi type ke.

type Tenant = {
    wabaId: string
    businessName: string
    isVerified: boolean
}

let tenant1 = {wabaId: '0001', businessName: 'Business 1', isVerified:true}

let tenant2 = {wabaId: '0002', businessName: 'Business 2', isVerified:false}

console.log(tenant1, tenant2);


// Practice 2 — Union alias
// type WebhookEventType = "message" | "status" | "error" banao. Function logEvent(type: WebhookEventType) likho jo har type ke liye alag console message print kare.

type WebhookEventType = "message"|"status" | "error"

function logEvent(event:WebhookEventType){
    if (event === "error") {
        console.log("Error Event triggered");
        
    } else if(event === "message"){
        console.log("message event triggerd")
    } else{
        console.log("status event triggered")
    }
}


// Practice 3 — Function type alias
// type Validator = (input: string) => boolean banao. Do functions banao is type ke: isValidPhone aur isValidEmail (apni marzi ki simple logic use karo, jaise .includes('@') email ke liye).

type Validator = (input: string) => boolean

const isValidPhone:Validator = function(phone){
    if (phone.includes("+")) {
        return true
    }

    return false
}

const isValidEmail: Validator = function(email){
    if (email.includes("@")) {
        return true
    }

    return false
}


// Practice 4 — Nested types (Bonus)
// type Tenant (Practice 1 wala) ko use karke type TenantListResponse banao jisme:

// success: boolean
// tenants?: Tenant[] (optional array of tenants)
// error?: string
// Phir ek success response aur ek error response object banao.

type TenantListResponse = {
    success: boolean
    tenants?: Tenant[]
    error?: string
}

let successResponse: TenantListResponse = {
    success: true,
    tenants: [{wabaId: '0001', businessName: 'Business 1', isVerified:true}]
}

let errorResponse: TenantListResponse = {
    success: false,
    error: "Invalid Credentials"
}


// Practice 5 — SDK layering (Mushkil)
// Apne BotAura SDK ke liye socho aur banao:

// type WABAId = string aur type AccessToken = string (primitive aliases)
// type TenantConfig jo dono ko use kare + ek optional webhookUrl?: string
// type SDKInstance jisme tenants: TenantConfig[] aur ek function type getTenant: (id: WABAId) => TenantConfig | undefined

type WABAId = string
type AccessToken = string
type TenantConfig = {
    wabaId: WABAId
    accessToken: AccessToken
    webhookUrl?: string
}

type SDKInstance = {
    tenants: TenantConfig[]
    getTenant: (id: WABAId) => TenantConfig | undefined
}