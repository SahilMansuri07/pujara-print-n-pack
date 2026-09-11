import { NewsletterForm } from "./NewsletterForm";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { footerLinkGroups, siteConfig, socialLinks } from "@/lib/site-data";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer({ logoUrl, siteName, contact }: { logoUrl?: string | null; siteName?: string; contact?: { phone: string | null; secondary_phone: string | null; email: string | null; address: string | null } }) {
  const phone = contact?.phone || siteConfig.phoneDisplay;
  const secondary = contact?.secondary_phone || siteConfig.secondaryPhone;
  const email = contact?.email || siteConfig.email;
  const items = [
    { icon: MapPin, label: contact?.address || siteConfig.address, href: undefined },
    { icon: Phone, label: phone, href: 'tel:' + phone.replace(/[^+0-9]/g, '') },
    { icon: Phone, label: secondary, href: 'tel:' + secondary.replace(/[^+0-9]/g, '') },
    { icon: Mail, label: email, href: 'mailto:' + email },
  ];
  return <footer className="site-footer" id="contact"><Container>
    <div className="footer-columns">
      <div className="footer-about"><Link href="/"><Logo src={logoUrl} alt={siteName} /></Link>
        <p>Your trusted printing and packaging partner. We deliver high-quality printing with speed, precision and care.</p>
        <div className="footer-socials">{socialLinks.map(social => <a key={social.label} href={social.href} aria-label={social.label}><social.icon size={14} /></a>)}</div>
      </div>
      {footerLinkGroups.map(group => <div key={group.title}><h3>{group.title}</h3><ul>{group.links.map(link => <li key={link.label}><Link href={link.href}>{link.label}</Link></li>)}</ul></div>)}
      <div><h3>Contact Us</h3><ul className="footer-contact">{items.map(item => <li key={item.label}><item.icon size={15} />{item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}</li>)}</ul></div>
      <div className="footer-newsletter"><h3>Newsletter</h3><p>Subscribe to get updates<br />and special offers.</p><NewsletterForm /></div>
    </div>
  </Container><div className="footer-bottom"><Container><p>© 2024 Pujara Print N Pack. All Rights Reserved.</p><div><span>Privacy Policy</span><span>|</span><span>Terms &amp; Conditions</span></div></Container></div></footer>;
}
