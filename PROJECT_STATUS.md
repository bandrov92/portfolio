# PROJECT_STATUS.md

آخر تحديث: 2026-09-04 — راجع `git log` للتأكد من الحالة الحقيقية عند القراءة، هذا الملف تصوير لحظي وقد يصبح قديماً.

## آخر ما تم إنجازه

- إضافة بيئة تطوير رسمية لوكلاء Cursor السحابيين عبر `.cursor/environment.json`: خطوة `install` تُحمّل `wrangler@4` إلى كاش npx، وطرفية `wrangler dev` تُشغّل الـ Worker الكامل (`src/worker.js`) مع ربط `ASSETS` والمسارات `/api/auth` و`/api/callback` وقواعد `_redirects`/`_headers` على `http://localhost:8787` (بما فيها `/admin/`). حالة wrangler تُحفظ خارج جذر المستودع (`--persist-to /tmp/wrangler-state`) لتفادي حلقة إعادة تحميل لا نهائية سببها مراقبة مجلد الأصول `.` لملفات `.wrangler/`. هذا للتطوير المحلي فقط ولا يمسّ خط النشر عبر GitHub Actions.

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
- نقل شهادة "خبير مايكروسوفت للإبداع" (`cert2`) من `data/certificates.json` إلى `data/licenses.json` (بصفتها `lic3`) — حُذفت من `certificates.html` ومن كتلة `cert-pill` المُضمّنة في `index.html#certificates`، وأُضيفت كبطاقة ثالثة في `index.html#education` (`grid g2` → `grid g3`) وفي `main.js` (`lic3_t`/`lic3_p` بدل `cert2_t`/`cert2_o` المحذوفتين).
- إعادة تصميم `licenses.html` بالكامل ليصبح أكثر تميزاً (بما أن عدد الرخص عادة أقل من الشهادات): بطاقات عمودية عريضة (`licenses-list` بدل `grid g3`) بميدالية شعار دائرية مذهّبة (`license-emblem`، تعرض صورة أو أيقونة تعبيرية)، رقم تسلسلي أنيق (`license-num`: 01/02/03)، شارة حالة (`license-status-badge`، مثال: "سارية")، شريط إحصاءات بارزة اختياري (`license-stats` بفئة `chip` المُعاد استخدامها من الصفحة الرئيسية)، شبكة بيانات وصفية (`license-meta`: رقم الاعتماد/الصلاحية)، وزر تحقق بارز (`btn btn-ghost`) بدل رابط نصي بسيط. حُدِّثت بنية `data/licenses.json` لتشمل حقولاً جديدة اختيارية (`icon`, `org_ar/en`, `status_ar/en`, `credential_number`, `period_ar/en`, `stats_ar/en`)، وحُدِّث `admin/config.yml` لمطابقتها.

## آخر نسخة منشورة

- آخر commit مدفوع بنجاح إلى `master`: راجع `git log -1` للتأكد من الـhash الفعلي وقت القراءة (آخر عمل: نقل شهادة Microsoft إلى الرخص وإعادة تصميم `licenses.html`). تحقّق دائماً فعلياً عبر GitHub Actions API/الصفحة الحقيقية، لا تفترض النجاح.
- خط النشر: push إلى `master` → GitHub Actions (`deploy.yml`) → `wrangler deploy --secrets-file` → Cloudflare Worker `portfolio` → `bandaralasmari.com`.
- تحقّق دائماً من نجاح آخر تشغيل فعلياً هنا: `https://github.com/bandrov92/portfolio/actions` (لا تثق بملخّص أي أداة، تحقّق من الصفحة الحقيقية أو بـ`curl`).

## مشكلات معروفة (لم تُحل بعد، ليست عاجلة)

- `projects/project-template.html` صفحة قديمة يتيمة، غير مرتبطة من أي مكان فعّال باستثناء رابط "دراسة حالة" في القائمة الرئيسية. قرار حذفها معلّق بانتظار المستخدم.
- يوجد Cloudflare Worker منفصل قديم غير مستخدم باسم `e-portfolio` (على `workers.dev`، بلا طلبات) — لا علاقة له بهذا المشروع، لم يُحسم قرار حذفه.
- شهادات الزمالة الوطنية/OTT/eLXD/الذكاء الاصطناعي التوليدي والشارات التسع في `badges.html` أصبحت بصور فعلية، بينما بقية الشهادات (`cert3`–`cert6`) والرخص (`lic1`–`lic3`) ما زالت بلا صور فعلية (تعرض أيقونة/ميدالية تعبيرية بدلاً من ذلك) — تحتاج صوراً أو شعارات حقيقية عند توفرها عبر `/admin/`.
- خطوط Thmanyah المخصصة (`fonts/thmanyah-*.woff2/otf/ttf`) غير مرفوعة — الموقع يعمل بخطوط بديلة (Amiri, Cormorant Garamond, IBM Plex Sans Arabic, Inter) عبر Google Fonts دون مشاكل، هذا اختياري فقط.
- صور معرض المشاريع الحالية (`assets/images/projects/gallery-0*.webp`) لقطات شاشة مؤقتة (placeholder)، لم تُستبدل بلقطات حقيقية.
- نطاق صلاحية GitHub OAuth (`repo user`) يمنح الوصول لكل مستودعات المستخدم عند تسجيل الدخول، وليس فقط هذا المستودع — سلوك افتراضي في Decap CMS، أُبلغ المستخدم به.
- يوجد Pull Request قديم (#1) من بوت Cloudflare — **أُغلق فعلاً** من المستخدم، لا حاجة لإجراء إضافي.
- لا يوجد قسم "اللغات" (Languages) ظاهر فعلياً على الموقع حالياً. مستوى الإنجليزية الحقيقي للمستخدم (بحسب تصريحه) هو **Upper-Intermediate** — إن أُضيف قسم كهذا مستقبلاً، استخدم هذا المستوى وليس "Advanced/Professional Working Proficiency" الوارد في نسخة سيرته الذاتية الإنجليزية الأصلية.

## الخطوة التالية (مقترحة، غير مؤكدة من المستخدم)

- رفع صور حقيقية للشهادات/الرخص عبر `/admin/` للتحقق أن رفع الصور فعلياً يعمل من طرف إلى طرف (لم يُختبر بعد بصورة حقيقية، فقط بالتصميم).
- قرار نهائي بشأن حذف `projects/project-template.html` و/أو Worker `e-portfolio` القديم.
- لا مهمة عاجلة معلّقة تقنياً حالياً — النظام يعمل من طرف إلى طرف بعد اختبار المستخدم الفعلي الناجح.
