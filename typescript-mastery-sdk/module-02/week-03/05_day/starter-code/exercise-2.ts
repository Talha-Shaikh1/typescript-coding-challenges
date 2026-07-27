/**
 * Day 19 - Exercise 2: Type Modifiers (Adding and Removing)
 *
 * Task: Build utilities that add or remove type modifiers
 *
 * Requirements:
 * 1. Create Mutable<T> - Remove readonly from all properties
 * 2. Create Concrete<T> - Remove optional from all properties
 * 3. Create DeepReadonly<T> - Make all properties readonly recursively
 * 4. Create DeepPartial<T> - Make all properties optional recursively
 */

// TODO: Create Mutable utility type
// Remove readonly modifier (-readonly)
type Mutable<T> = // Your implementation here


// TODO: Create Concrete utility type
// Remove optional modifier (-?)
type Concrete<T> = // Your implementation here


// TODO: Create DeepReadonly utility type
// Make all properties readonly recursively (including nested)
type DeepReadonly<T> = // Your implementation here
  // Hint: Use conditional types to check if property is object
  // Recursively apply DeepReadonly to nested objects


// TODO: Create DeepPartial utility type
// Make all properties optional recursively (including nested)
type DeepPartial<T> = // Your implementation here
  // Hint: Similar to DeepReadonly but with optional modifier


// TODO: Create test interfaces with nested structures
interface Config {
  readonly apiKey: string;
  timeout?: number;
  nested: {
    readonly value: string;
    count?: number;
  };
}

interface NestedData {
  user: {
    profile: {
      name: string;
      age: number;
    };
    settings: {
      theme: string;
      notifications: boolean;
    };
  };
  timestamp: Date;
}


// TODO: Test your implementations

// Test Mutable - should remove all readonly
type MutableConfig = // Use Mutable<Config>

// Test Concrete - should remove all optional
type ConcreteConfig = // Use Concrete<Config>

// Test DeepReadonly - should make everything readonly
type ImmutableData = // Use DeepReadonly<NestedData>

// Test DeepPartial - should make everything optional
type PartialData = // Use DeepPartial<NestedData>


// TODO: Verify behavior with test objects
/*
const mutableConfig: MutableConfig = {
  apiKey: 'key',
  timeout: 5000,
  nested: { value: 'val', count: 1 }
};
// Should allow mutation:
mutableConfig.apiKey = 'new-key'; // OK

const concreteConfig: ConcreteConfig = {
  apiKey: 'key',
  timeout: 5000, // Now required
  nested: { value: 'val', count: 1 } // count now required
};

const immutableData: ImmutableData = {
  user: {
    profile: { name: 'John', age: 30 },
    settings: { theme: 'dark', notifications: true }
  },
  timestamp: new Date()
};
// Should prevent mutations at all levels:
// immutableData.user.profile.name = 'Jane'; // Error

const partialData: PartialData = {
  user: {
    profile: {
      name: 'John'
      // age optional
    }
    // settings optional
  }
  // timestamp optional
};
*/


// TODO: Bonus - Create DeepRequired utility type
// Make all properties required recursively
type DeepRequired<T> = // Your implementation here
