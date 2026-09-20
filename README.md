# Justin Strong Portfolio

Build a portfolio website for a professional model. It must feel like a real agency-quality talent portfolio: image-first, fast, and quiet. Casting directors and agents will open it on a phone for about 30 seconds, so the images do the talking and the text stays minimal.

Subject

Name: Justin Strong
Role: Model — commercial, lifestyle, editorial
Based: Chicago, IL
Domain: justinstrongmodel.com
Booking email: bookings@justinstrongmodel.com
Instagram: @justinstrongmodel (https://instagram.com/justinstrongmodel)

Stack

React + Vite + Tailwind + TypeScript. No CMS, no database, no auth, no backend. All content lives in a single typed config file at src/data/site.ts so it can be edited by hand — name, tagline, stats, image lists, links, and section copy all come from there, never hardcoded in components.

Image handling (important)

I am adding the real photos myself after you build this. So:

Reference every photo from /public/images/ with the exact filenames listed below. Don't rename or restructure them.
Ship placeholder files at those paths (solid neutral gray with the filename printed on them) so the layout renders correctly before real photos arrive.
All photos are vertical, 2:3 aspect ratio, except where noted. Never crop a face out: use object-fit: cover with object-position: 50% 30% on portraits.
Use loading="lazy" on everything below the fold, loading="eager" on the hero image only, plus width/height attributes so nothing shifts as images load.

Filenames to use:

/public/images/hero.jpg            (2:3, hero portrait)
/public/images/headshot.jpg        (2:3, used in About)
/public/images/formal-01.jpg ... formal-05.jpg
/public/images/lifestyle-01.jpg ... lifestyle-05.jpg
/public/images/street-01.jpg ... street-05.jpg
/public/images/digitals-01.jpg ... digitals-05.jpg
/public/images/og-image.jpg        (1200x630, social preview)
/public/comp-card.pdf              (linked, not embedded)

Pages and sections

Single page with smooth-scrolling anchor nav. Sections in this order:

Header — Fixed, minimal, transparent over the hero and gaining a solid background on scroll. Left: "JUSTIN STRONG" as a wordmark. Right: Portfolio · Stats · About · Contact, plus an Instagram icon link. On mobile it collapses into a full-screen overlay menu.
Hero — Full-bleed portrait on the right or as a background on mobile. Overlaid: the name large, then a single line: "Model · Chicago · Commercial · Lifestyle · Editorial". One quiet button: "Book" (mailto link to the booking email). No carousel, no autoplay, no scroll-down arrow animation.
Portfolio — The core of the site. Four categories: Formal, Lifestyle, Street, Digitals. Filter with text-link tabs, not pill buttons; "All" is the default. Masonry-ish responsive grid: 3 columns on desktop, 2 on tablet, 1 on mobile, with tight gaps (4–8px) so the images read as one body of work. Clicking any photo opens a full-screen lightbox with keyboard arrow navigation, an Escape key close, and swipe on touch. The lightbox must not shift the page behind it when it opens.
Stats — A clean two-column list, not cards, not icons. Use tabular numbers so the values line up:
Height    5'7"
Suit      38S
Chest     —
Waist     31"
Inseam    28"
Shoe      8.5
Hair      —
Eyes      —

Leave the em-dash values in place as editable config. Below the list, a text link: "Download comp card (PDF)" → /comp-card.pdf.

About — Short. Two or three sentences, next to the headshot. Use this copy:

Justin Strong is a Chicago-based model working in commercial, lifestyle, and editorial. He comes from behind the camera — years directing and producing film and video — which means he arrives on set already fluent in how one runs. Comfortable taking direction, in stills and on camera.

Contact — No form. Just the booking email as a large mailto: link, the Instagram handle, and "Chicago, IL · Available for travel."
Footer — Name, year, one line: "Represented by — " left blank for now, and the Instagram link.

Design direction

Editorial and restrained, like a fashion portfolio rather than a startup landing page. Specifics:

Palette: near-black ink (
#111111), warm off-white paper (
#FAF8F5), a mid-warm gray for secondary text (
#7A736C), and a single muted accent used sparingly for links and hover states — a warm amber-brown around 
#A8702A. No gradients. No purple. No blue.
Type: a high-contrast serif for the name and section headings (Playfair Display or Bodoni Moda from Google Fonts), and a clean neutral sans for everything else. Section labels are small, uppercase, and letter-spaced. Generous line height in body copy.
Layout: wide margins, lots of white space, an asymmetric hero. Content maxes out around 1200px. Section headings sit small in the left margin while content fills the right, on desktop.
Motion: almost none. A soft fade-in on images as they load, and quiet hover states in the grid. No parallax, no scroll-jacking, no text that slides in as you scroll. Respect prefers-reduced-motion.
No: rounded cards everywhere, drop shadows, emoji, icon bullets, stat "cards", testimonial sections, a hero that takes the full viewport height on mobile.

Light mode only. This is a print-portfolio aesthetic, so commit to the paper ground rather than building a dark theme.

Technical requirements

Mobile-first. It must be flawless at 390px wide. No horizontal scrolling anywhere.
Semantic HTML with real 

 landmarks, alt text on every image describing the look (for example "Justin Strong in a black suit, studio portrait"), visible focus states, and a lightbox that traps focus and returns it on close.
SEO: title "Justin Strong — Model | Chicago", a meta description, Open Graph and Twitter card tags using /images/og-image.jpg, and JSON-LD Person schema with name, jobTitle "Model", address Chicago IL, email, and the Instagram URL in sameAs.
Lighthouse performance 90+ on mobile. No heavy libraries — write the lightbox yourself rather than pulling in a gallery package.
A favicon that's just the initials JS in the serif face on the ink background.

Build it in one pass, then show me the result.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4fb96688-8eff-4c86-9cf2-b9e571436290).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
