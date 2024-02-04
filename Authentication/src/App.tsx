import AuthenticationLayout from "./_authentication/AuthenticationLayout";
import SignInForm from "./_authentication/authentication_forms/SignInForm";
import SignUpForm from "./_authentication/authentication_forms/SignUpForm";
import RootLayout from "./_root/RootLayout";
import AboutPage from "./_root/pages/AboutPage";
import HomePage from "./_root/pages/HomePage";

import "./index.css"

import {Route, Routes,} from "react-router-dom";




function App() {

  return (
    <main className="flex h-screen">
      <Routes>
        {/* set  public routes of your website */}
        <Route element={<AuthenticationLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
