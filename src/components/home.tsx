import React, { useState } from "react";
import Header from "./dashboard/Header";
import AccountSummary from "./dashboard/AccountSummary";
import AccountsList from "./dashboard/AccountsList";
import FinancialCharts from "./dashboard/FinancialCharts";
import TransactionList from "./dashboard/TransactionList";
import NotificationCenter from "./dashboard/NotificationCenter";
import AccountManagement from "./dashboard/AccountManagement";
import PayablesReceivables from "./dashboard/PayablesReceivables";

// Default income data for charts
const defaultIncomeData = [
  { date: "Jan", salary: 4500, investments: 800, freelance: 1200, other: 300 },
  { date: "Feb", salary: 4500, investments: 850, freelance: 900, other: 200 },
  { date: "Mar", salary: 4500, investments: 900, freelance: 1500, other: 350 },
  { date: "Apr", salary: 4800, investments: 950, freelance: 1100, other: 250 },
  { date: "May", salary: 4800, investments: 1000, freelance: 1300, other: 400 },
  { date: "Jun", salary: 4800, investments: 1050, freelance: 1800, other: 300 },
];

// Default spending data for charts
const defaultSpendingData = {
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

const Home = () => {
  const [showAccountManagement, setShowAccountManagement] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  // Handler for adding a new account
  const handleAddAccount = () => {
    setShowAccountManagement(true);
  };

  // Handler for notification click
  const handleNotificationClick = () => {
    // In a real implementation, this would open the notification center
    console.log("Notification clicked");
  };

  // Handler for marking notifications as read
  const handleMarkAsRead = (id: string) => {
    // In a real implementation, this would mark a notification as read
    console.log(`Notification ${id} marked as read`);
    // Update notification count
    setNotificationCount(Math.max(0, notificationCount - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        notificationCount={notificationCount}
        onNotificationClick={handleNotificationClick}
        onAddAccountClick={handleAddAccount}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Account Summary Section */}
        <AccountSummary
          totalAssets={78450.25}
          totalLiabilities={24680.75}
          netWorth={53769.5}
          monthlyChange={1250.75}
          monthlyChangePercentage={2.38}
        />

        {/* Accounts List Section */}
        <AccountsList onAddAccount={handleAddAccount} />

        {/* Financial Charts Section */}
        <FinancialCharts
          spendingData={defaultSpendingData}
          incomeData={defaultIncomeData}
          timeRange="Last 6 Months"
          categories={[
            "All Categories",
            "Groceries",
            "Entertainment",
            "Utilities",
            "Dining Out",
            "Transportation",
            "Shopping",
          ]}
          incomeSources={[
            "All Sources",
            "Salary",
            "Investments",
            "Freelance",
            "Other",
          ]}
          incomeTimeRanges={[
            "Last 6 Months",
            "Last Year",
            "YTD",
            "Last 3 Years",
          ]}
        />

        {/* Payables and Receivables Section */}
        <PayablesReceivables />

        {/* Transaction List Section */}
        <TransactionList />
      </main>

      {/* Floating Notification Center */}
      <div className="fixed bottom-6 right-6 z-50">
        <NotificationCenter
          isOpen={false}
          onMarkAsRead={handleMarkAsRead}
          onViewAll={() => console.log("View all notifications")}
        />
      </div>

      {/* Account Management Modal */}
      <AccountManagement
        isOpen={showAccountManagement}
        onClose={() => setShowAccountManagement(false)}
      />
    </div>
  );
};

export default Home;
