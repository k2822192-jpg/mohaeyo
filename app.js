(function () {
  const STORAGE_KEY = 'mohaeyo-lang';
  const DEFAULT_LANG = 'en';
  const supportedCodes = SUPPORTED_LANGS.map((l) => l.code);

  function detectInitialLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && supportedCodes.includes(saved)) return saved;

    const browserLangs = navigator.languages || [navigator.language || DEFAULT_LANG];
    for (const raw of browserLangs) {
      const code = raw.slice(0, 2).toLowerCase();
      if (supportedCodes.includes(code)) return code;
    }
    return DEFAULT_LANG;
  }

  function applyLang(lang) {
    const dict = I18N[lang] || I18N[DEFAULT_LANG];

    // text content
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    // attributes, format: data-i18n-attr="attrName:key"
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const [attr, key] = el.getAttribute('data-i18n-attr').split(':');
      if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
    });

    document.title = dict.meta_title;
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function buildLangSelect() {
    const select = document.getElementById('lang-select');
    SUPPORTED_LANGS.forEach(({ code, name }) => {
      const opt = document.createElement('option');
      opt.value = code;
      opt.textContent = name;
      select.appendChild(opt);
    });
    select.addEventListener('change', (e) => applyLang(e.target.value));
    return select;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // NOTE: This form does not send data anywhere yet — it only validates
  // and shows a confirmation message in the browser. Wire it up to a real
  // email service (e.g. Mailchimp, Buttondown, a Supabase table + serverless
  // function) before relying on it to actually collect sign-ups.
  function wireForm(formId, inputId, statusId) {
    const form = document.getElementById(formId);
    const input = document.getElementById(inputId);
    const status = document.getElementById(statusId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const lang = document.documentElement.lang || DEFAULT_LANG;
      const dict = I18N[lang] || I18N[DEFAULT_LANG];

      if (!isValidEmail(input.value)) {
        status.textContent = dict.form_invalid;
        status.style.color = '#FF8F6B';
        return;
      }

      // TODO: replace with a real submission (fetch to your backend / form service)
      console.log('[mohaeyo] signup captured locally only:', input.value);

      status.textContent = dict.form_success;
      status.style.color = '';
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildLangSelect();
    const lang = detectInitialLang();
    document.getElementById('lang-select').value = lang;
    applyLang(lang);

    wireForm('signup', 'email-input', 'form-status');
    wireForm('signup-footer', 'email-input-footer', 'form-status-footer');
  });
})();
