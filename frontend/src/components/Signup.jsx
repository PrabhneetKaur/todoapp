import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SIGNUP } from "../assets/utility/urlMaps";

const Signup = () => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: ""
    });

    const [popup, setPopup] = useState({
        state: false,
        message: null,
    });
    
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const validateEmail = (username) => {
        const usernameRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (usernameRegex.test(username)) {
            return true;
        } else {
            return false;
        }
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (passwordRegex.test(password)) {
            return true;
        } else {
            return false;
        }
    };

    const formSubmit = (e) => {
        e.preventDefault();
        if (formState.password !== formState.confirmPassword) {
            setPopup({
                state: true,
                message: "Passwords do not match"
            });
        } else if (!validateEmail(formState.username)) {
            setPopup({
                state: true,
                message: "Invalid email address"
            });
        } else if (!validatePassword(formState.password)) {
            setPopup({
                state: true,
                message: "Password must be at least 8 characters long and contain at least one letter and one number"
            });
        } else {
            axios.post(SIGNUP, formState)
                .then(res => {
                    if (res.status === 201) {
                        setFormState({
                            username: "",
                            password: "",
                            confirmPassword: "",
                            name: ""
                        });
                        navigate("/login");
                    }
                })
                .catch(err => {
                    if (err.response && err.response.status === 405) {
                        setPopup({
                            state: true,
                            message: "Email already exists"
                        });
                    } else {
                        setPopup({
                            state: true,
                            message: "Something went wrong"
                        });
                    }
                });
        }
    };

    useEffect(() => {
        let timeout = null;
        if (popup.state === true) {
            timeout = setTimeout(() => {
                setPopup({
                    state: false,
                    message: null
                });
            }, 3000);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [popup.state]);

    return (
        <div className="flex justify-center items-center p-8 min-h-screen w-full bg-dark">
            <form onSubmit={formSubmit} autoComplete="off" className="tilt flex flex-col items-start gap-8 py-6 px-8 bg-gray-dark-600 text-green-dark">
                <Link to="/" className="text-orange-dark"><i className="fal fa-long-arrow-left"></i> <span className="hover:underline underline-offset-4">Go back</span></Link>
                <h1 className="text-4xl font-black">Sign Up</h1>
                <div className="pt-4">
                    <input value={formState.name} onChange={handleChange} name="name" type="text" placeholder="Name*" autoComplete="off" required className="block py-1 px-3 bg-transparent rounded-lg outline-none border border-gray-light-100 focus:border-green-dark text-lg" />
                </div>
                <div>
                    <input value={formState.username} onChange={handleChange} name="username" type="email" placeholder="Email*" autoComplete="new-password" required className="block py-1 px-3 w-96 bg-transparent rounded-lg outline-none border border-gray-light-100 focus:border-green-dark text-lg" />
                </div>
                <div>
                    <input value={formState.password} onChange={handleChange} name="password" type="password" placeholder="Password*" autoComplete="new-password" required className="block py-1 px-3 w-96 bg-transparent rounded-lg outline-none border border-gray-light-100 focus:border-green-dark text-lg" />
                </div>
                <div>
                    <input value={formState.confirmPassword} onChange={handleChange} name="confirmPassword" type="password" placeholder="Confirm Password*" autoComplete="new-password" required className="block py-1 px-3 w-96 bg-transparent rounded-lg outline-none border border-gray-light-100 focus:border-green-dark text-lg" />
                </div>
                {!popup.state ? null : <p className="max-w-xs text-red-dark">*{popup.message}*</p>}
                <div className="flex gap-8 py-4">
                    <button className="py-2 px-4 rounded-lg bg-green-dark text-xl text-dark">signup</button>
                </div>
                
                <Link to="/login" className="text-teal-dark">Already a user?</Link>
            </form>
        </div>
    );
};

export default Signup;
