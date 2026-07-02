import { useEffect, useState } from "react";
import FirstLoadPage from "./assets/component/first_page/FirstLoadPage";
import LoginPage from "./assets/component/log_page/LoginPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./assets/component/dashboard/Dashboard";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) {
      navigate("/loading");
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    navigate("/loginpage");
  };
  return (
    <>
      <Routes>
        <Route
          path="/loading"
          element={<FirstLoadPage onComplete={handleLoadingComplete} />}
        />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/dashborad" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
