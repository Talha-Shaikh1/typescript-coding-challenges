// Exercise 5: Message Queue System

// TODO 1: Create type alias QueuedMessage
// type QueuedMessage = {
//   id: string;
//   to: string;
//   text: string;
//   status: "pending" | "sending" | "sent" | "failed";
//   attempts: number;
// };

// TODO 2: Create MessageQueue class
// class MessageQueue {
//   private messages: QueuedMessage[] = [];
//
//   // Add new message with status "pending" and attempts 0
//   add(to: string, text: string): void {
//     const message: QueuedMessage = {
//       id: `msg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
//       to,
//       text,
//       status: "pending",
//       attempts: 0
//     };
//     this.messages.push(message);
//   }
//
//   // Return all messages with status "pending"
//   getPending(): QueuedMessage[] {
//
//   }
//
//   // Find message by id and update status to "sent"
//   markAsSent(id: string): void {
//     const message = this.messages.find(m => m.id === id);
//     if (message) {
//       message.status = "sent";
//     }
//   }
//
//   // Return [pending count, sent count, failed count]
//   getStats(): [number, number, number] {
//
//   }
// }

// TODO: Test your queue
// const queue = new MessageQueue();
// queue.add("+923001234567", "Message 1");
// queue.add("+923001234568", "Message 2");
// queue.add("+923001234569", "Message 3");
// console.log("Added 3 messages");

// const pending = queue.getPending();
// console.log("Pending:", pending.length);

// // Mark first message as sent
// if (pending.length > 0) {
//   queue.markAsSent(pending[0].id);
// }

// console.log("After sending: Pending:", queue.getPending().length);
// console.log("Stats:", queue.getStats());
