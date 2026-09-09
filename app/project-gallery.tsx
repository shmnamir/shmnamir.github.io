"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type Text = { en: string; fa: string };
type Group = "academic" | "innovation" | "teaching" | "practice";
type Project = { number: string; group: Group; title: Text; category: Text; year: string; description: Text; tags: string[]; image: string; alt: Text };
const text = (en: string, fa: string): Text => ({ en, fa });
const toyProjects: Project[] = [
  { number: "04.1", group: "innovation", title: text("Panto", "پنتو"), category: text("Scientific Toys · Deployable Structures", "اسباب‌بازی‌های علمی · سازه‌های بازشونده"), year: "—", description: text("Pin-connected modular components introduce scissor mechanisms and deployable structures. Panto and Panto Plus offer basic and advanced assemblies, from cross vaults to spherical frameworks.", "قطعات مدولار با اتصال پینی، سازوکارهای قیچی‌سان و سازه‌های بازشونده را معرفی می‌کنند. پنتو و پنتو پلاس، مونتاژهای مقدماتی و پیشرفته را از طاق‌های متقاطع تا قاب‌های کروی فراهم می‌کنند."), tags: ["Scissor Mechanisms", "Pin Connections", "Deployable Structures"], image: "/projects/panto.webp", alt: text("Panto Plus purple and yellow deployable toy prototype", "نمونه اسباب‌بازی بازشونده پنتو پلاس با قطعات بنفش و زرد") },
  { number: "04.2", group: "innovation", title: text("Recip", "رسیپ"), category: text("Scientific Toys · Reciprocal Structures", "اسباب‌بازی‌های علمی · سازه‌های متقابل"), year: "—", description: text("An educational construction kit exploring reciprocal-frame structures. Repeated components form varied geometric patterns, supported by an illustrated assembly guide.", "کیت ساخت آموزشی برای تجربه سازه‌های قاب متقابل؛ قطعات تکرارشونده با کمک راهنمای مصور مونتاژ، الگوهای هندسی متنوعی ایجاد می‌کنند."), tags: ["Reciprocal Frames", "Modular Assembly", "Structural Learning"], image: "/projects/scientific-toys.webp", alt: text("Recip reciprocal-frame toy tower prototype", "نمونه برج ساخته‌شده با قطعات قاب متقابل رسیپ") },
  { number: "04.3", group: "innovation", title: text("Tensi", "تنسی"), category: text("Scientific Toys · Tensegrity", "اسباب‌بازی‌های علمی · تنسگریتی"), year: "—", description: text("A hands-on tensegrity toy using six rigid elements and six rubber bands to build a lightweight sphere and explore the balance between tension and compression.", "اسباب‌بازی تعاملی بر پایه تنسگریتی؛ شش عضو صلب و شش کش لاستیکی، کره‌ای سبک می‌سازند و تعادل میان نیروهای کششی و فشاری را قابل تجربه می‌کنند."), tags: ["Tensegrity", "Tension & Compression", "Hands-on Learning"], image: "/projects/tensi.webp", alt: text("Tensi toy with green rigid elements and yellow rubber bands held in a hand", "اسباب‌بازی تنسی با اعضای صلب سبز و کش‌های زرد در دست") },
];
const additions: Project[] = [
  { number: "08", group: "academic", title: text("AB ANBAR / Cistern", "آب‌انبار"), category: text("Public Space · Concept Design", "فضای عمومی · طراحی مفهومی"), year: "2017", description: text("A public-space proposal along the Aji Chay river in Tabriz. A low central cistern and a sequence of cubic spaces use water, sound and spatial perception to shape the visitor’s experience.", "پیشنهاد فضای عمومی در امتداد آجی‌چای تبریز؛ آب‌انبار مرکزی و توالی فضاهای مکعبی با آب، صدا و ادراک فضایی تجربه بازدیدکننده را شکل می‌دهند."), tags: ["Urban Space", "Water", "Spatial Perception"], image: "/projects/ab-anbar.webp", alt: text("AB ANBAR architectural concept render", "رندر طرح مفهومی آب‌انبار") },
  { number: "09", group: "teaching", title: text("Reciprocal Frame Structures", "سازه‌های قاب متقابل"), category: text("Design-Build Workshop", "کارگاه طراحی و ساخت"), year: "2017", description: text("A workshop at the University of Tabriz, moving from reciprocal-frame principles and scale models to the collective assembly of a full-scale dome.", "کارگاهی در دانشگاه تبریز؛ از اصول قاب متقابل و مدل‌های کوچک تا مونتاژ جمعی گنبد در مقیاس واقعی."), tags: ["Reciprocal Frames", "Scale Models", "Assembly"], image: "/projects/reciprocal.webp", alt: text("Reciprocal frame workshop documentation", "مستندات کارگاه قاب متقابل") },
  { number: "10", group: "teaching", title: text("Rotegrity", "روتگریتی"), category: text("Collaborative Structural Workshop", "کارگاه مشارکتی سازه"), year: "—", description: text("A 4.5-metre dome developed from an icosahedral sphere. Sixty identical units translate geometric analysis into a full-scale collaborative structure at Shahid Beheshti University, Tehran.", "گنبدی به قطر ۴٫۵ متر بر پایه کره بیست‌وجهی؛ شصت واحد یکسان تحلیل هندسی را به سازه‌ای مشارکتی در مقیاس واقعی در دانشگاه شهید بهشتی تهران تبدیل می‌کنند."), tags: ["Geometry", "Modular Assembly", "Full-scale Dome"], image: "/projects/rotegrity.webp", alt: text("Rotegrity dome workshop photograph", "عکس گنبد کارگاه روتگریتی") },
];
const dimensions: Record<string, [number, number]> = { "01":[1079,1500], "02":[1500,875], "03":[798,1201], "04":[639,1080], "05":[928,585], "06":[811,1081], "07":[374,280], "08":[1950,1092], "09":[944,630], "10":[1031,1097] };
const evidence: Record<string, { role: Text; credit: Text; pages: number[]; kind: Text }> = {
  "04.1": { role: text("Structural toy design and development", "طراحی و توسعه اسباب‌بازی سازه‌ای"), credit: text("Panto and Panto Plus. Original portfolio page 30 documents components, pin connections and assembled prototypes. Individual project year is not specified.", "پنتو و پنتو پلاس. صفحه ۳۰ پورتفولیو، قطعات، اتصالات پینی و نمونه‌های مونتاژشده را مستند می‌کند. سال مستقل پروژه مشخص نشده است."), pages: [30], kind: text("Original prototype photograph", "عکس اصلی نمونه ساخته‌شده") },
  "04.2": { role: text("Structural toy design and development", "طراحی و توسعه اسباب‌بازی سازه‌ای"), credit: text("Recip. Third place in the wooden toys section of the fifth National Toy Festival. Original portfolio page 29 documents the kit, geometric patterns and prototypes. Individual project year is not specified.", "رسیپ؛ مقام سوم بخش اسباب‌بازی‌های چوبی در پنجمین جشنواره ملی اسباب‌بازی. صفحه ۲۹ پورتفولیو شامل کیت، الگوهای هندسی و نمونه‌ها است. سال مستقل پروژه مشخص نشده است."), pages: [29], kind: text("Original prototype photograph", "عکس اصلی نمونه ساخته‌شده") },
  "04.3": { role: text("Structural toy design and development", "طراحی و توسعه اسباب‌بازی سازه‌ای"), credit: text("Tensi. Original portfolio page 31 documents the six rigid elements, six rubber bands, packaging, instructions and hands-on demonstrations. Individual project year is not specified.", "تنسی. صفحه ۳۱ پورتفولیو، شش عضو صلب، شش کش لاستیکی، بسته‌بندی، راهنما و شیوه کار با محصول را مستند می‌کند. سال مستقل پروژه مشخص نشده است."), pages: [31], kind: text("Original prototype photograph", "عکس اصلی نمونه ساخته‌شده") },
  "01": { role: text("M.Arch thesis researcher and designer", "پژوهشگر و طراح پایان‌نامه کارشناسی ارشد"), credit: text("Thesis, 2019. Concept, module studies and interaction scenarios are documented in the portfolio.", "پایان‌نامه، ۲۰۱۹. کانسپت، مطالعه مدول‌ها و سناریوهای تعامل در پورتفولیو مستند شده‌اند."), pages: [14,15], kind: text("Original project render", "رندر اصلی پروژه") },
  "02": { role: text("Collaborative design and interactive prototyping", "طراحی مشارکتی و نمونه‌سازی تعاملی"), credit: text("Amir Shamani and Atefeh Ebadi. Presented at Patternitecture (2021) and SCULPT (2023).", "امیر شامانی و عاطفه عبادی. ارائه در پترنیتکچر (۲۰۲۱) و اسکالپت (۲۰۲۳)."), pages: [6,7,8], kind: text("Installation photograph", "عکس اینستالیشن") },
  "03": { role: text("Deployable-structure design and prototyping", "طراحی و نمونه‌سازی سازه بازشونده"), credit: text("Radial canopy study, from structural modelling to full-scale fabrication and deployment trials.", "مطالعه سایبان شعاعی؛ از مدل‌سازی سازه تا ساخت در مقیاس واقعی و آزمون بازشدن."), pages: [10,11,12], kind: text("Prototype photograph", "عکس نمونه ساخته‌شده") },
  "04": { role: text("Structural toy design and development", "طراحی و توسعه اسباب‌بازی سازه‌ای"), credit: text("Three product studies: Recip, Panto and Tensi. Original plates document their mechanisms, assembly and prototypes.", "سه مطالعه محصول: رسیپ، پانتو و تنسی. صفحات اصلی، مکانیزم، مونتاژ و نمونه‌ها را مستند می‌کنند."), pages: [29,30,31], kind: text("Prototype photograph", "عکس نمونه ساخته‌شده") },
  "05": { role: text("Coordinator, instructor and workshop manager across the series", "هماهنگ‌کننده، مدرس و مدیر در مجموعه کارگاه‌ها"), credit: text("Workshops in Tabriz, Mashhad, Ardabil and Tehran, 2016–18. Responsibilities vary by workshop; the portfolio documents prototyping and collective fabrication.", "کارگاه‌ها در تبریز، مشهد، اردبیل و تهران، ۲۰۱۶–۲۰۱۸. مسئولیت‌ها در هر کارگاه متفاوت است؛ پورتفولیو نمونه‌سازی و ساخت جمعی را مستند می‌کند."), pages: [34,35,36], kind: text("Workshop photograph", "عکس کارگاه") },
  "06": { role: text("Site Engineer · Project Coordinator", "مهندس کارگاه · هماهنگ‌کننده پروژه"), credit: text("Darrous, Tehran, 2020–24. Drawings and construction photographs document the site work.", "دروس، تهران، ۲۰۲۰–۲۰۲۴. نقشه‌ها و عکس‌های ساخت، فعالیت کارگاهی را مستند می‌کنند."), pages: [21,22], kind: text("Original black-and-white photograph", "عکس اصلی سیاه‌وسفید") },
  "07": { role: text("Architect · Renovation Supervisor", "معمار · ناظر بازسازی"), credit: text("114 m² renovation on Yarmohammadi Street, Darrous, Tehran, 2024. Original plates show interiors and before/after comparisons.", "بازسازی ۱۱۴ مترمربع در خیابان یارمحمدی، دروس، تهران، ۲۰۲۴. صفحات اصلی شامل فضاهای داخلی و مقایسه پیش و پس از بازسازی هستند."), pages: [24,25,26], kind: text("Interior photograph", "عکس فضای داخلی") },
  "08": { role: text("Member of the architectural design team", "عضو تیم طراحی معماری"), credit: text("Amir Shamani, Shaghayegh Honarvar, Zohre Alinejad and Samira Asadmosaffar. Winning proposal in the symposium workshop led by Tayyibe Nur Çağlar and Adnan Aksu; conceptual, not a completed building.", "امیر شامانی، شقایق هنرور، زهره علی‌نژاد و سمیرا اسدمظفر. طرح برگزیده کارگاه سمپوزیوم با هدایت طیبه نور چاغلار و عدنان آکسو؛ طرح مفهومی و اجرا نشده."), pages: [17,18], kind: text("Conceptual architectural render", "رندر معماری مفهومی") },
  "09": { role: text("Workshop Coordinator", "هماهنگ‌کننده کارگاه"), credit: text("University of Tabriz, 26–28 February 2017. Collaborative modelling and full-scale dome assembly.", "دانشگاه تبریز، ۲۶ تا ۲۸ فوریه ۲۰۱۷. مدل‌سازی مشارکتی و مونتاژ گنبد در مقیاس واقعی."), pages: [38,39], kind: text("Workshop photograph", "عکس کارگاه") },
  "10": { role: text("Individual role not specified in the supplied portfolio", "نقش فردی در پورتفولیوی ارائه‌شده مشخص نشده است"), credit: text("Workshop with Dr Yaser Shabazi and Mohammad Karim Touri at the International Congress of Civil Engineering, Architecture and Urban Development. Year not specified in the supplied portfolio.", "کارگاه با دکتر یاسر شهبازی و محمد کریم توری در کنگره بین‌المللی عمران، معماری و توسعه شهری. سال در پورتفولیوی ارائه‌شده مشخص نشده است."), pages: [41], kind: text("Workshop photograph", "عکس کارگاه") },
};

