import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { GlassCard } from "@/components/primitives/glass-card";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";
import { profile } from "@/data/content";
import { ScrollReveal, RevealItem } from "@/components/motion/scroll-reveal";

export function Contact() {
  return (
    <Section id="contact" className="relative">
      <Container>
        <SectionHeader
          eyebrow="Let's talk"
          title="Have an idea? Let's build it."
          description="Open to ML/AI roles, freelance projects, research collaborations, and the occasional good coffee chat."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-5" staggerChildren={0.08}>
            <RevealItem>
              <GlassCard interactive={false} className="p-7 md:p-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Direct
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-3 block font-display text-2xl font-semibold tracking-tight transition hover:text-gradient md:text-3xl"
                >
                  {profile.email}
                </a>
                <p className="mt-4 text-sm text-muted-foreground">
                  Based in {profile.location}. Available for remote and hybrid
                  collaborations across timezones.
                </p>
                <div className="mt-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Elsewhere
                  </p>
                  <SocialLinks className="mt-3" />
                </div>
              </GlassCard>
            </RevealItem>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-7">
            <GlassCard interactive={false} className="p-7 md:p-10">
              <ContactForm />
            </GlassCard>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
