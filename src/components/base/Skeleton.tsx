import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = "w-full", height = "h-6", className = "" }) => (
  <div
    className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${width} ${height} ${className}`}
    style={{ minWidth: 40, minHeight: 16 }}
  />
);

export default Skeleton; 