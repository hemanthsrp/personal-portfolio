
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FaGithub, FaLinkedin, FaGraduationCap, FaCertificate, FaBriefcase } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsLink45Deg } from "react-icons/bs";


// ===========================
// Reusable UI Components
// ===========================

// Card: Generic container for project/experience/leadership content.
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#1a1a1a] rounded-2xl p-4 shadow-lg">{children}</div>
);

// Button: Consistent styled button for actions/links.
const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="bg-white text-black px-4 py-2 rounded-2xl hover:bg-gray-200 transition">
    {children}
  </button>
);

// SkillBadge: Animated badge for displaying a skill logo and name.
const SkillBadge = ({ name, src }: { name: string; src: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
    viewport={{ once: true }}
    whileHover={{
      rotateX: 6,
      rotateY: -6,
      scale: 1.1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }}
    className="group flex items-center gap-2 px-4 py-2 bg-[#2c2c2c] text-white rounded-xl shadow border border-gray-700 transform transition-all duration-300 ease-out"
  >
    <img
      src={src}
      alt={name}
      width={20}
      height={20}
      className="object-contain transition-transform duration-300 ease-out"
    />
    <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">{name}</span>
  </motion.div>
);

// Navbar: Fixed navigation bar for section links and highlighting.
const Navbar = ({ activeSection }: { activeSection: string }) => (
  <nav className="fixed top-[0.15rem] left-1/2 -translate-x-1/2 py-0.6 px-6 sm:top-[1.7rem] sm:[initial] z-50 rounded-full bg-white/10 shadow-lg backdrop-blur-md border border-white/20">
    <ul className="flex w-[24rem] flex-wrap items-center justify-center gap-y-2 text-[0.9rem] font-medium sm:w-[initial] sm:flex-nowrap sm:gap-5 transition-colors">
      {['home', 'about', 'projects', 'work', 'leadership', 'skills', 'contact'].map((item, idx) => (
        <li key={idx} className="h-3/4 flex items-center justify-center relative text-black dark:text-white">
          <a
            href={`#${item}`}
            className={`flex w-full items-center justify-center px-3 py-3 uppercase transition ${activeSection === item ? 'text-white' : ''}`}
          >
            {item === 'work' ? 'Experience' : item.charAt(0).toUpperCase() + item.slice(1)}
            {activeSection === item && (
              <motion.span
                layoutId="navbar-highlight"
                className="rounded-full absolute inset-x-0 top-1.5 bottom-1.5 -z-10 bg-blue-400"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);


// ===========================
// Main Portfolio Export
// ===========================

export default function Portfolio() {
  // The font-sans utility is applied globally here, and Sora is set as primary sans in Tailwind config.
  const [activeSection, setActiveSection] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<null | {
    title: string;
    org: string;
    period: string;
    bullets: string[];
    image: string;
    link?: string;
    index: number;
  }>(null);
  const [selectedFilter, setSelectedFilter] = useState("All");

  // ===========================
  // Section Intersection Observer
  // ===========================
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new window.IntersectionObserver(
      (entries) => {
        // Filter all visible (intersecting) entries
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by boundingClientRect.top (closest to top of viewport first)
          const sorted = visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveSection(sorted[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -40% 0px',
        threshold: 0.25
      }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // ===========================
  // Modal Close on Escape
  // ===========================
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedActivity(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="bg-[#111] text-white font-sans scroll-smooth text-center">

      {/* ===========================
          Navbar
      ============================ */}
      <Navbar activeSection={activeSection} />


      {/* ===========================
          Hero Section
      ============================ */}
      <section id="home" className="min-h-screen flex flex-col md:flex-row justify-end items-center px-20 pt-32 gap-20 max-w-[90rem] mx-auto text-left">
        {/* Left Text Block */}
        <div className="flex-1 max-w-2xl text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">Hi, I&#39;m <span className="text-blue-400">Hemanth</span></h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Software Engineering Student @ Iowa State University.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
              Contact me here <HiOutlineMail />
            </a>
            <a href="https://drive.google.com/file/d/17q2fY8a6x09nSX_eRS_cSa_KFNeG88JQ/view?usp=sharing" target="_blank" className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">
              See Resume <BsLink45Deg />
            </a>
            <a href="https://linkedin.com/in/hemanthsrp" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">
              <FaLinkedin />
            </a>
            <a href="https://github.com/hemanthsrp" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Right Image Block */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-[400px] h-[400px] rounded-full shadow-inner overflow-hidden">
            <img
              src="/profile.jpg"
              alt="Hemanth's portrait"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </section>


      {/* ===========================
          About Section
      ============================ */}
      <section id="about" className="min-h-screen flex flex-col items-center justify-center py-20 px-6 w-full max-w-[1500px] mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-6">About Me</h2>
        <p className="text-lg leading-8 text-gray-300 max-w-3xl text-left space-y-6">
          I&apos;m Hemanth, a Software Developer studying Software Engineering at Iowa State University. My specializations lie within AI/ML and Full Stack Development, with expertise in Java, Python, TypeScript, React, AI integrations like PyTorch, TensorFlow, and OpenAI, and cloud platforms such as AWS and Azure.
          <br /><br />
          When I&apos;m not working on projects, you&apos;ll find me diving into student orgs and campus events. If I manage to catch some free time, I&apos;m likely yelling at the TV during a Manchester United match, analyzing Formula 1 data, or eating out with friends.
          <br /><br />
          If you have any project ideas or just want to connect, feel free to reach out!
        </p>
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-[1500px] mx-auto px-4 sm:px-6">
            {/* Education */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 text-left w-full max-w-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 w-12 h-12 rounded-full">
                  <FaGraduationCap className="text-2xl text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-xl font-semibold text-black dark:text-white">Education</h4>
              </div>
              <p className="mb-3 text-black dark:text-gray-300">B.S. in Software Engineering</p>
              <p className="mb-1 text-gray-600 dark:text-gray-500">Iowa State University, Aug 2023 – May 2027</p>
              <p className="mt-6 mb-3 text-black dark:text-gray-300">High School Diploma</p>
              <p className="text-gray-600 dark:text-gray-500">Plano West Sr. H.S. , Aug 2021 - May 2023</p>
            </div>
            {/* Certifications */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 text-left w-full max-w-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 w-12 h-12 rounded-full">
                  <FaCertificate className="text-2xl text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-xl font-semibold text-black dark:text-white">Certifications</h4>
              </div>
              <p className="mb-3 text-black dark:text-gray-300">AWS Certified Cloud Practitioner</p>
              <p className="mb-1 text-gray-600 dark:text-gray-500">Amazon Web Services, 2024</p>
              <p className="mt-6 mb-3 text-black dark:text-gray-300">Microsoft Azure Fundamentals</p>
              <p className="mb-1 text-gray-600 dark:text-gray-500">Microsoft, 2024</p>
            </div>
          </div>
        </div>
      </section>


      {/* ===========================
          Projects Section
      ============================ */}
      <section id="projects" className="min-h-screen py-40 px-6 max-w-7xl mx-auto text-white">
        <h2 className="text-4xl font-semibold mb-6 text-center">Projects</h2>
        <div className="flex justify-center mb-8 gap-3 flex-wrap">
          {['All', 'Java', 'Python', 'React', 'Node.js'].map((filter, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-1 rounded-full text-sm transition ${
                selectedFilter === filter
                  ? 'bg-blue-400 text-white'
                  : 'bg-white/10 text-white hover:bg-blue-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        {(() => {
          const allProjects = [
            {
              title: "Portfolio Website",
              description: "A responsive portfolio website built with React and Tailwind CSS",
              tags: ["React", "Tailwind CSS", "Framer Motion"],
              image: "/project-images/portfolio.png",
              link: "#"
            },
            {
              title: "Robotics Simulation",
              description: "Simulation platform using Unreal Engine and YOLO vision integration",
              tags: ["Python", "OpenCV", "YOLO"],
              image: "/project-images/robotics.png",
              link: "#"
            },
            {
              title: "Task Manager App",
              description: "A productivity app for managing tasks and goals",
              tags: ["React", "Firebase", "Redux", "Material UI"],
              image: "/project-images/taskapp.png",
              link: "#"
            },
            // Example Java project
            {
              title: "Student Management System",
              description: "A desktop application for managing student records, built in Java.",
              tags: ["Java"],
              image: "/project-images/student-management.png",
              link: "#"
            },
            // Example Node.js project
            {
              title: "API Server",
              description: "A RESTful API server using Node.js and Express.",
              tags: ["Node.js"],
              image: "/project-images/api-server.png",
              link: "#"
            },
          ];
          const filteredProjects = selectedFilter === "All"
            ? allProjects
            : allProjects.filter(project => project.tags.includes(selectedFilter));
          return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -10, boxShadow: "0 20px 30px rgba(0,0,0,0.3)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <div className="w-full h-48 relative overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="bg-[#2a2a2a] text-xs text-blue-300 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} className="text-blue-400 font-medium text-sm hover:underline">
                      View Project →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          );
        })()}
      </section>


      {/* ===========================
          Experience Section
      ============================ */}
      <section id="work" className="pt-40 pb-20 px-6 bg-[#111] text-white max-w-6xl w-full mx-auto">
        <h2 className="text-4xl font-semibold text-center mb-2">Work Experience</h2>
        <p className="text-center text-gray-400 mb-12">My professional journey in the world of web development</p>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 flex flex-col items-center">
            {/* Starting dot */}
            <div className="w-6 h-6 bg-blue-400 rounded-full mb-0" />
            {/* Vertical line */}
            <div className="flex-1 w-1 bg-gray-600" />
            {/* Arrowhead pointing down */}
            <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-blue-400 mt-2" />
          </div>
          {/* Experience Timeline Cards */}
          {[
            {
              title: 'Robot Engineering Intern',
              org: 'Brains4Drones',
              period: 'Feb 2022 – Jun 2022',
              subtitle: 'Brains4Drones | Plano, TX',
              image: 'brains4droneslogo.png',
              bullets: [
                'Designed and built custom drone hardware for computer vision research.',
                'Implemented OpenCV pipelines for real-time object detection.',
                'Collaborated with a multidisciplinary team of engineers.'
              ],
              link: 'https://brains4drones.com/',
              icon: <FaBriefcase className="text-blue-400 text-2xl" />,
            },
            {
              title: 'Financial Analyst',
              org: 'DC Partners Capital',
              period: 'Jul 2022 – Oct 2022',
              subtitle: 'DC Partners Capital | Houston, TX (Remote)',
              image: 'dpclogo.jpeg',
              bullets: [
                'Analyzed financial data and prepared investment reports.',
                'Assisted in due diligence for real estate investments.',
                'Worked remotely with cross-functional teams.'
              ],
              link: 'https://www.dcpartners.capital/com/',
              icon: <FaBriefcase className="text-blue-400 text-2xl" />,
            },
            {
              title: 'Software Engineering Intern',
              org: 'Data Annotation',
              period: 'Jun 2024 – Aug 2024',
              subtitle: 'Data Annotation | Dallas, TX',
              image: '/datannotationlogo.svg',
              bullets: [
                'Developing automation scripts for annotation workflows.',
                'Integrating REST APIs for scalable data management.',
                'Improving annotation tool UX for client projects.'
              ],
              link: 'https://dataannotation.tech/',
              icon: <FaBriefcase className="text-blue-400 text-2xl" />,
            },
          ].map((job, idx) => (
            <div
              key={idx}
              className="relative flex items-start mb-24"
            >
              {/* Timeline icon */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-md z-10">
                  {job.icon}
                </div>
              </div>

              {/* Card aligned at top with icon */}
              <div className={`w-full flex mt-0 ${idx % 2 === 0 ? 'justify-start pr-20' : 'justify-end pl-20'}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -10, boxShadow: "0 20px 30px rgba(0,0,0,0.3)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => setSelectedActivity({ ...job, index: idx })}
                  style={{ cursor: "pointer" }}
                  className="bg-[#1a1a1a] rounded-xl p-6 max-w-md w-full shadow-lg text-left"
                >
                  <h3 className="text-lg md:text-xl font-bold mb-1">{job.title}</h3>
                  <p className="text-blue-400 mb-1">{job.subtitle}</p>
                  <span className="text-gray-400 text-sm">{job.period}</span>
                </motion.div>
              </div>
            </div>
          ))}
          <AnimatePresence>
            {selectedActivity && (
              <>
                {/* Modal Backdrop */}
                <motion.div
                  key="backdrop-exp"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="fixed inset-0 bg-black z-50"
                  onClick={() => setSelectedActivity(null)}
                />
                {/* Modal Popup */}
                <motion.div
                  layoutId={`card-${selectedActivity.index}`}
                  key="modal-exp"
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.5, ease: "easeInOut" }}
                  className="fixed inset-0 flex items-center justify-center z-50 p-4"
                  onClick={() => setSelectedActivity(null)}
                >
                  <div
                    className="bg-[#1e1e1e] rounded-2xl max-w-lg w-full p-6 text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {selectedActivity.image && (
                      <div className="relative h-60 w-full mb-4 overflow-hidden rounded-lg">
                        <img
                          src={selectedActivity.image}
                          alt={selectedActivity.title}
                          className="absolute inset-0 w-full h-full object-contain object-center"
                        />
                      </div>
                    )}
                    <h3 className="text-2xl font-semibold mb-2">
                      {selectedActivity.title}
                    </h3>
                    {selectedActivity.org && (
                      <p className="text-gray-300 mb-4">
                        {selectedActivity.org}
                        <br />
                        <span className="text-sm text-gray-400">
                          {selectedActivity.period}
                        </span>
                      </p>
                    )}
                    {selectedActivity.bullets && (
                      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-400">
                        {selectedActivity.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {selectedActivity.link && (
                      <a
                        href={selectedActivity.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="bg-blue-400 text-white px-4 py-2 rounded-full">
                          Visit
                        </button>
                      </a>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>


      {/* ===========================
          Leadership Section
      ============================ */}
      <LayoutGroup>
        <section id="leadership" className="py-40 px-6 flex flex-col items-center justify-center bg-[#111] text-white">
          <h2 className="text-4xl font-semibold mb-12 text-center">Leadership</h2>
          {/* Leadership Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-7xl mx-auto">
            {[
              {
                title: 'Residence Hall Senator',
                org: 'ISU Student Government',
                period: 'Apr 2024 – Present',
                image: '/isustugov.png',
                bullets: [
                  'Represents 8,000+ residents in student government senate.',
                  'Liaises between IRHA and administration for residence life.',
                  'Oversees allocation of $2.6M in student activity fees.'
                ],
                link: 'https://www.stugov.iastate.edu/'
              },
              {
                title: 'Founder & President',
                org: 'VEX U Cyber Robotics Club',
                period: 'Dec 2023 – Present',
                image: '/vexyucyberrobotics.png',
                bullets: [
                  'Lead executive council and manage team communications and progress.',
                  'Organize meetings and ensure compliance with university policies.',
                  'Collaborate on codebase design and autonomous program development.'
                ],
                link: 'http://www.stuorg.iastate.edu/vcrc'
              },
              {
                title: 'VP of Finance',
                org: 'Engineering Student Council',
                period: 'March 2025 – Present',
                image: '/esclogo.png',
                bullets: [
                  'Develop and maintain software for vehicle performance and data analysis.',
                  'Collaborate with mechanical and electrical teams on autonomous systems.'
                ],
                link: 'https://www.engineering.iastate.edu/esc/'
              },
              {
                title: 'Vice President',
                org: 'Friley Hall Senate',
                period: 'Aug 2023 – Present',
                image: '/frileyhall.png',
                bullets: [
                  'Oversee communications and meetings for the largest residence hall on campus.',
                  'Liaise with hall government and student affairs to enhance residential life.'
                ],
                link: 'https://www.housing.iastate.edu/friley'
              }
            ].map((act, idx) => (
              <motion.div
                key={idx}
                className="relative p-4 flex flex-col bg-[#1e1e1e] rounded-xl cursor-pointer overflow-hidden"
                onClick={() => setSelectedActivity({ ...act, index: idx })}
                whileHover={{ scale: 1.05, y: -10, boxShadow: "0 20px 30px rgba(0,0,0,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="h-60 w-full rounded-lg mb-4 overflow-hidden relative">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="absolute inset-0 w-full h-full object-contain object-center"
                  />
                </div>
                <h3 className="font-medium text-white text-base">{act.title}</h3>
                <p className="text-gray-400 text-sm">{act.org}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <AnimatePresence>
          {selectedActivity && (
            <>
              {/* Modal Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed inset-0 bg-black z-50"
                onClick={() => setSelectedActivity(null)}
              />
              {/* Modal Popup */}
              <motion.div
                layoutId={`card-${selectedActivity.index}`}
                key="modal"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.5, ease: "easeInOut" }}
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedActivity(null)}
              >
                <div
                  className="bg-[#1e1e1e] rounded-2xl max-w-lg w-full p-6 text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative h-60 w-full mb-4 overflow-hidden rounded-lg">
                    <img
                      src={selectedActivity.image}
                      alt={selectedActivity.title}
                      className="absolute inset-0 w-full h-full object-contain object-center"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">
                    {selectedActivity.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {selectedActivity.org}
                    <br />
                    <span className="text-sm text-gray-400">
                      {selectedActivity.period}
                    </span>
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-6 text-gray-400">
                    {selectedActivity.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  {selectedActivity.link && (
                    <a
                      href={selectedActivity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="bg-blue-400 text-white px-4 py-2 rounded-full">
                        Visit
                      </button>
                    </a>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>


      {/* ===========================
          Skills Section
      ============================ */}
      <section id="skills" className="py-32 px-4 max-w-7xl mx-auto text-center text-white">
        <h2 className="text-4xl font-semibold mb-4">My Skills</h2>
        <p className="text-gray-400 mb-12"></p>
        {/* Skills Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Frontend */}
          <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-md text-left">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="Frontend" className="h-10 mb-4" />
            <h3 className="text-lg font-bold mb-2">Frontend Development</h3>
            <p className="text-sm text-gray-400 mb-4">Building responsive and interactive user interfaces</p>
            <div className="flex flex-wrap gap-2">
              <SkillBadge name="HTML" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
              <SkillBadge name="CSS" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
              <SkillBadge name="ReactJS" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
              <SkillBadge name="Tailwind CSS" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" />
              <SkillBadge name="JavaScript" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
              <SkillBadge name="TypeScript" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
            </div>
          </div>

          {/* Backend */}
          <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-md text-left">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Backend" className="h-10 mb-4" />
            <h3 className="text-lg font-bold mb-2">Backend Development</h3>
            <p className="text-sm text-gray-400 mb-4">Creating robust and scalable server-side applications</p>
            <div className="flex flex-wrap gap-2">
              <SkillBadge name="Java" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" />
              <SkillBadge name="Python" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />
              <SkillBadge name="C" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" />
              <SkillBadge name="C++" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" />
              <SkillBadge name="NodeJS" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
              <SkillBadge name="NextJS" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" />
            </div>
          </div>

          {/* Database */}
          <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-md text-left">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="Database" className="h-10 mb-4" />
            <h3 className="text-lg font-bold mb-2">Database Management</h3>
            <p className="text-sm text-gray-400 mb-4">Designing and optimizing database structures</p>
            <div className="flex flex-wrap gap-2">
              <SkillBadge name="MongoDB" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" />
              <SkillBadge name="MySQL" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" />
              <SkillBadge name="PostgreSQL" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
            </div>
          </div>

          {/* Tools */}
          <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-md text-left">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Tools" className="h-10 mb-4" />
            <h3 className="text-lg font-bold mb-2">Tools & DevOps</h3>
            <p className="text-sm text-gray-400 mb-4">Boosting workflow and collaboration</p>
            <div className="flex flex-wrap gap-2">
              <SkillBadge name="Git" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />
              <SkillBadge name="GitHub" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
              <SkillBadge name="Postman" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" />
              <SkillBadge name="AWS" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" />
              <SkillBadge name="Docker" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
              <SkillBadge name="Linux" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" />

            </div>
          </div>
        </div>
      </section>


      {/* ===========================
          Contact Section
      ============================ */}
      <section id="contact" className="py-32 px-4 max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">SEND ME A MESSAGE!</h2>
        <p className="text-gray-400 mb-8">
          Please contact me directly at <a href="mailto:hpeddasani7@gmail.com" className="text-blue-400 underline">hpeddasani7@gmail.com</a> or through this form.
        </p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-3 rounded-md bg-[#1e1e1e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <textarea
            rows={5}
            placeholder="Your message"
            className="w-full px-4 py-3 rounded-md bg-[#1e1e1e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition"
          >
            Submit
          </button>
        </form>
        <footer className="text-xs text-gray-500 mt-10">
          &copy; 2024 Hemanth. All rights reserved.<br />
          <span className="text-gray-600 italic">I know it is sad to reach the end of something so awesome :)</span>
        </footer>
      </section>

    </div>
  );
}