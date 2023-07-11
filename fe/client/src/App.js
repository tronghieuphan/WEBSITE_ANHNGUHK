import "./App.css";
import { Routes, Route } from "react-router-dom";
import PageWeb from "./routes";
import IsPageLayout from "./layouts/IsPageLayout/index";
import LoginRegisterLayout from "./layouts/LoginRegisterLayout";
import HomePageLayout from "./layouts/HomePageLayout";
/////
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
////
function App() {
    return (
        <div className="App">
            <Routes>
                {PageWeb.map((route, index) => {
                    const Page = route.page;
                    let Layout = LoginRegisterLayout;

                    if (route.isHomePageLayout) {
                        Layout = HomePageLayout;
                    } else if (route.isLoginRegisterLayout) {
                        Layout = LoginRegisterLayout;
                    } else {
                        Layout = IsPageLayout;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </div>
    );
}

export default App;
