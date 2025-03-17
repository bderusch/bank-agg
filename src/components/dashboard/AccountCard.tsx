import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  MoreHorizontal,
  ExternalLink,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

interface AccountCardProps {
  bankName?: string;
  bankLogo?: string;
  accountType?: string;
  accountNumber?: string;
  balance?: number;
  currency?: string;
  status?: "active" | "inactive" | "warning";
  lastUpdated?: string;
}

const AccountCard = ({
  bankName = "Bancolombia",
  bankLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Bancolombia_logo.svg/320px-Bancolombia_logo.svg.png",
  accountType = "Cuenta Corriente",
  accountNumber = "****4567",
  balance = 5249.75,
  currency = "COP",
  status = "active",
  lastUpdated = "2 horas atrás",
}: AccountCardProps) => {
  const [showBalance, setShowBalance] = useState(true);
  // Status indicator color
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-400";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  // Format currency
  const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  };

  return (
    <Card className="w-[300px] h-[180px] bg-white flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
            {bankLogo ? (
              <img
                src={bankLogo}
                alt={bankName}
                className="w-full h-full object-cover"
              />
            ) : (
              <CreditCard className="w-5 h-5 m-1.5 text-gray-500" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-sm">{bankName}</h3>
            <p className="text-xs text-gray-500">{accountType}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="py-2">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs text-gray-500">Cuenta {accountNumber}</p>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0"
              onClick={() => setShowBalance(!showBalance)}
              title={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
            >
              {showBalance ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
          <p className="font-semibold text-2xl">
            {showBalance ? formatCurrency(balance, currency) : "••••••"}
          </p>
        </div>
      </CardContent>

      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="flex items-center">
          {status === "warning" && (
            <Badge
              variant="destructive"
              className="mr-2 flex items-center gap-1"
            >
              <AlertCircle className="h-3 w-3" />
              <span>Alerta</span>
            </Badge>
          )}
          <p className="text-xs text-gray-500">Actualizado {lastUpdated}</p>
        </div>
        <Button variant="ghost" size="sm" className="p-0 h-7">
          <ExternalLink className="h-3.5 w-3.5 mr-1" />
          <span className="text-xs">Detalles</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountCard;
