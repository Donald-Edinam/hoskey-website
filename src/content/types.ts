export type Image = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Credit = {
  role: string;
  name: string;
};

export type ProjectFigure = {
  src: string;
  alt: string;
  caption?: string;
  variant: "full" | "half" | "paired";
  aspect?: string;
};

export type ProjectQuote = {
  quote: string;
  author: string;
  role?: string;
};

export type Project = {
  slug: string;
  title: string;
  client?: string;
  clientVisible: boolean;
  date: string;
  categories: string[];
  summary: string;
  runtime?: string;
  role?: string;
  brief?: string;
  briefParagraphs?: string[];
  approach?: string;
  approachParagraphs?: string[];
  outcome?: string;
  reach?: string;
  quote?: ProjectQuote;
  videoId?: string;
  poster?: string;
  gallery?: Image[];
  figures?: ProjectFigure[];
  deliverables?: string[];
  credits?: Credit[];
  featured?: boolean;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description?: string;
  included?: string[];
  process?: string[];
  priceBand?: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  department: string;
  photo?: string;
  bio?: string;
};

export type StudioSpace = {
  slug: string;
  name: string;
  description: string;
  capacity?: number;
  hourlyRate?: number;
  dayRate?: number;
  minimumHours?: number;
  included?: string[];
  gallery?: Image[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  organisation?: string;
};

export type SocialPlatform =
  | "YouTube"
  | "Instagram"
  | "TikTok"
  | "Telegram"
  | "Snapchat"
  | "WhatsApp";

export type SocialLink = {
  platform: SocialPlatform;
  url?: string | null;
};

export type SiteSettings = {
  name: string;
  motto: string;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  showreelId?: string | null;
  socials?: SocialLink[];
};

export type AcrosticItem = {
  letter: string;
  word: string;
  meaning: string;
};

export type ValueItem = {
  title: string;
  description: string;
};

export type FounderStory = {
  name: string;
  alias: string;
  origin: string;
  education: string;
  biography: string[];
};

export type AboutContent = {
  founder: FounderStory;
  acrostic: AcrosticItem[];
  values: ValueItem[];
  mission: string;
  vision: string;
};
