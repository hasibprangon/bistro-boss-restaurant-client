import React, { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthContextProvider';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';



const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const { handleSignIn, setUser, handleGoogleSignup } = useContext(AuthContext);


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleGoogleLogin = () => {
        handleGoogleSignup()
            .then(result => {
                const user = result?.user;
                setUser(user);
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Sign Up Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state ? location?.state : "/");
            })
            .catch(err => {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `${err?.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }


    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        handleSignIn(email, password)
            .then(result => {
                const user = result?.user;
                setUser(user)
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                e.target.reset();
                navigate(location?.state ? location?.state : "/");
            })
            .catch(err => {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `${err.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    };

    const handleValidateCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }


    return (
        <div className="hero bg-base-200 min-h-screen relative">

            <Link  className='btn btn-md absolute top-0 left-0' to='/'>Home</Link>  

            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        {/* password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {/* recaptcha */}
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input type="text" ref={captchaRef} name='captcha' placeholder="Enter the Captcha" className="input input-bordered" required />
                            <button type='button' onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-2'>Validate</button>
                        </div>
                        <div className="form-control mt-6">
                            <button type='button' onClick={handleGoogleLogin} className='flex justify-center items-center gap-3 px-3 py-2 bg-gray-400 rounded-lg mb-4 text-white font-semibold'><FcGoogle className='text-lg' />Login With Google</button>
                            <button disabled={disabled} className="btn btn-primary">Login</button>
                        </div>
                    </form>

                    <p className='text-center font-semibold my-2'>New to this website? Please <span className='text-blue-600'><Link to='/signup'>Sign Up</Link></span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;