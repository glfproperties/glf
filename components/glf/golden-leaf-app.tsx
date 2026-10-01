'use client';

import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Download,
  FileText,
  Heart,
  Landmark,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  TableProperties,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { Article } from '@/lib/cms-data';
import {
  CmsData,
  Project,
  contactConfig,
  dataModelEntities,
  findArticle,
  findDeveloper,
  findLocation,
  findProject,
  findPropertyType,
  homepageSectionOrder,
  leadStatuses,
  projectsForDeveloper,
  projectsForLocation,
  projectsForPropertyType,
  seedCmsData,
  whatsappUrl,
} from '@/lib/cms-data';

type LeadIntent =
  | 'callback'
  | 'consultation'
  | 'brochure'
  | 'price'
  | 'floor-plan'
  | 'site-visit'
  | 'contact';

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  budget: string;
  propertyType: string;
  preferredCallTime: string;
  purpose: string;
  message: string;
  intent: LeadIntent;
  interestedProject?: string;
  interestedLocation?: string;
  source: string;
  landingPage: string;
  referrer: string;
  utm: Record<string, string>;
  timestamp: string;
  status: string;
  assignedAdvisor: string;
  notes: string[];
};

type LeadDialogState = {
  open: boolean;
  intent: LeadIntent;
  project?: Project;
  title: string;
};

type RouteKind =
  | 'home'
  | 'projects'
  | 'project'
  | 'locations'
  | 'location'
  | 'developers'
  | 'developer'
  | 'propertyType'
  | 'insights'
  | 'article'
  | 'trust'
  | 'about'
  | 'contact'
  | 'admin'
  | 'campaign'
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'notFound';

const CMS_STORAGE_KEY = 'glf-cms-data-v2';
const LEADS_STORAGE_KEY = 'glf-leads-v1';
const FAVORITES_STORAGE_KEY = 'glf-favorites-v1';
const COMPARE_STORAGE_KEY = 'glf-compare-v1';
const ADMIN_SESSION_KEY = 'glf-admin-preview-session';

const budgets = [
  'Under ₹50 Lakh',
  '₹50 Lakh - ₹1 Crore',
  '₹1 - ₹2 Crore',
  '₹2 - ₹5 Crore',
  '₹5 Crore+',
  'Price on Request',
];

const bedroomOptions = ['Any', '2 BHK', '3 BHK', '4 BHK', 'Villa', 'Plot'];

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Locations', href: '/locations' },
  { label: 'Developers', href: '/developers' },
  { label: 'Property Types', shortLabel: 'Types', href: '/luxury-apartments' },
  { label: 'Investment Opportunities', shortLabel: 'Investments', href: '/projects?intent=investment' },
  { label: 'About Us', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

const iconForAmenity: Record<string, typeof Star> = {
  Clubhouse: Building2,
  'Swimming Pool': Sparkles,
  Gym: UserCheck,
  'Landscaped Gardens': Leaf,
  Security: ShieldCheck,
  Concierge: Users,
  'Business Lounge': Landmark,
  Parking: TableProperties,
  'Walking Trails': MapPin,
  'Private Garden': Leaf,
  'Internal Roads': MapPin,
  'Landscape Planning': Leaf,
};

function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(' ');
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function publicProjectName(project: Project) {
  return project.name.replace(/^Demo:\s*/i, '');
}

function publicProjectBadges(project: Project) {
  return project.editorialBadges.filter((badge) => !/demo/i.test(badge));
}

function getRoute(slug: string[], data: CmsData): { kind: RouteKind; value?: string } {
  if (slug.length === 0) return { kind: 'home' };
  const [first, second] = slug;

  if (first === 'projects' && second && findProject(data, second)) return { kind: 'project', value: second };
  if (first === 'projects') return { kind: 'projects' };
  if (first === 'locations') return { kind: 'locations' };
  if (first === 'properties' && second && findLocation(data, second)) return { kind: 'location', value: second };
  if (first === 'developers' && second && findDeveloper(data, second)) return { kind: 'developer', value: second };
  if (first === 'developers') return { kind: 'developers' };
  if (first === 'insights' && second && findArticle(data, second)) return { kind: 'article', value: second };
  if (first === 'insights') return { kind: 'insights' };
  if (first === 'trust') return { kind: 'trust' };
  if (first === 'about') return { kind: 'about' };
  if (first === 'contact') return { kind: 'contact' };
  if (first === 'admin') return { kind: 'admin', value: second };
  if (first === 'campaign') return { kind: 'campaign', value: second };
  if (first === 'privacy') return { kind: 'privacy' };
  if (first === 'terms') return { kind: 'terms' };
  if (first === 'disclaimer') return { kind: 'disclaimer' };
  if (findPropertyType(data, first)) return { kind: 'propertyType', value: first };

  return { kind: 'notFound' };
}

function useLocalStorageArray(key: string) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem(key) ?? '[]'));
    } catch {
      setItems([]);
    }
  }, [key]);

  function persist(next: string[]) {
    setItems(next);
    localStorage.setItem(key, JSON.stringify(next));
  }

  return [items, persist] as const;
}

