import {
  Award,
  Boxes,
  Clock,
  Heart,
  Gauge,
  Share2,
  Layers,
  Leaf,
  TrendingUp,
  Mail,
  MapPin,
  Phone,
  Printer,
  Gift,
  Rocket,
  FileText,
  Send,
  Shield,
  CheckCircle,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Upload,
  Users,
  DollarSign,
  Eye,
  Zap,
  Package,
} from "lucide-react";
import type {
  FooterLinkGroup,
  HeroHighlight,
  NavLink,
  PortfolioItem,
  ProcessStep,
  SolutionCard,
  StatItem,
  TrustBadge,
  WhyUsItem,
} from "@/types";

export const siteConfig = {
  name: "Pujara Print Pack",
  tagline: "Proficient with perfect printing",
  phone: "+919819894284",
  secondaryPhone: "+91 98670 44343",
  phoneDisplay: "+91 98198 94284",
  email: "pujarapnp@gmail.com",
  address: "Unit No. A/07, Ground Floor, Girikunj Industrial Premises CHS Ltd., Off Mahakali Caves Road, Andheri East, Mumbai - 400093",
  hoursWeekday: "Mon - Fri: 8:00 AM - 6:00 PM",
  hoursSaturday: "Sat: 9:00 AM - 2:00 PM",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/services" },
  { label: "Our Portfolio", href: "/portfolio" },
  { label: "Blogs", href: "/blogs" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact-us" },
];

export const heroBottomHighlights: HeroHighlight[] = [
  {
    icon: Sparkles,
    accent: "violet",
    title: "High Quality Printing",
    description: "Vibrant & Precise",
  },
  {
    icon: Layers,
    accent: "orange",
    title: "Premium Materials",
    description: "Top Quality Stock",
  },
  {
    icon: Clock,
    accent: "blue",
    title: "Fast Turnaround",
    description: "On-time, Every Time",
  },
  {
    icon: Leaf,
    accent: "green",
    title: "Eco Friendly",
    description: "Sustainable Printing",
  },
];

export const heroTrustBadges: TrustBadge[] = [
  {
    icon: Sparkles,
    accent: "violet",
    title: "Smart Printing",
    description: "High quality, perfect results",
  },
  {
    icon: DollarSign,
    accent: "orange",
    title: "Cost Effective",
    description: "Best quality at best price",
  },
  {
    icon: Leaf,
    accent: "green",
    title: "Sustainable",
    description: "Eco-friendly printing for a better tomorrow",
  },
  {
    icon: Shield,
    accent: "violet",
    title: "Secure Delivery",
    description: "Safe & reliable delivery at your doorstep.",
  },
];

export const solutionCards: SolutionCard[] = [
  {
    icon: FileText,
    accent: "violet",
    title: "Business Cards",
    description: "Make a lasting first impression.",
    imageQuery: "colorful business card mockup stack",
  },
  {
    icon: Layers,
    accent: "orange",
    title: "Flyers & Brochures",
    description: "Promote your business the smart way.",
    imageQuery: "tri-fold brochure print design",
  },
  {
    icon: Zap,
    accent: "pink",
    title: "Banners & Signage",
    description: "High-impact displays that get noticed.",
    imageQuery: "outdoor banner stand advertising",
  },
  {
    icon: Package,
    accent: "blue",
    title: "Booklets & Catalogs",
    description: "Showcase your brand beautifully.",
    imageQuery: "open catalog magazine spread",
  },
  {
    icon: Boxes,
    accent: "green",
    title: "Packaging & Labels",
    description: "Custom packaging that stands out.",
    imageQuery: "custom cardboard packaging boxes",
  },
  {
    icon: Gift,
    accent: "violet",
    title: "Custom Printing",
    description: "Apparel, promos & much more.",
    imageQuery: "custom printed t-shirt apparel",
  },
];

export const processSteps: ProcessStep[] = [
  {
    icon: ShoppingCart,
    accent: "violet",
    number: "01",
    title: "Choose Product",
    description: "Select the product and specifications you need.",
  },
  {
    icon: Upload,
    accent: "orange",
    number: "02",
    title: "Upload Design",
    description: "Upload your file or we can help you design.",
  },
  {
    icon: FileText,
    accent: "pink",
    number: "03",
    title: "Review & Confirm",
    description: "We review your order and confirm details.",
  },
  {
    icon: Printer,
    accent: "blue",
    number: "04",
    title: "We Print",
    description: "Advanced technology prints with precision.",
  },
  {
    icon: Truck,
    accent: "green",
    number: "05",
    title: "Delivered To You",
    description: "Fast, safe delivery to your doorstep.",
  },
];

export const statItems: StatItem[] = [
  {
    icon: Users,
    accent: "violet",
    value: "10K+",
    label: "Happy Clients",
  },
  {
    icon: Award,
    accent: "pink",
    value: "25K+",
    label: "Projects Completed",
  },
  {
    icon: Gauge,
    accent: "green",
    value: "99.5%",
    label: "On-Time Delivery",
  },
  {
    icon: Star,
    accent: "orange",
    value: "5★",
    label: "Client Rating",
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Business Card Design",
    category: "Branding",
    imageQuery: "stacked business cards dark background",
  },
  {
    title: "Brochure Design",
    category: "Print",
    imageQuery: "open brochure geometric pattern",
  },
  {
    title: "Banner Design",
    category: "Signage",
    imageQuery: "large outdoor billboard advertisement",
  },
  {
    title: "Packaging Design",
    category: "Packaging",
    imageQuery: "branded shipping boxes stacked",
  },
  {
    title: "Catalog Design",
    category: "Print",
    imageQuery: "open catalog book pages",
  },
  {
    title: "Apparel Printing",
    category: "Custom",
    imageQuery: "black t-shirt colorful print design",
  },
];

export const whyUsItems: WhyUsItem[] = [
  {
    icon: CheckCircle,
    title: "Premium Quality",
    description: "Top quality prints",
  },
  {
    icon: TrendingUp,
    title: "Competitive Pricing",
    description: "Affordable for all businesses",
  },
  {
    icon: Rocket,
    title: "Latest Technology",
    description: "Modern machines",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled professionals",
  },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Blog", href: "/blogs" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { label: "Business Cards", href: "/services/business-cards" },
      { label: "Flyers & Brochures", href: "/services/flyers-brochures" },
      { label: "Banners & Signage", href: "/services/banners-signage" },
      { label: "Booklets & Catalogs", href: "/services/booklets-catalogs" },
      { label: "Packaging & Labels", href: "/services/packaging-labels" },
      { label: "Custom Printing", href: "/services/custom-printing" },
      { label: "And More", href: "/services" },
    ],
  },
];

export const footerContactItems = [
  { icon: MapPin, label: siteConfig.address },
  { icon: Phone, label: siteConfig.phoneDisplay },
  { icon: Mail, label: siteConfig.email },
  { icon: Clock, label: `${siteConfig.hoursWeekday}\n${siteConfig.hoursSaturday}` },
];

export const socialLinks = [
  { icon: Heart, label: "Like", href: "https://facebook.com" },
  { icon: Share2, label: "Share", href: "https://instagram.com" },
  { icon: Gift, label: "Gift", href: "https://github.com" },
  { icon: Mail, label: "Email", href: "mailto:info@pujaraprint.com" },
];
