# Amir Shamani — Portfolio

**حساب گیت‌هاب متصل شما: `shmnamir`**

نام مخزن برای این بسته: **`shmnamir.github.io`**

آدرس اولیهٔ سایت پس از انتشار: **https://shmnamir.github.io/**

مقدار CNAME در DNS دامنه: **`shmnamir.github.io`**

در تمام مراحل زیر، عبارت `YOUR-USERNAME` را با `shmnamir` جایگزین کنید. مخزن `shmnamir.github.io` منبع انتشار سایت است و دامنهٔ شخصی نیز به GitHub Pages متصل شده است.

English-only architectural technology and computational design portfolio. Standalone Next.js static export for GitHub Pages; no ChatGPT, Cloudflare Worker or backend credentials are needed to serve the website.

## راهنمای انتشار، بدون نیاز به برنامه‌نویسی

### ۱. فایل را از حالت فشرده خارج کنید

فایل ZIP را دانلود و Extract کنید. پوشهٔ `repository` شامل کدها و تمام تصاویر و رزومه است. فایل ZIP را مستقیماً در گیت‌هاب آپلود نکنید؛ گیت‌هاب آن را خودکار باز نمی‌کند.

### ۲. مخزن درست را بسازید

در GitHub وارد حساب خود شوید و از گزینهٔ New repository یک مخزن **Public** بسازید. نام آن باید دقیقاً نام کاربری شما به‌اضافهٔ `.github.io` باشد. مثال: اگر نام کاربری `amir-example` است، نام مخزن `amir-example.github.io` می‌شود. این فقط مثال است؛ نام واقعی حساب خودتان را وارد کنید.

گزینهٔ Add a README را فعال کنید تا مخزن با شاخهٔ `main` ساخته شود. اگر این مخزن از قبل وجود دارد و سایت دیگری دارد، آن را بازنویسی نکنید؛ ابتدا برای انتقال راهنمایی بگیرید.

این بسته برای ریشهٔ دامنه تنظیم شده است. نام دلخواهی مثل `portfolio` بدون تنظیم مسیر پایه، باعث خراب‌شدن مسیر تصاویر پیش از اتصال دامنه می‌شود. از نام پیشنهادی بالا استفاده کنید.

### ۳. فایل‌ها را منتقل کنید — روش پیشنهادی با GitHub Desktop

برنامه را از https://desktop.github.com/ نصب و با حساب خود وارد شوید.

۱. در برنامه، File → Clone repository را انتخاب و مخزنی را که ساختید Clone کنید.
۲. گزینهٔ Repository → Show in Explorer را بزنید.
۳. **محتویات داخل** پوشهٔ `repository` بسته را به این پوشه کپی کنید، نه خود پوشهٔ `repository` را. جایگزینی README اولیهٔ مخزن اشکالی ندارد؛ پوشهٔ `.git` مخزن را حذف یا جابه‌جا نکنید.
۴. بررسی کنید فایل `package.json` و پوشه‌های `app` و `public` مستقیماً در ریشه هستند. پوشهٔ `.github` هم باید کپی شده باشد؛ در ویندوز نمایش فایل‌های مخفی را فعال کنید.
۵. در GitHub Desktop، قسمت Summary بنویسید `Add portfolio` و Commit to main را بزنید، سپس Push origin را انتخاب کنید.

از GitHub Import استفاده نکنید: آن ابزار برای انتقال مخزن از یک URL است، نه واردکردن ZIP. روش بالا پوشه‌های مخفی، تصاویر و تنظیمات انتشار را مطمئن‌تر منتقل می‌کند.

### ۴. انتشار خودکار را فعال کنید

در صفحهٔ مخزن در وب، مسیر زیر را باز کنید:

`Settings → Pages → Build and deployment → Source → GitHub Actions`

به زبانهٔ Actions بروید. اگر اجرای اولیه پیش از فعال‌سازی Pages ناموفق شده، گردش‌کار `Publish portfolio` را انتخاب و Run workflow → main → Run workflow را بزنید. اگر از شما تأیید فعال‌سازی Actions خواسته شد، آن را برای همین مخزن فعال کنید.

وقتی اجرا سبز شد، لینک سایت در Settings → Pages نمایش داده می‌شود. آدرس اولیه `https://YOUR-USERNAME.github.io/` است. معمولاً چند دقیقه زمان لازم است. در صورت خطا، متن اولین مرحلهٔ قرمز را ارسال کنید؛ هیچ رمز یا توکنی نفرستید.

