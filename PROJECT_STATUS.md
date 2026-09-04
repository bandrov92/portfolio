# PROJECT_STATUS.md

آخر تحديث: 2026-09-04 — راجع `git log` للتأكد من الحالة الحقيقية عند القراءة، هذا الملف تصوير لحظي وقد يصبح قديماً.

## آخر ما تم إنجازه

- تحويل الموقع من صفحة واحدة (`index.html` بكل شيء مضمّناً) إلى موقع متعدد الصفحات: `index.html`, `project.html`, `certificates.html`, `licenses.html`, `badges.html`، مع CSS/JS مفصولة (`css/site.css`, `css/pages.css`, `main.js`).
- بناء لوحة إدارة محتوى كاملة عبر **Decap CMS** على `/admin/` تغطي 4 أقسام: المشاريع، الشهادات التدريبية، الرخص والاعتمادات، الشارات الرقمية (بادجات Credly حية).
- اكتشاف أن الاستضافة الفعلية **Cloudflare Worker باسم `portfolio`** (Static Assets)، وليست Cloudflare Pages كما افتُرض أولاً — أعيد بناء مصادقة GitHub OAuth بالكامل على هذا الأساس (`src/worker.js` + `wrangler.jsonc`).
- حل علة Cloudflare الموثّقة (مسح الأسرار عند كل نشر تلقائي) باستبدال النشر التلقائي بخط عبر **GitHub Actions** (`.github/workflows/deploy.yml`) يحقن الأسرار في كل عملية نشر.
- إصلاح مشكلة تخزين مؤقت لرد `/api/auth` (301 → 302 + `Cache-Control: no-store`).
- إضافة معاينة حية (Live Preview) داخل `/admin/` تحاكي تصميم الموقع الفعلي بدل المعاينة العامة الافتراضية.
- مراجعة أمنية للمستودع: لا تسريب أسرار في التاريخ، إضافة `.gitignore`، استثناء `/admin/` من `robots.txt`.
- إضافة رابط Teacher Pro SA الحي إلى بيانات المشروع، وتحويل قصة النسخة الثانية إلى دراسة حالة اختيارية تُقرأ من `data/projects/teacher-promotion-guide.json` وتظهر في `project.html`.
- تحسين رسالة الخطأ في `project.html` عند فتح الصفحة محلياً بصيغة `file://`، لأن المتصفح قد يمنع تحميل ملفات JSON ويجب استخدام معاينة محلية عبر `http://localhost`.
- إضافة شهادة الزمالة الوطنية في التعليم الإلكتروني كأول شهادة مصورة ومفصلة في `certificates.html`، مع صورة WebP محسّنة ومحاور البرنامج الثلاثة داخل تفاصيل قابلة للفتح.
- إثراء شهادة "تخصص القيادة واستراتيجية الذكاء الاصطناعي التوليدي" بصورة فعلية ووصف مهني، وربط مسارات Vanderbilt University عبر Coursera كثلاث شهادات مستقلة داخل البطاقة نفسها.
- منع تخزين ملفات بيانات المحتوى (`data/*.json`) في كاش المتصفح عند العرض، حتى تظهر إضافات الشهادات والمشاريع بسرعة في المعاينة وبعد النشر.
- جعل تخطيط بطاقة الشهادة أفقياً (`is-featured`) تلقائياً لأي شهادة تملك صورة فعلية (`c.image`)، بدل الاعتماد فقط على وجود محاور (`tracks`) أو شهادات مرتبطة (`related_credentials`).
- إضافة شهادتي OTT (الشهادة المهنية الاحترافية في تقديم التعليم والتدريب الإلكتروني) وeLXD (تصميم خبرات التعليم الإلكتروني) من المركز الوطني للتعليم الإلكتروني (NELC) كشهادتين "قيد الإصدار" (`pending: true`) في `certificates.html`: شارة "قيد الإصدار" بجوار العنوان، نص بارز "(في مراحل الاعتماد النهائية)" بدل تاريخ/رقم الشهادة، أيقونة ساعة رملية كصورة نائبة، وشعار NELC (`assets/images/nelc-logo.png`) بجوار اسم الجهة المانحة. رتّبت شهادات `certificates.html` بالتسلسل: الزمالة الوطنية ← OTT ← eLXD ← مسار الذكاء الاصطناعي والبيانات ← باقي الشهادات.
- إعادة بناء `badges.html` بالكامل: أُزيلت شارة McKinsey المُضمَّنة عبر Credly Live Embed، واستُبدلت بـ9 شارات ثابتة (Cloud Security, GRC & Data Privacy, IBM SkillsBuild Cybersecurity, Incident Response & Forensics, McKinsey.org Forward, Microsoft Innovative Educator Expert, Security Operations, System & Network Security, Vulnerability Management) في `data/badges.json` بصور من `assets/badges/*.png` وحقل مهارات جديد (`skills_ar`/`skills_en`). شبكة 3/2/1 عمود متجاوبة، كل بطاقة رابط `<a>` كامل قابل للنقر، أنيميشن ظهور متتابع (staggered fade/slide-up)، وCTA نهائي يشير إلى ملف Credly العام (`credly.com/users/bandarov/badges/credly`). حُدِّث `admin/config.yml` لمطابقة الحقول الجديدة (`skills`, مسار `/assets/badges`) وحُذف حقل `credly_badge_id` غير المستخدم بعد الآن.
- تطوير الصفحة الرئيسية `index.html` بالاستناد إلى سيرة ذاتية محدّثة (عربي + إنجليزي زوّدنا بها المستخدم نصاً): تحديث الاسم إلى "بندر بن عايض الأسمري" (AR فقط)، إعادة صياغة `role`/`about_p` نحو هوية "خبير التحول الرقمي وتقنيات التعليم"، وإضافة قسم جديد بالكامل **"الرؤية المهنية"** (`#vision` بين `#about` و`#experience`) بثلاثة محاور: قيادة التحول التعليمي، قيادة المشاريع التعليمية، تصميم خبرات التعلم (LXD) — بنص AR/EN متطابق دلالياً عبر `main.js` (`I18N.ar`/`I18N.en`). أُضيف `"vision"` إلى `sectionIds` ومصفوفتي `sections[]` (عجلة التنقل الجانبية)، وأُضيف رابط بريد `mailto:bandrovinci@gmail.com` في `#contact`. أُثريت بنود الخبرة (`exp1_l1/l2`) بتفاصيل Netlify وGoogle Sheets/KPIs، وأُضيفت صفة "مؤسس ومصمم منتج" لمشروع Teacher Pro SA في `main.js` (`p1_p`) وفي `data/projects/teacher-promotion-guide.json` (`summary_ar`/`summary_en`).

