import { Link } from "react-router-dom";
export default function NotFound() { 
    return (
        <>
            <div className="text-center">
                <h1 className="font-bold text-[200px]">404</h1>
                <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
                <Link to="/" className="mt-6 inline-block btn-primary text-white hover:text-white px-4 py-2 rounded-full">Go to Home</Link>
            </div>
        </>
    )
}