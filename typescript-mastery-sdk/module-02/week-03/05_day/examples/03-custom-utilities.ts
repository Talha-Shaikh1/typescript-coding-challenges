/**
 * Day 19 - Example 3: Custom Utility Types
 *
 * Demonstrates building domain-specific utility types
 * Using key remapping and conditional types with mapped types
 */

// ============================================
// Example 1: PickByType - Filter by Property Type
// ============================================

// Keep only properties of specific type
type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

interface Mixed {
  id: string;
  name: string;
  age: number;
  count: number;
  active: boolean;
  save: () => void;
}

type StringProps = PickByType<Mixed, string>;
// Result: { id: string; name: string; }

type NumberProps = PickByType<Mixed, number>;
// Result: { age: number; count: number; }

type FunctionProps = PickByType<Mixed, Function>;
// Result: { save: () => void; }

const strings: StringProps = {
  id: '1',
  name: 'John'
};

const numbers: NumberProps = {
  age: 30,
  count: 5
};

console.log('String properties:', strings);
console.log('Number properties:', numbers);
console.log('✅ Example 1: PickByType completed\n');


// ============================================
// Example 2: OmitByType - Exclude by Property Type
// ============================================

// Remove properties of specific type
type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P];
};

interface UserData {
  id: string;
  name: string;
  age: number;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

type NonStringProps = OmitByType<UserData, string>;
// Result: { age: number; createdAt: Date; updatedAt: Date; }

type NonDateProps = OmitByType<UserData, Date>;
// Result: { id: string; name: string; age: number; token: string; }

const nonStrings: NonStringProps = {
  age: 30,
  createdAt: new Date(),
  updatedAt: new Date()
};

console.log('Non-string properties:', nonStrings);
console.log('✅ Example 2: OmitByType completed\n');


// ============================================
// Example 3: FunctionProperties - Only Functions
// ============================================

// Keep only function properties
type FunctionProperties<T> = {
  [P in keyof T as T[P] extends Function ? P : never]: T[P];
};

// Keep only non-function properties
type NonFunctionProperties<T> = {
  [P in keyof T as T[P] extends Function ? never : P]: T[P];
};

interface APIClient {
  baseURL: string;
  timeout: number;
  get: (url: string) => Promise<any>;
  post: (url: string, data: any) => Promise<any>;
  delete: (url: string) => Promise<any>;
}

type ClientMethods = FunctionProperties<APIClient>;
// Result: {
//   get: (url: string) => Promise<any>;
//   post: (url: string, data: any) => Promise<any>;
//   delete: (url: string) => Promise<any>;
// }

type ClientConfig = NonFunctionProperties<APIClient>;
// Result: { baseURL: string; timeout: number; }

const methods: ClientMethods = {
  get: async (url) => ({}),
  post: async (url, data) => ({}),
  delete: async (url) => ({})
};

const config: ClientConfig = {
  baseURL: 'https://api.example.com',
  timeout: 5000
};

console.log('Methods:', Object.keys(methods));
console.log('Config:', config);
console.log('✅ Example 3: FunctionProperties completed\n');


// ============================================
// Example 4: Getters - Create Getter Functions
// ============================================

// Convert properties to getter functions
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface State {
  count: number;
  name: string;
  active: boolean;
}

type StateGetters = Getters<State>;
// Result:
// {
//   getCount: () => number;
//   getName: () => string;
//   getActive: () => boolean;
// }

class StateManager {
  private state: State = {
    count: 0,
    name: 'App',
    active: true
  };

  // Implement getters
  getCount = (): number => this.state.count;
  getName = (): string => this.state.name;
  getActive = (): boolean => this.state.active;
}

const manager = new StateManager();
console.log('Count:', manager.getCount());
console.log('Name:', manager.getName());
console.log('Active:', manager.getActive());
console.log('✅ Example 4: Getters completed\n');


// ============================================
// Example 5: Setters - Create Setter Functions
// ============================================

// Convert properties to setter functions
type Setters<T> = {
  [P in keyof T as `set${Capitalize<string & P>}`]: (value: T[P]) => void;
};

type StateSetters = Setters<State>;
// Result:
// {
//   setCount: (value: number) => void;
//   setName: (value: string) => void;
//   setActive: (value: boolean) => void;
// }

class MutableStateManager {
  private state: State = {
    count: 0,
    name: 'App',
    active: true
  };

  setCount = (value: number): void => {
    this.state.count = value;
  };

  setName = (value: string): void => {
    this.state.name = value;
  };

  setActive = (value: boolean): void => {
    this.state.active = value;
  };

