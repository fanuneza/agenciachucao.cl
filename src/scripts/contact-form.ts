import { trackEvent } from "./analytics";

const FIELD_IDS = ["nombre", "clinica", "phone", "tratamiento"] as const;
type FieldId = (typeof FIELD_IDS)[number];

const FIELD_MESSAGES: Record<FieldId, string> = {
  nombre: "Ingresa tu nombre.",
  clinica: "Ingresa el nombre de la clínica.",
  phone: "Ingresa un teléfono chileno válido.",
  tratamiento: "Selecciona el tratamiento principal.",
};

function normalizePhone(value: string): string {
  return value.replace(/\s+/g, "").trim();
}

function isValidChilePhone(value: string): boolean {
  const phone = normalizePhone(value);
  if (!phone) return false;
  // Mobile: +569XXXXXXXX or 9XXXXXXXX (optionally grouped with spaces).
  // Landline Santiago: +562XXXXXXXX or 2XXXXXXXX.
  return /^(\+?56)?(9\d{8}|2\d{8})$/.test(phone);
}

function getFieldElements(form: ParentNode, id: FieldId) {
  const field = form.querySelector<HTMLElement>(`#${id}`);
  const error = form.querySelector<HTMLElement>(`#err-${id}`);
  const group = field?.closest(".contact-form__group") as HTMLElement | null;
  return { field, error, group };
}

function showFieldError(form: ParentNode, id: FieldId, message: string): void {
  const { error, group } = getFieldElements(form, id);
  if (error) {
    error.textContent = message;
    error.classList.add("contact-form__error--visible");
  }
  group?.classList.add("contact-form__group--invalid");
}

function clearFieldError(form: ParentNode, id: FieldId): void {
  const { error, group } = getFieldElements(form, id);
  if (error) {
    error.textContent = "";
    error.classList.remove("contact-form__error--visible");
  }
  group?.classList.remove("contact-form__group--invalid");
}

function clearAllErrors(form: ParentNode): void {
  FIELD_IDS.forEach((id) => clearFieldError(form, id));
}

function validateField(form: HTMLFormElement, id: FieldId): boolean {
  const data = new FormData(form);
  const value = String(data.get(id) ?? "").trim();
  let valid = true;

  if (!value) {
    showFieldError(form, id, FIELD_MESSAGES[id]);
    valid = false;
  } else if (id === "phone" && !isValidChilePhone(value)) {
    showFieldError(form, id, "Usa un número chileno válido, por ejemplo +56 9 1234 5678.");
    valid = false;
  } else {
    clearFieldError(form, id);
  }

  return valid;
}

function validateAllFields(form: HTMLFormElement): boolean {
  let valid = true;
  FIELD_IDS.forEach((id) => {
    if (!validateField(form, id)) {
      valid = false;
    }
  });
  return valid;
}

function focusFirstInvalidField(form: HTMLFormElement): void {
  const firstInvalid = FIELD_IDS.map((id) => getFieldElements(form, id).field).find((field) =>
    field?.closest(".contact-form__group")?.classList.contains("contact-form__group--invalid")
  );
  firstInvalid?.focus();
}

function setSubmitting(button: HTMLButtonElement | null, submitting: boolean): void {
  if (!button) return;
  button.disabled = submitting;
  button.textContent = submitting ? "Enviando…" : button.dataset.label || "Solicita una revisión gratis";
}

function showFormStatus(status: HTMLElement | null, message: string, type: "error" | "success"): void {
  if (!status) return;
  status.textContent = message;
  status.className = `contact-form__status contact-form__status--${type}`;
}

function clearFormStatus(status: HTMLElement | null): void {
  if (!status) return;
  status.textContent = "";
  status.className = "contact-form__status";
}

export function initContactForm(): void {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;

  if (!form || form.dataset.bound === "true") {
    return;
  }

  form.dataset.bound = "true";

  const submitButton = document.getElementById("form-submit-btn") as HTMLButtonElement | null;
  const statusMessage = document.getElementById("form-status");
  const successMessage = document.getElementById("form-success");

  FIELD_IDS.forEach((id) => {
    const { field } = getFieldElements(form, id);
    if (!field) return;

    field.addEventListener("blur", () => {
      validateField(form, id);
    });

    field.addEventListener("input", () => {
      if (field.closest(".contact-form__group--invalid")) {
        validateField(form, id);
      }
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearAllErrors(form);
    clearFormStatus(statusMessage);

    if (!validateAllFields(form)) {
      focusFirstInvalidField(form);
      return;
    }

    if (form.dataset.submitting === "true") {
      return;
    }

    form.dataset.submitting = "true";
    setSubmitting(submitButton, true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        body: new FormData(form),
        method: "POST",
      });

      const json = (await response.json()) as { message?: string; success?: boolean };

      if (!response.ok || !json.success) {
        throw new Error(json.message ?? "Error desconocido");
      }

      form.hidden = true;
      successMessage?.removeAttribute("hidden");
      successMessage?.focus();
      trackEvent("generate_lead", { form_name: "audit_request" });
    } catch {
      showFormStatus(
        statusMessage,
        "No pudimos enviar el formulario. Intenta de nuevo o escríbenos por WhatsApp.",
        "error"
      );
      setSubmitting(submitButton, false);
      form.dataset.submitting = "false";
    }
  });
}
