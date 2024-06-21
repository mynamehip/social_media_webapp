import { Routes, Route } from "react-router-dom";

import Home from "./layouts/Home";
import Auth from "./layouts/Auth";
import Profile from "./layouts/Profile";
import SignInForm from "./components/forms/SignInForm";
import SignUpForm from "./components/forms/SignUpForm";

function App() {
  return (
    <div className="flex h-auto">
      <Routes>
        <Route element={<Auth />}>
          <Route path="/sign-in" element={<SignInForm />}></Route>
          <Route path="/sign-up" element={<SignUpForm />}></Route>
        </Route>
        <Route path="//profile" element={<Profile />}></Route>
        <Route index element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
