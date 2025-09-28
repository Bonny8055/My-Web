// Enhanced Data Storage for Projects
const DATA_KEYS = {
    PROJECTS: 'portfolio_projects',
    ACHIEVEMENTS: 'portfolio_achievements'
};

// Enhanced initial projects data
const initialProjects = [
    {
        id: 1,
        title: "VR Clubhouse Experience",
        description: "Immersive VR experience for the construction industry to visualize architectural design in virtual reality.",
        fullDescription: "A comprehensive virtual reality application that allows users to explore and interact with architectural designs in an immersive 3D environment. This project demonstrates advanced VR interaction techniques and realistic environment rendering.",
        image: "Assets/Clubhouse.png",
        link: "https://bhanuprakash.itch.io/villa-vr-view",
        demoLink: "https://bhanuprakash.itch.io/villa-vr-view",
        githubLink: "https://github.com/yourusername/vr-clubhouse",
        category: "vr",
        techStack: ["Unity", "C#", "Blender", "Oculus SDK", "SteamVR"],
        features: [
            "Immersive 3D environment exploration",
            "Real-time object interaction",
            "Multi-platform VR support",
            "Realistic lighting and textures"
        ],
        challenges: "Optimizing performance for standalone VR devices while maintaining high visual fidelity.",
        date: "2024-01-15",
        featured: true
    },
    {
        id: 2,
        title: "Dino Kurradu",
        description: "A basic 2D mobile game where players collect points and must finish the game within 3 lifelines.",
        fullDescription: "An engaging 2D mobile game inspired by classic runner games. Players control a dinosaur character, avoiding obstacles and collecting points while managing limited lifelines.",
        image: "Assets/dino.png",
        link: "https://bhanuprakash.itch.io/dino",
        demoLink: "https://bhanuprakash.itch.io/dino",
        category: "mobile",
        techStack: ["Unity", "C#", "Photoshop", "Mobile SDK"],
        features: [
            "Simple touch controls",
            "Procedural obstacle generation",
            "Score tracking system",
            "Multiple difficulty levels"
        ],
        date: "2023-11-20",
        featured: false
    },
    {
        id: 3,
        title: "Dream Line",
        description: "A 3D mobile game developed for kids' entertainment. Suitable for ages 12 and above.",
        fullDescription: "A colorful and engaging 3D mobile game designed specifically for younger audiences. The game features safe, educational content with entertaining gameplay mechanics.",
        image: "Assets/dream line.png",
        link: "https://bhanuprakash.itch.io/dreamline",
        demoLink: "https://bhanuprakash.itch.io/dreamline",
        category: "mobile",
        techStack: ["Unity", "C#", "Blender", "Mobile SDK"],
        features: [
            "Child-friendly graphics",
            "Educational content",
            "Parental controls",
            "Progress tracking"
        ],
        date: "2023-12-10",
        featured: true,
        status: "completed"
    },
    {
        id: 4,
        title: "AI-Powered NPCs in Metaverse",
        description: "Currently working on advanced AI-powered non-player characters for immersive metaverse experiences.",
        fullDescription: "An ongoing research and development project focusing on creating intelligent NPCs with natural language processing and adaptive behavior for next-generation metaverse platforms.",
        image: "Assets/placeholder.png",
        link: "#",
        category: "ai",
        techStack: ["Python", "TensorFlow", "Unity", "NLP", "Reinforcement Learning"],
        features: [
            "Natural language understanding",
            "Adaptive behavior patterns",
            "Emotional intelligence simulation",
            "Multi-modal interaction"
        ],
        challenges: "Balancing computational efficiency with realistic AI behavior in real-time environments.",
        date: "2024-03-01",
        featured: true,
        status: "in-progress"
    }
];

// Initial achievements data
const initialAchievements = [


    {
        id: 6,
        title: "Jr. XR Developer at AVM Station",
        description: "Leading development of immersive VR/AR applications for industrial training and visualization.",
        date: "2025-09-10"
    },
    {
        id: 5,
        title: "Freelancer - XR Developer",
        description: "Created custom VR/AR solutions for clients in education and real estate sectors.",
        date: "2025-06-20"
    },

    {
        id: 4,
        title: "XR Developer at Edgeforce Solution",
        description: "Leading development of immersive VR/AR applications for industrial training and visualization.",
        date: "2024-02-03"
    },
    {
        id: 3,
        title: "Vice President - Fine Arts Club",
        description: "Organized multiple cultural events and exhibitions, managing a team of 20+ members.",
        date: "2023-08-15"
    },
    {
        id: 2,
        title: "IEEE Active Member",
        description: "Contributed to technical workshops and participated in engineering conferences.",
        date: "2023-06-01"
    },
    {
        id: 1,
        title: "Graduated from Vardhaman College of Engineering",
        description: "Completed Bachelor's degree in Engineering with focus on emerging technologies.",
        date: "2024-05-30"
    }
];

// Data Management Functions
class DataManager {
    constructor() {
        this.initData();
    }

    initData() {
        if (!this.getProjects().length) {
            this.saveProjects(initialProjects);
        }
        if (!this.getAchievements().length) {
            this.saveAchievements(initialAchievements);
        }
    }

    // Projects
    getProjects() {
        return JSON.parse(localStorage.getItem(DATA_KEYS.PROJECTS)) || [];
    }

    saveProjects(projects) {
        localStorage.setItem(DATA_KEYS.PROJECTS, JSON.stringify(projects));
    }

    addProject(project) {
        const projects = this.getProjects();
        project.id = Date.now();
        projects.push(project);
        this.saveProjects(projects);
        return project;
    }

    updateProject(updatedProject) {
        const projects = this.getProjects();
        const index = projects.findIndex(p => p.id === updatedProject.id);
        if (index !== -1) {
            projects[index] = updatedProject;
            this.saveProjects(projects);
            return true;
        }
        return false;
    }

    deleteProject(id) {
        const projects = this.getProjects().filter(p => p.id !== id);
        this.saveProjects(projects);
    }

    // Achievements
    getAchievements() {
        return JSON.parse(localStorage.getItem(DATA_KEYS.ACHIEVEMENTS)) || [];
    }

    saveAchievements(achievements) {
        localStorage.setItem(DATA_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    }

    addAchievement(achievement) {
        const achievements = this.getAchievements();
        achievement.id = Date.now();
        achievements.push(achievement);
        this.saveAchievements(achievements);
        return achievement;
    }

    updateAchievement(updatedAchievement) {
        const achievements = this.getAchievements();
        const index = achievements.findIndex(a => a.id === updatedAchievement.id);
        if (index !== -1) {
            achievements[index] = updatedAchievement;
            this.saveAchievements(achievements);
            return true;
        }
        return false;
    }

    deleteAchievement(id) {
        const achievements = this.getAchievements().filter(a => a.id !== id);
        this.saveAchievements(achievements);
    }
}

// Initialize Data Manager
const dataManager = new DataManager();