import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";

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
        component: Auth,
        exact: true,
    },
];
