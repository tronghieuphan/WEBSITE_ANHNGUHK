import React from "react";
import NavbarMenu from "../../components/Navbar";
import Footer from "../../components/Footer";

function HomePageLayout({ children }) {
    return (
        <>
            <NavbarMenu />
            {children}
            <Footer />
        </>
    );
}

export default HomePageLayout;
