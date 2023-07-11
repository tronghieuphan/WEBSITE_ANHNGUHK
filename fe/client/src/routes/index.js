import About from "../pages/About";
import Course from "../pages/Course";
import Document from "../pages/Document";
import DetailDocument from "../pages/Document/DetailDocument";
import ForgetPass from "../pages/FormLogin/ForgetPass";
import LoginPage from "../pages/FormLogin/Login";
import RegisterPage from "../pages/FormLogin/Register";
import Home from "../pages/Home";
import Lecture from "../pages/Lecture";
import Outstanding from "../pages/Outstanding";
import Profile from "../pages/Profile";
import Review from "../pages/Review";

const PageWeb = [
    {
        path: "/",
        page: Home,
        isHomePageLayout: true,
    },
    {
        path: "/login",
        page: LoginPage,
        isLoginRegisterLayout: true,
    },
    {
        path: "/forgetpass",
        page: ForgetPass,
        isLoginRegisterLayout: true,
    },
    {
        path: "/register",
        page: RegisterPage,
        isLoginRegisterLayout: true,
    },
    {
        path: "/document",
        page: Document,
        isPageLayout: true,
    },
    {
        path: "/document/detail/:idType/:nameDocumentID",
        page: DetailDocument,
        isPageLayout: true,
    },
    {
        path: "/course/:idType",
        page: Course,
        isPageLayout: true,
    },
    {
        path: "/profile",
        page: Profile,
        isPageLayout: true,
    },
    {
        path: "/lecture",
        page: Lecture,
        isPageLayout: true,
    },
    {
        path: "/review",
        page: Review,
        isPageLayout: true,
    },
    {
        path: "/outstanding",
        page: Outstanding,
        isPageLayout: true,
    },

    {
        path: "/about",
        page: About,
        isPageLayout: true,
    },
];

export default PageWeb;
