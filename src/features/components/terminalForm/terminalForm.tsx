import { useNavigate, useParams } from "react-router-dom";
import { useTerminals } from "../../hooks/use.terminals";
import { SyntheticEvent, useEffect } from "react";
import "./terminalForm.scss";
import { Terminal } from "../../models/terminal";

export default function TerminalForm() {
  const navigate = useNavigate();
  const {
    handleCreateTerminal,
    handleUpdateTerminal,
    terminals,
    handleLoadTerminals,
  } = useTerminals();
  const { id } = useParams();

  useEffect(() => {
    const loadTerminalData = async () => {
      if (id) {
        const existingTerminal: Terminal = terminals.find(
          (terminal) => terminal.id === id
        ) as Terminal;

        if (!existingTerminal) {
          await handleLoadTerminals();
        }

        const form = document.querySelector(
          ".terminal-form"
        ) as HTMLFormElement;

        if (form) {
          if (existingTerminal) {
            if (form.elements.namedItem("name")) {
              (form.elements.namedItem("name") as HTMLInputElement).value =
                existingTerminal.name;
            }

            if (form.elements.namedItem("battery")) {
              (form.elements.namedItem("battery") as HTMLInputElement).value =
                existingTerminal.battery;
            }

            if (form.elements.namedItem("wifiLevel")) {
              (form.elements.namedItem("wifiLevel") as HTMLInputElement).value =
                existingTerminal.wifiLevel;
            }

            if (form.elements.namedItem("isConnected")) {
              (form.elements.namedItem("isConnected") as HTMLInputElement).value =
                existingTerminal.isConnected;
            }

            if (form.elements.namedItem("group")) {
              (form.elements.namedItem("group") as HTMLSelectElement).value =
                existingTerminal.group;
            }
          }
        }
      }
    };

    loadTerminalData();
  }, [id, terminals, handleLoadTerminals]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const terminalForm = event.target as HTMLFormElement;
    const terminalData = new FormData(terminalForm);

    if (id) {
      await handleUpdateTerminal(id, terminalData);
    } else {
      await handleCreateTerminal(terminalData);
    }

    navigate("/dashboard");
    terminalForm.reset();
  };

  return (
    <div className="terminal-form-container">
      <form
        aria-label="form"
        className="terminal-form"
        id="terminal-form"
        onSubmit={handleSubmit}
      >
        {id ? (
          <h2 className="title-form">Edit</h2>
        ) : (
          <h2 className="title-form">Add</h2>
        )}
        <h3>SPECIFICATIONS</h3>
        <label className="name" htmlFor="name">
          Name:{" "}
        </label>
        <input type="text" placeholder="ex. iphone3" name="name"></input>
        <label className="battery" htmlFor="battery">
          Battery:{" "}
        </label>
        <input
          type="text"
          placeholder="ex. 30%"
          name="battery"
        ></input>
        <label className="wifilevel" htmlFor="wifilevel">
          WifiLevel{" "}
        </label>
        <input type="text" placeholder="ex. low" name="wifilevel"></input>
        <label className="isconnected" htmlFor="isConnected">
          Is connected?:{" "}
        </label>
        <input
          type="text"
          placeholder="..."
          name="isConnected"
        ></input>
        <label className="group" htmlFor="group">
          Group:{" "}
        </label>
        <select name="group">
          <option value="group1">group1</option>
        </select>

        {id ? (
          <button type="submit">Save Changes</button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
}
