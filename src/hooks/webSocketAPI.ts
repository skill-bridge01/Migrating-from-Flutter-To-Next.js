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

      this.socket.onmessage = (event): void => {
        const message = event.data;
        console.log("Received:", message);
    
        try {
            const parsedMessage = JSON.parse(message);
            this.handleMessage(parsedMessage);
        } catch (err) {
            console.error("Error parsing message JSON:", err);
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