import { useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleCheck,
  Clock3,
  FileText,
  Globe2,
  MapPin,
  Menu,
  MessageCircle,
  MousePointerClick,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

// Replace these two values when the public contact details are ready.
const BUSINESS_PHONE = '+91 7204728650';
const BUSINESS_EMAIL = 'hello@growquickly.in';
const WHATSAPP_NUMBER = '917204728650';

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi GrowQuickly, I would like to know more about the ₹15,000 launch package.',
)}`;

const services = [
  {
    number: '01',
    icon: MapPin,
    title: 'Google Business Profile',
    description:
      'A clearer profile for the people already searching nearby — with the right categories, services, photos and local signals.',
    tag: 'Be easier to choose',
    tone: 'green',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'WhatsApp inquiry setup',
    description:
      'A direct, low-friction path from your listing and website to a real conversation with your business.',
    tag: 'Turn interest into chats',
    tone: 'gold',
  },
  {
    number: '03',
    icon: Star,
    title: 'Honest review system',
    description:
      'A simple follow-up flow that makes it easier for happy customers to share their experience — without buying or gating reviews.',
    tag: 'Build trust properly',
    tone: 'ink',
  },
  {
    number: '04',
    icon: Globe2,
    title: 'One-page website',
    description:
      'A focused, mobile-first page that answers the obvious questions and gives visitors one confident next step.',
    tag: 'Look ready for business',
    tone: 'coral',
  },
];

const faqs = [
  {
    question: 'Can you guarantee a higher Google ranking?',
    answer:
      'No. Local rankings depend on your market, competition, proximity and Google’s own systems. We improve the parts you control and make your profile more useful to the right nearby customers.',
  },
  {
    question: 'Do you write fake reviews or offer incentives for reviews?',
    answer:
      'Never. The review system is designed to invite genuine feedback from real customers. We do not buy reviews, filter out criticism or promise a particular star rating.',
  },
  {
    question: 'What do I need to provide to get started?',
    answer:
      'A short business brief, your current logo or preferred colours, service details, a few good photos and access to the relevant business profile. We will tell you exactly what is missing before work begins.',
  },
  {
    question: 'How quickly can the launch package be delivered?',
    answer:
      'Most launches take around 7–10 working days after we receive the required details and approvals. Timings can vary when profile access, copy or photos are delayed.',
  },
  {
    question: 'Is the ₹15,000 a monthly fee?',
    answer:
      'No. It is a one-time launch package for the four items listed on this page. Ongoing support, ad management or additional pages can be discussed separately if you need them later.',
  },
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" data-testid="link-logo">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#f4b942] text-[#18283b] shadow-[4px_4px_0_#18283b]">
        <span className="absolute bottom-[7px] left-[9px] h-3 w-3 rounded-[3px] border-[2px] border-[#18283b] border-t-0 rotate-45" />
        <span className="absolute top-[8px] h-[15px] w-[2px] rotate-[42deg] bg-[#18283b]" />
      </span>
      <span className="font-display text-[1.25rem] font-bold tracking-[-.04em] text-[#18283b]">
        Grow<span className="text-[#17805f]">Quickly</span>
      </span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ['What we fix', '#services'],
    ['The package', '#package'],
    ['How it works', '#process'],
    ['FAQs', '#faqs'],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between rounded-2xl border border-[#18283b]/10 bg-[#faf8f0]/90 px-4 py-3 shadow-[0_12px_36px_rgba(24,40,59,.08)] backdrop-blur-md sm:px-5">
        <Logo />
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] font-semibold text-[#526071] transition-colors hover:text-[#17805f]"
              data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 rounded-xl bg-[#17805f] px-4 py-2.5 text-[13px] font-bold text-[#faf8f0] transition-all hover:-translate-y-0.5 hover:bg-[#126c50]"
            data-testid="link-nav-whatsapp"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg p-2 text-[#18283b] md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          data-testid="button-mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-[1180px] rounded-2xl border border-[#18283b]/10 bg-[#faf8f0] p-3 shadow-xl md:hidden">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#526071] hover:bg-[#f0ecdf] hover:text-[#17805f]"
              data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {label}
            </a>
          ))}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#17805f] px-4 py-3 text-sm font-bold text-[#faf8f0]"
            data-testid="link-mobile-whatsapp"
          >
            <MessageCircle size={16} /> Chat on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto min-h-[430px] w-full max-w-[510px] lg:min-h-[500px]" aria-label="Illustration of a local business becoming easier to find and contact">
      <div className="absolute left-[4%] top-[7%] h-[330px] w-[92%] rotate-[3deg] rounded-[28px] border border-[#18283b]/10 bg-[#e9e5d8] shadow-[0_24px_60px_rgba(24,40,59,.16)]" />
      <div className="paper-grid absolute left-[1%] top-[3%] h-[330px] w-[92%] -rotate-[5deg] rounded-[28px] border border-[#18283b]/10 bg-[#f8f6ed] p-5 shadow-[0_24px_60px_rgba(24,40,59,.12)] sm:h-[360px] sm:p-7">
        <div className="flex items-center justify-between border-b border-[#18283b]/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ee7664]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#f4b942]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#17805f]" />
          </div>
          <span className="rounded-full bg-[#e3efe8] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-[#17805f]">Your local presence</span>
        </div>
        <div className="mt-5 flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f4b942] text-[#18283b]">
            <MapPin size={22} />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-[#18283b]">Shree Kitchen Studio</p>
            <p className="mt-0.5 text-[11px] text-[#6c7782]">Home interiors · Near you</p>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-[#17805f]">
              <Star size={11} fill="currentColor" /> 4.8 · 37 genuine reviews
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-[#18283b]/10 bg-[#fffdf7] p-3">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#6c7782]">
            <span>People taking the next step</span>
            <span className="text-[#17805f]">This month</span>
          </div>
          <div className="mt-2 flex h-16 items-end gap-1.5">
            {[28, 37, 31, 48, 43, 62, 58, 74, 68, 89, 78, 96].map((height, index) => (
              <div key={index} className="flex-1 rounded-t-[4px] bg-[#b8dbc9]" style={{ height: `${height}%` }}>
                <div className="h-full w-full rounded-t-[4px] bg-[#17805f] opacity-70" style={{ transform: `scaleY(${index > 7 ? 1 : .65})`, transformOrigin: 'bottom' }} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-[#6c7782]">
          <span className="flex items-center gap-1.5"><Search size={12} /> Found nearby</span>
          <span className="flex items-center gap-1.5"><MessageCircle size={12} /> Ready to talk</span>
        </div>
      </div>
      <div className="absolute right-[0%] top-[53%] flex w-[205px] -rotate-[4deg] items-center gap-3 rounded-2xl border border-[#18283b]/10 bg-[#18283b] p-3.5 text-[#faf8f0] shadow-[0_20px_40px_rgba(24,40,59,.2)] sm:right-[-4%]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4b942] text-[#18283b]"><MessageCircle size={19} /></div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[.12em] text-[#aeb9c3]">A clear next step</p>
          <p className="mt-1 text-sm font-bold">Message on WhatsApp</p>
        </div>
        <ArrowUpRight size={17} className="ml-auto text-[#f4b942]" />
      </div>
      <div className="absolute bottom-[3%] left-[3%] flex -rotate-[7deg] items-center gap-2 rounded-full border border-[#17805f]/15 bg-[#e3efe8] px-3.5 py-2 text-[11px] font-bold text-[#126c50] shadow-[0_12px_28px_rgba(24,40,59,.1)]">
        <CircleCheck size={15} /> No tricks. Just clearer.
      </div>
    </div>
  );
}

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className={`mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.2em] ${light ? 'text-[#9ce0c5]' : 'text-[#17805f]'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-[#f4b942]' : 'bg-[#17805f]'}`} />
      {children}
    </div>
  );
}

