// Exercise 5: Message Queue System - SOLUTION

// Task 1: Create QueuedMessage type
type QueuedMessage = {
  id: string;
  to: string;
  text: string;
  status: "pending" | "sending" | "sent" | "failed";
  attempts: number;
};

// Task 2: Create MessageQueue class
class MessageQueue {
  private messages: QueuedMessage[] = [];

  add(to: string, text: string): void {
    const message: QueuedMessage = {
      id: `msg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      to,
      text,
      status: "pending",
      attempts: 0
    };
    this.messages.push(message);
  }

  getPending(): QueuedMessage[] {
    return this.messages.filter(msg => msg.status === "pending");
  }

  markAsSent(id: string): void {
    const message = this.messages.find(msg => msg.id === id);
    if (message) {
      message.status = "sent";
      message.attempts++;
    }
  }

  getStats(): [number, number, number] {
    const pending = this.messages.filter(msg => msg.status === "pending").length;
    const sent = this.messages.filter(msg => msg.status === "sent").length;
    const failed = this.messages.filter(msg => msg.status === "failed").length;

    return [pending, sent, failed];
  }
}

// Test cases
console.log("=== Exercise 5: Message Queue System ===\n");

const queue = new MessageQueue();

// Add messages
queue.add("+923001234567", "Hello 1");
queue.add("+923001234568", "Hello 2");
queue.add("+923001234569", "Hello 3");
console.log("Added 3 messages");

// Check pending
const pending = queue.getPending();
console.log("Pending:", pending.length);
// Expected: Pending: 3

// Mark one as sent
const firstMessage = pending[0];
queue.markAsSent(firstMessage.id);

// Check stats
const [pendingCount, sentCount, failedCount] = queue.getStats();
console.log(`After sending: Pending: ${pendingCount}, Sent: ${sentCount}`);
// Expected: After sending: Pending: 2, Sent: 1

console.log(`Stats: [${pendingCount}, ${sentCount}, ${failedCount}]`);
// Expected: Stats: [2, 1, 0]
