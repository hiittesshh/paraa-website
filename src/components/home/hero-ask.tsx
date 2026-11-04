"use client";

// The hero's quick start: one field and one button. It's a real link to the form underneath, so with
// no JavaScript the button still goes there; the script just carries the number across.
import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroAsk() {
  const [phone, setPhone] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (phone.trim()) window.dispatchEvent(new CustomEvent("paraa:prefill", { detail: { phone: phone.trim() } }));
    document.getElementById("ask")?.scrollIntoView();
  }

  return (
    <form
      action="#ask"
      onSubmit={onSubmit}
      className="flex w-full max-w-[440px] items-center rounded-full border border-foreground/25 bg-ink-900/75 p-1 pl-5 focus-within:border-foreground/60"
    >
      <label htmlFor="hero-phone" className="sr-only">
        Your mobile number
      </label>
      <input
        id="hero-phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="Your mobile number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="h-11 min-w-0 flex-1 bg-transparent text-body-lg text-foreground outline-none placeholder:text-grey-300"
      />
      <Button type="submit" className="group">
        Ask a question
        <ArrowRight aria-hidden className="transition-transform duration-150 ease-out-soft group-hover:translate-x-1" />
      </Button>
    </form>
  );
}
