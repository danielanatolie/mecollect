import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./modal.css";

class Modal extends Component {

  componentDidMount() {
    this.modalTarget = document.createElement("div");
    this.modalTarget.className = "modal";
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  componentWillUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    ReactDOM.render(
      <div>
        <div>
          {this.props.children}
          <hr />
          <button onClick={this.props.onClose}>Close</button>
        </div>
      </div>,
      this.modalTarget
    );
  }

  render() {
    return <noscript />;
  }
}

export default Modal;
