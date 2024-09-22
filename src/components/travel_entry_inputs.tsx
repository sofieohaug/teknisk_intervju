import React from "react";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { TravelEntryProps } from "../interfaces/interface";

//Inputs for type reise, km og forekomster
export const TravelEntryInputs: React.FC<TravelEntryProps> = ({
  entry,
  index,
  travelType,
  onEntryChange,
  onTravelTypeChange,
}) => {
  return (
    <div className="travel-entry">
      <p className="text-information">Fyll inn:</p>
      <div className="input-container">
        <FormControl>
          <RadioGroup
            aria-labelledby={`travel-type-radio-group-label-${index}`}
            value={travelType}
            name={`travel-type-radio-group-${index}`}
            onChange={onTravelTypeChange(index)}
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
            onChange={onEntryChange(index)}
          />
          <TextField
            name="antall"
            label="Antall forekomster"
            variant="outlined"
            type="number"
            value={entry.antall ?? ""}
            onChange={onEntryChange(index)}
          />
        </div>
      </div>
    </div>
  );
};