export default function GoldenLeafApp({ slug }: { slug: string[] }) {
  const [cmsData, setCmsData] = useState<CmsData>(seedCmsData);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [favorites, setFavorites] = useLocalStorageArray(FAVORITES_STORAGE_KEY);
  const [compare, setCompare] = useLocalStorageArray(COMPARE_STORAGE_KEY);
  const [leadDialog, setLeadDialog] = useState<LeadDialogState>({
    open: false,
    intent: 'consultation',
    title: 'Speak to a Property Advisor',
  });
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      const savedCms = localStorage.getItem(CMS_STORAGE_KEY);
      const savedLeads = localStorage.getItem(LEADS_STORAGE_KEY);
      if (savedCms) setCmsData(JSON.parse(savedCms));
      if (savedLeads) setLeads(JSON.parse(savedLeads));
    } catch {
      setCmsData(seedCmsData);
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 3000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const route = getRoute(slug, cmsData);

  function persistCms(next: CmsData) {
    setCmsData(next);
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(next));
  }

  function persistLeads(next: Lead[]) {
    setLeads(next);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(next));
  }

  function openLead(intent: LeadIntent, project?: Project, title?: string) {
    setLeadDialog({
      open: true,
      intent,
      project,
      title: title ?? titleForIntent(intent),
    });
  }

  function closeLead() {
    setLeadDialog((current) => ({ ...current, open: false }));
  }

  function addLead(lead: Lead) {
    persistLeads([lead, ...leads]);
    setToast('Enquiry saved. The admin CRM has been updated locally.');
  }

  function toggleFavorite(projectId: string) {
    const next = favorites.includes(projectId)
      ? favorites.filter((id) => id !== projectId)
      : [...favorites, projectId];
    setFavorites(next);
  }

  function toggleCompare(projectId: string) {
    if (compare.includes(projectId)) {
      setCompare(compare.filter((id) => id !== projectId));
      return;
    }
    if (compare.length >= 3) {
      setToast('Compare supports up to 3 projects.');
      return;
    }
    setCompare([...compare, projectId]);
  }

  const compareProjects = compare
    .map((id) => findProject(cmsData, id))
    .filter(Boolean) as Project[];

  return (
    <div className="min-h-screen bg-[var(--glf-ivory)] text-[var(--glf-charcoal)]">
      <StructuredData data={cmsData} slug={slug} />
      <Header openLead={openLead} data={cmsData} />
      {renderRoute({
        route,
        slug,
        data: cmsData,
        leads,
        favorites,
        compare,
        compareProjects,
        setToast,
        openLead,
        toggleFavorite,
        toggleCompare,
        persistCms,
        persistLeads,
      })}
      <Footer data={cmsData} openLead={openLead} />
      <MobileCtaBar openLead={openLead} />
      <CompareBar projects={compareProjects} data={cmsData} setCompare={setCompare} />
      <LeadDialog
        state={leadDialog}
        data={cmsData}
        onClose={closeLead}
        onSubmit={addLead}
      />
      {toast ? (
        <div className="fixed right-4 top-24 z-50 max-w-sm rounded-lg border border-[var(--glf-gold-border)] bg-white px-4 py-3 text-sm shadow-xl">
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function renderRoute(args: {
  route: { kind: RouteKind; value?: string };
  slug: string[];
  data: CmsData;
  leads: Lead[];
  favorites: string[];
  compare: string[];
  compareProjects: Project[];
  setToast: (value: string) => void;
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  persistCms: (data: CmsData) => void;
  persistLeads: (leads: Lead[]) => void;
}) {
  const {
    route,
    data,
    leads,
    favorites,
    compare,
    compareProjects,
    setToast,
    openLead,
    toggleFavorite,
    toggleCompare,
    persistCms,
    persistLeads,
  } = args;

  if (route.kind === 'home') {
    return (
      <HomePage
        data={data}
        favorites={favorites}
        compare={compare}
        openLead={openLead}
        toggleFavorite={toggleFavorite}
        toggleCompare={toggleCompare}
      />
    );
  }
  if (route.kind === 'projects') {
    return (
      <ProjectsPage
        data={data}
        favorites={favorites}
        compare={compare}
        openLead={openLead}
        toggleFavorite={toggleFavorite}
        toggleCompare={toggleCompare}
      />
    );
  }
  if (route.kind === 'project' && route.value) {
    const project = findProject(data, route.value);
    if (project) {
      return (
        <ProjectDetailPage
          project={project}
          data={data}
          isFavorite={favorites.includes(project.id)}
          isCompared={compare.includes(project.id)}
          openLead={openLead}
          toggleFavorite={toggleFavorite}
          toggleCompare={toggleCompare}
        />
      );
    }
  }
  if (route.kind === 'locations') {
    return <LocationsPage data={data} />;
  }
  if (route.kind === 'location' && route.value) {
    const location = findLocation(data, route.value);
    if (location) {
      return (
        <LocationPage
          location={location}
          data={data}
          openLead={openLead}
          favorites={favorites}
          compare={compare}
          toggleFavorite={toggleFavorite}
          toggleCompare={toggleCompare}
        />
      );
    }
  }
  if (route.kind === 'developers') {
    return <DevelopersPage data={data} />;
  }
  if (route.kind === 'developer' && route.value) {
    const developer = findDeveloper(data, route.value);
    if (developer) {
      return (
        <DeveloperPage
          developer={developer}
          data={data}
          openLead={openLead}
          favorites={favorites}
          compare={compare}
          toggleFavorite={toggleFavorite}
          toggleCompare={toggleCompare}
        />
      );
    }
  }
  if (route.kind === 'propertyType' && route.value) {
    const propertyType = findPropertyType(data, route.value);
    if (propertyType) {
      return (
        <PropertyTypePage
          propertyType={propertyType}
          data={data}
          openLead={openLead}
          favorites={favorites}
          compare={compare}
          toggleFavorite={toggleFavorite}
          toggleCompare={toggleCompare}
        />
      );
    }
  }
  if (route.kind === 'insights') return <InsightsPage data={data} />;
  if (route.kind === 'article' && route.value) {
    const article = findArticle(data, route.value);
    if (article) return <ArticlePage article={article} data={data} openLead={openLead} />;
  }
  if (route.kind === 'trust') return <TrustPage data={data} />;
  if (route.kind === 'about') return <AboutPage data={data} openLead={openLead} />;
  if (route.kind === 'contact') return <ContactPage data={data} openLead={openLead} />;
  if (route.kind === 'campaign') return <CampaignPage data={data} openLead={openLead} campaignSlug={route.value} />;
  if (route.kind === 'privacy') return <PolicyPage title="Privacy Policy" kind="privacy" />;
  if (route.kind === 'terms') return <PolicyPage title="Terms & Conditions" kind="terms" />;
  if (route.kind === 'disclaimer') return <PolicyPage title="Disclaimer" kind="disclaimer" />;
  if (route.kind === 'admin') {
    return (
      <AdminPage
        data={data}
        leads={leads}
        compareProjects={compareProjects}
        persistCms={persistCms}
        persistLeads={persistLeads}
        setToast={setToast}
      />
    );
  }

  return <NotFoundPage data={data} />;
}

function Header({
  data,
  openLead,
}: {
  data: CmsData;
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const suggestions = useMemo(() => {
    const text = query.toLowerCase().trim();
    if (!text) return [];
    const projects = data.projects
      .filter((project) => project.name.toLowerCase().includes(text))
      .slice(0, 3)
      .map((project) => ({ label: publicProjectName(project), href: `/projects/${project.slug}`, type: 'Project' }));
    const locations = data.locations
      .filter((location) => location.name.toLowerCase().includes(text))
      .slice(0, 3)
      .map((location) => ({ label: location.name, href: `/properties/${location.slug}`, type: 'Location' }));
    const propertyTypes = data.propertyTypes
      .filter((type) => type.name.toLowerCase().includes(text))
      .slice(0, 3)
      .map((type) => ({ label: type.name, href: `/${type.slug}`, type: 'Type' }));
    return [...projects, ...locations, ...propertyTypes].slice(0, 6);
  }, [data, query]);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[rgba(255,252,245,0.92)] backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-[1560px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="flex shrink-0 items-center gap-3" aria-label="Golden Leaf Properties home">
          <span className="grid size-11 place-items-center rounded-lg bg-[var(--glf-forest)] text-[var(--glf-gold)]">
            <Leaf className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 whitespace-nowrap leading-tight">
            <span className="block font-serif text-lg">Golden Leaf</span>
            <span className="hidden text-xs text-[var(--glf-muted)] sm:block">Properties Private Limited</span>
          </span>
        </a>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 text-[12px] xl:flex 2xl:gap-1 2xl:text-[13px]" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.shortLabel ?? item.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <div className="relative hidden min-[1400px]:block">
            <label className="sr-only" htmlFor="global-search">
              Search Golden Leaf
            </label>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--glf-muted)]" />
            <input
              id="global-search"
              className="h-10 w-36 rounded-lg border border-black/10 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[var(--glf-gold)] focus:ring-2 focus:ring-[var(--glf-gold-soft)] 2xl:w-52"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
            />
            {suggestions.length > 0 ? (
              <div className="absolute right-0 mt-2 w-80 rounded-lg border border-black/10 bg-white p-2 shadow-2xl">
                {suggestions.map((item) => (
                  <a key={`${item.type}-${item.href}`} href={item.href} className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-[var(--glf-ivory)]">
                    <span>{item.label}</span>
                    <span className="text-xs text-[var(--glf-muted)]">{item.type}</span>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <a href={contactConfig.phoneHref} className="icon-cta" aria-label="Call Golden Leaf">
            <Phone className="size-4" />
          </a>
          <a href={whatsappUrl()} className="icon-cta" aria-label="WhatsApp Golden Leaf">
            <MessageCircle className="size-4" />
          </a>
          <button className="premium-button" type="button" onClick={() => openLead('consultation')}>
            Book Consultation
          </button>
        </div>

        <button className="icon-cta xl:hidden" type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu className="size-5" />
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[var(--glf-ivory)] p-4 pb-8 sm:p-5 xl:hidden">
          <div className="mb-8 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-[var(--glf-forest)] text-[var(--glf-gold)]">
                <Leaf className="size-5" />
              </span>
              <span className="font-serif text-lg">Golden Leaf</span>
            </a>
            <button className="icon-cta" type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="size-5" />
            </button>
          </div>
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-lg border border-black/10 bg-white px-4 py-3 text-base">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a className="outline-button" href={contactConfig.phoneHref}>
              <Phone className="size-4" /> Call
            </a>
            <a className="outline-button" href={whatsappUrl()}>
              <MessageCircle className="size-4" /> WhatsApp
            </a>
            <button className="premium-button col-span-2" type="button" onClick={() => openLead('consultation')}>
              Book Consultation
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HomePage({
  data,
  favorites,
  compare,
  openLead,
  toggleFavorite,
  toggleCompare,
}: {
  data: CmsData;
  favorites: string[];
  compare: string[];
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
}) {
  const featured = data.projects.filter((project) => project.featured && project.status !== 'Archived');
  const hot = data.projects.filter((project) => project.hot && project.status !== 'Archived');
  const newLaunches = data.projects.filter((project) => project.newLaunch && project.status !== 'Archived');
  const investment = data.projects.filter((project) => project.investmentOpportunity && project.status !== 'Archived');

  return (
    <main>
      <section className="hero-section">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=82"
          alt="Premium architectural residence with warm evening light"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,30,23,0.84),rgba(5,30,23,0.38),rgba(5,30,23,0.05))]" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="w-full min-w-0 max-w-3xl text-white">
            <p className="mb-5 inline-flex max-w-full rounded-lg border border-white/25 bg-white/10 px-3 py-1 text-sm leading-5">
              Your Gateway to India&apos;s Finest Real Estate
            </p>
            <h1 className="break-words font-serif text-[2.65rem] leading-[1.04] sm:text-6xl lg:text-7xl">
              Exceptional Properties. Exceptional Locations.
            </h1>
            <p className="mt-6 max-w-2xl break-words text-base leading-7 text-white/84 sm:text-lg sm:leading-8">
              Discover thoughtfully selected homes, plots, villas and investment opportunities from credible developers across India&apos;s most desirable and fast-growing destinations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="premium-button light" href="/projects">
                Explore Properties <ArrowRight className="size-4" />
              </a>
              <button className="glass-button" type="button" onClick={() => openLead('consultation')}>
                Talk to an Advisor
              </button>
              <button className="glass-button" type="button" onClick={() => openLead('site-visit')}>
                Schedule a Site Visit
              </button>
            </div>
          </div>
        </div>
      </section>

      <PropertyFinder data={data} />

      <SectionShell
        eyebrow="Curated opportunities"
        title="Handpicked Projects"
        intro="From luxury residences and private villas to premium plots and destination properties, explore opportunities selected for location, quality and long-term relevance."
      >
        <ProjectGrid
          data={data}
          projects={featured}
          favorites={favorites}
          compare={compare}
          openLead={openLead}
          toggleFavorite={toggleFavorite}
          toggleCompare={toggleCompare}
        />
      </SectionShell>

      <SectionShell
        eyebrow="Locations"
        title="Explore India&apos;s Most Promising Destinations"
        intro="Each location page is designed for meaningful original content, verified project links, advisor context and SEO discipline."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </SectionShell>

      {newLaunches.length > 0 ? (
        <ProjectCollection
          title="New Launches"
          eyebrow="Fresh inventory"
          intro="Recently activated project records from the CMS."
          data={data}
          projects={newLaunches}
          favorites={favorites}
          compare={compare}
          openLead={openLead}
          toggleFavorite={toggleFavorite}
          toggleCompare={toggleCompare}
        />
      ) : null}

      <SectionShell
        eyebrow="Property types"
        title="Explore by Property Type"
        intro="Dedicated, content-rich landing pages keep valuable combinations indexable only when they carry real substance."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.propertyTypes.map((type) => (
            <a key={type.id} href={`/${type.slug}`} className="image-card group">
              <img src={type.image} alt={`${type.name} property category`} />
              <div className="image-card-overlay">
                <h3 className="font-serif text-2xl">{type.name}</h3>
                <p>{type.summary}</p>
              </div>
            </a>
          ))}
        </div>
      </SectionShell>

      <WhyGoldenLeaf />

      <SectionShell
        eyebrow="Developer controls"
        title="Projects From Leading Developers"
        intro="Developer logos and authorization badges remain administrator controlled. Nothing is labelled official or authorized unless verified."
      >
        <DevelopersStrip data={data} />
      </SectionShell>

      {investment.length > 0 ? (
        <ProjectCollection
          title="Investment Opportunities"
          eyebrow="Advisor-led discovery"
          intro="Growth-market opportunities are framed with due diligence prompts, never guaranteed returns."
          data={data}
          projects={investment}
          favorites={favorites}
          compare={compare}
          openLead={openLead}
          toggleFavorite={toggleFavorite}
          toggleCompare={toggleCompare}
        />
      ) : null}

      <ConsultationBand openLead={openLead} />
      <TestimonialsSection data={data} />
      <InsightsSection data={data} />
      <FinalCta openLead={openLead} />
    </main>
  );
}

function PropertyFinder({ data }: { data: CmsData }) {
  const [location, setLocation] = useState('');
  const [developer, setDeveloper] = useState('');
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [status, setStatus] = useState('');

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const query = new URLSearchParams();
    if (developer) query.set('developer', developer);
    if (type) query.set('type', type);
    if (budget) query.set('budget', budget);
    if (bedrooms) query.set('bedrooms', bedrooms);
    if (status) query.set('status', status);

    if (location) {
      window.location.href = `/properties/${location}${query.toString() ? `?${query}` : ''}`;
      return;
    }
    if (type && !developer && !budget && !bedrooms && !status) {
      window.location.href = `/${type}`;
      return;
    }
    window.location.href = `/projects${query.toString() ? `?${query}` : ''}`;
  }

  return (
    <section className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <form onSubmit={onSearch} className="finder-panel">
        <div>
          <p className="text-sm text-[var(--glf-muted)]">Premium property finder</p>
          <h2 className="font-serif text-3xl">Search curated opportunities</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
          <SelectField label="Location" value={location} onChange={setLocation} options={data.locations.map((item) => [item.slug, item.name])} />
          <SelectField label="Developer" value={developer} onChange={setDeveloper} options={data.developers.map((item) => [item.slug, item.name])} />
          <SelectField label="Property Type" value={type} onChange={setType} options={data.propertyTypes.map((item) => [item.slug, item.name])} />
          <SelectField label="Budget" value={budget} onChange={setBudget} options={budgets.map((item) => [item, item])} />
          <SelectField label="Bedrooms" value={bedrooms} onChange={setBedrooms} options={bedroomOptions.map((item) => [item, item])} />
          <SelectField
            label="Project Status"
            value={status}
            onChange={setStatus}
            options={['Upcoming', 'New Launch', 'Under Construction', 'Ready to Move'].map((item) => [item, item])}
          />
        </div>
        <button className="premium-button w-full justify-center sm:w-auto" type="submit">
          <Search className="size-4" /> Search Properties
        </button>
      </form>
    </section>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[][];
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-[var(--glf-muted)]">{label}</span>
      <span className="relative">
        <select
          className="h-11 w-full appearance-none rounded-lg border border-black/10 bg-white px-3 pr-9 outline-none transition focus:border-[var(--glf-gold)] focus:ring-2 focus:ring-[var(--glf-gold-soft)]"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Any</option>
          {options.map(([optionValue, optionLabel]) => (
            <option key={`${label}-${optionValue}`} value={optionValue}>
              {optionLabel}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--glf-muted)]" />
      </span>
    </label>
  );
}

function ProjectCollection(props: {
  title: string;
  eyebrow: string;
  intro: string;
  data: CmsData;
  projects: Project[];
  favorites: string[];
  compare: string[];
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
}) {
  return (
    <SectionShell eyebrow={props.eyebrow} title={props.title} intro={props.intro}>
      <ProjectGrid {...props} />
    </SectionShell>
  );
}

function SectionShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="section-shell">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
          {intro ? <p className="section-intro" dangerouslySetInnerHTML={{ __html: intro }} /> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function ProjectGrid({
  data,
  projects,
  favorites,
  compare,
  openLead,
  toggleFavorite,
  toggleCompare,
}: {
  data: CmsData;
  projects: Project[];
  favorites: string[];
  compare: string[];
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
}) {
  if (projects.length === 0) {
    return <EmptyState title="No projects currently published" text="The admin can publish verified projects from the CMS when real inventory is ready." />;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          data={data}
          isFavorite={favorites.includes(project.id)}
          isCompared={compare.includes(project.id)}
          openLead={openLead}
          toggleFavorite={toggleFavorite}
          toggleCompare={toggleCompare}
        />
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  data,
  isFavorite,
  isCompared,
  openLead,
  toggleFavorite,
  toggleCompare,
}: {
  project: Project;
  data: CmsData;
  isFavorite: boolean;
  isCompared: boolean;
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
}) {
  const developer = findDeveloper(data, project.developerId);
  const location = findLocation(data, project.locationId);
  const types = project.propertyTypeIds.map((id) => findPropertyType(data, id)?.name).filter(Boolean);
  const displayName = publicProjectName(project);
  const visibleBadges = publicProjectBadges(project);

  return (
    <article className="project-card">
      <a href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={project.heroImage} alt={`${displayName} property image`} className="h-full w-full object-cover" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {visibleBadges.slice(0, 3).map((badge) => (
              <span key={badge} className="status-pill">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </a>
      <div className="grid gap-4 p-5">
        <div>
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="font-serif text-2xl leading-tight">
              <a href={`/projects/${project.slug}`}>{displayName}</a>
            </h3>
            <button className="icon-cta small" type="button" onClick={() => toggleFavorite(project.id)} aria-label={isFavorite ? 'Remove favorite' : 'Save favorite'}>
              <Heart className={classNames('size-4', isFavorite && 'fill-current text-[var(--glf-gold)]')} />
            </button>
          </div>
          <p className="text-sm text-[var(--glf-muted)]">{developer?.name} · {location?.name}</p>
        </div>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <InfoTile label="Property Type" value={types.join(', ')} />
          <InfoTile label="Price" value={project.startingPrice} />
          <InfoTile label="Configuration" value={project.configuration} />
          <InfoTile label="Status" value={project.status} />
        </div>
        <div className="flex flex-wrap gap-2">
          <a className="outline-button" href={`/projects/${project.slug}`}>
            View Project
          </a>
          <button className="outline-button" type="button" onClick={() => openLead('brochure', project, 'Get Project Brochure')}>
            <Download className="size-4" /> Brochure
          </button>
          <button className="outline-button" type="button" onClick={() => openLead('site-visit', project, 'Schedule Site Visit')}>
            <CalendarDays className="size-4" /> Visit
          </button>
          <button
            className={classNames('outline-button', isCompared && 'selected')}
            type="button"
            onClick={() => toggleCompare(project.id)}
          >
            <SlidersHorizontal className="size-4" /> {isCompared ? 'Comparing' : 'Compare'}
          </button>
        </div>
      </div>
    </article>
  );
}

function InfoTile({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="min-w-0 rounded-lg bg-[var(--glf-soft)] p-3">
      <p className="text-xs text-[var(--glf-muted)]">{label}</p>
      <p className="mt-1 break-words font-medium">{value}</p>
    </div>
  );
}

function LocationCard({ location }: { location: ReturnType<typeof findLocation> extends infer T ? NonNullable<T> : never }) {
  return (
    <a href={`/properties/${location.slug}`} className="image-card group">
      <img src={location.image} alt={`${location.name} premium property market`} />
      <div className="image-card-overlay">
        <p className="text-sm">{location.state}</p>
        <h3 className="font-serif text-3xl">{location.name}</h3>
        <p>{location.summary}</p>
      </div>
    </a>
  );
}

function WhyGoldenLeaf() {
  const pillars = [
    ['Curated Opportunities', 'Projects are selected for context, documentation readiness and buyer relevance.'],
    ['Transparent Advisory', 'Forms, CTAs and copy avoid unsupported guarantees or fake scarcity.'],
    ['Developer Controls', 'Authorization badges are admin gated and never shown automatically.'],
    ['Site Visit Support', 'Consultation and visit flows capture buyer preferences clearly.'],
    ['Investment Guidance', 'Location pages frame growth markets with cautions and editable facts.'],
    ['End-to-End Assistance', 'Lead activity, notes and advisor assignment are ready for sales follow-up.'],
  ];

  return (
    <section className="section-shell bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="section-eyebrow">Why Golden Leaf Properties</p>
          <h2 className="section-title">A serious advisory platform, not a classifieds portal.</h2>
          <p className="section-intro">
            The experience is designed around trust, discovery, enquiry, consultation, site visits and conversion.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map(([title, text]) => (
            <div key={title} className="feature-panel">
              <CheckCircle2 className="size-5 text-[var(--glf-gold)]" />
              <h3 className="font-serif text-xl">{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DevelopersStrip({ data }: { data: CmsData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {data.developers.map((developer) => (
        <a key={developer.id} href={`/developers/${developer.slug}`} className="developer-tile">
          <span className="developer-logo">{developer.logoText}</span>
          <h3 className="font-serif text-xl">{developer.name}</h3>
          <p>{developer.authorizationVerified && developer.authorizationBadgePublic ? 'Authorization verified' : 'Authorization badge disabled'}</p>
          {developer.authorizationVerified && developer.authorizationBadgePublic ? (
            <span className="verified-badge">
              <BadgeCheck className="size-4" /> Verified
            </span>
          ) : (
            <span className="muted-badge">Admin controlled</span>
          )}
        </a>
      ))}
    </div>
  );
}

function ConsultationBand({ openLead }: { openLead: (intent: LeadIntent, project?: Project, title?: string) => void }) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-lg bg-[var(--glf-forest)] p-6 text-white md:grid-cols-[1fr_auto] md:items-center lg:p-10">
        <div>
          <p className="mb-2 text-sm text-[var(--glf-gold)]">Advisor consultation</p>
          <h2 className="font-serif text-3xl">Not sure which project fits your purpose?</h2>
          <p className="mt-3 max-w-2xl text-white/78">
            Share your preferred location, budget, property type and purpose. Golden Leaf can help build a disciplined shortlist.
          </p>
        </div>
        <button className="premium-button light" type="button" onClick={() => openLead('consultation')}>
          Speak to a Property Advisor
        </button>
      </div>
    </section>
  );
}

function TestimonialsSection({ data }: { data: CmsData }) {
  const verified = data.testimonials.filter((testimonial) => testimonial.verified);
  return (
    <SectionShell
      eyebrow="Customer experience"
      title="Verified Client Testimonials"
      intro="The site does not generate fake testimonials or ratings. Only verified customer records appear here."
    >
      {verified.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {verified.map((testimonial) => (
            <figure key={testimonial.id} className="feature-panel">
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption className="mt-4 text-sm text-[var(--glf-muted)]">
                {testimonial.customerName}, {testimonial.city}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Verified testimonials are not published yet"
          text="Administrators can add customer name, city, project, media and verification status before public display."
        />
      )}
    </SectionShell>
  );
}

function InsightsSection({ data }: { data: CmsData }) {
  return (
    <SectionShell
      eyebrow="Market intelligence"
      title="Insights for Serious Property Decisions"
      intro="SEO-ready article pages connect to relevant projects, locations and buyer questions."
    >
      <ArticleGrid data={data} articles={data.articles.slice(0, 3)} />
    </SectionShell>
  );
}

function FinalCta({ openLead }: { openLead: (intent: LeadIntent, project?: Project, title?: string) => void }) {
  return (
    <section className="border-y border-black/10 bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="section-eyebrow">Next step</p>
        <h2 className="font-serif text-4xl">Begin with a curated shortlist.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--glf-muted)]">
          A focused consultation is often more useful than browsing hundreds of listings. Tell us what matters and we will guide the discovery process.
        </p>
        <div className="mt-7 flex justify-center">
          <button className="premium-button" type="button" onClick={() => openLead('consultation')}>
            Request Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectsPage({
  data,
  favorites,
  compare,
  openLead,
  toggleFavorite,
  toggleCompare,
}: {
  data: CmsData;
  favorites: string[];
  compare: string[];
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
}) {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [text, setText] = useState('');

  const filtered = data.projects.filter((project) => {
    if (project.status === 'Archived') return false;
    if (location && project.locationId !== findLocation(data, location)?.id) return false;
    if (type && !project.propertyTypeIds.includes(findPropertyType(data, type)?.id ?? '')) return false;
    if (status && project.status !== status) return false;
    if (text && !project.name.toLowerCase().includes(text.toLowerCase())) return false;
    return true;
  });

  return (
    <main>
      <PageHero
        eyebrow="Project catalogue"
        title="Curated Property Projects"
        text="Browse published CMS records with lead-gated brochures, pricing requests, favorites and compare tools."
        image="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=82"
      />
      <section className="section-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 grid gap-3 rounded-lg border border-black/10 bg-white p-4 md:grid-cols-4">
            <label className="grid gap-1 text-sm">
              <span>Search</span>
              <input className="form-input" value={text} onChange={(event) => setText(event.target.value)} placeholder="Project name" />
            </label>
            <SelectField label="Location" value={location} onChange={setLocation} options={data.locations.map((item) => [item.slug, item.name])} />
            <SelectField label="Property type" value={type} onChange={setType} options={data.propertyTypes.map((item) => [item.slug, item.name])} />
            <SelectField label="Status" value={status} onChange={setStatus} options={['Upcoming', 'New Launch', 'Under Construction', 'Ready to Move'].map((item) => [item, item])} />
          </div>
          <ProjectGrid
            data={data}
            projects={filtered}
            favorites={favorites}
            compare={compare}
            openLead={openLead}
            toggleFavorite={toggleFavorite}
            toggleCompare={toggleCompare}
          />
        </div>
      </section>
    </main>
  );
}

function ProjectDetailPage({
  project,
  data,
  isFavorite,
  isCompared,
  openLead,
  toggleFavorite,
  toggleCompare,
}: {
  project: Project;
  data: CmsData;
  isFavorite: boolean;
  isCompared: boolean;
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
}) {
  const developer = findDeveloper(data, project.developerId);
  const location = findLocation(data, project.locationId);
  const propertyTypes = project.propertyTypeIds.map((id) => findPropertyType(data, id)).filter(Boolean);
  const displayName = publicProjectName(project);
  const visibleBadges = publicProjectBadges(project);

  const overview = [
    ['Developer', developer?.name],
    ['Location', location?.name],
    ['Property category', propertyTypes.map((type) => type?.name).join(', ')],
    ['Project status', project.status],
    ['Possession', project.possession],
    ['Land area', project.landArea],
    ['Number of units', project.unitCount],
    ['Configuration', project.configuration],
    ['Price', project.startingPrice],
    ['RERA number', project.reraNumber],
  ].filter(([, value]) => value);

  return (
    <main>
      <section className="relative min-h-[650px] overflow-hidden bg-[var(--glf-forest)] text-white">
        <img className="absolute inset-0 h-full w-full object-cover" src={project.heroImage} alt={`${displayName} hero image`} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,30,23,0.9),rgba(5,30,23,0.48),rgba(5,30,23,0.1))]" />
        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-end gap-8 px-4 pb-16 pt-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="min-w-0">
            <Breadcrumbs items={[['Home', '/'], ['Projects', '/projects'], [displayName, `/projects/${project.slug}`]]} />
            <div className="mt-6 flex flex-wrap gap-2">
              {visibleBadges.map((badge) => (
                <span key={badge} className="status-pill">
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="mt-5 break-words font-serif text-4xl leading-[1.06] sm:text-5xl lg:text-7xl">{displayName}</h1>
            <p className="mt-5 max-w-2xl break-words text-base leading-7 text-white/84 sm:text-lg sm:leading-8">{project.headline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="premium-button light" type="button" onClick={() => openLead('price', project, 'Get Price Sheet')}>
                Get Price Sheet
              </button>
              <button className="glass-button" type="button" onClick={() => openLead('brochure', project, 'Download Brochure')}>
                Download Brochure
              </button>
              <button className="glass-button" type="button" onClick={() => openLead('site-visit', project, 'Schedule Site Visit')}>
                Schedule Site Visit
              </button>
              <a className="glass-button" href={whatsappUrl(project, location)}>
                WhatsApp Advisor
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-white/20 bg-white/10 p-5 backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-2">
              <HeroFact label="Starting price" value={project.startingPrice} />
              <HeroFact label="Configuration" value={project.configuration} />
              <HeroFact label="Status" value={project.status} />
              <HeroFact label="RERA" value={project.reraNumber ?? reraDisplay(project)} />
            </div>
            <div className="mt-4 flex gap-2">
              <button className="outline-button inverted" type="button" onClick={() => toggleFavorite(project.id)}>
                <Heart className={classNames('size-4', isFavorite && 'fill-current')} /> {isFavorite ? 'Saved' : 'Save'}
              </button>
              <button className="outline-button inverted" type="button" onClick={() => toggleCompare(project.id)}>
                <SlidersHorizontal className="size-4" /> {isCompared ? 'Comparing' : 'Compare'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="section-eyebrow">Project overview</p>
            <h2 className="section-title">{project.headline}</h2>
            <p className="section-intro">{project.description}</p>
            {developer ? (
              <p className="mt-5 rounded-lg border border-[var(--glf-gold-border)] bg-white p-4 text-sm text-[var(--glf-muted)]">
                {developer.authorizationVerified && developer.authorizationBadgePublic
                  ? 'Authorization badge enabled by admin.'
                  : 'No authorization or official-partner claim is displayed for this developer.'}
              </p>
            ) : null}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {overview.map(([label, value]) => (
              <InfoTile key={label} label={label ?? ''} value={String(value)} />
            ))}
          </div>
        </div>
      </section>

      <SectionShell eyebrow="Highlights" title="Project Highlights">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {project.highlights.map((highlight) => (
            <div key={highlight} className="feature-panel">
              <Sparkles className="size-5 text-[var(--glf-gold)]" />
              <p className="font-medium">{highlight}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Gallery" title="Professional Gallery">
        <div className="grid gap-4 md:grid-cols-3">
          {project.gallery.map((image) => (
            <figure key={image.src} className="gallery-item">
              <img src={image.src} alt={image.alt} />
              <figcaption>
                <span>{image.category}</span>
                <strong>{image.caption}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Floor plans" title="Configurations and Floor Plans">
        {project.floorPlans.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.floorPlans.map((plan) => (
              <article key={plan.configuration} className="project-card">
                <img className="aspect-[4/3] w-full object-cover" src={plan.image} alt={`${plan.configuration} floor plan preview`} />
                <div className="grid gap-2 p-5">
                  <h3 className="font-serif text-2xl">{plan.configuration}</h3>
                  {plan.carpetArea ? <p>Carpet area: {plan.carpetArea}</p> : null}
                  {plan.builtUpArea ? <p>Built-up area: {plan.builtUpArea}</p> : null}
                  {plan.superArea ? <p>Super area: {plan.superArea}</p> : null}
                  <p>{plan.price}</p>
                  <button className="outline-button" type="button" onClick={() => openLead('floor-plan', project, 'Get Complete Floor Plan')}>
                    Get Complete Floor Plan
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="Floor plans awaiting CMS upload" text="Administrators can add configuration, area, pricing and floor-plan media." />
        )}
      </SectionShell>

      <section className="section-shell bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="section-eyebrow">Price and payment plan</p>
            <h2 className="section-title">Structured Pricing</h2>
            <p className="section-intro">
              Every price supports a last-updated date. Missing prices remain marked as Price on Request.
            </p>
            {project.priceUpdatedAt ? (
              <p className="mt-4 text-sm text-[var(--glf-muted)]">Last updated: {formatDate(project.priceUpdatedAt)}</p>
            ) : null}
          </div>
          <div className="grid gap-3 md:hidden">
            {project.pricePlans.map((plan) => (
              <article key={plan.configuration} className="feature-panel">
                <h3 className="font-serif text-2xl">{plan.configuration}</h3>
                <div className="mt-3 grid gap-2 text-sm">
                  <InfoTile label="Area" value={plan.area} />
                  <InfoTile label="Starting price" value={plan.startingPrice} />
                  <InfoTile label="Availability" value={plan.availability} />
                </div>
              </article>
            ))}
          </div>
          <div className="hidden overflow-hidden rounded-lg border border-black/10 md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--glf-soft)]">
                <tr>
                  <th className="p-3">Configuration</th>
                  <th className="p-3">Area</th>
                  <th className="p-3">Starting price</th>
                  <th className="p-3">Availability</th>
                </tr>
              </thead>
              <tbody>
                {project.pricePlans.map((plan) => (
                  <tr key={plan.configuration} className="border-t border-black/10">
                    <td className="p-3">{plan.configuration}</td>
                    <td className="p-3">{plan.area}</td>
                    <td className="p-3">{plan.startingPrice}</td>
                    <td className="p-3">{plan.availability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <SectionShell eyebrow="Amenities" title="Lifestyle and Services">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {project.amenities.map((amenity) => {
            const Icon = iconForAmenity[amenity] ?? Star;
            return (
              <div key={amenity} className="amenity-tile">
                <Icon className="size-5" />
                <span>{amenity}</span>
              </div>
            );
          })}
        </div>
      </SectionShell>

      <section className="section-shell bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="section-eyebrow">Location and connectivity</p>
            <h2 className="section-title">{location?.name} Connectivity</h2>
            <p className="section-intro">
              Distances and travel times are shown only where the CMS has verified data. Unverified entries intentionally avoid fabricated numbers.
            </p>
          </div>
          <div className="grid gap-3">
            {project.connectivity.map((item) => (
              <div key={`${item.category}-${item.name}`} className="connectivity-row">
                <span className="rounded-lg bg-[var(--glf-forest)] px-3 py-1 text-sm text-white">{item.category}</span>
                <strong>{item.name}</strong>
                <span>{[item.distance, item.travelTime].filter(Boolean).join(' · ') || 'Details to be verified'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta openLead={openLead} />
    </main>
  );
}

function HeroFact({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-lg bg-white/12 p-4">
      <p className="text-sm text-white/70">{label}</p>
      <p className="mt-1 font-medium">{value || 'To be updated'}</p>
    </div>
  );
}

function reraDisplay(project: Project) {
  if (project.reraApplicable === 'YES') return 'Details required';
  if (project.reraApplicable === 'NO') return 'Not applicable';
  if (project.reraApplicable === 'EXEMPT') return 'Exempt';
  return 'To be verified';
}

function LocationsPage({ data }: { data: CmsData }) {
  return (
    <main>
      <PageHero
        eyebrow="Location discovery"
        title="Explore India&apos;s Most Promising Destinations"
        text="Location pages are built for meaningful content, verified infrastructure context and project links without thin SEO spam."
        image="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=82"
      />
      <SectionShell eyebrow="Locations" title="Market Pages">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </SectionShell>
    </main>
  );
}

function LocationPage({
  location,
  data,
  openLead,
  favorites,
  compare,
  toggleFavorite,
  toggleCompare,
}: {
  location: NonNullable<ReturnType<typeof findLocation>>;
  data: CmsData;
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
  favorites: string[];
  compare: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
}) {
  const projects = projectsForLocation(data, location.id);
  return (
    <main>
      <PageHero eyebrow={location.state} title={`Properties in ${location.name}`} text={location.summary} image={location.image} />
      <section className="section-shell">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="section-eyebrow">Location overview</p>
            <h2 className="section-title">{location.name} Market Context</h2>
            <p className="section-intro">{location.overview}</p>
          </div>
          <div className="grid gap-4">
            <ContentPanel title="Investment considerations" items={location.investmentConsiderations} />
            <div className="feature-panel">
              <h3 className="font-serif text-2xl">Connectivity</h3>
              {location.connectivityNotes.length > 0 ? (
                <div className="mt-4 grid gap-3">
                  {location.connectivityNotes.map((note) => (
                    <p key={note.label}>
                      <strong>{note.label}:</strong> {note.detail}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-[var(--glf-muted)]">Verified connectivity notes can be added by administrators.</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <ProjectCollection
        title={`Featured Projects in ${location.name}`}
        eyebrow="Inventory"
        intro="Published project records connected to this location."
        data={data}
        projects={projects}
        favorites={favorites}
        compare={compare}
        openLead={openLead}
        toggleFavorite={toggleFavorite}
        toggleCompare={toggleCompare}
      />
      <FaqSection faqs={location.faqs} />
      <FinalCta openLead={openLead} />
    </main>
  );
}

function PropertyTypePage({
  propertyType,
  data,
  openLead,
  favorites,
  compare,
  toggleFavorite,
  toggleCompare,
}: {
  propertyType: NonNullable<ReturnType<typeof findPropertyType>>;
  data: CmsData;
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
  favorites: string[];
  compare: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
}) {
  const projects = projectsForPropertyType(data, propertyType.id);
  return (
    <main>
      <PageHero eyebrow="Property type" title={propertyType.name} text={propertyType.summary} image={propertyType.image} />
      <ProjectCollection
        title={`${propertyType.name} Opportunities`}
        eyebrow="Curated inventory"
        intro="This landing page should remain indexable only while it contains meaningful editorial content and real listings."
        data={data}
        projects={projects}
        favorites={favorites}
        compare={compare}
        openLead={openLead}
        toggleFavorite={toggleFavorite}
        toggleCompare={toggleCompare}
      />
      <FinalCta openLead={openLead} />
    </main>
  );
}

function DevelopersPage({ data }: { data: CmsData }) {
  return (
    <main>
      <PageHero
        eyebrow="Developer directory"
        title="Projects From Leading Developers"
        text="Developer profiles, logos, public badges and authorization claims remain administrator controlled."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=82"
      />
      <SectionShell eyebrow="Compliance first" title="Developer Profiles">
        <DevelopersStrip data={data} />
      </SectionShell>
    </main>
  );
}

function DeveloperPage({
  developer,
  data,
  openLead,
  favorites,
  compare,
  toggleFavorite,
  toggleCompare,
}: {
  developer: NonNullable<ReturnType<typeof findDeveloper>>;
  data: CmsData;
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
  favorites: string[];
  compare: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
}) {
  const projects = projectsForDeveloper(data, developer.id);
  return (
    <main>
      <PageHero
        eyebrow="Developer"
        title={developer.name}
        text={developer.description}
        image="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=82"
      />
      <section className="section-shell">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div className="feature-panel">
            <span className="developer-logo large">{developer.logoText}</span>
            <h2 className="mt-4 font-serif text-3xl">{developer.name}</h2>
            <p className="mt-3 text-[var(--glf-muted)]">{developer.relationshipNote}</p>
            {developer.authorizationVerified && developer.authorizationBadgePublic ? (
              <span className="verified-badge mt-4">
                <BadgeCheck className="size-4" /> Authorization verified
              </span>
            ) : (
              <span className="muted-badge mt-4">No public authorization badge</span>
            )}
          </div>
          <div>
            <h2 className="section-title">Projects Represented on Golden Leaf</h2>
            <p className="section-intro">
              Statistics, logos and relationship claims are never invented. Add them from the CMS only after verification.
            </p>
          </div>
        </div>
      </section>
      <ProjectCollection
        title={`Projects by ${developer.name}`}
        eyebrow="Connected inventory"
        intro="Project records linked to this developer profile."
        data={data}
        projects={projects}
        favorites={favorites}
        compare={compare}
        openLead={openLead}
        toggleFavorite={toggleFavorite}
        toggleCompare={toggleCompare}
      />
    </main>
  );
}

function InsightsPage({ data }: { data: CmsData }) {
  return (
    <main>
      <PageHero
        eyebrow="Insights"
        title="Market Intelligence and Buying Guides"
        text="SEO-ready article infrastructure with related projects, locations, FAQs and editorial metadata."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=82"
      />
      <SectionShell eyebrow="Articles" title="Latest Insights">
        <ArticleGrid data={data} articles={data.articles} />
      </SectionShell>
    </main>
  );
}

function ArticleGrid({ data, articles }: { data: CmsData; articles: Article[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {articles.map((article) => (
        <article key={article.id} className="project-card">
          <a href={`/insights/${article.slug}`}>
            <img className="aspect-[4/3] w-full object-cover" src={article.image} alt={`${article.title} featured image`} />
          </a>
          <div className="grid gap-3 p-5">
            <span className="status-pill">{article.category}</span>
            <h3 className="font-serif text-2xl">
              <a href={`/insights/${article.slug}`}>{article.title}</a>
            </h3>
            <p className="text-sm text-[var(--glf-muted)]">{article.excerpt}</p>
            <a className="text-sm font-medium text-[var(--glf-forest)]" href={`/insights/${article.slug}`}>
              Read insight
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

function ArticlePage({
  article,
  data,
  openLead,
}: {
  article: NonNullable<ReturnType<typeof findArticle>>;
  data: CmsData;
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
}) {
  const relatedProjects = article.relatedProjectIds.map((id) => findProject(data, id)).filter(Boolean) as Project[];
  const relatedLocations = article.relatedLocationIds.map((id) => findLocation(data, id)).filter(Boolean);
  return (
    <main>
      <PageHero eyebrow={article.category} title={article.title} text={article.excerpt} image={article.image} />
      <article className="section-shell">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.75fr_0.25fr] lg:px-8">
          <div className="prose-panel">
            <p className="text-sm text-[var(--glf-muted)]">
              {article.author} · Published {formatDate(article.publishedAt)} · Updated {formatDate(article.updatedAt)}
            </p>
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <FaqSection faqs={article.faqs} compact />
          </div>
          <aside className="grid h-fit gap-4">
            <div className="feature-panel">
              <h2 className="font-serif text-2xl">Related locations</h2>
              <div className="mt-4 grid gap-2">
                {relatedLocations.map((location) => (
                  <a key={location?.id} className="text-[var(--glf-forest)]" href={`/properties/${location?.slug}`}>
                    {location?.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="feature-panel">
              <h2 className="font-serif text-2xl">Relevant projects</h2>
              <div className="mt-4 grid gap-2">
                {relatedProjects.map((project) => (
                  <a key={project.id} className="text-[var(--glf-forest)]" href={`/projects/${project.slug}`}>
                    {project.name}
                  </a>
                ))}
              </div>
            </div>
            <button className="premium-button" type="button" onClick={() => openLead('consultation')}>
              Ask an Advisor
            </button>
          </aside>
        </div>
      </article>
    </main>
  );
}

function TrustPage({ data }: { data: CmsData }) {
  const controls = [
    ['Company information', 'Editable company, office and support information for the trust centre.'],
    ['RERA handling', 'Each project supports applicability, number, authority URL, validity and exemption reason.'],
    ['Authorization control', 'Developer authorization badges remain hidden unless verified and enabled.'],
    ['Verified project badges', 'Public verification badges appear only where enabled in project records.'],
    ['Privacy and consent', 'Lead forms disclose contact consent and capture source, referrer and UTM parameters.'],
    ['Audit readiness', 'Publication, deletion and authorization changes are modelled for audit logging.'],
  ];

  return (
    <main>
      <PageHero
        eyebrow="Trust centre"
        title="Compliance, Verification and Transparency"
        text="Golden Leaf is designed to present premium opportunities without unsupported claims, fake ratings or hidden lead flows."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=82"
      />
      <SectionShell eyebrow="Controls" title="Trust Infrastructure">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {controls.map(([title, text]) => (
            <div key={title} className="feature-panel">
              <ShieldCheck className="size-5 text-[var(--glf-gold)]" />
              <h3 className="font-serif text-xl">{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell eyebrow="Developer authorization" title="Public Badge Status">
        <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--glf-soft)]">
              <tr>
                <th className="p-3">Developer</th>
                <th className="p-3">Authorization verified</th>
                <th className="p-3">Public badge</th>
                <th className="p-3">Relationship note</th>
              </tr>
            </thead>
            <tbody>
              {data.developers.map((developer) => (
                <tr key={developer.id} className="border-t border-black/10">
                  <td className="p-3">{developer.name}</td>
                  <td className="p-3">{developer.authorizationVerified ? 'Yes' : 'No'}</td>
                  <td className="p-3">{developer.authorizationBadgePublic ? 'Enabled' : 'Hidden'}</td>
                  <td className="p-3">{developer.relationshipNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionShell>
    </main>
  );
}

function AboutPage({
  data,
  openLead,
}: {
  data: CmsData;
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
}) {
  return (
    <main>
      <PageHero
        eyebrow="About Golden Leaf"
        title="A Professional Real-Estate Advisory and Distribution Platform"
        text="Golden Leaf helps buyers discover carefully selected opportunities from established and emerging developers across important Indian property markets."
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=82"
      />
      <section className="section-shell">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {['Who We Are', 'What We Do', 'Our Approach'].map((title, index) => (
            <div key={title} className="feature-panel">
              <h2 className="font-serif text-3xl">{title}</h2>
              <p className="mt-3 text-[var(--glf-muted)]">
                {index === 0
                  ? 'A premium advisory brand focused on curated project discovery, transparent information and professional consultation.'
                  : index === 1
                    ? 'We organize project information, connect buyers with advisors and support enquiry, price-sheet, brochure and site-visit workflows.'
                    : 'We avoid unsupported claims, publish verified details and keep developer authorization language under administrator control.'}
              </p>
            </div>
          ))}
        </div>
      </section>
      <SectionShell eyebrow="Team" title="Advisors and Leadership">
        <div className="grid gap-4 md:grid-cols-3">
          {data.team.map((member) => (
            <article key={member.id} className="project-card">
              <img className="aspect-[4/3] w-full object-cover" src={member.image} alt={`${member.name} profile`} />
              <div className="p-5">
                <h3 className="font-serif text-2xl">{member.name}</h3>
                <p className="mt-1 font-medium">{member.designation}</p>
                <p className="mt-3 text-sm text-[var(--glf-muted)]">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>
      <ConsultationBand openLead={openLead} />
    </main>
  );
}

function ContactPage({
  data,
  openLead,
}: {
  data: CmsData;
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
}) {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Speak With a Property Advisor"
        text="Share your preferred location, budget, property type and purpose. Your information is kept private and used only to assist with your property enquiry."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=82"
      />
      <section className="section-shell">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div className="grid gap-4">
            <a className="contact-tile" href={contactConfig.phoneHref}>
              <Phone className="size-5" />
              <span>Speak with a Property Advisor</span>
              <strong>{contactConfig.phoneDisplay}</strong>
            </a>
            <a className="contact-tile" href={whatsappUrl()}>
              <MessageCircle className="size-5" />
              <span>WhatsApp</span>
              <strong>{contactConfig.whatsappDisplay}</strong>
            </a>
            <a className="contact-tile" href={`mailto:${contactConfig.email}`}>
              <FileText className="size-5" />
              <span>Email</span>
              <strong>{contactConfig.email}</strong>
            </a>
          </div>
          <div className="feature-panel">
            <h2 className="font-serif text-3xl">Request a consultation</h2>
            <p className="mt-2 text-[var(--glf-muted)]">The same lead form powers callback, consultation, site visit and brochure requests.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button className="premium-button" type="button" onClick={() => openLead('consultation')}>
                Speak to Advisor
              </button>
              <button className="outline-button" type="button" onClick={() => openLead('site-visit')}>
                Schedule Site Visit
              </button>
            </div>
            <div className="mt-8">
              <h3 className="font-serif text-2xl">Markets served</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.locations.map((location) => (
                  <a key={location.id} className="status-pill" href={`/properties/${location.slug}`}>
                    {location.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CampaignPage({
  data,
  campaignSlug,
  openLead,
}: {
  data: CmsData;
  campaignSlug?: string;
  openLead: (intent: LeadIntent, project?: Project, title?: string) => void;
}) {
  const project = data.projects[0];
  return (
    <main>
      <PageHero
        eyebrow="Campaign landing page"
        title={campaignSlug ? campaignSlug.split('-').join(' ') : 'Golden Leaf Campaign'}
        text="Campaign pages can be CMS-controlled, UTM-aware and optionally noindex for paid advertising."
        image={project.heroImage}
      />
      <SectionShell eyebrow="Campaign architecture" title="Lead-Focused Landing Pages">
        <div className="grid gap-4 md:grid-cols-3">
          {['Hero', 'Project', 'Lead form', 'Gallery', 'Highlights', 'Tracking codes', 'SEO status'].map((item) => (
            <div key={item} className="feature-panel">
              <Settings2 className="size-5 text-[var(--glf-gold)]" />
              <h3 className="font-serif text-xl">{item}</h3>
              <p>Admin-controlled campaign module.</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <button className="premium-button" type="button" onClick={() => openLead('consultation', project, 'Campaign Enquiry')}>
            Request Campaign Details
          </button>
        </div>
      </SectionShell>
    </main>
  );
}

function AdminPage({
  data,
  leads,
  compareProjects,
  persistCms,
  persistLeads,
  setToast,
}: {
  data: CmsData;
  leads: Lead[];
  compareProjects: Project[];
  persistCms: (data: CmsData) => void;
  persistLeads: (leads: Lead[]) => void;
  setToast: (value: string) => void;
}) {
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [tab, setTab] = useState('dashboard');

  useEffect(() => {
    setAuthed(sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true');
  }, []);

  function login(event: FormEvent) {
    event.preventDefault();
    if (passcode.trim() === 'admin-goldleaf') {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setAuthed(true);
      return;
    }
    setToast('Use the local preview passcode shown on the page.');
  }

  if (!authed) {
    return (
      <main>
        <PageHero
          eyebrow="Admin"
          title="Secure Admin Preview"
          text="This local preview shows the CMS and CRM interface. Production deployment should connect server-side authentication, roles, rate limiting and audit logs."
          image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=82"
        />
        <section className="section-shell">
          <form onSubmit={login} className="mx-auto max-w-md rounded-lg border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-3xl">Admin sign in</h2>
            <p className="mt-2 text-sm text-[var(--glf-muted)]">
              Local preview passcode: <strong>admin-goldleaf</strong>
            </p>
            <label className="mt-5 grid gap-2 text-sm">
              <span>Passcode</span>
              <input className="form-input" type="password" value={passcode} onChange={(event) => setPasscode(event.target.value)} />
            </label>
            <button className="premium-button mt-5 w-full justify-center" type="submit">
              Enter Admin
            </button>
          </form>
        </section>
      </main>
    );
  }

  const tabs = [
    ['dashboard', 'Dashboard'],
    ['projects', 'Projects'],
    ['leads', 'Leads CRM'],
    ['developers', 'Developers'],
    ['locations', 'Locations'],
    ['media', 'Media'],
    ['seo', 'SEO & Security'],
  ];

  return (
    <main className="bg-[var(--glf-soft)]">
      <section className="border-b border-black/10 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-eyebrow">Admin preview</p>
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <h1 className="font-serif text-5xl">Golden Leaf Control Room</h1>
              <p className="mt-3 max-w-3xl text-[var(--glf-muted)]">
                Manage projects, developer authorization, homepage sections, leads, follow-ups, media and SEO readiness from one place.
              </p>
            </div>
            <button
              className="outline-button"
              type="button"
              onClick={() => {
                localStorage.removeItem(CMS_STORAGE_KEY);
                window.location.reload();
              }}
            >
              Reset Local CMS
            </button>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {tabs.map(([id, label]) => (
              <button
                key={id}
                className={classNames('admin-tab', tab === id && 'active')}
                type="button"
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {tab === 'dashboard' ? <AdminDashboard data={data} leads={leads} compareProjects={compareProjects} /> : null}
          {tab === 'projects' ? <AdminProjects data={data} persistCms={persistCms} setToast={setToast} /> : null}
          {tab === 'leads' ? <AdminLeads leads={leads} persistLeads={persistLeads} setToast={setToast} /> : null}
          {tab === 'developers' ? <AdminDevelopers data={data} persistCms={persistCms} setToast={setToast} /> : null}
          {tab === 'locations' ? <AdminLocations data={data} /> : null}
          {tab === 'media' ? <AdminMedia /> : null}
          {tab === 'seo' ? <AdminSeo data={data} /> : null}
        </div>
      </section>
    </main>
  );
}

function AdminDashboard({ data, leads, compareProjects }: { data: CmsData; leads: Lead[]; compareProjects: Project[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const todayLeads = leads.filter((lead) => lead.timestamp.startsWith(today)).length;
  const qualified = leads.filter((lead) => ['Qualified', 'Site Visit Scheduled', 'Negotiation', 'Booked'].includes(lead.status)).length;
  const siteVisits = leads.filter((lead) => lead.intent === 'site-visit' || lead.status.includes('Site Visit')).length;
  const cards = [
    ['Total leads', leads.length.toString(), Users],
    ["Today's leads", todayLeads.toString(), CalendarDays],
    ['Qualified leads', qualified.toString(), UserCheck],
    ['Site visits', siteVisits.toString(), MapPin],
    ['Published projects', data.projects.filter((project) => project.status !== 'Draft' && project.status !== 'Archived').length.toString(), Building2],
    ['Compare shortlist', compareProjects.length.toString(), SlidersHorizontal],
  ];
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(([label, value, Icon]) => {
          const MetricIcon = Icon as typeof Users;
          return (
            <div key={label as string} className="admin-card">
              <MetricIcon className="size-5 text-[var(--glf-gold)]" />
              <p className="text-sm text-[var(--glf-muted)]">{label as string}</p>
              <strong className="text-3xl">{value as string}</strong>
            </div>
          );
        })}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="admin-card">
          <h2 className="font-serif text-2xl">Conversion funnel</h2>
          <div className="mt-4 grid gap-3">
            {leadStatuses.slice(0, 7).map((status) => {
              const count = leads.filter((lead) => lead.status === status).length;
              return (
                <div key={status} className="flex items-center justify-between border-b border-black/10 pb-2">
                  <span>{status}</span>
                  <strong>{count}</strong>
                </div>
              );
            })}
          </div>
        </div>
        <div className="admin-card">
          <h2 className="font-serif text-2xl">Architecture readiness</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {dataModelEntities.map((entity) => (
              <span key={entity} className="muted-badge">{entity}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminProjects({
  data,
  persistCms,
  setToast,
}: {
  data: CmsData;
  persistCms: (data: CmsData) => void;
  setToast: (value: string) => void;
}) {
  function updateProject(projectId: string, patch: Partial<Project>) {
    const next = {
      ...data,
      projects: data.projects.map((project) => (project.id === projectId ? { ...project, ...patch } : project)),
    };
    persistCms(next);
    setToast('Project record updated.');
  }

  function duplicateProject(project: Project) {
    const copy = {
      ...project,
      id: makeId('proj'),
      name: `${project.name} Copy`,
      slug: `${project.slug}-copy-${Date.now()}`,
      status: 'Draft' as const,
      featured: false,
      hot: false,
      newLaunch: false,
      upcoming: false,
    };
    persistCms({ ...data, projects: [copy, ...data.projects] });
    setToast('Project duplicated as draft.');
  }

  return (
    <div className="admin-card overflow-hidden p-0">
      <div className="border-b border-black/10 p-5">
        <h2 className="font-serif text-3xl">Project Management</h2>
        <p className="mt-2 text-sm text-[var(--glf-muted)]">
          Draft, preview, publish, archive, feature and review RERA warnings from here.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-white">
            <tr>
              <th className="p-3">Project</th>
              <th className="p-3">Status</th>
              <th className="p-3">Badges</th>
              <th className="p-3">RERA</th>
              <th className="p-3">Collections</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.projects.map((project) => (
              <tr key={project.id} className="border-t border-black/10">
                <td className="p-3">
        <strong className="break-words">{project.name}</strong>
                  <p className="text-xs text-[var(--glf-muted)]">/{project.slug}</p>
                </td>
                <td className="p-3">
                  <select className="form-input min-w-40" value={project.status} onChange={(event) => updateProject(project.id, { status: event.target.value as Project['status'] })}>
                    {['Draft', 'Upcoming', 'New Launch', 'Under Construction', 'Ready to Move', 'Sold Out', 'Archived'].map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3">{project.editorialBadges.join(', ')}</td>
                <td className="p-3">
                  {project.reraApplicable === 'UNKNOWN' ? (
                    <span className="warn-badge">Needs review</span>
                  ) : (
                    reraDisplay(project)
                  )}
                </td>
                <td className="p-3">
                  <div className="grid gap-1">
                    {(['featured', 'hot', 'upcoming', 'newLaunch', 'investmentOpportunity'] as const).map((field) => (
                      <label key={field} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={Boolean(project[field])}
                          onChange={(event) => updateProject(project.id, { [field]: event.target.checked } as Partial<Project>)}
                        />
                        {field}
                      </label>
                    ))}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    <a className="outline-button" href={`/projects/${project.slug}`}>
                      Preview
                    </a>
                    <button className="outline-button" type="button" onClick={() => duplicateProject(project)}>
                      Duplicate
                    </button>
                    <button className="outline-button" type="button" onClick={() => updateProject(project.id, { status: 'Archived' })}>
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminLeads({
  leads,
  persistLeads,
  setToast,
}: {
  leads: Lead[];
  persistLeads: (leads: Lead[]) => void;
  setToast: (value: string) => void;
}) {
  function updateLead(id: string, patch: Partial<Lead>) {
    persistLeads(leads.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead)));
  }

  function exportCsv() {
    const headers = ['timestamp', 'name', 'phone', 'email', 'city', 'intent', 'status', 'project', 'location', 'source', 'landingPage'];
    const rows = leads.map((lead) =>
      headers.map((header) => JSON.stringify(String((lead as unknown as Record<string, string>)[header] ?? ''))).join(','),
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'golden-leaf-leads.csv';
    link.click();
    URL.revokeObjectURL(url);
    setToast('CSV export generated.');
  }

  if (leads.length === 0) {
    return (
      <div className="admin-card">
        <EmptyState
          title="No leads captured yet"
          text="Submit a brochure, price-sheet, site-visit or consultation form to see it appear in the CRM."
        />
      </div>
    );
  }

  return (
    <div className="admin-card overflow-hidden p-0">
      <div className="flex flex-col justify-between gap-4 border-b border-black/10 p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-serif text-3xl">Leads CRM</h2>
          <p className="mt-2 text-sm text-[var(--glf-muted)]">Captured with source, landing page, referrer, UTM and timeline-ready fields.</p>
        </div>
        <button className="premium-button" type="button" onClick={exportCsv}>
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="bg-white">
            <tr>
              <th className="p-3">Lead</th>
              <th className="p-3">Interest</th>
              <th className="p-3">Source</th>
              <th className="p-3">Status</th>
              <th className="p-3">Assigned advisor</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-black/10">
                <td className="p-3">
                  <strong>{lead.name}</strong>
                  <p>{lead.phone}</p>
                  <p className="text-xs text-[var(--glf-muted)]">{lead.email || 'Email not supplied'}</p>
                </td>
                <td className="p-3">
                  <p>{lead.interestedProject || lead.interestedLocation || 'Consultation'}</p>
                  <p className="text-xs text-[var(--glf-muted)]">{lead.budget} · {lead.propertyType}</p>
                </td>
                <td className="p-3">
                  <p>{lead.intent}</p>
                  <p className="text-xs text-[var(--glf-muted)]">{lead.landingPage}</p>
                </td>
                <td className="p-3">
                  <select className="form-input min-w-48" value={lead.status} onChange={(event) => updateLead(lead.id, { status: event.target.value })}>
                    {leadStatuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <input className="form-input" value={lead.assignedAdvisor} onChange={(event) => updateLead(lead.id, { assignedAdvisor: event.target.value })} placeholder="Advisor name" />
                </td>
                <td className="p-3">{formatDate(lead.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminDevelopers({
  data,
  persistCms,
  setToast,
}: {
  data: CmsData;
  persistCms: (data: CmsData) => void;
  setToast: (value: string) => void;
}) {
  function updateDeveloper(developerId: string, patch: Partial<(typeof data.developers)[number]>) {
    persistCms({
      ...data,
      developers: data.developers.map((developer) => (developer.id === developerId ? { ...developer, ...patch } : developer)),
    });
    setToast('Developer authorization control updated.');
  }

  return (
    <div className="grid gap-4">
      {data.developers.map((developer) => (
        <div key={developer.id} className="admin-card">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div>
              <span className="developer-logo">{developer.logoText}</span>
              <h2 className="mt-4 font-serif text-3xl">{developer.name}</h2>
              <p className="mt-2 max-w-2xl text-[var(--glf-muted)]">{developer.description}</p>
            </div>
            <div className="grid gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={developer.authorizationVerified}
                  onChange={(event) => updateDeveloper(developer.id, { authorizationVerified: event.target.checked })}
                />
                Authorization verified
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={developer.authorizationBadgePublic}
                  onChange={(event) => updateDeveloper(developer.id, { authorizationBadgePublic: event.target.checked })}
                />
                Show public authorization badge
              </label>
              <p className="max-w-xs text-xs text-[var(--glf-muted)]">
                Public badge appears only when both controls are enabled.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminLocations({ data }: { data: CmsData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.locations.map((location) => (
        <div key={location.id} className="admin-card">
          <h2 className="font-serif text-2xl">{location.name}</h2>
          <p className="mt-2 text-sm text-[var(--glf-muted)]">{location.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="muted-badge">{location.state}</span>
            <span className="muted-badge">/{location.slug}</span>
            <span className="muted-badge">{projectsForLocation(data, location.id).length} projects</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminMedia() {
  return (
    <div className="admin-card">
      <h2 className="font-serif text-3xl">Media Library</h2>
      <p className="mt-2 text-[var(--glf-muted)]">
        Production architecture supports images, videos, PDFs, floor plans, logos, alt text, replacement and archive workflows.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {['Images', 'PDF Brochures', 'Developer Logos', 'Floor Plans', 'Videos', 'Documents'].map((item) => (
          <div key={item} className="feature-panel">
            <FileText className="size-5 text-[var(--glf-gold)]" />
            <h3 className="font-serif text-xl">{item}</h3>
            <p>Upload, preview, validate and optimize.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSeo({ data }: { data: CmsData }) {
  const checks = [
    'Unique metadata per page',
    'Canonical URLs',
    'Open Graph and X metadata',
    'Organization, Website, Breadcrumb and Article JSON-LD',
    'robots.txt',
    'XML sitemap route',
    'Accessible forms and labels',
    'Consent-aware event names',
    'RERA warnings before publish',
    'No fake reviews or ratings',
    'No automatic developer authorization claims',
    'No guaranteed-return language',
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="admin-card">
        <h2 className="font-serif text-3xl">SEO and Security Readiness</h2>
        <p className="mt-2 text-[var(--glf-muted)]">
          The local build includes the public information architecture. Production should connect durable storage, server validation, auth, rate limits and secure headers.
        </p>
      </div>
      <div className="admin-card">
        <div className="grid gap-3 sm:grid-cols-2">
          {checks.map((check) => (
            <div key={check} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 text-[var(--glf-gold)]" />
              <span>{check}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg bg-[var(--glf-soft)] p-4 text-sm text-[var(--glf-muted)]">
          CMS coverage: {data.projects.length} projects, {data.locations.length} locations, {data.developers.length} developers, {data.articles.length} articles.
        </div>
      </div>
    </div>
  );
}

function LeadDialog({
  state,
  data,
  onClose,
  onSubmit,
}: {
  state: LeadDialogState;
  data: CmsData;
  onClose: () => void;
  onSubmit: (lead: Lead) => void;
}) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    budget: '',
    propertyType: '',
    preferredCallTime: '',
    purpose: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
    visitors: '1',
    pickup: false,
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (state.open) {
      setSubmitted(false);
      setError('');
    }
  }, [state.open]);

  if (!state.open) return null;

  const projectLocation = state.project ? findLocation(data, state.project.locationId) : undefined;

  function update(name: string, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Name and mobile number are required.');
      return;
    }
    if (!form.consent) {
      setError('Please confirm contact consent.');
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((key) => {
      const value = params.get(key);
      if (value) utm[key] = value;
    });
    const lead: Lead = {
      id: makeId('lead'),
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      city: form.city.trim(),
      budget: form.budget,
      propertyType: form.propertyType,
      preferredCallTime: form.preferredCallTime,
      purpose: form.purpose,
      message:
        state.intent === 'site-visit'
          ? `${form.message}${form.preferredDate ? ` Preferred date: ${form.preferredDate}.` : ''}${form.preferredTime ? ` Preferred time: ${form.preferredTime}.` : ''}${form.pickup ? ' Pickup assistance requested.' : ''} Visitors: ${form.visitors}.`
          : form.message,
      intent: state.intent,
      interestedProject: state.project?.name,
      interestedLocation: projectLocation?.name,
      source: 'website',
      landingPage: window.location.href,
      referrer: document.referrer,
      utm,
      timestamp: new Date().toISOString(),
      status: state.intent === 'site-visit' ? 'Site Visit Scheduled' : 'New',
      assignedAdvisor: '',
      notes: [],
    };
    onSubmit(lead);
    if (state.intent === 'brochure' && state.project) {
      sessionStorage.setItem(`brochure-${state.project.id}`, 'granted');
    }
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-black/10 p-5">
          <div>
            <p className="section-eyebrow">{titleForIntent(state.intent)}</p>
            <h2 className="font-serif text-3xl">{state.title}</h2>
            {state.project ? <p className="mt-1 text-sm text-[var(--glf-muted)]">{state.project.name}</p> : null}
          </div>
          <button className="icon-cta" type="button" onClick={onClose} aria-label="Close enquiry form">
            <X className="size-5" />
          </button>
        </div>
        {submitted ? (
          <div className="p-6">
            <CheckCircle2 className="mb-4 size-10 text-[var(--glf-forest)]" />
            <h3 className="font-serif text-3xl">Thank you. Your enquiry is saved.</h3>
            <p className="mt-3 text-[var(--glf-muted)]">
              A Golden Leaf advisor can follow up with the latest project information. In this local build, the lead is visible in the admin CRM.
            </p>
            {state.intent === 'brochure' ? (
              <a className="premium-button mt-5" href={state.project?.brochureUrl ?? '#'} onClick={(event) => event.preventDefault()}>
                Brochure access recorded
              </a>
            ) : null}
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField label="Name" value={form.name} onChange={(value) => update('name', value)} required />
              <InputField label="Mobile Number" value={form.phone} onChange={(value) => update('phone', value)} required />
              <InputField label="Email" value={form.email} onChange={(value) => update('email', value)} type="email" />
              <InputField label="City" value={form.city} onChange={(value) => update('city', value)} />
              <SelectField label="Budget" value={form.budget} onChange={(value) => update('budget', value)} options={budgets.map((item) => [item, item])} />
              <SelectField label="Property Type" value={form.propertyType} onChange={(value) => update('propertyType', value)} options={data.propertyTypes.map((item) => [item.name, item.name])} />
              <SelectField label="Preferred Call Time" value={form.preferredCallTime} onChange={(value) => update('preferredCallTime', value)} options={['Morning', 'Afternoon', 'Evening', 'Weekend'].map((item) => [item, item])} />
              <SelectField label="Purpose" value={form.purpose} onChange={(value) => update('purpose', value)} options={['Self-use', 'Investment', 'Second Home', 'Rental Income', 'Other'].map((item) => [item, item])} />
            </div>
            {state.intent === 'site-visit' ? (
              <div className="grid gap-4 sm:grid-cols-3">
                <InputField label="Preferred Date" value={form.preferredDate} onChange={(value) => update('preferredDate', value)} type="date" />
                <InputField label="Preferred Time" value={form.preferredTime} onChange={(value) => update('preferredTime', value)} type="time" />
                <InputField label="Visitors" value={form.visitors} onChange={(value) => update('visitors', value)} type="number" />
                <label className="flex items-center gap-2 text-sm sm:col-span-3">
                  <input type="checkbox" checked={form.pickup} onChange={(event) => update('pickup', event.target.checked)} />
                  Pickup assistance required?
                </label>
              </div>
            ) : null}
            <label className="grid gap-2 text-sm">
              <span>Message</span>
              <textarea className="form-input min-h-28 py-3" value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Share your preferred location, budget or questions." />
            </label>
            <label className="flex items-start gap-3 rounded-lg bg-[var(--glf-soft)] p-3 text-sm">
              <input className="mt-1" type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} />
              <span>I agree to be contacted regarding this property. Your information is kept private and used only to assist with your property enquiry.</span>
            </label>
            {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
            <button className="premium-button justify-center" type="submit">
              Submit Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span>{label}{required ? ' *' : ''}</span>
      <input className="form-input" type={type} value={value} required={required} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function titleForIntent(intent: LeadIntent) {
  const titles: Record<LeadIntent, string> = {
    callback: 'Request Callback',
    consultation: 'Speak to a Property Advisor',
    brochure: 'Get Project Brochure',
    price: 'Request Latest Pricing',
    'floor-plan': 'Get Complete Floor Plan',
    'site-visit': 'Schedule Site Visit',
    contact: 'Contact Advisor',
  };
  return titles[intent];
}

function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image: string }) {
  return (
    <section className="relative min-h-[460px] overflow-hidden bg-[var(--glf-forest)] text-white">
      <img className="absolute inset-0 h-full w-full object-cover" src={image} alt={`${eyebrow} hero image`} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,30,23,0.88),rgba(5,30,23,0.45),rgba(5,30,23,0.12))]" />
      <div className="relative mx-auto flex min-h-[460px] max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm text-[var(--glf-gold)]">{eyebrow}</p>
        <h1 className="max-w-4xl break-words font-serif text-4xl leading-[1.08] sm:text-5xl" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="mt-5 max-w-2xl break-words text-base leading-7 text-white/82 sm:text-lg sm:leading-8">{text}</p>
      </div>
    </section>
  );
}

function Breadcrumbs({ items }: { items: string[][] }) {
  return (
    <nav className="flex flex-wrap gap-2 text-sm text-white/72" aria-label="Breadcrumb">
      {items.map(([label, href], index) => (
        <span key={href} className="flex items-center gap-2">
          {index > 0 ? <span>/</span> : null}
          {index === items.length - 1 ? <span>{label}</span> : <a href={href}>{label}</a>}
        </span>
      ))}
    </nav>
  );
}

function ContentPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="feature-panel">
      <h3 className="font-serif text-2xl">{title}</h3>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-1 size-4 text-[var(--glf-gold)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqSection({ faqs, compact = false }: { faqs: { question: string; answer: string }[]; compact?: boolean }) {
  if (faqs.length === 0) return null;
  return (
    <section className={compact ? 'mt-10' : 'section-shell bg-white'}>
      <div className={compact ? '' : 'mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'}>
        <p className="section-eyebrow">FAQs</p>
        <h2 className="section-title">Common Questions</h2>
        <div className="mt-6 grid gap-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-lg border border-black/10 bg-white p-4">
              <summary className="cursor-pointer font-medium">{faq.question}</summary>
              <p className="mt-3 text-[var(--glf-muted)]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function PolicyPage({ title, kind }: { title: string; kind: 'privacy' | 'terms' | 'disclaimer' }) {
  const copy = {
    privacy: [
      'Golden Leaf may collect name, phone, email, city, property interest, enquiry details, analytics and campaign attribution data.',
      'Lead data is used to respond to property enquiries, schedule consultations, support site visits and improve marketing performance.',
      'Consent-aware analytics and marketing tools should be configured before production launch.',
    ],
    terms: [
      'Project information is provided for general informational purposes and should be verified before any purchase decision.',
      'Availability, pricing, specifications and possession timelines can change and should be confirmed with the relevant developer or promoter.',
      'Golden Leaf relationship language must accurately reflect the actual contractual relationship for each project.',
    ],
    disclaimer: [
      'Images may include artistic impressions or representative visuals where clearly configured by the administrator.',
      'Developer, promoter and project information belongs to respective rights holders.',
      'No language on this site should be interpreted as waiving statutory consumer rights.',
    ],
  }[kind];
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title={title}
        text="Editable legal infrastructure for a premium real-estate advisory website."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=82"
      />
      <section className="section-shell">
        <div className="prose-panel mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {copy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </main>
  );
}

function NotFoundPage({ data }: { data: CmsData }) {
  return (
    <main>
      <section className="section-shell min-h-[65vh]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="section-eyebrow">404</p>
          <h1 className="font-serif text-5xl">This page is not available.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--glf-muted)]">
            Continue with curated projects, location pages or the homepage.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a className="premium-button" href="/projects">Explore Projects</a>
            <a className="outline-button" href="/locations">Locations</a>
            <a className="outline-button" href="/">Homepage</a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {data.locations.slice(0, 6).map((location) => (
              <a key={location.id} className="status-pill" href={`/properties/${location.slug}`}>
                {location.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--glf-gold-border)] bg-white p-8 text-center">
      <ClipboardCheck className="mx-auto mb-4 size-8 text-[var(--glf-gold)]" />
      <h3 className="font-serif text-2xl">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--glf-muted)]">{text}</p>
    </div>
  );
}

function Footer({ data, openLead }: { data: CmsData; openLead: (intent: LeadIntent, project?: Project, title?: string) => void }) {
  return (
    <footer className="bg-[var(--glf-charcoal)] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-[var(--glf-gold)] text-[var(--glf-forest)]">
              <Leaf className="size-5" />
            </span>
            <span className="font-serif text-2xl">Golden Leaf Properties</span>
          </div>
          <p className="mt-4 max-w-md text-white/68">
            Curated Properties. Trusted Developers. Smarter Investments.
          </p>
          <button className="premium-button light mt-6" type="button" onClick={() => openLead('consultation')}>
            Book Consultation
          </button>
        </div>
        <FooterColumn title="Quick Links" links={[['Projects', '/projects'], ['Locations', '/locations'], ['Developers', '/developers'], ['Insights', '/insights'], ['About', '/about'], ['Contact', '/contact']]} />
        <FooterColumn title="Property Types" links={data.propertyTypes.slice(0, 6).map((type) => [type.name, `/${type.slug}`])} />
        <FooterColumn title="Legal" links={[['Trust Centre', '/trust'], ['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms'], ['Disclaimer', '/disclaimer'], ['Admin', '/admin']]} />
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/12 pt-6 text-sm text-white/55">
        <p>{contactConfig.officeAddress}</p>
        <p className="mt-2">{contactConfig.phoneDisplay} · {contactConfig.email}</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h2 className="font-serif text-xl">{title}</h2>
      <div className="mt-4 grid gap-2 text-sm text-white/68">
        {links.map(([label, href]) => (
          <a key={href} href={href} className="hover:text-white">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

function MobileCtaBar({ openLead }: { openLead: (intent: LeadIntent, project?: Project, title?: string) => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 border-t border-black/10 bg-white p-2 shadow-2xl md:hidden">
      <a className="mobile-action" href={contactConfig.phoneHref}>
        <Phone className="size-4" /> Call
      </a>
      <a className="mobile-action" href={whatsappUrl()}>
        <MessageCircle className="size-4" /> WhatsApp
      </a>
      <button className="mobile-action" type="button" onClick={() => openLead('contact')}>
        <FileText className="size-4" /> Enquire
      </button>
    </div>
  );
}

function CompareBar({
  projects,
  data,
  setCompare,
}: {
  projects: Project[];
  data: CmsData;
  setCompare: (value: string[]) => void;
}) {
  if (projects.length === 0) return null;
  return (
    <div className="fixed bottom-16 left-0 right-0 z-30 border-t border-black/10 bg-white p-3 shadow-2xl md:bottom-0 md:left-auto md:right-4 md:w-[720px] md:rounded-t-lg md:border">
      <div className="flex items-center justify-between gap-3">
        <strong>Compare shortlist ({projects.length}/3)</strong>
        <button className="text-sm text-[var(--glf-muted)]" type="button" onClick={() => setCompare([])}>
          Clear
        </button>
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-3">
        {projects.map((project) => {
          const location = findLocation(data, project.locationId);
          return (
            <a key={project.id} className="rounded-lg border border-black/10 p-3 text-sm" href={`/projects/${project.slug}`}>
              <strong>{project.name}</strong>
              <p className="text-[var(--glf-muted)]">{location?.name} · {project.startingPrice}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function StructuredData({ data, slug }: { data: CmsData; slug: string[] }) {
  const path = slug.length ? `/${slug.join('/')}` : '/';
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Golden Leaf Properties Private Limited',
    url: contactConfig.domain,
    email: contactConfig.email,
    telephone: contactConfig.phoneDisplay,
    slogan: 'Your Gateway to India’s Finest Real Estate',
  };
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Golden Leaf Properties',
    url: contactConfig.domain,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${contactConfig.domain}/projects?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: contactConfig.domain },
      ...slug.map((part, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: part.split('-').join(' '),
        item: `${contactConfig.domain}/${slug.slice(0, index + 1).join('/')}`,
      })),
    ],
  };
  const article = slug[0] === 'insights' && slug[1] ? findArticle(data, slug[1]) : undefined;
  const articleJson = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: article.image,
        author: { '@type': 'Organization', name: article.author },
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        mainEntityOfPage: `${contactConfig.domain}${path}`,
      }
    : null;
  const graph = articleJson ? [organization, website, breadcrumbs, articleJson] : [organization, website, breadcrumbs];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
