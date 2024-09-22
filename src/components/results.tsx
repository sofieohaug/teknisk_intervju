import { Button } from "@mui/material";
import "../css/components.css";
import { ResultsProps } from "../interfaces/interface";

//Resultat med knapper for redigering
export const ResultsOutput: React.FC<ResultsProps> = ({
  calculationResult,
  handleReset,
  handleUpdate,
}) => {
  return (
    <section className="results-container">
      <p className="text-information">
        {calculationResult !== null
          ? `Reisefradrag blir følgende: ${calculationResult} kr`
          : "Data ikke tilgjengelig"}
      </p>
      <div className="buttons-results">
        <Button variant="contained" onClick={handleUpdate}>
          Oppdater verdier
        </Button>
        <Button variant="contained" color="error" onClick={handleReset}>
          Nullstill skjema
        </Button>
      </div>
    </section>
  );
};
