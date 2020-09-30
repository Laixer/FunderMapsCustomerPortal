/// <summary>
/// Represents the foundation risk.
/// </summary>
enum FoundationRisk {
    /// <summary>
    /// Risk level A.
    /// </summary>
    A,

    /// <summary>
    /// Risk level B.
    /// </summary>
    B,

    /// <summary>
    /// Risk level C.
    /// </summary>
    C,

    /// <summary>
    /// Risk level D.
    /// </summary>
    D,

    /// <summary>
    /// Risk level E.
    /// </summary>
    E
}

export function translate(foundationRisk: FoundationRisk): string {
    switch (foundationRisk) {
        case FoundationRisk.A: return 'A'
        case FoundationRisk.B: return 'B'
        case FoundationRisk.C: return 'C'
        case FoundationRisk.D: return 'D'
        case FoundationRisk.E: return 'E'
        default: return FoundationRisk[foundationRisk]
    }
}

export function describe(foundationRisk: FoundationRisk): string {
    switch (foundationRisk) {
        case FoundationRisk.A: return 'Er is geen verhoogd funderingsrisico.'
        case FoundationRisk.B: return 'Er is een normaal voorkomend funderingsrisico. Er zijn indicaties van funderingsproblematiek, maar vooralsnog wordt voldaan aan de toetsingen voor funderingsschade.'
        case FoundationRisk.C: return 'Er is een licht verhoogd funderingsrisico. De toetsing voor funderingsschade geeft een aanleiding voor een licht verhoogd funderingsrisico.'
        case FoundationRisk.D: return 'Er is een verhoogd funderingsrisico. De toetsing voor funderingsschade wordt niet gehaald en geeft een aanleiding voor een verhoogd funderingsrisico.'
        case FoundationRisk.E: return 'Er is een verhoogd funderingsrisico. De toetsing voor funderingsschade wordt niet gehaald en geeft een aanleiding voor een sterk verhoogd funderingsrisico. Ook is de zakkingssnelheid van het pand hoger dan gemiddeld binnen de omgeving.'
        default: return FoundationRisk[foundationRisk]
    }
}

export default FoundationRisk;