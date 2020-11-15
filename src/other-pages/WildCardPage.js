import React from "react";
import { useLocation } from "react-router-dom";

export default function WildCardPage() {
  document.title = "404 Page";
  const location = useLocation();
  return (
    <div className="text-center mt-4">
      <h2>Error 404: Page not found 😔</h2>
      <p>
        The requested URL <code>{location.pathname}</code> is invalid.
      </p>
    </div>
  );
}
