"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/social-icons";
import { submitContactMessage } from "@/actions/contact.actions";
import { toast } from "sonner";

export function Contact({ socialLinks = [] }: { socialLinks?: any[] }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    
    if (Object.keys(errs).length === 0) {
      setIsLoading(true);
      try {
        const res = await submitContactMessage(form);
        if (res.success) {
          setSubmitted(true);
          setForm({ name: "", email: "", subject: "", message: "" });
          setTimeout(() => {
            setSubmitted(false);
          }, 3000);
        } else {
          toast.error(res.error || "Failed to send message");
        }
      } catch (err) {
        toast.error("Failed to send message");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const dynamicSocialInfo = socialLinks.map(link => {
    let Icon: any = GithubIcon;
    if (link.icon === "LinkedinIcon") Icon = LinkedinIcon;
    if (link.icon === "TwitterIcon") Icon = TwitterIcon;
    
    return {
      icon: Icon,
      label: link.platform,
      value: link.platform,
      href: link.url,
    };
  });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "patelpranay2004@gmail.com",
      href: "mailto:patelpranay2004@gmail.com",
    },
    ...dynamicSocialInfo,
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: undefined,
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-[128px]" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Get In Touch" subtitle="Contact" />

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl 2xl:max-w-7xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <h3 className="text-lg font-semibold mb-2">
              Let&apos;s work together
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              I&apos;m always interested in hearing about new opportunities,
              projects, and collaborations. Feel free to reach out!
            </p>

            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      target={
                        info.href.startsWith("mailto") ? undefined : "_blank"
                      }
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-[#3B82F6]/20 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0 group-hover:bg-[#3B82F6]/20 transition-colors">
                        <Icon className="w-4 h-4 text-[#3B82F6]" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {info.label}
                        </div>
                        <div className="text-sm font-medium">{info.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
                      <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#3B82F6]" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {info.label}
                        </div>
                        <div className="text-sm font-medium">{info.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-[#10B981] mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Thanks for reaching out. I&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5"
                        >
                          Name
                        </label>
                        <Input
                          id="contact-name"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className={`min-h-[44px] bg-foreground/5 border-foreground/10 ${
                            errors.name ? "border-red-500" : ""
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5"
                        >
                          Email
                        </label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className={`min-h-[44px] bg-foreground/5 border-foreground/10 ${
                            errors.email ? "border-red-500" : ""
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5"
                      >
                        Subject
                      </label>
                      <Input
                        id="contact-subject"
                        placeholder="What's this about?"
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        className={`min-h-[44px] bg-foreground/5 border-foreground/10 ${
                          errors.subject ? "border-red-500" : ""
                        }`}
                      />
                      {errors.subject && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5"
                      >
                        Message
                      </label>
                      <Textarea
                        id="contact-message"
                        placeholder="Tell me about your project..."
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className={`min-h-[120px] p-3 bg-foreground/5 border-foreground/10 resize-none ${
                          errors.message ? "border-red-500" : ""
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full min-h-[44px] bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg shadow-blue-500/20 cursor-pointer"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
