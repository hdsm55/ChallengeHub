import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Challenges from './pages/Challenges';
import AddChallenge from './pages/AddChallenge';
import ChallengeDetails from './pages/ChallengeDetails';
import EditChallenge from './pages/EditChallenge';

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/challenges" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/add" element={<AddChallenge />} />
          <Route path="/challenges/:id" element={<ChallengeDetails />} />
          <Route path="/challenges/:id/edit" element={<EditChallenge />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
