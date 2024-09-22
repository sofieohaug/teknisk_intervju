import { ChangeEvent } from "react";

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

  export interface TravelEntryProps {
    entry: TravelEntry;
    index: number;
    travelType: string;
    onEntryChange: (
      index: number
    ) => (event: ChangeEvent<HTMLInputElement>) => void;
    onTravelTypeChange: (
      index: number
    ) => (event: ChangeEvent<HTMLInputElement>) => void;
  }

  export interface TripButtonsProps {
    onAddTrip: () => void;
    onRemoveTrip: () => void;
    showRemoveButton: boolean;
  }
  
  export interface TotalExpensesProps {
    value: number | null;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }
