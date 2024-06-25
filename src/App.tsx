import './App.css'
import GuestLayout from './layouts/GuestLayout';
import { AuthProvider } from "./provider/AuthProvider";
import { useRoutes } from "react-router-dom";
import Login from './Pages/Login';
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './Pages/Dashboard';
import Courses from './Pages/Courses';
import MyCourses from './Pages/MyCourses';
import Course from './Pages/Course';
import Register from './Pages/Register';

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/courses", element: <Courses /> },
        { path: "/course/:id", element: <Course /> },
        { path: "/my-courses", element: <MyCourses /> },
      ],
    },
    {
      path: "/auth",
      element: <GuestLayout />,
      children: [
        { path: "/auth/login", element: <Login /> },
        { path: "/auth/register", element: <Register /> },
      ],
    },
  ]);

  return <AuthProvider>{element}</AuthProvider>;
}

export default App
