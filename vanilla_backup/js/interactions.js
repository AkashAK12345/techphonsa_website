/* ================================================================
   TECHPHONSA INTERACTIONS JS v1.0
   Contact form validation · Success state · Focus management
   ================================================================ */

(function () {
  'use strict';

  /* ── CONTACT FORM ─────────────────────────────────────────── */
  function initContactForm() {
    const form        = document.getElementById('contact-form');
    if (!form) return;

    const formBody    = document.getElementById('form-body');
    const successEl   = document.getElementById('form-success');
    const submitBtn   = document.getElementById('form-submit');

    /* -- Field definitions with validation rules -- */
    const fields = [
      {
        id:       'field-name',
        errorId:  'error-name',
        validate: function (v) { return v.trim().length >= 2; },
        message:  'Please enter your name.'
      },
      {
        id:       'field-business',
        errorId:  'error-business',
        validate: function (v) { return v.trim().length >= 2; },
        message:  'Please enter your business name.'
      },
      {
        id:       'field-email',
        errorId:  'error-email',
        validate: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
        },
        message:  'Please enter a valid email address.'
      },
      {
        id:       'field-need',
        errorId:  'error-need',
        validate: function (v) { return v !== '' && v !== 'default'; },
        message:  'Please select what you need help with.'
      }
      // field-message is optional — no validation required
    ];

    /* -- Show/hide individual field error -- */
    function showError(field, def) {
      field.classList.add('invalid');
      const err = document.getElementById(def.errorId);
      if (err) {
        err.textContent = def.message;
        err.classList.add('visible');
      }
    }

    function clearError(field, def) {
      field.classList.remove('invalid');
      const err = document.getElementById(def.errorId);
      if (err) err.classList.remove('visible');
    }

    /* -- Real-time validation on blur -- */
    fields.forEach(function (def) {
      const el = document.getElementById(def.id);
      if (!el) return;

      el.addEventListener('blur', function () {
        if (!def.validate(el.value)) {
          showError(el, def);
        } else {
          clearError(el, def);
        }
      });

      el.addEventListener('input', function () {
        if (def.validate(el.value)) {
          clearError(el, def);
        }
      });
    });

    /* -- Submit handler -- */
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      let firstInvalid = null;

      fields.forEach(function (def) {
        const el = document.getElementById(def.id);
        if (!el) return;
        if (!def.validate(el.value)) {
          showError(el, def);
          isValid = false;
          if (!firstInvalid) firstInvalid = el;
        } else {
          clearError(el, def);
        }
      });

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      /* -- Valid: Submit form natively to FormSubmit.co -- */
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'TRANSMITTING...';
      }
      
      // Submit natively to trigger FormSubmit's reliable email activation & redirect flow
      form.submit();
    });
  }

  /* ── INIT ─────────────────────────────────────────────────── */
  function init() {
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
