import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Banner from './components/Banner/Banner'
import Dashboard from './components/Dashboard/Dashboard'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Banner />} />
        <Route path='/dashboard'  element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App