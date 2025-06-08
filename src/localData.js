// Sample project data structure
const sampleProjects = [
  {
    pid: 1,
    user_id: "local_user",
    title: "EcoPod: Sustainable Living Spaces",
    category: "Technology",
    company: "GreenTech Innovations",
    deadline: "2024-12-31",
    text: "EcoPod is a revolutionary modular living space designed for sustainable urban living. Each pod features solar panels, rainwater harvesting, and smart energy management systems. Our goal is to create affordable, eco-friendly housing solutions that reduce carbon footprint while providing modern comfort. The project includes research, prototype development, and initial production setup.",
    img_url:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop",
    amt_requested: 150000,
    amt_pledged: 75000,
    backers: 45,
  },
  {
    pid: 2,
    user_id: "local_user",
    title: "Artisanal Coffee Roastery",
    category: "Food",
    company: "Bean & Brew Collective",
    deadline: "2024-10-15",
    text: "Join us in creating a community-focused coffee roastery that sources beans directly from sustainable farms worldwide. We'll be using traditional roasting methods combined with modern technology to create unique flavor profiles. The space will also serve as a workshop for coffee enthusiasts and barista training. Your support will help us acquire premium equipment and establish direct trade relationships with coffee farmers.",
    img_url:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop",
    amt_requested: 75000,
    amt_pledged: 35000,
    backers: 28,
  },
  {
    pid: 3,
    user_id: "local_user",
    title: "Urban Vertical Garden System",
    category: "Nature & Environment",
    company: "GreenSpace Solutions",
    deadline: "2024-11-30",
    text: "Our modular vertical garden system transforms urban spaces into thriving green environments. The system includes automated irrigation, nutrient delivery, and climate control, making it perfect for both residential and commercial spaces. We're developing smart sensors and an app to help users monitor and maintain their gardens. This project will help bring nature back to concrete jungles while promoting sustainable food production.",
    img_url:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop",
    amt_requested: 120000,
    amt_pledged: 45000,
    backers: 32,
  },
  {
    pid: 4,
    user_id: "local_user",
    title: "Indie Game: Cosmic Explorers",
    category: "Games",
    company: "Stellar Studios",
    deadline: "2024-09-30",
    text: "Cosmic Explorers is an immersive space exploration game where players discover new planets, build colonies, and interact with alien civilizations. The game features procedurally generated worlds, unique alien species, and a rich storyline. We're using cutting-edge game development tools to create stunning visuals and engaging gameplay. Your support will help us complete development and launch on multiple platforms.",
    img_url:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&auto=format&fit=crop",
    amt_requested: 200000,
    amt_pledged: 125000,
    backers: 89,
  },
  {
    pid: 5,
    user_id: "local_user",
    title: "Sustainable Fashion Collection",
    category: "Fashion",
    company: "EcoThreads",
    deadline: "2024-08-31",
    text: "We're creating a sustainable fashion collection using recycled materials and eco-friendly production methods. Each piece is designed to be timeless, durable, and fully recyclable. The collection includes everyday wear, formal attire, and accessories. We're partnering with local artisans and using traditional techniques combined with modern sustainable practices. Your support will help us establish our production facility and launch our first collection.",
    img_url:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop",
    amt_requested: 100000,
    amt_pledged: 60000,
    backers: 42,
  },
  {
    pid: 6,
    user_id: "local_user",
    title: "Interactive Children's Book Series",
    category: "Books",
    company: "StoryWeaver Press",
    deadline: "2024-10-31",
    text: "We're developing a series of interactive children's books that combine traditional storytelling with augmented reality. Each book will feature engaging characters, educational content, and interactive elements that come to life through our companion app. The series focuses on important life lessons, environmental awareness, and cultural diversity. Your support will help us complete the first three books in the series and develop the AR technology.",
    img_url:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop",
    amt_requested: 80000,
    amt_pledged: 35000,
    backers: 25,
  },
];

// Initialize local storage with sample data if empty
const initializeLocalStorage = () => {
  // Force update the sample data
  localStorage.setItem("projects", JSON.stringify(sampleProjects));
};

// Get all projects
const getProjects = () => {
  return JSON.parse(localStorage.getItem("projects")) || [];
};

// Get project by ID
const getProjectById = (pid) => {
  const projects = getProjects();
  return projects.find((project) => project.pid === parseInt(pid));
};

// Add new project
const addProject = (project) => {
  const projects = getProjects();
  const newProject = {
    ...project,
    pid: projects.length + 1,
    user_id: "local_user",
    amt_pledged: 0,
  };
  projects.push(newProject);
  localStorage.setItem("projects", JSON.stringify(projects));
  return newProject;
};

// Update project
const updateProject = (pid, updates) => {
  const projects = getProjects();
  const index = projects.findIndex((project) => project.pid === parseInt(pid));
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates };
    localStorage.setItem("projects", JSON.stringify(projects));
    return projects[index];
  }
  return null;
};

// Delete project
const deleteProject = (pid) => {
  const projects = getProjects();
  const filteredProjects = projects.filter(
    (project) => project.pid !== parseInt(pid)
  );
  localStorage.setItem("projects", JSON.stringify(filteredProjects));
};

export const addFund = (pid, amount) => {
  try {
    const projects = getProjects();
    const projectIndex = projects.findIndex((p) => p.pid === pid);

    if (projectIndex === -1) {
      return false;
    }

    const project = projects[projectIndex];
    const updatedProject = {
      ...project,
      pledged: (project.pledged || 0) + amount,
      backers: (project.backers || 0) + 1,
    };

    projects[projectIndex] = updatedProject;
    localStorage.setItem("projects", JSON.stringify(projects));
    return true;
  } catch (error) {
    console.error("Error adding fund:", error);
    return false;
  }
};

// Initialize local storage when the module is imported
initializeLocalStorage();

export {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
