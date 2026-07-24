// Exercise 5: Complex Union Pattern
// Goal: Build a complete API response pattern

// TODO: Task 1 - Create three state interfaces
// interface LoadingState {
//   status: "loading";
// }

// interface SuccessState {
//   status: "success";
//   data: {
//     messageId: string;
//     timestamp: number;
//   };
// }

// interface ErrorState {
//   status: "error";
//   error: {
//     code: string;
//     message: string;
//   };
// }

// TODO: Task 2 - Create union type
// type APIState = LoadingState | SuccessState | ErrorState;

// TODO: Task 3 - Create function handleState
// function handleState(state: APIState): string {
//   // Use switch on state.status
//   // Return appropriate message:
//   // - loading: "Loading..."
//   // - success: "Success! Message ID: {messageId}"
//   // - error: "Error: {code} - {message}"
// }

// TODO: Task 4 - Create type guard
// function isSuccessState(state: APIState): state is SuccessState {
//   // Return true if state.status === "success"
// }

// Test your code (uncomment after implementation):
// const loading: LoadingState = { status: "loading" };
// const success: SuccessState = {
//   status: "success",
//   data: { messageId: "wamid_123", timestamp: Date.now() }
// };
// const error: ErrorState = {
//   status: "error",
//   error: { code: "INVALID_PHONE", message: "Phone number invalid" }
// };

// console.log(handleState(loading));
// console.log(handleState(success));
// console.log(handleState(error));

// console.log("Is success?", isSuccessState(success));  // true
// console.log("Is success?", isSuccessState(loading));  // false

// Expected Output:
// Loading...
// Success! Message ID: wamid_123
// Error: INVALID_PHONE - Phone number invalid
// Is success? true
// Is success? false
