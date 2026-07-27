// Exercise 4: Intersection Types
// Goal: Combine types with intersections

// TODO: Task 1 - Create three separate interfaces
// interface Identifiable {
//   id: string;
// }

// interface Timestamped {
//   createdAt: number;
//   updatedAt: number;
// }

// interface Message {
//   to: string;
//   text: string;
// }

// TODO: Task 2 - Create intersection type
// type TrackedMessage = Message & Identifiable & Timestamped;

// TODO: Task 3 - Create function that returns TrackedMessage
// function createTrackedMessage(to: string, text: string): TrackedMessage {
//   // Generate ID: "msg_" + random number
//   // Set createdAt and updatedAt to Date.now()
//   // Return object with all properties
// }

// Test your code (uncomment after implementation):
// const msg = createTrackedMessage("+923001234567", "Hello World");
// console.log("Tracked message:", msg);

// Expected Output (values will vary):
// Tracked message: {
//   id: "msg_12345",
//   to: "+923001234567",
//   text: "Hello World",
//   createdAt: 1234567890,
//   updatedAt: 1234567890
// }
