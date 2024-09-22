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

  export interface ButtonProps {
    headline?: "Legg til ny reise" | "Vis resultat"; // Er union av ulike strings (sånn at den er type safe når man lager komponenten)
    //onClick?: () => void;
  }