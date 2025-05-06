import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <>
      <Header userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      <Outlet context={{ userLoggedIn, setUserLoggedIn }} />
    </>
  );
}
