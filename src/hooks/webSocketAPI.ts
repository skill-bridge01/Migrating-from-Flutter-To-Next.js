// class WebSocketAPI {
//   constructor() {
//     this.socket = null;
//     this.messageQueue = [];
//     this.isOpen = false;
//   }

//   connect(userId) {
//     if (this.socket !== null && this.isOpen) {
//       console.warn("WebSocket is already connected.");
//       return;
//     }

//     this.socket = new WebSocket(
//       `${process.env.NEXT_PUBLIC_WEB_SOCKET_URI}${userId}`,
//     );

//     this.socket.onopen = () => {
//       this.isOpen = true;
//       this.processQueue();
//       console.log("WebSocket connected.");
//     };

//     this.socket.onmessage = (event) => {
//       const message = event.data;
//       console.log("Received:", message);
//       this.handleMessage(JSON.parse(message));
//     };

//     this.socket.onclose = () => {
//       console.log("WebSocket disconnected.");
//       this.isOpen = false;
//       setTimeout(() => this.connect(userId), 2000); // Reconnect
//     };

//     this.socket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//       this.socket.close();
//     };
//   }

//   send(message) {
//     if (!this.isOpen) {
//       console.warn("WebSocket is not open. Queuing message.");
//       this.messageQueue.push(message);
//       return;
//     }

//     this.socket.send(JSON.stringify(message));
//   }

//   processQueue() {
//     while (this.messageQueue.length > 0 && this.isOpen) {
//       const message = this.messageQueue.shift();
//       this.send(message);
//     }
//   }

//   handleMessage(message) {
//     // const message1 = message.message;
//     if (message.type == "chat") {
//       // suggestion
//       console.log("message:", message.message);
//     }
//     if (message.type == "suggestion") {
//         // suggestion
//         console.log("suggestion:", message.message.split(",").length);
//       }
//     // if(message.)
//     // Implement based on your application's protocol
//     // console.log("Handle message:", message.message);
//   }

//   // Example usage
//   sendMessage(type, message) {
//     this.send({ type, message });
//   }
// }

// export const webSocketAPI = new WebSocketAPI();

type Message = {
    type: string;
    message: string;
  };
  
  class WebSocketAPI {
    private socket: WebSocket | null = null;
    private messageQueue: Message[] = [];
    private isOpen: boolean = false;
  
    connect(userId: string): void {
      if (this.socket !== null && this.isOpen) {
        console.warn("WebSocket is already connected.");
        return;
      }
  
      this.socket = new WebSocket(
        `${process.env.NEXT_PUBLIC_WEB_SOCKET_URI}${userId}`,
      );
  
      this.socket.onopen = (): void => {
        this.isOpen = true;
        this.processQueue();
        console.log("WebSocket connected.");
      };
  
      // this.socket.onmessage = (event): void => {
      //   const message = event.data;
      //   console.log("Received:", message);
      //   this.handleMessage(JSON.parse(message));
      // };
      this.socket.onmessage = (event): void => {
        const message = event.data;
        console.log("Received:", message);
    
        try {
            const parsedMessage = JSON.parse(message);
            this.handleMessage(parsedMessage);
        } catch (err) {
            console.error("Error parsing message JSON:", err);
            // Handle non-JSON message, if necessary
            // For example, if plain text messages are expected and can be processed
            this.handlePlainTextMessage(message);
        }
    };
  
      this.socket.onclose = (): void => {
        console.log("WebSocket disconnected.");
        this.isOpen = false;
        setTimeout(() => this.connect(userId), 1000); // Try to reconnect
      };
  
      this.socket.onerror = (error: Event): void => {
        console.error("WebSocket error:", error);
        if (this.socket) {
          this.socket.close();
        }
      };
    }
  
    send(message: Message): void {
      if (!this.isOpen) {
        console.warn("WebSocket is not open. Queuing message.");
        this.messageQueue.push(message);
        return;
      }
  
      if (this.socket) {
        this.socket.send(JSON.stringify(message));
      }
    }
  
    private processQueue(): void {
      while (this.messageQueue.length > 0 && this.isOpen) {
        const message = this.messageQueue.shift();
        if (message) {
          this.send(message);
        }
      }
    }

    handlePlainTextMessage(message: string): void {
      console.log("Received:", message);
    }
  
    handleMessage(message: any): void {
      // Example handling based on the message type
      if (message.type == "chat") {
        console.log("message:", message.message);
      }
      else if (message.type == "suggestion") {
        console.log("suggestion:", message.message.split(",").length);
      }
    }
  
    // Example usage
    sendMessage(type: string, message: string): void {
      this.send({ type, message });
    }
  }
  
  export const webSocketAPI = new WebSocketAPI();