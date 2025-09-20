function uploadModal() {
    return {
        open: false,
        files: [],
        isDragging: false,
        isUploading: false,

        openModal() {
            this.open = true;
        },

        closeModal() {
            this.open = false;
            this.files = [];
        },

        handleDrop(event) {
            event.preventDefault();
            this.isDragging = false;

            const droppedFiles = Array.from(event.dataTransfer.files);
            this.addFiles(droppedFiles);
        },

        handleFileSelect(event) {
            const selectedFiles = Array.from(event.target.files);
            this.addFiles(selectedFiles);
            event.target.value = '';
        },

        addFiles(newFiles) {
            const validTypes = ['.txt'];

            newFiles.forEach(file => {
                const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

                if (validTypes.includes(fileExtension)) {
                    const exists = this.files.some(existingFile =>
                        existingFile.name === file.name && existingFile.size === file.size
                    );

                    if (!exists) {
                        this.files.push({
                            name: file.name,
                            size: file.size,
                            file: file,
                            status: 'pending'
                        });
                    }
                } else {

                    alert(`File "${file.name}" is not supported. Please upload .txt files.`);
                }
            });
        },

        removeFile(index) {
            this.files.splice(index, 1);
        },

        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        async uploadFiles() {
            const mutationType = getUrlValueParam("mutationType");
            if (this.files.length === 0) return;

            this.isUploading = true;

            for (let i = 0; i < this.files.length; i++) {
                if (this.files[i].status === 'pending') {
                    this.files[i].status = 'uploading';

                    try {
                        const response = await this.uploadSingleFile(this.files[i].file);
                        if (response.status === "success") {
                            this.files[i].status = 'success';
                        } else {
                            this.closeModal();
                            handleException(response.message, "error");
                        }

                    } catch (error) {
                        this.closeModal();
;                        handleException(error, "error");
                    }
                }
            }

            this.isUploading = false;


            const allSuccess = this.files.every(file => file.status === 'success');
            if (allSuccess) {
                setTimeout(() => {
                    this.closeModal();
                }, 1500);
            }
        },

        async uploadSingleFile(file) {
            const mutationType = sessionStorage.getItem("current-mutation-type")
            if (!mutationType || mutationType === "") {
                throw new Error("Unable to determine mutation type");
            }
            const formData = new FormData();
            formData.append('MutationFile', file);
            formData.append('MutationType', mutationType);

            const response = await postFormDataFetcher(`${API_URL}/bank-mutation/bca/upload`, formData)
            return response;
        }
    }
}

window.openUploadMutationModal = function () {
    const modalElement = document.querySelector('[x-data*="uploadModal"]');
    if (modalElement && modalElement._x_dataStack) {
        modalElement._x_dataStack[0].openModal();
    }
};

window.closeUploadMutationModal = function () {
    const modalElement = document.querySelector('[x-data*="uploadModal"]');
    if (modalElement && modalElement._x_dataStack) {
        modalElement._x_dataStack[0].closeModal();
    }
};