const handleDatetime = (datetime) => {
    const DATE_OPTIONS = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    const datenow = new Date(datetime);
    const date = datenow.toLocaleDateString("vi-Vi", DATE_OPTIONS);
    const time = datenow.toLocaleTimeString("vi-Vi");
    return time + ", " + date;
};
export default handleDatetime;
