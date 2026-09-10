import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "امیر شامانی | تکنولوژیست معماری و طراح محاسباتی",
  description:
    "پروفایل حرفه‌ای امیر شامانی، تکنولوژیست معماری و طراح محاسباتی متخصص در معماری تعاملی، معماری جنبشی، طراحی پارامتریک و ساخت دیجیتال.",
  keywords: [
    "امیر شامانی",
    "تکنولوژیست معماری",
    "طراح محاسباتی",
    "معماری تعاملی",
    "معماری جنبشی",
    "طراحی پارامتریک",
    "گراس‌هاپر",
    "راینو",
    "ساخت دیجیتال",
  ],
  alternates: {
    canonical: "/fa/",
    languages: { "fa-IR": "/fa/", "en-US": "/" },
  },
  openGraph: {
    type: "profile",
    url: "https://www.amirshamani.com/fa/",
    locale: "fa_IR",
    title: "امیر شامانی | تکنولوژیست معماری و طراح محاسباتی",
    description:
      "معماری تعاملی، طراحی محاسباتی، سیستم‌های جنبشی، طراحی پارامتریک و ساخت دیجیتال.",
  },
};

export default function PersianProfilePage() {
  return (
    <main className="fa-profile-page" lang="fa" dir="rtl">
      <header className="fa-profile-header">
        <a href="/" lang="en" dir="ltr">AMIR SHAMANI</a>
        <span>پروفایل حرفه‌ای / فارسی</span>
      </header>

      <article className="fa-profile-content">
        <p className="fa-profile-index">ARCHITECTURE × TECHNOLOGY × BUILDABLE SYSTEMS</p>
        <h1>امیر شامانی</h1>
        <p className="fa-profile-lead">
          تکنولوژیست معماری، طراح محاسباتی و پژوهشگر معماری تعاملی
        </p>

        <section>
          <h2>درباره امیر شامانی</h2>
          <p>
            امیر شامانی در زمینه پیوند معماری، فناوری و سیستم‌های قابل‌ساخت فعالیت می‌کند.
            تمرکز حرفه‌ای او بر طراحی محاسباتی، معماری تعاملی، سیستم‌های جنبشی، نمونه‌سازی
            فیزیکی و توسعه راهکارهایی است که از پژوهش و کانسپت تا ساخت و اجرا منطق فنی روشنی دارند.
          </p>
        </section>

        <section>
          <h2>تخصص‌ها</h2>
          <ul>
            <li>معماری تعاملی و سیستم‌های معماری جنبشی</li>
            <li>طراحی محاسباتی و طراحی پارامتریک</li>
            <li>راینو، گرس‌هاپر و توسعه فرایندهای طراحی با پایتون</li>
            <li>ساخت دیجیتال، نمونه‌سازی فیزیکی و سیستم‌های قابل‌ساخت</li>
            <li>آردوینو، حسگرها و عملگرها در معماری تعاملی</li>
            <li>بهینه‌سازی محیطی، سایه‌اندازی هوشمند و طراحی اقلیمی</li>
          </ul>
        </section>

        <section>
          <h2>سوابق حرفه‌ای و دانشگاهی</h2>
          <p>
            مدیر تحقیق و توسعه در دفتر معماری SONG Architects در تهران و دستیار آموزشی
            دانشکده هنرهای زیبای دانشگاه تهران. زمینه‌های پژوهشی و اجرایی او شامل سامانه‌های
            سایه‌انداز تعاملی، طراحی پارامتریک، معماری جنبشی و نمونه‌های معماری در مقیاس واقعی است.
          </p>
        </section>

        <nav className="fa-profile-links" aria-label="پیوندهای حرفه‌ای">
          <a href="/">مشاهده پورتفولیوی کامل انگلیسی <span aria-hidden="true">←</span></a>
          <a href="https://www.linkedin.com/in/amirshamani/" target="_blank" rel="noreferrer">
            لینکدین <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </article>

      <footer className="fa-profile-footer">
        <span lang="en" dir="ltr">Amir Shamani. All rights reserved.</span>
      </footer>
    </main>
  );
}
