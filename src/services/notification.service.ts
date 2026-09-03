export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    read: boolean;
    createdAt: Date;
}

const notifications: Notification[] = [];

const notificationTypes = [
    "info",
    "success",
    "warning",
    "error",
] 

export const createNotification = async (
    userId: string, 
    title: string,
    message: string,
    type: Notification["type"] = "info"
): Promise<Notification> => {
    if(!notificationTypes.includes(type)) {
        throw new Error("Invalid notification type");
    }
    
    const notification: Notification = {
        id: crypto.randomUUID(),
        userId,
        title,
        message,
        type,
        read: false,
        createdAt: new Date(),
    };

    notifications.push(notification);

    return notification;
};

export const getUserNotifications = async (
    userId: string
): Promise<Notification[]> => {
    return notifications.filter(
        (notification) => notification.userId === userId
    );
};

export const markNotificationAsRead = async (
    notificationId: string,
    userId: string
): Promise<Notification | null> => {
    const notification = notifications.find(
        (notification) => 
            notification.id === notificationId &&
        notification.userId === userId
    );

    if (!notification) {
        return null;
    }

    notification.read = true;

    return notification;
}