import React, { useEffect } from 'react'
import './Login.css'
import bg from './bg.jpg'
import { useState } from 'react'
import axios from 'axios'
import Loading from '../Loading/Loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

const Login = () => {
    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, []);
    const [loading, setLoading] = useState(false)
    const CartItems = sessionStorage.getItem('cart');
    const [formData, setFormData] = useState({
        Email: "",
        Password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        try {
            const response = await axios.post("https://api.camrosteel.com/api/v1/Login", formData)
            console.log(response.data);
            toast.success('Login SuccessFull')
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('user', JSON.stringify(response.data.login))
            setLoading(false);
            window.location.href="/"
        }
        catch (err) {
            if (err.response && err.response.data) {
                console.log(err.response.data.message);
                toast.error(err.response.data.message);
            } else {
                console.log(err.message);  // Fallback to the error's message if no response
                toast.error('An unexpected error occurred');
            }
        
            setLoading(false);

        }
    }
    return (
        <>
        <ToastContainer />
            {loading ? (
                <Loading />
            ) : (<section className='login-account'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 d-none d-md-block p-0 img-relative">
                            <img src={bg} className='' alt="" />

                            <div className="img-absolute ">
                                <h2>Welcome to <br /> Camro </h2>
                                <p></p>
                            </div>
                        </div>
                        <div className="col-md-6 p-0">
                            <div className="form">
                                <h3>Login in Account </h3>
                                <p className='mt-[-22px]'>
                                    Discover the finest Utensils Brand, offering unparalleled quality and innovation to elevate your culinary experience to new heights.
                                </p>

                                <form >
                                    <input required type="email" name="Email" onChange={handleChange} value={formData.Email} placeholder='Email Id' />
                                    <input required type="password" name="Password" value={formData.Password} onChange={handleChange} placeholder='Password' />

                                    <div className="flex">
                                        <div className="keep">
                                            <Link to="/login/forget-password">Forget Password</Link>
                                        </div>
                                        <div className="member">
                                            <Link to="/sign-up">Create Account</Link>
                                        </div>
                                    </div>

                                    <input onClick={handleSubmit} type="submit" value="SIGN IN " />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>)}

        </>
    )
}

export default Login