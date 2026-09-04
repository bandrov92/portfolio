# AGENTS.md — قواعد ثابتة لهذا المستودع

قواعد إلزامية لأي وكيل (Claude أو غيره) أو مطوّر يعدّل هذا المشروع. الهدف: منع تكرار الأعطال التي حدثت فعلياً أثناء بناء هذا الموقع.

## بداية أي محادثة جديدة (إلزامي)

- **قبل تنفيذ أي طلب من المستخدم أو تعديل أي ملف**، اقرأ `PROJECT_STATUS.md` أولاً لمعرفة آخر ما تم إنجازه، آخر نسخة منشورة، والمشكلات المعروفة المعلّقة. هذا الملف هو "نقطة الاستئناف" الرسمية بين الجلسات — افترض أن المستخدم يتوقع منك معرفة السياق الكامل دون أن يُعيد شرحه.
- إن وجدت تناقضاً بين `PROJECT_STATUS.md` وحالة الكود/الـ git الفعلية، ثق بالحالة الفعلية (`git log`, قراءة الملفات) ونبّه المستخدم أن الملف كان قديماً.
- في نهاية أي جلسة عمل فيها تعديلات جوهرية (تُنشر أو تُدفع)، حدّث `PROJECT_STATUS.md` ليعكس آخر حالة، تماشياً مع هذه القاعدة نفسها للجلسة القادمة.

## حماية خط النشر (لا تكسره مرة أخرى)

- **النشر يتم حصرياً عبر GitHub Actions** (`.github/workflows/deploy.yml`)، وليس عبر تكامل Cloudflare التلقائي مع Git. **لا تُعِد تفعيل** "Workers Builds" / الربط التلقائي بين Cloudflare Workers ومستودع GitHub — Cloudflare تمسح الأسرار (Secrets) المُضافة يدوياً من لوحته في كل نشر تلقائي ناتج عن push (علة موثّقة في Cloudflare نفسها)، وهذا بالضبط ما كان يكسر تسجيل الدخول لـ `/admin/` بشكل متكرر قبل هذا الإصلاح.
- أسرار GitHub Actions المطلوبة (Settings → Secrets and variables → Actions → Repository secrets): `CF_API_TOKEN`, `CF_ACCOUNT_ID`, `CMS_CLIENT_ID`, `CMS_CLIENT_SECRET`. **لا تُسمِّ أي سرّ جديد ببادئة `GITHUB_`** — GitHub يرفضها (محجوزة له). لهذا السبب أسماء أسرار GitHub مختلفة عن أسماء متغيّرات Worker الفعلية (`GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`)، والتحويل بينهما يحدث داخل `deploy.yml` فقط.
- `wrangler.jsonc` → الحقل `"name": "portfolio"` **لا يجب تغييره أبداً** — هذا هو معرّف الـ Worker الحي المربوط فعلياً بدومين `bandaralasmari.com`. أي تغيير للاسم يُنشئ Worker منفصلاً جديداً بلا دومين ولا أسرار.
- أي رد HTTP من نوع إعادة توجيه (redirect) في `src/worker.js` يجب أن يحمل `Cache-Control: no-store` صراحة. إعادة توجيه 301 عادية بلا هذا الترويسة تُخزَّن مؤقتاً بقوة من المتصفحات وربما من Cloudflare، وتبقى قديمة حتى بعد إصلاح الكود فعلياً (حدث هذا فعلياً مع `/api/auth`).

## البيانات الأساسية — لا تُغيّر البنية دون تحديث الكود المستهلك لها

- `data/projects/*.json` يجب أن يبقى **ملفاً واحداً لكل مشروع** (Decap folder collection). لا تُعِد دمجها في ملف واحد — `project.html` يجلب كل مشروع مباشرة عبر `fetch("data/projects/" + slug + ".json")`.
- `data/certificates.json`, `data/licenses.json`, `data/badges.json` يجب أن تبقى بصيغة **كائن مُسمّى** `{ "certificates": [...] }` / `{ "licenses": [...] }` / `{ "badges": [...] }` — **ليست** مصفوفة مباشرة. هذه الصيغة يفرضها Decap لملفات القوائم (file collection + list widget)، والصفحات المستهلكة (`certificates.html`, `licenses.html`, `badges.html`) تقرأ `data.certificates` / `data.licenses` / `data.badges` بالضبط. تغيير الصيغة يكسر الصفحات الثلاث فوراً.
- لا تُضِف حقل `id` جديد يظهر في نموذج `/admin/` بدون سبب — الحقل الحالي `widget: hidden` عمداً لتبسيط النموذج على المستخدم.
- عند إضافة نوع محتوى جديد (collection رابع/خامس)، حدّد `extension: json` و`format: json` صراحة في `admin/config.yml` لأي folder collection — الاعتماد على الاستنتاج التلقائي لملفات JSON بلا frontmatter يفشل بصمت ويُظهر "No Entries".

## قبل أي دفع (push)

- تحقّق من صحة صياغة أي JSON عدّلته: `python -c "import json; json.load(open('PATH', encoding='utf-8'))"`.
- تحقّق من صحة صياغة `admin/config.yml` بعد أي تعديل: تحميله عبر `yaml.safe_load` (Python) قبل الدفع.
- تحقّق من صحة صياغة أي تعديل على `src/worker.js` أو أي ملف JS: `node --check FILE`.
- بعد أي push، تحقّق من نجاح تشغيل GitHub Actions فعلياً (`https://github.com/bandrov92/portfolio/actions`) — لا تفترض النجاح، وثِّق الحالة الحقيقية للمستخدم (رأينا WebFetch يُبلّغ "Success" خاطئاً أكثر من مرة؛ التحقق الموثوق فقط عبر المتصفح الفعلي أو `curl`).
- لأي تعديل CSS/JS/HTML على الصفحات العامة، اختبر محلياً عبر خادم ثابت (`python -m http.server`) قبل الدفع، وتحقق من عدم وجود أخطاء console جديدة (تجاهل 404 الخطوط الاختيارية `fonts/thmanyah-*` — معروفة وغير مرفوعة عمداً).
- لا تدمج أو تحذف الفرع/الـ PR الخاص بـ `cloudflare/workers-autoconfig` تلقائياً — هذا قرار المستخدم فقط.

## أمان

- لا تكتب أي قيمة سرّية (Client Secret، API Token) في أي ملف داخل المستودع مهما كان السياق — المستودع **عام (public)**. الأسرار تُدخَل مباشرة في GitHub Actions Secrets أو Cloudflare فقط.
- `/admin/` مُستثنى من `robots.txt` — أبقِ هذا الاستثناء.
- لا تُضِف متعاونين (collaborators) على المستودع دون تأكيد صريح من المستخدم — أي حساب بصلاحية Write يستطيع تسجيل الدخول لـ `/admin/` والتعديل مباشرة.
