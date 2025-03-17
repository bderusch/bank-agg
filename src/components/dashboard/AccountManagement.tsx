import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  PlusCircle,
  Trash2,
  RefreshCw,
  Link,
  Building,
  CreditCard,
  Wallet,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";

interface AccountManagementProps {
  isOpen?: boolean;
  onClose?: () => void;
  connectedAccounts?: Account[];
}

interface Account {
  id: string;
  bankName: string;
  accountType: string;
  accountNumber: string;
  status: "active" | "pending" | "error";
  lastUpdated: string;
}

const defaultAccounts: Account[] = [
  {
    id: "1",
    bankName: "Chase Bank",
    accountType: "Checking",
    accountNumber: "****4567",
    status: "active",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    bankName: "Bank of America",
    accountType: "Savings",
    accountNumber: "****7890",
    status: "active",
    lastUpdated: "1 day ago",
  },
  {
    id: "3",
    bankName: "Wells Fargo",
    accountType: "Credit Card",
    accountNumber: "****2345",
    status: "error",
    lastUpdated: "3 days ago",
  },
];

const popularBanks = [
  {
    name: "Chase",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=chase",
  },
  {
    name: "Bank of America",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=boa",
  },
  {
    name: "Wells Fargo",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=wells",
  },
  {
    name: "Citibank",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=citi",
  },
  {
    name: "Capital One",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=capital",
  },
  {
    name: "TD Bank",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=td",
  },
];

const AccountManagement: React.FC<AccountManagementProps> = ({
  isOpen = true,
  onClose = () => {},
  connectedAccounts = defaultAccounts,
}) => {
  const [accounts, setAccounts] = useState<Account[]>(connectedAccounts);
  const [activeTab, setActiveTab] = useState("manage");
  const [addMethod, setAddMethod] = useState("api");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);

  const handleRemoveAccount = (id: string) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  const handleRefreshAccount = (id: string) => {
    // In a real implementation, this would trigger a refresh of account data
    console.log(`Refreshing account ${id}`);
  };

  const handleConnectBank = (bankName: string) => {
    setSelectedBank(bankName);
    setIsConnecting(true);

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setConnectionSuccess(true);

      // Add the new account to the list
      setTimeout(() => {
        const newAccount: Account = {
          id: `${accounts.length + 1}`,
          bankName: bankName,
          accountType: "Checking",
          accountNumber: `****${Math.floor(1000 + Math.random() * 9000)}`,
          status: "active",
          lastUpdated: "Just now",
        };

        setAccounts([...accounts, newAccount]);
        setConnectionSuccess(false);
        setSelectedBank(null);
        setActiveTab("manage");
      }, 1500);
    }, 2000);
  };

  const filteredBanks = popularBanks.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const renderManageContent = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Connected Accounts</h3>
        <Button
          onClick={() => setActiveTab("add")}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add Account
        </Button>
      </div>

      {accounts.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-slate-50">
          <p className="text-slate-500">No accounts connected yet</p>
          <Button
            variant="link"
            onClick={() => setActiveTab("add")}
            className="mt-2"
          >
            Connect your first account
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="flex justify-between items-center p-4 border rounded-md hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <Building className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="font-medium">{account.bankName}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">
                      {account.accountType}
                    </span>
                    <span className="text-sm text-slate-400">•</span>
                    <span className="text-sm text-slate-500">
                      {account.accountNumber}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {account.status === "active" && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Active
                    </span>
                  )}
                  {account.status === "error" && (
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Error
                    </span>
                  )}
                  {account.status === "pending" && (
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-1">
                      <RefreshCw className="h-3 w-3" />
                      Pending
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRefreshAccount(account.id)}
                  title="Refresh account data"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveAccount(account.id)}
                  title="Remove account"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAddContent = () => (
    <div className="space-y-4">
      <Tabs value={addMethod} onValueChange={setAddMethod}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="api" className="flex items-center gap-1">
            <Link className="h-4 w-4" />
            Connect via API
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center gap-1">
            <CreditCard className="h-4 w-4" />
            Manual Setup
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-4 mt-4">
          {selectedBank ? (
            <div className="space-y-4">
              {isConnecting ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 text-blue-500 mx-auto animate-spin" />
                  <p className="mt-4 font-medium">
                    Connecting to {selectedBank}...
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Please wait while we establish a secure connection
                  </p>
                </div>
              ) : connectionSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                  <p className="mt-4 font-medium text-lg">
                    Successfully Connected!
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Your {selectedBank} account has been linked
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBank(null)}
                    >
                      <ChevronRight className="h-4 w-4 rotate-180" />
                      Back
                    </Button>
                    <h3 className="text-lg font-medium">
                      Connect to {selectedBank}
                    </h3>
                  </div>

                  <div className="border rounded-md p-4 bg-slate-50">
                    <p className="text-sm">
                      You'll be redirected to {selectedBank}'s secure login page
                      to authorize access to your accounts.
                    </p>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedBank(null)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => handleConnectBank(selectedBank)}>
                      Continue to {selectedBank}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                placeholder="Search for your bank..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />

              <div className="grid grid-cols-2 gap-3">
                {filteredBanks.map((bank) => (
                  <div
                    key={bank.name}
                    className="border rounded-md p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50"
                    onClick={() => setSelectedBank(bank.name)}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100">
                      <img
                        src={bank.logo}
                        alt={bank.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{bank.name}</span>
                  </div>
                ))}
              </div>

              {filteredBanks.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-slate-500">
                    No banks found matching "{searchTerm}"
                  </p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-slate-500">
                  Don't see your bank?{" "}
                  <Button variant="link" className="p-0 h-auto">
                    View all supported institutions
                  </Button>
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="manual" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-slate-50">
              <p className="text-sm">
                Manually add your account details. This method doesn't provide
                automatic updates.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Bank Name</label>
                <Input placeholder="e.g. Chase Bank" />
              </div>

              <div>
                <label className="text-sm font-medium">Account Type</label>
                <Input placeholder="e.g. Checking, Savings, Credit Card" />
              </div>

              <div>
                <label className="text-sm font-medium">Account Number</label>
                <Input placeholder="e.g. ****1234" />
              </div>

              <div>
                <label className="text-sm font-medium">Current Balance</label>
                <Input placeholder="e.g. 1000.00" type="number" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setActiveTab("manage")}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // In a real implementation, this would validate and save the manual account
                  setActiveTab("manage");
                }}
              >
                Add Account
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Gestión de Cuentas
          </DialogTitle>
          <DialogDescription>
            Conecta, gestiona y actualiza tus cuentas financieras.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Gestionar Cuentas</TabsTrigger>
            <TabsTrigger value="add">Añadir Nueva Cuenta</TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="mt-4">
            {renderManageContent()}
          </TabsContent>

          <TabsContent value="add" className="mt-4">
            {renderAddContent()}
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between items-center border-t pt-4">
          <p className="text-xs text-slate-500">
            Tus datos están encriptados de forma segura
          </p>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountManagement;
