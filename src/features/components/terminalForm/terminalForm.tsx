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
              (form.elements.namedItem("battery") as HTMLSelectElement).value =
                existingTerminal.battery;
              (form.elements.namedItem("wifiLevel") as HTMLSelectElement).value =
                existingTerminal.wifiLevel;
              (form.elements.namedItem("isConnected") as HTMLSelectElement).value =
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
          Battery:{" "}
        </label>
        <select id="battery" name="battery" required>
  <option value="0">0%</option>
  <option value="10">10%</option>
  <option value="20">20%</option>
  <option value="30">30%</option>
  <option value="40">40%</option>
  <option value="50">50%</option>
  <option value="60">60%</option>
  <option value="70">70%</option>
  <option value="80">80%</option>
  <option value="90">90%</option>
  <option value="100">100%</option>

</select>
        <label className="wifiLevel" htmlFor="wifiLevel">
          WifiLevel{" "}
        </label>
        <select id="wifiLevel" name="wifiLevel" required>
  <option value="low">low</option>
  <option value="high">high</option>
</select>
        <label className="isConnected" htmlFor="isConnected">
          Is connected?:{" "}
        </label>
        <select id="isConnected" name="isConnected" required>
  <option value="yes">yes</option>
  <option value="no">no</option>
</select>
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
