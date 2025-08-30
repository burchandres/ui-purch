import React from "react";

export const StickyHeader = ({ children }: { children?: React.ReactNode }) => (
  <div className="sticky top-0 p-3 pt-4 z-100 bg-background w-full">
    {children}
  </div>
);
