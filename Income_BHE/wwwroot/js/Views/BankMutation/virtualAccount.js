const BcaVirtualAccountManager = {
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
    async init() {

        this.getDom();
        await this.getInsight();
        this.render();
        hideLoader();


    }
};

const initBcaVirtualAccountGrid = () => {
    BcaVirtualAccountManager.state.filesGrid = $("#va-mutation-grid").dxDataGrid({
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
                fixed: true,
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
                                        handleShowEditBankPopup(options);
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
            { dataField: "BankId", caption: "Bank", fixed: true },
            { dataField: "MutationFileName", caption: "File Name", fixed: true },
            { dataField: "MutationDate", caption: "Mutation Date", fixed: true },
            { dataField: "CompanyName", caption: "Company Name", fixed: true },
            { dataField: "RetensiNo", caption: "Retension Number", fixed: true },
            { dataField: "ReportNo", caption: "Report Number", fixed: true },
            {
                dataField: "EntryDate",
                caption: "Upload Date",
                fixed: true,
                cellTemplate: function (container, options) {
                    if (options.value) {
                        const dateOnly = options.value.split("T")[0];
                        $("<span>").text(dateOnly).appendTo(container);
                    }
                },
            },
        ],
        toolbar: {
            items: [
                {
                    location: "before",
                    widget: "dxTextBox",
                    options: {
                        width: 200, 
                        placeholder: "Search file name",
                        mode: "search",
                        showClearButton: true,
                        valueChangeEvent: "keyup",
                        onValueChanged: function (e) {
                            const dataGrid = BcaVirtualAccountManager.state.filesGrid;
                            const searchValue = e.value || "";

                            dataGrid.clearFilter();

                            if (searchValue) {
                                const searchExpr = ["MutationFileName"];
                                dataGrid.filter(function (item) {
                                    for (let i = 0; i < searchExpr.length; i++) {
                                        const value = item[searchExpr[i]];
                                        if (value && value.toString().toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                                            return true;
                                        }
                                    }
                                    return false;
                                });
                            }
                        }
                    }
                },
                "exportButton", 
                {
                    name: "columnChooserButton",
                    location: "after"
                }
            ]
        },
        dataSource: getVaFilesDataSource(),
        keyExpr: "MutationFileName"
    }).dxDataGrid("instance");
};

const getVaFilesDataSource = () => {
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
};

const onVaDateRangeChanged = (e) => {
    if (BcaVirtualAccountManager.state.filesGrid) {
        BcaVirtualAccountManager.state.filesGrid.refresh();
    }
}