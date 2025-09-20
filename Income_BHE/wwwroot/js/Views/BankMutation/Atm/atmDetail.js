const AtmDetailManager = {
    state: {
        dom: {
            title: null,
            fileName: null,
            bankId: null,
            mutationDate: null,
            companyId: null,
            companyName: null,
            retensionNumber: null,
            branch: null,
            reportNumber: null,
            uploadDate: null
        },
        data: {
            companyId: "",
            retensionNumber: "",
            reportNumber: "",
            fileName: "",
            mutationDate: "",
            companyName: "",
            branch: "",
            uploadDate: "",
            bankId: "",
        },
        grid: null
    },
    getDom() {
        this.state.dom.title = document.getElementById("title");
        this.state.dom.fileName = document.getElementById("fileName");
        this.state.dom.bankId = document.getElementById("bankId");
        this.state.dom.mutationDate = document.getElementById("mutationDate");
        this.state.dom.companyId = document.getElementById("companyId");
        this.state.dom.companyName = document.getElementById("companyName");
        this.state.dom.retensionNumber = document.getElementById("retensionNumber");
        this.state.dom.branch = document.getElementById("branch");
        this.state.dom.reportNumber = document.getElementById("reportNumber");
        this.state.dom.uploadDate = document.getElementById("uploadDate");
    },
    render() {
        this.state.dom.title.textContent = `ATM Mutation - ${this.state.data.fileName}`
        this.state.dom.fileName.textContent = this.state.data.fileName;
        this.state.dom.bankId.textContent = this.state.data.bankId;
        this.state.dom.mutationDate.textContent = this.state.data.mutationDate;
        this.state.dom.companyId.textContent = this.state.data.companyId;
        this.state.dom.companyName.textContent = this.state.data.companyName;
        this.state.dom.retensionNumber.textContent = this.state.data.retensionNumber;
        this.state.dom.branch.textContent = this.state.data.branch;
        this.state.dom.reportNumber.textContent = this.state.data.reportNumber;
        this.state.dom.uploadDate.textContent = this.state.data.uploadDate.split("T")[0]
    },
    setUpEventListner() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#start-tour-btn')) {
                runShepherdTour(noTour);
            }
        });
    },
    async init() {
        this.getDom();
        this.setUpEventListner();
    }
};

const initAtmDetailMutationGrid = () => {
    AtmDetailManager.state.grid = $("#atm-detail-mutation-grid").dxDataGrid({
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
            const mutationFile = getUrlValueParam("file")
            const fileName = `${mutationFile.split(".")[0]}.xlsx`;
            if (e.format === 'xlsx') {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet(fileName);
                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet,
                    autoFilterEnabled: true,
                }).then(() => {
                    workbook.xlsx.writeBuffer().then((buffer) => {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName);
                    });
                });
            }
            else if (e.format === 'pdf') {
                const doc = new jsPDF();
                DevExpress.pdfExporter.exportDataGrid({
                    jsPDFDocument: doc,
                    component: e.component,
                }).then(() => {

                    doc.save(fileName);
                });
            }
        },
        columns: [
            { dataField: "BankId", caption: "Bank Id" },
            { dataField: "IdentificationNumber", caption: "Identification Number" },
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
            { dataField: "ReportNo", caption: "Report Number" },
            { dataField: "Branch", caption: "Branch" },
            { dataField: "CompanyId", caption: "Company Id" },
            { dataField: "CompanyName", caption: "Company Name" },
            { dataField: "RetensiNo", caption: "Retensi Number" },
            { dataField: "MutationType", caption: "Mutation Type" },
            { dataField: "MutationFileName", caption: "Mutation File Name" },
            { dataField: "TrxNo", caption: "Transaction Number" },
            { dataField: "CustomerName", caption: "Customer Name" },
            {
                dataField: "TrxAmount",
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
            {
                dataField: "TrxDate",
                caption: "Transaction Date",
                dataType: "date",
                calculateCellValue: function (rowData) {
                    if (rowData.TrxDate) {
                        return new Date(rowData.TrxDate);
                    }
                    return null;
                }
            },
            { dataField: "TrxTime", caption: "Transaction Time" },
            { dataField: "TrxLoc", caption: "Transaction Location" }
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
        dataSource: getAtmDetailDataSource(),
        keyExpr: "IdentificationNumber"
    }).dxDataGrid("instance");
};

const getAtmDetailDataSource = () => {
    const file = getUrlValueParam("file");

    return new DevExpress.data.CustomStore({
        key: "IdentificationNumber",
        load: async function (loadOptions) {

            const payload = {
                LoadOptions: loadOptions,
                FileName: decodeURIComponent(file),
                MutationType: "atm",
                BankId: "BCA"
            };
            try {
                const response = await postFetcher(`${API_URL}/bank-mutation/get-by-fileName`, payload)
                if (response != null && response.data.length > 0) {
                    AtmDetailManager.state.data.companyId = response?.data[0]?.CompanyId;
                    AtmDetailManager.state.data.branch = response?.data[0]?.Branch;
                    AtmDetailManager.state.data.retensionNumber = response?.data[0]?.RetensiNo;
                    AtmDetailManager.state.data.reportNumber = response?.data[0]?.ReportNo;
                    AtmDetailManager.state.data.fileName = response?.data[0]?.MutationFileName;
                    AtmDetailManager.state.data.mutationDate = response?.data[0]?.MutationDate;
                    AtmDetailManager.state.data.companyName = response?.data[0]?.CompanyName;
                    AtmDetailManager.state.data.companyId = response?.data[0]?.CompanyId;
                    AtmDetailManager.state.data.uploadDate = response?.data[0]?.EntryDate;
                    AtmDetailManager.state.data.bankId = response?.data[0]?.BankId;
                    AtmDetailManager.render();
                }
                return response;

            } catch (err) {
                return { data: [], totalCount: 0 }
            }

        }
    })

};