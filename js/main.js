// Main Application Logic
class PortfolioApp {
    constructor(dataManager) {
        this.dataManager = dataManager; // Dependency is injected
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderAchievementsTimeline();
    }

    setupEventListeners() {

        // ====== PROFILE IMAGE CLICK (admin) ======
        const profileImage = document.getElementById('profileImage');
        if (profileImage) {
            profileImage.addEventListener('click', () => this.handleAdminAccess());
        }

        // ====== VIEW PROJECTS BUTTON ======
        const viewProjectsBtn = document.getElementById('viewProjectsBtn');
        if (viewProjectsBtn) {
            viewProjectsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'pages/projects.html';
            });
        }

        // ====== T&C CHECK + ESCAPE BUTTON LOGIC ======
        const agreeCheckbox = document.getElementById("agreeCheckbox");
        
        if (agreeCheckbox) {
            // This event fires as soon as the checkbox state changes (checked or unchecked).
            agreeCheckbox.addEventListener("change", () => {
                // When the checkbox is checked, redirect immediately.
                if (agreeCheckbox.checked) {
                    window.location.href = "pages/Products.html";
                } 
                // No 'else' block is needed, as nothing should happen if they uncheck it.
            });
        }
    }

    handleAdminAccess() {
        const password = prompt("Enter admin password:");
        if (password === "bhanu123") {
            window.isAdmin = true;
            if (window.adminManager) {
                window.adminManager.openAdminPanel();
            }
        } else {
            alert("Incorrect password");
        }
    }

    renderAchievementsTimeline() {
        const timelineContainer = document.getElementById('achievementsTimeline');
        if (!timelineContainer) return;

        const achievements = this.dataManager.getAchievements();
        timelineContainer.innerHTML = '';

        const sortedAchievements = [...achievements].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

        sortedAchievements.forEach((achievement) => {
            const formattedDate = new Date(achievement.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const achievementElement = document.createElement('div');
            achievementElement.className = 'timeline-item';
            achievementElement.innerHTML = `
                <div class="timeline-content">
                    <div class="timeline-date">${formattedDate}</div>
                    <h4 class="timeline-title">${achievement.title}</h4>
                    <p class="timeline-desc">${achievement.description}</p>
                </div>
            `;
            timelineContainer.appendChild(achievementElement);
        });
    }

    refreshData() {
        this.renderAchievementsTimeline();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Ensure dataManager is available before initializing the app
    if (typeof dataManager !== 'undefined') {
        window.portfolioApp = new PortfolioApp(dataManager);
    } else {
        console.error("dataManager is not defined. Make sure data.js is loaded before main.js");
    }
});
