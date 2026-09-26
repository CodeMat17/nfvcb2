import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import {
  Banknote,
  Building,
  CreditCard,
  Download,
  ShieldAlert,
  Clock,
  BadgeCheck,
  Wallet,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { CTA, Callout, PageHero, Panel, SectionHeading } from "@/components/site/kit";

export const metadata: Metadata = pageMetadata({
  title: "RevOP Payment Guide",
  description:
    "How to generate a bill and pay NFVCB fees on the Federal Government RevOP portal — online, by card, or at any bank branch.",
  path: "/services/payments",
});

type Step = { title: string; body: string; note?: string; list?: string[] };

const generate: Step[] = [
  {
    title: "Visit the RevOP Portal",
    body: "Go to revop.gov.ng in your browser. You will see the RevOP homepage with two main options on the landing page.",
    note: "Click “Generate a Bill”.",
  },
  {
    title: "Search for and Select Your Biller",
    body: "A Billers List will appear. Use the search bar to find “NATIONAL FILM AND VIDEO CENSORS BOARD”. Click on your biller to proceed.",
    note: "If you already have a bill reference number, click “Click here to pay” at the top-right of the page to skip straight to payment.",
  },
  {
    title: "Enter Bill Details",
    body: "On the Bill Details screen (Step 1 of 2), fill in what the payment is for, the amount, the quantity, the GIFMIS Code if applicable, and a narration for the bill.",
    note: "You can click “+ Add Another Payment Item” to include multiple items on the same bill, then click “Next”.",
    list: ["What the payment is for", "Amount", "Quantity", "GIFMIS Code (if applicable)", "Narration / description for the bill"],
  },
  {
    title: "Enter Customer Information",
    body: "On the Customer Information screen (Step 2 of 2), complete your payer details and validate your ID.",
    note: "You must click the “Validate” button after entering your ID Number. If you do not have a valid ID, select “Not Available” as the ID Type and proceed without validation.",
    list: [
      "Payer type — Individual or Corporate",
      "First Name and Last Name",
      "ID Type (e.g. NIN, Passport, Driver's License)",
      "ID Number — then click Validate",
      "Phone Number",
      "Email",
      "Address",
    ],
  },
  {
    title: "Review the Bill Preview and Confirm",
    body: "A “Confirm Bill” dialog will appear showing the item description, quantity, rate, and total amount in Naira. Review all details carefully, then click “Create Bill”.",
    note: "Warning: creating a bill is irreversible. Once confirmed, it cannot be undone.",
  },
  {
    title: "Save Your Bill Reference Number",
    body: "Your bill is now generated. The portal displays your unique Bill Reference Number at the top of the screen. Click “View Invoice” to see the full invoice, or “Download” to save a PDF copy including full payment instructions for all channels.",
    note: "Important: copy or note down your Bill Reference Number — you will need it to make payment.",
  },
];

const pay: Step[] = [
  {
    title: "Initiate Payment",
    body: "You can pay immediately after generating the bill by clicking the green “Make ₦X Payment” button at the bottom of the bill screen.",
    note: "Alternatively, return to revop.gov.ng, click “Pay a Bill”, enter your Bill Reference Number, and click “Pay Bill”.",
  },
  {
    title: "Choose a Payment Method",
    body: "A Payment Method dialog will appear with three options — Bank Transfer, Card, or Bank Branch.",
  },
  {
    title: "Confirm and Complete Payment",
    body: "A summary screen will show the total amount due and notify you that a service charge will be added to the bill amount. Click “Pay Bill” and follow your chosen channel's instructions to authorise the transaction.",
    note: "Note: part-payment is not enabled. Always pay the exact total charge shown on your bill.",
  },
];

const channels = [
  {
    icon: Banknote,
    title: "Bank Transfer",
    body: "Transfer the exact amount to the account details generated for you within the time limit shown on screen.",
  },
  {
    icon: CreditCard,
    title: "Card",
    body: "Select Card, then choose Credo by eTranzact as the payment option. Click “Continue”, enter your card details, and click “Proceed” to complete payment.",
  },
  {
    icon: Building,
    title: "Bank Branch",
    body: "Walk into any bank branch closest to you and present your downloaded bill invoice for payment.",
  },
];

const reminders = [
  { icon: BadgeCheck, title: "Validate your ID", body: "Always click the Validate button after entering your ID number. If you have no valid ID, choose “Not Available”." },
  { icon: Wallet, title: "Save your bill reference", body: "Copy it immediately after generation. You will need it to pay or retrieve your receipt later." },
  { icon: Clock, title: "Transfer time limit", body: "Bank transfers must be completed within the time window shown on your invoice or the payment will expire." },
  { icon: Banknote, title: "Full payment only", body: "Part-payment is not enabled. Always pay the exact total charge shown on your bill." },
  { icon: Download, title: "Download your invoice", body: "The downloaded PDF shows full payment instructions for online, bank transfer, and bank branch options." },
  { icon: ShieldAlert, title: "Use the official portal only", body: "Always access revop.gov.ng directly. Never pay via links received through unofficial SMS or social media." },
];

function Steps({
  steps,
  offset = 0,
  accent,
}: {
  steps: Step[];
  offset?: number;
  accent: "primary" | "gold";
}) {
  return (
    <ol className="mt-10 space-y-4">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 70}>
          <Panel hover className="flex gap-5 sm:gap-7">
            <span
              className={
                accent === "gold"
                  ? "grid size-11 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/10 font-heading font-bold text-gold"
                  : "grid size-11 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 font-heading font-bold text-primary"
              }
            >
              {i + 1 + offset}
            </span>
            <div className="min-w-0">
              <h3 className="font-heading text-lg font-bold">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>

              {s.list && (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm text-muted-foreground"
                    >
                      <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {s.note && (
                <p className="mt-4 rounded-xl border border-border bg-foreground/[0.03] p-4 text-sm leading-relaxed text-foreground/85">
                  {s.note}
                </p>
              )}
            </div>
          </Panel>
        </Reveal>
      ))}
    </ol>
  );
}