## آخر نسخة منشورة

- آخر commit مدفوع بنجاح إلى `master`: `cce89f7` (تحديث الصفحة الرئيسية: الاسم، قسم "الرؤية المهنية"، رابط البريد، إثراء الخبرة/مشروع Teacher Pro SA) — تحقّقنا فعلياً بعد الدفع: GitHub Actions run بحالة `completed/success`، والموقع الحي (`bandaralasmari.com`, `main.js` الحي) يعرض المحتوى الجديد فعلاً (قسم `#vision`، `mailto:bandrovinci@gmail.com`، الاسم الجديد). راجع `git log` للتأكد من عدم وجود commits أحدث لم تُدفع.
- خط النشر: push إلى `master` → GitHub Actions (`deploy.yml`) → `wrangler deploy --secrets-file` → Cloudflare Worker `portfolio` → `bandaralasmari.com`.
- تحقّق دائماً من نجاح آخر تشغيل فعلياً هنا: `https://github.com/bandrov92/portfolio/actions` (لا تثق بملخّص أي أداة، تحقّق من الصفحة الحقيقية أو بـ`curl`).

## مشكلات معروفة (لم تُحل بعد، ليست عاجلة)

- `projects/project-template.html` صفحة قديمة يتيمة، غير مرتبطة من أي مكان فعّال باستثناء رابط "دراسة حالة" في القائمة الرئيسية. قرار حذفها معلّق بانتظار المستخدم.
- يوجد Cloudflare Worker منفصل قديم غير مستخدم باسم `e-portfolio` (على `workers.dev`، بلا طلبات) — لا علاقة له بهذا المشروع، لم يُحسم قرار حذفه.
- شهادات الزمالة الوطنية/OTT/eLXD/الذكاء الاصطناعي التوليدي والشارات التسع في `badges.html` أصبحت بصور فعلية، بينما بقية الشهادات (`cert2`–`cert6`) والرخص ما زالت تحتاج صوراً أو روابط تحقق عند توفرها. روابط `verify_url` لشهادتي OTT وeLXD وللشارات التسع لا تزال "#" مؤقتة بانتظار الروابط الحقيقية.
- خطوط Thmanyah المخصصة (`fonts/thmanyah-*.woff2/otf/ttf`) غير مرفوعة — الموقع يعمل بخطوط بديلة (Amiri, Cormorant Garamond, IBM Plex Sans Arabic, Inter) عبر Google Fonts دون مشاكل، هذا اختياري فقط.
- صور معرض المشاريع الحالية (`assets/images/projects/gallery-0*.webp`) لقطات شاشة مؤقتة (placeholder)، لم تُستبدل بلقطات حقيقية.
- نطاق صلاحية GitHub OAuth (`repo user`) يمنح الوصول لكل مستودعات المستخدم عند تسجيل الدخول، وليس فقط هذا المستودع — سلوك افتراضي في Decap CMS، أُبلغ المستخدم به.
- يوجد Pull Request قديم (#1) من بوت Cloudflare — **أُغلق فعلاً** من المستخدم، لا حاجة لإجراء إضافي.
- لا يوجد قسم "اللغات" (Languages) ظاهر فعلياً على الموقع حالياً. مستوى الإنجليزية الحقيقي للمستخدم (بحسب تصريحه) هو **Upper-Intermediate** — إن أُضيف قسم كهذا مستقبلاً، استخدم هذا المستوى وليس "Advanced/Professional Working Proficiency" الوارد في نسخة سيرته الذاتية الإنجليزية الأصلية.

## الخطوة التالية (مقترحة، غير مؤكدة من المستخدم)

- رفع صور حقيقية للشهادات/الرخص عبر `/admin/` للتحقق أن رفع الصور فعلياً يعمل من طرف إلى طرف (لم يُختبر بعد بصورة حقيقية، فقط بالتصميم).
- قرار نهائي بشأن حذف `projects/project-template.html` و/أو Worker `e-portfolio` القديم.
- لا مهمة عاجلة معلّقة تقنياً حالياً — النظام يعمل من طرف إلى طرف بعد اختبار المستخدم الفعلي الناجح.
