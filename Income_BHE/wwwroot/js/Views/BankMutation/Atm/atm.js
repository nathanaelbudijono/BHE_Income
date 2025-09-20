const AtmManager = {
    state: {
        data: null,
        dom: {
            integration: null,
            amount: null,
            transaction: null,
            lastUpload: null
        },
        filesGrid: null
    },
    async getInsight() {
        const response = await getFetcher(`${API_URL}/bank-mutation/insight/ATM`)
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
                runShepherdTour(bankMutationOfflineTour);
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

const initAtmFilesGrid = () => {
    AtmManager.state.filesGrid = $("#atm-files-grid").dxDataGrid({
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
                const worksheet = workbook.addWorksheet('BluAutodebet');
                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet,
                    autoFilterEnabled: true,
                }).then(() => {
                    workbook.xlsx.writeBuffer().then((buffer) => {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'BluAutodebet.xlsx');
                    });
                });
            }
            else if (e.format === 'pdf') {
                const doc = new jsPDF();
                DevExpress.pdfExporter.exportDataGrid({
                    jsPDFDocument: doc,
                    component: e.component,
                }).then(() => {
                    doc.save('BluAutodebet.pdf');
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
                                        window.location.href = `${BASE_URL}/BankMutation/Atm/Detail?file=${encodeURIComponent(options.data.MutationFileName)}&bankId=${encodeURIComponent(options.data.BankId)}`;
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
            { dataField: "BankId", caption: "Bank" },
            { dataField: "MutationFileName", caption: "File Name" },
            { dataField: "MutationDate" },
            { dataField: "CompanyId" },
            { dataField: "CompanyName" },
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
        dataSource: getAtmDataSource(),
        keyExpr: "MutationFileName"
    }).dxDataGrid("instance");
};

const getAtmDataSource = (type) => {
    return new DevExpress.data.CustomStore({
        key: "MutationFileName",
        load: async function (loadOptions) {
            const dateRange = $("#atmDateRange").dxDateRangeBox("instance").option("value") || [];

            const startDate = dateRange[0] ? new Date(dateRange[0]) : null;
            const endDate = dateRange[1] ? new Date(dateRange[1]) : null;


            const payload = {
                LoadOptions: loadOptions,
                FileName: "empty",
                MutationType: "ATM",
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


};

const onAtmValueChanged = (e) => {
    if (AtmManager.state.filesGrid) {
        AtmManager.state.filesGrid.refresh();
    }
};
