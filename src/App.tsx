import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashBoardLayout from './dashboard/DashboardLayout'
import { Profile } from './dashboard/DashboardLayout'

// Regular page components (not part of dashboard layout)
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to LearnHub</h1>
        <p className="text-gray-600 mb-6">Your learning journey starts here</p>
        <a href="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Go to Dashboard
        </a>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About LearnHub</h1>
        <p className="text-gray-600 mb-4">
          LearnHub is a modern learning platform designed to help you achieve your educational goals.
        </p>
        <p className="text-gray-600">
          We offer a wide range of courses and learning materials to help you expand your knowledge and skills.
        </p>
      </div>
    </div>
  )
}

// Dashboard page components (wrapped in dashboard layout)

function MyLearning() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Learning</h1>
      <p className="text-gray-600">Your learning progress and courses will appear here.</p>
    </div>
  )
}

function ManageContent() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Content</h1>
      <p className="text-gray-600">Manage your learning content and resources here.</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Full page routes (not wrapped in dashboard layout) */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Dashboard layout routes (wrapped in dashboard layout) */}
        <Route path="/dashboard" element={<DashBoardLayout />}>
          <Route index element={<Profile />} />
          <Route path="my-learning" element={<MyLearning />} />
          <Route path="profile" element={<Profile />} />
          <Route path="manage-content" element={<ManageContent />} />
        </Route>

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App