import React, { useContext, useEffect, useState } from 'react'
import '../Css/Dasboard.css'
import { PieChart } from '@mui/x-charts';
import { Col, Row } from 'react-bootstrap';
import { BarChart } from '@mui/x-charts/BarChart';
import logo from '../Images/weather logo.png'
import { tokenContext } from '../Context/ContextShare';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const [username, setUsername] = useState("")

  const { isAuthToken, setIsAuthToken } = useContext(tokenContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
    }
  })

  const logout = () => {
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAuthToken(false)
    navigate('/')
  }

  return (
    <>
      <Row>
        <Col md={2}>
          <div className='bg-dark text-light text-center' style={{ height: '100vh' }}>
            <img src={logo} style={{ height: '100px', width: '100px' }} alt="" />
            <h3>Welcome {username}</h3>
            <div className='shadow mt-5 text-center p-2'>
              <h5> Charts</h5>
            </div>
            <div className='text-center rounded' style={{ marginTop: '350px' }}><button onClick={logout} className='btn btn-dark rounded mt-5' >Logout <i class="fa-solid fa-right-from-bracket"></i></button></div>
          </div>
        </Col>
        <Col md={4} className='mt-5'>
          <div className='shadow mt-5 p-3' style={{ height: '300px', width: '100%' }}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'Sunny' },
                    { id: 1, value: 15, label: 'Clouds' },
                    { id: 2, value: 20, label: 'Foggy' },
                  ],
                },
              ]}
            />
          </div>
        </Col>
        <Col md={5} className='mt-5'>
          <div className='shadow mt-5 p-3' style={{ height: '350px', width: '100%' }}>
            <BarChart
              series={[
                { data: [3, 4, 1, 6, 5], stack: 'A', label: 'Sunny' },
                { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Foggy' },
                { data: [4, 2, 5, 4, 1], stack: 'B', label: 'Clouds' },
                { data: [2, 8, 1, 3, 1], stack: 'B', label: 'Thunder' },
                { data: [10, 6, 5, 8, 9], label: 'Extra Sunny' },
              ]}
            />
          </div>
        </Col>
      </Row>


    </>
  )
}

export default Dashboard