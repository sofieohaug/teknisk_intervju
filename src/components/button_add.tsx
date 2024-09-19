import { Button } from "@mui/material";
import { useState } from "react";
import { InputFields } from "./input_fields";
import { Results } from "./results";

interface Props {
  headline?: string;
  //onClick: () => void;
}

//Gå bort fra universal knapp
export const ButtonAdd: React.FC<Props> = ({ headline }) => {
  const [showTravelInput, setShowTravelInput] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  //TODO: få at det legges til flere felt
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
      {showResults && <Results calculation={0} />}
    </div>
  );
};
