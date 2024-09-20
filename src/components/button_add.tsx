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
  const [inputValues, setInputValues] = useState<InputValues>({
    km: 0,
    antall: 0,
    utgifterBomFergeEtc: 0,
  });

  const [showTravelInput, setShowTravelInput] = useState<boolean>(false); // TODO: endre logikken annerledes, funker til en MVP per nå
  const [showResults, setShowResults] = useState<boolean>(false); // TODO: samme her

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    console.log(`Input name: ${name}, value: ${value}`);

    setInputValues({
      ...inputValues,
      [name]: Number(value),
    });

    console.log("Updated inputValues: ", inputValues);
  };

  const handleClick = () => {
    if (headline === "Legg til ny reise") {
      setShowTravelInput((prev) => !prev);
    } else if (headline === "Vis resultat") {
      setShowResults(true);
    }
  };

  return (
    <div>
      {showTravelInput && (
        <InputFields
          inputValues={inputValues}
          handleInputChange={handleInputChange}
        />
      )}
      <Button variant="outlined" onClick={handleClick}>
        {headline}
      </Button>
      {showResults && <Results inputValues={inputValues} />}{" "}
    </div>
  );
};
