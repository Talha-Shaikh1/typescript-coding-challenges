/**
 * Day 17 - Exercise 2: API Response Summaries (Pick)
 *
 * Task: Create specialized user types using Pick for different use cases
 *
 * Requirements:
 * 1. Define complete User interface with 8-10 properties
 * 2. Create specialized types using Pick
 * 3. Create functions that return each specialized type
 * 4. Demonstrate type safety
 */

// TODO: Define User interface with 8-10 properties
// Include:
// - Basic info (id, name, email)
// - Profile (avatar, bio, location)
// - Metadata (createdAt, updatedAt, lastLogin)
// - Settings (preferences, notifications)

interface User {
  // Add all properties here
}


// TODO: Create specialized types using Pick

// UserCard - For user cards in lists (id, name, avatar)
type UserCard = // Use Pick here


// UserProfile - For profile page (all except metadata)
type UserProfile = // Use Pick here


// UserSummary - For notifications (id, name, avatar, lastLogin)
type UserSummary = // Use Pick here


// UserAuth - For authentication (id, email, lastLogin)
type UserAuth = // Use Pick here


// TODO: Implement functions that return specialized types

function getUserCard(user: User): UserCard {
  // Extract only card fields
}

function getUserProfile(user: User): UserProfile {
  // Extract profile fields
}

function getUserSummary(user: User): UserSummary {
  // Extract summary fields
}

function getUserAuth(user: User): UserAuth {
  // Extract auth fields
}


// TODO: Test your implementation
// Example usage:
/*
const fullUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg',
  bio: 'Software developer',
  location: 'San Francisco',
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLogin: new Date(),
  preferences: { theme: 'dark', language: 'en' },
  notifications: { email: true, push: false }
};

console.log('Card:', getUserCard(fullUser));
console.log('Profile:', getUserProfile(fullUser));
console.log('Summary:', getUserSummary(fullUser));
console.log('Auth:', getUserAuth(fullUser));
*/
