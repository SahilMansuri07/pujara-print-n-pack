"use client";

import { ChevronDown, Phone, ArrowRight, Menu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks, siteConfig } from "@/lib/site-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import {
  usePageEntrance,
  entranceTransition,
} from "@/components/common/usePageEntrance";

type NavigationLink = { label: string; href: string };

function NavigationItems({
  categoryLinks,
}: {
  categoryLinks: Record<string, NavigationLink[]>;
}) {
  const pathname = usePathname();
  return (
    <>
      {navLinks
        .map((original) =>
          categoryLinks[original.href]
            ? { ...original, children: categoryLinks[original.href] }
            : original,
        )
        .map((link) =>
          link.children ? (
            <details
              className="nav-item nav-group"
              key={link.label}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse")
                  event.currentTarget.open = true;
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse")
                  event.currentTarget.open = false;
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.currentTarget.open = false;
                  event.currentTarget.querySelector("summary")?.focus();
                }
              }}
            >
              <summary>
                {link.label}
                <ChevronDown size={12} />
              </summary>
              <div
                className="nav-dropdown"
                style={{ maxHeight: "65vh", overflowY: "auto" }}
              >
                {link.children.map((child) => (
                  <Link
                    href={child.href}
                    key={child.href}
                    onClick={(event) => {
                      const details = event.currentTarget.closest("details");
                      if (details) details.open = false;
                    }}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </details>
          ) : (
            <div className="nav-item" key={link.label}>
              <Link
                href={link.href}
                className={pathname === link.href ? "active" : ""}
              >
                {link.label}
              </Link>
            </div>
          ),
        )}
    </>
  );
}

export function Navbar({
  categoryLinks,
  logoUrl,
  siteName,
  phone,
}: {
  categoryLinks: Record<string, NavigationLink[]>;
  logoUrl?: string | null;
  siteName?: string;
  phone?: string | null;
}) {
  const startedAt = usePageEntrance();
  const reducedMotion = useReducedMotion();
  const entrance = useAnimationControls();
  useEffect(() => {
    if (reducedMotion !== false) {
      entrance.set({ opacity: 1, y: 0 });
      return;
    }
    entrance.set({ opacity: 0, y: -24 });
    if (startedAt === null) return;
    const remaining =
      entranceTransition.duration - (performance.now() - startedAt) / 1000;
    if (remaining <= 0) entrance.set({ opacity: 1, y: 0 });
    else
      void entrance.start({
        opacity: 1,
        y: 0,
        transition: { ...entranceTransition, duration: remaining },
      });
    return () => entrance.stop();
  }, [entrance, reducedMotion, startedAt]);
  return (
    <motion.header initial={false} animate={entrance} className="site-header">
      <Container className="header-inner">
        <Link href="/" className="header-logo">
          <Logo src={logoUrl} alt={siteName} />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavigationItems categoryLinks={categoryLinks} />
        </nav>
        <a
          href={`tel:${(phone || siteConfig.phone).replace(/[^+0-9]/g, "")}`}
          className="header-phone"
        >
          <Phone size={26} />
          <span>
            <strong>{phone || siteConfig.phoneDisplay}</strong>
            <small>Talk to Print Expert</small>
          </span>
        </a>
        <Link
          href="/contact-us"
          className="small-cta bg-brand-gradient header-quote"
        >
          Get a Quote <ArrowRight size={14} />
        </Link>
        <details className="mobile-nav">
          <summary aria-label="Open navigation">
            <Menu size={23} />
          </summary>
          <nav aria-label="Mobile navigation">
            <NavigationItems categoryLinks={categoryLinks} />
          </nav>
        </details>
      </Container>
    </motion.header>
  );
}
