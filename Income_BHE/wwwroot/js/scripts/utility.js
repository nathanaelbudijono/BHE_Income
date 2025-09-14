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

const toaster = (message, type = "success", duration = 5000) => {
    let container = document.getElementById("toastr-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastr-container";
        container.className = "fixed top-5 right-5 flex flex-col gap-3 z-50";
        document.body.appendChild(container);
    }
    const typeClasses = {
        success: "bg-white border-neutral-accent-100",
        error: "bg-red-500 text-white border-red-600",
        info: "bg-blue-500 text-white border-blue-600",
        warning: "bg-yellow-400 text-black border-yellow-500",
    };

    const toast = document.createElement("div");
    toast.className = `
        flex items-center gap-5 px-4 py-2 rounded-lg border shadow-sm transform transition
        ${typeClasses["success"] || typeClasses.info}
        opacity-0
    `;
    toast.innerHTML = `
    <div class='flex items-center gap-2'>
        <i class="ri-check-line text-md text-success-100"></i>
        <p class="text-sm text-slate-800 poppins-regular">${message}</p>
    </div>
      <button class="ml-2">
      <i class="ri-close-line text-md hover:text-destrutive-100 transition transition-colors duration-200 cursor-pointer"></i>
      </button>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("opacity-100");
    });

    const autoRemove = setTimeout(() => {
        toast.classList.remove("opacity-100");
        toast.addEventListener("transitionend", () => toast.remove());
    }, duration);

    toast.querySelector("button").addEventListener("click", () => {
        clearTimeout(autoRemove);
        toast.classList.remove("opacity-100");
        toast.addEventListener("transitionend", () => toast.remove());
    });
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
    } else if (type === "info") {
        Swal.fire({
            icon: "info",
            title: "Notice",
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

const runShepherdTour = (setupStepsFn) => {
    const isMobile = window.innerWidth < 768;
    console.log(isMobile);
    if (isMobile) {
        handleException(
            "Sorry tour is not available in mobile device, please switch to your laptop or monitor",
            "info"
        );
        return;
    }
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            scrollTo: { behavior: "smooth", block: "center" },
            cancelIcon: { enabled: true },
        },
    });
    setupStepsFn(tour);
    tour.start();
};
