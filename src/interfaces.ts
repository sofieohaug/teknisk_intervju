export interface TravelEntry {
    km: number | null;
    antall: number | null;
  }
  
  export interface InputValues {
    arbeidsreiser: TravelEntry[];
    besoeksreiser: TravelEntry[];
    utgifterBomFergeEtc: number | null;
  }

 export interface ResultsProps {
    calculationResult: number | null;
    handleReset: () => void; 
    handleUpdate: () => void;
  }
