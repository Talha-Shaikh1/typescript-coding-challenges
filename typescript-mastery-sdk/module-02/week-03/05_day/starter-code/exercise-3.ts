/**
 * Day 19 - Exercise 3: Property Filtering and Transformation
 *
 * Task: Build utilities that filter and transform properties based on their types
 *
 * Requirements:
 * 1. Create PickByType<T, U> - Keep only properties of type U
 * 2. Create OmitByType<T, U> - Remove properties of type U
 * 3. Create FunctionProperties<T> - Keep only function properties
 * 4. Create NonFunctionProperties<T> - Keep only non-function properties
 * 5. Create NullableProperties<T> - Keep only nullable properties
 */

// TODO: Create PickByType utility type
// Keep only properties where T[P] extends U
// Use: [P in keyof T as Condition ? P : never]
type PickByType<T, U> = // Your implementation here


// TODO: Create OmitByType utility type
// Remove properties where T[P] extends U
// Opposite of PickByType
type OmitByType<T, U> = // Your implementation here


// TODO: Create FunctionProperties utility type
// Keep only properties that are functions
// Hint: T[P] extends Function
type FunctionProperties<T> = // Your implementation here


// TODO: Create NonFunctionProperties utility type
// Keep only properties that are NOT functions
type NonFunctionProperties<T> = // Your implementation here


// TODO: Create NullableProperties utility type
// Keep only properties that can be null or undefined
// Hint: null extends T[P] or undefined extends T[P]
type NullableProperties<T> = // Your implementation here


// TODO: Create test interface with mixed types
interface Mixed {
  id: string;
  name: string;
  age: number;
  count: number;
  active: boolean;
  save: () => void;
  load: () => boolean;
  data: string | null;
  optional?: number;
}


// TODO: Test your implementations

// Should keep only string properties
type StringProps = // Use PickByType<Mixed, string>

// Should keep only number properties
type NumberProps = // Use PickByType<Mixed, number>

// Should remove all string properties
type NonStringProps = // Use OmitByType<Mixed, string>

// Should keep only functions
type Functions = // Use FunctionProperties<Mixed>

// Should keep only non-functions
type NonFunctions = // Use NonFunctionProperties<Mixed>

// Should keep only nullable/optional properties
type NullableProps = // Use NullableProperties<Mixed>


// TODO: Verify with test objects
/*
const strings: StringProps = {
  id: '1',
  name: 'John'
};

const numbers: NumberProps = {
  age: 30,
  count: 5
};

const functions: Functions = {
  save: () => {},
  load: () => true
};

const nonFunctions: NonFunctions = {
  id: '1',
  name: 'John',
  age: 30,
  count: 5,
  active: true,
  data: null,
  optional: 10
};

const nullable: NullableProps = {
  data: null,
  optional: undefined
};
*/


// TODO: Bonus - Create PickByValueType utility
// More strict version that checks exact type match
type PickByValueType<T, U> = // Your implementation here
  // Should match exact type, not just extends


// TODO: Bonus - Create RequiredProperties utility
// Keep only required (non-optional) properties
type RequiredProperties<T> = // Your implementation here
  // Hint: Check if property is optional
