---
version: alpha
name: ocak-turizm-design-system
description: A premium Turkish travel agency brand built on deep navy (#041A3D) and warm gold (#C9A84C) — evoking trust, heritage, and luxury exploration. The brand serves family-oriented travelers seeking Islamic-values-aligned tours to Egypt, Morocco, Uzbekistan, and Bosnia. Typography pairs Poppins Bold for authoritative headings with Raleway for elegant, readable body text. The visual language balances editorial photography with generous whitespace, soft-rounded cards, and a restrained two-color accent system. Every component should feel warm, trustworthy, and culturally respectful — never flashy or generic. The gold accent is used sparingly for CTAs, prices, and highlights; navy dominates navigation, headings, and trust elements.

colors:
  primary: "#041A3D"
  primary-light: "#3B4B6B"
  primary-hover: "#0A2A5C"
  gold: "#C9A84C"
  gold-hover: "#B8963F"
  gold-light: "#D4BC7A"
  gold-muted: "rgba(201, 168, 76, 0.12)"
  ink: "#212529"
  body: "#495057"
  muted: "#6c757d"
  muted-soft: "#adb5bd"
  hairline: "#dee2e6"
  hairline-soft: "#e9ecef"
  border-strong: "#adb5bd"
  canvas: "#ffffff"
  surface-soft: "#f8f9fa"
  surface-card: "#ffffff"
  surface-warm: "#f1f3f5"
  on-primary: "#ffffff"
  on-gold: "#ffffff"
  on-dark: "#ffffff"
  overlay-light: "rgba(0, 0, 0, 0.35)"
  overlay-heavy: "rgba(0, 0, 0, 0.55)"
  success: "#2d6a4f"
  error: "#c1121f"
  star-rating: "#C9A84C"
  whatsapp: "#25D366"

typography:
  display-xl:
    fontFamily: "'Poppins', sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.5px
    note: "Hero headlines only. Use clamp(1.75rem, 5vw, 3.5rem) for responsive sizing."
  display-lg:
    fontFamily: "'Poppins', sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.3px
    note: "Section titles on landing pages."
  display-md:
    fontFamily: "'Poppins', sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0
    note: "Section headers (h2). The workhorse heading size."
  display-sm:
    fontFamily: "'Poppins', sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0
    note: "Sub-section headers, card group titles."
  title-lg:
    fontFamily: "'Poppins', sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0
    note: "Card titles, feature names."
  title-md:
    fontFamily: "'Poppins', sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
    note: "Smaller card titles, sidebar headings."
  title-sm:
    fontFamily: "'Poppins', sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
    note: "Labels, footer headings, meta titles."
  body-lg:
    fontFamily: "'Raleway', sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0
    note: "Hero subtitles, prominent body text."
  body-md:
    fontFamily: "'Raleway', sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0
    note: "Default body text. Readable at any width."
  body-sm:
    fontFamily: "'Raleway', sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
    note: "Descriptions, secondary info, card body text."
  caption:
    fontFamily: "'Raleway', sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
    note: "Dates, metadata, tour durations."
  caption-sm:
    fontFamily: "'Raleway', sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0
    note: "Legal text, TURSAB badge, fine print."
  tagline:
    fontFamily: "'Raleway', sans-serif"
    fontSize: 16px
    fontWeight: 500
    fontStyle: italic
    lineHeight: 1.5
    letterSpacing: 0.3px
    note: "Hero tagline. Always italic, always gold."
  price:
    fontFamily: "'Poppins', sans-serif"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
    note: "Tour prices. Always in gold color."
  price-old:
    fontFamily: "'Raleway', sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0
    textDecoration: line-through
    note: "Strikethrough old price. Always in muted color."
  nav-link:
    fontFamily: "'Raleway', sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0
    note: "Navbar links. Separated by thin dividers."
  button-text:
    fontFamily: "'Poppins', sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  uppercase-tag:
    fontFamily: "'Raleway', sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 1.5px
    textTransform: uppercase
    note: "Section overlines, category labels. Sparse usage."

rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  2xl: 40px
  3xl: 48px
  section-y: 80px
  section-y-mobile: 64px
  container-x: 16px
  note: "4px base unit. Section padding is generous (80px desktop, 64px mobile) to let photography breathe."

layout:
  max-width: 1152px
  max-width-class: "max-w-6xl"
  container-padding: "px-4"
  grid-gap: "gap-5"
  grid-gap-lg: "gap-6"
  section-padding: "py-20 lg:py-24"
  section-padding-sm: "py-16 lg:py-20"
  note: "All content is constrained to max-w-6xl (1152px). Sections use consistent vertical rhythm. Grid gaps are 20px (gap-5) for cards, 24px (gap-6) for larger layouts."

shadows:
  none: "none"
  sm: "0 1px 3px rgba(0, 0, 0, 0.06)"
  md: "0 4px 12px rgba(0, 0, 0, 0.08)"
  lg: "0 8px 24px rgba(0, 0, 0, 0.1)"
  xl: "0 12px 40px rgba(0, 0, 0, 0.12)"
  card-default: "0 1px 3px rgba(0, 0, 0, 0.06)"
  card-hover: "0 8px 24px rgba(0, 0, 0, 0.1)"
  navbar: "0 2px 8px rgba(0, 0, 0, 0.06)"
  note: "Shadows are subtle and warm. Cards use sm at rest, lg on hover. Never use harsh or colored shadows. Elevation is expressed through shadow + slight translateY(-4px) on hover."

transitions:
  default: "all 200ms ease"
  slow: "all 300ms ease"
  transform: "transform 300ms ease"
  opacity: "opacity 700ms ease"
  note: "200ms for interactive states (hover, focus). 300ms for transforms and image zooms. 700ms for hero slide crossfade."

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    hoverBackgroundColor: "{colors.gold}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-text}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
    height: 44px
    note: "Primary CTA. Navy default, gold on hover. Used for 'Tur Talebi', form submits."
  button-primary-lg:
    backgroundColor: "{colors.gold}"
    hoverBackgroundColor: "{colors.gold-hover}"
    textColor: "{colors.on-gold}"
    typography: "{typography.button-text}"
    rounded: "{rounded.sm}"
    padding: "12px 32px"
    height: 48px
    note: "Large CTA in banners and hero. Gold default."
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    border: "1px solid {colors.primary}"
    hoverBackgroundColor: "{colors.primary}"
    hoverTextColor: "{colors.on-primary}"
    typography: "{typography.button-text}"
    rounded: "{rounded.sm}"
    padding: "10px 24px"
    height: 44px
    note: "Outline button. Used for 'Tum Turlari Gor', secondary actions."
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    hoverTextColor: "{colors.gold}"
    typography: "{typography.button-text}"
    note: "Text-only link button. Arrow suffix (->). Used for 'Devamini Oku'."

  card-tour:
    backgroundColor: "{colors.surface-card}"
    border: "1px solid {colors.hairline-soft}"
    rounded: "{rounded.xl}"
    shadow: "{shadows.card-default}"
    hoverShadow: "{shadows.card-hover}"
    hoverTranslateY: -4px
    imageHeight: 192px
    imageFit: cover
    imageHoverScale: 1.05
    padding: "16px"
    note: "Tour listing cards. Image on top with duration badge (top-left, navy pill). Title in primary, cities in muted, price in gold. Bottom border separates meta from price."
    structure:
      - "Image container (h-48, overflow-hidden, rounded top)"
      - "Duration badge (absolute, top-left, bg-primary/90, text-white, rounded-full)"
      - "Content padding (p-4)"
      - "Title (title-md, primary)"
      - "Cities (caption, muted-soft)"
      - "Divider (border-t, hairline-soft, mt-3 pt-3)"
      - "Date (caption, muted) | Price (price, gold) with optional old price"

  card-feature:
    backgroundColor: "{colors.surface-soft}"
    rounded: "{rounded.xl}"
    padding: "24px"
    textAlign: center
    hoverTranslateY: -4px
    hoverShadow: "{shadows.md}"
    note: "Why-us feature cards. Icon in navy circle (w-16 h-16), title below, description in muted."
    structure:
      - "Icon circle (w-16 h-16, bg-primary, rounded-full, centered, text-white)"
      - "Title (title-sm, primary, mt-4)"
      - "Description (caption, muted, leading-relaxed)"

  card-testimonial:
    backgroundColor: "{colors.surface-card}"
    border: "1px solid {colors.hairline-soft}"
    rounded: "{rounded.xl}"
    padding: "24px"
    shadow: "{shadows.card-default}"
    hoverTranslateY: -4px
    hoverShadow: "{shadows.md}"
    note: "Review cards. Avatar circle with initials (bg-primary), name + tour, star row in gold, quote text."
    structure:
      - "Avatar row: circle (w-11 h-11, bg-primary, initials) + name (title-sm) + tour (caption, muted-soft)"
      - "Stars (gold, sm)"
      - "Quote text (body-sm, body color, leading-relaxed)"

  card-destination:
    rounded: "{rounded.xl}"
    height: 176px
    shadow: "{shadows.card-default}"
    hoverTranslateY: -4px
    hoverShadow: "{shadows.lg}"
    imageHoverScale: 1.05
    note: "Destination cards with full-bleed image, gradient overlay, centered flag + name + tour count."
    structure:
      - "Full-bleed image (object-cover)"
      - "Gradient overlay (from-black/70 via-black/30 to-black/10)"
      - "Centered content: flag (text-3xl) + name (title-sm, white) + count (caption-sm, white/70)"

  card-blog:
    backgroundColor: "{colors.surface-card}"
    border: "1px solid {colors.hairline-soft}"
    rounded: "{rounded.xl}"
    shadow: "{shadows.card-default}"
    hoverTranslateY: -4px
    hoverShadow: "{shadows.md}"
    imageHeight: 192px
    note: "Blog post preview cards. Category badge on image, date + title + excerpt + read-more link."
    structure:
      - "Image (h-48, overflow-hidden)"
      - "Category badge (absolute, top-left, bg-primary/90, text-white, rounded-full)"
      - "Content (p-5): date (caption, muted-soft) + title (title-sm, primary, hover:gold) + excerpt (caption, muted, line-clamp-3) + link (caption, gold, underline-on-hover)"

  navbar:
    topBar:
      backgroundColor: "{colors.primary}"
      textColor: "{colors.on-primary}"
      height: 40px
      typography: "{typography.caption}"
      note: "Utility bar with phone number (left) and social icons (right). Icons hover to gold."
    mainNav:
      backgroundColor: "{colors.canvas}"
      borderBottom: "1px solid {colors.hairline-soft}"
      height: 64px
      note: "White nav bar. Logo left, links center (separated by thin gray dividers), CTA right."
    logo:
      format: "Ocak[gold dot] TURIZM"
      primaryText: "{typography.title-lg}, {colors.primary}"
      dot: "{colors.gold}"
      suffix: "uppercase, tracking-widest, caption-sm, muted-soft"
    links:
      typography: "{typography.nav-link}"
      color: "{colors.body}"
      hoverColor: "{colors.primary}"
      separator: "thin gray pipe (|), {colors.hairline}"
    cta:
      extends: "button-primary"
      text: "Tur Talebi"
    scrollBehavior: "Add shadow-md on scroll > 50px"
    mobileMenu: "Full-width dropdown below nav, links stacked, CTA at bottom"

  hero:
    height: "80vh (min 480px, max 700px)"
    marginTop: 104px
    overlay: "gradient from-black/35 to-black/55"
    slideTransition: "{transitions.opacity}"
    autoplayInterval: 6000ms
    note: "Full-width image/video carousel. Content centered vertically. Tagline in gold italic above headline."
    structure:
      - "Background: image slides with crossfade (or video for first slide)"
      - "Overlay gradient"
      - "Content (centered): tagline (tagline, gold) + headline (display-xl, white, text-shadow) + subtitle (body-lg, white/90) + search bar"
      - "Navigation: left/right circle buttons (bg-white/20, hover:white/30) + bottom dot indicators"
    searchBar:
      backgroundColor: "rgba(255, 255, 255, 0.95)"
      hoverBackgroundColor: "{colors.canvas}"
      rounded: "{rounded.sm}"
      shadow: "{shadows.lg}"
      inputPadding: "14px 20px"
      placeholder: "Nereye gitmek istersiniz?"
      submitButton: "bg-primary, hover:bg-gold, white icon"

  section-header:
    alignment: center
    titleTypography: "{typography.display-md}"
    titleColor: "{colors.primary}"
    subtitleTypography: "{typography.body-sm}"
    subtitleColor: "{colors.muted}"
    spacing: "title mb-2, subtitle mb-0, wrapper mb-10"
    note: "Every section uses the same header pattern: centered h2 in navy Poppins + subtitle in muted Raleway below. Consistent mb-10 before content."

  cta-banner:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    padding: "{spacing.section-y-mobile}"
    textAlign: center
    note: "Full-width navy banner. Headline (display-sm, white), description (body-sm, white/70), gold CTA button."
    structure:
      - "Headline (display-sm, white)"
      - "Description (body-sm, white/70, max-w-lg, centered)"
      - "CTA button (button-primary-lg)"

  footer:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    padding: "56px top, 24px bottom"
    note: "4-column grid on desktop. Logo + description + socials | Quick Links | Destinations | Contact info. Bottom bar with copyright + policy links."
    columns:
      - "Brand: logo + description (body-sm, white/50) + social icons (bg-white/10, hover:bg-gold, rounded-lg)"
      - "Quick Links: heading (title-sm) + links (body-sm, white/50, hover:gold)"
      - "Destinations: heading (title-sm) + links (body-sm, white/50, hover:gold)"
      - "Contact: heading (title-sm) + phone/email/address (body-sm, white/50) + TURSAB (caption-sm, white/30)"
    bottomBar:
      borderTop: "1px solid rgba(255, 255, 255, 0.1)"
      marginTop: 40px
      paddingTop: 24px
      copyright: "{typography.caption-sm}, white/30"
      links: "{typography.caption-sm}, white/30, hover:gold"

  accordion-faq:
    backgroundColor: "{colors.surface-soft}"
    border: "1px solid {colors.hairline-soft}"
    rounded: "{rounded.md}"
    questionPadding: "20px"
    answerPadding: "0 20px 20px"
    questionTypography: "{typography.title-sm}, {colors.primary}"
    answerTypography: "{typography.body-sm}, {colors.body}"
    chevron: "text-muted-soft, rotate-180 on open, transition 200ms"
    note: "Stacked with 12px gap. First item open by default."

  whatsapp-fab:
    backgroundColor: "{colors.whatsapp}"
    size: 56px
    rounded: "{rounded.full}"
    position: "fixed bottom-6 right-6"
    shadow: "{shadows.lg}"
    pulse: "ring animation 1.5s infinite"
    note: "Always-visible floating action button. Pulse ring effect draws attention."

  form-input:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.hairline}"
    focusBorder: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
    typography: "{typography.body-sm}"
    placeholder: "{colors.muted-soft}"
    note: "Clean, minimal inputs. Border darkens to primary on focus. No colored backgrounds."

  badge-duration:
    backgroundColor: "rgba(4, 26, 61, 0.9)"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption-sm}, fontWeight: 600"
    rounded: "{rounded.full}"
    padding: "4px 12px"
    note: "Tour duration badge on card images. '7 Gun' format."

  pagination-dots:
    activeColor: "{colors.canvas}"
    activeWidth: 24px
    inactiveColor: "rgba(255, 255, 255, 0.4)"
    inactiveHoverColor: "rgba(255, 255, 255, 0.6)"
    size: 10px
    rounded: "{rounded.full}"
    note: "Used in hero carousel and testimonial pagination. Active dot stretches wider."

