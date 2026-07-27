/**
 * Day 17 - Exercise 1: Configuration Update System (Partial)
 *
 * Task: Create a settings manager that allows partial updates
 *
 * Requirements:
 * 1. Define AppSettings interface with 6+ properties
 * 2. Create SettingsManager class
 * 3. Implement updateSettings() using Partial<T>
 * 4. Settings should merge correctly
 */

// TODO: Define AppSettings interface
// Should include at least 6 properties with different types:
// - apiTimeout (number)
// - maxRetries (number)
// - enableLogging (boolean)
// - cacheDuration (number)
// - apiVersion (string)
// - debugMode (boolean)

interface AppSettings {
  // Add properties here
}


// TODO: Implement SettingsManager class
class SettingsManager {
  private settings: AppSettings;

  constructor(initialSettings: AppSettings) {
    // Initialize settings
  }

  // TODO: Implement updateSettings method
  // Should accept Partial<AppSettings>
  // Should merge new values with existing settings
  updateSettings(updates: /* Add type here */): void {
    // Implement update logic
  }

  // TODO: Implement getSettings method
  getSettings(): AppSettings {
    // Return current settings
    return this.settings;
  }

  // TODO: Implement getSetting method to get a specific setting
  getSetting<K extends keyof AppSettings>(key: K): AppSettings[K] {
    // Return specific setting
    return this.settings[key];
  }
}


// TODO: Test your implementation
// Example usage:
/*
const manager = new SettingsManager({
  apiTimeout: 5000,
  maxRetries: 3,
  enableLogging: true,
  cacheDuration: 60000,
  apiVersion: 'v17.0',
  debugMode: false
});

console.log('Initial settings:', manager.getSettings());

manager.updateSettings({ apiTimeout: 10000 });
console.log('After timeout update:', manager.getSetting('apiTimeout'));

manager.updateSettings({ enableLogging: false, debugMode: true });
console.log('After multiple updates:', manager.getSettings());
*/
