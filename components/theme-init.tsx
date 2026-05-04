"use client";

import { useEffect } from "react";
import { getTheme, setTheme } from "@/lib/theme";

export function ThemeInit() {
  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return null;
}
