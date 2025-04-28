import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./utils/privateRoutes";
import { AuthProvider } from "./utils/authContext"

import Navbar from "./header/navbar";
import HomeIndex from "./home/homeIndex";
import SurveyIndex from "./survey/surveyIndex";
import LoginIndex from "./login/loginIndex";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <AuthProvider> 
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<HomeIndex />} />
            <Route path="/login" element={<LoginIndex />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/survey" element={<SurveyIndex />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
