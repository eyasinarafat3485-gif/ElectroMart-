"use client";

import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 gap-6">
        <Spinner size="lg" color="primary" />

        <h2 className="text-2xl font-semibold text-white animate-pulse">
          Loading...
        </h2>

        <p className="text-slate-400">
          Please wait while we fetch the latest products.
        </p>
      </div>
    );
  }

  return null;
}