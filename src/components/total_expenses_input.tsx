import React, { ChangeEvent } from "react";
import { TextField } from "@mui/material";
import { TotalExpensesProps } from "../interfaces/interface";

//Input for utgifter
export const TotalExpensesInput: React.FC<TotalExpensesProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="total-expenses-container">
      <TextField
        name="utgifterBomFergeEtc"
        label="Totale utgifter i kr"
        variant="outlined"
        type="number"
        value={value ?? ""}
        onChange={onChange}
        className="total-expenses-input"
      />
    </div>
  );
};
