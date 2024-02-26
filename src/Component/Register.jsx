import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from '../Services/allAPI';

function Register() {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })


    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        const { username, email, password } = user
        if (!username || !email || !password) {
            toast.warning('Please Fill the Form Completely !')
        }
        else {
            const result = await registerAPI(user)
            // console.log(result);
            if (result.status == 200) {
                toast.success('Registration SuccessFull')
                navigate('/login')
            }
            else {
                toast.error(result.response.data)
            }

        }
    }


    return (
        <>
            <Container className='mt-5'>
                <div>
                    <Row className='mt-5'>
                        <Col md={6} className='mt-5 rounded'>
                            <img src="https://img.freepik.com/premium-vector/online-registration-sign-up-login-account-smartphone-app-user-interface-with-secure-password-mobile-application-ui-web-banner-access-cartoon-people-vector-illustration_2175-1068.jpg" style={{ height: '400px', width: '100%' }} alt="" />
                        </Col>
                        <Col md={6} className='bg rounded shadow mt-5' style={{ height: '400px' }}>
                            <div className='d-flex justify-content-center align-items-center flex-column'>
                                <h1 className='text-center mt-5' style={{ fontFamily: 'Protest Riot", sans-serif' }}>Register</h1>
                                <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" placeholder='Username' className='form-control mt-3 w-50' />
                                <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" placeholder='Email Address' className='form-control mt-3  w-50' />
                                <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" placeholder='Password' className='form-control mt-3 w-50' />
                                <button onClick={handleRegister} className='btn btn-danger w-50 mt-4 mb-3'>REGISTER</button>
                                <p>Already Have An Account ? <Link to={'/login'}>login</Link></p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </>
    )
}

export default Register