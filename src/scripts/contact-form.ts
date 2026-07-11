import { trackEvent } from "./analytics";

function showFieldError(form: ParentNode, id: string, message: string): void {
  const error = form.querySelector<HTMLElement>(`#err-${id}`);
  const field = form.querySelector<HTMLElement>(`#${id}`);
  const group = field?.closest(".contact-form__group") as HTMLElement | null;

  if (error) {
    error.textContent = message;
    error.classList.add("contact-form__error--visible");
  }

  group?.classList.add("contact-form__group--invalid");
}

function clearFormErrors(form: ParentNode): void {
  form.querySelectorAll<HTMLElement>(".contact-form__error").forEach((error) => {
    error.textContent = "";
    error.classList.remove("contact-form__error--visible");
  });

  form.querySelectorAll<HTMLElement>(".contact-form__group").forEach((group) => {
    group.classList.remove("contact-form__group--invalid");
  });
}

function validateContactForm(form: HTMLFormElement, data: FormData): boolean {
  let valid = true;

  if (!String(data.get("clinica") ?? "").trim()) {
    showFieldError(form, "clinica", "Ingresa el nombre de la clínica.");
    valid = false;
  }

  if (!String(data.get("nombre") ?? "").trim()) {
    showFieldError(form, "nombre", "Ingresa tu nombre.");
    valid = false;
  }

  const phone = String(data.get("phone") ?? "").trim();
  if (!phone) {
    showFieldError(form, "phone", "Ingresa tu teléfono.");
    valid = false;
  } else if (!/^[+\d\s\-()]{7,}$/.test(phone)) {
    showFieldError(form, "phone", "El teléfono no parece válido.");
    valid = false;
  }

  if (!String(data.get("tratamiento") ?? "").trim()) {
    showFieldError(form, "tratamiento", "Selecciona el tratamiento principal.");
    valid = false;
  }

  return valid;
}

export function initContactForm(): void {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;

  if (!form || form.dataset.bound === "true") {
    return;
  }

  form.dataset.bound = "true";

  const submitButton = document.getElementById("form-submit-btn") as HTMLButtonElement | null;
  const successMessage = document.getElementById("form-success");
  const statusMessage = document.getElementById("form-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearFormErrors(form);

    const data = new FormData(form);
    if (!validateContactForm(form, data)) {
      return;
    }

    if (statusMessage) {
      statusMessage.textContent = "";
      statusMessage.className = "contact-form__status";
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando…";
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        body: data,
        method: "POST",
      });

      const json = (await response.json()) as { message?: string; success?: boolean };

      if (!response.ok || !json.success) {
        throw new Error(json.message ?? "Error desconocido");
      }

      form.hidden = true;
      successMessage?.removeAttribute("hidden");
      trackEvent("generate_lead", { form_name: "audit_request" });
    } catch {
      if (statusMessage) {
        statusMessage.textContent = "Hubo un problema al enviar. Por favor usa WhatsApp.";
        statusMessage.className = "contact-form__status contact-form__status--error";
      }

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Solicita una revisión gratis";
      }
    }
  });
}
