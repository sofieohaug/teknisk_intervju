import "../css/header.css";
import { ButtonAdd } from "./button_add";

export const Results = () => {
  return (
    <>
      <h6>Reisefradraget ditt blir følgende: X kr</h6>
      <ButtonAdd headline={"Korriger verdier"} />
      <ButtonAdd headline={"Nullstill skjema"} />
    </>
  );
};
