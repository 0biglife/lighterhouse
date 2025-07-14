"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
}

export default function Button({
  label,
  onClick,
  disabled,
  style,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "px-2 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-sm text-sm",
        disabled ? "opacity-50 cursor-default" : "cursor-pointer"
      )}
      style={{ ...style }}
    >
      {label}
    </button>
  );
}
