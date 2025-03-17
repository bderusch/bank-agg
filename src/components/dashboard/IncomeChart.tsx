import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface IncomeChartProps {
  data?: IncomeData[];
  sources?: string[];
  timeRanges?: string[];
}

interface IncomeData {
  date: string;
  salary: number;
  investments: number;
  freelance: number;
  other: number;
}

const defaultData: IncomeData[] = [
  { date: "Jan", salary: 4500, investments: 800, freelance: 1200, other: 300 },
  { date: "Feb", salary: 4500, investments: 850, freelance: 900, other: 200 },
  { date: "Mar", salary: 4500, investments: 900, freelance: 1500, other: 350 },
  { date: "Apr", salary: 4800, investments: 950, freelance: 1100, other: 250 },
  { date: "May", salary: 4800, investments: 1000, freelance: 1300, other: 400 },
  { date: "Jun", salary: 4800, investments: 1050, freelance: 1800, other: 300 },
];

const defaultSources = [
  "Todas las Fuentes",
  "Salario",
  "Inversiones",
  "Autónomo",
  "Otros",
];
const defaultTimeRanges = [
  "Últimos 6 Meses",
  "Último Año",
  "Año Actual",
  "Últimos 3 Años",
];

const IncomeChart = ({
  data = defaultData,
  sources = defaultSources,
  timeRanges = defaultTimeRanges,
}: IncomeChartProps) => {
  const [selectedSource, setSelectedSource] = useState("Todas las Fuentes");
  const [selectedTimeRange, setSelectedTimeRange] = useState("Últimos 6 Meses");

  // Colors for different income sources
  const colors = {
    salary: "#4f46e5",
    investments: "#10b981",
    freelance: "#f59e0b",
    other: "#8b5cf6",
  };

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-medium">
            Ingresos a lo Largo del Tiempo
          </CardTitle>
          <div className="flex space-x-2">
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedTimeRange}
              onValueChange={setSelectedTimeRange}
            >
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={colors.salary}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors.salary}
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient
                  id="colorInvestments"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={colors.investments}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors.investments}
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="colorFreelance" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={colors.freelance}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors.freelance}
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="colorOther" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={colors.other}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors.other}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`${value}`, ""]}
                labelFormatter={(label) => `Fecha: ${label}`}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              {(selectedSource === "Todas las Fuentes" ||
                selectedSource === "Salario") && (
                <Area
                  type="monotone"
                  dataKey="salary"
                  stroke={colors.salary}
                  fillOpacity={1}
                  fill="url(#colorSalary)"
                  name="Salario"
                />
              )}
              {(selectedSource === "Todas las Fuentes" ||
                selectedSource === "Inversiones") && (
                <Area
                  type="monotone"
                  dataKey="investments"
                  stroke={colors.investments}
                  fillOpacity={1}
                  fill="url(#colorInvestments)"
                  name="Inversiones"
                />
              )}
              {(selectedSource === "Todas las Fuentes" ||
                selectedSource === "Autónomo") && (
                <Area
                  type="monotone"
                  dataKey="freelance"
                  stroke={colors.freelance}
                  fillOpacity={1}
                  fill="url(#colorFreelance)"
                  name="Autónomo"
                />
              )}
              {(selectedSource === "Todas las Fuentes" ||
                selectedSource === "Otros") && (
                <Area
                  type="monotone"
                  dataKey="other"
                  stroke={colors.other}
                  fillOpacity={1}
                  fill="url(#colorOther)"
                  name="Otros"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeChart;
