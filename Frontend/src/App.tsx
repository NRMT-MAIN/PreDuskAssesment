import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfileList } from './components/ProfileList';
import { ProfileDetail } from './components/ProfileDetail';
import { ProfileForm } from './components/ProfileForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfileList />} />
        <Route path="/profile/:id" element={<ProfileDetail />} />
        <Route path="/create" element={<ProfileForm />} />
        <Route path="/edit/:id" element={<ProfileForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
