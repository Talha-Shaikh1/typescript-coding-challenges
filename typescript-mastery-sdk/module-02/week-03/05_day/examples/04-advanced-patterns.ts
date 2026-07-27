/**
 * Day 19 - Example 4: Advanced Mapped Type Patterns
 *
 * Demonstrates complex patterns combining mapped types with:
 * - Conditional types
 * - Template literal types
 * - Recursive types
 * - Key remapping
 */

// ============================================
// Example 1: Deep Modification Patterns
// ============================================

// Deep Partial - make all nested properties optional
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepPartial<T[P]>
    : T[P];
};

interface ComplexConfig {
  api: {
    endpoint: string;
    auth: {
      token: string;
      refreshToken: string;
    };
    timeout: number;
  };
  features: {
    chat: boolean;
    notifications: boolean;
  };
}

type PartialComplexConfig = DeepPartial<ComplexConfig>;
// All nested properties are optional

const partialConfig: PartialComplexConfig = {
  api: {
    auth: {
      token: 'xxx'
      // refreshToken optional
    }
    // timeout optional
  }
  // features optional
};

console.log('Deep partial config:', partialConfig);
console.log('✅ Example 1: Deep Modification completed\n');


// ============================================
// Example 2: Conditional Property Transformation
// ============================================

// Transform strings to arrays, leave others unchanged
type StringToArray<T> = {
  [P in keyof T]: T[P] extends string ? string[] : T[P];
};

interface User {
  id: string;
  name: string;
  age: number;
  active: boolean;
  tags: string;
}

type UserWithArrays = StringToArray<User>;
// Result:
// {
//   id: string[];
//   name: string[];
//   age: number;
//   active: boolean;
//   tags: string[];
// }

const userArrays: UserWithArrays = {
  id: ['1', '2'],
  name: ['John', 'Jane'],
  age: 30,
  active: true,
  tags: ['developer', 'designer']
};

console.log('User with arrays:', userArrays);
console.log('✅ Example 2: Conditional Transformation completed\n');


// ============================================
// Example 3: Extract Function Parameters
// ============================================

// Extract all function parameters into a type
type FunctionParameters<T> = {
  [P in keyof T]: T[P] extends (...args: infer A) => any ? A : never;
};

interface API {
  getUser(id: string, includeDetails: boolean): any;
  createUser(name: string, email: string, age: number): any;
  deleteUser(id: string): any;
}

type APIParams = FunctionParameters<API>;
// Result:
// {
//   getUser: [id: string, includeDetails: boolean];
//   createUser: [name: string, email: string, age: number];
//   deleteUser: [id: string];
// }

// Can use to create parameter objects
type GetUserParams = APIParams['getUser'];
const getUserParams: GetUserParams = ['user-1', true];

console.log('Get user params:', getUserParams);
console.log('✅ Example 3: Extract Function Parameters completed\n');


// ============================================
// Example 4: Extract Function Return Types
// ============================================

// Extract all function return types
type FunctionReturns<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => infer R ? R : never;
};

interface DataService {
  fetchUsers(): Promise<User[]>;
  fetchUser(id: string): Promise<User>;
  saveUser(user: User): Promise<boolean>;
}

type ServiceReturns = FunctionReturns<DataService>;
// Result:
// {
//   fetchUsers: Promise<User[]>;
//   fetchUser: Promise<User>;
//   saveUser: Promise<boolean>;
// }

type FetchUsersReturn = ServiceReturns['fetchUsers'];
// Promise<User[]>

console.log('✅ Example 4: Extract Function Returns completed\n');


// ============================================
// Example 5: Union to Intersection Converter
// ============================================

// Convert union type to intersection type
type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type Union = { a: string } | { b: number } | { c: boolean };
type Intersection = UnionToIntersection<Union>;
// Result: { a: string } & { b: number } & { c: boolean }

const combined: Intersection = {
  a: 'hello',
  b: 42,
  c: true
};

console.log('Combined:', combined);
console.log('✅ Example 5: Union to Intersection completed\n');


// ============================================
// Example 6: Path-Based Type Access
// ============================================

