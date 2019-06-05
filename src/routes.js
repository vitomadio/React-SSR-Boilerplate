import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

export default [
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
        path: "/about",
        component: About,
        exact: true,
    },
    {
        path: "/auth",
        component: Auth
    },
    {
        path: "/dashboard",
        component: Dashboard
    },
];
