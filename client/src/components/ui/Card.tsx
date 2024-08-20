import React from "react";

interface CardProps {
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
}

const Card = ({ children, width, height }: CardProps) => {
  return (
    <div
      className="bg-[--foreground-color] rounded-lg shadow-lg p-6 w-fit"
      style={{ width, height }}
    >
      {children}
    </div>
  );
};

export default Card;