function ProjectCard({ project: p, firstNew }: { project: Project; firstNew: boolean }) {
  const [preview, setPreview] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const photoRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    if (photoRef.current?.complete && photoRef.current.naturalWidth > 0) setLoaded(true);
  }, [p.image]);
  const opener = useRef<HTMLButtonElement | null>(null);
  const detail = evidence[p.number];
  const [width,height] = dimensions[p.number] ?? ({ "04.1":[670,553], "04.2":[639,1080], "04.3":[675,599] } as Record<string, [number,number]>)[p.number];
  const outline = p.image.replace(/\.(webp|png)$/, "-outline.webp");
  const openProject = (button: HTMLButtonElement) => { opener.current = button; setOpen(true); };
  return <article className="gallery-card" id={`project-${p.number}`} data-first-new={firstNew || undefined}>
    <button type="button" className={`gallery-image ${loaded ? "photo-ready" : ""} ${preview ? "preview-on" : ""}`} aria-label={`Open project: ${p.title.en}`} onClick={e => openProject(e.currentTarget)}>
      <img className="outline-layer" src={outline} alt="" width={width} height={height} loading="lazy" />
      <img ref={photoRef} className="photo-layer" src={p.image} alt={p.alt.en} width={width} height={height} loading="eager" decoding="async" onLoad={() => setLoaded(true)} />
      <span className="gallery-number" aria-hidden="true">{p.number}</span>
    </button>
    <div className="gallery-caption"><span>{p.category.en}</span><bdi>{p.year}</bdi></div>
    <h3><button type="button" onClick={e => openProject(e.currentTarget)} onFocus={() => setPreview(true)} onBlur={() => setPreview(false)}>{p.title.en}</button></h3>
    <p>{p.description.en}</p>
    <button type="button" className="preview-toggle" aria-pressed={preview} onClick={() => setPreview(v => !v)}>{preview ? "Show outline" : "Preview"}</button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="project-dialog" dir="ltr" showCloseButton={false} onCloseAutoFocus={e => { e.preventDefault(); opener.current?.focus({ preventScroll: true }); }}>
        <DialogClose className="detail-close">Close ×</DialogClose>
        <header><p className="detail-eyebrow">{p.category.en} · <bdi>{p.year}</bdi></p><DialogTitle>{p.title.en}</DialogTitle><DialogDescription>{p.description.en}</DialogDescription></header>
        <figure className="detail-cover"><img src={p.image} alt={p.alt.en} width={width} height={height} /><figcaption>{detail.kind.en}</figcaption></figure>
        <dl className="detail-facts"><div><dt>Role</dt><dd>{detail.role.en}</dd></div><div><dt>Tools & methods</dt><dd>{p.tags.map(tag => <bdi key={tag}>{tag}</bdi>)}</dd></div><div><dt>Documentation & credits</dt><dd>{detail.credit.en}</dd></div></dl>
        <h3>Process & original documentation</h3>
        {detail.pages.map(page => <figure className="evidence-plate" key={page}><a href={`/projects/source/page-${page}.jpg`} target="_blank" rel="noreferrer" aria-label={`Open full-size portfolio page ${page}`}><img src={`/projects/source/page-${page}.jpg`} alt={`${p.title.en} — original documentation, page ${page}`} width="1512" height="1134" loading="lazy" /></a><figcaption>Original portfolio plate {page} · Project drawings, imagery and original annotations</figcaption></figure>)}
      </DialogContent>
    </Dialog>
  </article>;
}

