import { Button } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { InputFields } from "./input_fields";
import { Results } from "./results";
import { ButtonProps } from "../interfaces";

export const ButtonAdd: React.FC<ButtonProps> = ({ headline }) => {
  const [showTravelInput, setShowTravelInput] = useState<boolean>(false); // TODO: endre logikken annerledes, funker til en MVP per nå
  const [showResults, setShowResults] = useState<boolean>(false); // TODO: samme her
  const [showButton, setShowButton] = useState(true);

  const handleClick = () => {
    if (headline === "Legg til ny reise") {
      setShowTravelInput((prev) => !prev);
      setShowButton(!showButton);
    } else if (headline === "Vis resultat") {
      setShowResults(true);
    }
  };

  return (
    <div>
      {showTravelInput && <InputFields />}
      {showButton && (
        <Button variant="contained" onClick={handleClick}>
          {headline}
        </Button>
      )}
    </div>
  );
};