export default function PaymentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Payments"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "RevOP Payments", href: "/services/payments" },
        ]}
        title={
          <>
            How to make a <span className="text-gradient">RevOP payment</span>
          </>
        }
        lead="Federal Government of Nigeria revenue payments — generate your bill, then pay online, by card, or at any bank branch. Please read the guide below before you proceed."
      >
        <CTA href="https://revop.gov.ng" variant="gold" external>
          Visit revop.gov.ng
        </CTA>
      </PageHero>

      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Part 1"
            title="Generate your bill"
            lead="Six steps to a valid Bill Reference Number on the official Federal Government revenue portal."
          />
          <Steps steps={generate} accent="primary" />
        </div>
      </section>

      <section className="border-y border-border bg-surface section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Part 2"
            title="Make payment"
            lead="Pay immediately after generating the bill, or return later with your Bill Reference Number."
          />
          <Steps steps={pay} offset={6} accent="gold" />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {channels.map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <Panel hover className="h-full">
                  <span className="grid size-11 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                    <c.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-heading text-base font-bold">{c.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Before you pay" title="Key reminders" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reminders.map((r, i) => (
              <Reveal key={r.title} delay={i * 70}>
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-card/60 p-6">
                  <r.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-sm font-bold">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12">
            <Callout title="Official portal" tone="primary">
              RevOP is operated by the Office of the Accountant-General of the Federation (OAGF).
              Payments made outside RevOP will not be accepted by NFVCB. Keep a printout of your
              payment receipt and obtain an NFVCB official receipt.
            </Callout>
          </Reveal>

          <Reveal delay={260} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTA href="https://revop.gov.ng" variant="gold" external>
              Go to RevOP
            </CTA>
            <CTA href="/services/licensing" variant="ghost">
              Check licence fees
            </CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
