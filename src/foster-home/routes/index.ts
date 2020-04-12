import HouseIcon from "@material-ui/icons/House";
import EditIcon from "@material-ui/icons/Edit";

import Route from "@core/models/route";
import createRoute from "@core/utils/createRoute";
import { ADMIN_DASHBOARD_ROUTE } from "@app/dashboard/routes";
import { FosterHomes, EditFosterHome } from "../screens";

export const FOSTER_HOMES_ROUTE = createRoute({
  name: "Foster Homes",
  path: "/homes",
  customName: ({ t }) => t("fosterHome.title"),
  auth: true,
  component: FosterHomes,
  parent: ADMIN_DASHBOARD_ROUTE,
  icon: HouseIcon,
});

export const EDIT_FOSTER_HOME_ROUTE: Route = createRoute({
  name: "Edit Foster Home",
  customName: ({ isNew, t }, route) => {
    console.log("is new", isNew);
    return isNew ? t("fosterHome.addTitle") : t("fosterHome.editTitle");
  },
  path: `${FOSTER_HOMES_ROUTE.path}/:id`,
  defaultParams: { id: "new" },
  auth: true,
  component: EditFosterHome,
  parent: FOSTER_HOMES_ROUTE,
  icon: EditIcon,
});

const FOSTER_HOME_ROUTES: Route[] = [
  EDIT_FOSTER_HOME_ROUTE,
  FOSTER_HOMES_ROUTE,
];

export default FOSTER_HOME_ROUTES;
