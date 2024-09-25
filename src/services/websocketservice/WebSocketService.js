import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export class WebSocketService {
    constructor() {
        this.stompClient = null;
    }

    connect() {
        const socketUrl = 'http://localhost:8080/ws';
        this.stompClient = Stomp.over(() => new SockJS(socketUrl));

        this.stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            this.subscribeToNotifications();
        }, (error) => {
            console.error('Connection error: ', error);
        });
    }

    subscribeToNotifications() {
        this.stompClient.subscribe('/topic/notifications', (message) => {
            this.handleMessage(message);
        });
    }

    handleMessage(message) {
        const notification = JSON.parse(message.body);
        console.log('New notification received: ', notification);
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            console.log('Disconnected');
        }
    }
}
