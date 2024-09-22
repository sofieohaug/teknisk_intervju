// App.tsx
import React from "react";
import "./css/App.css";
import { Header } from "./components/header";
import { CalculationForm } from "./components/calculation_form";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <CalculationForm />
      </header>
    </div>
  );
}

export default App;
