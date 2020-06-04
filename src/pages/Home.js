import React, { Component } from "react";
import "../style/cadastro.css";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/pdv">
          <button className="registerButton">Abrir movimento</button>
        </Link>
      </div>
    );
  }
}

export default Home;
