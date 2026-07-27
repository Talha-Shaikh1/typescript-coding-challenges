/**
 * Day 17 - Exercise 4: Message Cache System (Record)
 *
 * Task: Build a caching layer for WhatsApp messages using Record
 *
 * Requirements:
 * 1. Define WhatsAppMessage interface
 * 2. Create MessageCache class using Record for storage
 * 3. Implement all cache operations
 * 4. Create StatusCounter using Record
 */

// TODO: Define WhatsAppMessage interface
// Include:
// - id, from, to, body, timestamp
// - status ('sent' | 'delivered' | 'read')
// - type ('text' | 'image' | 'video' | 'document')

interface WhatsAppMessage {
  // Add all properties here
}


// TODO: Implement MessageCache class
class MessageCache {
  // Use Record<string, WhatsAppMessage> for storage
  private cache: Record<string, WhatsAppMessage> = {};

  // Add a message to cache
  add(message: WhatsAppMessage): void {
    // Implement
  }

  // Get a message by ID
  get(id: string): WhatsAppMessage | undefined {
    // Implement
  }

  // Get multiple messages by IDs
  getMultiple(ids: string[]): WhatsAppMessage[] {
    // Implement - return only found messages
  }

  // Remove a message from cache
  remove(id: string): boolean {
    // Return true if removed, false if not found
  }

  // Clear all messages
  clear(): void {
    // Implement
  }

  // Get all messages with specific status
  getByStatus(status: WhatsAppMessage['status']): WhatsAppMessage[] {
    // Implement
  }

  // Get all messages of specific type
  getByType(type: WhatsAppMessage['type']): WhatsAppMessage[] {
    // Implement
  }

  // Count total messages in cache
  count(): number {
    // Implement
  }

  // Get all message IDs
  getIds(): string[] {
    // Implement
  }

  // Check if message exists
  has(id: string): boolean {
    // Implement
  }
}


// TODO: Implement StatusCounter class
// Count messages by status using Record
class StatusCounter {
  // Use Record to map status to count
  private counts: Record<WhatsAppMessage['status'], number> = {
    sent: 0,
    delivered: 0,
    read: 0
  };

  // Increment count for a status
  increment(status: WhatsAppMessage['status']): void {
    // Implement
  }

  // Get count for a status
  getCount(status: WhatsAppMessage['status']): number {
    // Implement
  }

  // Get all counts
  getAllCounts(): Record<WhatsAppMessage['status'], number> {
    // Implement
  }

  // Reset all counts
  reset(): void {
    // Implement
  }
}


// TODO: Test your implementation
// Example usage:
/*
const cache = new MessageCache();

cache.add({
  id: 'msg-1',
  from: '+1234567890',
  to: '+0987654321',
  body: 'Hello!',
  timestamp: Date.now(),
  status: 'sent',
  type: 'text'
});

cache.add({
  id: 'msg-2',
  from: '+1234567890',
  to: '+0987654321',
  body: 'How are you?',
  timestamp: Date.now(),
  status: 'delivered',
  type: 'text'
});

cache.add({
  id: 'msg-3',
  from: '+1234567890',
  to: '+0987654321',
  body: 'Check this image',
  timestamp: Date.now(),
  status: 'delivered',
  type: 'image'
});

console.log('Total messages:', cache.count());
console.log('Get msg-1:', cache.get('msg-1'));
console.log('Delivered messages:', cache.getByStatus('delivered'));
console.log('Image messages:', cache.getByType('image'));
console.log('Multiple messages:', cache.getMultiple(['msg-1', 'msg-3']));

cache.remove('msg-1');
console.log('After delete:', cache.count());

// Test StatusCounter
const counter = new StatusCounter();
counter.increment('sent');
counter.increment('sent');
counter.increment('delivered');
counter.increment('read');

console.log('Sent count:', counter.getCount('sent'));
console.log('All counts:', counter.getAllCounts());
*/
