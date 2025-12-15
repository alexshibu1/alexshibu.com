export default function WorkIndex() {
  const projects = [
    {
      name: "Project Name",
      description: "A one-liner description of what this project does",
      link: "https://github.com/username/repo",
      date: "2024",
    },
    {
      name: "Another Project",
      description: "Another brief description here",
      link: "https://youtube.com/",
      date: "2023",
    },
    // Add more projects here
  ];

  return (
    <main className="page-content">
      <h1 className="hero-heading">projects</h1>
      <p className="hero-subline">
        projects, side quests, and experiments both past and present.
      </p>

      <ul className="projects-list">
        {projects.map((project, i) => (
          <li key={i} className="project-item">
            <div className="project-left">
              <h3 className="project-title">{project.name}</h3>
              <span className="project-desc">{project.description}</span>
            </div>
            <div className="project-right">
              <a
                href={project.link}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.link.includes("github") ? "github" : "video"}
              </a>
              <span className="project-date">{project.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
