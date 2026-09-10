"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ProjectGallery } from "./project-gallery";
import { ContactForm } from "./contact-form";
import { LineArrow } from "./line-arrow";
import { YouTubeGallery } from "./youtube-gallery";
import { CVViewer } from "./cv-viewer";

type Language = "en" | "fa";
type GroupId = "academic" | "innovation" | "teaching" | "practice";

const projects = [
  {
    number: "01",
    group: "academic" as GroupId,
    title: { en: "Interactive Shading Skin", fa: "پوسته سایه‌انداز تعاملی" },
    category: { en: "M.Arch Thesis · Interactive Systems", fa: "پایان‌نامه معماری · سیستم‌های تعاملی" },
    year: "2019",
    description: {
      en: "A kinetic urban canopy combining parametric modules, embedded sensing and Arduino-driven actuation. A full-scale 3×3 prototype tested the system with real users.",
      fa: "سایبان شهری جنبشی متشکل از مدول‌های پارامتریک، حسگرهای محیطی و کنترل مبتنی بر آردوینو؛ عملکرد سیستم با پروتوتایپ یک‌به‌یک ۳×۳ و حضور کاربران واقعی آزمایش شد.",
    },
    tags: ["Grasshopper", "Arduino", "Kinect", "1:1 Prototype"],
    image: "/projects/interactive-shading.webp",
    alt: { en: "Interactive shading canopy render", fa: "رندر سایبان تعاملی" },
  },
  {
    number: "02",
    group: "academic" as GroupId,
    title: { en: "In Refuting Stillness", fa: "در رد سکون" },
    category: { en: "Kinetic Installation · Cultural Computation", fa: "اینستالیشن جنبشی · محاسبات فرهنگی" },
    year: "2021–23",
    description: {
      en: "Islamic geometric logic is reparameterized as an interactive surface. Leap Motion, Firefly and servo-driven modules turn historic pattern into live spatial behaviour.",
      fa: "منطق هندسه اسلامی به سطحی واکنش‌پذیر نسبت به حرکت دست بازتعریف شد؛ ترکیب Leap Motion، فایرفلای و مدول‌های سرووموتوری، الگوی تاریخی را به رفتار زنده فضایی تبدیل می‌کند.",
    },
    tags: ["Islamic Geometry", "Leap Motion", "Firefly", "Exhibition"],
    image: "/projects/refuting-stillness.webp",
    alt: { en: "Gesture-interactive kinetic installation", fa: "اینستالیشن جنبشی تعاملی با حرکت" },
  },
  {
    number: "03",
    group: "academic" as GroupId,
    title: { en: "NOVA Deployable Canopy", fa: "سایبان بازشونده نُوا" },
    category: { en: "Deployable Structure · Full-scale Fabrication", fa: "سازه بازشونده · ساخت یک‌به‌یک" },
    year: "2018",
    description: {
      en: "A radial scissor structure with rigid folding covers, simulated in Karamba3D and Galapagos before full-scale fabrication. Maximum displacement was reduced to 0.82 cm.",
      fa: "سازه قیچی‌سان شعاعی با پوشش‌های صلب تاشونده که پیش از ساخت یک‌به‌یک، با Karamba3D و Galapagos شبیه‌سازی و خیز آن تا ۰٫۸۲ سانتی‌متر کنترل شد.",
    },
    tags: ["Deployable", "Karamba3D", "Galapagos", "Fabrication"],
    image: "/projects/nova.webp",
    alt: { en: "NOVA deployable canopy prototype", fa: "پروتوتایپ سایبان بازشونده نُوا" },
  },
  {
    number: "04",
    group: "innovation" as GroupId,
    title: { en: "Scientific Toys", fa: "اسباب‌بازی‌های علمی" },
    category: { en: "Product Design · Structural Pedagogy", fa: "طراحی محصول · آموزش سازه" },
    year: "2018–23",
    description: {
      en: "Tensegrity, scissor-like and reciprocal-frame systems translated into hands-on educational objects, recognized across two national design festivals.",
      fa: "ترجمه منطق سازه‌های تنسگریتی، قیچی‌سان و قاب متقابل به محصولات آموزشی قابل مونتاژ؛ برگزیده در دو جشنواره ملی طراحی.",
    },
    tags: ["STEAM", "Tensegrity", "Reciprocal Frame", "Product Design"],
    image: "/projects/scientific-toys.webp",
    alt: { en: "Illuminated structural toy prototype", fa: "پروتوتایپ نورانی اسباب‌بازی سازه‌ای" },
  },
  {
    number: "05",
    group: "teaching" as GroupId,
    title: { en: "Scissor-Like Structures", fa: "سازه‌های قیچی‌سان" },
    category: { en: "Teaching · Full-scale Fabrication", fa: "آموزش · ساخت در مقیاس واقعی" },
    year: "2016–18",
    description: {
      en: "An intensive workshop series across five Iranian universities, moving from Grasshopper logic and interactive prototyping to CNC fabrication and full-scale assembly.",
      fa: "مجموعه‌ای از کارگاه‌های فشرده در پنج دانشگاه ایران؛ از منطق پارامتریک و پروتوتایپ تعاملی تا ساخت CNC و مونتاژ سازه در مقیاس واقعی.",
    },
    tags: ["Workshop Leadership", "CNC", "Rotegrity", "1:1 Assembly"],
    image: "/projects/workshops.webp",
    alt: { en: "Full-scale design-build workshop", fa: "کارگاه طراحی و ساخت در مقیاس واقعی" },
  },
  {
    number: "06",
    group: "practice" as GroupId,
    title: { en: "Shadlou Residential Complex", fa: "مجتمع مسکونی شادلو" },
    category: { en: "Professional Practice · Construction", fa: "فعالیت حرفه‌ای · اجرا" },
    year: "2020–24",
    description: {
      en: "Site engineering and project coordination for a 12-storey, 24-unit concrete residential building, connecting drawings, sequencing and material decisions on site.",
      fa: "مهندسی کارگاه و هماهنگی پروژه یک ساختمان مسکونی بتنی ۱۲ طبقه و ۲۴ واحدی؛ پیوند میان نقشه‌ها، توالی اجرا و تصمیم‌های متریال در کارگاه.",
    },
    tags: ["Site Engineering", "Coordination", "Concrete", "Residential"],
    image: "/projects/shadlou.webp",
    alt: { en: "Shadlou residential complex", fa: "مجتمع مسکونی شادلو" },
  },
  {
    number: "07",
    group: "practice" as GroupId,
    title: { en: "Karimi House Renovation", fa: "بازسازی خانه کریمی" },
    category: { en: "Interior Architecture · Project Management", fa: "معماری داخلی · مدیریت پروژه" },
    year: "2024",
    description: {
      en: "A residential renovation developed from measured survey through detailed design and implementation, with a restrained material palette and construction-led coordination.",
      fa: "بازسازی یک واحد مسکونی از برداشت وضع موجود تا طراحی جزئیات و اجرا؛ با پالت متریال کنترل‌شده و هماهنگی مبتنی بر واقعیت ساخت.",
    },
    tags: ["Interior Design", "Detailing", "Site Management", "Renovation"],
    image: "/projects/karimi-house.webp",
    alt: { en: "Karimi House renovated interior", fa: "فضای داخلی بازسازی‌شده خانه کریمی" },
  },
];

