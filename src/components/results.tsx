import "../css/header.css";
import { ButtonAdd } from "./button_add";

interface Props {
  calculation: number;
}

export const Results: React.FC<Props> = ({ calculation }) => {
  return (
    <>
      <h6>Reisefradraget ditt blir følgende: {calculation} kr</h6>
      <ButtonAdd headline={"Korriger verdier"} />
      <ButtonAdd headline={"Nullstill skjema"} />
    </>
  );
};
