import { useDispatch } from "react-redux";
import { userLogout, signIn } from "../reducers/loginReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    console.log("logging in with", username, password);
    dispatch(signIn({ username, password }));
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <h1>Login to access your blogs</h1>
        username: <input id="username" type="text" name="username" />
      </div>
      <div>
        password: <input id="password" type="password" name="password" />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
