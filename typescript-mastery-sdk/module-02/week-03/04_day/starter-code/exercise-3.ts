/**
 * Day 18 - Exercise 3: Status Code Handler (Exclude/Extract)
 *
 * Task: Create HTTP status code handler using Exclude and Extract
 *
 * Requirements:
 * 1. Define HTTPStatusCode union with 10+ codes
 * 2. Use Extract to create SuccessCode type
 * 3. Use Exclude to create ErrorCode type
 * 4. Separate ClientErrorCode and ServerErrorCode
 * 5. Create ResponseHandler with type-safe handlers
 */

// TODO: Define HTTPStatusCode union
// Include at least:
// - Success: 200, 201, 204
// - Client errors: 400, 401, 403, 404
// - Server errors: 500, 502, 503

type HTTPStatusCode = // Define union here


// TODO: Use Extract to create SuccessCode type (2xx codes)
type SuccessCode = // Use Extract here


// TODO: Use Exclude to create ErrorCode type (non-2xx codes)
type ErrorCode = // Use Exclude here


// TODO: Use Extract to separate client errors (4xx)
type ClientErrorCode = // Use Extract here


// TODO: Use Exclude to get server errors (5xx) from ErrorCode
type ServerErrorCode = // Use Exclude here


// TODO: Define APIResponse interface
interface APIResponse<T = any> {
  // Add properties: status, data?, error?
}


// TODO: Implement ResponseHandler class
class ResponseHandler {
  // Handle any response
  handle(response: APIResponse): void {
    // Route to appropriate handler based on status
  }

  // Type guard for success codes
  private isSuccess(status: HTTPStatusCode): status is SuccessCode {
    // Check if status is 2xx
  }

  // Type guard for client errors
  private isClientError(status: HTTPStatusCode): status is ClientErrorCode {
    // Check if status is 4xx
  }

  // Type guard for server errors
  private isServerError(status: HTTPStatusCode): status is ServerErrorCode {
    // Check if status is 5xx
  }

  // Handle success responses
  private handleSuccess(response: APIResponse & { status: SuccessCode }): void {
    // Handle success
    console.log(`✅ Success ${response.status}`);
  }

  // Handle client error responses
  private handleClientError(response: APIResponse & { status: ClientErrorCode }): void {
    // Handle client error
    console.error(`❌ Client Error ${response.status}`);
  }

  // Handle server error responses
  private handleServerError(response: APIResponse & { status: ServerErrorCode }): void {
    // Handle server error
    console.error(`❌ Server Error ${response.status}`);
  }

  // Get status category
  getCategory(status: HTTPStatusCode): 'success' | 'client-error' | 'server-error' {
    // Return category based on status
  }

  // Check if status should trigger retry
  shouldRetry(status: HTTPStatusCode): boolean {
    // Server errors and some client errors are retryable
  }
}


// TODO: Test your implementation
// Example usage:
/*
const handler = new ResponseHandler();

handler.handle({ status: 200, data: { message: 'Success' } });
handler.handle({ status: 404, error: 'Not Found' });
handler.handle({ status: 500, error: 'Internal Server Error' });
handler.handle({ status: 201, data: { id: '123' } });
handler.handle({ status: 401, error: 'Unauthorized' });

console.log('Category of 200:', handler.getCategory(200));
console.log('Category of 404:', handler.getCategory(404));
console.log('Should retry 500?', handler.shouldRetry(500));
console.log('Should retry 404?', handler.shouldRetry(404));
*/
