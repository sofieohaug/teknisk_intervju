import React, { ChangeEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { Results } from "./results";
import { InputValues, TravelEntry } from "../interfaces";
import { calculateDeduction, isValidInput } from "../data/fetchData";
import "../css/components.css";

export const InputFields = () => {
  // TODO: sette limits på input feltene som oppgave A) sier
  const initialInputValues: InputValues = {
    arbeidsreiser: [],
    besoeksreiser: [],
    utgifterBomFergeEtc: null,
  };

  const initialCurrentEntry: TravelEntry = {
    km: null,
    antall: null,
  };

  const [inputValues, setInputValues] =
    useState<InputValues>(initialInputValues);
  const [currentEntries, setCurrentEntries] = useState<TravelEntry[]>([
    initialCurrentEntry,
  ]);

  const [showResults, setShowResults] = useState<boolean>(false);
  const [travelTypes, setTravelTypes] = useState<string[]>(["work"]);
  const [showResultButton, setShowResultButton] = useState(true);
  const [deductionResult, setDeductionResult] = useState<number | null>(null);

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

  const handleTravelTypeChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const updatedTravelTypes = [...travelTypes];
      updatedTravelTypes[index] = event.target.value;
      setTravelTypes(updatedTravelTypes);
    };
  const handleExpensesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      utgifterBomFergeEtc:
        event.target.value === "" ? null : Number(event.target.value),
    });
  };

  const handleRemoveTrip = (index: number) => {
    if (currentEntries.length > 1 && index > 0) {
      const updatedEntries = currentEntries.filter((_, i) => i !== index);
      const updatedTravelTypes = travelTypes.filter((_, i) => i !== index);
      setCurrentEntries(updatedEntries);
      setTravelTypes(updatedTravelTypes);
    }
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

  const handleAddTrip = () => {
    setCurrentEntries([...currentEntries, initialCurrentEntry]);
    setTravelTypes([...travelTypes, "work"]);
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
      {currentEntries.map((entry, index) => (
        <div key={index} className="travel-entry">
          <p className="text-information">Fyll inn:</p>
          <div className="input-container">
            <FormControl>
              <RadioGroup
                aria-labelledby={`travel-type-radio-group-label-${index}`}
                value={travelTypes[index]}
                name={`travel-type-radio-group-${index}`}
                onChange={handleTravelTypeChange(index)}
                className="radio-group"
              >
                <FormControlLabel
                  value="work"
                  control={<Radio />}
                  label="Arbeidsreise"
                />
                <FormControlLabel
                  value="visit"
                  control={<Radio />}
                  label="Besøksreise"
                />
              </RadioGroup>
            </FormControl>
            <div className="input-fields">
              <TextField
                name="km"
                label="Antall km"
                variant="outlined"
                type="number"
                value={entry.km ?? ""}
                onChange={handleEntryChange(index)}
              />
              <TextField
                name="antall"
                label="Antall forekomster"
                variant="outlined"
                type="number"
                value={entry.antall ?? ""}
                onChange={handleEntryChange(index)}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="trip-buttons-container">
        <Button
          variant="outlined"
          onClick={handleAddTrip}
          className="add-trip-button"
        >
          Legg til flere
        </Button>
        {currentEntries.length > 1 && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleRemoveTrip(currentEntries.length - 1)}
            className="remove-trip-button"
          >
            Fjern reise
          </Button>
        )}
      </div>
      <div className="total-expenses-container">
        <TextField
          name="utgifterBomFergeEtc"
          label="Totale utgifter i kr"
          variant="outlined"
          type="number"
          value={inputValues.utgifterBomFergeEtc ?? ""}
          onChange={handleExpensesChange}
          className="total-expenses-input"
        />
      </div>
      <div className="button-input">
        {showResultButton && (
          <Button variant="contained" onClick={handleResults}>
            Vis resultater
          </Button>
        )}
      </div>
      {showResults && (
        <Results
          calculationResult={deductionResult}
          handleReset={handleReset}
          handleUpdate={handleUpdate}
        />
      )}
    </>
  );
};
