import PageHero from "@/components/ui/PageHero";
import Icon from "@/components/ui/Icon";
import { SITE } from "@/lib/constants";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  const cards = [
    { icon: "mail", title: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: "phone", title: "Phone / WhatsApp", value: SITE.phone, href: `https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP || "96176708604")}` },
    { icon: "pin", title: "Location", value: SITE.address }
  ];
  return (
    <>
      <PageHero eyebrow="SAVÉMOI · Contact" title={<>We&apos;d love to <em>hear from you</em></>} sub="Our team responds within 24 hours." />
      <div className="wrap-md section">
        <div className="grid-3">
          {cards.map((c) => (
            <div className="info-card center" key={c.title} style={{ alignItems: "center" }}>
              <div className="icon-circle"><Icon name={c.icon} /></div>
              <span className="tag">{c.title}</span>
              {c.href ? (
                <a className="title text-link" href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{c.value}</a>
              ) : (
                <span className="title">{c.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
