// Main Application Logic
class PortfolioApp {
    constructor() {
        this.dataManager = dataManager;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderAchievementsTimeline();
    }

    setupEventListeners() {
        // Profile image click for admin access
        document.getElementById('profileImage').addEventListener('click', () => this.handleAdminAccess());
        
        // View projects button - redirect to projects page
        document.getElementById('viewProjectsBtn').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'pages/projects.html';
        });
    }

    handleAdminAccess() {
        const password = prompt("Enter admin password:");
        if (password === "bhanu123") {
            window.isAdmin = true;
            // Admin panel will be handled by admin.js
            if (window.adminManager) {
                window.adminManager.openAdminPanel();
            }
        } else {
            alert("Incorrect password");
        }
    }


    renderAchievementsTimeline() {
        const timelineContainer = document.getElementById('achievementsTimeline');
        const achievements = this.dataManager.getAchievements();
        
        timelineContainer.innerHTML = '';
        
        // Sort achievements by date (newest first)
        const sortedAchievements = [...achievements].sort((a, b) => 
            new Date(b.date) - new Date(a.date));
        
        sortedAchievements.forEach((achievement, index) => {
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


    // Public method to refresh data (called by admin when data changes)
    refreshData() {
        this.renderAchievementsTimeline();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});