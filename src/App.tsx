import Home from './pages/Home';
import Blog from './pages/Blog';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/blog/:id"
          element={<Blog />}
        />
      </Routes>
    </Router>
  );
}

export default App;
