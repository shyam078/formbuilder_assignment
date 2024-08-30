// import logo from './logo.svg';
// import './App.css';
// import CreateNewForm from './CreateNewForm';
// import WelcometoForm from './WelcometoForm';
// import FormCard from './FormCard';
// import FormList from './HomePage';
// function App() {
//   return (
//     <>
//     {/* <WelcometoForm/> */}
//     {/* <CreateNewForm/> */}
//     {/* <FormCard/> */}
//     <FormList/>
//     </>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcometoForm from './WelcometoForm';
import CreateNewForm from './CreateNewForm';
import ViewForm from './ViewForm';
import EditForm from './EditForm';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcometoForm  />} />
        <Route path="/form/create" element={<CreateNewForm />} />
        <Route path="/form/:id" element={<ViewForm />} />
        <Route path="/form/:id/edit" element={<EditForm />} />
      
      </Routes>
    </Router>
  );
}

export default App;
