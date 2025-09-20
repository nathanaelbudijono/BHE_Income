const BluDetailManager = {
    state: {
        dom: {
            title: null,
        },
        data: {
            fileName: "",
        },
        grid: null
    },
    getDom() {
        this.state.dom.title = document.getElementById("title");
    },
    render() {
        this.state.dom.title.textContent = `Blu Autodebet Mutation - ${this.state.data.fileName}`
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

const initBluDetailMutationGrid = () => {
    BluDetailManager.state.grid = $("#blu-detail-grid").dxDataGrid({
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
            {
                dataField: "BankId",
                caption: "Bank Id",
                calculateCellValue: function () {
                    return "BCA";
                },

                cellTemplate: function (container, options) {
                    $("<span>")
                        .text("BCA")
                        .appendTo(container);
                },
            },
            {
                dataField: "InstructionDate",
                caption: "Instruction Date",
                dataType: "date",
                calculateCellValue: function (rowData) {
                    if (rowData.InstructionDate) {
                        return new Date(rowData.InstructionDate);
                    }
                    return null;
                }
            },
            {
                dataField: "ExecutionDate",
                caption: "Execution Date",
                dataType: "date",
                calculateCellValue: function (rowData) {
                    if (rowData.ExecutionDate) {
                        return new Date(rowData.ExecutionDate);
                    }
                    return null;
                }
            },
            { dataField: "PartnerRefNumber", caption: "Partner Ref Number" },
            { dataField: "StudentId" },
            { dataField: "CustomerName" },
            { dataField: "CustomerIdCard" },
            { dataField: "AccountNumber" },
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
                dataField: "BankFee",
                cellTemplate: function (container, options) {
                    if (options.value != null) {
                        const formattedValue = Number(options.value).toLocaleString("de-DE", { maximumFractionDigits: 0 });

                        $("<span>")
                            .text(formattedValue)
                            .appendTo(container);
                    }
                },
            },
            { dataField: "AdditionalInformation" },
            { dataField: "TrxStatus", caption: "Status" },
            { dataField: "ErrorMessage" },
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
        dataSource: getBluDetailDataSource(),
        keyExpr: "PartnerRefNumber"
    }).dxDataGrid("instance");
};

const getBluDetailDataSource = () => {
    const file = getUrlValueParam("file");

    return new DevExpress.data.CustomStore({
        key: "PartnerRefNumber",
        load: async function (loadOptions) {

            const payload = {
                LoadOptions: loadOptions,
                FileName: decodeURIComponent(file),
                MutationType: "bluAutodebit",
                BankId: "BCA"
            };
            try {
                const response = await postFetcher(`${API_URL}/bank-mutation/get-by-fileName`, payload)
                if (response != null && response.data.length > 0) {
                    BluDetailManager.state.data.fileName = response?.data[0]?.MutationFileName;
                    BluDetailManager.render();
                }
                return response;

            } catch (err) {
                return { data: [], totalCount: 0 }
            }

        }
    })

};