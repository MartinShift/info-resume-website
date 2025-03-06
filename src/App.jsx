import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import './css/index.css'
import { MainPage } from './components/MainPage'
import PostPage from './components/PostPage'
import { Navigate } from 'react-router-dom'
import AllProjects from './components/AllProjects'
import AllPosts from './components/AllPosts'

function App() {
  return (
    <Router>
      <div className="App bg-slate-900 text-gray-100">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App