const sectionArt = {
  research: "/images/brand/research-making-implementation.svg",
  making: "/images/brand/interaction-loop.svg",
  practice: "/images/sections/practice-minimal.webp",
  fieldAcademic: "/images/brand/01-academic-explorations.svg",
  fieldInnovation: "/images/brand/03-product-explorations.svg",
  fieldTeaching: "/images/brand/04-design-build-workshops.svg",
  fieldPractice: "/images/brand/02-professional-practice.svg",
};

const groups: Array<{ id: GroupId; image: string; figure: string; source: Record<Language, string> }> = [
  { id: "academic", image: sectionArt.fieldAcademic, figure: "A-01", source: { en: "Interactive Shading / In Refuting Stillness", fa: "پوسته سایه‌انداز تعاملی / در رد سکون" } },
  { id: "innovation", image: sectionArt.fieldInnovation, figure: "I-02", source: { en: "Scientific Toys / Recip · Panto · Tensi", fa: "اسباب‌بازی‌های علمی / رسیپ · پانتو · تنسی" } },
  { id: "teaching", image: sectionArt.fieldTeaching, figure: "T-03", source: { en: "Parametric Design / Design-Build Workshops", fa: "طراحی پارامتریک / کارگاه‌های طراحی و ساخت" } },
  { id: "practice", image: sectionArt.fieldPractice, figure: "P-04", source: { en: "Shadlou / Karimi House", fa: "مجتمع شادلو / خانه کریمی" } },
];

