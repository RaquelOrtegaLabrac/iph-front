import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/use.users";
import { SyntheticEvent, useState } from "react";
import { User } from "../../models/user";
import "./login.scss";

export default function Login() {
  const [authError, setAuthError] = useState(false);
  const { handleLoginUser } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const element = event.target as HTMLFormElement;
    const inputs = element.querySelectorAll("input");
    const loggedUser = {
      userName: inputs[0].value,
      password: inputs[1].value,
    } as unknown as Partial<User>;
    if (!loggedUser.userName || !loggedUser.password) {
      setAuthError(true);
      navigate("/");
      return;
    }

    handleLoginUser(loggedUser);
    navigate("/dashboard");
    element.reset();
  };

  return (
    <>
      <div className="login-component">
        {authError && (
          <p className="error-message">Invalid username or password.</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="login-form"
          data-testid="login-form"
          aria-label="form"
        >
          <h2 className="login-title">Log In</h2>
          <span className="not-a-member">Not a member? </span>
          <Link to="/register">
            <span className="sign-up">Sign Up!</span>
          </Link>
          <div>
            <label className="label" htmlFor="userName">
              UserName:{" "}
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Ex. JohnDoe"
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password:{" "}
            </label>
            <input
              type="password"
              role="textbox"
              id="password"
              name="password"
              placeholder="Ex. jd495827"
              required
            />
          </div>

          <button
            className="login-submit"
            role="button"
            aria-selected="true"
            type="submit"
          >
            LOG IN
          </button>
        </form>
      </div>
    </>
  );
}
