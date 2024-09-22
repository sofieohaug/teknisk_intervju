import React, { ChangeEvent, useState } from "react";
import { Button } from "@mui/material";
import { ResultsOutput } from "./results";
import {
  InputValues,
  TravelEntry as TravelEntryType,
} from "../interfaces/interface";
import { calculateDeduction, isValidInput } from "../data/fetchData";
import "../css/components.css";
import { TravelEntryInputs } from "./travel_entry_inputs";
import { AdditionalTripButtons } from "./additional_trips_buttons";
import { TotalExpensesInput } from "./total_expenses_input";
import { InformationText } from "./information_text";

const initialInputValues: InputValues = {
  arbeidsreiser: [],
  besoeksreiser: [],
  utgifterBomFergeEtc: null,
};

const initialCurrentEntry: TravelEntryType = {
  km: null,
  antall: null,
};

export const CalculationForm = () => {
  const [inputValues, setInputValues] =
    useState<InputValues>(initialInputValues);
  const [currentEntries, setCurrentEntries] = useState<TravelEntryType[]>([
    initialCurrentEntry,
  ]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [travelTypes, setTravelTypes] = useState<string[]>(["work"]);
  const [showResultButton, setShowResultButton] = useState(true);
  const [deductionResult, setDeductionResult] = useState<number | null>(null);

  const handleTravelTypeChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const updatedTravelTypes = [...travelTypes];
      updatedTravelTypes[index] = event.target.value;
      setTravelTypes(updatedTravelTypes);
    };

  const handleEntryChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const updatedEntries = [...currentEntries];
      updatedEntries[index] = {
        ...updatedEntries[index],
        [name]: value === "" ? null : Number(value),
      };
      setCurrentEntries(updatedEntries);
    };

  const handleAddTrip = () => {
    setCurrentEntries([...currentEntries, initialCurrentEntry]);
    setTravelTypes([...travelTypes, "work"]);
  };

  const handleRemoveTrip = () => {
    if (currentEntries.length > 1) {
      setCurrentEntries(currentEntries.slice(0, -1));
      setTravelTypes(travelTypes.slice(0, -1));
    }
  };

  const handleExpensesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      utgifterBomFergeEtc:
        event.target.value === "" ? null : Number(event.target.value),
    });
  };

  const getResults = async (updatedValues: InputValues) => {
    if (isValidInput(updatedValues)) {
      try {
        const result = await calculateDeduction(updatedValues);
        setDeductionResult(result.reisefradrag);
      } catch (error) {
        console.error("Failed to fetch deduction:", error);
      }
    } else {
      console.error("Invalid input values!");
    }
  };

  const handleResults = async () => {
    const updatedValues = {
      ...inputValues,
      arbeidsreiser: currentEntries.filter(
        (_, index) => travelTypes[index] === "work"
      ),
      besoeksreiser: currentEntries.filter(
        (_, index) => travelTypes[index] === "visit"
      ),
    };
    setInputValues(updatedValues);
    setShowResults(true);
    setShowResultButton(false);
    await getResults(updatedValues);
  };

  const handleUpdate = async () => {
    const updatedValues = {
      ...inputValues,
      arbeidsreiser: currentEntries.filter(
        (_, index) => travelTypes[index] === "work"
      ),
      besoeksreiser: currentEntries.filter(
        (_, index) => travelTypes[index] === "visit"
      ),
    };
    setInputValues(updatedValues);
    await getResults(updatedValues);
  };

  const handleReset = () => {
    setCurrentEntries([initialCurrentEntry]);
    setInputValues(initialInputValues);
    setShowResults(false);
    setDeductionResult(null);
    setShowResultButton(true);
    setTravelTypes(["work"]);
  };

  return (
    <>
      <InformationText />
      {currentEntries.map((entry, index) => (
        <TravelEntryInputs
          key={index}
          entry={entry}
          index={index}
          travelType={travelTypes[index]}
          onEntryChange={handleEntryChange}
          onTravelTypeChange={handleTravelTypeChange}
        />
      ))}
      <AdditionalTripButtons
        onAddTrip={handleAddTrip}
        onRemoveTrip={handleRemoveTrip}
        showRemoveButton={currentEntries.length > 1}
      />
      <TotalExpensesInput
        value={inputValues.utgifterBomFergeEtc}
        onChange={handleExpensesChange}
      />
      <div className="button-input">
        {showResultButton && (
          <Button variant="contained" onClick={handleResults}>
            Vis resultater
          </Button>
        )}
      </div>
      {showResults && (
        <ResultsOutput
          calculationResult={deductionResult}
          handleReset={handleReset}
          handleUpdate={handleUpdate}
        />
      )}
    </>
  );
};
