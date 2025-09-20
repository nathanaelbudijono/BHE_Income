const BcaVirtualAccountManager = {
    state: {
        data: null,
        dom: {
            integration: null,
            amount: null,
            transaction: null,
            lastUpload: null
        },
        filesGrid: null,
        mutationGrid: null
    },
    async getInsight() {
        const response = await getFetcher(`${API_URL}/bank-mutation/insight/VIRTUALACCOUNT`)
        if (response.status === "success") {
            this.state.data = response.data
        }
    },
    render() {
        this.state.dom.integration.textContent = this.state.data.totalIntegrated;
        this.state.dom.amount.textContent = this.state.data.totalAmount;
        this.state.dom.transaction.textContent = this.state.data.totalTransaction;
        this.state.dom.lastUpload.textContent = this.state.data.lastUpdated;
    },
    getDom() {
        this.state.dom.integration = document.getElementById("integration-data");
        this.state.dom.amount = document.getElementById("amount-data");
        this.state.dom.transaction = document.getElementById("transaction-data");
        this.state.dom.lastUpload = document.getElementById("upload-data");
    },
    setUpEventListner() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#start-tour-btn')) {
                runShepherdTour(bankMutationVirtualAccountTour);
            }
        });
    },
    async init() {

        this.getDom();
        await this.getInsight();
        this.render();
        this.setUpEventListner();
        hideLoader();


    }
};

const initVirtualAccountFilesGrid = () => {
    BcaVirtualAccountManager.state.filesGrid = $("#va-files-grid").dxDataGrid({
        showBorders: true,
        columnResizingMode: "widget",
        columnAutoWidth: true,
        allowColumnResizing: true,
        columnFixing: {
            enabled: true
        },
        scrolling: {
            mode: "infinite"
        },

        columnChooser: {
            enabled: true,
            mode: "select"
        },
        loadPanel: {
            enabled: true,
            showIndicator: true,
            showPane: true,
        },
        filterRow: {
            visible: true,
            applyFilter: 'auto',
        },
        focusedRowEnabled: true,
        onFocusedRowChanging(e) {
            const rowsCount = e.component.getVisibleRows().length;
            const pageCount = e.component.pageCount();
            const pageIndex = e.component.pageIndex();
            const key = e.event && e.event.key;

            if (key && e.prevRowIndex === e.newRowIndex) {
                if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
                    e.component.pageIndex(pageIndex + 1).done(() => {
                        e.component.option('focusedRowIndex', 0);
                    });
                } else if (e.newRowIndex === 0 && pageIndex > 0) {
                    e.component.pageIndex(pageIndex - 1).done(() => {
                        e.component.option('focusedRowIndex', rowsCount - 1);
                    });
                }
            }
        },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        showRowLines: true,
        export: {
            enabled: true,
            formats: ['xlsx'],
        },
        onExporting(e) {
            if (e.format === 'xlsx') {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('VirtualAccount');
                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet,
                    autoFilterEnabled: true,
                }).then(() => {
                    workbook.xlsx.writeBuffer().then((buffer) => {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'VirtualAccount.xlsx');
                    });
                });
            }
            else if (e.format === 'pdf') {
                const doc = new jsPDF();
                DevExpress.pdfExporter.exportDataGrid({
                    jsPDFDocument: doc,
                    component: e.component,
                }).then(() => {
                    doc.save('VirtualAccount.pdf');
                });
            }
        },
        columns: [
            {
                caption: "",
                width: 80,
                alignmen6: "center",
                cellTemplate: function (container, options) {
                    $("<div>")
                        .addClass("action-dropdown-container")
                        .dxDropDownButton({
                            icon: "more",
                            displayExpr: "text",
                            keyExpr: "id",
                            showArrowIcon: false,
                            stylingMode: "text",
                            dropDownOptions: {
                                width: 150
                            },
                            onItemClick: function (e) {
                                switch (e.itemData.id) {
                                    case "detail":
                                        window.location.href = `${BASE_URL}/BankMutation/VirtualAccount/Detail?file=${encodeURIComponent(options.data.MutationFileName)}&bankId=${encodeURIComponent(options.data.BankId) }`;
                                        break;
                                }
                            },
                            items: [
                                { id: "detail", text: "View Detail", icon: "bulletlist" }
                            ]
                        })
                        .appendTo(container);
                }
            },
            { dataField: "BankId", caption: "Bank"},
            { dataField: "MutationFileName", caption: "File Name" },
            {
                dataField: "MutationDate",
                caption: "Mutation Date",
                dataType: "date",
                calculateCellValue: function (rowData) {
                    if (rowData.MutationDate) {
                        return new Date(rowData.MutationDate);
                    }
                    return null;
                }
            },
            { dataField: "CompanyName", caption: "Company Name"},
            { dataField: "RetensiNo", caption: "Retension Number" },
            { dataField: "ReportNo", caption: "Report Number" },
            {
                dataField: "EntryDate",
                caption: "Upload Date",
                dataType: "date",
                calculateCellValue: function (rowData) {
                    if (rowData.EntryDate) {
                        return new Date(rowData.EntryDate);
                    }
                    return null;
                }
            },
        ],
        toolbar: {
            items: [
                "exportButton",
                {
                    name: "columnChooserButton",
                    location: "after"
                }
            ]
        },
        dataSource: getVaDataSource("file"),
        keyExpr: "MutationFileName"
    }).dxDataGrid("instance");
};

