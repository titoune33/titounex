"use client";

import React from "react";

export function Toaster() {
  return null;
}

export const toast = {
  success: (msg: string) => console.log("✅", msg),
  error: (msg: string) => console.error("❌", msg),
  info: (msg: string) => console.log("ℹ️", msg),
  warning: (msg: string) => console.warn("⚠️", msg),
};
