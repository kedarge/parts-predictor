import _isEmpty from "lodash/isEmpty";
import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SharedLayout } from "../pages";
// import { checkAuth } from "../store/actions/auth.actions";
import routes from "./list.routes";

function AppRoutes() {
  // const { profile } = useSelector(state => state.user);

  const profile = { status: "S" };
  // const dispatch = useDispatch();

  // useState(() => {
  //   dispatch(checkAuth());
  // });

  console.log("profile: ", profile)

  return (
    <BrowserRouter>
      {!_isEmpty(profile) ? (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            {routes &&
              routes.map(({ component, path, exact }) => (
                <Route
                  exact={exact}
                  key={`${path}-route`}
                  path={`${path}`}
                  element={component}
                />
              ))}
          </Route>
        </Routes>
      ) : (
        ""
      )}
    </BrowserRouter>
  );
}

export default AppRoutes;
