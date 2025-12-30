"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Project = {
  name: string;
  description: string;
  link: string;
  date: string;
  video?: string;
  repo?: string;
  writeup?: string;
  featured?: boolean;
  image?: string;
};

function FeaturedIndicator({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.span
      animate={
        isHovered
          ? {
              width: 4,
              height: 12,
              borderRadius: 999,
              opacity: 1,
            }
          : {
              width: 5,
              height: 5,
              borderRadius: 999,
              opacity: 0.6,
            }
      }
      className="flex items-center justify-center"
      initial={false}
      style={{
        background: "#ff3a3a",
        display: "inline-block",
      }}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 22,
      }}
    />
  );
}

function BigProjectButton({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.4rem 0.8rem",
        borderRadius: "6px",
        cursor: "pointer",
        border: "none",
        background: "transparent",
        transition: "background-color 0.2s ease",
        backgroundColor: isActive ? "rgba(255, 58, 58, 0.1)" : "transparent",
      }}
      whileHover={{
        backgroundColor: isActive
          ? "rgba(255, 58, 58, 0.15)"
          : "rgba(0, 0, 0, 0.02)",
      }}
    >
      <motion.span
        animate={
          isHovered
            ? {
                width: 4,
                height: 12,
                borderRadius: 999,
              }
            : {
                width: 5,
                height: 5,
                borderRadius: 999,
              }
        }
        initial={false}
        style={{
          background: isActive ? "#ff3a3a" : isHovered ? "#ff3a3a" : "#ff3a3a",
          display: "inline-block",
          opacity: isActive ? 1 : isHovered ? 1 : 0.6,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 22,
        }}
      />
      <span
        style={{
          fontSize: "14px",
          color: isActive ? "#ff3a3a" : "#666",
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 400,
          transition: "color 0.2s ease",
        }}
      >
        {isActive ? "big projects" : "big project"}
      </span>
    </motion.button>
  );
}

function ProjectItem({ project }: { project: Project }) {
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  return (
    <li className="project-item">
      <div className="project-left">
        <div
          className="project-title-wrapper"
          onMouseEnter={() => setIsTitleHovered(true)}
          onMouseLeave={() => setIsTitleHovered(false)}
        >
          {project.featured && (
            <span style={{ marginRight: "0.3rem", verticalAlign: "middle" }}>
              <FeaturedIndicator isHovered={isTitleHovered} />
            </span>
          )}
          {(project.link && project.link !== "") ||
          (project.image && project.image !== "") ? (
            <a
              href={
                project.link && project.link !== ""
                  ? project.link
                  : project.image
              }
              className="project-title"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}
              <span className="project-arrow">↗</span>
            </a>
          ) : (
            <span className="project-title" style={{ cursor: "default" }}>
              {project.name}
            </span>
          )}
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
          {project.image && project.image !== "" && (
            <a
              href={project.image}
              className="project-link-icon"
              target="_blank"
              rel="noopener noreferrer"
              title="View Image"
            >
              📷
            </a>
          )}
        </div>
        <span className="project-desc">{project.description}</span>
      </div>
      <div className="project-right">
        <span className="project-date">{project.date}</span>
      </div>
    </li>
  );
}

