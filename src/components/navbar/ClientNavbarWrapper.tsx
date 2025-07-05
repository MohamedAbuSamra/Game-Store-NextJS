"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import React from "react";

const ClientNavbarWrapper = () => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    setShowNavbar(isAuthenticated);
  }, [pathname, isAuthenticated]);

  // Hide Navbar on /login
  if (pathname === "/login") return null;
  if (!showNavbar) return null;
  return <Navbar />;
};

export default React.memo(ClientNavbarWrapper); 