design-principles:
  - name: "Navy & Gold Discipline"
    rule: "Navy (#041A3D) is the anchor — headings, nav, trust elements, footer. Gold (#C9A84C) is the spark — CTAs, prices, hover states, stars. Never use gold for large surfaces. Never use navy for body text (use gray-800 instead)."
  - name: "Photography First"
    rule: "Hero images and destination cards carry the emotional weight. Keep overlays subtle enough to preserve image quality. Text shadows on hero ensure readability without heavy overlays."
  - name: "Warm Minimalism"
    rule: "White canvas with soft gray (f8f9fa) alternating sections. No busy patterns, no decorative borders. Let content breathe with generous section padding (80px). Cards use 1px hairline borders, not thick strokes."
  - name: "Consistent Section Rhythm"
    rule: "Every content section follows: centered header (h2 navy + subtitle muted, mb-10) -> content grid -> optional CTA link. This repetition creates scannable familiarity."
  - name: "Subtle Interactivity"
    rule: "Cards lift on hover (-translate-y-1, shadow upgrade). Images scale 1.05 inside overflow-hidden containers. Transitions are 200ms for states, 300ms for transforms. Never bounce, never overshoot."
  - name: "Trust Signals"
    rule: "TURSAB badge, star ratings, testimonial initials, WhatsApp FAB — these are always visible and consistently styled. Trust elements use navy backgrounds for authority."
  - name: "Mobile-First Density"
    rule: "Sections compress from py-20 to py-16 on mobile. Grid drops from multi-column to single. Navbar collapses to hamburger. Hero height adapts via clamp(). Touch targets minimum 44px."
  - name: "Type Hierarchy"
    rule: "Poppins is ONLY for headings and prices — never for body text. Raleway is ONLY for body, descriptions, and UI text — never for headings. This separation creates clear visual hierarchy without extra decoration."

