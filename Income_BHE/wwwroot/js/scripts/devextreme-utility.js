let loaderInstance = null;

const showLoader = () => {
    if (!loaderInstance) {
        loaderInstance = $("#loadPanel")
            .dxLoadPanel({
                message: "",
                shadingColor: "rgba(0,0,0,0.4)",
                visible: false,
                showIndicator: true,
                showPane: true,
                shading: true,
                closeOnOutsideClick: false,
            })
            .dxLoadPanel("instance");
    }
    loaderInstance.show();
};

const hideLoader = () => {
    if (loaderInstance) {
        loaderInstance.hide();
    }
};

const getDxTextBox = (id) => {
    const instance = DevExpress.ui.dxTextBox.getInstance(`#${id}`);

    return new Proxy(instance, {
        get(target, prop) {
            if (prop === "value") {
                return target.option("value");
            }
            if (prop === "DefaultValue") {
                return (val) => target.option("value", val);
            }
            return target[prop];
        },
        set(target, prop, value) {
            if (prop === "value") {
                target.option("value", value);
                return true;
            }
            target[prop] = value;
            return true;
        },
    });
};
