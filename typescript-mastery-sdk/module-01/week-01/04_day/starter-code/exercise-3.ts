// Exercise 3: Extending Interfaces

// TODO 1: Create base interface BaseMessage
// Properties:
// - to: string
// - type: string

interface BaseMessage {
    to: string
    type: string
}

// TODO 2: Create TextMessage extending BaseMessage
// Additional properties:
// - text: string
// - preview_url?: boolean (optional)

interface TextMessage extends BaseMessage {
    text: string
    preview_url?: boolean
}

// TODO 3: Create ImageMessage extending BaseMessage
// Additional properties:
// - imageId: string
// - caption?: string (optional)

interface ImageMessage extends BaseMessage {
    imageId: string
    caption?: string
}

// TODO 4: Create message objects
const textMsg: TextMessage = {
    to: '03121964939',
    type: 'text',
    text: "hello world"
};

const imageMsg: ImageMessage = {
    to: '03121964939',
    type: 'image',
    imageId: 'img_01'
};

// TODO: Test your interfaces
console.log("Text message:", textMsg);
console.log("Image message:", imageMsg);
