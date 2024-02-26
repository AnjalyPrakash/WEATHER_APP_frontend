import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import '../Css/Weather.css'
import { Col, Container, Row } from 'react-bootstrap';
import img1 from '../Images/img1.png'
import img2 from '../Images/img2.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenContext } from '../Context/ContextShare';
import { useNavigate } from 'react-router-dom';

function Weather() {

    const [search, setSearch] = useState("")

    const [weatherData, setWeatherData] = useState({})

    const [temperature, setTemperature] = useState(null)

    const [pressure, setPressure] = useState(null)

    const [humidity, setHumidity] = useState(null)

    const [wind, setWind] = useState(null)

    const [place, setPlace] = useState('')

    const [climate, setClimate] = useState(null)

    const [isClicked, setIsClicked] = useState(false)

    const { isAuthToken, setIsAuthToken } = useContext(tokenContext)

    const navigate = useNavigate()


    const handleSearch = (e) => {
        e.preventDefault()
        if (search) {
            fetchData();
        } else {
            toast.warning("Please Fill the Form!");
        }
    };

    console.log(search);

    const fetchData = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=30770429954753f1f58c9be6db66e184`).then((res) => {
            res.json().then((result) => {
                setWeatherData(result)
                if (result) {
                    const temp = weatherData.main["temp"]
                    const climate = (eval(temp - 273.15))
                    setTemperature(climate.toFixed(1))

                    const pressure = weatherData.main["pressure"]
                    setPressure(pressure)

                    const humidity = weatherData.main["humidity"]
                    setHumidity(humidity)

                    const wind = weatherData.wind["deg"]
                    setWind(wind)

                    const place = weatherData.name
                    setPlace(place)

                    const climate_condition = weatherData.weather[0].main
                    setClimate(climate_condition)

                    setIsClicked(true)

                }


            }).catch((err) => {
                console.log(err);
            })
        })
    }

    const logout = () => {
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        setIsAuthToken(false)
        navigate('/')
    }


    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <div className='d-flex justify-content-center align-items-center  mb-3' >
                <input type="text" placeholder='Search Place' onChange={(e) => setSearch(e.target.value)} className='form-control me-3 mt-3 w-50' style={{ borderRadius: '50px' }} />
                <button className='mt-3 btn btn-primary' onClick={handleSearch} style={{ borderRadius: '50px' }} >SEARCH</button>
                <button className='btn btn-dark mt-3 ms-5' onClick={logout}>Logout <i class="fa-solid fa-right-from-bracket"></i></button>
            </div>
            <div className='bg-imag'>
                <Container className='mb-5'>
                    <Row>
                        {isClicked && <Col md={6} className=' rounded  mt-5' >
                            <h1 style={{ marginTop: '190px' }}>{temperature != null ? temperature : ""} ℃ , <span className='text-primary'>{climate != null ? climate : ""}</span></h1>

                            <h3>{place}</h3>
                        </Col>}
                        <Col md={6}></Col>
                    </Row>
                </Container>

            </div>
            <Row className='mt-5 mb-5'>
                <Col md={4} >
                    <Container>
                        <div className='rounded shadow mt-5 d-flex justify-content-center flex-column align-items-center'>
                            <img src={img1} style={{ height: '100px', width: '100px' }} alt="" />
                            <h4 className='mt-2'>Humidity</h4>
                            <h4>{humidity != null ? humidity : ""}</h4>
                        </div>
                    </Container>
                </Col>
                <Col md={4}>
                    <Container>
                        <div className='rounded shadow mt-5 d-flex justify-content-center flex-column align-items-center'>
                            <img src="https://media.istockphoto.com/id/1276736188/vector/water-waves-blue-symbol-water-ripples-light-blue-ocean-sea-surface-symbol-aqua-flowing.jpg?s=612x612&w=0&k=20&c=P6Jyakd0htUc9IJjEjgzpSpBV19v9IT2V65vTBEJSVw=" style={{ height: '100px', width: '100px' }} alt="" />
                            <h4 className='mt-2'>Wind</h4>
                            <h4>{wind != null ? wind : ""}</h4>
                        </div>
                    </Container>
                </Col>
                <Col md={4}>
                    <Container>
                        <div className='rounded shadow mt-5 d-flex justify-content-center flex-column align-items-center'>
                            <img src={img2} style={{ height: '100px', width: '100px' }} alt="" />
                            <h4 className='mt-2'>Pressure</h4>
                            <h4>{pressure != null ? pressure : ""}</h4>
                        </div>
                    </Container>
                </Col>
            </Row>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </>
    )
}

export default Weather