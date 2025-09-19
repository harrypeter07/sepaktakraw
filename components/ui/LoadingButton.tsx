"use client";
import React from "react";
import Spinner from "./Spinner";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  spinnerSize?: number;
};

export default function LoadingButton({ loading, spinnerSize = 18, children, disabled, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`inline-flex items-center justify-center gap-2 ${props.className ?? ""} ${
        loading || disabled ? "opacity-70" : ""
      }`}
    >
      {loading && <Spinner size={spinnerSize} />}
      <span>{children}</span>
    </button>
  );
}
