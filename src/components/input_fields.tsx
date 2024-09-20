import React, { ChangeEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { ButtonAdd } from "./button_add";
import { Results } from "./results";

interface InputValues {
  km: number;
  antall: number;
  utgifterBomFergeEtc: number;
  [key: string]: number;
}

export const InputFields = () => {
  // TODO: sette limits på input feltene som oppgaven sier i A) + placeholders
  const [inputValues, setInputValues] = useState<InputValues>({
    km: 0,
    antall: 0,
    utgifterBomFergeEtc: 0,
  });

  const [showResults, setShowResults] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(`Input name: ${name}, value: ${value}`);
    setInputValues({
      ...inputValues,
      [name]: Number(value),
    });
    console.log("Updated inputValues: ", inputValues);
  };

  const handleClick = () => {
    console.log("sjekk");
    setShowResults(true);
    return <Results inputValues={inputValues} />;
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
            value={inputValues.km}
            onChange={handleInputChange}
          />
          <TextField
            name="antall"
            label="Antall forekomster"
            variant="outlined"
            type="number"
            value={inputValues.antall}
            onChange={handleInputChange}
          />
          <TextField
            name="utgifterBomFergeEtc"
            label="Totale utgifter"
            variant="outlined"
            type="number"
            value={inputValues.utgifterBomFergeEtc}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <ButtonAdd headline="Legg til ny reise" />
      <Button variant="outlined" onClick={handleClick}>
        Vis resultater
      </Button>
      {showResults && <Results inputValues={inputValues} />}{" "}
    </>
  );
};
