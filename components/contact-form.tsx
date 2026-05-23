"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormInput } from "@/lib/validators";
import { submitContact, type ContactFormState } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<ContactFormState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: ContactFormInput) => {
    startTransition(async () => {
      const result = await submitContact(values);
      setState(result);
      if (result.status === "success") reset();
    });
  };

  // Success state takes over the form area
  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 rounded-2xl border border-success/30 bg-success/5 p-10 text-center"
      >
        <div className="grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tight">
          {state.via === "email" ? "Message on its way." : "Message received."}
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          {state.via === "email"
            ? "Thanks for reaching out. I'll get back to you shortly."
            : "Thanks — I've got your note. I'll be in touch soon."}
        </p>
        <Button
          variant="outline"
          onClick={() => setState({ status: "idle" })}
          className="mt-2"
        >
          Send another
        </Button>
      </motion.div>
    );
  }

  // Fallback: form submitted but neither DB nor SMTP available — show mailto bridge
  if (state.status === "fallback") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 rounded-2xl border border-accent-3/30 bg-accent-3/5 p-10"
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-3">
          One more step
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tight">
          Open in your email app
        </h3>
        <p className="text-sm text-muted-foreground">
          The contact form is being configured. In the meantime, your message is
          ready to send via your default email client.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild variant="primary">
            <a href={state.mailtoHref}>
              <Mail className="h-4 w-4" />
              Open email
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" onClick={() => setState({ status: "idle" })}>
            Back
          </Button>
        </div>
      </motion.div>
    );
  }

  const errorBag = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!(errors.name || errorBag?.name)}
            {...register("name")}
          />
          <FieldError msg={errors.name?.message ?? errorBag?.name} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@domain.com"
            autoComplete="email"
            aria-invalid={!!(errors.email || errorBag?.email)}
            {...register("email")}
          />
          <FieldError msg={errors.email?.message ?? errorBag?.email} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="What are you building? Where might we collaborate?"
          aria-invalid={!!(errors.message || errorBag?.message)}
          {...register("message")}
        />
        <FieldError msg={errors.message?.message ?? errorBag?.message} />
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="text-xs text-muted-foreground">
          I read every message — usually reply within 48 hours.
        </p>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={pending}
          className={cn(pending && "cursor-progress")}
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send message
              <ArrowUpRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {state.status === "error" && !errorBag && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger"
          >
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence mode="wait">
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-xs text-danger"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
