import { Button } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { InputFields } from "./input_fields";
import { Results } from "./results";

interface InputValues {
  km: number;
  antall: number;
  utgifterBomFergeEtc: number;
  [key: string]: number; //Kan være jeg kun trenger denne
}

interface Props {
  headline?:
    | "Legg til ny reise"
    | "Vis resultat"
    | "Korriger verdier"
    | "Nullstill skjema"; // S: Endret fra string til union av ulike strings (sånn at den er type safe når man lager komponenten)
}

export const ButtonAdd: React.FC<Props> = ({ headline }) => {
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
        <Button variant="outlined" onClick={handleClick}>
          {headline}
        </Button>
      )}
      {/* {showResults && <Results inputValues={inputValues} />}{" "} */}
    </div>
  );
};