// Access nested property types using path strings
type DeepPropertyType<T, Path extends string> = Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? DeepPropertyType<T[Key], Rest>
    : never
  : Path extends keyof T
  ? T[Path]
  : never;

interface NestedData {
  user: {
    profile: {
      name: string;
      age: number;
    };
    settings: {
      theme: string;
    };
  };
}

type UserName = DeepPropertyType<NestedData, 'user.profile.name'>; // string
type UserAge = DeepPropertyType<NestedData, 'user.profile.age'>; // number
type Theme = DeepPropertyType<NestedData, 'user.settings.theme'>; // string

console.log('✅ Example 6: Path-Based Type Access completed\n');


// ============================================
// Example 7: Discriminated Union to Object
// ============================================

// Convert discriminated union to object type
type UnionToObject<T extends { type: string }> = {
  [P in T['type']]: Extract<T, { type: P }>;
};

type Message =
  | { type: 'text'; body: string }
  | { type: 'image'; url: string; width: number }
  | { type: 'video'; url: string; duration: number };

type MessageMap = UnionToObject<Message>;
// Result:
// {
//   text: { type: 'text'; body: string };
//   image: { type: 'image'; url: string; width: number };
//   video: { type: 'video'; url: string; duration: number };
// }

const messageHandlers: {
  [K in keyof MessageMap]: (msg: MessageMap[K]) => void;
} = {
  text: (msg) => console.log('Text:', msg.body),
  image: (msg) => console.log('Image:', msg.url, msg.width),
  video: (msg) => console.log('Video:', msg.url, msg.duration)
};

messageHandlers.text({ type: 'text', body: 'Hello' });
console.log('✅ Example 7: Discriminated Union to Object completed\n');


// ============================================
// Example 8: Flatten Object Type
// ============================================

// Flatten nested object into single level with dot notation
type FlattenObject<T, Prefix extends string = ''> = {
  [K in keyof T as T[K] extends object
    ? T[K] extends Function
      ? `${Prefix}${string & K}`
      : keyof FlattenObject<T[K], `${Prefix}${string & K}.`>
    : `${Prefix}${string & K}`]: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : FlattenObject<T[K], `${Prefix}${string & K}.`>[keyof FlattenObject<T[K], `${Prefix}${string & K}.`>]
    : T[K];
};

// Simpler version for demonstration
type SimpleFlat<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : T[K]
    : T[K];
};

console.log('✅ Example 8: Flatten Object completed\n');


// ============================================
// Example 9: Conditional Key Filtering
// ============================================

// Keep only keys where value matches condition
type FilterKeys<T, Condition> = {
  [K in keyof T]: T[K] extends Condition ? K : never;
}[keyof T];

interface Data {
  id: string;
  name: string;
  count: number;
  total: number;
  active: boolean;
}

type StringKeys = FilterKeys<Data, string>;
// Result: 'id' | 'name'

type NumberKeys = FilterKeys<Data, number>;
// Result: 'count' | 'total'

const stringKey: StringKeys = 'name'; // OK
// const invalidKey: StringKeys = 'count'; // Error

console.log('String key:', stringKey);
console.log('✅ Example 9: Conditional Key Filtering completed\n');


// ============================================
// Example 10: Merge Types Deeply
// ============================================

// Deep merge two types
type DeepMerge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? K extends keyof T
      ? T[K] extends object
        ? U[K] extends object
          ? DeepMerge<T[K], U[K]>
          : U[K]
        : U[K]
      : U[K]
    : K extends keyof T
    ? T[K]
    : never;
};

interface BaseConfig {
  api: {
    endpoint: string;
    timeout: number;
  };
  debug: boolean;
}

interface Override {
  api: {
    timeout: number;
    retries: number;
  };
  logging: boolean;
}

type MergedConfig = DeepMerge<BaseConfig, Override>;
// Result: Deep merge of both types

console.log('✅ Example 10: Deep Merge completed\n');


// ============================================
// Example 11: Create Event Types from Actions
// ============================================

type ActionType = 'CREATE' | 'UPDATE' | 'DELETE';
type EntityType = 'User' | 'Post' | 'Comment';

// Generate all combinations
type EventType<A extends string, E extends string> = `${A}_${E}`;

