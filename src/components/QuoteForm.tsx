"use client";
// TODO test this and check emailjs types — might need to add @types/emailjs__browser or something similar
import emailjs from "@emailjs/browser";
import { useState } from "react";

const TOTAL_STEPS = 3;
const WA_NUMBER = "233243953617"; // +233 24 395 3619

type Status = "idle" | "sending" | "success" | "email-error";

interface FormData {
  hear: string;
  event: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
}

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState<FormData>({
    hear: "Google",
    event: "Wedding",
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  function update(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function goTo(i: number) {
    setStep(Math.max(0, Math.min(i, TOTAL_STEPS - 1)));
  }

  function buildWhatsAppMessage(data: FormData) {
    return [
      "📸 *New Enquiry — verdictTwo Photography*",
      "─────────────────────",
      `*Name:* ${data.name}`,
      `*Email:* ${data.email}`,
      `*Phone:* ${data.phone || "Not provided"}`,
      `*Event:* ${data.event}`,
      `*Date / Season:* ${data.date || "Not specified"}`,
      `*How they heard:* ${data.hear}`,
      "─────────────────────",
      `*Message:*\n${data.message || "No additional message."}`,
    ].join("\n");
  }

  async function handleSubmit() {
    setStatus("sending");

    const waText = buildWhatsAppMessage(formData);
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`;

    // Send email via EmailJS — non-blocking; WhatsApp always opens
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          event: formData.event,
          hear: formData.hear,
          date: formData.date || "Not specified",
          message: formData.message || "No additional message.",
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      );
      setStatus("success");
    } catch {
      // EmailJS failed — still open WhatsApp and show a soft warning
      setStatus("email-error");
    }

    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  function handleNext() {
    if (step < TOTAL_STEPS - 1) {
      goTo(step + 1);
    } else {
      handleSubmit();
    }
  }

  return (
    <section className="section" id="quote">
      <div className="container">
        <p className="section__label text-center">Enquire</p>
        <h2 className="section__title text-center">Get your quote today</h2>
        <p
          className="section__lead text-center"
          style={{ marginInline: "auto", marginBottom: "2rem" }}
        >
          Tell us how you found us and what you are celebrating—we will follow
          up with availability and clear pricing.
        </p>
        <div className="quote-section">
          {status === "success" || status === "email-error" ? (
            <div
              className="form-success"
              style={{ textAlign: "center", padding: "2rem 0" }}
            >
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                Thank you, {formData.name}!
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                Your WhatsApp message is ready — just press{" "}
                <strong>Send</strong> in the tab that just opened.
              </p>
              {status === "email-error" && (
                <p
                  style={{
                    fontSize: "0.875rem",
                    opacity: 0.65,
                    marginTop: "0.5rem",
                  }}
                >
                  Note: the email copy couldn&apos;t be sent right now, but your
                  WhatsApp message went through fine.
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="form-steps">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    type="button"
                    className={step === i ? "is-active" : ""}
                    onClick={() => goTo(i)}
                  >
                    Step {i + 1}
                  </button>
                ))}
              </div>
              <form className="quote-form" onSubmit={(e) => e.preventDefault()}>
                <div className={`form-panel${step === 0 ? " is-active" : ""}`}>
                  <label htmlFor="hear">How did you hear about us?</label>
                  <select
                    id="hear"
                    name="hear"
                    value={formData.hear}
                    onChange={(e) => update("hear", e.target.value)}
                  >
                    <option>Google</option>
                    <option>Instagram</option>
                    <option>Word of mouth</option>
                    <option>Family / friend</option>
                    <option>Vendor / supplier</option>
                    <option>Other</option>
                  </select>
                  <label htmlFor="event">Event type</label>
                  <select
                    id="event"
                    name="event"
                    value={formData.event}
                    onChange={(e) => update("event", e.target.value)}
                  >
                    <option>Wedding</option>
                    <option>Engagement</option>
                    <option>Anniversary</option>
                    <option>Proposal</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className={`form-panel${step === 1 ? " is-active" : ""}`}>
                  <div className="grid-2">
                    <div>
                      <label htmlFor="name">Your name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={(e) => update("name", e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                    </div>
                  </div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </div>

                <div className={`form-panel${step === 2 ? " is-active" : ""}`}>
                  <label htmlFor="date">Event date (or season)</label>
                  <input
                    id="date"
                    name="date"
                    type="text"
                    placeholder="e.g. March 2027"
                    value={formData.date}
                    onChange={(e) => update("date", e.target.value)}
                  />
                  <label htmlFor="msg">Tell us about your day</label>
                  <textarea
                    id="msg"
                    name="message"
                    placeholder="Venue, guest count, anything we should know"
                    value={formData.message}
                    onChange={(e) => update("message", e.target.value)}
                  ></textarea>
                </div>

                <div className="form-nav">
                  <button
                    type="button"
                    className="btn btn--outline"
                    style={{
                      color: "var(--text)",
                      borderColor: "var(--border)",
                      visibility: step === 0 ? "hidden" : "visible",
                    }}
                    onClick={() => goTo(step - 1)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn--primary"
                    disabled={status === "sending"}
                    onClick={handleNext}
                  >
                    {status === "sending"
                      ? "Sending…"
                      : step === TOTAL_STEPS - 1
                        ? "Submit"
                        : "Next"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
