
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light py-12 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md text-center">
        <h1 className="text-5xl font-bold mb-4 text-indigo">404</h1>
        <p className="text-xl text-neutral-dark mb-6">Oops! Page not found</p>
        <p className="mb-8 text-neutral-dark">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="bg-indigo hover:bg-indigo-light text-white font-medium py-3 px-6 rounded-xl inline-block transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
