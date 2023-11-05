import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Register = lazy(() => import("../components/register/register"));
const Login = lazy(() => import("./login/login"));
const TerminalForm = lazy(() => import("./terminalForm/terminalForm"));
const Dashboard = lazy(() => import("./dashboard/dashboard"))


export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route
          path="/create"
          element={<TerminalForm></TerminalForm>}
        ></Route>
        <Route
          path="update/:id"
          element={<TerminalForm></TerminalForm>}
        ></Route>
      </Routes>
    </Suspense>
  );
}
