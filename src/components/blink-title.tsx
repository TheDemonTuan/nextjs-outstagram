import { SocketNotifications } from "@/stores/notification-store";
import React, { useState, useEffect } from "react";

interface BlinkingTitleProps {
  blinkingTitle: string;
  notifications: SocketNotifications[];
}

const BlinkingTitle: React.FC<BlinkingTitleProps> = ({ blinkingTitle, notifications }) => {
  const [isFocused, setIsFocused] = useState(true);
  const [currentTitle, setCurrentTitle] = useState(document.title);
  const blinkInterval = React.useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    const handleFocus = () => {
        setIsFocused(true);
    }
    const handleBlur = () => setIsFocused(false);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    if (!isFocused && notifications.length > 0) {
      blinkInterval.current = setInterval(() => {
        setCurrentTitle((prev) => (prev === document.title ? blinkingTitle : document.title));
      }, 1000);
    } else {
      if (blinkInterval) {
        clearInterval(blinkInterval.current);
      }
      setCurrentTitle(document.title);
    }

    return () => {
      if (blinkInterval) {
        clearInterval(blinkInterval.current);
      }
    };
  }, [isFocused, notifications, blinkingTitle]);

  useEffect(() => {
    if (notifications.length > 0) {
      document.title = currentTitle;
    } else {
      document.title = currentTitle;
    }
  }, [currentTitle, notifications]);

  return null;
};

export default BlinkingTitle;
