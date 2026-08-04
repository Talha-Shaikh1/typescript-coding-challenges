// Exercise 1: Basic Interfaces

// TODO 1: Create interface User
// Properties:
// - name: string
// - email: string
// - phone: string
// - isVerified: boolean

interface User {
    name: string
    email: string
    phone: string
    isVerified: boolean
}

// TODO 2: Create interface ClientConfig
// Properties:
// - accessToken: string (required)
// - phoneNumberId: string (required)
// - apiVersion?: string (optional)
// - timeout?: number (optional)

interface ClientConfig {
    accessToken: string
    phoneNumberId: string
    apiVersion?: string
    timeout?: number
}

// TODO 3: Create user objects
const user1: User = {
    name: "Talha",
    email: "talha@gmail.com",
    phone: "03121964939",
    isVerified: true
};

const user2: User = {
    name: "Shaikh",
    email: "shaikh@gmail.com",
    phone: '03399336639',
    isVerified: false
};

// TODO 4: Create config object
const config: ClientConfig = {
    accessToken: 'token_123',
    phoneNumberId: 'phone_123'
};

// TODO: Test your interfaces
console.log("User 1:", user1);
console.log("User 2:", user2);
console.log("Config:", config);
