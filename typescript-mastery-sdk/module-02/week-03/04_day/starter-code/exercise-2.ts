/**
 * Day 18 - Exercise 2: Immutable State Manager (Readonly)
 *
 * Task: Build a state management system with immutable state using Readonly<T>
 *
 * Requirements:
 * 1. Define AppState interface with multiple properties
 * 2. Create StateManager class using Readonly<T>
 * 3. Implement state management with immutable patterns
 * 4. Implement subscription system
 */

// TODO: Define AppState interface
// Include:
// - user (object or null)
// - isAuthenticated (boolean)
// - theme ('light' | 'dark')
// - notifications (number)
// - settings (object)

interface AppState {
  // Add properties here
}


// TODO: Type for state listener callback
type StateListener = (state: Readonly<AppState>) => void;


// TODO: Implement StateManager class
class StateManager {
  // State should be readonly
  private state: Readonly<AppState>;
  private listeners: StateListener[] = [];

  constructor(initialState: AppState) {
    // Initialize state
  }

  // Get current state (returns readonly)
  getState(): Readonly<AppState> {
    // Return current state
  }

  // Replace entire state (creates new state object)
  setState(newState: AppState): void {
    // Update state
    // Notify listeners
  }

  // Update partial state (immutable pattern)
  updateState(updates: Partial<AppState>): void {
    // Merge updates with current state
    // Create new state object (don't mutate existing)
    // Notify listeners
  }

  // Subscribe to state changes
  subscribe(listener: StateListener): () => void {
    // Add listener to array
    // Return unsubscribe function
  }

  // Notify all listeners of state change
  private notifyListeners(): void {
    // Call each listener with current state
  }

  // Get specific state property
  getProperty<K extends keyof AppState>(key: K): Readonly<AppState[K]> {
    // Return specific property
  }

  // Reset state to initial
  reset(): void {
    // Reset to initial state
    // Notify listeners
  }
}


// TODO: Test your implementation
// Example usage:
/*
const manager = new StateManager({
  user: null,
  isAuthenticated: false,
  theme: 'light',
  notifications: 0,
  settings: { language: 'en', timezone: 'UTC' }
});

// Subscribe to changes
const unsubscribe = manager.subscribe((state) => {
  console.log('State changed:', state);
});

// Get current state
const state = manager.getState();
console.log('Current state:', state);

// Try to mutate (should error)
// state.theme = 'dark'; // TypeScript error!

// Update state immutably
manager.updateState({
  user: { id: '1', name: 'John' },
  isAuthenticated: true
});

manager.updateState({
  notifications: 5
});

// Get specific property
const theme = manager.getProperty('theme');
console.log('Theme:', theme);

// Unsubscribe
unsubscribe();

// Reset state
manager.reset();
*/
