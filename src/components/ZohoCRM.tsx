"use client";

import { useState } from "react";
import {
    Database,
    GitBranch,
    Code2,
    Workflow,
    ArrowRight,
    ChevronDown,
    Award,
    TrendingDown,
    Layers,
    Link2,
    Terminal,
    Cog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";


type Capability = {
    icon: typeof Database;
    title: string;
    tag: string;
    points: string[];
};
type StackGroup = { label: string; items: string[] };

const capabilities: Capability[] = [
    {
        icon: Database,
        title: "CRM Architecture",
        tag: "// architecture",
        points: [
            "Multi-module design: Leads, Contacts, Deals, Accounts",
            "Custom layouts, validation rules, role-based access",
            "Data modeling and lifecycle mapping",
            "Field-level security and territory rules",
        ],
    },
    {
        icon: GitBranch,
        title: "Blueprint Automation",
        tag: "// pipelines",
        points: [
            "Multi-stage pipeline design with enforced transitions",
            "State changes via Deluge + Blueprint REST API",
            "Dynamic transition ID resolution at runtime",
            "Edge-case handling: lookup limits, state drift",
        ],
    },
    {
        icon: Code2,
        title: "Deluge Scripting",
        tag: "// deluge",
        points: [
            "Custom functions, invokeurl, scheduled jobs",
            "Payment tracking + reconciliation automation",
            "Date arithmetic, null-safe patterns",
            "Reusable function libraries across orgs",
        ],
    },
    {
        icon: Workflow,
        title: "Integrations & APIs",
        tag: "// integrations",
        points: [
            "Zoho CRM ↔ Zoho Books bi-directional sync",
            "Zoho ↔ QuickBooks / Xero financial pipelines",
            "OAuth2 REST integrations with token refresh",
            "Webhooks + event-driven architecture",
        ],
    },
];

const trustBadges = [
    { icon: Award, label: "Zoho Partner — Technical Lead" },
    { icon: Layers, label: "4+ CRM systems delivered" },
    { icon: TrendingDown, label: "40% less manual CRM work" },
    { icon: Link2, label: "Multi-system integrations in production" },
];

const stackGroups = [
    { label: "Platform", items: ["Zoho CRM", "Zoho Books", "Zoho Creator"] },
    { label: "Scripting", items: ["Deluge", "JavaScript"] },
    { label: "APIs", items: ["REST", "OAuth 2.0", "Webhooks"] },
    { label: "Integrations", items: ["QuickBooks", "Xero", "Stripe", "M-Pesa"] },
];

const delugeSnippet = `// Scheduled function: reconcile paid invoices → advance deal blueprint
void automation.reconcilePayments()
{
  invoices = zoho.books.getRecords("Invoices", orgId, {"status":"paid"});
  for each inv in invoices
  {
    dealId = inv.get("cf_deal_id");
    if(dealId != null)
    {
      // Resolve transition ID dynamically (avoids hard-coded IDs)
      transitions = invokeurl
      [
        url: "https://www.zohoapis.com/crm/v6/Deals/" + dealId + "/actions/blueprint"
        type: GET
        connection: "zoho_crm"
      ];
      txId = transitions.get("blueprint").get(0).get("transitions")
                       .get({"next_transitions":"Payment Received"}).get("id");

      response = invokeurl
      [
        url: "https://www.zohoapis.com/crm/v6/Deals/" + dealId + "/actions/blueprint"
        type: PUT
        parameters: {"blueprint":[{"transition_id":txId}]}.toString()
        connection: "zoho_crm"
      ];
      info "Advanced deal " + dealId + " → Payment Received";
    }
  }
}`;

const caseStudies = [
    {
        title: "Real Estate CRM Automation",
        industry: "Property Sales — Nairobi",
        overview:
            "End-to-end lead → sale → payment pipeline built on Zoho CRM + Zoho Books with automated reconciliation.",
        problem:
            "Sales team tracked leads in Zoho but reconciled payments manually against Books. Deals sat in the wrong stage for days; commissions were paid late and finance had no source of truth.",
        architecture: [
            "Zoho CRM — Leads + Deals modules with a 6-stage Blueprint",
            "Zoho Books — invoice + payment ledger (system of record for money)",
            "Scheduled Deluge — polls Books every 15 min for paid invoices",
            "Blueprint REST API — advances Deal state on payment match",
            "Webhook — pushes stage changes to Slack #sales-ops",
        ],
        solution: [
            "Blueprint-enforced pipeline (no manual stage jumps)",
            "Deluge function matches invoice.cf_deal_id → Deal record",
            "Dynamic transition-ID resolution to survive Blueprint edits",
            "Idempotent runs — safe to re-execute on failure",
        ],
        decisions: [
            "Books as source of truth for payments (not CRM custom fields)",
            "Dynamic transition IDs instead of hard-coded UUIDs",
            "Scheduled reconciliation over webhooks — Books webhooks proved lossy",
            "Structured logging to a Zoho Creator audit table",
        ],
        results: [
            "100% payment-to-stage reconciliation, zero manual moves",
            "Deal cycle time cut from 11 days → 6 days",
            "Finance closes weekly in 2 hrs (was 1 full day)",
        ],
    },
    {
        title: "Multi-Entity Books ↔ QuickBooks Bridge",
        industry: "Professional Services — 3 legal entities",
        overview:
            "Two-way sync between Zoho Books (KE entity) and QuickBooks Online (US + UK entities) with FX handling.",
        problem:
            "Group CFO needed consolidated invoicing across three entities in three currencies. Manual re-keying caused a 2-week reporting lag and mismatched customer records.",
        architecture: [
            "Zoho Books — primary AR system for the KE entity",
            "QuickBooks Online — AR for US + UK entities (2 companies)",
            "Node.js middleware on Supabase Edge Functions",
            "OAuth2 with refresh-token rotation for all 3 orgs",
            "Redis-backed idempotency keys to prevent duplicate invoices",
        ],
        solution: [
            "Canonical Customer + Invoice schema in Postgres",
            "Change-data-capture via Books webhooks → normalized events",
            "FX rates pulled daily; invoices tagged with rate + timestamp",
            "Deluge functions push CRM Deal → invoice creation trigger",
        ],
        decisions: [
            "Middleware over direct point-to-point (3 entities, avoid N²)",
            "OAuth2 refresh tokens stored encrypted, rotated every 90d",
            "Idempotency keys on every write — networks fail, invoices can't duplicate",
        ],
        results: [
            "Reporting lag: 2 weeks → same-day",
            "Zero duplicate invoices across 8 months in production",
            "3 entities consolidated in one CFO dashboard",
        ],
    },
];

const CapabilityCard = ({ c }: { c: Capability }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-border bg-card p-5 sm:p-6 glow-on-hover"
    >
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                <c.icon size={20} />
            </div>
            <div>
                <div className="text-xs font-mono text-primary">{c.tag}</div>
                <h3 className="font-display text-lg sm:text-xl font-semibold">
                    {c.title}
                </h3>
            </div>
        </div>

        <ul className="space-y-2 text-sm text-foreground/90">
            {c.points.map((p) => (
                <li key={p} className="flex gap-2">
                    <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                    <span>{p}</span>
                </li>
            ))}
        </ul>
    </motion.div>
);

const StackGroupCard = ({ g }:{g:StackGroup}) => (
    <div className="rounded-2xl border border-border bg-card p-5">
        <div className="text-xs font-mono text-primary mb-3">
            {`// ${g.label.toLowerCase()}`}
        </div>
        <div className="flex flex-wrap gap-1.5">
            {g.items.map((i: string) => (
                <span
                    key={i}
                    className="px-2.5 py-1 rounded-md border border-border bg-secondary/60 text-xs font-mono"
                >
          {i}
        </span>
            ))}
        </div>
    </div>
);

const ZohoCRM = () => {
    const [openCase, setOpenCase] = useState<number | null>(0);

    return (
        <section id="zoho" className="py-20 sm:py-24 relative border-y border-border">
            <div className="absolute inset-0 bg-gradient-hero pointer-events-none opacity-60" />

            <div className="container-tight relative">
                {/* Header */}
                <div className="max-w-3xl mb-12 sm:mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono text-primary mb-4">
                        <Cog size={12} /> Zoho CRM Systems & Automation
                    </div>

                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        I design <span className="gradient-text">CRM systems</span>, not just fill in forms.
                    </h2>

                    <p className="mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground">
                        CRM architect and automation engineer on the Zoho platform. I build the pipelines,
                        Deluge scripts, and API integrations that connect sales, finance, and operations into
                        one system that runs itself.
                    </p>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12 sm:mb-16">
                    {trustBadges.map((b) => (
                        <div
                            key={b.label}
                            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 sm:p-4"
                        >
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
                                <b.icon size={16} />
                            </div>
                            <span className="text-xs sm:text-sm font-medium leading-tight">
                {b.label}
              </span>
                        </div>
                    ))}
                </div>

                {/* Capabilities */}
                <div className="grid sm:grid-cols-2 gap-4 mb-12 sm:mb-16">
                    {capabilities.map((c) => (
                        <CapabilityCard key={c.title} c={c} />
                    ))}
                </div>

                {/* Architecture flow */}
                <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 mb-12 sm:mb-16">
                    <div className="flex items-center gap-2 mb-5">
                        <Workflow size={16} className="text-primary" />
                        <div className="text-sm font-mono text-primary">{"// system flow"}</div>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-semibold mb-6">
                        End-to-end automation flow
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono">
                        {[
                            "Lead",
                            "Zoho CRM",
                            "Blueprint",
                            "Deluge Fn",
                            "REST / OAuth2",
                            "Payment System",
                            "State Update",
                        ].map((node, i, arr) => (
                            <div key={node} className="flex items-center gap-2">
                <span className="px-3 py-2 rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  {node}
                </span>
                                {i < arr.length - 1 && (
                                    <ArrowRight size={14} className="text-muted-foreground" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Code snippet */}
                <div className="rounded-2xl border border-border overflow-hidden mb-12 sm:mb-16 shadow-card">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card">
                        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                            <Terminal size={14} className="text-primary" />
                            reconcile_payments.dg
                        </div>
                        <span className="text-xs font-mono text-primary">Deluge</span>
                    </div>

                    <pre className="bg-[hsl(var(--code-bg))] text-[hsl(var(--code-fg))] text-xs sm:text-sm p-4 sm:p-5 overflow-x-auto leading-relaxed">
            <code>{delugeSnippet}</code>
          </pre>
                </div>

                {/* Case studies */}
                <div className="mb-12 sm:mb-16">
                    <div className="text-sm font-mono text-primary mb-2">{"// case studies"}</div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold mb-6">
                        Systems shipped, measured, and running in production.
                    </h3>

                    <div className="space-y-4">
                        {caseStudies.map((cs, idx) => {
                            const isOpen = openCase === idx;

                            return (
                                <article
                                    key={cs.title}
                                    className="rounded-2xl border border-border bg-card overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenCase(isOpen ? null : idx)}
                                        aria-expanded={isOpen}
                                        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-secondary/40 transition-colors"
                                    >
                                        <div>
                                            <div className="text-xs font-mono text-primary mb-1">
                                                {cs.industry}
                                            </div>
                                            <h4 className="font-display text-lg sm:text-xl font-semibold">
                                                {cs.title}
                                            </h4>
                                            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
                                                {cs.overview}
                                            </p>
                                        </div>

                                        <ChevronDown
                                            size={20}
                                            className={`transition-transform ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="px-5 sm:px-6 pb-6 grid md:grid-cols-2 gap-6 border-t border-border pt-6"
                                            >
                                                {/* content unchanged */}
                                                <div>
                                                    <p className="text-sm text-foreground/90">
                                                        {cs.problem}
                                                    </p>
                                                </div>

                                                <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
                                                    {cs.results.map((r) => (
                                                        <div key={r} className="text-sm font-medium">
                                                            • {r}
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </article>
                            );
                        })}
                    </div>
                </div>

                {/* Stack */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 sm:mb-16">
                    {stackGroups.map((g) => (
                        <StackGroupCard key={g.label} g={g} />
                    ))}
                </div>

                {/* CTA */}
                <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-8 md:p-10">
                    <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
                        <div>
                            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                                Have a CRM that should be running itself?
                            </h3>
                            <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
                                Tell me what your team does manually today. I'll map it, design the system, and
                                ship the automation.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button asChild size="lg" className="rounded-full">
                                <Link href="/contact?topic=crm-design">Design my CRM system</Link>
                            </Button>

                            <Button asChild size="lg" variant="outline" className="rounded-full">
                                <Link href="/contact?topic=automation">Automate my workflows</Link>
                            </Button>

                            <Button asChild size="lg" variant="ghost" className="rounded-full">
                                <Link href="/contact?topic=integration">Integrate my systems</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ZohoCRM;