import React from "react";
import { Button } from "@mui/material";
import { TripButtonsProps } from "../interfaces/interface";

//Legge til og fjerne ekstra reiser
export const AdditionalTripButtons: React.FC<TripButtonsProps> = ({
  onAddTrip,
  onRemoveTrip,
  showRemoveButton,
}) => {
  return (
    <div className="trip-buttons-container">
      <Button
        variant="outlined"
        onClick={onAddTrip}
        className="add-trip-button"
      >
        Legg til ny reise
      </Button>
      {showRemoveButton && (
        <Button
          variant="outlined"
          color="error"
          onClick={onRemoveTrip}
          className="remove-trip-button"
        >
          Fjern reise
        </Button>
      )}
    </div>
  );
};
