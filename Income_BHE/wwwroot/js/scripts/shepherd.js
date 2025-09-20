const homeTour = (tour) => {
    const isFirstVisit = !localStorage.getItem("homeTourCompleted");

    if (isFirstVisit) {
        tour.addStep({
            id: "welcomeFirstTime",
            text: "Welcome! We noticed this is your first time logging in. Let us give you a quick tour of the system.",
            buttons: [
                { text: "Skip", action: tour.cancel, classes: "neutral-btn" },
                {
                    text: "Start Tour",
                    action: tour.next,
                    classes: "primary-btn",
                },
            ],
            modal: true,
        });
    }

    tour.addStep({
        id: "companySwitcher",
        text: "Quickly switch between companies without needing to log out",
        attachTo: { element: "#companySwitcher", on: "right" },
        buttons: [
            ...(isFirstVisit
                ? [{ text: "Back", action: tour.back, classes: "neutral-btn" }]
                : []),
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });

    tour.addStep({
        id: "welcome",
        text: "View all tasks assigned to you in one place",
        attachTo: { element: "#myTask", on: "bottom" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });

    tour.addStep({
        id: "feature",
        text: "Stay updated with announcements, including policy changes and system notifications from Finance Resource Management",
        attachTo: { element: "#announcement", on: "top" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });

    tour.addStep({
        id: "finish",
        text: "Check your recent activity within the system to stay on top of your work",
        attachTo: { element: "#recentActivity", on: "top" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });

    tour.addStep({
        id: "accountMenu",
        text: "Access your account menu here to manage settings and profile options",
        attachTo: { element: "#accountMenu", on: "top" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });

    tour.addStep({
        id: "tour-btn",
        text: "Click this button anytime you need a refresher or want to revisit important tasks.",
        attachTo: { element: "#start-tour-icon", on: "top" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Done", action: tour.complete, classes: "success-btn" },
        ],
    });
};

const noTour = (tour) => {
    tour.addStep({
        id: "overviewBankMutation",
        text: "There are currently no tutorial for this page.",
        buttons: [
            { text: "Close", action: tour.cancel, classes: "neutral-btn" },
        ],
        modal: true,
    });
};

const bankMutationVirtualAccountTour = (tour) => {
    tour.addStep({
        id: "step1",
        text: "This section provides a quick overview of this month Virtual Account mutation insights.",
        attachTo: { element: "#va-insights" },
        buttons: [
            { text: "Close", action: tour.cancel, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
        modal: true,
    });

    tour.addStep({
        id: "step2",
        text: "Click this button to open a modal and upload a new Virtual Account mutation file.",
        attachTo: { element: "#upload-va", on: "right" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });
    tour.addStep({
        id: "step3",
        text: "Use this filter to view mutation files based on the selected mutation date range.",
        attachTo: { element: "#vaDateRange", on: "left" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });


    tour.addStep({
        id: "step4",
        text: "Here you'll find the list of mutation files you've uploaded. Click the options icon (three dots) to view more details.",
        attachTo: { element: "#files-tab", on: "top" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });

    tour.addStep({
        id: "step5",
        text: "This tab displays the list of transaction-level mutation records you've uploaded.",
        attachTo: { element: "#mutation-tab", on: "top" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Done", action: tour.complete, classes: "success-btn" },
        ],
    });
};

const bankMutationBluTour = (tour) => {
    tour.addStep({
        id: "step1",
        text: "This section provides a quick overview of this month Blu Autodebet mutation insights.",
        attachTo: { element: "#blu-insights" },
        buttons: [
            { text: "Close", action: tour.cancel, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
        modal: true,
    });

    tour.addStep({
        id: "step2",
        text: "Click this button to open a modal and upload a new Blu Autodebet mutation file.",
        attachTo: { element: "#upload-blu", on: "right" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });
    tour.addStep({
        id: "step3",
        text: "Use this filter to view mutation files based on the selected entry date range.",
        attachTo: { element: "#bluDateRange", on: "left" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });


    tour.addStep({
        id: "step4",
        text: "Here you'll find the list of mutation files you've uploaded. Click the options icon (three dots) to view more details.",
        attachTo: { element: "#blu-files-grid", on: "top" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });

};

const bankMutationOfflineTour = (tour) => {
    tour.addStep({
        id: "step1",
        text: "This section provides a quick overview of this month Offline Autodebet mutation insights.",
        attachTo: { element: "#offline-insights" },
        buttons: [
            { text: "Close", action: tour.cancel, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
        modal: true,
    });

    tour.addStep({
        id: "step2",
        text: "Click this button to open a modal and upload a new Offline Autodebet mutation file.",
        attachTo: { element: "#upload-offline", on: "right" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });
    tour.addStep({
        id: "step3",
        text: "Use this filter to view mutation files based on the selected entry date range.",
        attachTo: { element: "#offlineDateRange", on: "left" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });


    tour.addStep({
        id: "step4",
        text: "Here you'll find the list of mutation files you've uploaded. Click the options icon (three dots) to view more details.",
        attachTo: { element: "#offline-files-grid", on: "top" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });

};

const bankMutationAtmTour = (tour) => {
    tour.addStep({
        id: "step1",
        text: "This section provides a quick overview of this month Atm mutation insights.",
        attachTo: { element: "#atm-insights" },
        buttons: [
            { text: "Close", action: tour.cancel, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
        modal: true,
    });

    tour.addStep({
        id: "step2",
        text: "Click this button to open a modal and upload a new Atm Autodebet mutation file.",
        attachTo: { element: "#upload-atm", on: "right" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });
    tour.addStep({
        id: "step3",
        text: "Use this filter to view mutation files based on the selected entry date range.",
        attachTo: { element: "#atmDateRange", on: "left" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });


    tour.addStep({
        id: "step4",
        text: "Here you'll find the list of mutation files you've uploaded. Click the options icon (three dots) to view more details.",
        attachTo: { element: "#atm-files-grid", on: "top" },
        buttons: [
            { text: "Back", action: tour.back, classes: "neutral-btn" },
            { text: "Next", action: tour.next, classes: "primary-btn" },
        ],
    });

};