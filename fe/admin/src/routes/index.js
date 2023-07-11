import ClassifyList from "../pages/Classify/List";
import Content from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import WeekdayList from "../pages/Weekday/List";
import TypeList from "../pages/Type/List";
import DocumentList from "../pages/Document/List";
import ReviewList from "../pages/Review/List";
import DiscountList from "../pages/Discount/List";
import CourseList from "../pages/Course/List";
import ClassesList from "../pages/Classes/List";
import PointList from "../pages/Point/List";
import UserList from "../pages/User/List";
import ConsultList from "../pages/ConsultRegis/List";
import OutstandingList from "../pages/Outstanding/List";
import RegistrationList from "../pages/Registration/List";
import PointListClass from "../pages/Point/ListPoint";
import StudentClassesList from "../pages/Classes/ListStudentClass";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";

const PageWeb = [
    {
        path: "/",
        page: LoginPage,
    },
    {
        path: "/home",
        page: Content,
        isMainLayout: true,
    },
    {
        path: "/dashboard",
        page: Dashboard,
        isMainLayout: true,
    },
    {
        path: "/list-weekday",
        page: WeekdayList,
        isMainLayout: true,
    },
    {
        path: "/list-classify",
        page: ClassifyList,
        isMainLayout: true,
    },
    {
        path: "/list-type",
        page: TypeList,
        isMainLayout: true,
    },
    {
        path: "/list-document",
        page: DocumentList,
        isMainLayout: true,
    },
    {
        path: "/list-review",
        page: ReviewList,
        isMainLayout: true,
    },
    {
        path: "/list-discount",
        page: DiscountList,
        isMainLayout: true,
    },
    {
        path: "/list-course",
        page: CourseList,
        isMainLayout: true,
    },
    {
        path: "/list-classes",
        page: ClassesList,
        isMainLayout: true,
    },
    {
        path: "/list-point",
        page: PointList,
        isMainLayout: true,
    },
    {
        path: "/list-user",
        page: UserList,
        isMainLayout: true,
    },
    {
        path: "/list-user",
        page: UserList,
        isMainLayout: true,
    },
    {
        path: "/list-consult",
        page: ConsultList,
        isMainLayout: true,
    },
    {
        path: "/list-outstanding",
        page: OutstandingList,
        isMainLayout: true,
    },
    {
        path: "/list-registration",
        page: RegistrationList,
        isMainLayout: true,
    },
    {
        path: "/listpointclass/:idClasses",
        page: PointListClass,
        isMainLayout: true,
    },
    {
        path: "/liststudentclass/:idClasses",
        page: StudentClassesList,
        isMainLayout: true,
    },
    {
        path: "/profile",
        page: Profile,
    },
];

export default PageWeb;
