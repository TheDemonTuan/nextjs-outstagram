import { useEffect } from "react";

export const useNotification = () => {
	useEffect(() => {
		if (!("Notification" in window)) {
			console.log("This browser does not support notifications.");
			return;
		}

		if (Notification.permission !== 'granted') {
			Notification.requestPermission().then((permission) => {
				if (permission === 'granted') {
					console.log("Permission granted");
				}
			}).catch((err) => {
				console.log(err);
			});
		}
	}, []);
};