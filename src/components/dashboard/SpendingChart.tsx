import React, { useState } from "react";
import {
  BarChart,
  LineChart,
  PieChart,
  ArrowUpDown,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SpendingChartProps {
  data?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }[];
  };
  timeRange?: string;
  categories?: string[];
}

const defaultData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Groceries",
      data: [400, 350, 500, 450, 470, 420],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    {
      label: "Entertainment",
      data: [200, 250, 180, 300, 220, 240],
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(153, 102, 255, 1)",
    },
    {
      label: "Utilities",
      data: [150, 160, 155, 140, 165, 170],
      backgroundColor: "rgba(255, 159, 64, 0.2)",
      borderColor: "rgba(255, 159, 64, 1)",
    },
  ],
};

const defaultCategories = [
  "Todas las Categorías",
  "Comestibles",
  "Entretenimiento",
  "Servicios",
  "Restaurantes",
  "Transporte",
  "Compras",
];

const defaultTimeRanges = [
  "Últimos 6 Meses",
  "Últimos 3 Meses",
  "Último Mes",
  "Última Semana",
  "Rango Personalizado",
];

const SpendingChart: React.FC<SpendingChartProps> = ({
  data = defaultData,
  timeRange = "Last 6 Months",
  categories = defaultCategories,
}) => {
  const [chartType, setChartType] = useState("bar");
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [selectedCategory, setSelectedCategory] = useState(
    "Todas las Categorías",
  );

  // Mock chart rendering - in a real implementation, you would use a charting library like recharts or chart.js
  const renderChart = () => {
    return (
      <div className="w-full h-64 bg-slate-100 rounded-md flex items-center justify-center">
        {chartType === "bar" && (
          <div className="flex flex-col items-center">
            <BarChart className="w-16 h-16 text-slate-500" />
            <p className="text-sm text-slate-500 mt-2">
              Visualización de Gráfico de Barras
            </p>
          </div>
        )}
        {chartType === "line" && (
          <div className="flex flex-col items-center">
            <LineChart className="w-16 h-16 text-slate-500" />
            <p className="text-sm text-slate-500 mt-2">
              Visualización de Gráfico de Líneas
            </p>
          </div>
        )}
        {chartType === "pie" && (
          <div className="flex flex-col items-center">
            <PieChart className="w-16 h-16 text-slate-500" />
            <p className="text-sm text-slate-500 mt-2">
              Visualización de Gráfico Circular
            </p>
          </div>
        )}
      </div>
    );
  };

  // Mock legend rendering
  const renderLegend = () => {
    return (
      <div className="flex flex-wrap gap-4 mt-4">
        {data.datasets.map((dataset, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-4 h-4 rounded-sm mr-2"
              style={{
                backgroundColor:
                  dataset.borderColor || `hsl(${index * 40}, 70%, 50%)`,
              }}
            />
            <span className="text-sm">{dataset.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Tendencias de Gastos</CardTitle>
            <CardDescription>
              Sigue tus patrones de gasto a lo largo del tiempo
            </CardDescription>
          </div>
          <Tabs
            defaultValue="bar"
            value={chartType}
            onValueChange={setChartType}
            className="w-auto"
          >
            <TabsList>
              <TabsTrigger value="bar" className="px-3 py-1">
                <BarChart className="h-4 w-4 mr-1" />
                Bar
              </TabsTrigger>
              <TabsTrigger value="line" className="px-3 py-1">
                <LineChart className="h-4 w-4 mr-1" />
                Line
              </TabsTrigger>
              <TabsTrigger value="pie" className="px-3 py-1">
                <PieChart className="h-4 w-4 mr-1" />
                Pie
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="w-48">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-48">
            <Select
              value={selectedTimeRange}
              onValueChange={setSelectedTimeRange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar rango de tiempo" />
              </SelectTrigger>
              <SelectContent>
                {defaultTimeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
            <Calendar className="h-4 w-4 mr-1" />
            Rango de Fechas Personalizado
          </button>
        </div>

        {renderChart()}
        {renderLegend()}

        <div className="mt-4">
          <div className="flex justify-between items-center text-sm text-slate-500">
            <span>
              Gasto Total:{" "}
              <span className="font-semibold text-slate-700">$2,835.00</span>
            </span>
            <button className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowUpDown className="h-4 w-4 mr-1" />
              Ordenar por Cantidad
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Ver Informe Detallado de Gastos
        </button>
      </CardFooter>
    </Card>
  );
};

export default SpendingChart;
