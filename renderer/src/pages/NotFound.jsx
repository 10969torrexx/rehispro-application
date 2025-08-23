import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
export default function NotFound() { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        document.title = "Page Not Found";
        setIsLoggedIn(
            localStorage.getItem("user") ? true : false
        );
    }, []);

    return (
        <>
            <div className="text-center">
                <h1 className="font-bold text-[200px]">404</h1>
                <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
                <Link to={isLoggedIn ? "/dashboard" : "/"} className="mt-6 inline-block btn-primary text-white hover:text-white px-4 py-2 rounded-full">Go to Home</Link>
            </div>
        </>
    )
}