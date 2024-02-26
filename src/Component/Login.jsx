import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import { Col, Container, Row } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { loginAPI } from '../Services/allAPI';
import { tokenContext } from '../Context/ContextShare';


function Login() {

    const { isAuthToken, setIsAuthToken } = useContext(tokenContext)

    const [userlogin, setUserLogin] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    // console.log(userlogin);

    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = userlogin
        if (!email || !password) {
            toast.warning('Please Fill The Form Completely.')
        }
        else {
            const result = await loginAPI(userlogin)
            console.log(result.data);
            if (result.status == 200) {
                if (email === "admin@gmail.com" && password === "admin123") {
                    toast.success('Login SuccessFull')
                    setIsAuthToken(true)
                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 2000)

                    setUserLogin({
                        email: '',
                        password: ""
                    })

                    sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                    sessionStorage.setItem("token", result.data.token)
                }
                else {
                    toast.success('Login SuccessFull')
                    setIsAuthToken(true)
                    setUserLogin({
                        email: '',
                        password: ""
                    })
                    setTimeout(() => {
                        navigate('/check-weather')
                    }, 2000)

                    sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                    sessionStorage.setItem("token", result.data.token)
                }
            }
            else {
                toast.error(result.response.data)
            }
        }
    }

    return (
        <>
            <div>
                <Container>
                    <Row className='mt-5'>
                        <Col md={6} className='mt-5'>
                            <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg" style={{ height: '450px', width: '100%' }} alt="" />

                        </Col>
                        <Col md={6} className='rounded mt-5' style={{ height: '500px', width: '400px' }} >
                            <h3 className='text-center mt-5 mb-4'>LOGIN</h3>
                            <input value={userlogin.email} onChange={(e) => { setUserLogin({ ...userlogin, email: e.target.value }) }} type="email" placeholder='Email Address' className='form-control mt-5' />
                            <input value={userlogin.password} onChange={(e) => { setUserLogin({ ...userlogin, password: e.target.value }) }} type="password" placeholder='Password' className='form-control mt-4' />
                            <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
                                <Button variant="contained" onClick={handleLogin} className='w-100 mb-3 bg-success' style={{ borderRadius: '80px' }}>LOGIN</Button>
                                <Link to={'/register'} className='w-100 mb-3 text-light'><Button variant="outlined" className='w-100 mb-3 mt-3' style={{ borderRadius: '80px' }}>REGISTER</Button></Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </>
    )
}

export default Login