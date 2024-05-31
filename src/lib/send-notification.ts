export const sendNotification = (title: string, body: string) => {
    new Notification(title, {
        body,
    });
};