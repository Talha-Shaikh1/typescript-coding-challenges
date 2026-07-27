/**
 * Day 19 - Exercise 4: Key Transformation Utilities
 *
 * Task: Build utilities that transform property keys (rename, prefix, suffix)
 *
 * Requirements:
 * 1. Create Prefixed<T, P> - Add prefix to all keys
 * 2. Create Suffixed<T, S> - Add suffix to all keys
 * 3. Create Getters<T> - Convert properties to getter functions
 * 4. Create Setters<T> - Convert properties to setter functions
 * 5. Create GettersAndSetters<T> - Create both getters and setters
 */

// TODO: Create Prefixed utility type
// Add prefix to all property names
// Hint: Use template literal types: `${Prefix}${Capitalize<string & P>}`
type Prefixed<T, Prefix extends string> = // Your implementation here


// TODO: Create Suffixed utility type
// Add suffix to all property names
// Hint: Use template literal types: `${string & P}${Capitalize<Suffix>}`
type Suffixed<T, Suffix extends string> = // Your implementation here


// TODO: Create Getters utility type
// Convert properties to getter functions: getName() => string
// Hint: `get${Capitalize<string & P>}`: () => T[P]
type Getters<T> = // Your implementation here


// TODO: Create Setters utility type
// Convert properties to setter functions: setName(value: string) => void
// Hint: `set${Capitalize<string & P>}`: (value: T[P]) => void
type Setters<T> = // Your implementation here


// TODO: Create GettersAndSetters utility type
// Combine both getters and setters
// Hint: Intersection of Getters<T> & Setters<T>
type GettersAndSetters<T> = // Your implementation here


// TODO: Create test interface
interface State {
  count: number;
  name: string;
  active: boolean;
}


// TODO: Test your implementations

// Should add prefix to all keys
type PrefixedState = // Use Prefixed<State, 'state'>
// Result: { stateCount: number; stateName: string; stateActive: boolean; }

// Should add suffix to all keys
type SuffixedState = // Use Suffixed<State, 'value'>
// Result: { countValue: number; nameValue: string; activeValue: boolean; }

// Should create getter functions
type StateGetters = // Use Getters<State>
// Result: { getCount: () => number; getName: () => string; getActive: () => boolean; }

// Should create setter functions
type StateSetters = // Use Setters<State>
// Result: { setCount: (value: number) => void; setName: (value: string) => void; ... }

// Should create both getters and setters
type StateAccessors = // Use GettersAndSetters<State>


// TODO: Implement a class using your types
/*
class StateManager implements StateAccessors {
  private state: State = {
    count: 0,
    name: 'App',
    active: true
  };

  getCount = (): number => this.state.count;
  setCount = (value: number): void => {
    this.state.count = value;
  };

  getName = (): string => this.state.name;
  setName = (value: string): void => {
    this.state.name = value;
  };

  getActive = (): boolean => this.state.active;
  setActive = (value: boolean): void => {
    this.state.active = value;
  };
}

const manager = new StateManager();
console.log('Count:', manager.getCount());
manager.setCount(42);
console.log('Updated count:', manager.getCount());
*/


// TODO: Bonus - Create CamelCase utility
// Convert kebab-case or snake_case to camelCase
type CamelCase<S extends string> = // Your implementation here
  // Hint: Use template literals and conditional types


// TODO: Bonus - Create PascalCase utility
// Convert any case to PascalCase (first letter capitalized)
type PascalCase<S extends string> = // Your implementation here


// TODO: Bonus - Create Events utility
// Convert property names to event handler names
// Example: count -> onCountChange
type Events<T> = // Your implementation here
  // Hint: `on${Capitalize<string & P>}Change`: (value: T[P]) => void
