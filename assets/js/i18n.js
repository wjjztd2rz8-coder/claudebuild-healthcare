/*
 * MediRelief IL — Internationalization
 * ------------------------------------
 * Bundled translations (no live API) so the accessibility payoff
 * works reliably in a demo. Plain-language, ~6th-grade reading level.
 *
 * Languages: English, Español, Polski, Tagalog.
 */

const TRANSLATIONS = {
  en: {
    _name: "English",
    _dir: "ltr",

    tagline: "Find hospital bill relief you qualify for — in seconds.",
    step_upload: "Scan bill",
    step_review: "Review",
    step_result: "Your relief",
    step_apply: "Apply",

    // Screen 1 — Upload
    upload_title: "Snap a photo of your hospital bill",
    upload_sub:
      "We read the bill and check which Illinois assistance program can lower it. Your photo stays on your device.",
    upload_cta: "Choose a photo or file",
    upload_or: "or",
    upload_sample: "Try it with a sample bill",
    upload_privacy: "Nothing is uploaded to a server. Everything runs in your browser.",

    // Extraction / scanning
    scanning: "Reading your bill…",
    scanning_hospital: "Finding the hospital",
    scanning_balance: "Finding the balance",
    scanning_dates: "Finding the dates",

    // Screen 2 — Review
    review_title: "Here's what we found",
    review_sub: "Check these details and fix anything that's wrong.",
    field_hospital: "Hospital",
    field_balance: "Amount you owe",
    field_statement: "Statement date",
    field_account: "Account number",
    field_patient: "Patient name",
    household_title: "A couple of quick questions",
    household_sub: "This is how we match you to the right discount. We do not save your answers.",
    field_household: "People in your household",
    field_income: "Household income each year (before taxes)",
    field_uninsured: "Are you uninsured?",
    yes: "Yes",
    no: "No",
    review_cta: "See what I qualify for",

    // Screen 3 — Result
    result_calc: "Based on Illinois law",
    result_off: "OFF",
    result_qualify_full:
      "You likely qualify for a {pct}% discount",
    result_under:
      "under Illinois' Hospital Uninsured Patient Discount Act (210 ILCS 89).",
    result_notqualify_title: "You may not qualify for the uninsured discount",
    result_notqualify_sub:
      "Your income is above 600% of the federal poverty level, the limit for this program. You may still qualify for the hospital's own charity care — ask them directly.",
    math_title: "The math — no guessing",
    math_fpl: "Poverty level for {size} people ({year})",
    math_income: "Your yearly income",
    math_pct: "That is {pct}% of the poverty level",
    math_tier: "Your discount tier",
    math_bill: "Original bill",
    math_discount: "Discount ({pct}%)",
    math_remaining: "Balance after discount",
    cap_note:
      "By law, the hospital can collect no more than 20% of your yearly income ({cap}) in a 12-month period. Your estimated cost is capped at {pay}.",
    estimate_youpay: "Your estimated cost",
    presumptive_badge: "Presumptive eligibility likely",
    presumptive_note:
      "At your income, many hospitals grant full relief automatically — often without a full application. Ask about \"presumptive eligibility.\"",
    medicaid_badge: "Check Medicaid first",
    medicaid_note:
      "Your income may qualify you for Illinois Medicaid, which can cover the bill entirely. Hospitals must screen you for Medicaid before applying the discount.",
    scale_title: "The full Illinois sliding scale",
    scale_col_income: "Income vs. poverty level",
    scale_col_discount: "Discount",
    result_cta: "Get my application",
    result_back: "Edit my details",

    // Screen 4 — Apply
    apply_title: "Your application is ready",
    apply_sub:
      "We filled in what we know. Print or save it, then follow the checklist below.",
    apply_download: "Download / print application",
    apply_summary_title: "Financial Assistance Application — Summary",
    checklist_title: "What to do next",
    checklist_1: "Print or save the application above.",
    checklist_2:
      "Gather proof of income (recent pay stubs, a tax return, or a benefits letter).",
    checklist_3:
      "Gather one photo ID and a proof of Illinois address (a utility bill works).",
    checklist_4:
      "Send it to the hospital's financial assistance / billing office.",
    checklist_5:
      "Apply before the deadline. Ask the hospital to pause collections while they review.",
    deadline_title: "Estimated deadline",
    deadline_days: "About {days} days left",
    deadline_soon: "Only {days} days left — apply soon",
    deadline_expired: "This window may have passed — call the hospital right away; many grant extensions.",
    deadline_note:
      "Deadlines vary by hospital (often 60–240 days from the first bill). Confirm the exact date with the hospital.",
    where_title: "Where to send it",
    where_generic:
      "Contact the hospital's Financial Assistance or Patient Billing department. It is listed on your bill and on the hospital's website.",
    restart: "Start over",
    print_generated: "Generated by MediRelief IL",
    print_disclaimer:
      "This is a preparation aid, not legal or financial advice. Final eligibility is decided by the hospital under 210 ILCS 89.",

    // General
    disclaimer:
      "MediRelief IL is a demo. It gives estimates based on public Illinois law and does not submit anything for you or provide legal advice.",
    lang_label: "Language",
  },

  es: {
    _name: "Español",
    _dir: "ltr",

    tagline: "Encuentre ayuda para su factura médica — en segundos.",
    step_upload: "Escanear",
    step_review: "Revisar",
    step_result: "Su ayuda",
    step_apply: "Solicitar",

    upload_title: "Tome una foto de su factura del hospital",
    upload_sub:
      "Leemos la factura y verificamos qué programa de ayuda de Illinois puede reducirla. Su foto permanece en su dispositivo.",
    upload_cta: "Elija una foto o archivo",
    upload_or: "o",
    upload_sample: "Pruébelo con una factura de ejemplo",
    upload_privacy: "Nada se sube a un servidor. Todo funciona en su navegador.",

    scanning: "Leyendo su factura…",
    scanning_hospital: "Buscando el hospital",
    scanning_balance: "Buscando el saldo",
    scanning_dates: "Buscando las fechas",

    review_title: "Esto es lo que encontramos",
    review_sub: "Revise estos datos y corrija lo que esté mal.",
    field_hospital: "Hospital",
    field_balance: "Cantidad que debe",
    field_statement: "Fecha del estado de cuenta",
    field_account: "Número de cuenta",
    field_patient: "Nombre del paciente",
    household_title: "Un par de preguntas rápidas",
    household_sub: "Así lo emparejamos con el descuento correcto. No guardamos sus respuestas.",
    field_household: "Personas en su hogar",
    field_income: "Ingreso anual del hogar (antes de impuestos)",
    field_uninsured: "¿No tiene seguro?",
    yes: "Sí",
    no: "No",
    review_cta: "Ver para qué califico",

    result_calc: "Según la ley de Illinois",
    result_off: "DE DESCUENTO",
    result_qualify_full: "Probablemente califica para un descuento del {pct}%",
    result_under:
      "bajo la Ley de Descuento para Pacientes sin Seguro de Illinois (210 ILCS 89).",
    result_notqualify_title: "Puede que no califique para el descuento",
    result_notqualify_sub:
      "Su ingreso supera el 600% del nivel federal de pobreza, el límite de este programa. Aún podría calificar para la ayuda benéfica del hospital — pregúnteles directamente.",
    math_title: "Los cálculos — sin adivinar",
    math_fpl: "Nivel de pobreza para {size} personas ({year})",
    math_income: "Su ingreso anual",
    math_pct: "Eso es el {pct}% del nivel de pobreza",
    math_tier: "Su nivel de descuento",
    math_bill: "Factura original",
    math_discount: "Descuento ({pct}%)",
    math_remaining: "Saldo después del descuento",
    cap_note:
      "Por ley, el hospital no puede cobrar más del 20% de su ingreso anual ({cap}) en 12 meses. Su costo estimado se limita a {pay}.",
    estimate_youpay: "Su costo estimado",
    presumptive_badge: "Elegibilidad presunta probable",
    presumptive_note:
      "Con su ingreso, muchos hospitales otorgan ayuda total automáticamente — a menudo sin una solicitud completa. Pregunte por la \"elegibilidad presunta\".",
    medicaid_badge: "Verifique Medicaid primero",
    medicaid_note:
      "Su ingreso podría calificarlo para Medicaid de Illinois, que puede cubrir toda la factura. Los hospitales deben evaluarlo para Medicaid antes de aplicar el descuento.",
    scale_title: "La escala completa de Illinois",
    scale_col_income: "Ingreso vs. nivel de pobreza",
    scale_col_discount: "Descuento",
    result_cta: "Obtener mi solicitud",
    result_back: "Editar mis datos",

    apply_title: "Su solicitud está lista",
    apply_sub:
      "Llenamos lo que sabemos. Imprímala o guárdela, luego siga la lista de abajo.",
    apply_download: "Descargar / imprimir solicitud",
    apply_summary_title: "Solicitud de Ayuda Financiera — Resumen",
    checklist_title: "Qué hacer ahora",
    checklist_1: "Imprima o guarde la solicitud de arriba.",
    checklist_2:
      "Reúna prueba de ingresos (recibos de pago recientes, una declaración de impuestos o una carta de beneficios).",
    checklist_3:
      "Reúna una identificación con foto y prueba de domicilio en Illinois (una factura de servicios sirve).",
    checklist_4:
      "Envíela a la oficina de ayuda financiera / facturación del hospital.",
    checklist_5:
      "Solicite antes de la fecha límite. Pida al hospital que pause los cobros mientras revisan.",
    deadline_title: "Fecha límite estimada",
    deadline_days: "Quedan unos {days} días",
    deadline_soon: "Solo quedan {days} días — solicite pronto",
    deadline_expired: "Este plazo pudo haber pasado — llame al hospital de inmediato; muchos dan prórrogas.",
    deadline_note:
      "Los plazos varían según el hospital (a menudo 60–240 días desde la primera factura). Confirme la fecha exacta con el hospital.",
    where_title: "A dónde enviarla",
    where_generic:
      "Contacte al departamento de Ayuda Financiera o Facturación del hospital. Aparece en su factura y en el sitio web del hospital.",
    restart: "Empezar de nuevo",
    print_generated: "Generado por MediRelief IL",
    print_disclaimer:
      "Esto es una ayuda de preparación, no asesoría legal ni financiera. La elegibilidad final la decide el hospital bajo 210 ILCS 89.",

    disclaimer:
      "MediRelief IL es una demostración. Da estimaciones basadas en la ley pública de Illinois y no envía nada por usted ni ofrece asesoría legal.",
    lang_label: "Idioma",
  },

  pl: {
    _name: "Polski",
    _dir: "ltr",

    tagline: "Znajdź ulgę na rachunek szpitalny — w kilka sekund.",
    step_upload: "Skanuj",
    step_review: "Sprawdź",
    step_result: "Twoja ulga",
    step_apply: "Złóż wniosek",

    upload_title: "Zrób zdjęcie rachunku ze szpitala",
    upload_sub:
      "Odczytujemy rachunek i sprawdzamy, który program pomocy w Illinois może go obniżyć. Twoje zdjęcie zostaje na Twoim urządzeniu.",
    upload_cta: "Wybierz zdjęcie lub plik",
    upload_or: "lub",
    upload_sample: "Wypróbuj na przykładowym rachunku",
    upload_privacy: "Nic nie jest wysyłane na serwer. Wszystko działa w Twojej przeglądarce.",

    scanning: "Odczytywanie rachunku…",
    scanning_hospital: "Szukanie szpitala",
    scanning_balance: "Szukanie kwoty",
    scanning_dates: "Szukanie dat",

    review_title: "Oto co znaleźliśmy",
    review_sub: "Sprawdź te dane i popraw, jeśli coś się nie zgadza.",
    field_hospital: "Szpital",
    field_balance: "Kwota do zapłaty",
    field_statement: "Data rachunku",
    field_account: "Numer konta",
    field_patient: "Imię i nazwisko pacjenta",
    household_title: "Kilka szybkich pytań",
    household_sub: "Tak dobieramy właściwą zniżkę. Nie zapisujemy Twoich odpowiedzi.",
    field_household: "Osoby w gospodarstwie domowym",
    field_income: "Roczny dochód gospodarstwa (przed podatkiem)",
    field_uninsured: "Czy nie masz ubezpieczenia?",
    yes: "Tak",
    no: "Nie",
    review_cta: "Zobacz, co mi przysługuje",

    result_calc: "Zgodnie z prawem stanu Illinois",
    result_off: "ZNIŻKI",
    result_qualify_full: "Prawdopodobnie przysługuje Ci zniżka {pct}%",
    result_under:
      "na mocy ustawy Illinois o zniżkach dla nieubezpieczonych pacjentów (210 ILCS 89).",
    result_notqualify_title: "Możesz nie kwalifikować się do zniżki",
    result_notqualify_sub:
      "Twój dochód przekracza 600% federalnego progu ubóstwa, czyli limit tego programu. Nadal możesz kwalifikować się do szpitalnej pomocy charytatywnej — zapytaj ich bezpośrednio.",
    math_title: "Wyliczenia — bez zgadywania",
    math_fpl: "Próg ubóstwa dla {size} osób ({year})",
    math_income: "Twój roczny dochód",
    math_pct: "To {pct}% progu ubóstwa",
    math_tier: "Twój próg zniżki",
    math_bill: "Pierwotny rachunek",
    math_discount: "Zniżka ({pct}%)",
    math_remaining: "Saldo po zniżce",
    cap_note:
      "Zgodnie z prawem szpital nie może pobrać więcej niż 20% Twojego rocznego dochodu ({cap}) w ciągu 12 miesięcy. Twój szacowany koszt jest ograniczony do {pay}.",
    estimate_youpay: "Twój szacowany koszt",
    presumptive_badge: "Prawdopodobne domniemane prawo",
    presumptive_note:
      "Przy Twoim dochodzie wiele szpitali przyznaje pełną ulgę automatycznie — często bez pełnego wniosku. Zapytaj o \"domniemane prawo\".",
    medicaid_badge: "Najpierw sprawdź Medicaid",
    medicaid_note:
      "Twój dochód może kwalifikować Cię do Medicaid w Illinois, które może pokryć cały rachunek. Szpitale muszą sprawdzić Medicaid przed zastosowaniem zniżki.",
    scale_title: "Pełna skala stanu Illinois",
    scale_col_income: "Dochód a próg ubóstwa",
    scale_col_discount: "Zniżka",
    result_cta: "Pobierz mój wniosek",
    result_back: "Edytuj moje dane",

    apply_title: "Twój wniosek jest gotowy",
    apply_sub:
      "Wypełniliśmy to, co wiemy. Wydrukuj lub zapisz, a potem wykonaj listę poniżej.",
    apply_download: "Pobierz / wydrukuj wniosek",
    apply_summary_title: "Wniosek o pomoc finansową — Podsumowanie",
    checklist_title: "Co zrobić dalej",
    checklist_1: "Wydrukuj lub zapisz wniosek powyżej.",
    checklist_2:
      "Zbierz dowód dochodu (ostatnie odcinki wypłaty, zeznanie podatkowe lub pismo o świadczeniach).",
    checklist_3:
      "Zbierz dokument ze zdjęciem i dowód adresu w Illinois (rachunek za media wystarczy).",
    checklist_4:
      "Wyślij go do szpitalnego działu pomocy finansowej / rozliczeń.",
    checklist_5:
      "Złóż przed terminem. Poproś szpital o wstrzymanie windykacji na czas rozpatrywania.",
    deadline_title: "Szacowany termin",
    deadline_days: "Zostało około {days} dni",
    deadline_soon: "Zostało tylko {days} dni — złóż wkrótce",
    deadline_expired: "Ten termin mógł minąć — zadzwoń do szpitala od razu; wiele udziela przedłużeń.",
    deadline_note:
      "Terminy różnią się w zależności od szpitala (często 60–240 dni od pierwszego rachunku). Potwierdź dokładną datę w szpitalu.",
    where_title: "Gdzie to wysłać",
    where_generic:
      "Skontaktuj się z działem pomocy finansowej lub rozliczeń szpitala. Jest podany na rachunku i na stronie szpitala.",
    restart: "Zacznij od nowa",
    print_generated: "Wygenerowano przez MediRelief IL",
    print_disclaimer:
      "To pomoc w przygotowaniu, nie porada prawna ani finansowa. O ostatecznym prawie decyduje szpital na mocy 210 ILCS 89.",

    disclaimer:
      "MediRelief IL to demonstracja. Podaje szacunki na podstawie publicznego prawa Illinois i niczego za Ciebie nie składa ani nie udziela porad prawnych.",
    lang_label: "Język",
  },

  tl: {
    _name: "Tagalog",
    _dir: "ltr",

    tagline: "Hanapin ang tulong sa bayarin sa ospital — sa ilang segundo.",
    step_upload: "I-scan",
    step_review: "Suriin",
    step_result: "Iyong tulong",
    step_apply: "Mag-apply",

    upload_title: "Kumuha ng litrato ng iyong bayarin sa ospital",
    upload_sub:
      "Binabasa namin ang bayarin at tinitingnan kung aling programa ng tulong sa Illinois ang makakapagbawas nito. Nananatili sa iyong device ang litrato.",
    upload_cta: "Pumili ng litrato o file",
    upload_or: "o",
    upload_sample: "Subukan gamit ang halimbawang bayarin",
    upload_privacy: "Walang ini-upload sa server. Lahat ay gumagana sa iyong browser.",

    scanning: "Binabasa ang iyong bayarin…",
    scanning_hospital: "Hinahanap ang ospital",
    scanning_balance: "Hinahanap ang halaga",
    scanning_dates: "Hinahanap ang mga petsa",

    review_title: "Ito ang nakita namin",
    review_sub: "Suriin ang mga detalye at itama ang anumang mali.",
    field_hospital: "Ospital",
    field_balance: "Halagang dapat bayaran",
    field_statement: "Petsa ng statement",
    field_account: "Account number",
    field_patient: "Pangalan ng pasyente",
    household_title: "Ilang mabilis na tanong",
    household_sub: "Ganito namin itinutugma ka sa tamang diskwento. Hindi namin sine-save ang iyong mga sagot.",
    field_household: "Bilang ng tao sa iyong sambahayan",
    field_income: "Taunang kita ng sambahayan (bago ang buwis)",
    field_uninsured: "Wala ka bang insurance?",
    yes: "Oo",
    no: "Hindi",
    review_cta: "Tingnan kung saan ako kwalipikado",

    result_calc: "Batay sa batas ng Illinois",
    result_off: "BAWAS",
    result_qualify_full: "Malamang kwalipikado ka sa {pct}% na diskwento",
    result_under:
      "sa ilalim ng Hospital Uninsured Patient Discount Act ng Illinois (210 ILCS 89).",
    result_notqualify_title: "Maaaring hindi ka kwalipikado sa diskwento",
    result_notqualify_sub:
      "Ang iyong kita ay lampas sa 600% ng federal poverty level, ang limitasyon ng programang ito. Maaari ka pa ring maging kwalipikado sa sariling charity care ng ospital — tanungin sila nang direkta.",
    math_title: "Ang komputasyon — walang hula",
    math_fpl: "Poverty level para sa {size} katao ({year})",
    math_income: "Ang iyong taunang kita",
    math_pct: "Iyon ay {pct}% ng poverty level",
    math_tier: "Ang iyong tier ng diskwento",
    math_bill: "Orihinal na bayarin",
    math_discount: "Diskwento ({pct}%)",
    math_remaining: "Balanse pagkatapos ng diskwento",
    cap_note:
      "Ayon sa batas, hindi maaaring maningil ang ospital ng higit sa 20% ng iyong taunang kita ({cap}) sa loob ng 12 buwan. Ang tinatayang gastos mo ay hanggang {pay} lamang.",
    estimate_youpay: "Ang tinatayang gastos mo",
    presumptive_badge: "Malamang na presumptive eligibility",
    presumptive_note:
      "Sa iyong kita, maraming ospital ang awtomatikong nagbibigay ng buong tulong — kadalasan nang walang buong aplikasyon. Magtanong tungkol sa \"presumptive eligibility.\"",
    medicaid_badge: "Tingnan muna ang Medicaid",
    medicaid_note:
      "Maaaring maging kwalipikado ka sa Medicaid ng Illinois, na maaaring sumaklaw sa buong bayarin. Dapat suriin ka ng ospital para sa Medicaid bago ilapat ang diskwento.",
    scale_title: "Ang buong sliding scale ng Illinois",
    scale_col_income: "Kita vs. poverty level",
    scale_col_discount: "Diskwento",
    result_cta: "Kunin ang aking aplikasyon",
    result_back: "I-edit ang aking mga detalye",

    apply_title: "Handa na ang iyong aplikasyon",
    apply_sub:
      "Pinunan namin ang alam namin. I-print o i-save, pagkatapos sundin ang checklist sa ibaba.",
    apply_download: "I-download / i-print ang aplikasyon",
    apply_summary_title: "Aplikasyon para sa Tulong Pinansyal — Buod",
    checklist_title: "Ano ang susunod na gagawin",
    checklist_1: "I-print o i-save ang aplikasyon sa itaas.",
    checklist_2:
      "Mangolekta ng patunay ng kita (kamakailang pay stub, tax return, o sulat ng benepisyo).",
    checklist_3:
      "Mangolekta ng isang photo ID at patunay ng address sa Illinois (pwede ang utility bill).",
    checklist_4:
      "Ipadala ito sa financial assistance / billing office ng ospital.",
    checklist_5:
      "Mag-apply bago ang deadline. Hilingin sa ospital na ihinto ang koleksyon habang nire-review.",
    deadline_title: "Tinatayang deadline",
    deadline_days: "Mga {days} araw na lang ang natitira",
    deadline_soon: "{days} araw na lang — mag-apply agad",
    deadline_expired: "Maaaring lumipas na ang deadline — tawagan agad ang ospital; marami ang nagbibigay ng extension.",
    deadline_note:
      "Ang mga deadline ay nag-iiba-iba sa bawat ospital (kadalasan 60–240 araw mula sa unang bayarin). Kumpirmahin ang eksaktong petsa sa ospital.",
    where_title: "Saan ipapadala",
    where_generic:
      "Kontakin ang Financial Assistance o Patient Billing department ng ospital. Nakalista ito sa iyong bayarin at sa website ng ospital.",
    restart: "Magsimula ulit",
    print_generated: "Ginawa ng MediRelief IL",
    print_disclaimer:
      "Isa itong tulong sa paghahanda, hindi legal o pinansyal na payo. Ang huling eligibility ay pinagpapasyahan ng ospital sa ilalim ng 210 ILCS 89.",

    disclaimer:
      "Ang MediRelief IL ay isang demo. Nagbibigay ito ng mga tantiya batay sa pampublikong batas ng Illinois at hindi nagsusumite ng anuman para sa iyo o nagbibigay ng legal na payo.",
    lang_label: "Wika",
  },
};

