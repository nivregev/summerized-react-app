import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import MyCards from "./components/myCard";
import SingIn from "./components/signIn";
import SingUp from "./components/signUp";

import SingOut from "./components/common/signOut";
import SingUpBiz from "./components/biz-signUp";
import ProtectedRoute from "./components/common/protectedRoute";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <ToastContainer />
      <header>
        <Navbar />
      </header>

      <main className="flex-fill container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />

          <Route
            path="my-cards"
            element={
              <ProtectedRoute onlyBiz>
                <MyCards />
              </ProtectedRoute>
            }
          />

          <Route path="sign-in" element={<SingIn />} />

          <Route path="sign-up" element={<SingUp />} />
          <Route path="sign-out" element={<SingOut />} />
          <Route path="sign-up-biz" element={<SingUpBiz />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
