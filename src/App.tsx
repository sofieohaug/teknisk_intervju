import React from "react";
import "./css/App.css";
import { TravelInput } from "./components/travel_input";
import { Header } from "./components/header";
import { InputFields } from "./components/input_fields";
import { ButtonAdd } from "./components/button_add";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <TravelInput />
        <InputFields />
        <ButtonAdd headline={"Legg til ny reise"} />
        <ButtonAdd headline={"Vis resultat"} />
      </header>
    </div>
  );
}

export default App;