const copy = {
  en: {
    nav: [["Home", "#top"], ["About / CV", "#profile"], ["Work / Projects", "#categories"], ["Videos", "#videos"], ["Contact", "#contact"]],
    heroKicker: "Architectural systems / Research · Making · Implementation",
    heroHardwareAlt: "Minimal interactive architecture schematic connecting an Arduino, camera and actuator to machine-learning logic and an interactive contour field.",
    name: "AMIR SHAMANI",
    roles: ["Architectural Technologist", "Head of R&D · Computational Designer", "Interactive & Kinetic Architecture"],
    enter: "Explore the system",
    categoryIntro: "Four fields of work",
    categoryNote: "A practice moving from research and computation to prototyping, construction and shared knowledge.",
    illustrationNote: "Research · Invention · Shared knowledge · Built practice",
    profileArtCaption: "Method / Research → Making → Implementation",
    contactArtCaption: "Interaction / Input → Logic → Response → Feedback",
    profileArtAlt: "Three connected outline frames diagram the progression from research through making to implementation.",
    contactArtAlt: "Four connected nodes diagram input, logic, response and feedback as a closed interaction loop.",
    categories: {
      academic: "Academic Design",
      innovation: "Innovative Projects",
      teaching: "Teaching Workshops",
      practice: "Architecture in Practice",
    },
    groupNotes: {
      academic: "Interactive systems and urban strategies shaped by research and computation.",
      innovation: "Kinetic structures and products developed through prototyping and testing.",
      teaching: "Knowledge translated into full-scale collaborative making.",
      practice: "Construction-aware design grounded in professional implementation.",
    },
    profileLabel: "About / 2026",
    profileTitle: "Where structural logic becomes interactive behaviour.",
    profileBody: "With a foundation in civil engineering and an M.Arch in Architectural Technology, I work across computational design, interactive systems, physical prototyping and on-site implementation. My focus is architecture that remains technically legible from research and concept through fabrication and construction.",
    current: "Current",
    currentValue: "Head of Research & Development · SONG Architects, Tehran / Teaching Assistant · Faculty of Fine Arts, University of Tehran",
    education: "Education",
    educationValue: "M.Arch Architectural Technology · B.Sc. Civil Engineering",
    research: "Research",
    researchValue: "ICETAD 2019 publication · Interactive architecture book in progress",
    recognition: "Recognition",
    recognitionValue: "NOVA patent · National awards in structural toy design",
    cv: "CV",
    contactTitle: "Start a conversation.",
    contactBody: "Available for research collaborations, computational design roles and selected architectural commissions.",
    email: "Email",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    footer: "Amir Shamani · Architecture × Technology × Buildable Systems",
  },
  fa: {
    nav: [["خانه", "#top"], ["درباره من / رزومه", "#profile"], ["پروژه‌ها", "#categories"], ["ارتباط", "#contact"]],
    heroKicker: "سیستم‌های معماری / پژوهش · ساخت · اجرا",
    heroHardwareAlt: "شماتیک مینیمال معماری تعاملی؛ اتصال آردوینو، دوربین و محرک به منطق ماشین لرنینگ و میدان کانتور تعاملی.",
    name: "امیر شامانی",
    roles: ["تکنولوژیست معماری", "مدیر تحقیق و توسعه · طراح محاسباتی", "معماری تعاملی و جنبشی"],
    enter: "ورود به سیستم پروژه‌ها",
    categoryIntro: "چهار حوزه فعالیت",
    categoryNote: "حرکت از پژوهش و محاسبات به نمونه‌سازی، ساخت و انتقال دانش.",
    illustrationNote: "پژوهش · نوآوری · انتقال دانش · تجربه ساخت",
    profileArtCaption: "روش / پژوهش، نمونه‌سازی و اجرا",
    contactArtCaption: "تعامل / ورودی، منطق، پاسخ و بازخورد",
    profileArtAlt: "سه قاب خطی متصل، مسیر پژوهش تا نمونه‌سازی و اجرا را نشان می‌دهند.",
    contactArtAlt: "چهار گره متصل، چرخه ورودی، منطق، پاسخ و بازخورد را نشان می‌دهند.",
    categories: {
      academic: "طراحی آکادمیک",
      innovation: "پروژه‌های نوآورانه",
      teaching: "کارگاه‌های آموزشی",
      practice: "معماری در عمل",
    },
    groupNotes: {
      academic: "سیستم‌های تعاملی و راهبردهای شهری شکل‌گرفته از پژوهش و محاسبات.",
      innovation: "سازه‌ها و محصولات جنبشی توسعه‌یافته از مسیر نمونه‌سازی و آزمون.",
      teaching: "تبدیل دانش به تجربه جمعی طراحی و ساخت در مقیاس واقعی.",
      practice: "طراحی ساخت‌آگاه و متکی بر تجربه اجرای حرفه‌ای.",
    },
    profileLabel: "درباره من / ۲۰۲۶",
    profileTitle: "جایی که منطق سازه به رفتار تعاملی تبدیل می‌شود.",
    profileBody: "با پیش‌زمینه مهندسی عمران و کارشناسی ارشد تکنولوژی معماری، میان طراحی محاسباتی، سیستم‌های تعاملی، نمونه‌سازی فیزیکی و اجرای کارگاهی فعالیت می‌کنم. تمرکز من بر معماری‌ای است که از پژوهش و کانسپت تا ساخت و اجرا، منطق فنی خوانایی داشته باشد.",
    current: "موقعیت فعلی",
    currentValue: "مدیر تحقیق و توسعه · SONG Architects، تهران",
    education: "تحصیلات",
    educationValue: "کارشناسی ارشد تکنولوژی معماری · کارشناسی مهندسی عمران",
    research: "پژوهش",
    researchValue: "مقاله ICETAD 2019 · کتاب معماری تعاملی در دست انتشار",
    recognition: "افتخارات",
    recognitionValue: "ثبت اختراع NOVA · جوایز ملی طراحی اسباب‌بازی‌های سازه‌ای",
    cv: "دریافت رزومه",
    contactTitle: "گفت‌وگو را آغاز کنیم.",
    contactBody: "آماده همکاری پژوهشی، موقعیت‌های طراحی محاسباتی و پروژه‌های منتخب معماری هستم.",
    email: "ایمیل",
    linkedin: "لینکدین",
    instagram: "اینستاگرام",
    footer: "امیر شامانی · معماری × فناوری × سیستم‌های ساخت‌پذیر",
  },
};

