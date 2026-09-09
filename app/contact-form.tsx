"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LineArrow } from "./line-arrow";

export function ContactForm() {
  return <form className="contact-form" action="https://formsubmit.co/amir.shamani@gmail.com" method="POST" aria-labelledby="contact-form-title">
    <h3 id="contact-form-title">Send a message</h3>
    <input type="hidden" name="_subject" value="New portfolio enquiry — Amir Shamani" />
    <input type="hidden" name="_template" value="table" />
    <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" type="text" name="_honey" tabIndex={-1} autoComplete="off" /></div>
    <div className="contact-form-fields">
      <div><label htmlFor="contact-name">Name</label><Input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} pattern=".*\S.*" /></div>
      <div><label htmlFor="contact-email">Email address</label><Input id="contact-email" type="email" name="email" autoComplete="email" required maxLength={254} /></div>
      <div className="contact-message"><label htmlFor="contact-message">Message</label><Textarea id="contact-message" name="message" required minLength={10} maxLength={5000} rows={6} aria-describedby="contact-message-hint" /><p id="contact-message-hint">Write your message in 10–5,000 characters.</p></div>
    </div>
    <div className="contact-form-footer"><Button type="submit">Send message<LineArrow /></Button><p>Your name, email and message are sent via <a href="https://formsubmit.co/" target="_blank" rel="noreferrer">FormSubmit</a>. A security check may appear before sending.</p></div>
  </form>;
}
