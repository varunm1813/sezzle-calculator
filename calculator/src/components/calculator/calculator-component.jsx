import React, { Component } from "react";
import * as Stomp from "stompjs";

import "./calculator-styles.css";

import Display from "../display/display-component";
import Body from "../body/body-component";
import History from "../history/history-component";

export default class Calculator extends Component {
  state = {
    equation: "",
    answer: "",
    value: 0,
    error: false,
    history: [],
    client: null,
  };

  componentDidMount() {
    let ws = new WebSocket("ws://3.16.107.224:8080/ws");
    var client = Stomp.over(ws);
    let self = this;
    var connect_callback = function () {
      //if successful subscribe to cache topic on server
      client.subscribe("/topic/cache", (msg) => {
        let his = JSON.parse(msg.body).slice(-10);
        self.setState({ history: [...his] });
      });
      //get the data from server on startup
      fetch("http://3.16.107.224:8080/cache")
        .then((response) => response.json())
        .then((data) => self.setState({ history: [...data] }));
    };
    var error_callback = function (error) {
      // alert if server is disconnected
      alert("server disconnected");
    };
    client.connect({}, connect_callback, error_callback);
    this.setState({ client: client });
  }

  componentWillUnmount() {
    if (this.client) {
      this.client.unsubscribe();
    }
  }

  handleClick = (value) => {
    if (value === "C") {
      this.setState({ equation: "", answer: 0, error: "", value: 0 });
    } else if (value === "=") {
      // verify the input string with regex
      let regex = /^(\d+(\.\d+)?)([-+*/](\d+(\.\d+)?))*$/;
      let answer = "";
      let error = "";
      let equation = this.state.equation;
      try {
        if (!equation.match(regex)) {
          throw "invalid expression";
        }
        answer = eval(this.state.equation);
      } catch (err) {
        error = true;
      }
      if (!error && answer !== undefined && answer !== "") {
        this.setState({ answer: answer, error: error });
        if (this.state.client.connected === true) {
          this.state.client.send(
            "/app/history",
            {},
            this.state.equation + " = " + answer
          );
        }
      } else {
        this.setState({ equation: "", answer: "", error: error });
      }
    } else {
      this.setState((prevState) => ({
        equation: prevState.equation + value,
      }));
    }
  };
  render() {
    return (
      <div>
        <h1>Calculator</h1>
        <div className="calculator-app">
          <div className="calc">
            <div className="calculator">
              <Display
                equation={this.state.equation}
                answer={this.state.answer}
                error={this.state.error}
              />
              <Body click={this.handleClick} />
            </div>
          </div>
          <div className="history">
            <h1>History</h1>
            <br />
            <History history={this.state.history}></History>
          </div>
        </div>
      </div>
    );
  }
}
