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
