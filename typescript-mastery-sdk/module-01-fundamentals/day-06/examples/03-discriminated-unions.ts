// Example 3: Discriminated Unions
// Type-safe variant handling with discriminants

console.log("=== Basic Discriminated Union ===");

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Square | Rectangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

let circle: Circle = { kind: "circle", radius: 5 };
let square: Square = { kind: "square", side: 4 };
let rectangle: Rectangle = { kind: "rectangle", width: 5, height: 3 };

console.log("Circle area:", getArea(circle));
console.log("Square area:", getArea(square));
console.log("Rectangle area:", getArea(rectangle));

console.log("\n=== SDK Message Types ===");

interface TextMessage {
  type: "text";
  to: string;
  text: string;
}

interface ImageMessage {
  type: "image";
  to: string;
  imageId: string;
  caption?: string;
}

interface VideoMessage {
  type: "video";
  to: string;
  videoId: string;
  caption?: string;
}

interface AudioMessage {
  type: "audio";
  to: string;
  audioId: string;
}

type Message = TextMessage | ImageMessage | VideoMessage | AudioMessage;

function sendMessage(message: Message): string {
  const recipient = message.to;

  switch (message.type) {
    case "text":
      return `Sending text "${message.text}" to ${recipient}`;

    case "image":
      const imgCaption = message.caption ? ` with caption "${message.caption}"` : "";
      return `Sending image ${message.imageId} to ${recipient}${imgCaption}`;

    case "video":
      const vidCaption = message.caption ? ` with caption "${message.caption}"` : "";
      return `Sending video ${message.videoId} to ${recipient}${vidCaption}`;

    case "audio":
      return `Sending audio ${message.audioId} to ${recipient}`;
  }
}

let textMsg: TextMessage = {
  type: "text",
  to: "+923001234567",
  text: "Hello from TypeScript"
};

let imageMsg: ImageMessage = {
  type: "image",
  to: "+923001234567",
  imageId: "img_abc123",
  caption: "Check this out!"
};

let videoMsg: VideoMessage = {
  type: "video",
  to: "+923001234567",
  videoId: "vid_xyz789"
};

console.log(sendMessage(textMsg));
console.log(sendMessage(imageMsg));
console.log(sendMessage(videoMsg));

console.log("\n=== API Response Pattern ===");

interface LoadingResponse {
  status: "loading";
}

interface SuccessResponse {
  status: "success";
  data: {
    messageId: string;
    timestamp: number;
  };
}

interface ErrorResponse {
  status: "error";
  error: {
    code: string;
    message: string;
  };
}

type APIResponse = LoadingResponse | SuccessResponse | ErrorResponse;

function handleResponse(response: APIResponse): void {
  switch (response.status) {
    case "loading":
      console.log("⏳ Loading...");
      break;

    case "success":
      console.log("✅ Success!");
      console.log("Message ID:", response.data.messageId);
      console.log("Timestamp:", new Date(response.data.timestamp).toISOString());
      break;

    case "error":
      console.log("❌ Error!");
      console.log("Code:", response.error.code);
      console.log("Message:", response.error.message);
      break;
  }
}

handleResponse({ status: "loading" });
handleResponse({
  status: "success",
  data: { messageId: "wamid_123", timestamp: Date.now() }
});
handleResponse({
  status: "error",
  error: { code: "INVALID_PHONE", message: "Phone number is invalid" }
});

console.log("\n=== Exhaustiveness Checking ===");

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

function processShape(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      // If we add a new shape type and forget to handle it,
      // TypeScript will error here
      return assertNever(shape);
  }
}

console.log("Process circle:", processShape(circle));

console.log("\n=== Nested Discriminated Unions ===");

interface PaymentMethod {
  type: "payment";
  method: "card" | "cash" | "upi";
}

interface DeliveryMethod {
  type: "delivery";
  method: "pickup" | "home" | "office";
}

type OrderMethod = PaymentMethod | DeliveryMethod;

function describeMethod(method: OrderMethod): string {
  if (method.type === "payment") {
    return `Payment via ${method.method}`;
  } else {
    return `Delivery via ${method.method}`;
  }
}

console.log(describeMethod({ type: "payment", method: "card" }));
console.log(describeMethod({ type: "delivery", method: "home" }));

console.log("\n✅ Example 3 complete!");