const codeBackdrops = {
  categories: `SELECTED_WORKS = {\n  research: computational_design,\n  making: physical_prototyping,\n  teaching: shared_knowledge,\n  practice: construction_aware\n}`,
  academic: `research = [\n  "Computational Design Logic",\n  "Human-Centered Interaction",\n  "Environmental Responsiveness"\n]`,
  innovation: `making = [\n  "Kinetic Mechanisms",\n  "Material Testing",\n  "Full-Scale Prototyping"\n]`,
  teaching: `knowledge = [\n  "Observe", "Model", "Fabricate",\n  "Assemble", "Evaluate"\n]`,
  practice: `implementation = [\n  "Constructible Systems",\n  "Design-Build Workflow",\n  "Construction-Aware Design"\n]`,
  profile: `AMIR_SHAMANI = ARCHITECTURAL_SYSTEM(\n  research, making, implementation\n)\n\nengine = "Rhino + Grasshopper"`,
};

function CodeBackdrop({ children }: { children: string }) {
  return <div className="code-backdrop" aria-hidden="true">{children}</div>;
}

function EdgeLabel({ children }: { children: string }) {
  return <span className="edge-label" aria-hidden="true">{children}</span>;
}

export default function Home() {
  const t = copy.en;

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const protectImages = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("img, picture")) {
        event.preventDefault();
      }
    };

    const preventImageDrag = (event: DragEvent) => {
      if (event.target instanceof Element && event.target.closest("img, picture")) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", protectImages);
    document.addEventListener("dragstart", preventImageDrag);
    return () => {
      document.removeEventListener("contextmenu", protectImages);
      document.removeEventListener("dragstart", preventImageDrag);
    };
  }, []);

  return (
    <main className="portfolio" dir="ltr">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Amir Shamani, home">AMIR SHAMANI</a>
        <nav className="main-nav" aria-label="Main navigation">
          {t.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
      </header>

      <section className="system-hero" id="top">
        <p className="system-kicker">{t.heroKicker}</p>
        <figure className="hero-visual">
          <Image
            src="/images/homepage-interactive-system-wide-connected-clean.png"
            alt={t.heroHardwareAlt}
            fill
            priority
            unoptimized
            sizes="100vw"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </figure>
        <div className="axis axis-x" aria-hidden="true" /><div className="axis axis-y" aria-hidden="true" />
        <span className="hero-system-note" aria-hidden="true">SYSTEM / 01 — INPUT → LOGIC → RESPONSE</span>
        <article className="identity-card">
          <p className="card-index">A.S / 01</p>
          <h1>{t.name}</h1>
          <ul>{t.roles.map((role) => <li key={role}>[ {role} ]</li>)}</ul>
          <a href="#categories">{t.enter}<span aria-hidden="true">↓</span></a>
        </article>
      </section>

      <section className="category-section" id="categories">
        <CodeBackdrop>{codeBackdrops.categories}</CodeBackdrop>
        <EdgeLabel>Selected Work</EdgeLabel>
        <header className="category-header" data-reveal>
          <p>INDEX / 01—04</p><h2>{t.categoryIntro}</h2><span>{t.categoryNote}</span>
        </header>
        <div className="category-grid">
          {groups.map((group, index) => (
            <a className={`category-panel category-panel-${index + 1}`} href={`#${group.id}`} key={group.id} data-reveal>
              <p>{group.figure}</p>
              <span className="category-art" aria-hidden="true">
                <Image src={group.image} alt="" fill unoptimized sizes="(max-width: 700px) 78vw, 25vw" />
              </span>
              <h3>{t.categories[group.id]}</h3>
              <span className="category-source">{group.source.en}</span>
              <span className="category-arrow" aria-hidden="true"><LineArrow direction="down-right" /></span>
            </a>
          ))}
        </div>
        <p className="illustration-note">{t.illustrationNote}</p>
      </section>

      <ProjectGallery projects={projects} groups={groups} labels={t.categories} notes={t.groupNotes} />

      <section className="profile-section" id="profile">
        <CodeBackdrop>{codeBackdrops.profile}</CodeBackdrop>
        <EdgeLabel>About / CV</EdgeLabel>
        <div className="profile-visual" data-reveal>
          <p className="profile-label">{t.profileLabel}</p>
          <figure className="profile-art">
            <div><Image src={sectionArt.research} alt={t.profileArtAlt} fill unoptimized sizes="(max-width: 700px) 100vw, 24vw" /></div>
            <figcaption>{t.profileArtCaption}</figcaption>
          </figure>
        </div>
        <div className="profile-main" data-reveal><h2>{t.profileTitle}</h2><p>{t.profileBody}</p><CVViewer /></div>
        <dl className="profile-facts" data-reveal>
          <div><dt>{t.current}</dt><dd>{t.currentValue}</dd></div>
          <div><dt>{t.education}</dt><dd>{t.educationValue}</dd></div>
          <div><dt>{t.research}</dt><dd>{t.researchValue}</dd></div>
          <div><dt>{t.recognition}</dt><dd>{t.recognitionValue}</dd></div>
        </dl>
      </section>

      <section className="video-section" id="videos">
        <CodeBackdrop>{`moving_image = sequence(\n  prototype, process, interaction\n)`}</CodeBackdrop>
        <header className="video-header" data-reveal>
          <p>MEDIA / 01—10</p>
          <h2>Videos</h2>
          <span>Selected work on YouTube, presented in its original sequence.</span>
        </header>
        <YouTubeGallery />
      </section>

      <section className="contact-section" id="contact">
        <CodeBackdrop>{`output = collaboration(\n  research, design, fabrication\n)`}</CodeBackdrop>
        <EdgeLabel>Contact</EdgeLabel>
        <div className="contact-intro" data-reveal>
          <div className="contact-copy"><p>CONTACT / OUTPUT</p><h2>{t.contactTitle}</h2><span>{t.contactBody}</span></div>
          <figure className="contact-art">
            <Image src={sectionArt.making} alt={t.contactArtAlt} fill unoptimized sizes="(max-width: 700px) 100vw, 35vw" />
            <figcaption>{t.contactArtCaption}</figcaption>
          </figure>
        </div>
        <ContactForm />
        <div className="contact-links" data-reveal>
          <a href="https://www.linkedin.com/in/AmirShamani" target="_blank" rel="noreferrer">{t.linkedin}<LineArrow /></a>
          <a href="https://www.instagram.com/Senstudio.tech" target="_blank" rel="noreferrer">{t.instagram}<LineArrow /></a>
        </div>
      </section>

      <footer>
        <p>{t.footer}</p>
        <p>Amir Shamani. All rights reserved.</p>
      </footer>
    </main>
  );
}