export function ProjectGallery({ projects, groups, labels, notes }: { projects: Project[]; groups: {id: Group; figure: string}[]; labels: Record<Group,string>; notes: Record<Group,string> }) {
  const [expanded, setExpanded] = useState<Partial<Record<Group,boolean>>>({});
  const [announcement, setAnnouncement] = useState("");
  const all = [...projects.filter(p => p.number !== "04"), ...toyProjects, ...additions];
  function expand(id: Group, count: number) {
    setExpanded(v => ({...v, [id]:true}));
    setAnnouncement(`${count} more projects revealed in ${labels[id]}.`);
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLButtonElement>(`#${id} [data-first-new] .gallery-image`);
      target?.focus({preventScroll:true});
      const grid = document.getElementById(`grid-${id}`);
      if (target && grid && grid.scrollWidth > grid.clientWidth) {
        const card = target.getBoundingClientRect();
        const frame = grid.getBoundingClientRect();
        grid.scrollBy({ left: card.left - frame.left, behavior: "instant" });
      }
    });
  }
  return <section className="project-index" id="work"><p className="sr-only" role="status" aria-live="polite">{announcement}</p>{groups.map(group => {
    const items = all.filter(p => p.group === group.id);
    return <section className="project-group gallery-section" id={group.id} key={group.id}>
      <header className="project-group-header"><p>{group.figure} / {String(items.length).padStart(2,"0")}</p><h2>{labels[group.id]}</h2><span>{notes[group.id]}</span></header>
      <p className="gallery-scroll-hint" id={`scroll-hint-${group.id}`}>Swipe horizontally to explore projects.</p>
      <div className="gallery-grid" id={`grid-${group.id}`} role="region" aria-label={labels[group.id]} aria-describedby={`scroll-hint-${group.id}`} tabIndex={0}>{items.slice(0, expanded[group.id] ? items.length : 3).map((p,i) => <ProjectCard key={p.number} project={p} firstNew={i === 3} />)}</div>
      {items.length > 3 && !expanded[group.id] && <button type="button" className="show-more" aria-controls={`grid-${group.id}`} aria-expanded={false} onClick={() => expand(group.id, items.length-3)}>Show More <span>+{items.length-3}</span></button>}
    </section>;
  })}</section>;
}
