import React from "react";
import "normalize.css";
import "./assets/scss/main.scss";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import AppContext from "./context/AppContext";

function App() {
  return (
    <AppContext>
      <div className="container">
        <Header />
        <main>
          <HomePage />
        </main>
      </div>
    </AppContext>
  );
}

export default App;
