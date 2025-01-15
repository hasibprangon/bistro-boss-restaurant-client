import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthContextProvider';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, setUser, updateUserProfile, handleGoogleSignup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleRegister = () => {
        handleGoogleSignup()
            .then(result => {
                const user = result?.user;
                setUser(user);
                const userInfo = {
                    email: result?.user?.email,
                    name: result?.user?.displayName,
                    photoURL: result?.user?.photoURL
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res?.data?.insertedId) {
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: "Sign Up Successful",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/');
                        }
                    })
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

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoUrl = form.photoUrl.value;
        const email = form.email.value;
        const password = form.password.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Password must be contains at least an Uppercase, a Lowercase, and be at least 6 characters long",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        };
        const userInfo = {
            name, email, photoUrl
        }
        createUser(email, password)
            .then(result => {
                const user = result?.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoUrl: photoUrl })
                    .then(() => {
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res?.data?.insertedId) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Sign Up Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    form.reset();
                                    navigate('/')
                                }
                            })

                    })
                    .catch(err => {
                        Swal.fire({
                            icon: "error",
                            title: `${err.message}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: `${err.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <div className="hero bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen ">
            <Helmet>
                <title>Sign Up || Bistro Boss Restaurant</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row gap-10">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-6xl font-extrabold mb-6">
                        Sign Up Now!
                    </h1>
                    <p className="py-6 text-lg leading-relaxed">
                        Join our platform today to explore exclusive features. Secure your place in the community and elevate your experience with us!
                    </p>
                </div>
                <div className="card bg-white shadow-2xl md:w-1/2 max-w-lg p-8 rounded-lg">
                    <form onSubmit={handleSignUp} className="card-body space-y-4">
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-lg">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="input input-bordered border-purple-400 focus:ring focus:ring-purple-300"
                                required
                            />
                        </div>

                        {/* Photo URL */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-lg">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                name="photoUrl"
                                placeholder="Provide your photo URL"
                                className="input input-bordered border-purple-400 focus:ring focus:ring-purple-300"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-lg">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered border-purple-400 focus:ring focus:ring-purple-300"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-lg">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                className="input input-bordered border-purple-400 focus:ring focus:ring-purple-300"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button type='button' onClick={handleGoogleRegister} className='flex justify-center items-center gap-3 px-3 py-2 btn btn-primary btn-block bg-gradient-to-r from-purple-500 to-pink-500 border-none hover:from-pink-500 hover:to-purple-500 transform hover:scale-105 duration-300 mb-3'><FcGoogle className='text-lg' />Register With Google</button>
                            <button className="btn btn-primary btn-block bg-gradient-to-r from-purple-500 to-pink-500 border-none hover:from-pink-500 hover:to-purple-500 transform hover:scale-105 duration-300">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <p className='text-center font-semibold'>Already have an account? please <Link to='/login' className='text-orange-400'>Log In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;