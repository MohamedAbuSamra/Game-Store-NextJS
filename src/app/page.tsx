'use client';
import View from "../components/default/View";
import Link from "next/link";
import AuthGuard from "../components/base/AuthGuard";
import ProductsPage from "./products/page";
import "../styles/tailwind.css";
export default function Home() {
  return (
    <AuthGuard>
      <ProductsPage />
    </AuthGuard>
  );
}