type AllEvents = EventType<ActionType, EntityType>;
// Result: 'CREATE_User' | 'CREATE_Post' | 'CREATE_Comment' | 'UPDATE_User' | ...

// Create event handlers
type EventHandlers<T extends string> = {
  [E in T]: (data: any) => void;
};

type Handlers = EventHandlers<AllEvents>;

const handlers: Partial<Handlers> = {
  CREATE_User: (data) => console.log('User created:', data),
  UPDATE_Post: (data) => console.log('Post updated:', data),
  DELETE_Comment: (data) => console.log('Comment deleted:', data)
};

handlers.CREATE_User?.({ id: '1', name: 'John' });
console.log('✅ Example 11: Event Types from Actions completed\n');


// ============================================
// Example 12: SDK Type System
// ============================================

// Comprehensive SDK type system
interface SDKMethod {
  name: string;
  params: any[];
  returns: any;
}

// Extract method names
type MethodNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

// Create async wrapper
type AsyncWrapper<T> = {
  [K in MethodNames<T>]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : never;
};

// Add validation
type WithValidation<T> = {
  [K in keyof T]: {
    execute: T[K];
    validate: T[K] extends (...args: infer A) => any
      ? (...args: A) => boolean
      : never;
  };
};

interface SDK {
  sendMessage(to: string, body: string): boolean;
  getMessages(limit: number): any[];
  deleteMessage(id: string): boolean;
}

type AsyncSDK = AsyncWrapper<SDK>;
type ValidatedSDK = WithValidation<SDK>;

console.log('✅ Example 12: SDK Type System completed\n');


// ============================================
// Example 13: Type-Safe State Mutations
// ============================================

// Create mutation functions for state
type StateMutations<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
} & {
  [K in keyof T as `reset${Capitalize<string & K>}`]: () => void;
};

interface AppState {
  user: { id: string; name: string } | null;
  theme: 'light' | 'dark';
  language: string;
}

type Mutations = StateMutations<AppState>;
// Result:
// {
//   setUser: (value: { id: string; name: string } | null) => void;
//   resetUser: () => void;
//   setTheme: (value: 'light' | 'dark') => void;
//   resetTheme: () => void;
//   setLanguage: (value: string) => void;
//   resetLanguage: () => void;
// }

class Store {
  private state: AppState = {
    user: null,
    theme: 'light',
    language: 'en'
  };

  setUser = (value: AppState['user']): void => {
    this.state.user = value;
  };

  resetUser = (): void => {
    this.state.user = null;
  };

  setTheme = (value: AppState['theme']): void => {
    this.state.theme = value;
  };

  resetTheme = (): void => {
    this.state.theme = 'light';
  };

  setLanguage = (value: AppState['language']): void => {
    this.state.language = value;
  };

  resetLanguage = (): void => {
    this.state.language = 'en';
  };

  getState = (): AppState => this.state;
}

const store = new Store();
store.setUser({ id: '1', name: 'John' });
store.setTheme('dark');
console.log('Store state:', store.getState());

console.log('✅ Example 13: State Mutations completed\n');


// ============================================
// Summary
// ============================================

console.log(`
📚 Advanced Mapped Type Patterns Summary:
---------------------------------------
✓ Deep modifications (recursive transformations)
✓ Conditional property transformation
✓ Function signature extraction (params & returns)
✓ Union to intersection conversion
✓ Path-based type access ('user.profile.name')
✓ Discriminated union to object mapping
✓ Type flattening and merging
✓ Conditional key filtering
✓ Event type generation from combinations
✓ Complex SDK type systems

Advanced techniques:
- infer for extracting types
- Template literal types for key generation
- Recursive types for nested structures
- Conditional types with mapped types
- Type manipulation with never
- Union/intersection conversions

Real-world applications:
- State management systems
- API client type generation
- Event handling frameworks
- Form validation systems
- Deep configuration types
- Type-safe ORMs
- SDK type systems

Key pattern:
type Advanced<T> = {
  [P in keyof T as Transform<P>]:
    T[P] extends Condition
      ? TransformType<T[P]>
      : T[P]
};

These patterns enable:
- Maximum type safety
- Zero runtime overhead
- Automatic type inference
- Compile-time guarantees
- Scalable type systems
`);
