import { Routes, Route } from "react-router-dom";

import Home from "./layouts/Home";
import Login from "./layouts/LogIn";
import SignInForm from "./components/forms/SignInForm";
import SignUpForm from "./components/forms/SignUpForm";

function App() {
  return (
    <div className="flex h-auto">
      <Routes>
        <Route element={<Login />}>
          <Route path="/sign-in" element={<SignInForm />}></Route>
          <Route path="/sign-up" element={<SignUpForm />}></Route>
        </Route>

        <Route index element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
