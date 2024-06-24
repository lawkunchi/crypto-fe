import { FC } from "react";
import ApplicationLogo from "../components/ApplicationLogo";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
const GuestLayout: FC = () => {

  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
    <div>
        <a href="/">
            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </a>
    </div>

    <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
    <Outlet />
    </div>
</div>
  );
};

export default GuestLayout;

