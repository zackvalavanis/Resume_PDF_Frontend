import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import { Page } from './Page.jsx'
import './App.css'
import { Header } from './Header.jsx'

function App() {
  const router = createBrowserRouter([
    { 
      element: (
        <div>
          <Outlet />
        </div>
      ), 
      children: [
        {
          path: '/Page', 
          element: <Page/>
        }, 
        { 
          path: '/', 
          element: <Header />
        }
      ]
    }
  ])


  return (
    <RouterProvider router={router} />
  )
}

export default App