imagery:
  style: "Editorial travel photography. Warm tones, golden-hour lighting preferred. Architectural details, cultural moments, landscapes. Never stock-photo-generic. Always culturally respectful."
  heroImages: "Full-bleed, high-resolution (1920px min width). Each destination has a dedicated hero image."
  cardImages: "16:10 aspect ratio approximately. Object-cover fit. Zoom on hover (1.05 scale)."
  avatars: "No photos — use initial circles (bg-primary, white Poppins text) for testimonials."
  icons: "Stroke-based SVG icons, 1.5px stroke width, 24px or 32px viewBox. Placed inside navy circles for feature cards."

accessibility:
  contrast: "Navy on white passes WCAG AAA. Gold on white passes AA for large text only — never use gold for small body text. White on navy passes AAA."
  focusRing: "2px solid {colors.gold}, offset 2px"
  touchTargets: "Minimum 44px height for all interactive elements"
  motionPreference: "Respect prefers-reduced-motion: disable carousel autoplay, remove hover transforms"
  ariaLabels: "All icon buttons must have aria-label. Carousel controls labeled. Social links labeled."

responsive-breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  note: "Default Tailwind breakpoints. Primary layout shift at lg (1024px) — navbar collapses, grids reduce columns. Cards go full-width at sm."

anti-patterns:
  - "Never use gradients on buttons — solid colors only."
  - "Never use colored backgrounds for input fields."
  - "Never use more than 2 font weights on a single card."
  - "Never use gold text on dark backgrounds smaller than 16px."
  - "Never center-align body text longer than 3 lines — use left-align."
  - "Never use opacity below 0.3 for readable text."
  - "Never use box shadows with color tint — always neutral rgba(0,0,0,x)."
  - "Never mix rounded-lg and rounded-2xl on sibling elements — pick one radius per component group."
  - "Never use italic except for the hero tagline."
  - "Never stack more than 3 CTA buttons in a single viewport."
---
