const errorFetchResponse = {
    status: "error",
    message: "Sorry, an unexpected error has happened. Please try again later",
    data: null,
};

const getFetcher = async (url) => {
    try {
        const stamp = "Bearer " + localStorage.getItem("stamp-token");
        const res = await fetch(`${url}`, {
            method: "GET",
            headers: {
                Authorization: stamp,
            },
        });

        return await res.json();
    } catch (err) {
        console.error("Exception on getFetcher : ", err);
        return errorFetchResponse;
    }
};

const postFetcher = async (url, body) => {
    try {
        const stamp = "Bearer " + localStorage.getItem("stamp-token");
        const res = await fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: stamp,
            },
            body: JSON.stringify(body),
        });

        return await res.json();
    } catch (err) {
        console.error("Exception on postFetcher : ", err);
        return errorFetchResponse;
    }
};


const postFormDataFetcher = async (url, formData) => {
    try {
        const stamp = "Bearer " + localStorage.getItem("stamp-token");
        const res = await fetch(`${url}`, {
            method: "POST",
            headers: {
                Authorization: stamp,
            },
            body: formData,
        });

        return await res.json();
    } catch (err) {
        console.error("Exception on postFormDataFetcher : ", err);
        return errorFetchResponse;
    }
};