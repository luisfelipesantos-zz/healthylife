import React, { Component } from "react";

import "../style/login.css";
import logo from "../images/logo.png";

class Login extends Component {
  render() {
    return (
      <>
        <form id="loginForm">
          <img id='loginLogo' className="logo" alt="logo" src={logo} />
          <input id="userForm" placeholder="Usuário" type="text" />
          <input id="passForm" placeholder="Senha" type="password" />
          <button id="loginButton" type="submit">
            Entrar
          </button>
        </form>
      </>
    );
  }
}

export default Login;
