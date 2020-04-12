import React from "react";

import "./Input.css";

const Input = ({ setMessage, sendMessage, message }) => (
  <div className="infoBarr">
    <div>
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Schreibe eine Nachricht"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={event =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <button className="sendButton" onClick={e => sendMessage(e)}>
          Senden
        </button>
      </form>
    </div>
  </div>
);

export default Input;
