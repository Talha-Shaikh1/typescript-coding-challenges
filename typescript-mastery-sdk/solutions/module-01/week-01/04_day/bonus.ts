// Bonus Challenge: Webhook Payload Parser - SOLUTION

// WhatsApp webhook message structure
interface WebhookMessage {
  from: string;
  id: string;
  timestamp: string;
  text?: { body: string };
  image?: { id: string; mime_type: string };
}

// Webhook entry structure
interface WebhookEntry {
  id: string;
  changes: Array<{
    value: {
      messaging_product: string;
      metadata: { phone_number_id: string };
      messages?: WebhookMessage[];
    };
  }>;
}

// Complete webhook payload
interface WebhookPayload {
  object: string;
  entry: WebhookEntry[];
}

// Function to extract all messages from payload
function extractMessages(payload: WebhookPayload): WebhookMessage[] {
  const messages: WebhookMessage[] = [];

  // Iterate through entries
  for (const entry of payload.entry) {
    // Iterate through changes
    for (const change of entry.changes) {
      // Check if messages exist
      if (change.value.messages) {
        messages.push(...change.value.messages);
      }
    }
  }

  return messages;
}

// Function to extract phone number ID from payload
function extractPhoneNumberId(payload: WebhookPayload): string | null {
  if (payload.entry.length === 0) return null;
  if (payload.entry[0].changes.length === 0) return null;

  return payload.entry[0].changes[0].value.metadata.phone_number_id;
}

// Function to check if message is text
function isTextMessage(message: WebhookMessage): boolean {
  return message.text !== undefined;
}

// Function to check if message is image
function isImageMessage(message: WebhookMessage): boolean {
  return message.image !== undefined;
}

// Test with sample webhook payload
console.log("=== Bonus: Webhook Payload Parser ===\n");

const samplePayload: WebhookPayload = {
  object: "whatsapp_business_account",
  entry: [
    {
      id: "entry_123",
      changes: [
        {
          value: {
            messaging_product: "whatsapp",
            metadata: {
              phone_number_id: "phone_id_123"
            },
            messages: [
              {
                from: "+923001234567",
                id: "wamid_123",
                timestamp: "1234567890",
                text: { body: "Hello from customer!" }
              },
              {
                from: "+923001234568",
                id: "wamid_456",
                timestamp: "1234567891",
                image: {
                  id: "img_123",
                  mime_type: "image/jpeg"
                }
              }
            ]
          }
        }
      ]
    }
  ]
};

console.log("Sample webhook payload received\n");

const messages = extractMessages(samplePayload);
console.log(`Extracted ${messages.length} messages:\n`);

messages.forEach((msg, index) => {
  console.log(`Message ${index + 1}:`);
  console.log(`  From: ${msg.from}`);
  console.log(`  ID: ${msg.id}`);

  if (isTextMessage(msg)) {
    console.log(`  Type: Text`);
    console.log(`  Body: ${msg.text!.body}`);
  } else if (isImageMessage(msg)) {
    console.log(`  Type: Image`);
    console.log(`  Image ID: ${msg.image!.id}`);
    console.log(`  MIME Type: ${msg.image!.mime_type}`);
  }
  console.log();
});

const phoneNumberId = extractPhoneNumberId(samplePayload);
console.log(`Phone Number ID: ${phoneNumberId}`);

console.log("\n✅ This is exactly how Meta sends real webhook data!");
console.log("You're now ready to handle production webhooks! 🚀");
