/**
 * Exercise 4: Fix Circular Dependency
 * User and Post have circular dependency - fix it!
 */

// ============================================
// PART 1: Identify the Problem
// ============================================

// TODO: Run this code and observe the error
// What's the problem? Write your answer below:

/**
 * PROBLEM ANALYSIS:
 *
 * 1. Why is this circular?
 * (Your answer here)
 *
 * 2. What error occurs?
 * (Your answer here)
 *
 * 3. When does it break?
 * (Your answer here)
 */

// ============================================
// PART 2: Current (Broken) Code
// ============================================

// exercise-4-user.ts (simulated here)
/*
import { Post } from './exercise-4-post';

export class User {
  id: string;
  name: string;
  posts: Post[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  addPost(post: Post) {
    this.posts.push(post);
  }
}
*/

// exercise-4-post.ts (simulated here)
/*
import { User } from './exercise-4-user';

export class Post {
  id: string;
  content: string;
  author: User;

  constructor(id: string, content: string, author: User) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}
*/

// ============================================
// PART 3: Solution 1 - Extract Types
// ============================================

// TODO: Create a types.ts file with interfaces
// Then update User and Post to import from types

// types.ts
// TODO: Define User and Post interfaces here

// user.ts (fixed)
// TODO: Import type from types.ts and implement

// post.ts (fixed)
// TODO: Import type from types.ts and implement

// ============================================
// PART 4: Solution 2 - Type-Only Import
// ============================================

// TODO: Fix using import type syntax
// Which file should use import type?

// ============================================
// PART 5: Analysis
// ============================================

/**
 * QUESTION: Which solution is better and why?
 *
 * Solution 1 (Extract types):
 * Pros:
 * (Your answer)
 *
 * Cons:
 * (Your answer)
 *
 * Solution 2 (Type-only import):
 * Pros:
 * (Your answer)
 *
 * Cons:
 * (Your answer)
 *
 * Which would you choose for WhatsApp SDK?
 * (Your answer)
 */

export {};
