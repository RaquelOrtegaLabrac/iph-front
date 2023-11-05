import { useGroups } from "../../hooks/use.groups";
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
  const { groups, handleLoadGroups } = useGroups();

  useEffect(() => {
  handleLoadGroups();
}, [handleLoadGroups]);


  useEffect(() => {
          if (id) {
      const existingTerminal: Terminal = terminals.find(
        (terminal) => terminal.id === id
      ) as Terminal;
      if (!existingTerminal) {
        handleLoadTerminals();
      }

          if (existingTerminal) {
                      const form = document.querySelector(".terminal-form") as HTMLFormElement;
              (form.elements.namedItem("name") as HTMLInputElement).value =
                existingTerminal.name;
              (form.elements.namedItem("battery") as HTMLInputElement).value =
                existingTerminal.battery;
              (form.elements.namedItem("wifiLevel") as HTMLInputElement).value =
                existingTerminal.wifiLevel;
              (form.elements.namedItem("isConnected") as HTMLInputElement).value =
                existingTerminal.isConnected;
              (form.elements.namedItem("group") as HTMLSelectElement).value =
                existingTerminal.group;

          }
          }

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
          Battery (%):{" "}
        </label>
        <input
          type="text"
          placeholder="ex. 30%"
          name="battery"
        ></input>
        <label className="wifiLevel" htmlFor="wifiLevel">
          WifiLevel{" "}
        </label>
        <input type="text" placeholder="ex. low" name="wifiLevel"></input>
        <label className="isConnected" htmlFor="isConnected">
          Is connected?:{" "}
        </label>
        <input
          type="text"
          placeholder="..."
          name="isConnected"
        ></input>
    <label className="label" htmlFor="group">
  Choose your group:{" "}
</label>
<select id="group" name="group" required>
  {groups.map((group) => (
    <option key={group.id} value={group.name}>
      {group.name}
    </option>
  ))}
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
