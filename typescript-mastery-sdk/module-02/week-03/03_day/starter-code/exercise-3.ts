/**
 * Day 17 - Exercise 3: Secure Data Logging (Omit)
 *
 * Task: Create safe versions of types by excluding sensitive information
 *
 * Requirements:
 * 1. Define DatabaseConfig and UserAccount interfaces
 * 2. Use Omit to create safe versions
 * 3. Create Logger class that strips sensitive data
 * 4. Ensure sensitive data never appears in logs
 */

// TODO: Define DatabaseConfig interface
// Include:
// - Connection details (host, port, database)
// - Credentials (username, password, apiKey)
// - Options (timeout, poolSize, ssl)

interface DatabaseConfig {
  // Connection details
  host: string;
  port: number;
  database: string;

  // Credentials (sensitive)
  username: string;
  password: string;
  apiKey: string;

  // Options
  timeout: number;
  poolSize: number;
  ssl: boolean;
}


// TODO: Define UserAccount interface
// Include:
// - Personal data (id, name, email)
// - Sensitive data (password, creditCard, ssn)
// - Preferences (theme, language)

interface UserAccount {
  // Add all properties here
}


// TODO: Create safe versions using Omit

// SafeDatabaseConfig - Remove password and apiKey
type SafeDatabaseConfig = // Use Omit here


// SafeUserAccount - Remove password, creditCard, ssn
type SafeUserAccount = // Use Omit here


// TODO: Implement Logger class
class Logger {
  // Log database config without sensitive data
  logConfig(config: DatabaseConfig): void {
    // Create safe version and log it
    const safeConfig: SafeDatabaseConfig = {
      // Extract only safe fields
    };

    console.log('[DB CONFIG]', safeConfig);
  }

  // Log user account without sensitive data
  logUser(user: UserAccount): void {
    // Create safe version and log it
    const safeUser: SafeUserAccount = {
      // Extract only safe fields
    };

    console.log('[USER]', safeUser);
  }

  // Generic method to sanitize and log any object
  logSafe<T, K extends keyof T>(
    label: string,
    data: T,
    excludeKeys: K[]
  ): void {
    // Remove excluded keys and log
  }
}


// TODO: Test your implementation
// Example usage:
/*
const logger = new Logger();

const dbConfig: DatabaseConfig = {
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  username: 'admin',
  password: 'super_secret_password',
  apiKey: 'api_key_12345',
  timeout: 5000,
  poolSize: 10,
  ssl: true
};

const user: UserAccount = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  password: 'hashed_password',
  creditCard: '1234-5678-9012-3456',
  ssn: '123-45-6789',
  theme: 'dark',
  language: 'en'
};

logger.logConfig(dbConfig);
logger.logUser(user);

// Should NOT see password, apiKey, creditCard, or ssn in logs!
*/