export default function WorkIndex() {
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);

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
      name: "Breakthrough Junior Challenge",
      description:
        "Top 14% global finalist for the challenge, explaining quantum computing fundamentals, superposition, entanglement, and John Bell's Theorem. Built a video explaining Radioisotope thermoelectric generators that ranked globally among thousands of entries.",
      link: "#", // Add link later
      date: "2022",
      video: "https://www.youtube.com/watch?v=xuL75NnIcks&t=11s",
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
      video: "https://www.youtube.com/watch?v=BUFH1s5iUtw&t=55s",
      writeup: "",
      featured: true,
    },
    {
      name: "LUMA (Luminous Understanding through Mindful AI)",
      description:
        "Built generative-AI meditation app with neural voice, ultra-low-latency audio mixing. LUMA uses generative AI to create a unique, personalized meditation experience on demand, addressing the global mental health crisis by making effective, accessible mindfulness practices available to everyone. Built with React, Flask, Cohere Command-R LLM, Google Cloud TTS, and pydub. Submitted to GenAI Genesis 2025.",
      link: "https://devpost.com/software/luma-luminous-understanding-through-mindful-ai",
      date: "2025",
      repo: "https://github.com/e-ndorfin/luma",
      video: "https://www.youtube.com/watch?v=neO-K2qJo6Y&t=20s",
      writeup: "",
    },
    {
      name: "BenchBot - Internal Slack AI for BenchSci",
      description:
        "Built an internal Slack AI (BenchBot) prototype to streamline HR/business communications and modeled a $4.5M annual savings scenario that CIBC stakeholders adopted as an internal estimate. Repetitive queries and information overload are hindering BenchSci's productivity up to 104,000 hours annually. As BenchSci's team size doubled from 200 to 400+ employees in 2022, repetition of common administrative and technical questions asked by new and existing employees have surged.",
      link: "",
      date: "2024",
      repo: "",
      video: "https://www.youtube.com/watch?v=Mqb1hEqly_Y",
      writeup: "",
    },
    {
      name: "BridgeWorks Fellowship - Increase Youth Employment",
      description:
        "Pitch for BridgeWorks Fellowship focused on increasing youth employment opportunities.",
      link: "/projects/bridgeworks.pdf",
      date: "2024",
      repo: "",
      video: "https://www.youtube.com/watch?v=Jz48kAlGy3o&t=25s",
      writeup: "",
    },
    {
      name: "Avalonn - Voice Agents for SMBs",
      description:
        "Co-founded Avalonn, a 24/7 voice agent that answers common inquiries in under 8s, books jobs and quotes with automatic CRM updates, and escalates emergencies via SMS, helping small businesses recover roughly $78 per missed call on average. Built using React + Flask + ElevenLabs + OpenAI + Twilio. Found early stage traction through customer interviews, live demos and onboarding local service businesses in plumbing, HVAC, and retail, integrating into their existing workflows. Received $25k in AWS credits, participated in DMZ Basecamp and featured in UofT Centre for Entrepreneurship founder showcases.",
      link: "https://www.youtube.com/watch?v=qsD2kOopCK4",
      date: "2025",
      repo: "",
      video: "https://www.youtube.com/watch?v=dnusNHRDGMo",
      writeup:
        "https://www.entrepreneurship.artsci.utoronto.ca/news/we-asked-7-founders-what-sparked-your-startup-idea",
      featured: true,
    },
    {
      name: "CoachMi.co",
      description:
        "Forge your path with Titans - AI-powered mentorship platform that provides guidance from industry giants. Features custom virtual boardrooms, optimized action roadmaps, and 50+ decision-making frameworks.",
      link: "https://web.archive.org/web/20240924161229/http://www.coachmi.co/",
      date: "2024",
      repo: "",
      video: "https://www.youtube.com/watch?v=xWqw_l3Nh2M",
      writeup:
        "https://docs.google.com/presentation/d/1kiCEzGCJV-VriZXeSeexSCXZerS3k28HrKrysDQ4vbE/edit?slide=id.g26767847792_2_120#slide=id.g26767847792_2_120",
    },
    {
      name: "Circus Clownz NFT",
      description:
        "hired 2 ppl; created nfts, social media, and discord community; Did not launch due to the lack of long-term utility.",
      link: "/essay/circusclownz",
      date: "2021",
      repo: "https://web.archive.org/web/20220128132945/https:/circusclownz.com/",
      video: "https://youtu.be/_ycxR8aP980?si=oeGxGrFIYkKJ_gkC",
      writeup:
        "https://docs.google.com/presentation/d/1EGrDyCZGxc3NRiDLo3721Ev--xtsH0U9p3JEGijZNIs/edit?slide=id.p#slide=id.p",
      featured: true,
    },
    {
      name: "ASL Glasses [Hackathon]",
      description:
        "Designed AR glasses translating sign language to text using transformers and OCR, demoed prototype. The development of glasses that can interpret ASL would help bridge the communication gap by allowing wearers to see text translations of what is being signed in real-time, thus making communication easier and more accessible.",
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
        "Built an AI-powered sleep-music generator using K-means clustering for personalized audio. The app uses artificial intelligence and K-means clustering to create personalized music for insomniacs, based on their sleep routines and music preferences. Hackathon finalist with Figma prototype.",
      link: "https://www.figma.com/design/WJ7zap2lEOHglmLiuYWH2K/Cyberpunk-Music-App--Community-?node-id=0-1&p=f",
      date: "2024",
      repo: "",
      video: "",
      writeup: "",
    },
    {
      name: "CIBC Rewards - UX Design [TKS]",
      description:
        "Designed a consulting prototype for CIBC Rewards using Figma, modeling user engagement and projecting lift. Worked to increase Gen Z adoption of CIBC projecting up to 77% increase in Gen Z adoption through prototype user testing and survey analysis. Gen Z customers are switching banks, with only 50% remaining loyal to their parents' bank.",
      link: "https://www.figma.com/file/X8pq2OGANVnQhQkyE5bTzR/CIBC-Rewards-Design",
      date: "2024",
      repo: "",
      video: "",
      writeup: "",
    },
    {
      name: "BioBlox",
      description:
        "Developed a 2-click AI system for professional-quality profile images using Stable Diffusion, serving 50+ users and fine-tuned on 10–12 samples. Transform your profiles with AI generated images for a standout professional presence.",
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
        "Wallet-gated message wall for authenticated messages and posts. Connect your wallet and say something on our open message board. Created late 2021.",
      link: "#", // Add link later
      date: "2021",
      repo: "https://github.com/alexshibu1/web3-message-board",
      video: "",
      writeup: "",
    },
    {
      name: "Legacy iPhone 4 Revival",
      description:
        "Restored full usability to iOS 7 devices by engineering a downgrade/jailbreak to iOS 6, fully documented for the community. Used iOS 6, Jailbreak, and Cydia tools.",
      link: "",
      date: "2024",
      repo: "",
      video: "https://www.youtube.com/watch?v=mIjrcIrA4IM",
      writeup: "",
    },
    {
      name: "Instagram Theme Pages ",
      description:
        "Built and grew multiple Instagram theme pages including Bath Bombs For Vanauley (595 followers), Healthy Life Tips (621 followers), and Game Lynxe (739 followers). Received around $500 in free products across channels through partnerships and sponsorships.",
      link: "https://www.instagram.com/bath.bombs.for.vanauley/",
      date: "2020",
      repo: "",
      video: "",
      writeup: "",
      image: "/projects/gaming.png",
    },
    {
      name: "Bath Bombs for Vanauley",
      description:
        "Launched a Shopify storefront for bath bomb fundraising for the Vanauley homeless shelter with Instagram while learning e-commerce and order fulfillment workflows. Built using Shopify, Marketing, and Frontend development.",
      link: "https://www.linkedin.com/in/alexshibu/details/experience/1753015047/multiple-media-viewer/?profileId=ACoAACk8q9ABrmBqQ4wz9R3Ev5JU1iATl26x-5M&treasuryMediaId=1719025718914/",
      date: "2020",
      repo: "",
      video: "",
      writeup: "",
      image: "/projects/bathbombs.png",
    },
    {
      name: "Cube Runner",
      description: "A Unity game project - cube runner style game.",
      link: "/projects/cube.png",
      date: "2019",
      repo: "",
      video: "",
      writeup: "",
      image: "/projects/cube.png",
    },
    {
      name: "Calculator App 1.1",
      description: "Calculator application built in 2018.",
      link: "/projects/cal link.png",
      date: "2018",
      repo: "",
      video: "",
      writeup: "",
      image: "/projects/cal main.png",
    },
    {
      name: "Logos Quiz Academy",
      description:
        "Student platform to prepare for the Logo Quiz Exam. Web development using HTML & Javascript, WordPress, and course development. Project failed because I was too late for the market and the project got boring.",
      link: "",
      date: "2019",
      repo: "",
      video: "",
      writeup: "",
      image: "/projects/logos.png",
    },
    {
      name: "First YouTube Channel",
      description:
        "Started my first YouTube channel and received around $500 in free products across channels through partnerships and sponsorships.",
      link: "https://www.youtube.com/watch?v=ShW01SDJI0c",
      date: "2018",
      repo: "",
      video: "https://www.youtube.com/watch?v=ShW01SDJI0c",
      writeup: "",
    },
    {
      name: "Ethiopian Coffee Strategy [TKS]",
      description:
        "Developed agri-center model projecting 5.6M jobs and a 285% profit increase for Ethiopian farmers by 2030 based on export and yield data. Worked with a 4-person team to develop strategic solutions to problems faced by 10 million Ethiopian coffee farmers, proposing 5.6M jobs based on agricultural data and stakeholder input. 10 million smallholder coffee farmers in Ethiopia face issues with access to international markets, inefficient farming practices, and inadequate lending options.",
      link: "https://www.linkedin.com/in/alexshibu/details/projects/1635528864697/single-media-viewer?type=DOCUMENT",
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
      name: "Ethereum Trend Analysis",
      description:
        "Ran deep-dive technical analysis on Ethereum price trends, built sheets & regression models, published insights and project video for public walkthrough. Full-stack Web3 project with technical analysis.",
      link: "#",
      date: "2022",
      repo: "",
      video: "https://youtu.be/JaFX-dkkLl0?si=5XxSh6zqk1TdqF7P",
      writeup: "",
    },
    {
      name: "SMS AI Tool",
      description:
        "Developed a mobile Q&A system using Twilio and OpenAI providing personalized feedback and reducing help-response time for users. The AI-powered SMS system provides an effective and efficient way for students to learn and improve their skills through mobile devices.",
      link: "#",
      date: "2023",
      repo: "",
      video: "https://www.youtube.com/watch?v=kNTfCxXBre4",
      writeup: "",
    },
  ];

  // Filter projects if showing only featured
  const filteredProjects = showOnlyFeatured
    ? projects.filter((p) => p.featured)
    : projects;

  // Sort projects by date (newest first)
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const dateA = parseInt(a.date);
    const dateB = parseInt(b.date);
    return dateB - dateA; // Descending order (newest first)
  });

  // Count featured projects
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <main className="page-content">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <h1 className="hero-heading">projects</h1>
        {featuredCount > 0 && (
          <BigProjectButton
            isActive={showOnlyFeatured}
            onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
          />
        )}
      </div>
      <p className="hero-subline">some of past and present work and projects</p>

      <ul className="projects-list">
        {sortedProjects.map((project, i) => (
          <ProjectItem key={i} project={project} />
        ))}
      </ul>
    </main>
  );
}
