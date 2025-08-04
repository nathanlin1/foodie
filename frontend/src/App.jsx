import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './routes/Homepage';
import Login from './routes/Login';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
