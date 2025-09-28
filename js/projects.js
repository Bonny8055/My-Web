// Projects Management
class ProjectsManager {
    constructor() {
        this.dataManager = dataManager;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderProjects();
    }

    setupEventListeners() {
        // View projects button
        const viewProjectsBtn = document.getElementById('viewProjectsBtn');
        if (viewProjectsBtn) {
            viewProjectsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openProjectsModal();
            });
        }
        
        
        // Filter buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const filter = e.target.getAttribute('data-filter');
                this.setFilter(filter);
            }
        });
        
        // Project detail modals
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-details-btn')) {
                const projectId = parseInt(e.target.getAttribute('data-project-id'));
                this.openProjectDetails(projectId);
            }
        });
        
        // Close project details
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('project-details-close') || 
                e.target.classList.contains('project-details-modal')) {
                this.closeProjectDetails();
            }
        });
    }

    renderProjects(containerId = 'projectsGrid') {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const projects = this.getFilteredProjects();
        
        container.innerHTML = '';
        
        if (projects.length === 0) {
            container.innerHTML = `
                <div class="no-projects">
                    <i class="fas fa-folder-open" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <h3>No projects found</h3>
                    <p>No projects match the current filter.</p>
                </div>
            `;
            return;
        }
        
        projects.forEach(project => {
            const card = this.createProjectCard(project);
            container.appendChild(card);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" onerror="this.src='Assets/placeholder.png'">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-meta">
                ${project.techStack ? `
                    <div class="project-tech-preview">
                        ${project.techStack.slice(0, 3).map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                        ${project.techStack.length > 3 ? `<span class="tech-tag">+${project.techStack.length - 3}</span>` : ''}
                    </div>
                ` : ''}
            </div>
            <div class="project-actions" style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center;">
                <a href="${project.link}" target="_blank" class="btn btn-primary">
                    <i class="fas fa-external-link-alt"></i> View Project
                </a>
                <button class="btn btn-secondary view-details-btn" data-project-id="${project.id}">
                    <i class="fas fa-info-circle"></i> Details
                </button>
            </div>
        `;
        return card;
    }

    getFilteredProjects() {
        const projects = this.dataManager.getProjects();
        
        if (this.currentFilter === 'all') {
            return projects;
        }
        
        // You can add more filter logic here based on project categories
        return projects.filter(project => 
            project.category === this.currentFilter || 
            (project.techStack && project.techStack.includes(this.currentFilter))
        );
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            }
        });
        
        this.renderProjects();
    }

    openProjectsModal() {
        // Always redirect to projects page
        window.location.href = 'pages/projects.html';
    }

    closeProjectsModal() {
        // Redirect back to home page
        window.location.href = '../index.html';
    }

    openProjectDetails(projectId) {
        const project = this.dataManager.getProjects().find(p => p.id === projectId);
        if (!project) return;
        
        const modal = document.getElementById('projectDetailsModal');
        const content = document.getElementById('projectDetailsContent');
        
        if (!modal || !content) {
            // If modal doesn't exist, open in new page or show alert
            window.open(project.link, '_blank');
            return;
        }
        
        content.innerHTML = this.createProjectDetailsHTML(project);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeProjectDetails() {
        const modal = document.getElementById('projectDetailsModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    createProjectDetailsHTML(project) {
        return `
            <button class="project-details-close">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="project-details-header">
                <h2>${project.title}</h2>
                <p class="project-date">${project.date ? new Date(project.date).toLocaleDateString() : 'Ongoing'}</p>
            </div>
            
            <img src="${project.image}" alt="${project.title}" class="project-details-image" onerror="this.src='../Assets/placeholder.png'">
            
            <div class="project-details-info">
                <div class="project-details-section">
                    <h3>Description</h3>
                    <p>${project.description}</p>
                    ${project.fullDescription ? `<p>${project.fullDescription}</p>` : ''}
                </div>
                
                <div class="project-details-section">
                    <h3>Technologies</h3>
                    <div class="project-tech-stack">
                        ${project.techStack ? project.techStack.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('') : '<p>No technologies specified</p>'}
                    </div>
                </div>
                
                ${project.features ? `
                <div class="project-details-section">
                    <h3>Key Features</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${project.challenges ? `
                <div class="project-details-section">
                    <h3>Challenges & Solutions</h3>
                    <p>${project.challenges}</p>
                </div>
                ` : ''}
            </div>
            
            <div class="project-links">
                ${project.demoLink ? `
                <a href="${project.demoLink}" target="_blank" class="btn btn-primary">
                    <i class="fas fa-play-circle"></i> Live Demo
                </a>
                ` : ''}
                
                <a href="${project.link}" target="_blank" class="btn btn-primary">
                    <i class="fas fa-external-link-alt"></i> View Project
                </a>
                
                ${project.githubLink ? `
                <a href="${project.githubLink}" target="_blank" class="btn btn-secondary">
                    <i class="fab fa-github"></i> Source Code
                </a>
                ` : ''}
            </div>
        `;
    }

    // Public method to refresh projects (called when data changes)
    refreshProjects() {
        this.renderProjects();
        
        // Also refresh in projects page if open
        const projectsContainer = document.getElementById('projectsGrid');
        if (projectsContainer) {
            this.renderProjects('projectsGrid');
        }
    }

    // Method to get projects by category
    getProjectsByCategory(category) {
        return this.dataManager.getProjects().filter(project => 
            project.category === category
        );
    }

    // Method to get featured projects
    getFeaturedProjects() {
        return this.dataManager.getProjects().filter(project => 
            project.featured === true
        );
    }
}

// Initialize Projects Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.projectsManager = new ProjectsManager();
});