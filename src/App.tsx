import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePageLayout from "./layout/HomePageLayout";
import Tracks from "./pages/Tracks";
import Artists from "./pages/Artists";
import Genre from "./pages/Genre";
import Album from "./pages/Album";
import Recent from "./pages/Recent";
import Auth from "./components/Auth/Auth";
import AuthContextProvider from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<HomePageLayout />}>
            <Route
              path="/track"
              element={
                <Auth>
                  <Tracks />
                </Auth>
              }
            />
            <Route path="/artist" element={<Artists />} />
            <Route path="/genres" element={<Genre />} />
            <Route path="/albums" element={<Album />} />
            <Route path="/recent" element={<Recent />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
