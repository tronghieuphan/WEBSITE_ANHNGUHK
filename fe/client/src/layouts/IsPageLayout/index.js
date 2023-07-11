import React from "react";
import Footer from "../../components/Footer";
import Menubar from "../../components/Menubar";

function IsPageLayout({ children }) {
    return (
        <>
            <Menubar />
            {children}
            <Footer />
        </>
    );
}

export default IsPageLayout;
