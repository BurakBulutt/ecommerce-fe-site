import addNotification from "react-push-notification";

export class NotificationManager {
    static handleNotification(notification) {
        addNotification({
            title: notification?.title,
            subtitle: notification?.subTitle,
            message: notification?.message,
            theme: 'darkblue',
            native: true,
            duration : 10000
        });
    }
}