  getState = (): State => this.state;
}

const mutableManager = new MutableStateManager();
mutableManager.setCount(42);
mutableManager.setName('MyApp');
console.log('Updated state:', mutableManager.getState());
console.log('✅ Example 5: Setters completed\n');


// ============================================
// Example 6: Prefixed Keys
// ============================================

// Add prefix to all keys
type Prefixed<T, Prefix extends string> = {
  [P in keyof T as `${Prefix}${Capitalize<string & P>}`]: T[P];
};

interface User {
  id: string;
  name: string;
  email: string;
}

type PrefixedUser = Prefixed<User, 'user'>;
// Result: { userId: string; userName: string; userEmail: string; }

const prefixedUser: PrefixedUser = {
  userId: '1',
  userName: 'John',
  userEmail: 'john@example.com'
};

console.log('Prefixed user:', prefixedUser);
console.log('✅ Example 6: Prefixed Keys completed\n');


// ============================================
// Example 7: Suffixed Keys
// ============================================

// Add suffix to all keys
type Suffixed<T, Suffix extends string> = {
  [P in keyof T as `${string & P}${Capitalize<Suffix>}`]: T[P];
};

interface Metric {
  views: number;
  clicks: number;
  conversions: number;
}

type MetricCounts = Suffixed<Metric, 'count'>;
// Result: { viewsCount: number; clicksCount: number; conversionsCount: number; }

const metrics: MetricCounts = {
  viewsCount: 1000,
  clicksCount: 150,
  conversionsCount: 25
};

console.log('Metrics:', metrics);
console.log('✅ Example 7: Suffixed Keys completed\n');


// ============================================
// Example 8: Nullable Properties
// ============================================

// Make only nullable properties actually nullable
type NullableProperties<T> = {
  [P in keyof T]: T[P] extends null ? T[P] : T[P] | null;
};

interface Config {
  apiKey: string;
  timeout: number;
  webhookUrl: string | null;
}

type NullableConfig = NullableProperties<Config>;
// Result:
// {
//   apiKey: string | null;
//   timeout: number | null;
//   webhookUrl: string | null;
// }

function resetConfig(): NullableConfig {
  return {
    apiKey: null,
    timeout: null,
    webhookUrl: null
  };
}

console.log('Reset config:', resetConfig());
console.log('✅ Example 8: Nullable Properties completed\n');


// ============================================
// Example 9: Promise Wrapper
// ============================================

// Wrap all method return types in Promise
type Promisify<T> = {
  [P in keyof T]: T[P] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[P];
};

interface SyncAPI {
  getUser(id: string): { id: string; name: string };
  deleteUser(id: string): boolean;
  updateUser(id: string, data: any): void;
}

type AsyncAPI = Promisify<SyncAPI>;
// Result:
// {
//   getUser: (id: string) => Promise<{ id: string; name: string }>;
//   deleteUser: (id: string) => Promise<boolean>;
//   updateUser: (id: string, data: any) => Promise<void>;
// }

const asyncAPI: AsyncAPI = {
  getUser: async (id) => ({ id, name: 'John' }),
  deleteUser: async (id) => true,
  updateUser: async (id, data) => {}
};

asyncAPI.getUser('1').then(user => console.log('User:', user));
console.log('✅ Example 9: Promise Wrapper completed\n');


// ============================================
// Example 10: SDK Validators System
// ============================================

interface MessagePayload {
  to: string;
  from: string;
  body: string;
  mediaUrl?: string;
  priority: 'high' | 'normal' | 'low';
}

// Create validator type for each field
type FieldValidator<T> = (value: T) => { valid: boolean; error?: string };

type Validators<T> = {
  [P in keyof T]: FieldValidator<T[P]>;
};

type MessageValidators = Validators<MessagePayload>;

const messageValidators: MessageValidators = {
  to: (value) => ({
    valid: /^\+\d{10,}$/.test(value),
    error: !(/^\+\d{10,}$/.test(value)) ? 'Invalid phone number' : undefined
  }),
  from: (value) => ({
    valid: /^\+\d{10,}$/.test(value),
    error: !(/^\+\d{10,}$/.test(value)) ? 'Invalid phone number' : undefined
  }),
  body: (value) => ({
    valid: value.length > 0 && value.length <= 1000,
    error: !(value.length > 0 && value.length <= 1000) ? 'Body must be 1-1000 characters' : undefined
  }),
  mediaUrl: (value) => ({
    valid: !value || /^https?:\/\//.test(value),
    error: value && !(/^https?:\/\//.test(value)) ? 'Invalid URL' : undefined
  }),
  priority: (value) => ({
    valid: ['high', 'normal', 'low'].includes(value),
    error: !(['high', 'normal', 'low'].includes(value)) ? 'Invalid priority' : undefined
  })
};

function validatePayload(payload: MessagePayload): boolean {
  for (const key in messageValidators) {
    const validator = messageValidators[key as keyof MessageValidators];
    const value = payload[key as keyof MessagePayload];
    const result = validator(value as any);

    if (!result.valid) {
      console.error(`Validation failed for ${key}:`, result.error);
      return false;
    }
  }
  return true;
}

const payload: MessagePayload = {
  to: '+1234567890',
  from: '+0987654321',
  body: 'Hello!',
  priority: 'normal'
};

console.log('Payload valid?', validatePayload(payload));
console.log('✅ Example 10: SDK Validators completed\n');


// ============================================
// Example 11: Event Handlers from Types
// ============================================

type MessageType = 'text' | 'image' | 'video' | 'audio';

// Create event handler type for each message type
type EventHandlers<T extends string> = {
  [P in T as `on${Capitalize<P>}Message`]: (data: any) => void;
};

type MessageEventHandlers = EventHandlers<MessageType>;
// Result:
// {
//   onTextMessage: (data: any) => void;
//   onImageMessage: (data: any) => void;
//   onVideoMessage: (data: any) => void;
//   onAudioMessage: (data: any) => void;
// }

class MessageRouter {
  private handlers: MessageEventHandlers = {
    onTextMessage: (data) => console.log('Text:', data),
    onImageMessage: (data) => console.log('Image:', data),
    onVideoMessage: (data) => console.log('Video:', data),
    onAudioMessage: (data) => console.log('Audio:', data)
  };

  registerHandler<T extends keyof MessageEventHandlers>(
    event: T,
    handler: MessageEventHandlers[T]
  ): void {
    this.handlers[event] = handler;
  }

  emit<T extends keyof MessageEventHandlers>(
    event: T,
    data: any
  ): void {
    this.handlers[event](data);
  }
}

const router = new MessageRouter();
router.emit('onTextMessage', { body: 'Hello' });
console.log('✅ Example 11: Event Handlers completed\n');


// ============================================
// Example 12: API Response Wrappers
// ============================================

interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: number;
}

// Wrap all method return types in APIResponse
type APIWrapped<T> = {
  [P in keyof T]: T[P] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<APIResponse<R>>
    : T[P];
};

interface SDKMethods {
  sendMessage(to: string, body: string): boolean;
  getMessages(limit: number): any[];
  deleteMessage(id: string): boolean;
}

type WrappedSDK = APIWrapped<SDKMethods>;
// Result:
// {
//   sendMessage: (to: string, body: string) => Promise<APIResponse<boolean>>;
//   getMessages: (limit: number) => Promise<APIResponse<any[]>>;
//   deleteMessage: (id: string) => Promise<APIResponse<boolean>>;
// }

const wrappedSDK: WrappedSDK = {
  sendMessage: async (to, body) => ({
    success: true,
    data: true,
    timestamp: Date.now()
  }),
  getMessages: async (limit) => ({
    success: true,
    data: [],
    timestamp: Date.now()
  }),
  deleteMessage: async (id) => ({
    success: true,
    data: true,
    timestamp: Date.now()
  })
};

wrappedSDK.sendMessage('+123', 'Hi').then(res => {
  console.log('Send message response:', res);
});

console.log('✅ Example 12: API Response Wrappers completed\n');


// ============================================
// Summary
// ============================================

console.log(`
📚 Custom Utility Types Summary:
------------------------------
✓ PickByType<T, U>: Filter properties by type
✓ OmitByType<T, U>: Exclude properties by type
✓ FunctionProperties<T>: Keep only functions
✓ Getters<T>: Create getter functions
✓ Setters<T>: Create setter functions
✓ Prefixed<T, P>: Add prefix to keys
✓ Suffixed<T, S>: Add suffix to keys
✓ Promisify<T>: Wrap returns in Promise
✓ Validators<T>: Add validation functions
✓ APIWrapped<T>: Wrap in API response

Key patterns:
- Key remapping: [P in keyof T as NewKey]
- Conditional filtering: Condition ? P : never
- Template literals: \`prefix\${P}\`
- Function analysis: T[P] extends (...args) => R
- Recursive types: T extends object ? Recurse<T> : T

These utilities are building blocks for:
- Domain-specific type systems
- API type transformations
- Validation systems
- Event handling
- State management
`);
