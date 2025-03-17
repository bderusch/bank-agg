import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import AccountCard from "./AccountCard";

interface Account {
  id: string;
  bankName: string;
  bankLogo: string;
  accountType: string;
  accountNumber: string;
  balance: number;
  currency: string;
  status: "active" | "inactive" | "warning";
  lastUpdated: string;
}

interface AccountsListProps {
  accounts?: Account[];
  onAddAccount?: () => void;
}

const defaultAccounts: Account[] = [
  {
    id: "1",
    bankName: "Banco de Bogotá",
    bankLogo:
      "https://images.emojiterra.com/google/android-12l/512px/1f3e6.png",
    accountType: "Cuenta Corriente",
    accountNumber: "****4567",
    balance: 5249.75,
    currency: "USD",
    status: "active",
    lastUpdated: " hace 2 horas",
  },
  {
    id: "2",
    bankName: "Bancolombia",
    bankLogo:
      "https://images.emojiterra.com/google/android-12l/512px/1f3e6.png",
    accountType: "Cuenta de Ahorros",
    accountNumber: "****7890",
    balance: 12750.42,
    currency: "USD",
    status: "active",
    lastUpdated: "hace 1 día",
  },
  {
    id: "3",
    bankName: "Davivienda",
    bankLogo:
      "https://images.emojiterra.com/google/android-12l/512px/1f3e6.png",
    accountType: "Cuenta Corriente",
    accountNumber: "****2345",
    balance: -1250.3,
    currency: "USD",
    status: "active",
    lastUpdated: "hace cinco horas",
  },
  {
    id: "4",
    bankName: "Citibank",
    bankLogo:
      "https://images.emojiterra.com/google/android-12l/512px/1f3e6.png",
    accountType: "Investment Account",
    accountNumber: "****8901",
    balance: 34567.89,
    currency: "USD",
    status: "active",
    lastUpdated: "3 days ago",
  },
  {
    id: "5",
    bankName: "Capital One",
    bankLogo:
      "https://images.emojiterra.com/google/android-12l/512px/1f3e6.png",
    accountType: "Credit Card",
    accountNumber: "****3456",
    balance: -450.25,
    currency: "USD",
    status: "active",
    lastUpdated: "hace 12 horas",
  },
];

const AccountsList = ({
  accounts = defaultAccounts,
  onAddAccount = () => console.log("Add account clicked"),
}: AccountsListProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollAreaRef.current) {
      const newPosition = Math.max(0, scrollPosition - 300);
      scrollAreaRef.current.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (scrollAreaRef.current) {
      const maxScroll =
        scrollAreaRef.current.scrollWidth - scrollAreaRef.current.clientWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + 300);
      scrollAreaRef.current.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tus Cuentas</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            disabled={scrollPosition <= 0}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={onAddAccount}
            className="ml-2 flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            <span>Añadir Cuenta</span>
          </Button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollAreaRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex space-x-4 px-1">
            {accounts.map((account) => (
              <AccountCard
                key={account.id}
                bankName={account.bankName}
                bankLogo={account.bankLogo}
                accountType={account.accountType}
                accountNumber={account.accountNumber}
                balance={account.balance}
                currency={account.currency}
                status={account.status}
                lastUpdated={account.lastUpdated}
              />
            ))}
            <div
              className="flex items-center justify-center w-[300px] h-[180px] border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer"
              onClick={onAddAccount}
            >
              <div className="flex flex-col items-center text-gray-500">
                <PlusCircle className="h-10 w-10 mb-2" />
                <p className="font-medium">Añadir Nueva Cuenta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsList;
