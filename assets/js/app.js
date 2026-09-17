/*
 * MediRelief IL — Application controller
 * --------------------------------------
 * Plain vanilla JS, no build step, no framework — so GitHub Pages
 * can serve it directly. Wires up the 4-screen flow, state, i18n,
 * the eligibility engine, and the printable application output.
 */

(function () {
  "use strict";

  const I18n = window.MediReliefI18n;
  const Engine = window.MediReliefEngine;

  // ---- Application state ---------------------------------------------------
  const state = {
    bill: {
      hospital: "",
      balance: null,
      statementDate: "", // ISO yyyy-mm-dd
      account: "",
      patient: "",
      deadlineWindowDays: 90,
    },
    household: {
      size: 1,
      income: null,
      uninsured: true,
    },
    result: null,
  };

  // The one sample bill used for the demo (matches sample-bill.svg).
  const SAMPLE_BILL = {
    hospital: "Lakeshore Community Hospital",
    balance: 12740,
    statementDate: "2025-08-15",
    account: "LCH-2025-448192",
    patient: "Maria R. Gonzalez",
    deadlineWindowDays: 90,
  };

  const screens = ["upload", "review", "result", "apply"];

  // ---- Small helpers -------------------------------------------------------
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function money(n) {
    if (n == null || isNaN(n)) return "$0";
    return "$" + Math.round(n).toLocaleString("en-US");
  }

  function formatDate(date) {
    if (!date) return "";
    const locales = { en: "en-US", es: "es-US", pl: "pl-PL", tl: "en-PH" };
    try {
      return date.toLocaleDateString(locales[I18n.lang] || "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return date.toISOString().slice(0, 10);
    }
  }

  // ---- Screen navigation ---------------------------------------------------
  function showScreen(name) {
    screens.forEach((s) => {
      const el = $("#screen-" + s);
      if (el) el.classList.toggle("active", s === name);
    });
    updateStepper(name);
    // Scroll to top on each transition (mobile-friendly).
    window.scrollTo({ top: 0, behavior: "smooth" });
    const heading = $("#screen-" + name + " h1");
    if (heading) heading.setAttribute("tabindex", "-1"), heading.focus();
  }

  function updateStepper(current) {
    const idx = screens.indexOf(current);
    $$("#stepper .step").forEach((step) => {
      const stepIdx = screens.indexOf(step.dataset.step);
      step.classList.toggle("active", stepIdx === idx);
      step.classList.toggle("done", stepIdx < idx);
    });
  }

  // ---- Internationalization ------------------------------------------------
  function applyTranslations() {
    $$("[data-i18n]").forEach((el) => {
      el.textContent = I18n.t(el.getAttribute("data-i18n"));
    });
    // Re-render dynamic screens that hold generated copy.
    if ($("#screen-result").classList.contains("active")) renderResult();
    if ($("#screen-apply").classList.contains("active")) renderApply();
  }

  function buildLangSelect() {
    const sel = $("#lang-select");
    sel.innerHTML = "";
    I18n.order.forEach((code) => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = I18n.name(code);
      if (code === I18n.lang) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener("change", () => {
      I18n.set(sel.value);
      applyTranslations();
    });
  }

  // ---- Screen 1: Upload ----------------------------------------------------
  function initUpload() {
    const dropzone = $("#dropzone");
    const fileInput = $("#file-input");
    const sampleBtn = $("#sample-btn");

    const openPicker = () => fileInput.click();
    dropzone.addEventListener("click", openPicker);
    dropzone.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPicker();
      }
    });

    fileInput.addEventListener("change", () => {
      const file = fileInput.files && fileInput.files[0];
      if (file) startScan(file);
    });

    // Drag & drop
    ["dragenter", "dragover"].forEach((ev) =>
      dropzone.addEventListener(ev, (e) => {
        e.preventDefault();
        dropzone.classList.add("drag");
      })
    );
    ["dragleave", "drop"].forEach((ev) =>
      dropzone.addEventListener(ev, (e) => {
        e.preventDefault();
        dropzone.classList.remove("drag");
      })
    );
    dropzone.addEventListener("drop", (e) => {
      const file = e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) startScan(file);
    });

    sampleBtn.addEventListener("click", () => startScan(null, true));
  }

  /**
   * "Scan" the bill. With no live API in this demo, we run a short
   * extraction animation and then load either the sample data (for the
   * sample bill) or an empty, ready-to-edit form (for a user's own file,
   * which they confirm/enter on the review screen).
   */
  function startScan(file, isSample) {
    const idle = $("#upload-idle");
    const scanning = $("#upload-scanning");
    const preview = $("#scan-preview");
    const scanText = $("#scan-text");

    idle.style.display = "none";
    scanning.style.display = "block";

    // Show a preview of what's being scanned.
    let objectUrl = null;
    if (isSample || !file) {
      preview.src = "assets/img/sample-bill.svg";
    } else if (file.type && file.type.indexOf("image/") === 0) {
      objectUrl = URL.createObjectURL(file);
      preview.src = objectUrl;
    } else {
      // PDF or other — keep the sample frame as a generic placeholder.
      preview.src = "assets/img/sample-bill.svg";
    }

    const steps = ["scanning_hospital", "scanning_balance", "scanning_dates"];
    let i = 0;
    scanText.textContent = I18n.t("scanning");
    const interval = setInterval(() => {
      if (i < steps.length) {
        scanText.textContent = I18n.t(steps[i]);
        i++;
      }
    }, 620);

    setTimeout(() => {
      clearInterval(interval);
      if (objectUrl) URL.revokeObjectURL(objectUrl);

      if (isSample) {
        Object.assign(state.bill, SAMPLE_BILL);
        Object.assign(state.household, { size: 4, income: 42000, uninsured: true });
      } else {
        // User's own bill: start a clean, editable form. (In the full
        // product this is where Claude vision fills the fields.)
        Object.assign(state.bill, {
          hospital: "",
          balance: null,
          statementDate: "",
          account: "",
          patient: "",
          deadlineWindowDays: 90,
        });
      }

      // Reset upload screen for next time.
      idle.style.display = "block";
      scanning.style.display = "none";

      populateReview();
      showScreen("review");
    }, 2100);
  }

  // ---- Screen 2: Review ----------------------------------------------------
  function populateReview() {
    $("#f-hospital").value = state.bill.hospital || "";
    $("#f-balance").value = state.bill.balance != null ? state.bill.balance : "";
    $("#f-statement").value = state.bill.statementDate || "";
    $("#f-account").value = state.bill.account || "";
    $("#f-patient").value = state.bill.patient || "";
    $("#f-household").value = state.household.size || 1;
    $("#f-income").value =
      state.household.income != null ? state.household.income : "";
    setUninsured(state.household.uninsured);
  }

  function setUninsured(isUninsured) {
    state.household.uninsured = isUninsured;
    $$("#uninsured-toggle button").forEach((b) => {
      const on = (b.dataset.val === "yes") === isUninsured;
      b.setAttribute("aria-pressed", String(on));
    });
  }

  function initReview() {
    $("#hh-minus").addEventListener("click", () => stepHousehold(-1));
    $("#hh-plus").addEventListener("click", () => stepHousehold(1));

    $$("#uninsured-toggle button").forEach((b) => {
      b.addEventListener("click", () => setUninsured(b.dataset.val === "yes"));
    });

    $("#calc-btn").addEventListener("click", () => {
      readReviewInputs();
      computeAndShow();
    });
  }

  function stepHousehold(delta) {
    const input = $("#f-household");
    let v = parseInt(input.value, 10) || 1;
    v = Math.min(20, Math.max(1, v + delta));
    input.value = v;
  }

  function readReviewInputs() {
    state.bill.hospital = $("#f-hospital").value.trim();
    state.bill.balance = parseFloat($("#f-balance").value) || 0;
    state.bill.statementDate = $("#f-statement").value;
    state.bill.account = $("#f-account").value.trim();
    state.bill.patient = $("#f-patient").value.trim();
    state.household.size = parseInt($("#f-household").value, 10) || 1;
    state.household.income = parseFloat($("#f-income").value) || 0;
  }

  // ---- Screen 3: Result ----------------------------------------------------
  function computeAndShow() {
    state.result = Engine.calculateEligibility({
      householdSize: state.household.size,
      annualIncome: state.household.income,
      billBalance: state.bill.balance,
      uninsured: state.household.uninsured,
    });
    renderResult();
    showScreen("result");
  }

  function renderResult() {
    const r = state.result;
    if (!r) return;

    const payoff = $("#payoff");
    const bignumVal = $("#bignum-val");
    const bignumOff = $("#bignum-off");
    const headline = $("#result-headline");
    const lawref = $("#result-lawref");

    if (r.eligible) {
      payoff.classList.remove("noqualify");
      bignumVal.textContent = r.discountPct + "%";
      bignumOff.style.display = "";
      bignumOff.textContent = I18n.t("result_off");
      headline.textContent = I18n.t("result_qualify_full", {
        pct: r.discountPct,
      });
      lawref.textContent = I18n.t("result_under");
    } else {
      payoff.classList.add("noqualify");
      bignumVal.textContent = "—";
      bignumOff.style.display = "none";
      headline.textContent = I18n.t("result_notqualify_title");
      lawref.textContent = I18n.t("result_notqualify_sub");
    }

    renderBadges(r);
    renderMath(r);
    renderScale(r);
  }

  function renderBadges(r) {
    const wrap = $("#result-badges");
    wrap.innerHTML = "";

    if (r.medicaidRecommended) {
      wrap.appendChild(
        badge(
          "medicaid",
          I18n.t("medicaid_badge"),
          I18n.t("medicaid_note"),
          '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 8v6M9 11h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
        )
      );
    }
    if (r.presumptiveLikely) {
      wrap.appendChild(
        badge(
          "presumptive",
          I18n.t("presumptive_badge"),
          I18n.t("presumptive_note"),
          '<path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
        )
      );
    }
  }

  function badge(kind, title, text, iconPaths) {
    const div = document.createElement("div");
    div.className = "badge " + kind;
    div.innerHTML =
      '<svg class="bi" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      iconPaths +
      "</svg><div class=\"btext\"><strong>" +
      escapeHtml(title) +
      "</strong>" +
      escapeHtml(text) +
      "</div>";
    return div;
  }

  function renderMath(r) {
    const wrap = $("#math-breakdown");
    const rows = [
      [I18n.t("math_fpl", { size: r.householdSize, year: r.fplYear }), money(r.fpl)],
      [I18n.t("math_income"), money(r.annualIncome)],
      [I18n.t("math_pct", { pct: r.fplPercent }), r.fplPercent + "%"],
    ];

    let html = rows
      .map(
        (row) =>
          '<div class="math-row"><span class="k">' +
          escapeHtml(row[0]) +
          '</span><span class="v">' +
          escapeHtml(row[1]) +
          "</span></div>"
      )
      .join("");

    html +=
      '<div class="math-row"><span class="k">' +
      escapeHtml(I18n.t("math_bill")) +
      '</span><span class="v">' +
      money(r.billBalance) +
      "</span></div>";

    if (r.eligible) {
      html +=
        '<div class="math-row discount"><span class="k">' +
        escapeHtml(I18n.t("math_discount", { pct: r.discountPct })) +
        '</span><span class="v">− ' +
        money(r.discountAmount) +
        "</span></div>";
      html +=
        '<div class="math-row total"><span class="k">' +
        escapeHtml(I18n.t("estimate_youpay")) +
        '</span><span class="v">' +
        money(r.estimatedYouPay) +
        "</span></div>";
    } else {
      html +=
        '<div class="math-row total"><span class="k">' +
        escapeHtml(I18n.t("math_remaining")) +
        '</span><span class="v">' +
        money(r.remainingBalance) +
        "</span></div>";
    }
    wrap.innerHTML = html;

    // Income cap note (only meaningful when a cap actually binds).
    const capNote = $("#cap-note");
    if (r.eligible && r.annualIncome > 0) {
      capNote.style.display = "block";
      capNote.textContent = I18n.t("cap_note", {
        cap: money(r.annualCollectionCap),
        pay: money(r.estimatedYouPay),
      });
    } else {
      capNote.style.display = "none";
    }
  }

  function renderScale(r) {
    const body = $("#scale-body");
    body.innerHTML = "";
    // Rows mirror the statutory tiers, plus the "over 600%" bucket.
    const rows = [];
    let prev = 0;
    Engine.DISCOUNT_TIERS.forEach((t) => {
      const label =
        prev === 0
          ? "≤ " + t.maxPct + "%"
          : prev + 0.01 + "–" + t.maxPct + "%";
      rows.push({ label, discount: t.discount + "%", max: t.maxPct });
      prev = t.maxPct;
    });
    rows.push({ label: "> 600%", discount: "—", max: Infinity });

    // Determine which row the user falls into.
    let userMax = null;
    for (const t of Engine.DISCOUNT_TIERS) {
      if (r.fplPercent <= t.maxPct) {
        userMax = t.maxPct;
        break;
      }
    }
    if (userMax === null) userMax = Infinity;

    rows.forEach((row) => {
      const tr = document.createElement("tr");
      if (row.max === userMax) tr.className = "here";
      tr.innerHTML =
        "<td>" +
        escapeHtml(row.label) +
        "</td><td>" +
        escapeHtml(row.discount) +
        "</td>";
      body.appendChild(tr);
    });
  }

  function initResult() {
    $("#result-back").addEventListener("click", () => showScreen("review"));
    $("#result-next").addEventListener("click", () => {
      renderApply();
      showScreen("apply");
    });
  }

  // ---- Screen 4: Apply -----------------------------------------------------
  function renderApply() {
    const r = state.result;
    const b = state.bill;

    // Pre-filled application summary (mimics a hospital FA form).
    const doc = $("#app-doc");
    const fields = [
      [I18n.t("field_patient"), b.patient || "—"],
      [I18n.t("field_hospital"), b.hospital || "—"],
      [I18n.t("field_account"), b.account || "—"],
      [I18n.t("field_statement"), b.statementDate ? formatDate(new Date(b.statementDate + "T00:00:00")) : "—"],
      [I18n.t("field_household"), String(state.household.size)],
      [I18n.t("field_income"), money(state.household.income)],
      [I18n.t("field_balance"), money(b.balance)],
      [I18n.t("field_uninsured"), state.household.uninsured ? I18n.t("yes") : I18n.t("no")],
    ];

    let html =
      "<h3>" +
      escapeHtml(I18n.t("apply_summary_title")) +
      '</h3><div class="doc-sub">' +
      escapeHtml(b.hospital || "") +
      " · " +
      escapeHtml(I18n.t("print_generated")) +
      " · " +
      escapeHtml(formatDate(new Date())) +
      '</div><div class="doc-grid">';

    fields.forEach((f) => {
      html +=
        '<div class="doc-field"><div class="dk">' +
        escapeHtml(f[0]) +
        '</div><div class="dv">' +
        escapeHtml(f[1]) +
        "</div></div>";
    });
    html += "</div>";

    if (r && r.eligible) {
      html +=
        '<div class="doc-highlight">' +
        escapeHtml(I18n.t("result_qualify_full", { pct: r.discountPct })) +
        " — " +
        escapeHtml(I18n.t("estimate_youpay")) +
        ": " +
        money(r.estimatedYouPay) +
        "</div>";
    }

    html +=
      '<div class="doc-foot">' +
      escapeHtml(I18n.t("print_disclaimer")) +
      "</div>";
    doc.innerHTML = html;

    renderDeadline();
  }

  function renderDeadline() {
    const box = $("#deadline-box");
    const info = Engine.estimateDeadline(
      state.bill.statementDate,
      state.bill.deadlineWindowDays
    );
    if (!info) {
      box.style.display = "none";
      return;
    }
    box.style.display = "flex";
    box.classList.remove("soon", "expired");

    $("#deadline-title").textContent =
      I18n.t("deadline_title") + ": " + formatDate(info.deadline);

    let subKey;
    if (info.expired) {
      box.classList.add("expired");
      subKey = I18n.t("deadline_expired");
    } else if (info.daysLeft <= 21) {
      box.classList.add("soon");
      subKey = I18n.t("deadline_soon", { days: info.daysLeft });
    } else {
      subKey = I18n.t("deadline_days", { days: info.daysLeft });
    }
    $("#deadline-sub").textContent =
      subKey + " · " + I18n.t("deadline_note");
  }

  function initApply() {
    $("#download-btn").addEventListener("click", () => window.print());
    $("#restart-btn").addEventListener("click", () => {
      // Reset to a fresh flow.
      state.bill = {
        hospital: "",
        balance: null,
        statementDate: "",
        account: "",
        patient: "",
        deadlineWindowDays: 90,
      };
      state.household = { size: 1, income: null, uninsured: true };
      state.result = null;
      populateReview();
      showScreen("upload");
    });
  }

  // ---- Utilities -----------------------------------------------------------
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // ---- Boot ----------------------------------------------------------------
  function init() {
    I18n.init();
    I18n.set(I18n.lang); // sets <html lang>/dir
    buildLangSelect();
    applyTranslations();

    initUpload();
    initReview();
    initResult();
    initApply();

    showScreen("upload");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
