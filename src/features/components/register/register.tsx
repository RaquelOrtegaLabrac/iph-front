import { SyntheticEvent } from "react";
import { useUsers } from "../../hooks/use.users";
import { User } from "../../models/user";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";

export default function Register() {
  const { handleRegisterUser } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const inputs = formElement.querySelectorAll("input");
    const data = {
      userName: inputs[0].value,
      password: inputs[1].value,
      chat: inputs[2].value,
    } as unknown as Partial<User>;
    handleRegisterUser(data);
    formElement.reset();
    navigate("/");
  };

  return (
    <>
      <div className="register-component">

        <form
          className="register-form"
          onSubmit={handleSubmit}
          aria-label="form"
        >
          <h2 className="register-title">Sign Up</h2>
          <span className="do-you-have-an-account">
            Do you have an account?{" "}
          </span>
          <Link to="/">
            <span className="log-in">Log In!</span>
          </Link>
          <div>
            <label className="label" htmlFor="userName">
              User Name:{" "}
            </label>
            <input
              type="text"
              id="userName"
              placeholder="Ex. JohnDoe"
              name="userName"
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password:{" "}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ex. jd495827"
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="chat">
              Choose your chat:{" "}
            </label>
            <input
              type="text"
              id="chat"
              name="chat"
              placeholder="Ex. chat1"
              required
            />
          </div>
          <button className="signup-submit" type="submit">
            SIGN UP
          </button>
        </form>
      </div>
    </>
  );
}
