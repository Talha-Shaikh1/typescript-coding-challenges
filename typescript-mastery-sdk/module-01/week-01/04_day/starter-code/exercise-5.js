"use strict";
// Exercise 5: Complete SDK Config
// TODO 4: Create getDefaultConfig function
function getDefaultConfig(apiKey, phoneNumberId) {
    return {
        apiKey,
        phoneNumberId,
        apiVersion: "v1.0",
        timeout: 30000
    };
}
// TODO 5: Create validateConfig function
// Check if apiKey and phoneNumberId exist and are not empty
function validateConfig(config) {
    let isApiKey = config.apiKey.trim() !== "";
    let isPhoneNumberId = config.phoneNumberId.trim() !== "";
    return isApiKey && isPhoneNumberId;
}
// TODO: Test your code
const config = getDefaultConfig("key123", "phone123");
console.log("Default config:", config);
console.log("Valid:", validateConfig(config));
const invalidConfig = {
    apiKey: "",
    phoneNumberId: "phone123"
};
console.log("Invalid config valid:", validateConfig(invalidConfig)); // false
