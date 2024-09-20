import React, { ChangeEvent } from "react";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

interface InputFieldsProps {
  inputValues: {
    km: number;
    antall: number;
    utgifterBomFergeEtc: number;
    [key: string]: number;
  };
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputFields: React.FC<InputFieldsProps> = ({
  inputValues,
  handleInputChange,
}) => {
  // TODO: sett valuesene her, og så ha en onChange på hele formen, i stedet for å ha en onChange på hvert input
  // TODO: sette limits på input feltene som oppgaven sier i A) + placeholders
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
    </>
  );
};
