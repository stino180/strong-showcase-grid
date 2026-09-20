import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, type PortfolioCategory } from "@/data/site";

type Filter = "All" | PortfolioCategory;

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled || menuOpen ? "site-header-solid" : ""}`}>
      <a className="wordmark" href="#top" aria-label={`${site.name}, home`}>{site.wordmark}</a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {site.nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
        <a href={site.instagram.url} target="_blank" rel="noreferrer" aria-label={`${site.name} on Instagram`}>
          <Instagram aria-hidden="true" />
        </a>
      </nav>
      <Button
        variant="ghost"
        size="icon"
        className="menu-trigger"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </Button>
      {menuOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
          {site.nav.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
          <a href={site.instagram.url} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            Instagram <Instagram aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <img className="hero-image image-reveal" src={site.hero.src} alt={site.hero.alt} width={site.hero.width} height={site.hero.height} loading="eager" fetchPriority="high" />
      <div className="hero-content">
        <h1 id="hero-title">{site.name}</h1>
        <p>{site.tagline}</p>
        <a className="book-link" href={`mailto:${site.bookingEmail}`}>Book</a>
      </div>
    </section>
  );
}

function Lightbox({ images, index, onClose, onChange }: { images: typeof site.portfolio; index: number; onClose: () => void; onChange: (index: number) => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    closeRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((index + 1) % images.length);
      if (event.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      previous?.focus();
    };
  }, [images.length, index, onChange, onClose]);

  const image = images[index];
  if (!image) return null;
  const previous = () => onChange((index - 1 + images.length) % images.length);
  const next = () => onChange((index + 1) % images.length);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Image ${index + 1} of ${images.length}`} ref={dialogRef} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { const start = touchStart.current; const end = event.changedTouches[0]?.clientX; if (start === null || end === undefined) return; if (start - end > 50) next(); if (end - start > 50) previous(); }}>
      <Button ref={closeRef} variant="ghost" size="icon" className="lightbox-close" onClick={onClose} aria-label="Close image"><X aria-hidden="true" /></Button>
      <Button variant="ghost" size="icon" className="lightbox-previous" onClick={previous} aria-label="Previous image"><ChevronLeft aria-hidden="true" /></Button>
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
      <Button variant="ghost" size="icon" className="lightbox-next" onClick={next} aria-label="Next image"><ChevronRight aria-hidden="true" /></Button>
      <p>{index + 1} / {images.length}</p>
    </div>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const images = useMemo(() => filter === "All" ? site.portfolio : site.portfolio.filter((image) => image.category === filter), [filter]);

  return (
    <section id="portfolio" className="page-section" aria-labelledby="portfolio-title">
      <div className="section-label"><h2 id="portfolio-title">Portfolio</h2><span>01</span></div>
      <div className="section-body">
        <div className="filter-tabs" role="group" aria-label="Filter portfolio">
          {site.portfolioCategories.map((category) => (
            <Button key={category} variant="link" className={filter === category ? "is-active" : ""} onClick={() => { setFilter(category); setActiveIndex(null); }} aria-pressed={filter === category}>{category}</Button>
          ))}
        </div>
        <div className="portfolio-grid">
          {images.map((image, index) => (
            <button className="portfolio-image" key={image.src} onClick={() => setActiveIndex(index)} aria-label={`Open ${image.alt}`}>
              <img className="image-reveal" src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
      {activeIndex !== null && <Lightbox images={images} index={activeIndex} onClose={() => setActiveIndex(null)} onChange={setActiveIndex} />}
    </section>
  );
}

function Stats() {
  return (
    <section id="stats" className="page-section ruled-section" aria-labelledby="stats-title">
      <div className="section-label"><h2 id="stats-title">Stats</h2><span>02</span></div>
      <div className="section-body stats-body">
        <dl className="stats-list">
          {site.stats.map((stat) => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}
        </dl>
        <a className="text-link" href={site.compCard.url} download>{site.compCard.label}</a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="page-section ruled-section" aria-labelledby="about-title">
      <div className="section-label"><h2 id="about-title">About</h2><span>03</span></div>
      <div className="section-body about-body">
        <img className="image-reveal" src={site.headshot.src} alt={site.headshot.alt} width={site.headshot.width} height={site.headshot.height} loading="lazy" />
        <p>{site.about}</p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="page-section contact-section" aria-labelledby="contact-title">
      <div className="section-label"><h2 id="contact-title">Contact</h2><span>04</span></div>
      <div className="section-body contact-body">
        <p>{site.contact.heading}</p>
        <a href={`mailto:${site.bookingEmail}`}>{site.bookingEmail}</a>
        <a className="instagram-link" href={site.instagram.url} target="_blank" rel="noreferrer">{site.instagram.handle} <Instagram aria-hidden="true" /></a>
        <span>{site.contact.locationLine}</span>
      </div>
    </section>
  );
}

export function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Portfolio />
        <Stats />
        <About />
        <Contact />
      </main>
      <footer><span>{site.name} · {new Date().getFullYear()}</span><span>{site.representation}</span><a href={site.instagram.url} target="_blank" rel="noreferrer">Instagram</a></footer>
    </>
  );
}