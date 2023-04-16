import WebSocket from 'ws';

// Define message type
type Message = {
  method: 'create' | 'read' | 'update' | 'delete';
  data: any;
};

// Set up WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Define CRUD methods
const methods = {
  create: (message: string) => {
    // Store message in database
    console.log(`New message created: ${message}`);

    // Notify all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        const msg: Message = { method: 'create', data: message };
        client.send(JSON.stringify(msg));
      }
    });
  },

  read: (messageId: number) => {
    // Update message read status in database
    console.log(`Message ${messageId} read`);

    // Notify all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        const msg: Message = { method: 'read', data: messageId };
        client.send(JSON.stringify(msg));
      }
    });
  },

  update: (messageId: number, newMessage: string) => {
    // Update message in database
    console.log(`Message ${messageId} updated to: ${newMessage}`);

    // Notify all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        const msg: Message = { method: 'update', data: { messageId, newMessage } };
        client.send(JSON.stringify(msg));
      }
    });
  },

  delete: (messageId: number) => {
    // Delete message from database
    console.log(`Message ${messageId} deleted`);

    // Notify all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        const msg: Message = { method: 'delete', data: messageId };
        client.send(JSON.stringify(msg));
      }
    });
  },
};

// Listen for WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Listen for incoming messages
  ws.on('message', (message: string) => {
    const { method, data } = JSON.parse(message);

    // Call appropriate CRUD method
    if (methods[method]) {
      methods[method](...data);
    }
  });
});
