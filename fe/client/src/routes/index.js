import HomePage from "../pages/HomePage/HomePage";
import DetailUser from "../pages/Profile/DetailUser";
import LoginPage from "../pages/FormLogin/LoginPage";
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import RegisterPage from "../pages/FormLogin/Register";
import CartShopping from "../pages/CardShopping/CardShopping";
import ListCard from "../pages/ShowListCard/ListCard";
import Check from "../pages/CheckOrder/Check";
import ListSearch from "../pages/ShowListCard/ListSearch";

const PageWeb = [
    {
        path: "/",
        page: HomePage,
        isHomePageLayout: true,
    },
    {
        path: "/login",
        page: LoginPage,
        isLoginRegisterLayout: true,
    },
    {
        path: "/register",
        page: RegisterPage,
        isLoginRegisterLayout: true,
    },
    {
        path: "/shopping",
        page: CartShopping,
        isHomePageLayout: true,
    },
    {
        path: "/product-details",
        page: DetailProduct,
        isHomePageLayout: true,
    },
    {
        path: "/user-details",
        page: DetailUser,
        isHomePageLayout: true,
    },
    {
        path: "/list-card",
        page: ListCard,
        isHomePageLayout: true,
    },
    {
        path: "/list-search",
        page: ListSearch,
        isHomePageLayout: true,
    },
    {
        path: "/check",
        page: Check,
        isHomePageLayout: true,
    },
];

export default PageWeb;
