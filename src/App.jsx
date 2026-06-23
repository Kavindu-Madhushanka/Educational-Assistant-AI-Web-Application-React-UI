import { useState } from "react";
import FirstLoadPage from "./assets/component/first_page/FirstLoadPage";
import LoginPage from "./assets/component/log_page/LoginPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading ? (
        <FirstLoadPage onComplete={() => setIsLoading(false)} />
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
