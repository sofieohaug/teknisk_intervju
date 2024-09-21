import "../css/header.css";
import { ButtonAdd } from "./button_add";

//TODO: Gjøre dette interfacet til egen fil

export const Results = () => {
  return (
    // TODO: kanskje endre fra en div til en section eller noe mer semantisk
    <div>
      <p className="text-information">Reisefradrag blir følgende: x</p>
      <ButtonAdd headline={"Korriger verdier"} />
      <ButtonAdd headline={"Nullstill skjema"} />
    </div>
  );
};
