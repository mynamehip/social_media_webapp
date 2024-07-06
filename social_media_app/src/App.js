import { Routes, Route } from "react-router-dom";

import Home from "./layouts/Home";
import Auth from "./layouts/Auth";
import Profile from "./layouts/Profile";
import SignInForm from "./components/forms/SignInForm";
import SignUpForm from "./components/forms/SignUpForm";
import NewPostBox from "./components/ui/NewPostBox";

function App() {
  return (
    <div className="flex h-auto">
      <Routes>
        <Route element={<Auth />}>
          <Route path="/sign-in" element={<SignInForm />}></Route>
          <Route path="/sign-up" element={<SignUpForm />}></Route>
        </Route>

        <Route path="/" element={<Home />}>
          <Route index element={<NewPostBox />}></Route>
          <Route path="/profile/:userId" element={<Profile />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
