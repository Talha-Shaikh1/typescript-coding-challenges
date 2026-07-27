/**
 * Day 19 - Example 2: Type Modifiers
 *
 * Demonstrates how to add and remove type modifiers
 * Using +?, -?, +readonly, -readonly
 */

// ============================================
// Example 1: Adding Optional Modifier (+?)
// ============================================

interface User {
  id: string;
  name: string;
  email: string;
}

// Add optional to all properties (same as Partial)
type AddOptional<T> = {
  [P in keyof T]+?: T[P];
  //             ^ plus adds optional (can omit +, it's default)
};

type OptionalUser = AddOptional<User>;
// Result:
// {
//   id?: string;
//   name?: string;
//   email?: string;
// }

const partialUser: OptionalUser = {
  id: '1'
  // name and email are optional
};

console.log('Partial user:', partialUser);
console.log('✅ Example 1: Adding Optional completed\n');


// ============================================
// Example 2: Removing Optional Modifier (-?)
// ============================================

interface PartialConfig {
  apiKey?: string;
  timeout?: number;
  debug?: boolean;
}

// Remove optional from all properties (same as Required)
type RemoveOptional<T> = {
  [P in keyof T]-?: T[P];
  //             ^ minus removes optional
};

type RequiredConfig = RemoveOptional<PartialConfig>;
// Result:
// {
//   apiKey: string;
//   timeout: number;
//   debug: boolean;
// }

const config: RequiredConfig = {
  apiKey: 'key_xxx',
  timeout: 5000,
  debug: false
  // All fields required
};

console.log('Required config:', config);
console.log('✅ Example 2: Removing Optional completed\n');


// ============================================
// Example 3: Adding Readonly Modifier
// ============================================

interface MutableState {
  count: number;
  name: string;
  active: boolean;
}

// Add readonly to all properties
type AddReadonly<T> = {
  +readonly [P in keyof T]: T[P];
  //^ plus adds readonly (can omit +, it's default)
};

type ImmutableState = AddReadonly<MutableState>;
// Result:
// {
//   readonly count: number;
//   readonly name: string;
//   readonly active: boolean;
// }

const state: ImmutableState = {
  count: 0,
  name: 'App',
  active: true
};

// state.count = 1; // ❌ Error: readonly
console.log('Immutable state:', state);
console.log('✅ Example 3: Adding Readonly completed\n');


// ============================================
// Example 4: Removing Readonly Modifier
// ============================================

interface ReadonlyUser {
  readonly id: string;
  readonly name: string;
  readonly createdAt: Date;
}

// Remove readonly from all properties
type RemoveReadonly<T> = {
  -readonly [P in keyof T]: T[P];
  //^ minus removes readonly
};

type MutableUser = RemoveReadonly<ReadonlyUser>;
// Result:
// {
//   id: string;
//   name: string;
//   createdAt: Date;
// }

const user: MutableUser = {
  id: '1',
  name: 'John',
  createdAt: new Date()
};

// Now can mutate
user.name = 'Jane'; // ✅ OK
user.id = '2'; // ✅ OK
console.log('Mutable user:', user);
console.log('✅ Example 4: Removing Readonly completed\n');


// ============================================
// Example 5: Combining Modifiers
// ============================================

interface Product {
  id: string;
  name: string;
  price: number;
}

// Make everything optional AND readonly
type PartialReadonly<T> = {
  +readonly [P in keyof T]+?: T[P];
};

type SafeProduct = PartialReadonly<Product>;
// Result:
// {
//   readonly id?: string;
//   readonly name?: string;
//   readonly price?: number;
// }

const product: SafeProduct = {
  id: '1',
  name: 'Laptop'
  // price is optional
};

// product.name = 'Desktop'; // ❌ Error: readonly
console.log('Safe product:', product);
console.log('✅ Example 5: Combining modifiers completed\n');


// ============================================
// Example 6: Required and Mutable
// ============================================

interface PartialReadonlyConfig {
  readonly apiKey?: string;
  readonly timeout?: number;
  readonly debug?: boolean;
}

// Remove both optional and readonly
type RequiredMutable<T> = {
  -readonly [P in keyof T]-?: T[P];
};

type FullyMutableConfig = RequiredMutable<PartialReadonlyConfig>;
// Result:
// {
//   apiKey: string;
//   timeout: number;
//   debug: boolean;
// }

const mutableConfig: FullyMutableConfig = {
  apiKey: 'key_xxx',
  timeout: 5000,
  debug: false
};

// Can mutate all fields
mutableConfig.timeout = 10000; // ✅ OK
mutableConfig.debug = true; // ✅ OK
console.log('Fully mutable config:', mutableConfig);
console.log('✅ Example 6: Required and Mutable completed\n');


// ============================================
// Example 7: Selective Modification
// ============================================

// Make only string properties optional
type OptionalStrings<T> = {
  [P in keyof T]: T[P] extends string ? T[P] | undefined : T[P];
};

interface Person {
  id: string;
  name: string;
  age: number;
  active: boolean;
}

type OptionalStringPerson = OptionalStrings<Person>;
// Result:
// {
//   id: string | undefined;
//   name: string | undefined;
//   age: number;
//   active: boolean;
// }

const person: OptionalStringPerson = {
  id: '1',
  name: undefined, // ✅ OK for strings
  age: 30,
  active: true
};

console.log('Person with optional strings:', person);
console.log('✅ Example 7: Selective modification completed\n');


// ============================================
// Example 8: Deep Readonly
// ============================================

// Make all properties readonly recursively
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface NestedConfig {
  api: {
    endpoint: string;
    timeout: number;
  };
  debug: boolean;
}

