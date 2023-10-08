import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";

import { AuthContext, AuthProvider } from "./context/Auth/AuthContext";
import { RecipeProvider } from "./context/RecipeContext/RecipeContext";

import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <RecipeProvider>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/landing" />}
            />
            <Route
              path="/landing"
              element={!user ? <Landing /> : <Navigate to="/" />}
            />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </RecipeProvider>
    </AuthProvider>
  );
};

export default App;
