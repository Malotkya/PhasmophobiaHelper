export const EvidenceData = [
    "Spirit Box",
    "D.O.T.s Projector",
    "EMF Level 5",
    "Ghost Orbs",
    "Freezing Temps",
    "Ultraviolet",
    "Ghost Writing"
] as const;
export type Evidence = typeof EvidenceData[number];

export const DEFAULT_EVIDENCE_COUNT = 3;
export const EVIDENCE_SCORE_OVERFLOW = 5;
export const EVIDENCE_OVERRIDE = EvidenceData.length * EVIDENCE_SCORE_OVERFLOW;



export interface AlternativeEvidence {
    [name:string]:number
}

//Ghost Speed Constants
export const SPEED_TYPES:AlternativeEvidence = {
    "Fast": 2,
    "Average": 1.7,
    "Slow": 1,
};

//Ghost Hunt Constants
export const HUNT_TYPES:AlternativeEvidence = {
    "Early": 100,
    "Normal": 50,
    "Late": 0,
};