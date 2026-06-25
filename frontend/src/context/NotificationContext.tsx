import React, { createContext, useContext, useState } from "react";
import SnackBarNotification from "../components/Notification/SnackBarNotification";

type Severity = "success" | "error" | "warning" | "info";

type NotificationState ={
    open: boolean;
    message: string;
    severity: Severity;
};

type NotificationContextType = {
    notify : (message: string, severity: Severity) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notification, setNotification] = useState<NotificationState>({
        open: false,
        message: "",
        severity: "info",
    });

    const notify = (message: string, severity: Severity) => {
        setNotification({ open: true, message, severity });
    };
    
    const handleClose = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}

            <SnackBarNotification
              open={notification.open}
              message={notification.message}
              severity={notification.severity}
              onClose={handleClose}
            />
        </NotificationContext.Provider>
    );
}
