import { Button } from "@mui/material";
import { useState } from "react";
import { InputFields } from "./input_fields";
import { Results } from "./results";

interface Props {
  headline: string;
}

export const ButtonAdd: React.FC<Props> = ({ headline }) => {
  const [showTravelInput, setShowTravelInput] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleClick = () => {
    if (headline === "Legg til ny reise") {
      setShowTravelInput((prev) => !prev);
    } else if (headline === "Vis resultat") {
      setShowResults((prev) => !prev);
    }
  };

  return (
    <div>
      {" "}
      {showTravelInput && <InputFields />}
      <Button variant="outlined" onClick={handleClick}>
        {headline}
      </Button>
      {showResults && <Results />}
    </div>
  );
};
