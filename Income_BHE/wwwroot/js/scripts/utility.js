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
