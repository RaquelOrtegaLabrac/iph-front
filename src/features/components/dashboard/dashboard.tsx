import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../../hooks/use.users";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store/store";
import "./dashboard.scss";
import { useTerminals } from "../../hooks/use.terminals";
import { useChats } from "../../hooks/use.chats";
import { useGroups } from "../../hooks/use.groups";
import { useEffect } from "react";
import { Terminal } from "../../models/terminal";
export default function Dashboard() {
  const { handleLogoutUser } = useUsers();
  const navigate = useNavigate();
  const { terminals, handleLoadTerminals, handleDeleteTerminal } = useTerminals();
  const { chats, handleLoadChats } = useChats();
  const { groups, handleLoadGroups } = useGroups();
  const { id } = useParams();

  useEffect(() => {
    handleLoadTerminals();
  }, [handleLoadTerminals]);

  useEffect(() => {
    handleLoadChats();
  }, [handleLoadChats])

  useEffect(() => {
    handleLoadGroups();
  }, [handleLoadGroups])

  const { token } = useSelector((state: RootState) => state.users);

  const item: Terminal | undefined = terminals.find(
    (item) => item.id === id
  );

  const handleUser = () => {
    if (token) {
      runLogout();
    } else {
      // navigate("/login");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const runLogout = () => {
    handleLogoutUser();
  };

  const handleAddForm = () => {
    navigate("/create");
  };

  const handleDelete = () => {
    if (item) {
      handleDeleteTerminal(item.id);
      navigate("/dashboard")
    }

  }

  return (
    <>
      <div className="dashboard-component">
        <header>
          <h1>
            <span className="first-h1">UNUSUAL</span>
            <span className="second-h1">TERMINALS</span>
          </h1>

          <div className="dashboard-buttons">
            {token ? (
              <>
                <button onClick={handleUser}>Log out</button>
              </>
            ) : (
              <>
                <button onClick={handleRegister}>SIGN UP</button>
                <button onClick={handleUser}>LOG IN</button>
              </>
            )}
          </div>
          <h2>
            <span className="first-h2">DISCOVER UNIQUE MUSICAL TREASURES</span>
            <span className="second-h2">ADD NEW ONES AND MODIFY THEM</span>
          </h2>
            <h3>Terminals</h3>
            <ul>
  {terminals.map((terminal) => (
    <li key={terminal.id} onClick={() => navigate(`/update/${terminal.id}`)}>
      {terminal.name} - {terminal.battery} - {terminal.wifiLevel} - {terminal.isConnected} - {terminal.group}
      {token &&  (
        <>
          <button onClick={() => navigate(`/update/${item?.id}`)}>
            EDIT
          </button>
          <button onClick={handleDelete}>Delete this terminal</button>

          {/* <button onClick={() => handleDeleteTerminal(terminal.id)}>
            Delete this instrument
          </button> */}
        </>
      )}
    </li>
  ))}
</ul>

          <h3>Chats</h3>
          <ul>


            {chats.map((chat) => (
          <li key={chat.id}>
            {chat.name} - {chat.isActive}

          </li>
        ))}
        </ul>
        <h3>Group</h3>
        <ul>
        {groups.map((group) => (
          <li key={group.id}>
            {group.name}

          </li>
        ))}
      </ul>
        </header>

        <main>
          {token ? (
            <>
              <div className="add-terminal-button-container">
                <button
                  className="add-terminal-button"
                  onClick={handleAddForm}
                >
                  Add terminal
                </button>
              </div>

            </>
          ) : (
            <></>
          )}


        </main>
      </div>
    </>
  );
}

/* <button onClick={() => handleUpdateTerminal(terminal.id, /* FormData actualizado */
// Actualizar
// </button>
// <button onClick={() => handleDeleteTerminal(terminal.id)}>
// Eliminar
// </button> */}
