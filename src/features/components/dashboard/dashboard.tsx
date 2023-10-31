import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../../hooks/use.users";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store/store";
import { useTerminals } from "../../hooks/use.terminals";
import { useChats } from "../../hooks/use.chats";
import { useGroups } from "../../hooks/use.groups";
import { Button, Card, ProgressBar } from "react-bootstrap"; // Importa componentes de Bootstrap
import { getWiFiLevelAsPercentage } from "../utils";


export default function Dashboard() {
  const { handleLogoutUser } = useUsers();
  const navigate = useNavigate();

  const { terminals, handleLoadTerminals, handleDeleteTerminal } = useTerminals();
  const { chats, handleLoadChats } = useChats();
  const { groups, handleLoadGroups } = useGroups();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await handleLoadTerminals();
    };
    fetchData();
  }, [handleLoadTerminals]);

  useEffect(() => {
    handleLoadChats();
  }, [handleLoadChats]);

  useEffect(() => {
    handleLoadGroups();
  }, [handleLoadGroups]);

  const { token } = useSelector((state: RootState) => state.users);

  const handleUser = () => {
    if (token) {
      runLogout();
    } else {
      navigate("/");
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

  const handleDelete = (id: string | undefined) => {
    if (id) {
      handleDeleteTerminal(id);
      navigate("/dashboard");
    }
  };

  return (
    <div className="mb-3 text-light">
      <section className="bg-dark text-center ">

        <br></br> <br></br>
        <h1 className="mb-3 text-light display-4 ">Terminals, chats & groups</h1>
        <div className="mt-4">
          {token ? (
            <>
              <Button variant="outline-light" className="mr-2" onClick={handleUser}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-light" className="mr-2" onClick={handleRegister}>
                SIGN UP
              </Button>
              <Button variant="outline-light" className="mr-2" onClick={handleUser}>
                LOG IN
              </Button>
            </>
          )}
        </div>

        <div className="container my-5 py-4">
          <div className="row">
            <div className="col-12">
            <h2 className="h2 mb-3 text-light">Terminals</h2>
<div className="row justify-content-center">
  {terminals.map((terminal) => (
    <div key={terminal.id} className="col-12 col-md-6 col-lg-4">
      <Card className="my-3">
        <div className="card-body ">
          <h3 className="card-title text-secondary fs-4">{terminal.name}</h3>
          <div className="card-text mb-3">
            Bateria:
            <ProgressBar now={terminal.battery} label={`${terminal.battery}%`} />
          </div>
          <div className="card-text mb-3">
            WiFi:
            <ProgressBar
              now={getWiFiLevelAsPercentage(terminal.wifiLevel)}
              label={terminal.wifiLevel}
            />
          </div>
          <Button variant="dark" className="m-3" onClick={() => navigate(`/update/${terminal.id}`)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(terminal.id)}>
            Delete this terminal
          </Button>
        </div>
      </Card>
    </div>
  ))}
</div>

<h2 className="h2 mb-3 text-light">Chats</h2>
<div className="row justify-content-center">
  {chats.map((chat) => (
    <div key={chat.id} className="col-12 col-md-6 col-lg-4">
      <Card className="my-3">
        <Card.Body>
          <h3 className="card-title text-secondary fs-4">{chat.name}</h3>
          <p className="card-text">Participants:</p>
          <p className="card-text text display-1 text-center">{chat.participants.length}</p>
        </Card.Body>
      </Card>
    </div>
  ))}
</div>

<h2 className="h2 mb-3 text-light">Groups</h2>
<div className="row justify-content-center">
  {groups.map((group) => (
    <div key={group.id} className="col-12 col-md-6 col-lg-4">
      <Card className="card my-3">
        <Card.Body>
          <h3 className="card-title text-secondary fs-4">{group.name}</h3>
          <p className="card-text">Terminals:</p>
          <ul>
            {group.terminals?.map((terminal) => (
              <li key={terminal.id}>
                {terminal.name} - {terminal.battery} - {terminal.isConnected}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </div>
  ))}
</div>


              {token ? (
                <>
                  <Button variant="dark" onClick={handleAddForm}>
                    Add terminal
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
              }
