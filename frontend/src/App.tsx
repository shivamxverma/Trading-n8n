import { BrowserRouter , Routes, Route} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Create-workflow';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/create-workflow' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
