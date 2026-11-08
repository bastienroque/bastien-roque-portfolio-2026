"use client";

import React from "react";
import { useMode } from "../providers/ModeProvider";

export const ChangeModeButton: React.FC = () => {
  const { resetMode } = useMode();
  return (
    <button
      type="button"
      onClick={resetMode}
      className="font-medium text-sm underline underline-offset-4 opacity-70 hover:opacity-100 min-h-11 px-2.5"
    >
      Dropped a stick? Count back in
    </button>
  );
};
