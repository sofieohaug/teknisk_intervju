import React from "react";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import "../css/components.css";

export const InputFields: React.FC = () => {
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
            id="outlined-basic1"
            label="Antall km"
            variant="outlined"
            type="number"
          />
          <TextField
            id="outlined-basic2"
            label="Antall forekomster"
            variant="outlined"
            type="number"
          />
          <TextField
            id="outlined-basic3"
            label="Totale utgifter"
            variant="outlined"
            type="number"
          />
        </div>
      </div>
    </>
  );
};