const initVirtualAccountMutationGrid = () => {
    BcaVirtualAccountManager.state.mutationGrid = $("#va-mutation-grid").dxDataGrid({
        showBorders: true,
        columnResizingMode: "widget",
        columnAutoWidth: true,
        allowColumnResizing: true,
        columnFixing: {
            enabled: true
        },
        scrolling: {
            mode: "infinite"
        },

        columnChooser: {
            enabled: true,
            mode: "select"
        },
        loadPanel: {
            enabled: true,
            showIndicator: true,
            showPane: true,
        },
        filterRow: {
            visible: true,
            applyFilter: 'auto',
        },
        focusedRowEnabled: true,
        onFocusedRowChanging(e) {
            const rowsCount = e.component.getVisibleRows().length;
            const pageCount = e.component.pageCount();
            const pageIndex = e.component.pageIndex();
            const key = e.event && e.event.key;

            if (key && e.prevRowIndex === e.newRowIndex) {
                if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
                    e.component.pageIndex(pageIndex + 1).done(() => {
                        e.component.option('focusedRowIndex', 0);
                    });
                } else if (e.newRowIndex === 0 && pageIndex > 0) {
                    e.component.pageIndex(pageIndex - 1).done(() => {
                        e.component.option('focusedRowIndex', rowsCount - 1);
                    });
                }
            }
        },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        showRowLines: true,
        export: {
            enabled: true,
            formats: ['xlsx'],
        },
        onExporting(e) {
            if (e.format === 'xlsx') {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('VirtualAccount');
                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet,
                    autoFilterEnabled: true,
                }).then(() => {
                    workbook.xlsx.writeBuffer().then((buffer) => {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'VirtualAccount.xlsx');
                    });
                });
            }
            else if (e.format === 'pdf') {
                const doc = new jsPDF();
                DevExpress.pdfExporter.exportDataGrid({
                    jsPDFDocument: doc,
                    component: e.component,
                }).then(() => {
                    doc.save('VirtualAccount.pdf');
                });
            }
        },
        columns: [
            { dataField: "bankId", caption: "Bank Id" },
            { dataField: "retensiNo", caption: "Retensi Number" },
            {
                dataField: "MutationDate",
                caption: "Mutation Date",
                dataType: "date",
                calculateCellValue: function (rowData) {
                    if (rowData.MutationDate) {
                        return new Date(rowData.MutationDate);
                    }
                    return null;
                }
            },
            { dataField: "reportNo", caption: "Report Number"},
            { dataField: "branch", caption: "Branch" },
            { dataField: "companyId", caption: "Company Id"},
            { dataField: "companyName", caption: "Company Name" },
            { dataField: "subCompany", caption: "Sub Company" },
            { dataField: "refNo", caption: "Reference Number"},
            {
                dataField: "trxNo",
                caption: "Sub Company Code",
                cellTemplate: function (container, options) {
                       if (options.value) {
                           const subCompanyCode = options.value.substring(0,1);
                           $("<span>").text(subCompanyCode).appendTo(container);
                        }
                    },
            },
            { dataField: "customerName", caption: "Customer Name"},
            { dataField: "trxNo", caption: "Transaction Number" },
            { dataField: "currency", caption: "Currency" },
            {
                dataField: "trxAmount",
                caption: "Transaction Amount",
                cellTemplate: function (container, options) {
                    if (options.value != null) {
                        const formattedValue = Number(options.value).toLocaleString("de-DE", { maximumFractionDigits: 0 });

                        $("<span>")
                            .text(formattedValue)
                            .appendTo(container);
                    }
                },
            },
            { dataField: "trxDate", caption: "Transaction Date" },
            { dataField: "trxTime", caption: "Transaction Time" },
            { dataField: "trxLoc", caption: "Transaction Location" },
            { dataField: "desc2", caption: "Description" },
        ],
        toolbar: {
            items: [
                "exportButton",
                {
                    name: "columnChooserButton",
                    location: "after"
                }
            ]
        },
        dataSource: getVaDataSource("mutation"),
        keyExpr: "RefNo"
    }).dxDataGrid("instance");
};

