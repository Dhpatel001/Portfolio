import {
  useEffect,
  useState,
  type CSSProperties,
} from 'react'
import { postJson } from './lib/api'
import { portfolio } from './content/portfolio'
import './App.css'

const featuredProject = portfolio.projects[0]
const secondaryProjects = portfolio.projects.slice(1)
const resumeUrl = '/resume.pdf'
const portraitWide = '/images/portrait-wide.jpg'
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

  const [contact, setContact] = useState({ name: '', email: '', subject: '', message: '' })
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

  return (
    <div className="portfolio-shell" data-story={activeStory}>
      <div className="portfolio-noise" />
      <div className="floating-field" aria-hidden="true">
        <span className="floating-object floating-object-cube" />
        <span className="floating-object floating-object-ring" />
        <span className="floating-object floating-object-orb" />
        <span className="floating-object floating-object-card" />
      </div>
      <div className={`page-loader ${isLoaded ? 'page-loader-hidden' : ''}`} aria-hidden="true">
        <div className="page-loader-core">
          <div className="page-loader-ring page-loader-ring-a" />
          <div className="page-loader-ring page-loader-ring-b" />
          <div className="page-loader-ring page-loader-ring-c" />
          <span className="page-loader-mark">DP</span>
        </div>
        <p className="mt-5 text-xs uppercase tracking-[0.32em] text-slate-400">
          Crafting the signature experience
        </p>
      </div>
      <header className="sticky top-0 z-30 border-b border-white/8 bg-slate-950/78 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="logo-link flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/6 text-sm font-semibold text-white shadow-[0_20px_60px_-25px_rgba(251,191,36,0.45)]">
              DP
            </span>
            <div>
              <p className="text-sm font-semibold tracking-wide text-white">{portfolio.name}</p>
              <p className="text-xs text-slate-400">{portfolio.headline}</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a className="nav-link" href="#work">
              Work
            </a>
            <a className="nav-link" href="#skills">
              Skills
            </a>
            <a className="nav-link" href="#experience">
              Experience
            </a>
            <a className="nav-link" href="#contact">
              Contact
            </a>
          </nav>

          <div className="header-actions flex items-center gap-3">
            <div className="story-chip hidden xl:flex">
              <span className="story-chip-label">{storyMeta[activeStory].label}</span>
              <span className="story-chip-title">{storyMeta[activeStory].title}</span>
            </div>
            <a className="secondary-button hidden sm:inline-flex" href="#contact">
              Let's talk
            </a>
            <a className="primary-button" href={resumeUrl} download="Dhruv-Patel-Resume.pdf">
              Download resume
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="scroll-trace" aria-hidden="true" />
        <section
          className="hero-grid relative overflow-hidden pt-10 md:pt-16"
          style={heroStyle}
          data-story-section="hero"
        >
          <div className="hero-backdrop" />
          <div className="absolute left-[-7rem] top-16 -z-10 h-72 w-72 rounded-full bg-amber-400/12 blur-3xl hero-orb hero-orb-a" />
          <div className="absolute right-[-6rem] top-28 -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl hero-orb hero-orb-b" />
          <div className="hero-loom" aria-hidden="true">
            <div className="loom-line loom-line-a" />
            <div className="loom-line loom-line-b" />
            <div className="loom-line loom-line-c" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
            <div
              className="panel panel-hero panel-animate reveal p-6 sm:p-8 lg:p-10"
              data-reveal
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/8 px-3 py-1 text-xs font-medium text-amber-100">
                <span className="h-2 w-2 rounded-full bg-amber-300" />
                Open to product and full-stack roles
              </div>

              <div className="hero-intro-card mt-5">
                <img
                  className="hero-avatar"
                  src={portraitClose}
                  alt="Dhruv Patel portrait"
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Profile focus</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Product-minded developer with a more cinematic visual identity.
                  </p>
                </div>
              </div>

              <h1 className="hero-title mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Portfolio design with a sharper point of view.
              </h1>

              <p className="hero-copy mt-5 max-w-2xl text-pretty text-base leading-8 text-slate-300 sm:text-lg">
                {portfolio.summary}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a className="primary-button" href="#work">
                  Explore selected work
                </a>
                <a className="secondary-button" href={resumeUrl} download="Dhruv-Patel-Resume.pdf">
                  Download resume
                </a>
                <a className="text-link" href="#contact">
                  Contact me
                </a>
              </div>

              <div className="hero-stats mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {portfolio.highlights.map((highlight) => (
                  <div key={highlight.label} className="micro-card">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                      {highlight.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">{highlight.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div
                className="panel portrait-panel hidden lg:block panel-animate reveal p-4 sm:p-5"
                data-reveal
              >
                <div className="portrait-stage">
                  <div className="portrait-orb portrait-orb-one" />
                  <div className="portrait-orb portrait-orb-two" />
                  <div className="portrait-rings" />
                  <div className="portrait-card portrait-card-main">
                    <img
                      className="portrait-image"
                      src={portraitWide}
                      alt="Dhruv Patel standing outdoors with a city skyline behind him"
                    />
                  </div>
                  <div className="portrait-card portrait-card-float">
                    <img
                      className="portrait-image portrait-image-close"
                      src={portraitClose}
                      alt="Close-up portrait of Dhruv Patel"
                    />
                  </div>
                </div>
              </div>

              <div
                className="panel panel-animate reveal p-6 sm:p-7"
                data-reveal
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Profile</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">A builder who ships clean product experiences.</h2>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                    Available for work
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="info-card">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Location</p>
                    <p className="mt-2 text-sm text-slate-200">{portfolio.location}</p>
                  </div>
                  <div className="info-card">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Current focus</p>
                    <p className="mt-2 text-sm text-slate-200">AI-enabled SaaS, dashboards, and polished systems</p>
                  </div>
                  <div className="info-card">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Tools</p>
                    <p className="mt-2 text-sm text-slate-200">{portfolio.roles.join(' | ')}</p>
                  </div>
                  <div className="info-card">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Resume</p>
                    <p className="mt-2 text-sm text-slate-200">One click PDF download from the docs folder</p>
                  </div>
                </div>
              </div>

              <div
                className="panel panel-animate reveal p-6 sm:p-7"
                data-reveal
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Snapshot</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">What stands out immediately</h2>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    Fast, practical, production-minded
                  </span>
                </div>

                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                  <li className="bullet-item">
                    Full-stack SaaS builds with authentication, billing, email automation, and rate limiting.
                  </li>
                  <li className="bullet-item">
                    Real-time product work including Socket.io chat, role-based dashboards, and secure file flows.
                  </li>
                  <li className="bullet-item">
                    Strong frontend polish with responsive layouts, clear hierarchy, and modern UI systems.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section-block reveal" data-reveal data-story-section="work">
          <div className="section-heading">
            <p className="section-kicker">Selected work</p>
            <h2 className="section-title">A snap-scrolling showcase that feels like a product demo rail.</h2>
            <p className="section-copy">
              Horizontal momentum, tighter narrative cards, and a single rail that makes each project feel like a premium slide.
            </p>
          </div>

          <div className="project-scroll mt-8">
            <div className="project-scroll-hint">
              <span className="project-scroll-dot" />
              Swipe or scroll horizontally
            </div>
            <div className="project-rail">
              {[featuredProject, ...secondaryProjects].map((project, index) => (
                <article
                  key={project.title}
                  className={`project-card panel panel-animate ${
                    index === 0 ? 'project-card-featured' : ''
                  }`}
                  data-reveal
                >
                  <div className="project-card-glow" aria-hidden="true" />
                  <div className="project-card-inner">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{project.title}</h3>
                        <p className="mt-2 text-sm font-medium text-slate-300">{project.subtitle}</p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                        {project.tags[0]}
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs text-slate-200">
                        {project.stack}
                      </span>
                      {project.tags.slice(1).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                      {project.bullets.map((bullet) => (
                        <li key={bullet} className="bullet-item">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section-block reveal" data-reveal data-story-section="skills">
          <div className="section-heading">
            <p className="section-kicker">Capabilities</p>
            <h2 className="section-title">Everything is grouped to read fast and feel intentional.</h2>
            <p className="section-copy">
              The layout is meant to make your strengths easy for a recruiter or founder to scan.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {portfolio.skills.map((group) => (
              <div
                key={group.group}
                className="panel panel-animate reveal p-6"
                data-reveal
              >
                <p className="text-sm font-semibold text-white">{group.group}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="section-block reveal" data-reveal data-story-section="experience">
          <div className="section-heading">
            <p className="section-kicker">Experience</p>
            <h2 className="section-title">The work history is presented like a clean product timeline.</h2>
          </div>

          <div className="mt-8 grid gap-4">
            {portfolio.experience.map((entry, index) => (
              <article
                key={entry.title}
                className="panel panel-animate reveal p-6"
                data-reveal
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{entry.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {entry.company} | {entry.duration} | {entry.location}
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                    Impact-first
                  </span>
                </div>
                <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-300">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="bullet-item">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block reveal" data-reveal data-story-section="education">
          <div className="grid gap-4 lg:grid-cols-2">
            <div
              className="panel panel-animate reveal p-6"
              data-reveal
            >
              <div className="section-heading compact">
                <p className="section-kicker">Education</p>
                <h2 className="section-title">Academic background that supports the technical profile.</h2>
              </div>

              <div className="mt-6 grid gap-4">
                {portfolio.education.map((entry) => (
                  <div key={`${entry.degree}-${entry.school}`} className="info-card">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {entry.degree} | {entry.field}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                          {entry.school} | {entry.location}
                        </p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                        {entry.duration}
                      </span>
                    </div>
                    {entry.notes ? <p className="mt-3 text-xs text-slate-400">{entry.notes}</p> : null}
                  </div>
                ))}
              </div>
            </div>

            <div
              id="contact"
              className="panel panel-animate reveal p-6"
              data-reveal
              data-story-section="contact"
            >
              <div className="section-heading compact">
                <p className="section-kicker">Contact</p>
                <h2 className="section-title">A simple route for recruiters and collaborators.</h2>
                <p className="section-copy">
                  Direct contact info on the left, form submission on the right, and the resume always one click away.
                </p>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="info-stack">
                  <div className="info-card">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Email</p>
                    <a className="mt-2 block text-sm text-white hover:text-amber-200" href={`mailto:${portfolio.contact.email}`}>
                      {portfolio.contact.email}
                    </a>
                  </div>
                  <div className="info-card">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Phone</p>
                    <p className="mt-2 text-sm text-slate-200">{portfolio.contact.phone}</p>
                  </div>
                  <div className="info-card">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">GitHub</p>
                    <a
                      className="mt-2 block text-sm text-white hover:text-amber-200"
                      href={`https://${portfolio.contact.github}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {portfolio.contact.github}
                    </a>
                  </div>
                  <div className="info-card">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">LinkedIn</p>
                    <a
                      className="mt-2 block text-sm text-white hover:text-amber-200"
                      href={`https://www.${portfolio.contact.linkedin}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {portfolio.contact.linkedin}
                    </a>
                  </div>
                  <a
                    className="secondary-button w-full justify-center"
                    href={resumeUrl}
                    download="Dhruv-Patel-Resume.pdf"
                  >
                    Download resume
                  </a>
                </div>

                <form className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-5 shadow-[0_20px_80px_-45px_rgba(0,0,0,0.9)]">
                  <div className="grid gap-4">
                    <label className="field">
                      <span className="field-label">Name</span>
                      <input
                        value={contact.name}
                        onChange={(e) => setContact((current) => ({ ...current, name: e.target.value }))}
                        className="field-input"
                        placeholder="Your name"
                      />
                      {contactErrors.name ? <span className="field-error">{contactErrors.name}</span> : null}
                    </label>

                    <label className="field">
                      <span className="field-label">Email</span>
                      <input
                        value={contact.email}
                        onChange={(e) => setContact((current) => ({ ...current, email: e.target.value }))}
                        className="field-input"
                        placeholder="you@example.com"
                      />
                      {contactErrors.email ? <span className="field-error">{contactErrors.email}</span> : null}
                    </label>

                    <label className="field">
                      <span className="field-label">Subject</span>
                      <input
                        value={contact.subject}
                        onChange={(e) => setContact((current) => ({ ...current, subject: e.target.value }))}
                        className="field-input"
                        placeholder="Hiring, project, collaboration..."
                      />
                      {contactErrors.subject ? <span className="field-error">{contactErrors.subject}</span> : null}
                    </label>

                    <label className="field">
                      <span className="field-label">Message</span>
                      <textarea
                        value={contact.message}
                        onChange={(e) => setContact((current) => ({ ...current, message: e.target.value }))}
                        className="field-input min-h-32 resize-none"
                        placeholder="Tell me what you are building and what you need."
                      />
                      {contactErrors.message ? <span className="field-error">{contactErrors.message}</span> : null}
                    </label>

                    <button
                      type="button"
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
                      className="primary-button w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {contactStatus.type === 'submitting' ? 'Sending...' : 'Send message'}
                    </button>

                    {contactStatus.type === 'success' ? (
                      <p className="text-xs text-emerald-300">Thanks, your message was sent successfully.</p>
                    ) : null}
                    {contactStatus.type === 'error' ? (
                      <p className="text-xs text-rose-300">{contactStatus.message}</p>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-12 border-t border-white/8 pt-8 text-sm text-slate-400">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>(c) {new Date().getFullYear()} {portfolio.name}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Built with React, Express, and MongoDB
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
