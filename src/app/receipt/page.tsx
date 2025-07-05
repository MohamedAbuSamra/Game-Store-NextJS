'use client';
import View from "../../components/default/View";
import Skeleton from "../../components/base/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { Receipt } from "../../types";
import React from "react";

// Simulate API call (replace with real API call in the future)
const fetchReceipt = async (): Promise<Receipt> => {
  await new Promise((r) => setTimeout(r, 1200));
  return {
    id: "r1",
    date: "2024-06-01",
    total: 99.99,
    items: [
      { productId: "1", name: "Game 1", price: 29.99, quantity: 1 },
      { productId: "2", name: "Game 2", price: 49.99, quantity: 1 },
      { productId: "3", name: "Game 3", price: 19.99, quantity: 1 },
    ],
  };
};

export default function ReceiptPage() {
  const { data, isLoading, isError } = useQuery<Receipt>({
    queryKey: ["receipt"],
    queryFn: fetchReceipt,
  });

  return (
    <View>
      <h2>Receipt</h2>
      {isLoading ? (
        <div className="flex flex-col gap-4 mt-6">
          <Skeleton width="w-1/2" />
          <Skeleton width="w-1/3" />
          <Skeleton width="w-2/3" />
        </div>
      ) : isError ? (
        <div className="text-error text-center font-semibold mt-8">Failed to load receipt. Please try again later.</div>
      ) : data ? (
        <div className="mt-6 bg-white dark:bg-secondary-900 rounded-xl shadow p-6 border border-primary-100 dark:border-primary-800">
          <div className="mb-4">
            <span className="font-bold">Receipt ID:</span> {data.id}
          </div>
          <div className="mb-4">
            <span className="font-bold">Date:</span> {data.date}
          </div>
          <div className="mb-4">
            <span className="font-bold">Total:</span> ${data.total}
          </div>
          <div>
            <span className="font-bold">Items:</span>
            <ul className="list-disc ml-6 mt-2">
              {data.items.map((item) => (
                <li key={item.productId}>
                  {item.name} (x{item.quantity}) - ${item.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </View>
  );
} 