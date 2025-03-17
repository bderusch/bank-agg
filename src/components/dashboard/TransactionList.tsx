import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Calendar,
  ChevronDown,
  Download,
  ArrowUpDown,
  Eye,
  FileText,
  MoreHorizontal,
  Tag,
  CreditCard,
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  account: string;
  status: "completed" | "pending" | "failed";
}

interface TransactionListProps {
  transactions?: Transaction[];
  categories?: string[];
  accounts?: string[];
  dateRanges?: string[];
}

const defaultTransactions: Transaction[] = [
  {
    id: "tx1",
    date: "2023-06-15",
    description: "Grocery Store",
    category: "Groceries",
    amount: 78.45,
    type: "expense",
    account: "Chase Checking",
    status: "completed",
  },
  {
    id: "tx2",
    date: "2023-06-14",
    description: "Monthly Salary",
    category: "Income",
    amount: 3500.0,
    type: "income",
    account: "Bank of America Checking",
    status: "completed",
  },
  {
    id: "tx3",
    date: "2023-06-13",
    description: "Coffee Shop",
    category: "Dining Out",
    amount: 5.75,
    type: "expense",
    account: "Chase Credit Card",
    status: "completed",
  },
  {
    id: "tx4",
    date: "2023-06-12",
    description: "Electric Bill",
    category: "Utilities",
    amount: 95.4,
    type: "expense",
    account: "Wells Fargo Checking",
    status: "pending",
  },
  {
    id: "tx5",
    date: "2023-06-10",
    description: "Online Shopping",
    category: "Shopping",
    amount: 124.99,
    type: "expense",
    account: "Citi Credit Card",
    status: "completed",
  },
  {
    id: "tx6",
    date: "2023-06-08",
    description: "Freelance Payment",
    category: "Income",
    amount: 850.0,
    type: "income",
    account: "Chase Checking",
    status: "completed",
  },
  {
    id: "tx7",
    date: "2023-06-07",
    description: "Gas Station",
    category: "Transportation",
    amount: 45.3,
    type: "expense",
    account: "Amex Credit Card",
    status: "failed",
  },
];

const defaultCategories = [
  "Todas las Categorías",
  "Comestibles",
  "Restaurantes",
  "Transporte",
  "Servicios",
  "Compras",
  "Entretenimiento",
  "Ingresos",
  "Vivienda",
  "Salud",
];

const defaultAccounts = [
  "Todas las Cuentas",
  "Chase Corriente",
  "Chase Tarjeta de Crédito",
  "Bank of America Corriente",
  "Wells Fargo Corriente",
  "Citi Tarjeta de Crédito",
  "Amex Tarjeta de Crédito",
];

const defaultDateRanges = [
  "Últimos 7 Días",
  "Últimos 30 Días",
  "Este Mes",
  "Mes Pasado",
  "Últimos 3 Meses",
  "Este Año",
  "Rango Personalizado",
];

const TransactionList: React.FC<TransactionListProps> = ({
  transactions = defaultTransactions,
  categories = defaultCategories,
  accounts = defaultAccounts,
  dateRanges = defaultDateRanges,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "Todas las Categorías",
  );
  const [selectedAccount, setSelectedAccount] = useState("Todas las Cuentas");
  const [selectedDateRange, setSelectedDateRange] = useState("Últimos 30 Días");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format currency
  const formatCurrency = (amount: number, type: "income" | "expense") => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

    return type === "income" ? formatted : `-${formatted}`;
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary">Completado</Badge>;
      case "pending":
        return <Badge variant="outline">Pendiente</Badge>;
      case "failed":
        return <Badge variant="destructive">Fallido</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter((transaction) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === "Todas las Categorías" ||
      transaction.category === selectedCategory;

    // Account filter
    const matchesAccount =
      selectedAccount === "Todas las Cuentas" ||
      transaction.account === selectedAccount;

    // Combine all filters
    return matchesSearch && matchesCategory && matchesAccount;
  });

  // Sort transactions by date
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
  });

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle>Historial de Transacciones</CardTitle>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Buscar transacciones..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex-1 min-w-[150px]">
            <Select
              value={selectedDateRange}
              onValueChange={setSelectedDateRange}
            >
              <SelectTrigger className="h-9">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Seleccionar rango de fechas" />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="h-9">
                <Tag className="mr-2 h-4 w-4" />
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
          <div className="flex-1 min-w-[150px]">
            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger className="h-9">
                <CreditCard className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Seleccionar cuenta" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account} value={account}>
                    {account}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 flex-shrink-0"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Categories");
              setSelectedAccount("All Accounts");
              setSelectedDateRange("Last 30 Days");
            }}
          >
            <Filter className="mr-2 h-4 w-4" />
            Restablecer Filtros
          </Button>
        </div>

        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    <button
                      className="flex items-center gap-1"
                      onClick={() =>
                        setSortDirection(
                          sortDirection === "asc" ? "desc" : "asc",
                        )
                      }
                    >
                      Fecha
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    Descripción
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    Categoría
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-500">
                    Cantidad
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    Cuenta
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-500">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedTransactions.length > 0 ? (
                  sortedTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 text-slate-700">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {transaction.description}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="font-normal">
                          {transaction.category}
                        </Badge>
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                      >
                        {formatCurrency(transaction.amount, transaction.type)}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {transaction.account}
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(transaction.status)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Exportar Recibo
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Reportar Problema
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No se encontraron transacciones que coincidan con tus
                      filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-slate-500">
          Mostrando {sortedTransactions.length} de {transactions.length}{" "}
          transacciones
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={sortedTransactions.length === 0}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={sortedTransactions.length === 0}
          >
            Siguiente
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TransactionList;
