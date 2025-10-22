
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Studio from "./pages/Studio";
import Navbar from "./components/Navbar";
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Support from './pages/Support';
import Projects from './pages/Projects';



const router = createBrowserRouter([
  {path: '/auth', element: <Auth/>},
  
  {path: '/', element: <Dashboard/>},
  { path: '/studio/:projectId', element: <Studio /> },
  {path: '/about', element: <About />}, 
  {path: '/contact', element: <Contact />},
  {path: '/support', element: <Support/>},
  {path: '/projects', element: <Projects />}
]);

export default function App() {
  return <>
    <RouterProvider router={router} />
    </>
}
