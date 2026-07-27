/**
 * Day 18 - Exercise 4: Message Type Router (Extract/Exclude)
 *
 * Task: Build a message routing system using Extract and Exclude
 *
 * Requirements:
 * 1. Define MessageType union with 8+ types
 * 2. Use Extract to create type categories
 * 3. Use Exclude to create complementary types
 * 4. Create MessageRouter with type-safe handlers
 */

// TODO: Define MessageType union
// Include at least:
// - Basic: text, location, contact
// - Media: image, video, audio, document
// - Interactive: buttons, list, template

type MessageType = // Define union here


// TODO: Use Extract to create MediaType
type MediaType = // Use Extract here


// TODO: Use Extract to create InteractiveType
type InteractiveType = // Use Extract here


// TODO: Use Exclude to create BasicType (non-media, non-interactive)
type BasicType = // Use Exclude here


// TODO: Define Message interface
interface Message<T extends MessageType = MessageType> {
  // Add properties: id, type, timestamp
}


// TODO: Define type-specific message interfaces
interface MediaMessage extends Message<MediaType> {
  // Add media-specific properties: mediaUrl, mediaSize, mimeType
}

interface InteractiveMessage extends Message<InteractiveType> {
  // Add interactive-specific properties
}

interface TextMessage extends Message<'text'> {
  // Add text-specific properties: body
}


// TODO: Type for message handlers
type MessageHandler<T extends MessageType = MessageType> = (message: Message<T>) => void;


// TODO: Implement MessageRouter class
class MessageRouter {
  private mediaHandlers: MessageHandler<MediaType>[] = [];
  private interactiveHandlers: MessageHandler<InteractiveType>[] = [];
  private basicHandlers: MessageHandler<BasicType>[] = [];

  // Register handler for media messages
  onMedia(handler: MessageHandler<MediaType>): void {
    // Add handler to mediaHandlers
  }

  // Register handler for interactive messages
  onInteractive(handler: MessageHandler<InteractiveType>): void {
    // Add handler to interactiveHandlers
  }

  // Register handler for basic messages
  onBasic(handler: MessageHandler<BasicType>): void {
    // Add handler to basicHandlers
  }

  // Route message to appropriate handlers
  route(message: Message): void {
    // Determine message category and call appropriate handlers
  }

  // Type guards
  private isMedia(type: MessageType): type is MediaType {
    // Check if type is media
  }

  private isInteractive(type: MessageType): type is InteractiveType {
    // Check if type is interactive
  }

  private isBasic(type: MessageType): type is BasicType {
    // Check if type is basic
  }

  // Get message category
  getCategory(type: MessageType): 'media' | 'interactive' | 'basic' {
    // Return category based on type
  }

  // Check if message requires download
  requiresDownload(type: MessageType): boolean {
    // Media messages require download
  }
}


// TODO: Test your implementation
// Example usage:
/*
const router = new MessageRouter();

router.onMedia((msg) => {
  console.log('📎 Media message:', msg.type);
});

router.onInteractive((msg) => {
  console.log('🔗 Interactive message:', msg.type);
});

router.onBasic((msg) => {
  console.log('💬 Basic message:', msg.type);
});

router.route({ id: '1', type: 'text', timestamp: Date.now() });
router.route({ id: '2', type: 'image', timestamp: Date.now() } as MediaMessage);
router.route({ id: '3', type: 'buttons', timestamp: Date.now() } as InteractiveMessage);

console.log('Category of image:', router.getCategory('image'));
console.log('Category of text:', router.getCategory('text'));
console.log('Requires download (video)?', router.requiresDownload('video'));
console.log('Requires download (text)?', router.requiresDownload('text'));
*/
