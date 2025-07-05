"use client";
import React from "react";
import View from "../../components/default/View";
import Skeleton from "../../components/base/Skeleton";
import { fetchTransactions, Transaction } from "../../api/transactions";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function TransactionsPage() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    fetchTransactions()
      .then((data: Transaction[]) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError("Failed to load transactions");
        setLoading(false);
      });
  }, []);

  return (
    <View>
      <h1 className="text-2xl font-bold mb-6 text-center">My Transactions</h1>
      <div className="mb-4 text-center">
        <button
          className="px-4 py-2 rounded-lg bg-secondary-500 text-white font-bold shadow hover:bg-secondary-600"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </div>
      {loading ? (
        <div className="flex flex-col gap-4 mt-6">
          <Skeleton width="w-1/2" />
          <Skeleton width="w-1/3" />
          <Skeleton width="w-2/3" />
        </div>
      ) : error ? (
        <div className="text-error text-center font-semibold mt-8">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-secondary-900 rounded-xl shadow border border-primary-100 dark:border-primary-800">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Order ID</th>
                <th className="px-4 py-2 border-b">Product</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">No transactions found.</td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.order_id} className="hover:bg-primary-50 dark:hover:bg-primary-800 transition-colors">
                    <td className="px-4 py-2 border-b text-center">{tx.order_id}</td>
                    <td className="px-4 py-2 border-b text-center">{tx.product?.title}</td>
                    <td className="px-4 py-2 border-b text-center">${tx.price}</td>
                    <td className="px-4 py-2 border-b text-center">{moment(tx.purchase_time).format("D MMMM YYYY, HH:mm")}</td>
                    <td className="px-4 py-2 border-b text-center">
                      <button
                        className="px-3 py-1 rounded bg-primary-500 text-white font-bold hover:bg-primary-600"
                        onClick={() => window.open(`/transaction?id=${tx.order_id}`, "_blank")}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </View>
  );
} 