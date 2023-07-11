import Cookie from "js-cookie";

const setCookie = (name, value) => {
    Cookie.set(name, value, {
        secure: true,
        sameSite: "Strict",
        path: "/",
    });
};

export default setCookie;
