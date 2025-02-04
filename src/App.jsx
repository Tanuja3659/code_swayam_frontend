import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Contactus from "./component/contactus";
import Aboutus from "./component/aboutus";
// import Home from "./component/home";
import Footer from "./component/footer";
import EventRouting from "./component/Events/EventRouting";
import Practice from "./component/Practice/Practice";

// import Practice from "./component/Practice/Practice"
// import EventRouting from "./component/Events/EventRouting"
import Ranking from "./component/Ranking/Ranking"
import ranks from './component/Ranking/ranks';
const App = () => {
  return (
    <Router>
      <div className="bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/events/*" element={<EventRouting />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
