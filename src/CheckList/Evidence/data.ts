export const allEvidence = [
    "Spirit Box",
    "D.O.T.s Projector",
    "EMF Level 5",
    "Ghost Orbs",
    "Freezing Temps",
    "Ultraviolet",
    "Ghost Writing"
] as const;

export type EvidenceData = typeof allEvidence[number];