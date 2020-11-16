import React from "react";
import { useLocation } from "react-router-dom";

// simple error page or rather a redirection page
export default function WildCardPage() {
  document.title = "404 Page";
  const location = useLocation();
  return (
    <div className="text-center mt-4">
      <h2>Aww Snap Error 404: Page not found 😔</h2>
      <p>
        The requested URL <code>{location.pathname}</code> is invalid.
      </p>
    </div>
  );
}
