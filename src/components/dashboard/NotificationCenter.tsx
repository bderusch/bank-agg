import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Bell,
  AlertCircle,
  CreditCard,
  Calendar,
  DollarSign,
  X,
  Check,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

interface NotificationItem {
  id: string;
  type: "alert" | "warning" | "reminder";
  title: string;
  message: string;
  time: string;
  read: boolean;
  account?: string;
  amount?: number;
  actionRequired?: boolean;
}

interface NotificationCenterProps {
  notifications?: NotificationItem[];
  onDismiss?: (id: string) => void;
  onMarkAsRead?: (id: string) => void;
  onViewAll?: () => void;
  isOpen?: boolean;
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "alert",
    title: "Unusual Activity Detected",
    message:
      "We noticed a large transaction of $1,500 on your Chase Credit Card.",
    time: "10 minutes ago",
    read: false,
    account: "Chase Credit Card",
    amount: 1500,
    actionRequired: true,
  },
  {
    id: "2",
    type: "warning",
    title: "Low Balance Alert",
    message: "Your checking account balance is below $100.",
    time: "1 hour ago",
    read: false,
    account: "Checking Account",
    amount: 85.42,
    actionRequired: false,
  },
  {
    id: "3",
    type: "reminder",
    title: "Upcoming Bill Payment",
    message: "Your electricity bill of $125.75 is due in 3 days.",
    time: "Yesterday",
    read: true,
    amount: 125.75,
    actionRequired: true,
  },
  {
    id: "4",
    type: "alert",
    title: "New Login Detected",
    message: "A new login was detected from an unrecognized device.",
    time: "2 days ago",
    read: true,
    actionRequired: true,
  },
  {
    id: "5",
    type: "warning",
    title: "Credit Score Change",
    message: "Your credit score has changed. Tap to view details.",
    time: "3 days ago",
    read: true,
    actionRequired: false,
  },
];

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications = defaultNotifications,
  onDismiss = () => {},
  onMarkAsRead = () => {},
  onViewAll = () => {},
  isOpen = true,
}) => {
  const [open, setOpen] = useState(isOpen);
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const unreadCount = localNotifications.filter((n) => !n.read).length;

  const handleDismiss = (id: string) => {
    setLocalNotifications(localNotifications.filter((n) => n.id !== id));
    onDismiss(id);
  };

  const handleMarkAsRead = (id: string) => {
    setLocalNotifications(
      localNotifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    onMarkAsRead(id);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <ShieldAlert className="h-5 w-5 text-amber-500" />;
      case "reminder":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative bg-white border-gray-200"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 bg-white" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="border-b pb-3 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Notificaciones</h3>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="rounded-full">
                  {unreadCount} Nuevas
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-[350px] overflow-y-auto">
            {localNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <Bell className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-gray-500">
                  No hay notificaciones en este momento
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {localNotifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? "bg-blue-50" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIconForType(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-sm">
                            {notification.title}
                          </p>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        {notification.account && (
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <CreditCard className="h-3.5 w-3.5 mr-1" />
                            <span>{notification.account}</span>
                          </div>
                        )}
                        {notification.amount && (
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <DollarSign className="h-3.5 w-3.5 mr-1" />
                            <span>
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(notification.amount)}
                            </span>
                          </div>
                        )}
                        {notification.actionRequired && (
                          <div className="flex mt-3 space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 text-xs"
                            >
                              <Check className="h-3.5 w-3.5 mr-1" />
                              Confirmar
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-xs"
                            >
                              <X className="h-3.5 w-3.5 mr-1" />
                              Descartar
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0 flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleDismiss(notification.id)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
          <CardFooter className="border-t p-3 flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => {
                setLocalNotifications(
                  localNotifications.map((n) => ({ ...n, read: true })),
                );
              }}
            >
              Marcar todo como leído
            </Button>
            <Button
              variant="link"
              size="sm"
              className="text-xs flex items-center"
              onClick={onViewAll}
            >
              Ver todo
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
