"use client";
import { useSearchParams, useRouter } from "next/navigation";
import View from "../../components/default/View";
import Skeleton from "../../components/base/Skeleton";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchTransaction } from "../../api/transactions";
import moment from "moment";

export default function TransactionPageClient() {
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransaction(id!),
    enabled: !!id,
  });

  return (
    <View>
      <div className="max-w-lg mx-auto bg-white dark:bg-secondary-900 rounded-xl shadow p-8 border border-primary-100 dark:border-primary-800 mt-12 print:mt-2 print:shadow-none print:border-0">
        <h1 className="text-2xl font-bold mb-4 text-center">Transaction Receipt</h1>
        {isLoading ? (
          <div className="flex flex-col gap-4 mt-6">
            <Skeleton width="w-1/2" />
            <Skeleton width="w-1/3" />
            <Skeleton width="w-2/3" />
          </div>
        ) : isError ? (
          <div className="text-error text-center font-semibold mt-8">Failed to load transaction. Please try again later.</div>
        ) : data ? (
          <div className="print:text-black">
            <div className="mb-2">
              <span className="font-bold">Order ID:</span> {data.order_id}
            </div>
            <div className="mb-2">
              <span className="font-bold">Date:</span> {moment(data.purchase_time).format("D MMMM YYYY, HH:mm")}
            </div>
            {data.user && (
              <div className="mb-2">
                <span className="font-bold">Buyer:</span> {data.user.username}
              </div>
            )}
            {data.product?.country?.name && (
              <div className="mb-2">
                <span className="font-bold">Country:</span> {data.product.country.name}
              </div>
            )}
            <div className="mb-2">
              <span className="font-bold">Total:</span> ${data.price}
            </div>
            <div className="mb-2">
              <span className="font-bold">Product:</span>
              <ul className="list-disc ml-6 mt-2">
                <li>
                  <span className="font-semibold">{data.product.title}</span> - ${data.product.price}
                </li>
              </ul>
            </div>
            <div className="mt-6 text-center print:hidden">
              <button
                className="px-4 py-2 rounded-lg bg-primary-500 text-white font-bold shadow hover:bg-primary-600 mr-4"
                onClick={() => window.print()}
              >
                Print / Save as PDF
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-secondary-500 text-white font-bold shadow hover:bg-secondary-600"
                onClick={() => router.push("/")}
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </View>
  );
} 