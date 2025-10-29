import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaSun,
  FaMoon,
  FaJava,
  FaDocker,
  FaEnvelope,
  FaPhone,
  FaAws,
  FaMicrosoft,
} from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiMysql,
  SiMongodb,
  SiPhp,
  SiBootstrap,
  SiExpress,
  SiLaravel,
  SiKubernetes,
  SiSpringboot,
  SiDotnet,
  SiTailwindcss,
  SiJenkins,
  SiSqlite,
  SiOracle,
  SiFirebase,
  SiAppwrite,
  SiR,
  SiKotlin,
} from "react-icons/si";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Assets (keep your actual paths)
import profile from "./assets/profile.jpeg";
import edubridge from "./assets/projects/edubridge.png";
import educode from "./assets/projects/educode.png";
import solarconnect from "./assets/projects/solar.png";
import xyz from "./assets/projects/xyz.png";
import fitness from "./assets/projects/fitness.png";
import vidma from "./assets/projects/vidma.png";

import sliitLogo from "./assets/logo/sliit.png";
import usjLogo from "./assets/logo/japu_logo.png";
import anandaLogo from "./assets/logo/ananda_logo.png";

const SectionTitle = ({ title, subtitle }) => (
  <div className="section-title">
    <h2 className="mb-2">{title}</h2>
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
  </div>
);

const ProjectCard = ({ img, title, desc, link, techs, darkMode }) => (
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
    <Card className="project-card h-100">
      <div className="project-media">
        <Card.Img loading="lazy" alt={title} src={img} />
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="project-desc">{desc}</Card.Text>

        {/* --- Technology Tags --- */}
        <div className="tech-tags mb-3">
          {techs.map((t, idx) => (
            <span key={idx} className="tech-tag">
              {t}
            </span>
          ))}
        </div>

        <Button
          size="sm"
          variant={darkMode ? "success" : "dark"}
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          View Project
        </Button>
      </Card.Body>
    </Card>
  </motion.div>
);

const SkillGrid = ({ title, items }) => (
  <div className="mb-4">
    <h4 className="skill-heading">{title}</h4>
    <Row className="g-3 justify-content-center">
      {items.map((s, idx) => (
        <Col xs={6} sm={4} md={2} key={`${s.name}-${idx}`}>
          <motion.div
            className="skill-chip"
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            title={s.name}
            aria-label={s.name}
          >
            <span className="skill-icon">{s.icon}</span>
            <span className="skill-name">{s.name}</span>
          </motion.div>
        </Col>
      ))}
    </Row>
  </div>
);

