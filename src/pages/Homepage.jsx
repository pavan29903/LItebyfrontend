import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            localStorage.removeItem("token");
        }
        navigate('/signup');
    }, [navigate, token]);

    return null;
};
