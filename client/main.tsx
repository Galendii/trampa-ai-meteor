import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "/imports/ui/router";
import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  if (!container) return;
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw-workbox.js")
        .then((registration) => {
          console.log("ServiceWorker registered: ", registration);
        })
        .catch((error) => {
          console.log("ServiceWorker registration failed: ", error);
        });
    });
  }

  createRoot(container).render(
    <React.StrictMode>
      <Suspense
        fallback={<div className="p-6 text-center">Loading App...</div>}
      >
        <RouterProvider router={router} />
      </Suspense>
    </React.StrictMode>
  );
});
