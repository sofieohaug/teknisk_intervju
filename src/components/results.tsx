import "../css/header.css";
import { ResultsProps } from "../interfaces";
import { ButtonAdd } from "./button_add";

export const Results: React.FC<ResultsProps> = ({ calculationResult }) => {
  return (
    // TODO: kanskje endre fra en div til en section eller noe mer semantisk
    <div>
      <p className="text-information">
        Reisefradrag blir følgende:{" "}
        {calculationResult !== null ? calculationResult : "Ingen data"}
      </p>
      <ButtonAdd headline={"Korriger verdier"} />
      <ButtonAdd headline={"Nullstill skjema"} />
    </div>
  );
};
