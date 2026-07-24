// Bonus Challenge: Priority Queue System - SOLUTION

type Priority = "low" | "normal" | "high";

type PriorityMessage = {
  id: string;
  to: string;
  text: string;
  priority: Priority;
};

class PriorityQueue {
  private messages: PriorityMessage[] = [];

  // Priority weights for sorting
  private getPriorityWeight(priority: Priority): number {
    switch (priority) {
      case "high": return 3;
      case "normal": return 2;
      case "low": return 1;
    }
  }

  add(to: string, text: string, priority: Priority = "normal"): void {
    const message: PriorityMessage = {
      id: `msg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      to,
      text,
      priority
    };
    this.messages.push(message);

    // Sort by priority after adding
    this.messages.sort((a, b) =>
      this.getPriorityWeight(b.priority) - this.getPriorityWeight(a.priority)
    );
  }

  getNext(): PriorityMessage | undefined {
    // Return and remove the highest priority message
    return this.messages.shift();
  }

  isEmpty(): boolean {
    return this.messages.length === 0;
  }

  size(): number {
    return this.messages.length;
  }

  peek(): PriorityMessage | undefined {
    // View next message without removing it
    return this.messages[0];
  }
}

// Test cases
console.log("=== Bonus: Priority Queue System ===\n");

const pQueue = new PriorityQueue();

// Add messages with different priorities
pQueue.add("+923001234567", "Normal message", "normal");
pQueue.add("+923001234568", "Urgent OTP!", "high");
pQueue.add("+923001234569", "Low priority ad", "low");
pQueue.add("+923001234570", "Critical alert!", "high");

console.log("Added 4 messages with mixed priorities");
console.log("Queue size:", pQueue.size());

// Process messages by priority
console.log("\nProcessing messages by priority:\n");

let count = 1;
while (!pQueue.isEmpty()) {
  const message = pQueue.getNext();
  if (message) {
    console.log(`${count}. [${message.priority.toUpperCase()}] ${message.text} → ${message.to}`);
    count++;
  }
}

console.log("\n✅ High priority messages processed first!");
console.log("This is perfect for OTPs, alerts, and urgent notifications!");
