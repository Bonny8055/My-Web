// Admin Panel Management
class AdminManager {
    constructor() {
        this.dataManager = dataManager;
        this.currentEditingId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderProjectsList();
        this.renderAchievementsList();
    }

    setupEventListeners() {
        // Close admin panel
        document.getElementById('adminClose').addEventListener('click', () => this.closeAdminPanel());
        document.getElementById('adminOverlay').addEventListener('click', () => this.closeAdminPanel());
        
        // Project form submission
        document.getElementById('projectForm').addEventListener('submit', (e) => this.handleProjectSubmit(e));
        
        // Achievement form submission
        document.getElementById('achievementForm').addEventListener('submit', (e) => this.handleAchievementSubmit(e));
        
        // Admin tabs
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });
    }

    openAdminPanel() {
        document.getElementById('adminPanel').classList.add('active');
        document.getElementById('adminOverlay').classList.add('active');
        this.renderProjectsList();
        this.renderAchievementsList();
    }

    closeAdminPanel() {
        document.getElementById('adminPanel').classList.remove('active');
        document.getElementById('adminOverlay').classList.remove('active');
        this.resetForms();
    }

    switchTab(tabId) {
        // Update active tab
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-tab') === tabId) {
                tab.classList.add('active');
            }
        });
        
        // Show active tab content
        document.querySelectorAll('.admin-tab-content').forEach(content => {
            content.classList.remove('active');
            if (content.id === `${tabId}Tab`) {
                content.classList.add('active');
            }
        });
    }

    handleProjectSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const projectData = {
            title: document.getElementById('projectTitle').value,
            description: document.getElementById('projectDescription').value,
            image: document.getElementById('projectImage').value,
            link: document.getElementById('projectLink').value
        };

        if (this.currentEditingId) {
            // Update existing project
            projectData.id = this.currentEditingId;
            if (this.dataManager.updateProject(projectData)) {
                alert('Project updated successfully!');
            }
            this.currentEditingId = null;
        } else {
            // Add new project
            this.dataManager.addProject(projectData);
            alert('Project added successfully!');
        }

        this.renderProjectsList();
        this.refreshPortfolio();
        this.resetForms();
    }

    handleAchievementSubmit(e) {
        e.preventDefault();
        
        const achievementData = {
            title: document.getElementById('achievementTitle').value,
            description: document.getElementById('achievementDesc').value,
            date: document.getElementById('achievementDate').value
        };

        if (this.currentEditingId) {
            // Update existing achievement
            achievementData.id = this.currentEditingId;
            if (this.dataManager.updateAchievement(achievementData)) {
                alert('Achievement updated successfully!');
            }
            this.currentEditingId = null;
        } else {
            // Add new achievement
            this.dataManager.addAchievement(achievementData);
            alert('Achievement added successfully!');
        }

        this.renderAchievementsList();
        this.refreshPortfolio();
        this.resetForms();
    }

    renderProjectsList() {
        const projectsList = document.getElementById('projectsList');
        const projects = this.dataManager.getProjects();
        
        projectsList.innerHTML = '';
        
        if (projects.length === 0) {
            projectsList.innerHTML = '<p>No projects found.</p>';
            return;
        }
        
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'admin-item';
            projectElement.innerHTML = `
                <div>
                    <div class="admin-item-title">${project.title}</div>
                    <div class="admin-item-desc">${project.description.substring(0, 60)}...</div>
                </div>
                <div class="admin-item-actions">
                    <button class="edit-project" data-id="${project.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-project" data-id="${project.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            projectsList.appendChild(projectElement);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-project').forEach(btn => {
            btn.addEventListener('click', () => {
                const projectId = parseInt(btn.getAttribute('data-id'));
                this.editProject(projectId);
            });
        });
        
        document.querySelectorAll('.delete-project').forEach(btn => {
            btn.addEventListener('click', () => {
                const projectId = parseInt(btn.getAttribute('data-id'));
                this.deleteProject(projectId);
            });
        });
    }

    renderAchievementsList() {
        const achievementsList = document.getElementById('achievementsList');
        const achievements = this.dataManager.getAchievements();
        
        achievementsList.innerHTML = '';
        
        if (achievements.length === 0) {
            achievementsList.innerHTML = '<p>No achievements found.</p>';
            return;
        }
        
        achievements.forEach(achievement => {
            const formattedDate = new Date(achievement.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const achievementElement = document.createElement('div');
            achievementElement.className = 'admin-item';
            achievementElement.innerHTML = `
                <div>
                    <div class="admin-item-title">${achievement.title}</div>
                    <div class="admin-item-desc">${formattedDate}</div>
                </div>
                <div class="admin-item-actions">
                    <button class="edit-achievement" data-id="${achievement.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-achievement" data-id="${achievement.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            achievementsList.appendChild(achievementElement);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-achievement').forEach(btn => {
            btn.addEventListener('click', () => {
                const achievementId = parseInt(btn.getAttribute('data-id'));
                this.editAchievement(achievementId);
            });
        });
        
        document.querySelectorAll('.delete-achievement').forEach(btn => {
            btn.addEventListener('click', () => {
                const achievementId = parseInt(btn.getAttribute('data-id'));
                this.deleteAchievement(achievementId);
            });
        });
    }

    editProject(id) {
        const project = this.dataManager.getProjects().find(p => p.id === id);
        if (!project) return;
        
        // Fill form with project data
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectImage').value = project.image;
        document.getElementById('projectLink').value = project.link;
        
        this.currentEditingId = id;
        
        // Switch to projects tab
        this.switchTab('projects');
        
        // Scroll to form
        document.getElementById('projectForm').scrollIntoView({ behavior: 'smooth' });
        
        // Change button text
        const submitBtn = document.querySelector('#projectForm button');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Project';
    }

    editAchievement(id) {
        const achievement = this.dataManager.getAchievements().find(a => a.id === id);
        if (!achievement) return;
        
        // Fill form with achievement data
        document.getElementById('achievementTitle').value = achievement.title;
        document.getElementById('achievementDesc').value = achievement.description;
        document.getElementById('achievementDate').value = achievement.date;
        
        this.currentEditingId = id;
        
        // Switch to achievements tab
        this.switchTab('achievements');
        
        // Scroll to form
        document.getElementById('achievementForm').scrollIntoView({ behavior: 'smooth' });
        
        // Change button text
        const submitBtn = document.querySelector('#achievementForm button');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Achievement';
    }

    deleteProject(id) {
        if (confirm('Are you sure you want to delete this project?')) {
            this.dataManager.deleteProject(id);
            this.renderProjectsList();
            this.refreshPortfolio();
            alert('Project deleted successfully!');
        }
    }

    deleteAchievement(id) {
        if (confirm('Are you sure you want to delete this achievement?')) {
            this.dataManager.deleteAchievement(id);
            this.renderAchievementsList();
            this.refreshPortfolio();
            alert('Achievement deleted successfully!');
        }
    }

    resetForms() {
        document.getElementById('projectForm').reset();
        document.getElementById('achievementForm').reset();
        
        const projectSubmitBtn = document.querySelector('#projectForm button');
        const achievementSubmitBtn = document.querySelector('#achievementForm button');
        
        projectSubmitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Project';
        achievementSubmitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Achievement';
        
        this.currentEditingId = null;
    }

    refreshPortfolio() {
        if (window.portfolioApp) {
            window.portfolioApp.refreshData();
        }
    }
}

// Initialize Admin Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminManager = new AdminManager();
});