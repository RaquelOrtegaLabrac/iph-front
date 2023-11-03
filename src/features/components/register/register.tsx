import { SyntheticEvent } from "react";
import { useUsers } from "../../hooks/use.users";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";




export default function Register() {
  const { handleRegisterUser } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const inputs = formElement.querySelectorAll("input, select");

    const data: Record<string, any> = {};

    // Loop through the inputs and log their values
    Array.from(inputs).forEach((input) => {
      if (input instanceof HTMLInputElement) {
        data[input.name] = input.value;
      } else if (input instanceof HTMLSelectElement) {
        data[input.name] = input.value;
      }
    });

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
            <select id="chat" name="chat" required>
  <option value="chat1">chat1</option>
  <option value="chat2">chat2</option>
</select>
          </div>
          <button className="signup-submit" type="submit">
            SIGN UP
          </button>
        </form>
      </div>
    </>
  );
}