const I18n = {
  lang: "en",
  order: ["en", "es", "pl", "tl"],

  init() {
    let saved = null;
    try {
      saved = localStorage.getItem("medirelief_lang");
    } catch (e) {
      /* private mode — ignore */
    }
    if (saved && TRANSLATIONS[saved]) this.lang = saved;
    return this.lang;
  },

  set(lang) {
    if (!TRANSLATIONS[lang]) return;
    this.lang = lang;
    try {
      localStorage.setItem("medirelief_lang", lang);
    } catch (e) {
      /* ignore */
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = TRANSLATIONS[lang]._dir || "ltr";
  },

  /**
   * Translate a key, with optional {placeholder} substitution.
   */
  t(key, vars) {
    const dict = TRANSLATIONS[this.lang] || TRANSLATIONS.en;
    let str = dict[key];
    if (str == null) str = TRANSLATIONS.en[key];
    if (str == null) return key;
    if (vars) {
      str = str.replace(/\{(\w+)\}/g, (m, name) =>
        vars[name] != null ? vars[name] : m
      );
    }
    return str;
  },

  name(lang) {
    return (TRANSLATIONS[lang] || {})._name || lang;
  },
};

window.MediReliefI18n = I18n;
window.MediReliefTranslations = TRANSLATIONS;
