import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  "aria-label"?: string;
}

const variantClasses: Record<string, string> = {
  primary: "bg-primary-500 hover:bg-primary-600 text-white",
  secondary: "bg-secondary-200 hover:bg-secondary-300 text-primary-800 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", "aria-label": ariaLabel, className = "", ...props }) => {
  return (
    <button
      className={`btn focus-visible:ring-2 focus-visible:ring-primary-400 ${variantClasses[variant] || ""} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 