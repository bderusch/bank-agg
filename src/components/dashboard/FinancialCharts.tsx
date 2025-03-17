import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import SpendingChart from "./SpendingChart";
import IncomeChart from "./IncomeChart";

interface FinancialChartsProps {
  spendingData?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }[];
  };
  incomeData?: {
    date: string;
    salary: number;
    investments: number;
    freelance: number;
    other: number;
  }[];
  timeRange?: string;
  categories?: string[];
  incomeSources?: string[];
  incomeTimeRanges?: string[];
}

// Default spending data to use when API data is not available
const defaultSpendingData = {
  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
  datasets: [
    {
      label: "Comestibles",
      data: [400, 350, 500, 450, 470, 420],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    {
      label: "Entretenimiento",
      data: [200, 250, 180, 300, 220, 240],
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(153, 102, 255, 1)",
    },
    {
      label: "Servicios",
      data: [150, 160, 155, 140, 165, 170],
      backgroundColor: "rgba(255, 159, 64, 0.2)",
      borderColor: "rgba(255, 159, 64, 1)",
    },
  ],
};

// Default income data to use when API data is not available
const defaultIncomeData = [
  { date: "Ene", salary: 4500, investments: 800, freelance: 1200, other: 300 },
  { date: "Feb", salary: 4500, investments: 850, freelance: 900, other: 200 },
  { date: "Mar", salary: 4500, investments: 900, freelance: 1500, other: 350 },
  { date: "Abr", salary: 4800, investments: 950, freelance: 1100, other: 250 },
  { date: "May", salary: 4800, investments: 1000, freelance: 1300, other: 400 },
  { date: "Jun", salary: 4800, investments: 1050, freelance: 1800, other: 300 },
];

const FinancialCharts: React.FC<FinancialChartsProps> = ({
  spendingData: initialSpendingData,
  incomeData: initialIncomeData,
  timeRange = "Últimos 6 Meses",
  categories = [
    "Todas las Categorías",
    "Comestibles",
    "Entretenimiento",
    "Servicios",
    "Restaurantes",
    "Transporte",
    "Compras",
  ],
  incomeSources = [
    "Todas las Fuentes",
    "Salario",
    "Inversiones",
    "Autónomo",
    "Otros",
  ],
  incomeTimeRanges = [
    "Últimos 6 Meses",
    "Último Año",
    "Año Actual",
    "Últimos 3 Años",
  ],
}) => {
  const [spendingData, setSpendingData] = useState(
    initialSpendingData || defaultSpendingData,
  );
  const [incomeData, setIncomeData] = useState(
    initialIncomeData || defaultIncomeData,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Use default data for now
        setSpendingData(defaultSpendingData);
        setIncomeData(defaultIncomeData);
      } catch (err) {
        console.error("Error fetching financial data:", err);
        setError(
          "Error al cargar datos financieros. Por favor, inténtelo de nuevo más tarde.",
        );
        // Use default data if API fails
        if (!spendingData) setSpendingData(defaultSpendingData);
        if (!incomeData) setIncomeData(defaultIncomeData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFinancialData();
  }, []);

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardContent className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red-500">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <SpendingChart
                data={spendingData}
                timeRange={timeRange}
                categories={categories}
              />
            </div>
            <div className="w-full">
              <IncomeChart
                data={incomeData}
                sources={incomeSources}
                timeRanges={incomeTimeRanges}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialCharts;
