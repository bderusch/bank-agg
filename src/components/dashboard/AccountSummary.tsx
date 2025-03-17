import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowUp, ArrowDown, DollarSign, Percent } from "lucide-react";

interface AccountSummaryProps {
  totalAssets?: number;
  totalLiabilities?: number;
  netWorth?: number;
  monthlyChange?: number;
  monthlyChangePercentage?: number;
  currency?: string;
}

const AccountSummary = ({
  totalAssets = 78450.25,
  totalLiabilities = 24680.75,
  netWorth = 53769.5,
  monthlyChange = 1250.75,
  monthlyChangePercentage = 2.38,
  currency = "USD",
}: AccountSummaryProps) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Determine if monthly change is positive or negative
  const isPositiveChange = monthlyChange >= 0;

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Resumen Financiero
        </h2>
        <p className="text-sm text-gray-500">Panorama de tu salud financiera</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Assets Card */}
        <Card className="bg-white border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Activos Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 p-2 rounded-full bg-green-50">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalAssets)}
                </p>
                <p className="text-xs text-gray-500">
                  Disponible en todas las cuentas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Liabilities Card */}
        <Card className="bg-white border-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pasivos Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 p-2 rounded-full bg-red-50">
                <DollarSign className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalLiabilities)}
                </p>
                <p className="text-xs text-gray-500">
                  Deudas y préstamos pendientes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Net Worth Card */}
        <Card className="bg-white border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Patrimonio Neto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 p-2 rounded-full bg-blue-50">
                <DollarSign className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(netWorth)}
                </p>
                <div className="flex items-center mt-1">
                  <div
                    className={`flex items-center ${isPositiveChange ? "text-green-500" : "text-red-500"}`}
                  >
                    {isPositiveChange ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    <span className="text-xs font-medium">
                      {formatCurrency(Math.abs(monthlyChange))}
                    </span>
                  </div>
                  <div
                    className={`flex items-center ml-2 ${isPositiveChange ? "text-green-500" : "text-red-500"}`}
                  >
                    <Percent className="h-3 w-3 mr-1" />
                    <span className="text-xs font-medium">
                      {Math.abs(monthlyChangePercentage).toFixed(2)}%
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 ml-1">este mes</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Health Indicator */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-gray-700">Salud Financiera</p>
          <p className="text-sm font-medium text-blue-600">Buena</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: "70%" }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Tu puntuación de salud financiera está por encima del promedio.
          Continúa aumentando tus ahorros y reduciendo deudas.
        </p>
      </div>
    </div>
  );
};

export default AccountSummary;
