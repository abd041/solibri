export type GuideCardItem = {
  slug: string;
  title: string;
  description: string;
  href: string;
};

export type GuideFaqItem = {
  title: string;
  content: string;
};

export type GuideArticleCta = {
  label: string;
  href: string;
  variant: "primary" | "outline";
};

export type GuideArticleStep = {
  number: string;
  title: string;
  body: string;
};

export type GuideArticleLink = {
  label: string;
  href: string;
};

export type GuideArticle = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  subtitle: string;
  intro: string;
  ctas: GuideArticleCta[];
  stepsHeading: string;
  stepsStyle: "numbered" | "checklist";
  steps: GuideArticleStep[];
  tips?: string[];
  kitNote?: {
    heading: string;
    body: string;
    link: GuideArticleLink;
  };
  footerNav?: {
    prefix: string;
    separator?: string;
    links: GuideArticleLink[];
  };
};

export const guideArticleSlugs = ["reconstitution", "storage", "safety"] as const;

export type GuideArticleSlug = (typeof guideArticleSlugs)[number];

export const guideCards: GuideCardItem[] = [
  {
    slug: "reconstitution",
    title: "Reconstitution",
    description: "Step-by-step guidance for preparing lyophilised peptides with bacteriostatic water.",
    href: "/guides/reconstitution",
  },
  {
    slug: "storage",
    title: "Storage",
    description: "How to store vials before and after reconstitution to protect peptide integrity.",
    href: "/guides/storage",
  },
  {
    slug: "safety",
    title: "Safety",
    description: "Handling, disposal, and research-use-only requirements for laboratory work.",
    href: "/guides/safety",
  },
  {
    slug: "peptide-calculator",
    title: "Peptide calculator",
    description: "Plan draw volume, concentration, and syringe units on the homepage calculator.",
    href: "/#calculator",
  },
];

export const guideFaqs: GuideFaqItem[] = [
  {
    title: "How do I reconstitute a peptide?",
    content:
      "Add the supplied bacteriostatic water slowly down the inside wall of the vial. Standard Kits include 2 ml sterile water; swirl gently — never shake — until fully dissolved. Use the homepage calculator to plan your draw volume and syringe units.",
  },
  {
    title: "How should I store peptides?",
    content:
      "Keep lyophilised vials refrigerated (2–8 °C) and protected from light until reconstitution. After reconstitution, refrigerate and use within the window stated on your batch documentation. Never freeze reconstituted solution unless your protocol explicitly requires it.",
  },
  {
    title: "Are Solibri Labs peptides for human use?",
    content:
      "No. All products are sold strictly for laboratory research use only. They are not intended for human or veterinary consumption, diagnosis, or treatment.",
  },
  {
    title: "Where can I verify batch authenticity?",
    content:
      "Every batch includes a unique code. Enter it on the Verify page to confirm the product and access COA documentation where available.",
  },
  {
    title: "What is included in Standard vs Premium Pen Kits?",
    content:
      "Standard Kits include sterile bacteriostatic water for reconstitution. Premium Pen Kits add a disposable injection pen for precise single-use reconstitution. See How It Works for kit details.",
  },
];

