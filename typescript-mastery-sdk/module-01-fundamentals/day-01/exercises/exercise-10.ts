// Exercise 10: Access Control (Challenging!)

console.log("=== Access Control System ===\n");

// TODO: Create user data
// - userAge = 25
// - isLoggedIn = true
// - hasSubscription = true
// - emailVerified = false
let userAge: number = 25;
let isLoggedIn: boolean = true;
let hasSubscription: boolean = true;
let emailVerified: boolean = false
// TODO: Create checks
// - isAdult = age >= 18
// - canPost = isLoggedIn AND emailVerified
// - canAccessPremium = isLoggedIn AND hasSubscription
// - hasFullAccess = ALL four conditions true
let isAdult: boolean = userAge >= 18;
let canPost: boolean = isLoggedIn && emailVerified;
let canAccessPremium: boolean = isLoggedIn && hasSubscription;
let hasFullAccess: boolean = isAdult && canPost && hasSubscription
// TODO: Print all checks with explanations
// Example: "Can post: false ❌ (email not verified)"




console.log("\n✅ Exercise 10 complete!");

// Hints:
// - Use && for AND logic
// - Use comparison operators >=
// - Be clear about why something is false
