export const scienceThemes = [
  {
    title: "Batch-tested purity",
    body: "Every batch is tested for purity before it's kitted. If a batch doesn't meet our threshold, it doesn't ship.",
    icon: "flask" as const,
  },
  {
    title: "Research-grade peptides",
    body: "We source research-grade peptides and verify their identity and purity, so what's in the vial is exactly what the label states.",
    icon: "shield" as const,
  },
  {
    title: "Precise reconstitution",
    body: "Each Standard Kit includes 2 ml of sterile water, prepared so your peptide reconstitutes cleanly and consistently every time.",
    icon: "feather" as const,
  },
  {
    title: "Premium presentation",
    body: "Choose a Standard Kit or a Premium Pen Kit — the latter in a presentation box with a disposable injection pen. No guesswork, no clutter.",
    icon: "crosshair" as const,
  },
];

export const scienceStats = [
  { value: "HPLC", label: "Purity-tested batches" },
  { value: "UK", label: "Based & dispatched" },
  { value: "2 kits", label: "Standard or Premium Pen" },
  { value: "2 ml", label: "Sterile water per Standard Kit" },
];

export const scienceProcess = [
  {
    n: "01",
    title: "Source",
    body: "We source research-grade peptides from vetted suppliers, selecting for quality and consistency rather than the lowest price.",
  },
  {
    n: "02",
    title: "Test",
    body: "Each batch is tested for purity and identity before it's approved — verifying the vial contains exactly what the label states.",
  },
  {
    n: "03",
    title: "Kit",
    body: "Approved peptides are kitted to order: a Standard Kit with 2 ml of sterile water, or a Premium Pen Kit with a disposable injection pen.",
  },
  {
    n: "04",
    title: "Dispatch",
    body: "Finished kits are sealed, checked, and dispatched from the UK in discreet, protective packaging with full batch traceability.",
  },
];

export const scienceChecks = [
  {
    check: "Purity",
    method: "HPLC",
    why: "Confirms each batch meets our purity threshold before it's approved for kitting.",
  },
  {
    check: "Identity",
    method: "Mass spec",
    why: "Verifies the compound in the vial is exactly what the label states.",
  },
  {
    check: "Sterility",
    method: "Lab test",
    why: "Checks vials are free from microbial contamination before they're sealed.",
  },
  {
    check: "Presentation",
    method: "Manual QC",
    why: "Every vial and kit is inspected for seal, fill and a clean, consistent finish.",
  },
];
