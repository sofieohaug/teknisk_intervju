import React, { ChangeEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { ButtonAdd } from "./button_add";
import { Results } from "./results";

interface TravelEntry {
  km: number | null;
  antall: number | null;
}

interface InputValues {
  arbeidsreiser: TravelEntry[];
  besoeksreiser: TravelEntry[];
  utgifterBomFergeEtc: number | null;
}

export const InputFields = () => {
  // TODO: sette limits på input feltene som oppgaven sier i A) + placeholders
  const [inputValues, setInputValues] = useState<InputValues>({
    arbeidsreiser: [],
    besoeksreiser: [],
    utgifterBomFergeEtc: null,
  });

  const [currentEntry, setCurrentEntry] = useState<TravelEntry>({
    km: null,
    antall: null,
  });

  const [showResults, setShowResults] = useState<boolean>(false);
  const [travelType, setTravelType] = useState<string>("work");
  //const [showResults, setShowResults] = useState<boolean>(false);
  const [showResultButton, setShowResultButton] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentEntry({
      ...currentEntry,
      [name]: Number(value),
    });
  };

  const handleTravelTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTravelType(event.target.value);
  };
  const handleUtgifterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      utgifterBomFergeEtc: Number(event.target.value),
    });
  };

  const handleClick = () => {
    // Add the current travel entry to the appropriate category and update state
    setInputValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        utgifterBomFergeEtc: prevValues.utgifterBomFergeEtc, // Preserve the current utgifter
      };

      if (travelType === "work") {
        updatedValues.arbeidsreiser = [
          ...prevValues.arbeidsreiser,
          currentEntry,
        ];
      } else if (travelType === "visit") {
        updatedValues.besoeksreiser = [
          ...prevValues.besoeksreiser,
          currentEntry,
        ];
      }

      console.log("Updated input values:", updatedValues);

      return updatedValues;
    });

    setShowResults(true);
    setShowResultButton(!showResultButton);
  };

  return (
    <>
      <p className="text-information"> Fyll inn:</p>
      {
        // TODO: endre til noe mer semantisk riktig ser ut som det skal være en form med inuts og labels
      }
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {
          // TODO: fjerne inline styling og lage egen css fil som i results.tsx
        }
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="work"
            name="radio-buttons-group"
            onChange={handleTravelTypeChange}
            style={{ display: "flex", flexDirection: "column" }}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            justifyContent: "center",
          }}
        >
          <TextField
            name="km"
            label="Antall km"
            variant="outlined"
            type="number"
            value={currentEntry.km}
            onChange={handleInputChange}
          />
          <TextField
            name="antall"
            label="Antall forekomster"
            variant="outlined"
            type="number"
            value={currentEntry.antall}
            onChange={handleInputChange}
          />
          <TextField
            name="utgifterBomFergeEtc"
            label="Totale utgifter"
            variant="outlined"
            type="number"
            value={inputValues.utgifterBomFergeEtc}
            onChange={handleUtgifterChange}
          />
        </div>
      </div>
      {/* <ButtonAdd headline="Legg til ny reise" /> */}
      {showResultButton && (
        <Button variant="outlined" onClick={handleClick}>
          Vis resultater
        </Button>
      )}
      {showResults && <Results />}{" "}
    </>
  );
};
