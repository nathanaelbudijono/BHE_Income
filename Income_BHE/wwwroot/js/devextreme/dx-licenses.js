window.addEventListener("load", function () {
    if (window.DevExpress) {
        DevExpress.config({
            licenseKey: "ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogIjgyYWM4Yzg5LTU5ZmEtNDhiNi1hNTY1LTA3NWFhOGVkNDU0ZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjUxCn0=.PSjcfNSOAoDXki/sjqBEsGUziPFOsDWgJrEoIguTNIpy7MicCu4zvTgcUUB6ok9i+lf2AYeUXJ8cyq2Nn1WTeVWWFJdgMsF0pTiFZObyiUuq18qw64El+H1bybYg1VqNeXODUQ=="
        });
        console.log("DevExtreme license registered.");
    } else {
        console.error("DevExtreme is not loaded!");
    }
});
