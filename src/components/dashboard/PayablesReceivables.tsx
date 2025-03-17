import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, ChevronDown, MoreHorizontal, Plus } from "lucide-react";

interface PayableReceivable {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "pendiente" | "pagado" | "vencido" | "parcial";
  entity: string;
  category: string;
}

interface PayablesReceivablesProps {
  payables?: PayableReceivable[];
  receivables?: PayableReceivable[];
  timeRanges?: string[];
}

const defaultPayables: PayableReceivable[] = [
  {
    id: "p1",
    description: "Alquiler de Oficina",
    amount: 1200,
    dueDate: "2023-07-01",
    status: "pendiente",
    entity: "Inmobiliaria Central",
    category: "Alquiler",
  },
  {
    id: "p2",
    description: "Factura de Electricidad",
    amount: 145.75,
    dueDate: "2023-06-25",
    status: "pendiente",
    entity: "Compañía Eléctrica",
    category: "Servicios",
  },
  {
    id: "p3",
    description: "Pago a Proveedor",
    amount: 850,
    dueDate: "2023-06-18",
    status: "vencido",
    entity: "Suministros ABC",
    category: "Inventario",
  },
  {
    id: "p4",
    description: "Seguro de Negocio",
    amount: 320.5,
    dueDate: "2023-07-10",
    status: "pendiente",
    entity: "Aseguradora Nacional",
    category: "Seguros",
  },
  {
    id: "p5",
    description: "Cuota de Préstamo",
    amount: 550,
    dueDate: "2023-06-30",
    status: "pendiente",
    entity: "Banco Principal",
    category: "Préstamos",
  },
];

const defaultReceivables: PayableReceivable[] = [
  {
    id: "r1",
    description: "Factura #1089",
    amount: 2500,
    dueDate: "2023-06-30",
    status: "pendiente",
    entity: "Cliente Corporativo A",
    category: "Servicios",
  },
  {
    id: "r2",
    description: "Factura #1090",
    amount: 1200,
    dueDate: "2023-06-15",
    status: "vencido",
    entity: "Cliente Minorista B",
    category: "Productos",
  },
  {
    id: "r3",
    description: "Factura #1091",
    amount: 3750,
    dueDate: "2023-07-10",
    status: "pendiente",
    entity: "Cliente Corporativo C",
    category: "Consultoría",
  },
  {
    id: "r4",
    description: "Factura #1092",
    amount: 800,
    dueDate: "2023-06-20",
    status: "parcial",
    entity: "Cliente Minorista D",
    category: "Productos",
  },
];

const defaultTimeRanges = [
  "Próximos 30 Días",
  "Próximos 60 Días",
  "Próximos 90 Días",
  "Todos",
];

const PayablesReceivables: React.FC<PayablesReceivablesProps> = ({
  payables = defaultPayables,
  receivables = defaultReceivables,
  timeRanges = defaultTimeRanges,
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[0]);
  const [activeTab, setActiveTab] = useState("por-pagar");

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendiente":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Pendiente
          </Badge>
        );
      case "pagado":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Pagado
          </Badge>
        );
      case "vencido":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Vencido
          </Badge>
        );
      case "parcial":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Pago Parcial
          </Badge>
        );
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  // Calculate totals
  const totalPayables = payables.reduce((sum, item) => sum + item.amount, 0);
  const totalReceivables = receivables.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  const totalOverdue = payables
    .filter((item) => item.status === "vencido")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalOverdueReceivables = receivables
    .filter((item) => item.status === "vencido")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle>Cuentas por Pagar y por Cobrar</CardTitle>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedTimeRange}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {timeRanges.map((range) => (
                  <DropdownMenuItem
                    key={range}
                    onClick={() => setSelectedTimeRange(range)}
                  >
                    {range}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="h-9">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border-blue-100">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-gray-500">
                Por Pagar Total
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(totalPayables)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {payables.length} facturas pendientes
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-red-100">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-gray-500">
                Por Pagar Vencido
              </p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {formatCurrency(totalOverdue)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {payables.filter((p) => p.status === "vencido").length} facturas
                vencidas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-100">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-gray-500">
                Por Cobrar Total
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(totalReceivables)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {receivables.length} facturas por cobrar
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-orange-100">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-gray-500">
                Por Cobrar Vencido
              </p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {formatCurrency(totalOverdueReceivables)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {receivables.filter((r) => r.status === "vencido").length}{" "}
                facturas vencidas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Payables and Receivables */}
        <Tabs
          defaultValue="por-pagar"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="por-pagar">Cuentas por Pagar</TabsTrigger>
            <TabsTrigger value="por-cobrar">Cuentas por Cobrar</TabsTrigger>
          </TabsList>

          {/* Payables Tab Content */}
          <TabsContent value="por-pagar" className="mt-0">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-slate-50">
                      <th className="px-4 py-3 text-left font-medium text-slate-500">
                        Descripción
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-slate-500">
                        Entidad
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-slate-500">
                        Categoría
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-slate-500">
                        Fecha de Vencimiento
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-slate-500">
                        Monto
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
                    {payables.map((payable) => (
                      <tr
                        key={payable.id}
                        className="border-b hover:bg-slate-50"
                      >
                        <td className="px-4 py-3 text-slate-700">
                          {payable.description}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {payable.entity}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="font-normal">
                            {payable.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {formatDate(payable.dueDate)}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-slate-700">
                          {formatCurrency(payable.amount)}
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(payable.status)}
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
                                Marcar como Pagado
                              </DropdownMenuItem>
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Receivables Tab Content */}
          <TabsContent value="por-cobrar" className="mt-0">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-slate-50">
                      <th className="px-4 py-3 text-left font-medium text-slate-500">
                        Descripción
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-slate-500">
                        Cliente
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-slate-500">
                        Categoría
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-slate-500">
                        Fecha de Vencimiento
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-slate-500">
                        Monto
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
                    {receivables.map((receivable) => (
                      <tr
                        key={receivable.id}
                        className="border-b hover:bg-slate-50"
                      >
                        <td className="px-4 py-3 text-slate-700">
                          {receivable.description}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {receivable.entity}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="font-normal">
                            {receivable.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {formatDate(receivable.dueDate)}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-slate-700">
                          {formatCurrency(receivable.amount)}
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(receivable.status)}
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
                                Marcar como Cobrado
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Registrar Pago Parcial
                              </DropdownMenuItem>
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PayablesReceivables;
