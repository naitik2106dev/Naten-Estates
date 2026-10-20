/* ==========================================================================
   NATEN ESTATES - APPOINTMENT & PRIVACY POLICY CONTROLLER
   Strict Appointment Form & Privacy Logic:
   1. Fields: Full Name, Phone Number, Property Interest (Dropdown), Preferred Time
   2. Mandatory Checkbox: "I agree to the Privacy Policy." (Form MUST NOT submit unless checked)
   3. Clickable "Privacy Policy" link opening dedicated Modal/Popup (No redirect)
   4. Exact Privacy Policy Text:
      "We collect your name and phone number strictly to contact you regarding
      your property inquiry and to schedule your appointment. Your data is secure
      and will never be shared with third parties."
   ========================================================================== */

const AppointmentManager = {
  // Primary Contact Info
  WHATSAPP_PRIMARY: "917011491747",
  PHONE_SECONDARY: "+91 7011683813",
  ADDRESS: "East Delhi, Delhi NCR, India - 110092",

  init() {
    this.bindGlobalTriggers();
    this.bindModals();
    this.populatePropertySelects();
  },

  // Bind global CTA buttons (e.g., in header, hero, property detail)
  bindGlobalTriggers() {
    document.querySelectorAll(".btn-trigger-appointment").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const prefillProperty = btn.getAttribute("data-property-title") || "";
        this.openAppointmentModal(prefillProperty);
      });
    });

    // Privacy policy modal openers (clickable link inside checkbox label)
    document.addEventListener("click", (e) => {
      if (e.target.matches(".privacy-modal-link") || e.target.closest(".privacy-modal-link")) {
        e.preventDefault();
        e.stopPropagation();
        this.openPrivacyModal();
      }
    });
  },

  // Open & Close Modal Helpers
  openAppointmentModal(preselectedTitle = "") {
    const modal = document.getElementById("appointmentModal");
    if (!modal) return;

    if (preselectedTitle) {
      const select = modal.querySelector('select[name="propertyInterest"]');
      if (select) {
        // Find matching option
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].text.includes(preselectedTitle) || select.options[i].value === preselectedTitle) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeAppointmentModal() {
    const modal = document.getElementById("appointmentModal");
    if (modal) {
      modal.classList.remove("active");
      // Only restore overflow if privacy modal isn't also open
      const privacyModal = document.getElementById("privacyModal");
      if (!privacyModal || !privacyModal.classList.contains("active")) {
        document.body.style.overflow = "";
      }
    }
  },

  openPrivacyModal() {
    const modal = document.getElementById("privacyModal");
    if (!modal) return;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closePrivacyModal() {
    const modal = document.getElementById("privacyModal");
    if (modal) {
      modal.classList.remove("active");
      // If appointment modal is still active behind it, keep body locked
      const appModal = document.getElementById("appointmentModal");
      if (!appModal || !appModal.classList.contains("active")) {
        document.body.style.overflow = "";
      }
    }
  },

  openSuccessModal(bookingDetails) {
    const modal = document.getElementById("bookingSuccessModal");
    if (!modal) return;

    // Fill in receipt details
    const refEl = modal.querySelector(".receipt-ref");
    const nameEl = modal.querySelector(".receipt-name");
    const phoneEl = modal.querySelector(".receipt-phone");
    const propEl = modal.querySelector(".receipt-property");
    const timeEl = modal.querySelector(".receipt-time");
    const waBtn = modal.querySelector(".btn-send-whatsapp-receipt");

    if (refEl) refEl.textContent = bookingDetails.refCode;
    if (nameEl) nameEl.textContent = bookingDetails.fullName;
    if (phoneEl) phoneEl.textContent = bookingDetails.phone;
    if (propEl) propEl.textContent = bookingDetails.propertyInterest;
    if (timeEl) timeEl.textContent = `${bookingDetails.date} (${bookingDetails.timeSlot})`;

    if (waBtn) {
      const waText = encodeURIComponent(
        `Hello Naten Estates, I have booked a private viewing appointment!\n\n` +
        `Ref ID: ${bookingDetails.refCode}\n` +
        `Name: ${bookingDetails.fullName}\n` +
        `Phone: ${bookingDetails.phone}\n` +
        `Property: ${bookingDetails.propertyInterest}\n` +
        `Preferred Slot: ${bookingDetails.date} (${bookingDetails.timeSlot})\n\n` +
        `Please confirm our schedule. Thank you!`
      );
      waBtn.href = `https://wa.me/${this.WHATSAPP_PRIMARY}?text=${waText}`;
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeSuccessModal() {
    const modal = document.getElementById("bookingSuccessModal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  },

  bindModals() {
    // Backdrop clicks to close
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.classList.remove("active");
          // If no modals remain open, unlock body
          const anyActive = document.querySelector(".modal-overlay.active");
          if (!anyActive) {
            document.body.style.overflow = "";
          }
        }
      });
    });

    // Close buttons
    document.querySelectorAll(".modal-close, .btn-modal-dismiss").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const parentModal = btn.closest(".modal-overlay");
        if (parentModal) {
          parentModal.classList.remove("active");
          const anyActive = document.querySelector(".modal-overlay.active");
          if (!anyActive) {
            document.body.style.overflow = "";
          }
        }
      });
    });

    // ESC key closes topmost modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const privacyModal = document.getElementById("privacyModal");
        if (privacyModal && privacyModal.classList.contains("active")) {
          this.closePrivacyModal();
          return;
        }
        const appModal = document.getElementById("appointmentModal");
        if (appModal && appModal.classList.contains("active")) {
          this.closeAppointmentModal();
          return;
        }
        const successModal = document.getElementById("bookingSuccessModal");
        if (successModal && successModal.classList.contains("active")) {
          this.closeSuccessModal();
          return;
        }
      }
    });

    // Setup form submit handlers
    const modalForm = document.getElementById("modalAppointmentForm");
    if (modalForm) {
      this.attachFormValidation(modalForm, true);
    }
  },

  // Populate dynamic property dropdowns
  populatePropertySelects() {
    const selects = document.querySelectorAll('select[name="propertyInterest"]');
    if (!selects.length || typeof PROPERTIES_DATA === "undefined") return;

    selects.forEach(select => {
      // Keep first default option
      const defaultOption = select.firstElementChild;
      select.innerHTML = "";
      if (defaultOption) select.appendChild(defaultOption);

      // Add general consultation option
      const generalOpt = document.createElement("option");
      generalOpt.value = "General Advisory Consultation (East Delhi)";
      generalOpt.textContent = "General Advisory Consultation (East Delhi)";
      select.appendChild(generalOpt);

      // Add each property
      PROPERTIES_DATA.forEach(p => {
        const opt = document.createElement("option");
        opt.value = `${p.title} (${p.location})`;
        opt.textContent = `${p.title} - ${p.priceDisplay}`;
        select.appendChild(opt);
      });
    });
  },

  // Attach strict form validation to any appointment form (Modal or Detail page)
  attachFormValidation(form, isModal = false) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // 1. Full Name Validation
      const nameInput = form.querySelector('input[name="fullName"]');
      const nameError = form.querySelector('.error-fullName');
      if (nameInput) {
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
          nameInput.classList.add("error");
          if (nameError) nameError.classList.add("visible");
          isValid = false;
        } else {
          nameInput.classList.remove("error");
          if (nameError) nameError.classList.remove("visible");
        }
      }

      // 2. Phone Number Validation (Indian 10-digit mobile check)
      const phoneInput = form.querySelector('input[name="phone"]');
      const phoneError = form.querySelector('.error-phone');
      if (phoneInput) {
        const rawDigits = phoneInput.value.replace(/[^0-9]/g, "");
        // Indian phone numbers are 10 digits (or 11/12 with leading 0 or 91)
        const isTenDigits = rawDigits.length === 10 || (rawDigits.length > 10 && rawDigits.endsWith(rawDigits.slice(-10)));
        if (!isTenDigits) {
          phoneInput.classList.add("error");
          if (phoneError) phoneError.classList.add("visible");
          isValid = false;
        } else {
          phoneInput.classList.remove("error");
          if (phoneError) phoneError.classList.remove("visible");
        }
      }

      // 3. Property Interest Selection
      const propertySelect = form.querySelector('select[name="propertyInterest"]');
      const propertyError = form.querySelector('.error-property');
      if (propertySelect) {
        if (!propertySelect.value) {
          propertySelect.classList.add("error");
          if (propertyError) propertyError.classList.add("visible");
          isValid = false;
        } else {
          propertySelect.classList.remove("error");
          if (propertyError) propertyError.classList.remove("visible");
        }
      }

      // 4. Preferred Time / Date
      const dateInput = form.querySelector('input[name="preferredDate"]');
      const timeSlotSelect = form.querySelector('select[name="timeSlot"]');
      const timeError = form.querySelector('.error-time');
      if (dateInput && timeSlotSelect) {
        if (!dateInput.value || !timeSlotSelect.value) {
          if (!dateInput.value) dateInput.classList.add("error");
          if (!timeSlotSelect.value) timeSlotSelect.classList.add("error");
          if (timeError) timeError.classList.add("visible");
          isValid = false;
        } else {
          dateInput.classList.remove("error");
          timeSlotSelect.classList.remove("error");
          if (timeError) timeError.classList.remove("visible");
        }
      }

      // 5. STRICT MANDATORY PRIVACY POLICY CHECKBOX LOGIC
      const privacyCheck = form.querySelector('input[name="privacyConsent"]');
      const privacyBox = form.querySelector('.checkbox-group');
      const privacyError = form.querySelector('.error-privacy');

      if (!privacyCheck || !privacyCheck.checked) {
        isValid = false;
        if (privacyBox) privacyBox.classList.add("has-error");
        if (privacyError) privacyError.classList.add("visible");
      } else {
        if (privacyBox) privacyBox.classList.remove("has-error");
        if (privacyError) privacyError.classList.remove("visible");
      }

      // If invalid, stop execution immediately
      if (!isValid) {
        return;
      }

      // Gather booking data
      const refCode = "NATEN-" + Math.floor(100000 + Math.random() * 900000);
      const bookingData = {
        refCode,
        fullName: nameInput ? nameInput.value.trim() : "Valued Client",
        phone: phoneInput ? phoneInput.value.trim() : "",
        propertyInterest: propertySelect ? propertySelect.value : "East Delhi Portfolio",
        date: dateInput ? dateInput.value : "Upcoming Date",
        timeSlot: timeSlotSelect ? timeSlotSelect.value : "Day Slot"
      };

      // Reset form fields
      form.reset();

      // Close modal if triggered from modal
      if (isModal) {
        this.closeAppointmentModal();
      }

      // Open Success Confirmation modal with WhatsApp link
      this.openSuccessModal(bookingData);
    });

    // Remove error highlights on input change
    form.querySelectorAll("input, select").forEach(input => {
      input.addEventListener("input", () => {
        input.classList.remove("error");
        const err = form.querySelector(`.error-${input.name}`);
        if (err) err.classList.remove("visible");
      });
      input.addEventListener("change", () => {
        input.classList.remove("error");
        const err = form.querySelector(`.error-${input.name}`);
        if (err) err.classList.remove("visible");
      });
    });

    const privCheck = form.querySelector('input[name="privacyConsent"]');
    if (privCheck) {
      privCheck.addEventListener("change", () => {
        const privacyBox = form.querySelector('.checkbox-group');
        const privacyError = form.querySelector('.error-privacy');
        if (privCheck.checked) {
          if (privacyBox) privacyBox.classList.remove("has-error");
          if (privacyError) privacyError.classList.remove("visible");
        }
      });
    }
  }
};
