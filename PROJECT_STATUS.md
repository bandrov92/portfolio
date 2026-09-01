# PROJECT_STATUS.md

آخر تحديث: 2026-09-01 — راجع `git log` للتأكد من الحالة الحقيقية عند القراءة، هذا الملف تصوير لحظي وقد يصبح قديماً.

## آخر ما تم إنجازه

- تحويل الموقع من صفحة واحدة (`index.html` بكل شيء مضمّناً) إلى موقع متعدد الصفحات: `index.html`, `project.html`, `certificates.html`, `licenses.html`, `badges.html`، مع CSS/JS مفصولة (`css/site.css`, `css/pages.css`, `main.js`).
- بناء لوحة إدارة محتوى كاملة عبر **Decap CMS** على `/admin/` تغطي 4 أقسام: المشاريع، الشهادات التدريبية، الرخص والاعتمادات، الشارات الرقمية (بادجات Credly حية).
- اكتشاف أن الاستضافة الفعلية **Cloudflare Worker باسم `portfolio`** (Static Assets)، وليست Cloudflare Pages كما افتُرض أولاً — أعيد بناء مصادقة GitHub OAuth بالكامل على هذا الأساس (`src/worker.js` + `wrangler.jsonc`).
- حل علة Cloudflare الموثّقة (مسح الأسرار عند كل نشر تلقائي) باستبدال النشر التلقائي بخط عبر **GitHub Actions** (`.github/workflows/deploy.yml`) يحقن الأسرار في كل عملية نشر.
- إصلاح مشكلة تخزين مؤقت لرد `/api/auth` (301 → 302 + `Cache-Control: no-store`).
- إضافة معاينة حية (Live Preview) داخل `/admin/` تحاكي تصميم الموقع الفعلي بدل المعاينة العامة الافتراضية.
- مراجعة أمنية للمستودع: لا تسريب أسرار في التاريخ، إضافة `.gitignore`، استثناء `/admin/` من `robots.txt`.

## آخر نسخة منشورة

- آخر commit مدفوع بنجاح إلى `master`: `0273074` — "Add live preview templates to the CMS, matching the real site design".
- خط النشر: push إلى `master` → GitHub Actions (`deploy.yml`) → `wrangler deploy --secrets-file` → Cloudflare Worker `portfolio` → `bandaralasmari.com`.
- تحقّق دائماً من نجاح آخر تشغيل فعلياً هنا: `https://github.com/bandrov92/portfolio/actions` (لا تثق بملخّص أي أداة، تحقّق من الصفحة الحقيقية أو بـ`curl`).

## مشكلات معروفة (لم تُحل بعد، ليست عاجلة)

- `projects/project-template.html` صفحة قديمة يتيمة، غير مرتبطة من أي مكان فعّال باستثناء رابط "دراسة حالة" في القائمة الرئيسية. قرار حذفها معلّق بانتظار المستخدم.
- يوجد Cloudflare Worker منفصل قديم غير مستخدم باسم `e-portfolio` (على `workers.dev`، بلا طلبات) — لا علاقة له بهذا المشروع، لم يُحسم قرار حذفه.
- لا صور فعلية مرفوعة بعد لأي شهادة/رخصة/شارة (كل الحقول `image` فارغة، تظهر رسائل placeholder على الموقع الحي) — بانتظار أن يرفعها المستخدم عبر `/admin/`.
- خطوط Thmanyah المخصصة (`fonts/thmanyah-*.woff2/otf/ttf`) غير مرفوعة — الموقع يعمل بخطوط بديلة (Amiri, Cormorant Garamond, IBM Plex Sans Arabic, Inter) عبر Google Fonts دون مشاكل، هذا اختياري فقط.
- صور معرض المشاريع الحالية (`assets/images/projects/gallery-0*.webp`) لقطات شاشة مؤقتة (placeholder)، لم تُستبدل بلقطات حقيقية.
- نطاق صلاحية GitHub OAuth (`repo user`) يمنح الوصول لكل مستودعات المستخدم عند تسجيل الدخول، وليس فقط هذا المستودع — سلوك افتراضي في Decap CMS، أُبلغ المستخدم به.
- يوجد Pull Request قديم (#1) من بوت Cloudflare — **أُغلق فعلاً** من المستخدم، لا حاجة لإجراء إضافي.

## الخطوة التالية (مقترحة، غير مؤكدة من المستخدم)

- رفع صور حقيقية للشهادات/الرخص عبر `/admin/` للتحقق أن رفع الصور فعلياً يعمل من طرف إلى طرف (لم يُختبر بعد بصورة حقيقية، فقط بالتصميم).
- قرار نهائي بشأن حذف `projects/project-template.html` و/أو Worker `e-portfolio` القديم.
- لا مهمة عاجلة معلّقة تقنياً حالياً — النظام يعمل من طرف إلى طرف بعد اختبار المستخدم الفعلي الناجح.