const App = () => {
  // Theme with persistence
  const systemPrefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : systemPrefersDark;
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((v) => !v);

  // Active section (robust scroll logic)
  const [active, setActive] = useState("home");
  const sectionIds = useRef([
    "home",
    "about",
    "education",
    "skills",
    "projects",
    "contact",
  ]);
  const headerOffset = 76; // match navbar height

  useEffect(() => {
    const sections = sectionIds.current
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + headerOffset + 1;
          let current = "home";
          for (const sec of sections) {
            if (sec.offsetTop <= scrollPos) current = sec.id;
          }
          setActive(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll(); // set initial
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const skills = useMemo(
    () => ({
      Languages: [
        { icon: <SiC size={50} color="#A8B9CC" />, name: "C" },
        { icon: <SiCplusplus size={50} color="#00599C" />, name: "C++" },
        { icon: <FaJava size={50} color="#f89820" />, name: "Java" },
        { icon: <FaJs size={50} color="#F7DF1E" />, name: "JavaScript" },
        { icon: <SiPhp size={50} color="#8993be" />, name: "PHP" },
        { icon: <FaPython size={50} color="#3776AB" />, name: "Python" },
        { icon: <SiKotlin size={50} color="#7f52ff" />, name: "Kotlin" },
        { icon: <SiR size={50} color="#276DC3" />, name: "R" },
        { icon: <FaHtml5 size={50} color="#E34F26" />, name: "HTML" },
        { icon: <FaCss3Alt size={50} color="#1572B6" />, name: "CSS" },
      ],
      "Libraries & Frameworks": [
        { icon: <FaReact size={50} color="#61DBFB" />, name: "React" },
        { icon: <SiDotnet size={50} color="#512BD4" />, name: ".NET" },
        {
          icon: <SiSpringboot size={50} color="#6DB33F" />,
          name: "Spring Boot",
        },
        { icon: <FaNodeJs size={50} color="#3C873A" />, name: "Node.js" },
        { icon: <SiExpress size={50} color="#545151ff" />, name: "Express.js" },
        { icon: <SiLaravel size={50} color="#f55247" />, name: "Laravel" },
      ],
      "UI Frameworks": [
        { icon: <SiBootstrap size={50} color="#563d7c" />, name: "Bootstrap" },
        {
          icon: <SiTailwindcss size={50} color="#06B6D4" />,
          name: "Tailwind CSS",
        },
      ],
      Databases: [
        { icon: <SiMysql size={50} color="#00758F" />, name: "MySQL" },
        { icon: <SiMongodb size={50} color="#47A248" />, name: "MongoDB" },
        { icon: <SiSqlite size={50} color="#003B57" />, name: "SQLite" },
        { icon: <SiOracle size={50} color="#F80000" />, name: "Oracle" },
        { icon: <SiFirebase size={50} color="#FFCA28" />, name: "Firebase" },
        { icon: <SiAppwrite size={50} color="#F02E65" />, name: "AppWrite" },
      ],
      Cloud: [
        { icon: <FaAws size={50} color="#FF9900" />, name: "AWS" },
        { icon: <FaMicrosoft size={50} color="#00A4EF" />, name: "Azure" },
      ],
      Tools: [
        { icon: <FaDocker size={50} color="#0db7ed" />, name: "Docker" },
        {
          icon: <SiKubernetes size={50} color="#326ce5" />,
          name: "Kubernetes",
        },
        { icon: <SiJenkins size={50} color="#3f87a3" />, name: "Jenkins" },
      ],
    }),
    []
  );

  const projects = useMemo(
    () => [
      {
        title: "EduBridge",
        img: edubridge,
        desc: "Microservices e-learning platform (React, Express, MySQL) with Docker & Kubernetes.",
        link: "https://github.com/ASDENUWAN/EduBridge",
        techs: [
          "React",
          "Bootstrap",
          "Node.js",
          "Express.js",
          "MySQL",
          "Docker",
          "Kubernetes",
          "Jenkins",
        ],
      },

      {
        title: "Vidma - Roofing Company Management",
        img: vidma,
        desc: "MERN app improving dealer connectivity; built customer feedback module for insights.",
        link: "https://github.com/ASDENUWAN/Vidma--Roofing-Company-Management-System-MERN-Stack-.git",
        techs: ["MongoDB", "Express.js", "React", "Node.js"],
      },
      {
        title: "EduCode",
        img: educode,
        desc: "MERN learning platform for beginners with quizzes & performance tracking.",
        link: "https://github.com/ASDENUWAN/EduCode-An-Adaptive-Multi-Language-Platform-for-Beginner-Programming-Education-MernStack",
        techs: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
      },
      {
        title: "Solar Connect",
        img: solarconnect,
        desc: "React Native app for solar industry: carbon tracking, savings, incentives.",
        link: "https://github.com/ASDENUWAN/Solar-Connect",
        techs: ["React Native", "AppWrite"],
      },

      {
        title: "XYZ Restaurant System",
        img: xyz,
        desc: "Java Swing table reservation app for efficient booking management.",
        link: "https://github.com/ASDENUWAN/XYZ-Restaurant-Table-Reservation-System-FirstYearProject-USJ-",
        techs: ["Java Swing"],
      },
      {
        title: "Fitness Center System",
        img: fitness,
        desc: "Web-based gym management (PHP & MySQL) with authentication and roles.",
        link: "https://github.com/ASDENUWAN/CS-project-frontend",
        techs: ["HTML", "CSS", "JavaScript", "PHP", "Bootstrap", "MySQL"],
      },
    ],
    []
  );

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActive(id);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      {/* NAVBAR (full-width) */}
      <Navbar
        expand="lg"
        fixed="top"
        className={`elevate-nav ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
        role="navigation"
        aria-label="Primary"
      >
        <Container fluid>
          <Navbar.Brand
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("home");
            }}
            className="brand"
          >
            <span className="brand-dot" />
            Sachintha Denuwan
          </Navbar.Brand>

          <div className="d-flex align-items-center gap-2">
            <button
              className="theme-toggle-btn"
              onClick={toggleDarkMode}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <Navbar.Toggle aria-controls="nav" />
          </div>

          <Navbar.Collapse id="nav">
            <Nav className="ms-auto align-items-lg-center">
              {navItems.map(({ id, label }) => (
                <Nav.Link
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(id);
                  }}
                  className={`nav-link-pill ${
                    active === id ? "is-active" : ""
                  }`}
                >
                  {label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* HERO (full-width) */}
      <section id="home" className="hero-section section-colored">
        <Container fluid className="px-3 px-md-4">
          <div className="text-center">
            <motion.img
              src={profile}
              alt="Profile"
              className="profile-img"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            />
            <motion.h1
              className="hero-title"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Hi, I’m <span className="highlight">Sachintha Denuwan</span>
            </motion.h1>
            <motion.p
              className="lead hero-subtitle"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              Software & Computer Science Undergraduate · Full-Stack Developer
            </motion.p>
            <motion.div
              className="social-icons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <a
                href="https://github.com/ASDENUWAN"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/sachintha-denuwan-55a3b030a"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </motion.div>
            <div className="hero-cta">
              <Button
                size="lg"
                variant="light"
                className="cta-btn"
                onClick={() => scrollToId("projects")}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline-light"
                className="cta-btn-secondary"
                onClick={() => scrollToId("contact")}
              >
                Contact Me
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ABOUT (full-width container) */}
      <section id="about" className="section section-alt">
        <Container fluid className="px-3 px-md-4">
          <SectionTitle title="About Me" />
          <Row className="justify-content-center">
            <Col lg={9} xl={8}>
              <p className="text-center about-text">
                I’m a passionate, forward-thinking undergraduate pursuing dual
                academic exposure—specializing in{" "}
                <b>Software Engineering at SLIIT</b> and
                <b>
                  {" "}
                  Computer Science at the University of Sri Jayewardenepura
                </b>
                . I enjoy building modern web/mobile apps, exploring cloud
                platforms, and designing scalable backends that solve real-world
                problems.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      {/* EDUCATION */}
      <section id="education" className="section section-colored">
        <Container fluid className="px-3 px-md-4">
          <SectionTitle title="Education" />
          <Row className="justify-content-center g-4">
            <Col md={10} lg={8}>
              {/* --- SLIIT --- */}
              <Card className="edu-card mb-3 d-flex flex-row align-items-center p-3">
                <div className="edu-logo">
                  <img src={sliitLogo} alt="SLIIT" />
                </div>
                <div className="edu-content ms-3">
                  <Card.Title>
                    BSc (Hons) in Information Technology (Software Engineering)
                  </Card.Title>
                  <Card.Text>
                    <strong>
                      Sri Lanka Institute of Information Technology (SLIIT)
                    </strong>
                    <br />
                    2022 – Present
                  </Card.Text>
                </div>
              </Card>

              {/* --- USJ --- */}
              <Card className="edu-card mb-3 d-flex flex-row align-items-center p-3">
                <div className="edu-logo">
                  <img src={usjLogo} alt="University of Sri Jayewardenepura" />
                </div>
                <div className="edu-content ms-3">
                  <Card.Title>BSc (Hons) in Computer Science</Card.Title>
                  <Card.Text>
                    <strong>University of Sri Jayewardenepura</strong>
                    <br />
                    2022 – Present
                  </Card.Text>
                </div>
              </Card>

              {/* --- ANANDA COLLEGE --- */}
              <Card className="edu-card d-flex flex-row align-items-center p-3">
                <div className="edu-logo">
                  <img src={anandaLogo} alt="Ananda College" />
                </div>
                <div className="edu-content ms-3">
                  <Card.Title>G.C.E (A/L) – Physical Science</Card.Title>
                  <Card.Text>
                    <strong>Ananda College, Colombo</strong>
                    <br />
                    2021 – Combined Maths (B), Physics (C), Chemistry (C)
                  </Card.Text>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section section-alt">
        <Container fluid className="px-3 px-md-4 text-center">
          <SectionTitle title="Skills" subtitle="A snapshot of my stack" />
          {Object.entries(skills).map(([group, items]) => (
            <SkillGrid key={group} title={group} items={items} />
          ))}
        </Container>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section section-colored">
        <Container fluid className="px-3 px-md-4">
          <SectionTitle title="Projects" />
          <Row className="g-4">
            {projects.map((p, i) => (
              <Col md={6} lg={4} key={`${p.title}-${i}`}>
                <ProjectCard {...p} darkMode={darkMode} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section section-alt">
        <Container fluid className="px-3 px-md-4 text-center">
          <SectionTitle
            title="Contact"
            subtitle="Let’s work together or just say hello 👋"
          />
          <div className="contact-info">
            <p>
              <FaEnvelope aria-hidden="true" />{" "}
              <a href="mailto:sachinthaakarawita@gmail.com">
                sachinthaakarawita@gmail.com
              </a>
            </p>
            <p>
              <FaPhone aria-hidden="true" />{" "}
              <a href="tel:+94763176842">+94 76 317 6842</a>
            </p>
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="footer text-center py-3 section-colored">
        <p>
          © {new Date().getFullYear()} Sachintha Denuwan • All rights reserved.
        </p>
      </footer>

      {/* Back to top */}
      <button
        className="back-to-top"
        onClick={() => scrollToId("home")}
        aria-label="Back to top"
        title="Back to top"
      >
        ↑
      </button>
    </div>
  );
};

export default App;
