export type Testimonial = {
  initials: string;
  name: string;
  context: string;
  quote: string;
  rating: 4 | 5;
};

export const testimonialsRowOne: Testimonial[] = [
  {
    initials: "JW",
    name: "James W.",
    context: "Premium pen kit",
    rating: 5,
    quote:
      "Pen kit arrived well packed. Everything was labelled and the COA was in the box — nice touch.",
  },
  {
    initials: "P",
    name: "Priya",
    context: "Standard kit",
    rating: 4,
    quote:
      "Took a day longer than expected but the vials looked good. Reconstituted fine with the water included.",
  },
  {
    initials: "MR",
    name: "Marcus R",
    context: "10ml vial",
    rating: 5,
    quote: "Numbers on the COA matched what I expected. No drama, just did the job.",
  },
  {
    initials: "SA",
    name: "Sofia A.",
    context: "Repeat order",
    rating: 4,
    quote:
      "Second time ordering. Batch was consistent with last time which is basically all I care about.",
  },
];

export const testimonialsRowTwo: Testimonial[] = [
  {
    initials: "TB",
    name: "Tyler B",
    context: "Standard kit",
    rating: 5,
    quote: "Clear instructions in the box. Water vial and peptide vial both sealed properly.",
  },
  {
    initials: "NF",
    name: "Naomi F.",
    context: "UK buyer",
    rating: 4,
    quote: "Discreet packaging, no issues with dispatch. Would order again.",
  },
  {
    initials: "EC",
    name: "Ethan C",
    context: "Verified buyer",
    rating: 5,
    quote: "HPLC sheet came with the batch. That’s the main reason I stick with these guys.",
  },
  {
    initials: "CM",
    name: "Chloe M",
    context: "Premium kit",
    rating: 4,
    quote: "Presentation box is a bit much for lab use but quality seems solid. Shipping was quick.",
  },
];
