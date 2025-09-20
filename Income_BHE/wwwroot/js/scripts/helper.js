const setUserInfoToLocaleStorage = (user) => {
    localStorage.setItem("user-info", JSON.stringify(user));
};

const getTimeOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 16) {
        return "Good Afternoon";
    } else if (currentHour >= 16 && currentHour < 19) {
        return "Good Evening";
    } else {
        return "Good Night";
    }
};

const formatDate = (d) => (d ? d.toISOString().split("T")[0] : null);

const  getUrlValueParam = (param) => {
    let url = new URL(window.location.href);
   return url.searchParams.get(param);

};
