import React, { ChangeEvent } from "react";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

interface InputFieldsProps {
  inputValues: {
    km: number | "";
    antall: number | "";
    utgifterBomFergeEtc: number | "";
    [key: string]: number | ""; // Index signature to match InputValues
  };
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputFields: React.FC<InputFieldsProps> = ({
  inputValues,
  handleInputChange,
}) => {
  return (
    <>
      <p className="text-information"> Fyll inn:</p>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
            value={inputValues.km} // Bound to state
            onChange={handleInputChange} // Change handler
          />
          <TextField
            name="antall"
            label="Antall forekomster"
            variant="outlined"
            type="number"
            value={inputValues.antall} // Bound to state
            onChange={handleInputChange} // Change handler
          />
          <TextField
            name="utgifterBomFergeEtc"
            label="Totale utgifter"
            variant="outlined"
            type="number"
            value={inputValues.utgifterBomFergeEtc} // Bound to state
            onChange={handleInputChange} // Change handler
          />
        </div>
      </div>
    </>
  );
};
