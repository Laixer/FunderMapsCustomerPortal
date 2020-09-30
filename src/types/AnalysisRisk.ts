import FoundationRisk from './FoundationRisk';
import FoundationType from './FoundationType';
import Reliability from './Reliability';

export default class AnalysisRisk {
    neighborhoodId: string;
    foundationType: FoundationType;
    foundationRisk: FoundationRisk;
    restorationCosts: number;
    dewateringDepth: number;
    drystand: number;
    reliability: Reliability;

    constructor(
        neighborhoodId: string,
        foundationType: FoundationType,
        foundationRisk: FoundationRisk,
        restorationCosts: number,
        dewateringDepth: number,
        drystand: number,
        reliability: Reliability
    ) {
        this.neighborhoodId = neighborhoodId
        this.foundationType = foundationType
        this.foundationRisk = foundationRisk
        this.restorationCosts = restorationCosts
        this.dewateringDepth = dewateringDepth
        this.drystand = drystand
        this.reliability = reliability
    }

    get labelColor(): string {
        switch (this.foundationRisk) {
            case FoundationRisk.A: return '#2bb02b'
            case FoundationRisk.B: return '#b0a22b'
            case FoundationRisk.C: return '#b0832b'
            case FoundationRisk.D: return '#b05f2b'
            case FoundationRisk.E: return '#b02b2b'
            default: return '#606976'
        }
    }

}