### ۵. اتصال دامنهٔ شخصی

ابتدا سایت را با آدرس گیت‌هاب بررسی کنید. بعد مالکیت دامنه را طبق راهنمای GitHub با رکورد TXT تأیید کنید و در Settings → Pages → Custom domain این مقدار را وارد و Save کنید:

`www.amirshamani.com`

در پنل DNS ثبت‌کنندهٔ دامنه:

```text
CNAME   www   YOUR-USERNAME.github.io
A       @     185.199.108.153
A       @     185.199.109.153
A       @     185.199.110.153
A       @     185.199.111.153
```

نام کاربری واقعی را جایگزین کنید؛ در مقدار CNAME از `https://` یا مسیر مخزن استفاده نکنید. رکوردهای متناقض وب مربوط به @ یا www باید بررسی شوند؛ رکوردهای ایمیل MX و TXT را پاک نکنید. اگر دامنه اکنون روی سایت دیگری است، این کار ترافیک وب را به سایت جدید منتقل می‌کند.

فایل آمادهٔ `domain/CNAME` در بسته هست. پس از تنظیم دامنه، آن را داخل `public` هم کپی، Commit و Push کنید. در روش GitHub Actions، تنظیم Custom domain در پنل ضروری است؛ این فایل به‌تنهایی دامنه را وصل نمی‌کند. عمداً از ابتدا داخل `public` قرار داده نشده تا آدرس گیت‌هاب پیش از آماده‌شدن DNS قابل بررسی باشد.

پس از تأیید DNS، Enforce HTTPS را فعال کنید. آماده‌شدن DNS و گواهی ممکن است تا ۲۴ ساعت طول بکشد. میزبانی مخزن عمومی رایگان است؛ تمدید دامنه جداگانه پرداخت می‌شود.

### ۶. فرم تماس را فعال کنید

فرم پیام‌ها را با FormSubmit به `amir.shamani@gmail.com` می‌فرستد. یک پیام آزمایشی از سایت خود ارسال و ایمیل فعال‌سازی سرویس را تأیید کنید؛ Spam را هم بررسی کنید. ممکن است صفحهٔ بررسی امنیتی یا تأیید سرویس نمایش داده شود. تحویل واقعی ایمیل در آماده‌سازی این بسته آزمایش نشده و تضمین نشده است. پیام‌ها از سرویس شخص ثالث عبور می‌کنند؛ GitHub خودش ایمیل ارسال نمی‌کند.

### تغییرات بعدی

متن اصلی در `app/page.tsx`، اطلاعات تکمیلی پروژه‌ها در `app/project-gallery.tsx`، فرم در `app/contact-form.tsx` و طراحی در `app/globals.css` قرار دارند. فایل‌ها و تصاویر در `public` هستند. پس از هر تغییر، Commit و Push کنید؛ گردش‌کار مجدداً سایت را می‌سازد. برای انتشار نسخهٔ جدید نیازی به خرید هاست ندارید.

مخزن Public یعنی کدها، تصاویر، رزومه و ایمیل درج‌شده برای همه قابل مشاهده‌اند. هیچ رمز، توکن یا فایل شخصی دیگری به مخزن اضافه نکنید. پروژه‌ها و تصاویر همچنان متعلق به صاحبانشان هستند؛ عمومی‌بودن مخزن به‌معنای مجوز بازاستفاده نیست.

## Developer notes

Requires Node.js 22.13+ (workflow uses Node 22). Dependencies and lockfile are retained from the working portfolio to preserve compatibility; some starter packages are unused. No server-only files, authentication bindings or credentials are included.

```bash
npm ci
npm run build
npm test
```

`out/` is the publishable static output; it is deliberately not committed. Use an HTTP server to preview it, not file://. `npm run dev` starts a local development server. The build performs TypeScript validation; `npm test` verifies static asset references and project evidence files, not browser interactions or email delivery.

The homepage banner, project assets, English-only interface, horizontal mobile/tablet rails, outline/photo previews, accessible dialogs, Show More and contact form have been preserved. The ordered YouTube gallery uses lightweight thumbnail facades and privacy-enhanced embeds. The public CV is a metadata-free web-safe copy. A black-and-white architectural favicon, copyright notice and casual image-download deterrents are included. Original project documentation images are unmodified, including any annotations within them. Legacy translation data may remain in source but is not selectable in the interface.

## Official references

- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://nextjs.org/docs/app/guides/static-exports
- https://formsubmit.co/
