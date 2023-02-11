import { Link, Outlet } from "react-router-dom";

const Home = () => 
    <div className="min-h-screen w-full bg-dark text-orange-dark">
        <nav className="flex justify-between sticky top-0 w-full p-4 bg-gray-dark-600/70">
            <Link to="/" className="text-4xl font-black">todo.app</Link>
            <Link to="/signup" className="flex items-center px-4 rounded-lg bg-orange-dark hover:bg-orange-light text-dark text-lg transition-colors duration-500">signUp</Link>
        </nav>
        <Outlet />
    </div>;

export default Home;