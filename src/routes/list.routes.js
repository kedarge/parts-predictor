import { Login, Predictor } from "../pages";
import { ROUTES } from "../utills/constants";

const routes = [
  {
    path: ROUTES.PREDICTOR.PATH,
    exact: true,
    displayName: ROUTES.PREDICTOR.TITLE,
    component: <Predictor />,
    isPrivate: true,
    icon: "",
    isDisabled: false,
    module: 0,
    action: visualViewport,
  },
  {
    path: ROUTES.LOGIN.PATH,
    exact: true,
    displayName: ROUTES.LOGIN.TITLE,
    component: <Login />,
    isPrivate: true,
    icon: "",
    isDisabled: false,
    module: 0,
    action: visualViewport,
  },
];

export default routes;
