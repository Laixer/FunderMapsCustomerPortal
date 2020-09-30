
/// <summary>
/// Foundation type.
/// </summary>
enum FoundationType {
    /// <summary>
    /// Wood.
    /// </summary>
    Wood,

    /// <summary>
    /// Wood foundation accoring to Amsterdam.
    /// </summary>
    WoodAmsterdam,

    /// <summary>
    /// Wood foundation accoring to Rotterdam.
    /// </summary>
    WoodRotterdam,

    /// <summary>
    /// Concrete.
    /// </summary>
    Concrete,

    /// <summary>
    /// No pile.
    /// </summary>
    NoPile,

    /// <summary>
    /// No pile and no masonry.
    /// </summary>
    NoPileMasonry,

    /// <summary>
    /// No pile strips.
    /// </summary>
    NoPileStrips,

    /// <summary>
    /// No pile and no bearing floor.
    /// </summary>
    NoPileBearingFloor,

    /// <summary>
    /// No pile and no concrete floor.
    /// </summary>
    NoPileConcreteFloor,

    /// <summary>
    /// No pile and no slit.
    /// </summary>
    NoPileSlit,

    /// <summary>
    /// Wood charger.
    /// </summary>
    WoodCharger,

    /// <summary>
    /// Weighted pile.
    /// </summary>
    WeightedPile,

    /// <summary>
    /// Combined.
    /// </summary>
    Combined,

    /// <summary>
    /// Steel pile.
    /// </summary>
    SteelPile,

    /// <summary>
    /// Other.
    /// </summary>
    Other,

    /// <summary>
    /// Unknown.
    /// </summary>
    Unknown,
}


export function translate(foundationType: FoundationType): string {
    switch (foundationType) {
        case FoundationType.Concrete: return "Betonnen paalfundering"
        case FoundationType.NoPile: return "Niet onderheid"
        case FoundationType.NoPileBearingFloor: return "Niet onderheid"
        case FoundationType.NoPileConcreteFloor: return "Niet onderheid"
        case FoundationType.NoPileMasonry: return "Niet onderheid"
        case FoundationType.NoPileSlit: return "Niet onderheid"
        case FoundationType.NoPileStrips: return "Niet onderheid"
        case FoundationType.Other: return "Anders"
        case FoundationType.SteelPile: return "Stalen paalfundering"
        case FoundationType.Unknown: return "Onbekend"
        case FoundationType.WeightedPile: return "Verzwaarde betonpuntpaal"
        case FoundationType.Wood: return "Houten paalfundering"
        case FoundationType.WoodAmsterdam: return "Houten paalfundering"
        case FoundationType.WoodCharger: return "Houten paalfundering met betonoplanger"
        case FoundationType.WoodRotterdam: return "Houten paalfundering"
        default: return "Onbekend"
    }
}

export function isPile(type: FoundationType): boolean {
    return [FoundationType.Concrete, FoundationType.SteelPile, FoundationType.WeightedPile, FoundationType.Wood, FoundationType.WoodAmsterdam, FoundationType.WoodCharger, FoundationType.WoodRotterdam].includes(type)
}

export default FoundationType