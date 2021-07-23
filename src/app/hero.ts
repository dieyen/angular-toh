export interface Hero{
    name: string,
    vision: string,
    weapon: string,
    nation: string,
    affiliation: string,
    rarity: number,
    constellation: string,
    birthday: Date,
    description: string,
    skillTalents: SkillTalent[],
    passiveTalents: Talent[],
    constellations: Talent[]
}

export interface SkillTalent{
    name: string,
    unlock: string,
    description: string,
    type: string
}

export interface Talent{
    name: string,
    unlock: string,
    description: string,
    level: number
}