type ImmutableNestedConfig = DeepReadonly<NestedConfig>;
// Result:
// {
//   readonly api: {
//     readonly endpoint: string;
//     readonly timeout: number;
//   };
//   readonly debug: boolean;
// }

const nestedConfig: ImmutableNestedConfig = {
  api: {
    endpoint: 'https://api.example.com',
    timeout: 5000
  },
  debug: false
};

// nestedConfig.api.timeout = 999; // ❌ Error: readonly
console.log('Deep readonly config:', nestedConfig);
console.log('✅ Example 8: Deep Readonly completed\n');


// ============================================
// Example 9: Deep Partial
// ============================================

// Make all properties optional recursively
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface ComplexConfig {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
  logging: {
    level: string;
    output: string;
  };
}

type PartialComplexConfig = DeepPartial<ComplexConfig>;
// Result: All nested properties are optional

const partialConfig: PartialComplexConfig = {
  database: {
    host: 'localhost'
    // port and credentials optional
  }
  // logging optional
};

console.log('Deep partial config:', partialConfig);
console.log('✅ Example 9: Deep Partial completed\n');


// ============================================
// Example 10: SDK State Management
// ============================================

interface SDKState {
  connected: boolean;
  authenticated: boolean;
  user: {
    id: string;
    name: string;
  } | null;
  settings: {
    theme: string;
    language: string;
  };
}

// Create immutable state type
type ImmutableSDKState = DeepReadonly<SDKState>;

// Create partial update type
type SDKStateUpdate = DeepPartial<SDKState>;

class StateManager {
  private state: ImmutableSDKState;

  constructor(initialState: SDKState) {
    this.state = initialState as ImmutableSDKState;
  }

  getState(): ImmutableSDKState {
    return this.state;
  }

  // Accept partial updates
  updateState(updates: SDKStateUpdate): void {
    // Deep merge logic here
    this.state = {
      ...this.state,
      ...updates,
      user: updates.user !== undefined ? updates.user : this.state.user,
      settings: {
        ...this.state.settings,
        ...updates.settings
      }
    } as ImmutableSDKState;
    console.log('State updated');
  }
}

const manager = new StateManager({
  connected: false,
  authenticated: false,
  user: null,
  settings: {
    theme: 'light',
    language: 'en'
  }
});

// Update only specific fields
manager.updateState({
  connected: true,
  settings: {
    theme: 'dark'
  }
});

console.log('SDK state:', manager.getState());
console.log('✅ Example 10: SDK State Management completed\n');


// ============================================
// Example 11: Conditional Modifiers
// ============================================

// Make only function properties optional
type OptionalFunctions<T> = {
  [P in keyof T]: T[P] extends Function ? T[P] | undefined : T[P];
};

interface EventHandlers {
  onClick: () => void;
  onHover: () => void;
  title: string;
  count: number;
}

type OptionalHandlers = OptionalFunctions<EventHandlers>;
// Result:
// {
//   onClick: (() => void) | undefined;
//   onHover: (() => void) | undefined;
//   title: string;
//   count: number;
// }

const handlers: OptionalHandlers = {
  onClick: undefined, // ✅ OK
  onHover: () => console.log('hover'),
  title: 'Button',
  count: 0
};

console.log('Handlers:', handlers);
console.log('✅ Example 11: Conditional Modifiers completed\n');


// ============================================
// Example 12: Modifier Utilities Collection
// ============================================

// Collection of useful modifier utilities
namespace ModifierUtils {
  // Make all optional
  export type Optional<T> = {
    [P in keyof T]?: T[P];
  };

  // Make all required
  export type Required<T> = {
    [P in keyof T]-?: T[P];
  };

  // Make all readonly
  export type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  };

  // Make all mutable
  export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  // Make all optional and readonly
  export type OptionalReadonly<T> = {
    readonly [P in keyof T]?: T[P];
  };

  // Make all required and mutable
  export type RequiredMutable<T> = {
    -readonly [P in keyof T]-?: T[P];
  };

  // Deep readonly
  export type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
  };

  // Deep partial
  export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };

  // Deep required
  export type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
  };
}

// Test the utilities
interface TestInterface {
  readonly id?: string;
  readonly name?: string;
  nested?: {
    readonly value?: string;
  };
}

type FullyMutable = ModifierUtils.RequiredMutable<TestInterface>;
type FullyImmutable = ModifierUtils.OptionalReadonly<TestInterface>;
type DeepImmutable = ModifierUtils.DeepReadonly<TestInterface>;

console.log('✅ Example 12: Modifier Utilities Collection completed\n');


// ============================================
// Summary
// ============================================

console.log(`
📚 Type Modifiers Summary:
-----------------------
✓ +? or ? : Add optional modifier
✓ -?      : Remove optional modifier (make required)
✓ +readonly or readonly : Add readonly modifier
✓ -readonly : Remove readonly modifier (make mutable)

Common combinations:
- Partial: { [P in keyof T]?: T[P] }
- Required: { [P in keyof T]-?: T[P] }
- Readonly: { readonly [P in keyof T]: T[P] }
- Mutable: { -readonly [P in keyof T]: T[P] }
- PartialReadonly: { readonly [P in keyof T]?: T[P] }
- RequiredMutable: { -readonly [P in keyof T]-?: T[P] }

Deep utilities:
- DeepReadonly: Recursive readonly
- DeepPartial: Recursive optional
- DeepRequired: Recursive required

Use cases:
- State management (immutable states)
- Configuration systems (optional configs)
- API types (partial updates)
- Type safety (prevent mutations)
`);
