import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Sign from './components/sign/signin'; 
import Students from './components/staff/students';
import Events from './components/staff/events';
import Addevent from './components/staff/addevent';
import Registeredstudents from './components/staff/registeredstudents';
import Placed from './components/staff/placed';
import Eligible from './components/staff/eligible';
import Higherstudies from './components/staff/higherstudies';

import Profile from './components/student/profile';
import Companies from './components/student/companies';
import Feedback from './components/student/feedback';
import Review from './components/student/review';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Sign />}></Route>
          {/* {user.role === "teacher" && (
            <Route exact path="/only-teacher" component={OnlyTeacher} />
          )} */}
          <Route path="/student" element={<Profile />}></Route>
          <Route path="/student/events" element={<Events />}></Route>
          <Route path="/student/feedback" element={<Feedback />}></Route>
          <Route path="/student/profile" element={<Profile />}></Route>
          <Route path="/student/conmpanies" element={<Companies />}></Route>
          <Route path="/student/review" element={<Review />}></Route>


          <Route path="/staff" element={<Students />}></Route>
          <Route path="/staff/students" element={<Students />}></Route>
          <Route path="/staff/events" element={<Events />}></Route>
          <Route path="/staff/addevent" element={<Addevent />}></Route>
          <Route path="/staff/registeredstudents" element={<Registeredstudents />}></Route>
          <Route path="/staff/placedstudents" element={<Placed />}></Route>
          <Route path="/staff/eligiblestudents" element={<Eligible />}></Route>
          <Route path="/staff/higherstudies" element={<Higherstudies />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
