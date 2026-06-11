import {
  useEffect,
  useState,
  type CSSProperties,
} from 'react'
import { postJson } from './lib/api'
import { portfolio } from './content/portfolio'
import './App.css'

const resumeUrl = '/resume.pdf'
const portraitClose = '/images/portrait-close.jpg'

type StoryKey = 'hero' | 'work' | 'skills' | 'experience' | 'education' | 'contact'

const storyMeta: Record<
  StoryKey,
  {
    label: string
    title: string
  }
> = {
  hero: { label: 'Chapter 01', title: 'Introduction' },
  work: { label: 'Chapter 02', title: 'Selected work' },
  skills: { label: 'Chapter 03', title: 'Capabilities' },
  experience: { label: 'Chapter 04', title: 'Experience' },
  education: { label: 'Chapter 05', title: 'Background' },
  contact: { label: 'Chapter 06', title: 'Contact' },
}

function App() {
  const [scrollDepth, setScrollDepth] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeStory, setActiveStory] = useState<StoryKey>('hero')
  const [isLoaded, setIsLoaded] = useState(false)
  const [contactStatus, setContactStatus] = useState<
    | { type: 'idle' }
    | { type: 'submitting' }
    | { type: 'success' }
    | { type: 'error'; message: string }
  >({ type: 'idle' })

  const [contact, setContact] = useState({ name: '', email: '', subject: 'Redesign Discussion', message: '' })
  const [contactErrors, setContactErrors] = useState<
    Partial<Record<keyof typeof contact, string>>
  >({})

  const heroStyle = {
    '--scroll-depth': `${scrollDepth}px`,
    '--scroll-progress': scrollProgress.toFixed(4),
  } as CSSProperties

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const storyItems = Array.from(document.querySelectorAll<HTMLElement>('[data-story-section]'))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    )

    revealItems.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index * 70, 420)}ms`)
      observer.observe(element)
    })

    const storyObserver = new IntersectionObserver(
      (entries) => {
        let nextStory: StoryKey | null = null
        let nextRatio = 0

        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const story = (entry.target as HTMLElement).dataset.storySection as StoryKey | undefined
          if (story && entry.intersectionRatio >= nextRatio) {
            nextStory = story
            nextRatio = entry.intersectionRatio
          }
        }

        if (nextStory) {
          setActiveStory(nextStory)
        }
      },
      { threshold: [0.3, 0.45, 0.6], rootMargin: '-10% 0px -24% 0px' },
    )

    storyItems.forEach((element) => storyObserver.observe(element))

    let frame = 0
    const updateScroll = () => {
      frame = 0
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
      const depth = Math.round(progress * 220)
      setScrollDepth(depth)
      setScrollProgress(progress)
    }

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateScroll)
      }
    }

    updateScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('load', () => setIsLoaded(true), { once: true })
    const bootTimer = window.setTimeout(() => setIsLoaded(true), 1200)

    return () => {
      observer.disconnect()
      storyObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.clearTimeout(bootTimer)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const getProjectCover = (title: string) => {
    if (title.toLowerCase().includes('voicepost')) {
      return (
        <img
          alt="VoicePost cover"
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXXmqFweOUNBPK111HSLRBdAb2oLETvj30oAr3RsIkz55vc9ZdOWmHJ9YoYuY4VJj471MT_aQlQuZQd7eC5D-jwGDV86E0Y33Y7VSEBSQjNqkntwZe2a_f62yRZGNVfKB2KlF1RszKiFfhJEM_HHnDrCdABR9nuG0e9aAf5J-JuxLldvEIlMmkxtgbpxbl6uKQ-_Qd6mGCVH-cNwb9U8ETablqDscQcp9OB_AoUUT4rRtb9MXs-Fq40rxLtbBnFYmwOAy82z-_D0Yo"
        />
      )
    }
    if (title.toLowerCase().includes('reviewgenerator')) {
      return (
        <img
          alt="ReviewGenerator cover"
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuABdakL0YKmydzasgbHdD-HFO3Yz_X44UdLGg9Hd1KftKJHokIT8CAaGhFka32RHUaIQiN1eagGti6YpA_ZgaYroN7qDWHRX_fCoA7t9OrT8BzfvOi63VV7g98V6FOwxXcVsPbfKqR--WD2kYORVciMktbEiRLlYacG6wN3Ohmzgjsxdu4JVaUDrlSiR7Bhf06lDzq_zMkRnBG5RG3KfXumdqR7FYoe4jrDXY4OwRecNQsExzfqeUoxtuJLHGGSU6QBchW24QvJhKUk"
        />
      )
    }
    if (title.toLowerCase().includes('promptlab')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#241f15]/50 border-b border-white/5">
          <span className="material-symbols-outlined text-[64px] text-slate-500 opacity-50 group-hover:text-[#5de6ff] group-hover:opacity-80 transition-all duration-500">model_training</span>
        </div>
      )
    }
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#241f15]/50 border-b border-white/5">
        <span className="material-symbols-outlined text-[64px] text-slate-500 opacity-50 group-hover:text-[#ffe1a7] group-hover:opacity-80 transition-all duration-500">monitor_heart</span>
      </div>
    )
  }

  const getSkillGroupIcon = (group: string) => {
    const g = group.toLowerCase()
    if (g.includes('frontend')) return 'web'
    if (g.includes('backend')) return 'dns'
    if (g.includes('data') || g.includes('infra')) return 'hub'
    return 'smart_toy'
  }

  return (
    <div className="portfolio-shell bg-[#17130a] text-[#ece1d1]" data-story={activeStory}>
      {/* Noise background */}
      <div className="portfolio-noise" />
      
      {/* Global Cinematic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-400/5 blur-[120px] ambient-blob mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-amber-400/5 blur-[150px] ambient-blob mix-blend-screen" style={{ animationDelay: '-10s' }}></div>
      </div>

      {/* Page Loader */}
      <div className={`page-loader ${isLoaded ? 'page-loader-hidden' : ''}`} aria-hidden="true">
        <div className="page-loader-core">
          <div className="page-loader-ring page-loader-ring-a" />
          <div className="page-loader-ring page-loader-ring-b" />
          <div className="page-loader-ring page-loader-ring-c" />
          <span className="page-loader-mark font-bold">DP</span>
        </div>
        <p className="mt-5 text-xs uppercase tracking-[0.32em] text-[#d3c5ac]">
          Engineered with AI/ML Precision
        </p>
      </div>

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#17130a]/70 backdrop-blur-3xl border-b border-white/10 shadow-[0_0_20px_rgba(255,225,167,0.05)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
          <a className="text-2xl font-semibold text-[#ffe1a7] tracking-tighter" href="#top">DP</a>
          
          <ul className="hidden md:flex gap-8 items-center">
            <li>
              <a className="text-[#d3c5ac] hover:text-[#ffe1a7] transition-all px-4 py-2 rounded-lg font-medium text-sm hover:bg-white/5" href="#work">Work</a>
            </li>
            <li>
              <a className="text-[#d3c5ac] hover:text-[#ffe1a7] transition-all px-4 py-2 rounded-lg font-medium text-sm hover:bg-white/5" href="#skills">Skills</a>
            </li>
            <li>
              <a className="text-[#d3c5ac] hover:text-[#ffe1a7] transition-all px-4 py-2 rounded-lg font-medium text-sm hover:bg-white/5" href="#experience">Experience</a>
            </li>
            <li>
              <a className="text-[#d3c5ac] hover:text-[#ffe1a7] transition-all px-4 py-2 rounded-lg font-medium text-sm hover:bg-white/5" href="#contact">Contact</a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <div className="story-chip hidden xl:flex">
              <span className="story-chip-label">{storyMeta[activeStory].label}</span>
              <span className="story-chip-title">{storyMeta[activeStory].title}</span>
            </div>
            <a 
              className="bg-[#fbbf24] text-[#402d00] font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#ffe1a7] transition-colors flex items-center gap-2 active:scale-95 duration-200"
              href={resumeUrl}
              download="Dhruv-Patel-Resume.pdf"
            >
              Download Resume
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>download</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content shell */}
      <main id="top" className="pt-[100px] max-w-7xl mx-auto px-6 relative z-10">
        <div className="scroll-trace" aria-hidden="true" style={heroStyle} />

        {/* Hero Section */}
        <section 
          className="min-h-[70vh] flex flex-col justify-center relative mt-8 mb-16"
          data-story-section="hero"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6 reveal" data-reveal>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/8 px-3 py-1 text-xs font-medium text-amber-200">
                <span className="h-2 w-2 rounded-full bg-amber-300 animate-pulse" />
                Open to product and full-stack roles
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#ece1d1] leading-none">
                Portfolio design with a <span className="text-gradient">sharper point of view.</span>
              </h1>
              
              <p className="text-lg text-[#d3c5ac] max-w-[620px] leading-relaxed">
                {portfolio.summary}
              </p>
              
              <div className="flex flex-wrap gap-3 mt-4">
                {portfolio.highlights.map((highlight) => (
                  <div key={highlight.label} className="glass-panel px-4 py-3 rounded-xl flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#5de6ff]">{highlight.label === 'Stack' ? 'code' : highlight.label === 'AI' ? 'memory' : highlight.label === 'Payments' ? 'payments' : 'bolt'}</span>
                    <span className="font-mono text-sm text-[#ece1d1]">{highlight.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Glassmorphic Photo Stage */}
            <div className="lg:col-span-5 relative flex justify-center mt-8 lg:mt-0 reveal" data-reveal>
              <div className="absolute inset-0 bg-glow-cyan pointer-events-none rounded-full blur-3xl"></div>
              <div className="glass-panel p-2 rounded-2xl relative w-full max-w-[360px] aspect-[4/5] overflow-hidden transform hover:scale-[1.02] transition-transform duration-500 shadow-2xl">
                <img 
                  alt="Portrait of Dhruv Patel" 
                  className="w-full h-full object-cover rounded-xl filter grayscale-[20%] contrast-110 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
                  src={portraitClose}
                />
                
                <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-xl flex justify-between items-center bg-[#241f15]/80">
                  <div>
                    <p className="text-[10px] font-semibold text-[#fbbf24] uppercase tracking-widest">Status</p>
                    <p className="text-xs font-semibold text-[#ece1d1] mt-0.5">{portfolio.location}</p>
                  </div>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Work Section */}
        <section 
          className="mt-16 mb-16 relative reveal" 
          id="work"
          data-reveal
          data-story-section="work"
        >
          <div className="absolute top-1/2 left-[-10%] w-[30vw] h-[30vw] bg-glow-amber opacity-20 pointer-events-none mix-blend-screen rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl font-semibold text-[#ece1d1] mb-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#fbbf24]"></span>
            Selected Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {portfolio.projects.map((project, index) => (
              <article key={project.title} className="glass-panel rounded-2xl overflow-hidden group flex flex-col h-full hover:border-[#5de6ff]/30 transition-all">
                <div className="h-48 relative overflow-hidden bg-[#241f15]/60">
                  {getProjectCover(project.title)}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-[#5de6ff]/10 border border-[#5de6ff]/30 text-[#5de6ff] font-mono text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                      {project.tags[0]}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs font-mono text-[#fbbf24] uppercase tracking-wider mb-1">Project {index + 1}</span>
                  <h3 className="text-xl font-bold text-[#ece1d1] mb-2">{project.title}</h3>
                  <p className="text-[#d3c5ac] text-sm mb-4 leading-relaxed">{project.subtitle}</p>
                  
                  <ul className="mb-6 space-y-2 text-xs leading-relaxed text-[#d3c5ac] flex-1">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="bullet-item pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-[#fbbf24] before:rounded-full">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(1).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-[#d3c5ac] bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-auto">
                    <span className="text-xs font-mono text-[#5de6ff]">{project.stack}</span>
                    <a className="text-[#ece1d1] hover:text-[#fbbf24] transition-colors" href="https://github.com/Dhpatel001" target="_blank" rel="noreferrer">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>open_in_new</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Capabilities Section */}
        <section 
          className="mt-16 mb-16 reveal" 
          id="skills"
          data-reveal
          data-story-section="skills"
        >
          <h2 className="text-3xl font-semibold text-[#ece1d1] mb-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#5de6ff]"></span>
            Technical Arsenal
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {portfolio.skills.map((group, idx) => (
              <div 
                key={group.group} 
                className={`glass-panel p-6 rounded-2xl border-t-2 ${idx % 2 === 0 ? 'border-t-[#fbbf24]/50' : 'border-t-[#5de6ff]/50'}`}
              >
                <h3 className="text-lg font-bold text-[#ece1d1] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#fbbf24]">{getSkillGroupIcon(group.group)}</span>
                  {group.group}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="bg-white/5 text-[#ece1d1] font-mono text-[11px] px-2.5 py-1 rounded border border-white/5">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Education Journey Section */}
        <section 
          className="mt-16 mb-16 relative reveal" 
          id="experience"
          data-reveal
          data-story-section="experience"
        >
          <div className="absolute right-[-10%] top-0 w-[40vw] h-[40vw] bg-glow-cyan opacity-10 pointer-events-none mix-blend-screen rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl font-semibold text-[#ece1d1] mb-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#fbbf24]"></span>
            Journey
          </h2>

          <div className="relative pl-8 border-l border-white/10 space-y-12 z-10">
            {/* Timeline Item 1: M.Tech Education */}
            <div className="relative reveal" data-reveal>
              <div className="absolute w-4 h-4 rounded-full bg-[#17130a] border-2 border-[#5de6ff] left-[-40px] top-2 shadow-[0_0_10px_rgba(93,230,255,0.5)]"></div>
              <div className="glass-panel p-6 rounded-2xl">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="text-xl font-bold text-[#ece1d1]">{portfolio.education[0].degree} — {portfolio.education[0].field}</h3>
                  <span className="font-mono text-xs text-[#5de6ff] mt-1 md:mt-0 px-3 py-1 rounded-full bg-[#5de6ff]/5 border border-[#5de6ff]/10">
                    {portfolio.education[0].duration} • {portfolio.education[0].notes}
                  </span>
                </div>
                <p className="text-sm text-[#d3c5ac]">{portfolio.education[0].school} | {portfolio.education[0].location}</p>
              </div>
            </div>

            {/* Timeline Item 2: Grownited Internship */}
            <div className="relative reveal" data-reveal>
              <div className="absolute w-4 h-4 rounded-full bg-[#17130a] border-2 border-[#fbbf24] left-[-40px] top-2 shadow-[0_0_10px_rgba(251,191,36,0.3)]"></div>
              <div className="glass-panel p-6 rounded-2xl">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="text-xl font-bold text-[#ece1d1]">{portfolio.experience[0].title}</h3>
                  <span className="font-mono text-xs text-[#fbbf24] mt-1 md:mt-0 px-3 py-1 rounded-full bg-[#fbbf24]/5 border border-[#fbbf24]/10">
                    {portfolio.experience[0].duration}
                  </span>
                </div>
                <p className="text-sm text-[#ece1d1] font-semibold">{portfolio.experience[0].company} | {portfolio.experience[0].location}</p>
                
                <ul className="mt-4 list-disc pl-5 text-sm text-[#d3c5ac] space-y-2 leading-relaxed">
                  {portfolio.experience[0].bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Timeline Item 3: B.E. Education */}
            <div className="relative reveal" data-reveal>
              <div className="absolute w-4 h-4 rounded-full bg-[#17130a] border-2 border-slate-600 left-[-40px] top-2"></div>
              <div className="glass-panel p-6 rounded-2xl opacity-90 hover:opacity-100 transition-opacity">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="text-xl font-bold text-[#ece1d1]">{portfolio.education[1].degree} — {portfolio.education[1].field}</h3>
                  <span className="font-mono text-xs text-[#d3c5ac] mt-1 md:mt-0 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                    {portfolio.education[1].duration} • {portfolio.education[1].notes}
                  </span>
                </div>
                <p className="text-sm text-[#d3c5ac]">{portfolio.education[1].school} | {portfolio.education[1].location}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          className="mt-16 mb-16 reveal" 
          id="contact"
          data-reveal
          data-story-section="contact"
        >
          <div className="glass-panel rounded-2xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative overflow-hidden border border-white/10">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#17130a]/80 to-[#241f15]/80 pointer-events-none"></div>
            
            {/* Left Column: Connection detail */}
            <div className="lg:col-span-6 relative z-10 flex flex-col justify-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#ece1d1] leading-tight mb-4">
                Initialize <br/>Connection.
              </h2>
              <p className="text-base text-[#d3c5ac] mb-8 max-w-[420px] leading-relaxed">
                Ready to architect the next intelligent application? Let's discuss your vision and technical requirements.
              </p>
              
              <div className="space-y-4">
                <a className="flex items-center gap-4 text-[#ece1d1] hover:text-[#fbbf24] transition-colors group w-fit" href={`mailto:${portfolio.contact.email}`}>
                  <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:border-[#fbbf24]/50 transition-colors">
                    <span className="material-symbols-outlined text-[#fbbf24]">mail</span>
                  </div>
                  <span className="text-sm font-medium">{portfolio.contact.email}</span>
                </a>
                
                <a className="flex items-center gap-4 text-[#ece1d1] hover:text-[#5de6ff] transition-colors group w-fit" href={`https://${portfolio.contact.github}`} target="_blank" rel="noreferrer">
                  <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:border-[#5de6ff]/50 transition-colors">
                    <span className="material-symbols-outlined text-[#5de6ff]">terminal</span>
                  </div>
                  <span className="text-sm font-medium">{portfolio.contact.github}</span>
                </a>
                
                <a className="flex items-center gap-4 text-[#ece1d1] hover:text-[#fbbf24] transition-colors group w-fit" href={`https://www.${portfolio.contact.linkedin}`} target="_blank" rel="noreferrer">
                  <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:border-[#fbbf24]/50 transition-colors">
                    <span className="material-symbols-outlined text-[#fbbf24]">work</span>
                  </div>
                  <span className="text-sm font-medium">{portfolio.contact.linkedin}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Modern Glassmorphic Form */}
            <div className="lg:col-span-6 relative z-10 bg-[#201b11]/30 p-6 rounded-2xl border border-white/5 shadow-2xl">
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#d3c5ac] uppercase tracking-widest mb-2">System ID (Name)</label>
                  <input 
                    className="w-full bg-[#17130a]/80 border-0 border-b border-white/10 text-[#ece1d1] px-4 py-3 font-mono text-sm input-glow transition-colors focus:ring-0 focus:outline-none" 
                    placeholder="John Doe" 
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                    type="text"
                  />
                  {contactErrors.name ? <span className="text-xs text-rose-300 mt-1 block">{contactErrors.name}</span> : null}
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-[#d3c5ac] uppercase tracking-widest mb-2">Comms Link (Email)</label>
                  <input 
                    className="w-full bg-[#17130a]/80 border-0 border-b border-white/10 text-[#ece1d1] px-4 py-3 font-mono text-sm input-glow transition-colors focus:ring-0 focus:outline-none" 
                    placeholder="john@company.com" 
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                    type="email"
                  />
                  {contactErrors.email ? <span className="text-xs text-rose-300 mt-1 block">{contactErrors.email}</span> : null}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d3c5ac] uppercase tracking-widest mb-2">Subject Link</label>
                  <input 
                    className="w-full bg-[#17130a]/80 border-0 border-b border-white/10 text-[#ece1d1] px-4 py-3 font-mono text-sm input-glow transition-colors focus:ring-0 focus:outline-none" 
                    placeholder="Collaboration, Hiring, Project..." 
                    value={contact.subject}
                    onChange={(e) => setContact((c) => ({ ...c, subject: e.target.value }))}
                    type="text"
                  />
                  {contactErrors.subject ? <span className="text-xs text-rose-300 mt-1 block">{contactErrors.subject}</span> : null}
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-[#d3c5ac] uppercase tracking-widest mb-2">Payload (Message)</label>
                  <textarea 
                    className="w-full bg-[#17130a]/80 border-0 border-b border-white/10 text-[#ece1d1] px-4 py-3 font-mono text-sm input-glow transition-colors focus:ring-0 focus:outline-none resize-none" 
                    placeholder="Initiating request..." 
                    rows={4}
                    value={contact.message}
                    onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))}
                  ></textarea>
                  {contactErrors.message ? <span className="text-xs text-rose-300 mt-1 block">{contactErrors.message}</span> : null}
                </div>
                
                <button 
                  className="w-full mt-4 bg-transparent border border-[#5de6ff] text-[#5de6ff] font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-[#5de6ff]/10 transition-colors flex justify-center items-center gap-2 hover:shadow-[0_0_15px_rgba(93,230,255,0.3)] active:scale-95 duration-150 disabled:opacity-60 disabled:cursor-not-allowed" 
                  disabled={contactStatus.type === 'submitting'}
                  onClick={async () => {
                    const { z } = await import('zod')

                    setContactStatus({ type: 'idle' })
                    setContactErrors({})

                    const schema = z.object({
                      name: z.string().trim().min(2, 'Please enter your name').max(80),
                      email: z.string().trim().email('Please enter a valid email').max(120),
                      subject: z.string().trim().max(120).optional().default(''),
                      message: z.string().trim().min(10, 'Please write a slightly longer message').max(2000),
                    })

                    const parsed = schema.safeParse(contact)
                    if (!parsed.success) {
                      const fieldErrors = parsed.error.flatten().fieldErrors
                      setContactErrors({
                        name: fieldErrors.name?.[0],
                        email: fieldErrors.email?.[0],
                        subject: fieldErrors.subject?.[0],
                        message: fieldErrors.message?.[0],
                      })
                      return
                    }

                    setContactStatus({ type: 'submitting' })
                    const res = await postJson<{ message: string; id: string }>('/api/contact', parsed.data)

                    if (!res.ok) {
                      setContactStatus({
                        type: 'error',
                        message: res.error?.message || `Request failed (${res.status})`,
                      })
                      return
                    }

                    setContactStatus({ type: 'success' })
                    setContact({ name: '', email: '', subject: '', message: '' })
                  }}
                  type="button"
                >
                  {contactStatus.type === 'submitting' ? 'Transmitting...' : 'Transmit Data'}
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>

                {contactStatus.type === 'success' ? (
                  <p className="text-xs text-emerald-300 mt-2">Thanks, your message was sent successfully.</p>
                ) : null}
                {contactStatus.type === 'error' ? (
                  <p className="text-xs text-rose-300 mt-2">{contactStatus.message}</p>
                ) : null}
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-8 mt-16 border-t border-white/5 bg-[#17130a]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xl font-semibold text-[#ffe1a7] tracking-tighter">DP</div>
            
            <p className="text-xs text-[#d3c5ac] text-center md:text-left">
              © {new Date().getFullYear()} Dhruv Patel. Engineered with AI/ML Precision.
            </p>
            
            <ul className="flex gap-6">
              <li><a className="text-xs text-[#d3c5ac] hover:text-[#5de6ff] transition-colors" href={`https://${portfolio.contact.github}`} target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a className="text-xs text-[#d3c5ac] hover:text-[#5de6ff] transition-colors" href={`https://www.${portfolio.contact.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a className="text-xs text-[#d3c5ac] hover:text-[#5de6ff] transition-colors" href={`mailto:${portfolio.contact.email}`}>Email</a></li>
            </ul>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
