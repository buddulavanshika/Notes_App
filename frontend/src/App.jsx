import React from 'react';
import {Routes, Route} from 'react-router';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';
import toast,{Toaster} from 'react-hot-toast';


const App = () => {
  return (
    
    <div data-theme="valentine" className="p-10">
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        {/* react calls the HomePage component when we are at the root route */}
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
