const togglePasswordVisibility = (e) => {
    var textBox = $("#Password").dxTextBox("instance");
    var currentMode = textBox.option("mode");

    if (currentMode === "password") {
        textBox.option("mode", "text");
        e.component.option("icon", "eyeclose");
    } else {
        textBox.option("mode", "password");
        e.component.option("icon", "eyeopen");
    }
};

const toaster = (message, type) => {
    toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        onclick: null,
        showDuration: "1000",
        hideDuration: "1000",
        timeOut: "10000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
    };
    toastr[type](message);
};

const handleException = (message, type) => {
    if (type === "error") {
        Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            html: `<p class="leading-relaxed text-slate-500 text-sm max-w-3xl poppins-regular">${message}</p>`,
            customClass: {
                title: "leading-relaxed text-slate-500 text-sm max-w-3xl poppins-medium text-center",
                confirmButton: "primary-btn",
            },
            didOpen: (popup) => {
                popup
                    .querySelector(".swal2-title")
                    ?.classList.remove("swal2-title");
                popup
                    .querySelector(".swal2-confirm")
                    ?.classList.remove("swal2-confirm");
            },
        });
    }
};

const generateBreadcrumbs = (items) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        return;
    }
    const container = document.getElementById("breadcrumb");
    container.innerHTML = "";

    items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        let el;

        if (item.link && !isLast) {
            el = document.createElement("a");
            el.href = item.link;
            el.className =
                "poppins-light text-slate-500 text-xs hover:underline";
            el.textContent = item.text;
        } else {
            el = document.createElement("span");
            el.className = isLast
                ? "poppins-regular text-slate-800 text-xs"
                : "poppins-light text-slate-500 text-xs";
            el.textContent = item.text;
        }

        container.appendChild(el);

        if (!isLast) {
            const icon = document.createElement("i");
            icon.className = "ri-arrow-right-s-line text-slate-500";
            container.appendChild(icon);
        }
    });
};

const renderMustache = (data, containerId, templateId) => {
    try {
        const dataContainer = document.getElementById(containerId);
        const template = document.getElementById(templateId);

        const rendered = Mustache.render(template.innerHTML, data);
        dataContainer.innerHTML = rendered;
    } catch (err) {
        console.error("Exception on renderMustahce : ", err);
    }
};
