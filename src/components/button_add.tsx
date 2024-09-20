import { Button } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { InputFields } from "./input_fields";
import { Results } from "./results";

// Defining the structure for inputValues with an index signature
interface InputValues {
  km: number | "";
  antall: number | "";
  utgifterBomFergeEtc: number | "";
  [key: string]: number | ""; // Index signature to allow dynamic keys
}

interface Props {
  headline?: string;
}

export const ButtonAdd: React.FC<Props> = ({ headline }) => {
  const [inputValues, setInputValues] = useState<InputValues>({
    km: "",
    antall: "",
    utgifterBomFergeEtc: "",
  });

  const [showTravelInput, setShowTravelInput] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

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
