// Exercise 4: Methods in Interfaces

// TODO 1: Create interface PhoneValidator
// Methods:
// - isValid(phone: string): boolean
// - format(phone: string): string
// - getCountryCode(phone: string): string

interface PhoneValidator {
    isValid(phone: string): boolean
    format(phone: string): string
    getCountryCode(phone: string): string
}

// TODO 2: Implement the interface
const validator: PhoneValidator = {
  isValid: (phone) => {
    return phone.startsWith("+") && phone.length >= 10
  },

  format: (phone) => {
    if(!phone.startsWith("+92")){
       return phone = "+92" + phone
    }
    return phone
  },

  getCountryCode: (phone) => {
    return phone.slice(1, 3)
  }
};

// TODO: Test your validator
console.log("Is valid:", validator.isValid("+923001234567"));
console.log("Formatted:", validator.format("3001234567"));
console.log("Country code:", validator.getCountryCode("+923001234567"));
