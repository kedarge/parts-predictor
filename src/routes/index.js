import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SharedLayout, ProtectedRoute } from "../pages";
import routes from "./list.routes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {routes &&
            routes.map(({ component, path, exact, isPrivate }) =>
              isPrivate ? (
                <Route
                  exact={exact ? "true" : undefined}
                  key={`${path}-route`}
                  path={path}
                  element={<ProtectedRoute>{component}</ProtectedRoute>}
                />
              ) : (
                <Route
                  exact={exact ? "true" : undefined}
                  key={`${path}-route`}
                  path={path}
                  element={component}
                />
              )
            )}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
