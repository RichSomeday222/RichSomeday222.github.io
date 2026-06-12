import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Github, Linkedin, Mail, GraduationCap, Moon, Sun,
  BookOpen, Award, Briefcase, Newspaper, User,
  FileText, Heart, Users, PenLine
} from 'lucide-react';

/* ── Cheer Widget (shared like counter via Abacus API) ────── */
const ABACUS_BASE = 'https://abacus.jasoncameron.dev';
const CHEER_NS = 'richsomeday222-portfolio';
const CHEER_KEY = 'lisa-su-cheer';

const CheerWidget = () => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(null);
  const [liked, setLiked] = useState(() => localStorage.getItem('lisa-su-cheered') === '1');
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (!open) return;
    fetch(`${ABACUS_BASE}/get/${CHEER_NS}/${CHEER_KEY}`)
      .then(res => res.json())
      .then(data => setCount(typeof data.value === 'number' ? data.value : 0))
      .catch(() => setCount(null));
  }, [open]);

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setPop(true);
    setTimeout(() => setPop(false), 600);
    localStorage.setItem('lisa-su-cheered', '1');
    if (count !== null) setCount(count + 1);
    try {
      const res = await fetch(`${ABACUS_BASE}/hit/${CHEER_NS}/${CHEER_KEY}`);
      const data = await res.json();
      if (typeof data.value === 'number') setCount(data.value);
    } catch {
      /* optimistic count already shown */
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 group flex items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          title="一个神秘按钮"
          className="cheer-fab w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-pink-400 flex items-center justify-center text-2xl hover:scale-125 transition-transform"
        >
          🔮
        </button>
        <span className="px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-fuchsia-200 dark:border-fuchsia-800 shadow-md text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">
        Mysterious energy. Click it ✨
        </span>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              ✕
            </button>

            <div className="text-5xl mb-3">👸🏻</div>
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">
              Click to help me become the next Lisa Su.
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Manifesting as Female CEO 💅
            </p>

            <button
              onClick={handleLike}
              disabled={liked}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all
                ${liked
                  ? 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 cursor-default'
                  : 'bg-[#7a2418] text-white hover:bg-[#5e1b12] hover:scale-105 active:scale-95'}
                ${pop ? 'scale-125' : ''}`}
            >
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
              {liked ? 'Support provided!' : 'Support +1'}
            </button>

            <div className="mt-5 text-sm text-gray-600 dark:text-gray-300">
              {count === null
                ? '...'
                : <> <span className="font-bold text-[#7a2418] dark:text-red-400">{count}</span> people support</>}
            </div>
            {liked && (
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                Thank you! See you at the "NEXT AMD" shareholders' meeting.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

/* ── Cat Widget (the world's cutest cat) ──────────────────── */
const CatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed top-16 right-6 z-50 group flex items-center gap-2">
        <span className="px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-700 shadow-md text-xs font-semibold text-amber-600 dark:text-amber-300 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">
          Click to see the world's cutest cat 🐾
        </span>
        <button
          onClick={() => setOpen(true)}
          title="A mysterious cat button"
          className="cat-fab w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 via-orange-300 to-rose-300 flex items-center justify-center text-2xl hover:scale-125 transition-transform"
        >
          🐱
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="polaroid-card relative bg-white p-4 pb-5 shadow-2xl max-w-xs w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 text-white text-sm shadow-lg hover:scale-110 transition-transform"
            >
              ✕
            </button>

            <img
              src={`${import.meta.env.BASE_URL}cutest-cat.png`}
              alt="The world's cutest cat"
              className="w-full max-h-[60vh] object-cover"
            />

            <div className="cute-stamp absolute top-7 right-7 px-2.5 py-1 border-2 border-red-500 text-red-500 text-[11px] font-extrabold uppercase tracking-widest rounded bg-white/70">
              Certified 100% Cute
            </div>

            <p className="mt-4 text-center text-gray-700 text-sm" style={{ fontFamily: "'Comic Sans MS', 'Marker Felt', cursive" }}>
              The World's Cutest Cat 🐾 May Zhang (my friend Candice's cat)
            </p>
            <p className="text-center text-gray-400 text-[11px] mt-0.5">
              (peer-reviewed, results irreproducible elsewhere)
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const SectionHeading = ({ icon: Icon, title }) => (
  <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-5 flex items-center gap-2"
    style={{ color: '#7a2418' }}>
    <Icon size={18} />
    {title}
  </h2>
);

const IconButton = ({ href, title, children, hoverClass }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={title}
    className={`w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors ${hoverClass}`}
  >
    {children}
  </a>
);

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => setShowBackTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'mapmyvisitors';
    script.src = '//mapmyvisitors.com/map.js?d=5mWLID7yQ44u3jZy3m-hEZ_TEiXaUkEBx4871UI5FWM&cl=ffffff&w=a';
    script.async = true;
    const container = document.getElementById('visitor-map-container');
    if (container && !document.getElementById('mapmyvisitors')) {
      container.appendChild(script);
    }
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navLinks = [
    ['Biography', '#biography'],
    ['Education', '#education'],
    ['Experience', '#experience'],
    ['Publications', '#publications'],
    ['News', '#news'],
    ['Honors & Awards', '#awards'],
    ['Teaching', '#teaching'],
    ['Misc', '#miscellaneous'],
  ];

  const researchExp = [
    {
      period: 'May. 2026 – Present',
      company: 'NEU HAI with CMU HCII',
      link: 'https://hailab.io/',
      role: 'Research Affiliate for one project',
      location: 'Remote',
      supervisors: [
        { name: 'Prof. Sherry Wu', link: 'https://www.cs.cmu.edu/~sherryw/group.html' },
        { name: 'Prof. Dakuo Wang', link: 'https://www.dakuowang.com/' },
        { name: 'Yuxuan Lu', link: 'https://yuxuan.lu/' }
      ],
    },
    {
      period: 'Mar. 2026 – Present',
      company: 'MIT GOV Lab',
      link: 'https://mitgovlab.org/about?category=research-affiliates',
      role: 'Research Affiliate',
      location: 'Remote',
      supervisors: [
        { name: 'Prof. Jiaxin Pei', link: 'https://jiaxin-pei.github.io/' },
        { name: 'Lula Chen', link: 'https://mitgovlab.org/people/nuole-lula-chen/' },
      ],
    },
    {
      period: 'Oct. 2025 – Present',
      company: 'Stanford HAI',
      link: 'https://hai.stanford.edu/',
      role: 'Research Intern',
      location: 'Remote',
      supervisor: 'Prof. Jiaxin Pei',
      supervisorLink: 'https://jiaxin-pei.github.io/',
    },
    {
      period: 'May. 2025 – Jan. 2026',
      company: 'Minnesota NLP Group',
      link: 'https://minnesotanlp.github.io/',
      role: 'Research Assistant',
      location: 'University of Minnesota, Minneapolis, MN, U.S.',
      supervisor: 'Prof. Dongyeop Kang',
      supervisorLink: 'https://dykang.github.io/',
    },
    {
      period: 'Oct. 2024 – May. 2026',
      company: 'Visual Intelligence Lab',
      link: 'https://qianwen.info/pages/lab_members/',
      role: 'Research Assistant',
      location: 'University of Minnesota, Minneapolis, MN, U.S.',
      supervisor: 'Prof. Qianwen Wang',
      supervisorLink: 'https://qianwen.info/',
    },
  ];

  const industryExp = [
    {
      period: 'Jul. 2025 – Dec. 2025',
      company: 'Quantlink',
      link: null,
      role: 'AI Engineer',
      location: 'Minneapolis, MN, U.S.',
    },
    {
      period: 'Mar. 2025 – Jun. 2025',
      company: 'Artisk.AI',
      link: null,
      role: 'Software Engineering Intern',
      location: 'Remote',
    },
    {
      period: 'Jun. 2024 – Aug. 2024',
      company: 'Snarkify, Inc.',
      link: null,
      role: 'Software Engineering Intern',
      location: 'Palo Alto, CA, U.S.',
    },
    {
      period: 'Jul. 2023 – Aug. 2023',
      company: 'Beijing Jinxinxiutu Technology',
      link: null,
      role: 'Software Development Intern',
      location: 'Beijing, China',
    },
  ];

  const publications = [
    {
      title: 'GNN 101: Visual Learning of Graph Neural Networks in Your Web Browser',
      authors: <span>Yilin Lu, Chongwei Chen, <b>Yuxin Chen</b>, Kexin Huang, Marinka Zitnik, Qianwen Wang</span>,
      venue: 'IEEE TVCG 2025',
      description: 'An educational visualization tool for interactive learning of GNNs. Introduces animated visualizations that seamlessly integrate mathematical formulas with visualizations via multiple levels of abstraction, including a model overview, layer operations, and detailed calculations.',
      paper: 'https://arxiv.org/abs/2411.17849',
      www: 'https://arxiv.org/abs/2411.17849',
    },
  ];

  const news = [
    {
      date: '[Mar, 2026]',
      content: (
        <>Admitted to the <a href="https://www.cs.utexas.edu/" className="font-semibold hover:underline text-blue-700 dark:text-blue-400">University of Texas at Austin</a> MSCS program. Starting Fall 2026!</>
      ),
    },
    {
      date: '[Mar, 2026]',
      content: (
        <>Started as PAID Research Assistant at <a href="https://mitgovlab.org/about?category=research-affiliates" className="font-semibold hover:underline text-blue-700 dark:text-blue-400">MIT GOV Lab</a>, supervised by <a href="https://jiaxin-pei.github.io/" className="hover:underline text-blue-700 dark:text-blue-400">Dr. Jiaxin Pei</a> and <a href="https://mitgovlab.org/people/nuole-lula-chen/" className="hover:underline text-blue-700 dark:text-blue-400">Lula Chen</a>.</>
      ),
    },
    
    {
      date: '[Nov, 2025]',
      content: (
        <>Paper <a href="https://arxiv.org/abs/2411.17849" className="font-semibold hover:underline text-blue-700 dark:text-blue-400">"GNN 101"</a> is published at <b>IEEE TVCG</b>.</>
      ),
    },
    {
      date: '[Oct, 2025]',
      content: (
        <>Started as Research Intern at <a href="https://hai.stanford.edu/" className="font-semibold hover:underline text-blue-700 dark:text-blue-400">Stanford HAI</a>, supervised by <a href="https://jiaxin-pei.github.io/" className="hover:underline text-blue-700 dark:text-blue-400">Dr. Jiaxin Pei</a>.</>
      ),
    },
    {
      date: '[Jul, 2025]',
      content: <>Joined <b>Quantlink</b> as AI Engineer.</>,
    },
    {
      date: '[May, 2025]',
      content: <>Graduated from the <a href="https://cse.umn.edu/cs" className="hover:underline text-blue-700 dark:text-blue-400">University of Minnesota, Twin Cities</a> with a B.S. in Computer Science.</>,
    },
    {
      date: '[May, 2025]',
      content: (
        <>Joined the <a href="https://minnesotanlp.github.io/" className="font-semibold hover:underline text-blue-700 dark:text-blue-400">Minnesota NLP Group</a> as Research Assistant.</>
      ),
    },
    
    {
      date: '[Oct, 2024]',
      content: (
        <>Joined the <a href="https://qianwen.info/pages/lab_members/" className="font-semibold hover:underline text-blue-700 dark:text-blue-400">Visual Intelligence Lab</a> at UMN as Research Assistant.</>
      ),
    },
  ];

  const awards = [
    // Add your honors and awards here
    '(To be updated)',
  ];

  const teachingItems = [
    {
      course: 'CSCI 1913: Introduction to Algorithms and Program Development',
      role: 'Teaching Assistant',
      period: 'Spring 2025',
      link: 'https://umtc.catalog.prod.coursedog.com/courses/8096671',
    },
  ];

  

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* ── Navigation ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-11">
            <nav className="flex items-center overflow-x-auto">
              {navLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="px-2.5 py-1 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-[#7a2418] dark:hover:text-red-400 whitespace-nowrap transition-colors"
                >
                  {label}
                </a>
              ))}
              <Link
                to="/blog"
                className="px-2.5 py-1 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-[#7a2418] dark:hover:text-red-400 whitespace-nowrap transition-colors"
              >
                📖Blog
              </Link>
            </nav>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="ml-2 p-1.5 rounded text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex-shrink-0"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Profile Card ───────────────────────────────────────── */}
      <div className="bg-gray-50 dark:bg-gray-800/40 border-b border-gray-200 dark:border-gray-700 py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-8 flex-wrap">
            <img
              src="myphoto.jpg"
              alt="Yuxin Chen"
              className="w-36 h-36 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600 flex-shrink-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                Yuxin Chen (陈雨欣)
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Incoming MSCS @ UT Austin &nbsp;|&nbsp; CS B.S. @ University of Minnesota, Twin Cities
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <IconButton
                  href="https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=AH8HC4xKCxdq-rPnxhiODpvLfJACgpyESPnTk70-tDx1I7lpdOsYGiNL6vn9955xbYXxNLPJ8XkcYMUo1KcAnQ&user=W3icPq4AAAAJ"
                  title="Google Scholar"
                  hoverClass="hover:bg-[#7a2418] hover:text-white"
                >
                  <GraduationCap size={17} />
                </IconButton>
                <IconButton
                  href="https://github.com/RichSomeday222"
                  title="GitHub"
                  hoverClass="hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900"
                >
                  <Github size={17} />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com/in/yuxin-chen-895390302/"
                  title="LinkedIn"
                  hoverClass="hover:bg-[#0077B5] hover:text-white"
                >
                  <Linkedin size={17} />
                </IconButton>
                <IconButton
                  href="mailto:chloechen66688@gmail.com"
                  title="Email"
                  hoverClass="hover:bg-red-600 hover:text-white"
                >
                  <Mail size={17} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ───────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-14">

        {/* Biography */}
        <section id="biography">
          <SectionHeading icon={User} title="About" />
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 text-sm">
            <p>
              Hi, I'm Yuxin Chen — a Computer Science graduate from the{' '}
              <a href="https://cse.umn.edu/cs" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">
                University of Minnesota, Twin Cities
              </a>, and an incoming M.S. student in Computer Science at{' '}
              <a href="https://www.cs.utexas.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">
                UT Austin
              </a>{' '}(Fall 2026).
              I am currently working as a research assistant in the{' '}
              <a href="https://minnesotanlp.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">
                Minnesota NLP Group
              </a>{' '}
              (with{' '}
              <a href="https://dykang.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">
                Prof. Dongyeop Kang
              </a>) and the{' '}
              <a href="https://qianwen.info/pages/lab_members/" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">
                Visual Intelligence Lab
              </a>{' '}
              (with{' '}
              <a href="https://qianwen.info/" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">
                Prof. Qianwen Wang
              </a>). I am also a Research Intern at{' '}
              <a href="https://hai.stanford.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">
                Stanford HAI
              </a>, where I work under the supervision of{' '}
              <a href="https://jiaxin-pei.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">
                Prof. Jiaxin Pei
              </a>.
            </p>
            <p>
              My research focuses on LLM System, NLP and human-AI interaction, with the goal of making LLM-based systems both capable and legible to the people who use them. I am particularly interested in:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Reliable LLM agents and applications</strong> — building agentic systems that reason, act, and use tools reliably in real-world applications.</li>
              <li><strong>Evaluation & Reliability of LLM Systems</strong> — designing evaluation frameworks that make LLM behavior measurable and dependable.</li>
              <li><strong>Human-AI Interaction & Visualization</strong> —  understanding how humans collaborate with AI and building interactive tools that let users inspect how models work.</li>
            </ul>
            <p>
              I received offers from UT Austin MSCS, UCLA MSCS, GaTech MSCS, UMD MSCS, UNC MSCS, and UIUC MCS. I will be sharing my graduate school application experience and tips here later🔥🔥.
            </p>
          </div>  
        </section>

        {/* Education */}
        <section id="education">
          <SectionHeading icon={GraduationCap} title="Education" />
          <table className="w-full text-sm text-gray-700 dark:text-gray-300">
            <tbody>
              <tr>
                <td className="py-2 pr-4 align-top">
                  <div><strong>M.S.</strong> &nbsp;&nbsp; Aug. 2026 – Present</div>
                  <div className="pl-14"><strong>University of Texas at Austin</strong>, Austin, TX, U.S.</div>
                  <div className="pl-14">M.S. in Computer Science</div>
                </td>
              </tr>
              <tr style={{ height: 10 }}><td /></tr>
              <tr>
                <td className="py-2 pr-4 align-top">
                  <div><strong>B.S.</strong> &nbsp;&nbsp; Sep. 2023 – May 2025</div>
                  <div className="pl-14"><strong>University of Minnesota, Twin Cities</strong>, Minneapolis, MN, U.S.</div>
                  <div className="pl-14">B.S. in Computer Science</div>
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 align-top">
                  <div><strong>Before Transferring</strong> &nbsp;&nbsp; Sep. 2020 – May 2023</div>
                  <div className="pl-14"><strong>University College Dublin</strong>, Beijing, China.</div>
                  <div className="pl-14">Internet of Things Engineering</div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Experience */}
        <section id="experience">
          <SectionHeading icon={Briefcase} title="Experiences" />

          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">Research</h3>
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <tbody>
                {researchExp.map((exp, i) => (
                  <React.Fragment key={i}>
                    <tr>
                      <td className="py-1.5 pr-4 align-top">
                        <li>
                          <strong>
                            {exp.period},{' '}
                            {exp.link
                              ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline"><strong>{exp.company}</strong></a>
                              : <strong>{exp.company}</strong>
                            }
                          </strong>, {exp.location}<br />
                          <span className="ml-4 inline-block">
                            <strong>{exp.role}</strong>
                            {exp.supervisors && (
                              <>, Supervisor:{' '}
                                {exp.supervisors.map((s, si) => (
                                  <React.Fragment key={si}>
                                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">{s.name}</a>
                                    {si < exp.supervisors.length - 1 && ' and '}
                                  </React.Fragment>
                                ))}
                              </>
                            )}
                            {exp.supervisor && (
                              <>, Supervisor:{' '}
                                <a href={exp.supervisorLink} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">{exp.supervisor}</a>
                              </>
                            )}
                          </span>
                        </li>
                      </td>
                    </tr>
                    {i < researchExp.length - 1 && <tr style={{ height: 6 }}><td /></tr>}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">Industry</h3>
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <tbody>
                {industryExp.map((exp, i) => (
                  <React.Fragment key={i}>
                    <tr>
                      <td className="py-1.5 pr-4 align-top">
                        <li>
                          <strong>
                            {exp.period},{' '}
                            {exp.link
                              ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline"><strong>{exp.company}</strong></a>
                              : <strong>{exp.company}</strong>
                            }
                          </strong>, {exp.location}<br />
                          <span className="ml-4 inline-block"><strong>{exp.role}</strong></span>
                        </li>
                      </td>
                    </tr>
                    {i < industryExp.length - 1 && <tr style={{ height: 6 }}><td /></tr>}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Publications */}
        <section id="publications">
          <SectionHeading icon={FileText} title="Publications" />
          <div className="space-y-6">
            {publications.map((pub, i) => (
              <React.Fragment key={i}>
                <div className="flex gap-5">
                  {pub.image && (
                    <div className="flex-shrink-0 w-32">
                      <img src={pub.image} alt="" className="w-full border border-gray-200 dark:border-gray-700" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm leading-snug">
                      {pub.title}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{pub.authors}</div>
                    {pub.venue && (
                      <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 italic">{pub.venue}</div>
                    )}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">{pub.description}</div>
                    <div className="flex gap-2 text-xs">
                      {pub.paper && (
                        <a href={pub.paper} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline font-medium">
                          [Paper]
                        </a>
                      )}
                      {pub.www && pub.www !== pub.paper && (
                        <a href={pub.www} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline font-medium">
                          [www]
                        </a>
                      )}
                      {pub.code && (
                        <a href={pub.code} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline font-medium">
                          [Code]
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                {i < publications.length - 1 && (
                  <hr className="border-gray-200 dark:border-gray-700" />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* News */}
        <section id="news">
          <SectionHeading icon={Newspaper} title="News" />
          <ul className="space-y-2">
            {news.map((item, i) => (
              <li key={i} className="flex gap-5 text-sm text-gray-700 dark:text-gray-300">
                <span className="text-gray-500 dark:text-gray-500 flex-shrink-0 w-24 text-xs pt-0.5">{item.date}</span>
                <span>{item.content}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Honors & Awards */}
        <section id="awards">
          <SectionHeading icon={Award} title="Selected Honors &amp; Awards" />
          <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {awards.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </section>

        {/* Teaching */}
        <section id="teaching">
          <SectionHeading icon={BookOpen} title="Teaching" />
          <strong className="text-sm text-gray-800 dark:text-gray-200">Teaching Assistant</strong>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {teachingItems.map((t, i) => (
              <li key={i}>
                {t.link
                  ? <a href={t.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">{t.course}</a>
                  : t.course
                }
                {' '}— {t.period}
              </li>
            ))}
          </ul>
        </section>

        

        {/* Miscellaneous */}
        <section id="miscellaneous">
          <SectionHeading icon={Heart} title="Miscellaneous" />
          <div className="flex justify-center">
            <div id="visitor-map-container" className="w-full max-w-xs" />
          </div>
        </section>

      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8 mt-4">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-start justify-between gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div>
            <p>Email: <a href="mailto:chloechen66688@gmail.com" className="hover:underline">chloechen66688[at]gmail.com</a></p>
          </div>
          <div className="flex gap-2">
            <IconButton href="https://scholar.google.com/citations?hl=en&user=W3icPq4AAAAJ" title="Google Scholar" hoverClass="hover:bg-[#7a2418] hover:text-white">
              <GraduationCap size={16} />
            </IconButton>
            <IconButton href="https://github.com/RichSomeday222" title="GitHub" hoverClass="hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900">
              <Github size={16} />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/yuxin-chen-895390302/" title="LinkedIn" hoverClass="hover:bg-[#0077B5] hover:text-white">
              <Linkedin size={16} />
            </IconButton>
            <IconButton href="mailto:chloechen66688@gmail.com" title="Email" hoverClass="hover:bg-red-600 hover:text-white">
              <Mail size={16} />
            </IconButton>
          </div>
          <p className="text-xs">Last updated: June, 2026. &nbsp;© Yuxin Chen</p>
        </div>
      </footer>

      {/* ── Back to Top ────────────────────────────────────────── */}
      {showBackTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gray-600 dark:bg-gray-400 text-white dark:text-gray-900 text-xs px-3 py-2 rounded shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Top
        </button>
      )}

      <CheerWidget />
      <CatWidget />
    </div>
  );
};

const Blog = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) setIsDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-11">
            <nav className="flex items-center gap-1">
              <Link
                to="/"
                className="px-2.5 py-1 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-[#7a2418] dark:hover:text-red-400 whitespace-nowrap transition-colors"
              >
                ← Back to Portfolio
              </Link>
            </nav>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="ml-2 p-1.5 rounded text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <PenLine size={48} className="mx-auto mb-6 text-gray-300 dark:text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Blog</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Coming soon — photos, thoughts, and life in general.</p>
      </div>
    </div>
  );
};

const App = () => (
  <Routes>
    <Route path="/" element={<Portfolio />} />
    <Route path="/blog" element={<Blog />} />
  </Routes>
);

export default App;
