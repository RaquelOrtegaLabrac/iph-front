import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState, store } from "../../core/store/store";
import { useMemo } from "react";
import { ac, registerUserAsync, loginUserAsync } from "../redux/users.slice";
import { User } from "../models/user";
import { UserRepository } from "../../core/services/user.repository";
import { url } from "../components/config";

export function useUsers() {
  const { users, currentUser, token } = useSelector(
    (state: RootState) => state.users

  );
  const dispatch: AppDispatch = useDispatch();
  const repo: UserRepository = useMemo(() => new UserRepository(url), []);

  const handleRegisterUser = async (user: Partial<User>) => {
    dispatch(registerUserAsync({ repo, user }));
  };

  const handleLoginUser = async (user: Partial<User>) => {
    await dispatch(loginUserAsync({ repo, user }));
    const loggedUser = store.getState().users.currentUser;
    console.log(loggedUser);
    localStorage.setItem("userToken", loggedUser.token as string);
  };

  const handleGetToken = (token: string) => {
    dispatch(ac.getToken(token));
  };

  const handleLogoutUser = () => {
    dispatch(ac.logoutUser());
    localStorage.removeItem("userToken");
  };

  return {
    users,
    handleRegisterUser,
    handleLoginUser,
    currentUser,
    token: token,
    handleGetToken,
    handleLogoutUser,
  };
}



// import { useSelector, useDispatch } from "react-redux";
// import { AppDispatch, RootState, store } from "../../core/store/store";
// import { useEffect, useMemo } from "react";
// import { ac, registerUserAsync, loginUserAsync } from "../redux/users.slice";
// import { User } from "../models/user";
// import { UserRepository } from "../../core/services/user.repository";
// import { url } from "../components/config";

// export function useUsers() {
//   const { users, currentUser, token } = useSelector(
//     (state: RootState) => state.users
//   );
//   const dispatch: AppDispatch = useDispatch();
// useEffect(() => {
//   console.log('USERS', users);

// }, [users])
//   const repo: UserRepository = useMemo(() => new UserRepository(url), []);
//     console.log('TOKEN:', token)

//   const handleRegisterUser = async (user: Partial<User>) => {
//     dispatch(registerUserAsync({ repo, user }));
//   };

//   const handleLoginUser = async (user: Partial<User>) => {
//     console.log("Before dispatch loginUserAsync");

//     await dispatch(loginUserAsync({ repo, user }));

//     console.log("After dispatch loginUserAsync");

//     const loggedUser = store.getState().users.currentUser.token;

//     // console.log("Token from:", loggedUser.token);
//     localStorage.setItem("userToken", loggedUser as string)

//     // Verifica si `loggedUser.token` es realmente un string antes de usarlo
//     // if (typeof loggedUser.token === 'string') {
//     //   // Resto del código...
//     //   // Aquí puedes llamar a la función que utiliza el token
//     // } else {
//     //   console.error("El token es undefined, no se realizará ninguna acción adicional.");
//     //   // Puedes manejar esto de acuerdo a tus necesidades, tal vez mostrando un mensaje al usuario, etc.
//     // }
//   };

//   const handleGetToken = (token: string) => {
//     dispatch(ac.getToken(token));
//   };

//   const handleLogoutUser = () => {
//     dispatch(ac.logoutUser());
//     localStorage.removeItem("userToken");
//   };

//   return {
//     users,
//     handleRegisterUser,
//     handleLoginUser,
//     currentUser,
//     token: token,
//     handleGetToken,
//     handleLogoutUser,
//   };
// }
