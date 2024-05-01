import { EvidenceData } from "../Evidence/data";

/** Ghost Data Interface
 * 
 * How the Ghost Class is expecting the data to be.
 */
export interface GhostData {
    name: string,
    evidence: Array<EvidenceData>,
    info?: Array<string>,
    required?: string,
    link?: string,
    warning?: string,
    speed?: number|Array<number>,
    hunt?: number|Array<number>
}

export const allGhosts:Array<GhostData> = [
    {   name: "Banshee",
        evidence: [
            "Ultraviolet",
            "Ghost Orbs",
            "D.O.T.s Projector"
        ],
        hunt: 50,
        info: [
            "Will target one player at a time",
            "Perfers singing/humming during ghost events.",
            "Has a chance to roam to it's target.",
            "Has a special sound that can only be herd with the parabolic mic."
        ],
        speed: 1.7,
        link: "https://youtu.be/zuiss03Zd9Q"
    },
    {   name: "Demon",
        speed: 1.7,
        link: "https://youtu.be/UErl6rpUU24",
        info: [
            "Starts hunting at 70% average sanity, but has a chance to use its ability to hunt at any sanity.",
            "A smudge stick will prevent a hunt for 60 seconds instead of the normal 90 seconds.",
            "Can hunt every 20 seconds, faster then a normal ghost.",
            "Weakness: Crucifix's have a greater area of effect on a demon."
        ],
        evidence: [
            "Ultraviolet",
            "Ghost Writing",
            "Freezing Temps"
        ],
        hunt: 70,
        warning: "The Demon can start a hunt at any time."
    },
    {   name: "Deogen",
        speed: [
            0.4,
            3
        ],
        warning: "The deogen will always know where you are!",
        hunt: 40,
        required: "Spirit Box",
        info: [
            "The deogen will move faster when it is far away from its target, moving slower once it is close.",
            "Deogen's have a special spirit box sounds if you use the spirit box directly ontop of the ghost.",
            "Weakness: Hunts at 40% average sanity."
        ],
        evidence: [
            "Spirit Box",
            "Ghost Writing",
            "D.O.T.s Projector"
        ],
        link: "https://youtu.be/Xbs2hDYPBjE"
    },
    {   name: "Goryo",
        hunt: 50,
        info: [
            "Will not show DOTs Projector if there is a player in the room.",
            "A goryo is unable to change its favorit room unless the monkey paw forces it too. (bugged)",
            "Weakness: Not able to roam far away from its favorit room."
        ],
        evidence: [
            "EMF Level 5",
            "Ultraviolet",
            "D.O.T.s Projector"
        ],
        speed: 1.7,
        required: "D.O.T.s Projector",
    },
    {   name: "Hantu",
        hunt: 50,
        info: [
            "Will speed up when in a colder room, and will slow down in a warmer room.",
            "When a Hantu is visible durring a hunt, and the breaker is off, you will be able to see its freezing breath.",
            "Weakness: Cannot turn on the fuse box."
        ],
        speed: [
            1.44,
            2.7
        ],
        required: "Freezing Temps",
        evidence: [
            "Ultraviolet",
            "Ghost Orbs",
            "Freezing Temps"
        ],
        link: "https://youtu.be/oaPInpuMY58"
    },
    {   name: "Jinn",
        link: "https://youtu.be/bfvbEGpceas",
        speed: [
            1.7,
            2.5
        ],
        evidence: [
            "EMF Level 5",
            "Ultraviolet",
            "Freezing Temps"
        ],
        hunt: 50,
        info: [
            "Can drop your sanity by 25% if you are standing close to it for too long.",
            "The jinn has increased speed when the breaker is on.",
            "Weakness: Cannot turn off the breaker."
        ],
    },
    {   name: "Mare",
        info: [
            "Will hunt at 40% average sanity if the lights are on and 60% average sanity if the lights are off.",
            "Has a chance of turning the lights off immediatly when they are turned on.",
            "More likely to break the lights during a ghost event.",
            "Weakness: Cannot turn on the lights"
        ],
        hunt: [
            40,
            60
        ],
        link: "https://youtu.be/M2Wtzf9TqF8",
        evidence: [
            "Spirit Box",
            "Ghost Orbs",
            "Ghost Writing"
        ],
        speed: 1.7
    },
    {   name: "The Mimic",
        link: "https://youtu.be/uB3Wl_3xIq4",
        evidence: [
            "Spirit Box",
            "Ultraviolet",
            "Freezing Temps",
            "Ghost Orbs"
        ],
        required: "Ghost Orbs",
        
        info: [
            "Will randomly have the abilitys of different ghost types, and will change throughout the match.",
            "Weakness: Ghost orbs will always follow the mimic around rather then staying in its ghost room."
        ]
    },
    {   name: "Moroi",
        link: "https://youtu.be/cASjuPnV8Uk",
        info: [
            "Changes it speed based on the average sanity of the team.",
            "Starts out slower then an average ghost, going faster the lower it gets.",
            "Will curse a player that hears its, causing their sanity to drain even if they are in the light."
        ],
        speed: [
            1.5,
            1.66,
            1.83,
            2.08,
            2.25
        ],
        evidence: [
            "Spirit Box",
            "Ghost Writing",
            "Freezing Temps"
        ],
        hunt: 50,
        required: "Spirit Box",
    },
    {   name: "Myling",
        speed: 1.7,
        info: [
            "Has a greater chance of making paranormal sounds on the parabolic mic.",
            "Weakness: You will only be able to hear a myling at close range when it is hunting."
        ],
        evidence: [
            "EMF Level 5",
            "Ultraviolet",
            "Ghost Writing"
        ],
        hunt: 50,
        link: "https://youtu.be/R2-PM3_iE8A",
    },
    {   name: "Obake",
        info: [
            "Has a chance to have extra fingers, when leaving Fingerprints.",
            "Has a chance to not leave Fingerprints at all",
            "Fingerprint evidence left by an obake will disapear faster.",
            "Weakness: Has a chance to flash a different ghost model while hunting."
        ],
        hunt: 50,
        required: "Ultraviolet",
        speed: 1.7,
        evidence: [
            "EMF Level 5",
            "Ultraviolet",
            "Ghost Orbs"
        ],
        link: "https://youtu.be/Gl6nWRgXVlQ",
    },
    {   name: "Oni",
        info: [
            "A ghost event will drain double the amount of sanity of a normal ghost event.",
            "This ghost will be more active the more people there are in the ghost room.",
            "Has a greater chance of being the normal ghost model during a ghost event.",
            "Weakness: Unable to do the cloudball ghost even.",
            "Weakness: Will be visible more often during hunts than normal ghosts."
        ],
        speed: 1.7,
        link: "https://youtu.be/HDBm_vlA1f8",
        hunt: 50,
        evidence: [
            "EMF Level 5",
            "Freezing Temps",
            "D.O.T.s Projector"
        ]
    },
    {   name: "Onryo",
        info: [
            "If attempting to hunt, it will be prevented by blowing out a flame similar to using a crucifix.",
            "If a flame is lit, that will have precidence over a crucifix in preventing a hunt.",
            "Every thrid flame beingng blown out will start a hunt regardless of sanity, can be prevented with another flame or cucifix.",
            "Can start hunting at 60% average sanity."
        ],
        evidence: [
            "Spirit Box",
            "Ghost Orbs",
            "Freezing Temps"
        ],
        link: "https://youtu.be/xF2-mf3oEUs",
        hunt: 60,
        speed: 1.7
    },
    {   name: "Phantom",
        hunt: 50,
        link: "https://youtu.be/GFLie5hzbjk",
        info: [
            "Will flicker at a slower rate then a normal ghost during a hunt.",
            "Can randomly wander to the position of one of the players",
            "Note: The ouji board has no chance of summoning the ghost.",
            "Weakness: Will disapear if a picture is taken of a phantom, and no glitches will apear on the photo."
        ],
        speed: 1.7,
        evidence: [
            "Spirit Box",
            "Ultraviolet",
            "D.O.T.s Projector"
        ]
    },
    {   name: "Poltergeist",
        link: "https://youtu.be/ZXFP5LLhD9A",
        info: [
            "Can throw items further and harder then a normal ghost.",
            "Weakness: Has a chance to through multiple items all at once.",
            "Weakness: A poltergeist will throw an item every half a second during a hunt."
        ],
        evidence: [
            "Spirit Box",
            "Ultraviolet",
            "Ghost Writing"
        ],
        hunt: 50,
        speed: 1.7
    },
    {   name: "Raiju",
        speed: [
            1.7,
            2.5
        ],
        evidence: [
            "EMF Level 5",
            "Ghost Orbs",
            "D.O.T.s Projector"
        ],
        info: [
            "Can hunt at 65% average sanity if near electonics, otherwise it will hunt at the normal 50%.",
            "The ghost will move at near Revenant speeds if it is near electronics.",
            "Weakness: The ghost effects lights at a greater range then normal."
        ],
        link: "https://youtu.be/rX1-vaWPnHg",
        hunt: [
            65,
            50
        ]
    },
    {   name: "Revenant",
        info: [
            "Weakness: Will move increadably slow if it does not see a player."
        ],
        speed: [
            1,
            3
        ],
        link: "https://youtu.be/5P-4CPhM-Ak",
        warning: "Currently the fastest ghost in the game.",
        evidence: [
            "Ghost Orbs",
            "Ghost Writing",
            "Freezing Temps"
        ],
        hunt: 50
    },
    {   name: "Shade",
        link: "https://youtu.be/aiVVzCk_G8E",
        hunt: 35,
        evidence: [
            "EMF Level 5",
            "Ghost Writing",
            "Freezing Temps"
        ],
        info: [
            "Shades perfer using the ghost ball over a normal ghost event",
            "Weakness: A shade cannot hunt if there are more then one person in the room with it, and hunts at 35% average sanity."
        ],
        speed: 1.7
    },
    {   name: "Spirit",
        hunt: 50,
        evidence: [
            "EMF Level 5",
            "Spirit Box",
            "Ghost Writing"
        ],
        speed: 1.7,
        info: [
            "Smudging a spirit will prevent a hunt for 180 seconds instead of the noraml 90 seconds.",
            "Has no other defining characteristics."
        ]
    },
    {   name: "Thaye",
        link: "https://youtu.be/unEztO9Sa3Y",
        hunt: [
            35,
            50,
            75
        ],
        speed: [
            1,
            1.7,
            2.7
        ],
        evidence: [
            "Ghost Orbs",
            "Ghost Writing",
            "D.O.T.s Projector"
        ],
        info: [
            "The more time you spend near a Thaye the more it will 'age'.",
            "At the begining of the round  the thaye will be super active and can hunt as early as 70% average sanity.",
            "At it's oldes age a thaye will become very unactive and can only hunt at 15% average sanity.",
            "A Thaye will changes its answers on the spirit box, when asked how old it is, as it continues to age."
        ]
    },
    {   name: "The Twins",
        evidence: [
            "EMF Level 5",
            "Spirit Box",
            "Freezing Temps"
        ],
        hunt: 50,
        speed: [
            1.53,
            1.87
        ],
        
        info: [
            "Has two interaction and hunt ranges.",
            "Weakness: Depending on which range it hunts from will change its speed!"
        ],
        link: "https://youtu.be/o3RQnuz_FJY",
    },
    {   name: "Wraith",
        speed: 1.7,
        evidence: [
            "EMF Level 5",
            "Spirit Box",
            "D.O.T.s Projector"
        ],
        info: [
            "Has a chance of teleporting next to a random player, this will leave an EMF Level 2 or EMF Level 5 reading at the location.",
            "Weakness: A wraith will never step in salt."
        ],
        hunt: 50,
    },
    {   name: "Yokai",
        evidence: [
            "Spirit Box",
            "Ghost Orbs",
            "D.O.T.s Projector"
        ],
        info: [
            "Can hunt at 80% average team sanity if someone is talking near it.",
            "Weakness: It can only sence player electronics at short distances."
        ],
        hunt: [
            80,
            50
        ],
        link: "https://youtu.be/qT_KeGs_Qwc",
        speed: 1.7
    },
    {   name: "Yurei",
        link: "https://youtu.be/zgVOekUoZ0E",
        info: [
            "Has an increased chance of performing a ghost event.",
            "Has a chance of performing a hidden ghost event were the doors in a room will close like a ghost event.",
            "Weakness: Cannot leave the room it is in once it has been smudged for 90 seconds."
        ],
        evidence: [
            "Ghost Orbs",
            "Freezing Temps",
            "D.O.T.s Projector"
        ],
        speed: 1.7,
        hunt: 50,
    }
];