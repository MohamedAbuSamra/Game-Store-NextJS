"use client";
import React, { useState } from "react";
import View from "../../components/default/View";
import Skeleton from "../../components/base/Skeleton";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types";
import ProductCard from "../../components/products-list/ProductCard";
import CountrySelect from "../../components/products-list/CountrySelect";
import { fetchProducts } from "../../api/products";

const LIMIT = 15; // 5 per row, 3 rows per page

// Normalize location for API: '', 'all', or 'null' (case-insensitive) => 'all'
const normalizeLocation = (location: string) => {
  if (!location || location.toLowerCase() === "all" || location.toLowerCase() === "null") {
    return "all";
  }
  return location;
};

export default function ProductListPage() {
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState("JO");
  const skip = (page - 1) * LIMIT;

  // Fetch products and count in one call
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<{ items: Product[]; count: number }>({
    queryKey: ["products", skip, LIMIT, country],
    queryFn: () => fetchProducts(skip, LIMIT, country),
    enabled: country !== undefined,
  });

  // Reset to page 1 when country changes
  React.useEffect(() => {
    setPage(1);
  }, [country]);

  const totalCount = data?.count || 0;
  const products = data?.items || [];
  const totalPages = Math.ceil(totalCount / LIMIT) || 1;
  const startIdx = totalCount === 0 ? 0 : skip + 1;
  const endIdx = Math.min(skip + LIMIT, totalCount);

  // Subtle animated background
  const AnimatedBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-accent-100 to-primary-200 dark:from-primary-900 dark:via-accent-900 dark:to-primary-800 animate-gradient-x bg-[length:200%_200%] opacity-60" style={{ filter: 'blur(16px)' }} />
      <div className="absolute left-1/4 top-1/4 w-[320px] h-[320px] bg-accent-200 dark:bg-accent-700 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute right-1/4 bottom-1/4 w-[220px] h-[220px] bg-primary-200 dark:bg-primary-700 opacity-10 rounded-full blur-2xl animate-pulse" />
    </div>
  );

  // Top/bottom controls layout
  const Controls = (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
      <div className="flex items-center gap-4">
        <CountrySelect value={country} onChange={setCountry} />
        <span className="text-sm text-secondary-700 dark:text-secondary-200">
          {isLoading ? "Loading products..." : `Showing ${startIdx}–${endIdx} of ${totalCount} products`}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 rounded-lg border border-primary-400 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-200 font-bold shadow hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || isLoading || isFetching}
        >
          Previous
        </button>
        <span className="font-mono text-primary-700 dark:text-primary-200">
          Page {page} / {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded-lg border border-primary-400 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-200 font-bold shadow hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={isLoading || isFetching || page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <View>
      <AnimatedBackground />
      <div className="mt-20 mb-2 text-primary-700 dark:text-primary-200 text-sm font-semibold bg-primary-50 dark:bg-primary-900 rounded-lg px-4 py-2 shadow-sm flex items-center gap-2">
        <span role="img" aria-label="info">🌍</span>
        Based on your browser's country, we're showing products for your location. Feel free to change it!
      </div>
      {Controls}
      <h2 className="text-2xl font-bold mb-4">Your Games Inventory Items Shop</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        {(isLoading || isFetching)
          ? Array.from({ length: LIMIT }).map((_, i) => {
              const skeletonShapes = [
                { height: "h-40", width1: "w-2/3", width2: "w-1/2", width3: "w-1/3" },
                { height: "h-36", width1: "w-1/2", width2: "w-2/3", width3: "w-1/4" },
                { height: "h-44", width1: "w-3/4", width2: "w-1/3", width3: "w-1/2" },
                { height: "h-40", width1: "w-1/3", width2: "w-1/2", width3: "w-2/3" },
                { height: "h-32", width1: "w-2/3", width2: "w-1/4", width3: "w-1/2" },
              ];
              const shape = skeletonShapes[i % 5];
              return (
                <div
                  key={i}
                  className="p-4 bg-white dark:bg-secondary-900 rounded-xl shadow border border-primary-100 dark:border-primary-800 flex flex-col gap-2"
                >
                  <Skeleton height={shape.height} />
                  <Skeleton width={shape.width1} />
                  <Skeleton width={shape.width2} />
                  <Skeleton width={shape.width3} />
                </div>
              );
            })
          : isError ? (
              <div className="col-span-full text-error text-center font-semibold mt-8">
                Failed to load products. <button className="underline" onClick={() => refetch()}>Retry</button>
              </div>
            ) : products && products.length > 0 ? (
              products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-secondary-700 dark:text-secondary-200">
                No products found.
              </div>
            )}
      </div>
      {/* Bottom controls */}
      <div className="mt-8">{Controls}</div>
    </View>
  );
} 