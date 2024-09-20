import "../css/header.css";
import { ButtonAdd } from "./button_add";

interface InputValues {
  km: number | "";
  antall: number | "";
  utgifterBomFergeEtc: number | "";
}

interface ResultsProps {
  inputValues: InputValues;
}

export const Results: React.FC<ResultsProps> = ({ inputValues }) => {
  return (
    <div>
      <h2>Resultat:</h2>
      <p>Antall km: {inputValues.km}</p>
      <p>Antall forekomster: {inputValues.antall}</p>
      <p>Totale utgifter: {inputValues.utgifterBomFergeEtc}</p>
      <ButtonAdd headline={"Korriger verdier"} />
      <ButtonAdd headline={"Nullstill skjema"} />
    </div>
  );
};
