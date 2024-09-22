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
  // TODO: sette limits på input feltene som oppgaven sier i A) + placeholders
  // TODO: Vurdere å gjøre om til å bare hente rett fra interfaces, må gjøre det om til en funksjon da
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
  const [currentEntry, setCurrentEntry] =
    useState<TravelEntry>(initialCurrentEntry);

  const [showResults, setShowResults] = useState<boolean>(false);
  const [travelType, setTravelType] = useState<string>("work");
  const [showResultButton, setShowResultButton] = useState(true);
  const [deductionResult, setDeductionResult] = useState<number | null>(null);

  const handleEntryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentEntry({
      ...currentEntry,
      [name]: value === "" ? null : Number(value),
    });
  };

  const handleTravelTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTravelType(event.target.value);
  };
  const handleExpensesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      utgifterBomFergeEtc:
        event.target.value === "" ? null : Number(event.target.value),
    });
  };

  const getResults = async (updatedValues: InputValues) => {
    if (isValidInput(inputValues)) {
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
      arbeidsreiser:
        travelType === "work"
          ? [...inputValues.arbeidsreiser, currentEntry]
          : inputValues.arbeidsreiser,
      besoeksreiser:
        travelType === "visit"
          ? [...inputValues.besoeksreiser, currentEntry]
          : inputValues.besoeksreiser,
    };

    setInputValues(updatedValues);
    setShowResults(true);
    setShowResultButton(false);
    await getResults(updatedValues);
  };

  const handleUpdate = async () => {
    const updatedValues = {
      ...inputValues,
      arbeidsreiser:
        travelType === "work"
          ? [...inputValues.arbeidsreiser.slice(0, -1), currentEntry]
          : inputValues.arbeidsreiser,
      besoeksreiser:
        travelType === "visit"
          ? [...inputValues.besoeksreiser.slice(0, -1), currentEntry]
          : inputValues.besoeksreiser,
    };

    setInputValues(updatedValues);
    await getResults(updatedValues);
  };

  const handleReset = () => {
    setCurrentEntry(initialCurrentEntry);
    setInputValues(initialInputValues);
    setShowResults(false);
    setDeductionResult(null);
    setShowResultButton(true);
    setTravelType("work");
    console.log("reset inputValues", inputValues);
  };
  return (
    <>
      <p className="text-information"> Fyll inn:</p>
      <div className="input-container">
        <FormControl>
          <RadioGroup
            aria-labelledby="travel-type-radio-group-label"
            value={travelType}
            name="travel-type-radio-group"
            onChange={handleTravelTypeChange}
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
            value={currentEntry.km ?? ""}
            onChange={handleEntryChange}
          />
          <TextField
            name="antall"
            label="Antall forekomster"
            variant="outlined"
            type="number"
            value={currentEntry.antall ?? ""}
            onChange={handleEntryChange}
          />
          <TextField
            name="utgifterBomFergeEtc"
            label="Totale utgifter"
            variant="outlined"
            type="number"
            value={inputValues.utgifterBomFergeEtc ?? ""}
            onChange={handleExpensesChange}
          />
        </div>
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
      )}{" "}
    </>
  );
};
