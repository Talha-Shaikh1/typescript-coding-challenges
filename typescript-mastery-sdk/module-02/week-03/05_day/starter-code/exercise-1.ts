/**
 * Day 19 - Exercise 1: Basic Custom Utilities (Mapped Types)
 *
 * Task: Build fundamental custom utility types using mapped types
 *
 * Requirements:
 * 1. Create Nullable<T> - Make all properties nullable
 * 2. Create Optional<T> - Make all properties optional
 * 3. Create Immutable<T> - Make all properties readonly
 * 4. Create Stringify<T> - Convert all types to string
 * 5. Create Booleanify<T> - Convert all types to boolean
 */

// TODO: Create Nullable utility type
// Make all properties T | null
type Nullable<T> = // Your implementation here


// TODO: Create Optional utility type
// Make all properties optional (same as Partial)
type Optional<T> = // Your implementation here


// TODO: Create Immutable utility type
// Make all properties readonly
type Immutable<T> = // Your implementation here


// TODO: Create Stringify utility type
// Convert all property types to string
type Stringify<T> = // Your implementation here


// TODO: Create Booleanify utility type
// Convert all property types to boolean
type Booleanify<T> = // Your implementation here


// TODO: Create test interface
interface User {
  // Add at least 5 properties with different types
}


// TODO: Test your implementations
// Apply each utility type to User interface

type NullableUser = // Use Nullable<User>
type OptionalUser = // Use Optional<User>
type ImmutableUser = // Use Immutable<User>
type StringUser = // Use Stringify<User>
type BooleanUser = // Use Booleanify<User>


// TODO: Create test functions/objects to verify behavior
/*
const nullUser: NullableUser = {
  // All fields can be null
};

const partialUser: OptionalUser = {
  // Only some fields
};

const immutableUser: ImmutableUser = {
  // Set values
};
// immutableUser.id = 'new'; // Should error

const stringUser: StringUser = {
  // All values are strings
};

const boolUser: BooleanUser = {
  // All values are booleans
};
*/
