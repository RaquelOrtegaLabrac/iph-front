// import { SyntheticEvent, useEffect } from "react";
// import { useTerminals } from "../../hooks/use.terminals";
// import { useGroups } from "../../hooks/use.groups";
// import { useNavigate, useParams } from "react-router-dom";
// import "./terminalForm.scss";



// export default function TerminalForm() {
//   const {handleCreateTerminal} = useTerminals();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { groups, handleLoadGroups } = useGroups();


//   useEffect(() => {
//   handleLoadGroups();
// }, [handleLoadGroups]);

// const handleSubmit = (event: SyntheticEvent) => {
//   event.preventDefault();

//   const formElement = event.target as HTMLFormElement;
//   const inputs = formElement.querySelectorAll("input, select");

//   // Create a new FormData object
//   const data = new FormData();

//   // Loop through the inputs and log their values
//   Array.from(inputs).forEach((input) => {
//     if (input instanceof HTMLInputElement) {
//       console.log(input.name, input.value);
//       data.append(input.name, input.value);
//     } else if (input instanceof HTMLSelectElement) {
//       const selectedValue = input.options[input.selectedIndex].value;
//       console.log(input.name, selectedValue);
//       data.append(input.name, selectedValue);
//     }
//   });

//   // Log the FormData object before passing it to handleCreateTerminal
//   console.log("FormData before handleCreateTerminal:", data);

//   // Now, try to pass the FormData object to handleCreateTerminal
//   // Note: console.log after calling handleCreateTerminal to see its result
//   handleCreateTerminal(data).then((result) => {
//     console.log("handleCreateTerminal result:", result);
//   }).catch((error) => {
//     console.error("handleCreateTerminal error:", error);
//   });

//   // Log the FormData object after calling handleCreateTerminal
//   console.log("FormData after handleCreateTerminal:", data);

//   formElement.reset();
//   navigate("/dashboard");
// };




//   return (
//     <div className="terminal-form-container">
//       <form
//         aria-label="form"
//         className="terminal-form"
//         id="terminal-form"
//         onSubmit={handleSubmit}
//       >
//         {id ? (
//           <h2 className="title-form">Edit</h2>
//         ) : (
//           <h2 className="title-form">Add</h2>
//         )}
//         <h3>SPECIFICATIONS</h3>
//         <label className="name" htmlFor="name">
//           Name:{" "}
//         </label>
//         <input type="text" placeholder="ex. iphone3" name="name"></input>
//         <label className="battery" htmlFor="battery">
//           Battery:{" "}
//         </label>
//         <input
//           type="text"
//           placeholder="ex. 30%"
//           name="battery"
//         ></input>
//         <label className="wifiLevel" htmlFor="wifiLevel">
//           WifiLevel{" "}
//         </label>
//         <input type="text" placeholder="ex. low" name="wifiLevel"></input>
//         <label className="isConnected" htmlFor="isConnected">
//           Is connected?:{" "}
//         </label>
//         <input
//           type="text"
//           placeholder="..."
//           name="isConnected"
//         ></input>
// <label htmlFor="group">Choose your group:</label>
// <select id="group" name="group">
//   <option value="group1">group1</option>
//   <option value="group2">Group2</option>
// </select>

//         {id ? (
//           <button type="submit">Save Changes</button>
//         ) : (
//           <button type="submit">Submit</button>
//         )}
//       </form>
//     </div>
//   );

// }





import { useSelector } from "react-redux";
import { RootState } from "../../../core/store/store";
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
  const user = useSelector((state: RootState) => state.users)
  const { groups, handleLoadGroups } = useGroups();

  useEffect(() => {
  handleLoadGroups();
}, [handleLoadGroups]);


  useEffect(() => {
    // const loadTerminalData = async () => {
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
                console.log('EXISTING INSTRUMENT', existingTerminal)

          }
          }

  }, [id, terminals, handleLoadTerminals]);


  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const terminalForm = event.target as HTMLFormElement;
    const groupSelect = terminalForm.elements.namedItem("group") as HTMLSelectElement;
    const selectedGroup = groupSelect.options[groupSelect.selectedIndex].value;

    const terminalData = new FormData(terminalForm);
    terminalData.set("group", selectedGroup);

    console.log(id);
    console.log('TERMINALFORM: ', terminalData)

    if (id) {
      await handleUpdateTerminal(id, terminalData);
    } else {
      await handleCreateTerminal(terminalData);
      console.log('TERMINALFORM: ', terminalData)
    }

    navigate("/");
    terminalForm.reset();
  };


  // const handleSubmit = async (event: SyntheticEvent) => {
  //   event.preventDefault();

  //   const formElement = event.target as HTMLFormElement;
  //   const inputs = formElement.querySelectorAll("input");
  //   const data = {
  //     name: inputs[0].value,
  //     battery: inputs[1].value,
  //     wifiLevel: inputs[2].value,
  //     isConnected: inputs[3].value,
  //     group: inputs[4].value,
  //     owner: user.currentUser.id,
  //   } as Partial<Terminal>;
  //   handleCreateTerminal(data);
  //   console.log('DATAID', data.id)
  //       console.log('DATA', data)

  //   formElement.reset()

  //   navigate("/dashboard");
  // };

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
    <label className="label" htmlFor="group">
  Choose your group:{" "}
</label>
<select id="group" name="group" required>
  {groups.map((group) => (
    <option key={group.id} value={group.id}>
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
