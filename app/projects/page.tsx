export default function WorkIndex() {
  const projects = [
    {
      name: "Youth 4 Entrepreneurship",
      description:
        "Created a film on why young people should build and won first place in a nationwide competition. Led to invite to Desjardins Dream the Impossible event in Montreal.",
      link: "https://www.ymcagta.org/blog/congratulations-to-the-winners-of-the-youth-for-entrepreneurship-media-contest-powered-by-desjardins", // Add link later
      date: "2022",
      video: "https://www.youtube.com/watch?v=mHKDR622pCM", // Add video link later
      repo: "",
      writeup:
        "https://www.linkedin.com/posts/alexshibu_dreamtheimpossible-reverlimpossible-activity-7077475467871600640-FrKP/",
    },
    {
      name: "Top 14% in Junior Breakthrough Challenge",
      description:
        "Built a video explaining Radioisotope thermoelectric generators that ranked globally among thousands of entries.",
      link: "#", // Add link later
      date: "2022",
      video: "https://youtu.be/vQcW4T5JnPU?si=OT2fkNW9jxXhedVF", // Add video link later
      repo: "",
      writeup: "",
    },
    {
      name: "easyhacks.org - Hackathon for Rejects",
      description:
        "Created and led EasyHacks, a hackathon for everyone, rejected in an email thread from UBC nwhacks. It transformed into a 10-person operation for 170+ true beginners, from military veterans to high school students in Nepal, with 170+ participants and $8K in prizes raised from sponsors.",
      link: "https://easyhacks.org/",
      date: "2025",
      repo: "",
      video: "",
      writeup: "",
    },
    {
      name: "Circus Clownz NFT",
      description:
        "NFT project where I led a team of 4, partnered with projects, learned Solidity but lacked product market fit.",
      link: "https://web.archive.org/web/20220128132945/https:/circusclownz.com/",
      date: "2021",
      repo: "",
      video: "",
      writeup: "",
    },
    {
      name: "ASLO [Hackathon]",
      description:
        "The development of glasses that can interpret ASL would help bridge the communication gap by allowing wearers to see text translations of what is being signed in real-time, thus making communication easier and more accessible. This technology could have a significant impact on the lives of people who rely on ASL for communication.",
      link: "https://firebasestorage.googleapis.com/v0/b/tks-life-prod.appspot.com/o/items%2FZnFxCGk9nXYoiuJ37ArrGUjiBDB2%2FExplore%20Hackathon%20-%20ASL.pdf?alt=media&token=7d19ef3d-7d77-4059-8bd0-526fef256322",
      date: "2022",
      repo: "",
      video: "https://www.youtube.com/watch?v=1n0SDjeV7Ao",
      writeup: "",
    },

    {
      name: "Easter Seals Assistive Technology ",
      description:
        "Made AI GLASSES for Easter Seals. A raspberry pi that reads text and signs in front of you and uses Google Assistant and Alexa to answer questions and read out loud.",
      link: "",
      date: "2019",
      repo: "",
      video: "",
      writeup: "",
    },
    {
      name: "Unity Game",
      description:
        "Shipped a Unity game but got taken down by Google for 'privacy'.",
      link: "https://www.instagram.com/p/BwTdbmtjkZD/",
      date: "2019",
      video: "",
      repo: "",
      writeup: "",
    },
    {
      name: "Bible Companion on Google Actions",
      description:
        "Shipped Actions on Google app Bible Companion and received $10K in cloud credits.",
      link: "#", // Add link later
      date: "2019",
      video: "",
      repo: "",
      writeup: "",
    },
    {
      name: "Bioblox",
      description: "10x better LinkedIn pic and Tinder pic with 2 clicks.",
      link: "https://web.archive.org/web/20230722063459/https://bioblox.xyz/",
      date: "2023",
      repo: "https://github.com/alexshibu1/photoBloxAI",
      video: "",
      writeup: "",
    },
    {
      name: "Cuddle - AI Focus Hackathon [hackathon]",
      description:
        "The app uses artificial intelligence and K-means clustering to create personalized music for insomniacs, based on their sleep routines and music preferences. It aims to improve sleep quality by providing unique music playlists that are tailored to the individual's sleep patterns and habits. Overall, the goal is to help individuals relax and fall asleep faster by providing personalized playlists.",
      link: "https://firebasestorage.googleapis.com/v0/b/tks-life-prod.appspot.com/o/items%2FZnFxCGk9nXYoiuJ37ArrGUjiBDB2%2FDeck.pdf?alt=media&token=20495ac1-0629-43a1-b3c6-86ceb06c8115",
      date: "2024",
      repo: "",
      video: "",
      writeup: "",
    },
    {
      name: "Reimagining the Future of Finance w/CIBC [TKS]",
      description:
        "Gen Z customers are switching banks, with only 50% remaining loyal to their parents' bank. To retain and attract this demographic, CIBC proposes a reward program, virtual cards, and an interactive learning platform. CIBC hopes to impact 90,000 Canadian youth and increase Gen Z clients by 77% in six months, with a projected 15% conversion to future clients. The plan could increase traffic by 152%.",
      link: "https://firebasestorage.googleapis.com/v0/b/tks-life-prod.appspot.com/o/items%2FZnFxCGk9nXYoiuJ37ArrGUjiBDB2%2FCIBC%20Challenge%20Recommendation%20deck%20%20(1).pdf?alt=media&token=be2d2b45-0450-4bbe-ae23-92509b825136",
      date: "2024",
      repo: "",
      video: "",
      writeup: "",
    },
    {
      name: "bioBlox",
      description:
        "Transform your profiles with AI generated images for a standout professional presence.",
      link: "#", // Add link later
      date: "2024",
      repo: "",
      video: "https://www.youtube.com/watch?v=BjR4rSWL9y4",
      writeup: "",
    },
    {
      name: "Helpa",
      description:
        "Unlock limitless learning with our AI tool, delivering personalized educational resources to empower students worldwide.",
      link: "https://sms.teleporthq.app/",
      date: "2024",
      repo: "",
      video: "https://www.youtube.com/watch?v=zuGTUhnynEg",
      writeup: "",
    },
    {
      name: "AI-Powered Personalized Feedback",
      description:
        "The AI-Powered Personalized Feedback Tool is a transformative technology that offers feedback from the greatest minds in your field. Simply paste your content on the website and receive personalized feedback. The tool aims to break down barriers in education, inspired by the video of Bill Gates and Kevin Scott explaining the challenges many students face in the current system. Built using tutorials and feedback from friends.",
      link: "https://x.com/AlexShibu2/status/1642946139723841548",
      date: "2023",
      repo: "",
      video: "https://www.youtube.com/watch?v=FVZCkDxriFI",
      writeup: "",
    },
    {
      name: "Web3 Message Board",
      description:
        "Connect your wallet and say something on our open message board. Created late 2021.",
      link: "#", // Add link later
      date: "2021",
      repo: "",
      video: "",
      writeup: "",
    },
    {
      name: "Cultivating Ethiopian Coffee Production to Create 5 Million Jobs by 2030 [TKS]",
      description:
        "10 million smallholder coffee farmers in Ethiopia face issues with access to international markets, inefficient farming practices, and inadequate lending options. The proposed solution is to create agriculture centers providing low-interest loans, education and access to international markets. This solution could result in 285% profit increase, creation of 5.6 million jobs by 2030.",
      link: "https://firebasestorage.googleapis.com/v0/b/tks-life-prod.appspot.com/o/items%2FZnFxCGk9nXYoiuJ37ArrGUjiBDB2%2FAlex's%20Copu%20of%20Imrpoving%20Ethiopian%20Coffee%20Farming%20%20(1).pdf?alt=media&token=8d46a90b-6725-409d-b4c6-df28963c3dac",
      date: "2024",
      repo: "",
      video: "",
      writeup: "",
    },
    {
      name: "Fixing diabetes diagnostics with linear regression models",
      description:
        "I wrote about discusses how machine learning is transforming different industries and fields such as healthcare, finance, and transportation. I highlighted the advantages of machine learning such as efficiency and accuracy, and provided examples of how it is being used to solve complex problems and make data-driven decisions. Additionally, I encouraged readers to learn more about machine learning and its potential applications to become part of the transformative change it is bringing to the world. Regarding diabetes diagnostics, I briefly mentioned how machine learning algorithms are analyzing large amounts of patient data to accurately diagnose and predict the progression of diabetes. I also pointed out the potential benefits of using machine learning in improving diabetes care, such as early detection and prevention of complications. However, I noted that this was only a small part of the larger discussion on how machine learning is transforming various industries and fields",
      link: "https://alexshibu.medium.com/trasforming-the-world-with-machine-learnnig-3467389abb0a",
      date: "2023",
      repo: "",
      video: "",
      writeup: "",
    },
    {
      name: "2022 Ethereum Analysis: Regression Analysis on the Ethereum Market",
      description: "Regression Analysis on the Ethereum Market",
      link: "#",
      date: "2022",
      repo: "",
      video: "https://www.youtube.com/watch?v=JaFX-dkkLl0",
      writeup: "",
    },
    {
      name: "SMS AI Tool",
      description:
        "The AI-powered SMS system provides an effective and efficient way for students to learn and improve their skills through mobile devices. The system works by analyzing student responses to questions and providing personalized feedback to help them better understand the material. This personalized approach to learning allows students to learn at their own pace and receive guidance tailored to their unique needs.",
      link: "#",
      date: "2023",
      repo: "",
      video: "https://www.youtube.com/watch?v=p2OSkHM308g",
      writeup: "",
    },
  ];

  // Sort projects by date (newest first)
  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = parseInt(a.date);
    const dateB = parseInt(b.date);
    return dateB - dateA; // Descending order (newest first)
  });

  return (
    <main className="page-content">
      <h1 className="hero-heading">projects</h1>
      <p className="hero-subline">
        projects, side quests, and experiments both past and present.
      </p>

      <ul className="projects-list">
        {sortedProjects.map((project, i) => (
          <li key={i} className="project-item">
            <div className="project-left">
              <div className="project-title-wrapper">
                <a
                  href={project.link}
                  className="project-title"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.name}
                  <span className="project-arrow">↗</span>
                </a>
                {/* Optional link icons - only show if link exists */}
                {project.repo && project.repo !== "" && (
                  <a
                    href={project.repo}
                    className="project-link-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Repository"
                  >
                    💻
                  </a>
                )}
                {project.writeup && project.writeup !== "" && (
                  <a
                    href={project.writeup}
                    className="project-link-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Write-up"
                  >
                    ✍️
                  </a>
                )}
                {project.video && project.video !== "" && (
                  <a
                    href={project.video}
                    className="project-link-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Video"
                  >
                    🎥
                  </a>
                )}
              </div>
              <span className="project-desc">{project.description}</span>
            </div>
            <div className="project-right">
              <span className="project-date">{project.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