export const guideArticles: GuideArticle[] = [
  {
    slug: "reconstitution",
    metaTitle: "Reconstitution guide · Solibri Labs",
    metaDescription:
      "How to reconstitute lyophilised research peptides with bacteriostatic water — step-by-step guidance for Solibri Labs kits.",
    eyebrow: "Research guide",
    heading: "How to reconstitute peptides",
    subtitle:
      "A practical walkthrough for preparing lyophilised peptides with bacteriostatic water — written for Solibri Labs Standard and Premium Pen Kits.",
    intro:
      "Lyophilised peptides arrive as a dry powder under vacuum. Reconstitution means adding sterile bacteriostatic water to bring them back into solution at a known concentration. Take your time — rushing this step is the most common source of foaming, incomplete dissolution, and concentration errors.",
    ctas: [
      { label: "Open peptide calculator", href: "/#calculator", variant: "primary" },
      { label: "All guides", href: "/guides", variant: "outline" },
    ],
    stepsHeading: "Step-by-step",
    stepsStyle: "numbered",
    steps: [
      {
        number: "1",
        title: "Prepare your workspace",
        body: "Clear a clean, dry surface. Wash hands, put on gloves, and gather your peptide vial, BAC water, syringe, and alcohol swabs. Work away from drafts and direct sunlight.",
      },
      {
        number: "2",
        title: "Calculate volumes first",
        body: "Use the peptide calculator on our homepage to work out how much bacteriostatic water to add, your target concentration, and the syringe draw volume for your planned dose. Write the numbers down before you start.",
      },
      {
        number: "3",
        title: "Sanitise the vial tops",
        body: "Swab both the peptide vial stopper and the BAC water vial stopper with an alcohol pad. Let them air-dry for a few seconds — do not blow on them.",
      },
      {
        number: "4",
        title: "Draw bacteriostatic water",
        body: "Pull the correct volume of BAC water into a sterile syringe. Standard Kits ship with 2 ml sterile water; Premium Pen Kits include the same reconstitution supplies.",
      },
      {
        number: "5",
        title: "Add water slowly",
        body: "Insert the needle through the peptide vial stopper and inject the water down the inside wall of the vial — not directly onto the lyophilised cake. This reduces foaming and helps the peptide dissolve evenly.",
      },
      {
        number: "6",
        title: "Dissolve gently",
        body: "Swirl the vial slowly between your fingers until the solution is clear. Do not shake vigorously or vortex unless your lab protocol specifically calls for it. Cloudiness or undissolved particles mean you should stop and review your technique.",
      },
      {
        number: "7",
        title: "Label and store",
        body: "Label the vial with the reconstitution date, BAC water volume added, and calculated concentration. Refrigerate immediately at 2–8 °C and protect from light. Follow the storage window on your batch documentation.",
      },
    ],
    tips: [
      "Let refrigerated vials warm to room temperature for a few minutes before reconstituting — cold glass can cause condensation.",
      "Use a fresh needle for each vial entry to reduce contamination risk.",
      "If you are new to reconstitution, practice the calculator maths before handling the vial.",
      "Research use only — this guide is for laboratory preparation, not human administration.",
    ],
    kitNote: {
      heading: "Standard Kit vs Premium Pen Kit",
      body: "Both kits include your peptide and 2 ml sterile bacteriostatic water for reconstitution. The Premium Pen Kit adds a presentation box and disposable pen for precise handling in the lab. The reconstitution process itself is the same — only the packaging and presentation differ.",
      link: { label: "Browse peptides →", href: "/shop" },
    },
  },
  {
    slug: "storage",
    metaTitle: "Peptide storage guide · Solibri Labs",
    metaDescription:
      "How to store lyophilised and reconstituted research peptides — temperature, light, labelling, and transport.",
    eyebrow: "Research guide",
    heading: "How to store peptides",
    subtitle: "Practical temperature, light, and labelling guidance for lyophilised and reconstituted research peptides.",
    intro:
      "Peptide integrity is mostly a cold-chain and light-protection problem. Get storage right and your reconstitution maths stay meaningful; get it wrong and even a perfect protocol can look like a failed batch.",
    ctas: [
      { label: "Reconstitution guide", href: "/guides/reconstitution", variant: "primary" },
      { label: "All guides", href: "/guides", variant: "outline" },
    ],
    stepsHeading: "Storage checklist",
    stepsStyle: "checklist",
    steps: [
      {
        number: "01",
        title: "Before reconstitution (lyophilised)",
        body: "Keep sealed vials refrigerated at 2–8 °C, upright, and protected from light and moisture. Do not freeze lyophilised cakes unless your batch documentation explicitly allows it. Leave vials in their secondary packaging until you are ready to open them.",
      },
      {
        number: "02",
        title: "After reconstitution",
        body: "Refrigerate immediately at 2–8 °C. Label the vial with reconstitution date, BAC water volume, and concentration. Protect from light. Discard if the solution becomes cloudy, coloured, or shows particulates — do not attempt to “rescue” compromised material.",
      },
      {
        number: "03",
        title: "Use window",
        body: "Follow the stability window on your batch COA or kit documentation. When in doubt, prefer shorter refrigerated storage and prepare smaller working volumes rather than holding large reconstituted stocks for weeks.",
      },
      {
        number: "04",
        title: "Transport",
        body: "Use insulated packaging and ice packs for longer journeys. Minimise time outside 2–8 °C. Avoid leaving vials in hot cars, direct sun, or unmonitored courier depots. Upon arrival, return vials to refrigeration promptly.",
      },
      {
        number: "05",
        title: "Labelling hygiene",
        body: "Write clearly: peptide name, lot/batch, reconstitution date, solvent volume, and calculated concentration. Include a discard-by date when known. Never rely on memory for concentration maths.",
      },
    ],
    tips: [
      "Allow cold vials a few minutes at room temperature before opening to reduce condensation on the stopper.",
      "Store BAC water refrigerated after opening and note the open date on the bottle.",
      "Keep reconstituted and lyophilised stock in separate labelled trays to avoid mix-ups.",
      "Research use only — storage guidance supports laboratory integrity, not clinical use.",
    ],
    footerNav: {
      prefix: "Need dosing maths?",
      links: [{ label: "Open the peptide calculator →", href: "/#calculator" }],
    },
  },
  {
    slug: "safety",
    metaTitle: "Peptide safety & handling · Solibri Labs",
    metaDescription:
      "Laboratory safety for research peptides — PPE, sterile technique, sharps disposal, and research-use-only requirements.",
    eyebrow: "Research guide",
    heading: "Safety & handling",
    subtitle:
      "Baseline laboratory handling for research peptides — PPE, sterile technique, waste, and research-use-only boundaries.",
    intro:
      "This page is a practical checklist for responsible lab handling. It does not replace institutional biosafety training, COSHH assessments, or your principal investigator’s instructions.",
    ctas: [
      { label: "Verify a batch", href: "/verify", variant: "primary" },
      { label: "All guides", href: "/guides", variant: "outline" },
    ],
    stepsHeading: "Handling checklist",
    stepsStyle: "checklist",
    steps: [
      {
        number: "01",
        title: "Research use only",
        body: "Solibri Labs products are sold strictly for in vitro / laboratory research. They are not medicines, supplements, or veterinary products. Do not use them for human or animal administration, diagnosis, or treatment.",
      },
      {
        number: "02",
        title: "Personal protective equipment",
        body: "Wear gloves as a baseline. Add eye protection when handling needles, reconstituting under pressure, or working with splash risk. Follow your institution’s biosafety level and chemical-hygiene rules — local SOPs override this overview.",
      },
      {
        number: "03",
        title: "Sterile technique basics",
        body: "Work on a clean, dry surface away from drafts. Swab vial stoppers with alcohol and allow to dry. Use fresh sterile needles/syringes for each entry. Cap and refrigerate promptly after use.",
      },
      {
        number: "04",
        title: "Sharps & waste",
        body: "Dispose of needles and broken glass in an approved sharps container. Do not recap used needles by hand if your lab policy forbids it. Treat peptide-contaminated consumables per local biological/chemical waste rules.",
      },
      {
        number: "05",
        title: "Spills & exposure",
        body: "Wipe small spills with absorbent material and disinfectant appropriate to your lab. Wash skin with soap and water if contact occurs; seek medical advice for needle-stick injuries per institutional protocol. Report incidents through your lab’s normal channels.",
      },
      {
        number: "06",
        title: "Documentation",
        body: "Keep batch codes, COAs, and reconstitution logs with your experiment records. Use the Verify page to confirm authenticity when a code is provided. Never invent concentrations — recalculate if labels are unclear.",
      },
    ],
    footerNav: {
      prefix: "Next:",
      separator: " · ",
      links: [
        { label: "Storage guide", href: "/guides/storage" },
        { label: "Reconstitution", href: "/guides/reconstitution" },
      ],
    },
  },
];

export function getGuideArticle(slug: string): GuideArticle | undefined {
  return guideArticles.find((article) => article.slug === slug);
}

export const guidesFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: guideFaqs.map((item) => ({
    "@type": "Question",
    name: item.title,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.content,
    },
  })),
};
