// App.tsx
import React from "react";
import "./css/App.css";
import { TravelInput } from "./components/user_information";
import { Header } from "./components/header";
import { InputFields } from "./components/input_fields";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <TravelInput />
        <InputFields />
      </header>
    </div>
  );
}

export default App;
