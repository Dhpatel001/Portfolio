export type Portfolio = {
  name: string
  headline: string
  location: string
  roles: string[]
  contact: {
    email: string
    phone: string
    github: string
    linkedin: string
  }
  summary: string
  highlights: { label: string; value: string }[]
  skills: { group: string; items: string[] }[]
  experience: {
    title: string
    company: string
    location: string
    duration: string
    bullets: string[]
  }[]
  projects: {
    title: string
    subtitle: string
    stack: string
    bullets: string[]
    tags: string[]
  }[]
  education: {
    degree: string
    field: string
    school: string
    location: string
    duration: string
    notes?: string
  }[]
}

export const portfolio: Portfolio = {
  name: 'Dhruv Patel',
  headline: 'Full Stack Developer • M.Tech AI/ML Student',
  location: 'Nikol, Ahmedabad — 382350',
  roles: ['Full Stack Developer', 'MERN', 'Next.js', 'AI Integrations'],
  contact: {
    email: 'Ddhpatel1@gmail.com',
    phone: '+91 9016346587',
    github: 'github.com/Dhpatel001',
    linkedin: 'linkedin/dhruv-patel',
  },
  summary:
    'Fresh Computer Engineering graduate seeking my first full-time developer role. I build complete full‑stack SaaS applications independently — from Express APIs (routing, JWT auth, validation, error handling) to MongoDB persistence and polished React/Next.js interfaces. Comfortable shipping production-style integrations like OAuth, subscription billing, email automation, and rate limiting.',
  highlights: [
    { label: 'Stack', value: 'MERN + Next.js + TypeScript' },
    { label: 'AI', value: 'Gemini + Claude' },
    { label: 'Payments', value: 'Razorpay' },
    { label: 'Real‑time', value: 'Socket.io' },
  ],
  skills: [
    { group: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'MUI'] },
    { group: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Socket.io'] },
    { group: 'Data & Infra', items: ['MongoDB', 'Mongoose', 'Upstash Redis', 'Swagger', 'Winston'] },
    { group: 'Integrations', items: ['Google Gemini API', 'Anthropic Claude API', 'Razorpay', 'Cloudinary', 'Nodemailer', 'Resend'] },
    { group: 'AI dev tools', items: ['Cursor', 'Claude Code', 'OpenAI Codex', 'Antigravity', 'GitHub Copilot'] },
  ],
  experience: [
    {
      title: 'MERN Stack Developer Intern',
      company: 'Grownited Private Limited',
      location: 'Ahmedabad, GJ',
      duration: '2024 • 3 months',
      bullets: [
        'Built Health Assist, a full‑stack telemedicine platform with appointment booking, doctor dashboards, and EHR management using the MERN stack.',
        'Implemented real-time doctor–patient chat using Socket.io with typing indicators, read receipts, and file sharing.',
        'Integrated Razorpay for consultation payments and Cloudinary for secure medical document storage.',
        'Built role-based access control (Admin, Doctor, Patient) with JWT authentication and bcrypt password hashing.',
      ],
    },
  ],
  projects: [
    {
      title: 'VoicePost — AI LinkedIn Ghostwriter',
      subtitle: 'Full‑stack SaaS • LinkedIn OAuth • Subscription Billing',
      stack: 'Next.js • TypeScript • Claude API • Razorpay • MongoDB',
      bullets: [
        'Voice Profile generation from past LinkedIn posts using Anthropic Claude, with weekly auto‑content delivery to an approval dashboard.',
        'Express backend with LinkedIn OAuth 2.0, Razorpay subscriptions, Upstash Redis rate limiting, and email automation.',
      ],
      tags: ['SaaS', 'OAuth', 'Billing', 'AI'],
    },
    {
      title: 'ReviewGenerator — GMB Review Booster',
      subtitle: 'QR‑Driven SaaS • Multilingual • Analytics Dashboard',
      stack: 'Next.js 15 • Node.js • Gemini 2.5 Flash • MongoDB',
      bullets: [
        'QR-based flow generating multilingual review drafts (English, Hindi, Hinglish) using Gemini 2.5 Flash.',
        'Conversion funnel tracking, automated daily CSV email reports via node-cron, and Razorpay subscription billing.',
      ],
      tags: ['SaaS', 'Analytics', 'AI', 'Cron'],
    },
    {
      title: 'PromptLab — AI Prompt Analyzer',
      subtitle: 'Full stack • JWT Auth • Rate Limiting • Swagger Docs',
      stack: 'React • Express • Gemini API • MongoDB',
      bullets: [
        'Analyzes and improves prompts with AI feedback, prompt history, tags, and pagination.',
        'Backend includes Swagger docs, Winston logging, Helmet security headers, and rate limiting.',
      ],
      tags: ['Full stack', 'Auth', 'API'],
    },
    {
      title: 'Health Assist — Smart Healthcare Solutions',
      subtitle: 'Telemedicine • Real‑time chat • EHR',
      stack: 'MERN • Socket.io • Razorpay • Cloudinary',
      bullets: [
        'Healthcare platform bridging patients and doctors with appointments, telemedicine, and personal health records.',
        'Secure realtime chat with file sharing, plus role-based dashboards for Admin/Doctor/Patient.',
      ],
      tags: ['MERN', 'Real‑time', 'Payments'],
    },
  ],
  education: [
    {
      degree: 'M.Tech',
      field: 'AI & Machine Learning',
      school: 'Silver Oak University',
      location: 'Ahmedabad, GJ',
      duration: '2025 – 2027',
      notes: 'Pursuing',
    },
    {
      degree: 'B.E.',
      field: 'Computer Engineering',
      school: 'Apollo Institute of Engg. & Tech. (GTU)',
      location: 'Ahmedabad, GJ',
      duration: 'Aug 2021 – Jul 2025',
      notes: 'CPI 7.71 • CGPA 8.43',
    },
  ],
}

