type Message = {
  type: string;
  message: string;
};

type ReservationMessage = {
  type: string;
  message: string;
  webUserId: string;
  displayType: string;
  datetime: string;
};

class WebSocketAPI {
  private socket: WebSocket | null = null;
  private messageQueue: (Message | ReservationMessage)[] = [];
  private isOpen: boolean = false;
  private userId: string = '';
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  connect(userId: string): void {
    if (this.socket !== null && this.isOpen) {
      console.warn("WebSocket is already connected.");
      return;
    }
    this.userId = userId;
    this.createWebSocket();
  }

  private createWebSocket(): void {
    if (this.socket) {
      this.socket.close();
    }
    this.socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEB_SOCKET_URI}${this.userId}`,
    );
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onerror = this.onError.bind(this);
  }

  private onOpen(): void {
    this.isOpen = true;
    this.reconnectAttempts = 0;
    this.processQueue();
    console.log("WebSocket connected.");
  }

  private onMessage(event: MessageEvent): void {
    const message = event.data;
    console.log("Received:", message);
    try {
      const parsedMessage = JSON.parse(message);
      this.handleMessage(parsedMessage);
    } catch (err) {
      console.error("Error parsing message JSON:", err);
      this.handlePlainTextMessage(message);
    }
  }

  private onClose(event: CloseEvent): void {
    console.log("WebSocket disconnected.", event.reason);
    this.isOpen = false;
    this.reconnect();
  }

  private onError(error: Event): void {
    console.error("WebSocket error:", error);
    this.isOpen = false;
    if (this.socket) {
      this.socket.close();
    }
  }

  private reconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      console.log(`Attempting to reconnect in ${delay}ms (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      this.reconnectTimeout = setTimeout(() => this.createWebSocket(), delay);
    } else {
      console.error("Max reconnection attempts reached. Please refresh the page.");
    }
  }

  send(message: Message | ReservationMessage): void {
    if (!this.isOpen) {
      console.warn("WebSocket is not open. Queuing message.");
      this.messageQueue.push(message);
      return;
    }
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify(message));
      } catch (error) {
        console.error("Error sending message:", error);
        this.messageQueue.push(message);
        this.reconnect();
      }
    } else {
      console.warn("WebSocket is not in OPEN state. Queuing message.");
      this.messageQueue.push(message);
      this.reconnect();
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
    console.log("Received plain text:", message);
  }

  handleMessage(message: any): void {
    console.log("Received message:", message);
    switch (message.type) {
      case "chat":
        console.log("Chat message:", message.message);
        break;
      case "suggestion":
        console.log("Suggestion:", message.message.split(",").length);
        break;
      case "callback":
        console.log("Callback:", message.message);
        break;
      case "ping":
        console.log("Received ping");
        break;
      default:
        console.log("Unknown message type:", message.type);
    }
  }

  sendMessage(type: string, message: string): void {
    this.send({ type, message });
  }

  sendReservationMessage(type: string, message: string, displayType: string, datetime: string): void {
    const reservationMessage: ReservationMessage = {
      type,
      message,
      webUserId: this.userId,
      displayType,
      datetime
    };
    this.send(reservationMessage);
  }
}

export const webSocketAPI = new WebSocketAPI();