const getVaDataSource = (type) => {
    if (type === "file") {
        return new DevExpress.data.CustomStore({
            key: "MutationFileName",
            load: async function (loadOptions) {
                const dateRange = $("#vaDateRange").dxDateRangeBox("instance").option("value") || [];

                const startDate = dateRange[0] ? new Date(dateRange[0]) : null;
                const endDate = dateRange[1] ? new Date(dateRange[1]) : null;


                const payload = {
                    LoadOptions: loadOptions,
                    FileName: "empty",
                    MutationType: "VIRTUALACCOUNT",
                    MutationStartDate: formatDate(startDate),
                    MutationEndDate: formatDate(endDate),
                    BankId: "BCA"
                };
                try {
                    const data = await postFetcher(`${API_URL}/bank-mutation/files`, payload)
                    return data
                } catch (err) {
                    return { data: [], totalCount: 0 }
                }

            }
        })
    } else {
        return new DevExpress.data.CustomStore({
            key: "refNo",
            load: async function (loadOptions) {
                const dateRange = $("#vaDateRange").dxDateRangeBox("instance").option("value") || [];
                const companyId = $("#CompanySelectBox").dxSelectBox("instance").option("value") ?? "";
                const startDate = dateRange[0] ? new Date(dateRange[0]) : null;
                const endDate = dateRange[1] ? new Date(dateRange[1]) : null;


                const payload = {
                    LoadOptions: loadOptions,
                    FileName: "empty",
                    CompanyId: companyId,
                    MutationType: "VIRTUALACCOUNT",
                    MutationStartDate: formatDate(startDate),
                    MutationEndDate: formatDate(endDate),
                    BankId: "BCA"
                };
                try {
                    const data = await postFetcher(`${API_URL}/bank-mutation/bca/get-va`, payload)
                    return data
                } catch (err) {
                    return { data: [], totalCount: 0 }
                }

            }
        })
    }

};

const onVaValueChanged = (e) => {
    if (BcaVirtualAccountManager.state.filesGrid) {
        BcaVirtualAccountManager.state.filesGrid.refresh();
    }
    if (BcaVirtualAccountManager.state.mutationGrid) {
        BcaVirtualAccountManager.state.mutationGrid.refresh();
    }
};
