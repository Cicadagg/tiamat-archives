export type sinType = "wrath"|"lust"|"sloth"|"glut"|"gloom"|"pride"|"envy";
export type tierType = "SSS"|"SS"|"S"|"A"|"B"|"C"|"Test";
export type rarityIdentityType = "O"|"OO"|"OOO";
export type rarityEGOType = "ZAYIN"|"TETH"|"HE"|"WAW"|"ALEPH";
export type dmgType = "slash"|"pierce"|"blunt";
export type guardType = "counter"|"guard"|"evade";
export type guardTypeExtended = "counter"|"counter_slash"|"counter_pierce"|"counter_blunt"|"guard"|"evade";
export type sinnerType = "faust"|"yi sang"|"don quixote"|"ryoshu"|"mersault"|"hong lu"|"heathcliff"|"ishmael"|"rodion"|"sinclair"|"outis"|"gregor";
export type ownerType = "ego"|"sinner"|"sinner_story"|"anomaly"|"none"|"md_gift";
export type seasonType = "s-0"|"s-1"|"s-2"|"s-3"|"s-4"|"s-5";
export type eventType = "i-1"|"i-2"|"i-3.1"|"i-3.2"|"i-4.1"|"i-4.2"|"i-5.1"|"i-5.2"|"w-1"|"w-2"|"w-3"|"w-4"|"w-5";

export const normalizeGuardType = (type: guardTypeExtended): guardType => {
    if (type.startsWith('counter')) return 'counter';
    return type as guardType;
};