function Home() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="top" className="noise min-h-[100dvh] overflow-hidden bg-[#faf8f0] text-[#18283b]">
      <Nav />

      <main>
        <section className="hero-spot relative px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44">
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1fr_.92fr] lg:gap-10">
            <div className="relative z-10">
              <div className="reveal inline-flex items-center gap-2 rounded-full border border-[#17805f]/20 bg-[#e3efe8] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[.13em] text-[#126c50]">
                <Sparkles size={13} /> For local businesses ready to look the part
              </div>
              <h1 className="reveal reveal-delay-1 mt-7 max-w-[680px] font-display text-[clamp(3.35rem,8vw,6.6rem)] font-bold leading-[.91] tracking-[-.065em] text-[#18283b]">
                Be easier to <span className="relative inline-block text-[#17805f]">find<span className="absolute -bottom-2 left-0 h-[5px] w-[92%] rotate-[-2deg] rounded-full bg-[#f4b942] sm:-bottom-3 sm:h-2" /></span>. Easier to trust. Easier to contact.
              </h1>
              <p className="reveal reveal-delay-2 mt-8 max-w-[535px] text-[17px] leading-8 text-[#526071] sm:text-[19px]">
                GrowQuickly turns your local presence into a clearer path from “I found you” to “I’d like to know more.” Practical setup for owners who have better things to do than decode digital marketing.
              </p>
              <div className="reveal reveal-delay-3 mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a href="#package" className="group flex items-center gap-3 rounded-xl bg-[#17805f] px-5 py-3.5 text-sm font-bold text-[#faf8f0] shadow-[5px_5px_0_#f4b942] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#f4b942]" data-testid="link-hero-package">
                  See the ₹15,000 launch package <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-[#18283b] underline decoration-[#f4b942] decoration-2 underline-offset-4 transition-colors hover:text-[#17805f]" data-testid="link-hero-whatsapp">
                  <MessageCircle size={17} className="text-[#17805f]" /> Ask a quick question
                </a>
              </div>
              <div className="reveal reveal-delay-4 mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[12px] font-semibold text-[#6c7782]">
                <span className="flex items-center gap-2"><Check size={15} className="text-[#17805f]" /> One clear launch scope</span>
                <span className="flex items-center gap-2"><Check size={15} className="text-[#17805f]" /> Built for mobile first</span>
              </div>
            </div>
            <HeroVisual />
          </div>
          <div className="mx-auto mt-20 max-w-[1180px] border-t border-[#18283b]/10 pt-5">
            <div className="flex flex-col justify-between gap-4 text-[11px] font-bold uppercase tracking-[.15em] text-[#75808a] sm:flex-row sm:items-center">
              <span>Less noise. More next steps.</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#f4b942]" /> Made for India’s local-first businesses</span>
              <span>Google · WhatsApp · Your website</span>
            </div>
          </div>
        </section>

        <section className="bg-[#18283b] px-5 py-5 text-[#faf8f0] sm:px-8">
          <div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <p className="max-w-[440px] text-sm leading-6 text-[#d5ddd9]"><span className="font-bold text-[#f4b942]">The honest version:</span> a polished presence cannot fix a poor offer. It can make the good work you already do much easier to discover and act on.</p>
            <div className="flex items-center gap-5 text-[11px] font-bold uppercase tracking-[.13em] text-[#aeb9c3]">
              <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-[#9ce0c5]" /> No ranking promises</span>
              <span className="hidden h-5 w-px bg-[#faf8f0]/20 sm:block" />
              <span className="hidden sm:block">No bought reviews</span>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
              <div>
                <SectionLabel>What we fix</SectionLabel>
                <h2 className="max-w-[430px] font-display text-4xl font-bold leading-[1.03] tracking-[-.045em] text-[#18283b] sm:text-5xl">
                  Your digital front door should not feel half-open.
                </h2>
                <p className="mt-6 max-w-[380px] text-[15px] leading-7 text-[#65717a]">
                  Most local businesses do not need a complicated funnel. They need the basics to agree with each other — the search result, the conversation and the first impression.
                </p>
                <a href="#process" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#17805f] underline decoration-[#f4b942] decoration-2 underline-offset-4" data-testid="link-services-process">
                  See how the handoff works <ArrowRight size={16} />
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service) => {
                  const Icon = service.icon;
                  const tones: Record<string, string> = {
                    green: 'bg-[#e3efe8] text-[#126c50]',
                    gold: 'bg-[#fff0c9] text-[#8b6111]',
                    ink: 'bg-[#e9edf0] text-[#18283b]',
                    coral: 'bg-[#fbe5df] text-[#a64b3e]',
                  };
                  return (
                    <article key={service.number} className="lift group flex min-h-[254px] flex-col justify-between rounded-2xl border border-[#18283b]/10 bg-[#fffdf7] p-6" data-testid={`card-service-${service.number}`}>
                      <div>
                        <div className="flex items-start justify-between">
                          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tones[service.tone]}`}><Icon size={21} /></div>
                          <span className="font-mono text-[11px] font-bold text-[#98a19f]">{service.number}</span>
                        </div>
                        <h3 className="mt-7 font-display text-[22px] font-bold tracking-[-.03em]">{service.title}</h3>
                        <p className="mt-3 text-[13px] leading-6 text-[#65717a]">{service.description}</p>
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.12em] text-[#17805f]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f4b942]" /> {service.tag}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="package" className="scroll-mt-24 bg-[#17805f] px-5 py-24 text-[#faf8f0] sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid items-start gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
              <div>
                <SectionLabel light>The clear offer</SectionLabel>
                <h2 className="max-w-[520px] font-display text-5xl font-bold leading-[.97] tracking-[-.06em] sm:text-6xl">
                  One sensible launch. <span className="text-[#f4b942]">₹15,000.</span>
                </h2>
                <p className="mt-7 max-w-[440px] text-[16px] leading-7 text-[#d7eee2]">
                  Everything a local business needs to look credible, give people a reason to reach out and make the next step obvious.
                </p>
                <div className="mt-10 flex items-center gap-3 text-[12px] font-bold text-[#d7eee2]">
                  <Clock3 size={17} className="text-[#f4b942]" /> One-time setup · Typical delivery in 7–10 working days
                </div>
              </div>
              <div className="rounded-[24px] bg-[#faf8f0] p-6 text-[#18283b] shadow-[10px_10px_0_rgba(24,40,59,.22)] sm:p-8">
                <div className="flex flex-col justify-between gap-4 border-b border-[#18283b]/10 pb-6 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#17805f]">The local launch kit</p>
                    <h3 className="mt-2 font-display text-3xl font-bold tracking-[-.04em]">Ready to be found.</h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-display text-4xl font-bold tracking-[-.06em]">₹15,000</p>
                    <p className="mt-1 text-[11px] font-semibold text-[#65717a]">one-time · plus applicable taxes</p>
                  </div>
                </div>
                <div className="grid gap-x-8 gap-y-4 py-7 sm:grid-cols-2">
                  {['Google Business Profile tidy-up', 'WhatsApp click-to-chat path', 'Honest review request flow', 'Conversion-focused one-page site', 'Mobile and desktop checks', 'One revision round included'].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-[13px] font-semibold text-[#526071]">
                      <Check size={17} className="mt-0.5 shrink-0 text-[#17805f]" strokeWidth={3} /> {item}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 border-t border-[#18283b]/10 pt-6 sm:flex-row">
                  <a href={whatsappHref} target="_blank" rel="noreferrer" className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#f4b942] px-5 py-3.5 text-sm font-bold text-[#18283b] transition-all hover:bg-[#f8c965]" data-testid="link-package-whatsapp">
                    Start with WhatsApp <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a href="#contact" className="flex items-center justify-center gap-2 rounded-xl border border-[#18283b]/15 px-5 py-3.5 text-sm font-bold text-[#18283b] transition-colors hover:border-[#17805f] hover:text-[#17805f]" data-testid="link-package-inquiry">
                    Send an inquiry <ArrowRight size={16} />
                  </a>
                </div>
                <p className="mt-4 text-center text-[11px] font-medium text-[#7a8387]">No lock-in retainer. No mystery add-ons in this scope.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="scroll-mt-24 bg-[#f0ecdf] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <div>
                <SectionLabel>How it works</SectionLabel>
                <h2 className="max-w-[610px] font-display text-4xl font-bold leading-[1.02] tracking-[-.05em] sm:text-5xl">Small, clear steps. No marketing maze.</h2>
              </div>
              <p className="max-w-[315px] text-sm leading-6 text-[#65717a]">You stay close to the decisions. We keep the work moving and the language plain.</p>
            </div>
            <div className="relative mt-16 grid gap-5 md:grid-cols-4">
              <div className="absolute left-[12%] right-[12%] top-7 hidden h-px border-t border-dashed border-[#17805f]/30 md:block" />
              {[
                ['01', 'A quick read', 'We look at your current presence, your offer and the questions customers ask before they call.'],
                ['02', 'A useful plan', 'You get a plain-English scope with the assets and access we need to do the job properly.'],
                ['03', 'The build', 'We shape the profile, page and inquiry path around your real business — not a template business.'],
                ['04', 'A confident handoff', 'You review, we refine once, then hand over the essentials so you know what happens next.'],
              ].map(([number, title, copy]) => (
                <div key={number} className="relative z-10 rounded-2xl border border-[#18283b]/10 bg-[#faf8f0] p-6" data-testid={`card-process-${number}`}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#f0ecdf] bg-[#17805f] font-display text-lg font-bold text-[#faf8f0] shadow-[0_0_0_1px_#17805f]">{number}</div>
                  <h3 className="mt-7 font-display text-xl font-bold tracking-[-.03em]">{title}</h3>
                  <p className="mt-3 text-[13px] leading-6 text-[#65717a]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[26px] bg-[#18283b] p-7 text-[#faf8f0] sm:p-10">
              <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[28px] border-[#f4b942]/15" />
              <div className="absolute -bottom-24 -left-10 h-52 w-52 rounded-full border-[18px] border-[#17805f]/30" />
              <SectionLabel light>Trust, without theatre</SectionLabel>
              <h2 className="relative max-w-[580px] font-display text-4xl font-bold leading-[1.02] tracking-[-.05em] sm:text-5xl">
                Good growth should still feel like your business.
              </h2>
              <p className="relative mt-6 max-w-[535px] text-[15px] leading-7 text-[#c4d0cf]">
                We will point out what is missing, what is optional and what is not worth your money yet. Your accounts remain yours. Your customers get asked honestly. And no sentence on this page promises a result no one can control.
              </p>
              <div className="relative mt-9 grid gap-4 sm:grid-cols-2">
                {[
                  [ShieldCheck, 'No bought reviews', 'Real customers, real feedback.'],
                  [FileText, 'Clear scope', 'Know what is included before we start.'],
                  [MousePointerClick, 'One next step', 'Less choice paralysis for visitors.'],
                  [CircleCheck, 'Your accounts', 'No lockout, no hidden ownership.'],
                ].map(([Icon, title, copy]) => {
                  const TrustIcon = Icon as typeof ShieldCheck;
                  return (
                    <div key={title as string} className="flex gap-3 border-t border-[#faf8f0]/15 pt-4">
                      <TrustIcon size={19} className="shrink-0 text-[#f4b942]" />
                      <div><p className="text-sm font-bold">{title as string}</p><p className="mt-1 text-[11px] text-[#aeb9c3]">{copy as string}</p></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="px-1 lg:pl-8">
              <div className="mb-6 flex gap-1 text-[#f4b942]">
                {[1, 2, 3, 4, 5].map((item) => <Star key={item} size={16} fill="currentColor" />)}
              </div>
              <blockquote className="font-display text-3xl font-semibold leading-[1.1] tracking-[-.04em] text-[#18283b] sm:text-4xl">
                “I finally had one link to send instead of explaining everything from scratch.”
              </blockquote>
              <div className="mt-7 border-l-2 border-[#f4b942] pl-4">
                <p className="text-sm font-bold text-[#18283b]">Illustrative client perspective</p>
                <p className="mt-1 text-xs text-[#65717a]">A reminder of the outcome we design for: less friction, not louder claims.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="scroll-mt-24 bg-[#f0ecdf] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto grid max-w-[940px] gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-20">
            <div>
              <SectionLabel>Good questions</SectionLabel>
              <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-.05em] sm:text-5xl">No fine print hiding in the corners.</h2>
              <p className="mt-5 text-sm leading-6 text-[#65717a]">Still unsure if this fits? That is exactly what WhatsApp is for.</p>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#17805f] px-4 py-3 text-sm font-bold text-[#faf8f0] transition-colors hover:bg-[#126c50]" data-testid="link-faq-whatsapp">
                Ask us directly <MessageCircle size={16} />
              </a>
            </div>
            <div className="border-t border-[#18283b]/15">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="group border-b border-[#18283b]/15" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-[15px] font-bold text-[#18283b] [&::-webkit-details-marker]:hidden" data-testid={`button-faq-${index + 1}`}>
                    {faq.question}
                    <ChevronDown size={18} className="shrink-0 text-[#17805f] transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="max-w-[600px] pb-5 pr-8 text-sm leading-6 text-[#65717a]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 bg-[#f4b942] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[.84fr_1.16fr] lg:gap-24">
            <div>
              <SectionLabel>Make the next move</SectionLabel>
              <h2 className="max-w-[480px] font-display text-5xl font-bold leading-[.96] tracking-[-.06em] text-[#18283b] sm:text-6xl">Tell us where things feel stuck.</h2>
              <p className="mt-6 max-w-[400px] text-[15px] leading-7 text-[#394b5a]">A few honest details are enough. We will reply with whether the launch package is a sensible fit — and what we would do first.</p>
              <div className="mt-9 space-y-4 text-sm font-semibold text-[#18283b]">
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#17805f]" data-testid="link-contact-whatsapp"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#18283b] text-[#f4b942]"><MessageCircle size={17} /></span> Chat on WhatsApp</a>
                <a href={`tel:${BUSINESS_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-[#17805f]" data-testid="link-contact-phone"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#18283b] text-[#f4b942]"><Phone size={17} /></span> {BUSINESS_PHONE}</a>
                <a href={`mailto:${BUSINESS_EMAIL}`} className="flex items-center gap-3 hover:text-[#17805f]" data-testid="link-contact-email"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#18283b] text-[#f4b942]"><Send size={17} /></span> {BUSINESS_EMAIL}</a>
              </div>
            </div>
            <div className="rounded-[24px] bg-[#faf8f0] p-6 shadow-[8px_8px_0_#18283b] sm:p-8">
              {submitted ? (
                <div className="flex min-h-[365px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e3efe8] text-[#17805f]"><CircleCheck size={32} /></div>
                  <h3 className="mt-6 font-display text-3xl font-bold tracking-[-.04em]">Message noted.</h3>
                  <p className="mt-3 max-w-[330px] text-sm leading-6 text-[#65717a]">Thanks for reaching out. This form is ready to connect to your email or WhatsApp inbox when your contact details are added.</p>
                  <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-7 flex items-center gap-2 rounded-xl bg-[#17805f] px-5 py-3 text-sm font-bold text-[#faf8f0]" data-testid="link-form-success-whatsapp">Open WhatsApp <ArrowUpRight size={16} /></a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-xs font-bold text-[#18283b]">Your name</label>
                    <input id="name" name="name" required placeholder="e.g. Asha Mehta" className="mt-2 w-full rounded-xl border border-[#18283b]/15 bg-[#fffdf7] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#a1a6a3] focus:border-[#17805f] focus:ring-2 focus:ring-[#17805f]/10" data-testid="input-contact-name" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="business" className="text-xs font-bold text-[#18283b]">Business name</label>
                      <input id="business" name="business" required placeholder="Your business" className="mt-2 w-full rounded-xl border border-[#18283b]/15 bg-[#fffdf7] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#a1a6a3] focus:border-[#17805f] focus:ring-2 focus:ring-[#17805f]/10" data-testid="input-contact-business" />
                    </div>
                    <div>
                      <label htmlFor="city" className="text-xs font-bold text-[#18283b]">City / area</label>
                      <input id="city" name="city" required placeholder="e.g. Indiranagar" className="mt-2 w-full rounded-xl border border-[#18283b]/15 bg-[#fffdf7] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#a1a6a3] focus:border-[#17805f] focus:ring-2 focus:ring-[#17805f]/10" data-testid="input-contact-city" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact" className="text-xs font-bold text-[#18283b]">Best way to reach you</label>
                    <input id="contact" name="contact" required placeholder="WhatsApp number or email" className="mt-2 w-full rounded-xl border border-[#18283b]/15 bg-[#fffdf7] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#a1a6a3] focus:border-[#17805f] focus:ring-2 focus:ring-[#17805f]/10" data-testid="input-contact-details" />
                  </div>
                  <div>
                    <label htmlFor="stuck" className="text-xs font-bold text-[#18283b]">What feels stuck right now?</label>
                    <textarea id="stuck" name="stuck" rows={3} placeholder="Tell us what customers are struggling to find or do." className="mt-2 w-full resize-none rounded-xl border border-[#18283b]/15 bg-[#fffdf7] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#a1a6a3] focus:border-[#17805f] focus:ring-2 focus:ring-[#17805f]/10" data-testid="input-contact-message" />
                  </div>
                  <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#18283b] px-5 py-3.5 text-sm font-bold text-[#faf8f0] transition-colors hover:bg-[#263d54]" data-testid="button-contact-submit">
                    Send my inquiry <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-center text-[11px] leading-5 text-[#7a8387]">No automated pitch. No sharing your details. Just a useful reply from a person.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#18283b] px-5 py-10 text-[#faf8f0] sm:px-8">
        <div className="mx-auto flex max-w-[1180px] flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <a href="#top" className="flex items-center gap-2.5" data-testid="link-footer-logo">
              <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#f4b942] text-sm font-bold text-[#18283b]">G</span>
              <span className="font-display text-xl font-bold tracking-[-.04em]">Grow<span className="text-[#9ce0c5]">Quickly</span></span>
            </a>
            <p className="mt-4 max-w-[290px] text-xs leading-5 text-[#aeb9c3]">A practical local-business growth partner for the next customer who is already looking.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-[#c4d0cf]">
            <a href="#services" className="hover:text-[#f4b942]" data-testid="link-footer-services">What we fix</a>
            <a href="#package" className="hover:text-[#f4b942]" data-testid="link-footer-package">Package</a>
            <a href="#faqs" className="hover:text-[#f4b942]" data-testid="link-footer-faqs">FAQs</a>
            <a href="#contact" className="hover:text-[#f4b942]" data-testid="link-footer-contact">Contact</a>
          </div>
        </div>
        <div className="mx-auto mt-9 flex max-w-[1180px] flex-col justify-between gap-2 border-t border-[#faf8f0]/15 pt-5 text-[10px] font-semibold uppercase tracking-[.12em] text-[#71808d] sm:flex-row">
          <span>© {new Date().getFullYear()} GrowQuickly</span>
          <span>Clear work for real businesses</span>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;