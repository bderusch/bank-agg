// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/deploy_node_server

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

interface FinancialData {
  spendingData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }[];
  };
  incomeData: {
    date: string;
    salary: number;
    investments: number;
    freelance: number;
    other: number;
  }[];
}

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    // Get the user ID from the request, if authenticated
    const { userId } = await req.json();

    // Create a Supabase client with the project URL and anon key
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // In a real implementation, you would fetch this data from your database
    // For now, we'll return mock data
    const mockFinancialData: FinancialData = {
      spendingData: {
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
      },
      incomeData: [
        {
          date: "Jan",
          salary: 4500,
          investments: 800,
          freelance: 1200,
          other: 300,
        },
        {
          date: "Feb",
          salary: 4500,
          investments: 850,
          freelance: 900,
          other: 200,
        },
        {
          date: "Mar",
          salary: 4500,
          investments: 900,
          freelance: 1500,
          other: 350,
        },
        {
          date: "Apr",
          salary: 4800,
          investments: 950,
          freelance: 1100,
          other: 250,
        },
        {
          date: "May",
          salary: 4800,
          investments: 1000,
          freelance: 1300,
          other: 400,
        },
        {
          date: "Jun",
          salary: 4800,
          investments: 1050,
          freelance: 1800,
          other: 300,
        },
      ],
    };

    // Return the financial data
    return new Response(JSON.stringify(mockFinancialData), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
});
