import { Link } from "react-router-dom";

export const NotFound = () => 
  <div className="flex flex-col justify-center items-center gap-8 p-8 min-h-screen w-full">
    <h1 className="text-7xl md:text-9xl font-bold transition-[font-size] duration-500">oops!</h1>
    <p className="text-base md:text-xl transition-[font-size] duration-500">404 <span className="italic">Page Not Found</span></p>
    <Link to="/" className="flex items-center gap-4 text-xl underline underline-offset-4">Go back</Link>
  </div>