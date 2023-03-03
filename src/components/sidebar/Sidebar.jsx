import React, { useEffect, useState } from 'react'
import { GoTriangleRight } from "react-icons/go";
import { HiDownload } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import SmuLogo from '../../assets/svgs/SmuLogo'
import './sidebar.css'

import { GoAlert } from "react-icons/go";
import { FaMapMarkerAlt, FaFireExtinguisher, FaCloudMeatball } from "react-icons/fa";
import { MdHealthAndSafety, MdElectricalServices } from "react-icons/md";
import { BsLightbulbFill, BsFillHouseFill } from "react-icons/bs";
import { WiDaySnowWind } from "react-icons/wi";
import { IoIosSnow } from "react-icons/io";
import { TbPrison } from "react-icons/tb";
import { GiElectric } from "react-icons/gi";

//import MenuItems from './items'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthLogout } from '../../state/slices/authSlice';
import { setLocalsLoggout } from '../../state/slices/localsSlice';
import { setViewsLogout } from '../../state/slices/viewsSlice';
import axios from 'axios';
//import XLSX from 'sheetjs-style'

const items = [
    {
        name: "Events",
        path: "/",
        icon: < GoAlert />
    },
    {
        "name": "Arquitectura ",
        "path": "/arquitectura",
        "icon": < FaMapMarkerAlt />
    },
    {
        "name": "Extinción de incendios",
        "path": "/incendios",
        "icon": < FaFireExtinguisher />
    },
    {
        "name": "Mantencion",
        "path": "/mantencion",
        "icon": < MdHealthAndSafety />
    },
    {
        "name": "Iluminación sala de ventas",
        "path": "/ilum-ventas",
        "icon": < BsLightbulbFill />
    },
    {
        "name": "Cubierta",
        "path": "/cubierta",
        "icon": < BsFillHouseFill />
    },
    {
        "name": "Climatización",
        "path": "/climatizacion",
        "icon": < WiDaySnowWind />
    },
    {
        "name": "Frio alimentario",
        "path": "/frio-alimentario",
        "icon": < IoIosSnow />
    },
    {
        "name": "Cortina metálica",
        "path": "/cortina",
        "icon": < TbPrison />
    },
    {
        "name": "Sistema eléctrico",
        "path": "/sistema-electrico",
        "icon": < MdElectricalServices />
    },
    {
        "name": "Generación eléctrica",
        "path": "/generacion-electrica",
        "icon": < GiElectric />
    },
    {
        "name": "Gases refrigerantes",
        "path": "/gases",
        "icon": < FaCloudMeatball />
    }
]

const Sidebar = () => {
    const [selected, setSelected] = useState(0)

    const { ceco } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [alert, setAlert] = useState(false)
    const [sideBarActive, setSideBarActive] = useState(false)
    const data = useSelector((state) => state.views.events.data)

    useEffect(() => {
        //console.log('Alert state sidebar', data)
        if (data) {
            data.some(e => e.estado === 1) ? setAlert(true) : null
        }
    }, [])

    const handdleSelected = (item) => {
        setSelected(item)
    }

    const handleDowload = (e) => {
        e.preventDefault();

        axios.get(`https://smu-api.herokuapp.com/api/view3/download/${ceco}`, {
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `sabana-mantencíon-local${ceco}.xlsx`);
            document.body.appendChild(link);
            link.click();
        });
    }
    const handleSendAlert = (e) => {
        e.preventDefault();
        console.log('Handle send alert')
        navigate('/sendAlert')
    }

    const hanndleLoggout = () => {
        dispatch(setAuthLogout())
        dispatch(setLocalsLoggout())
        dispatch(setViewsLogout())
        navigate('/')
    }
    //<span className="absolute top-0 left-0 w-2 h-2 mt-3 ml-3 bg-red-500 rounded-full"></span>
    //<span className="absolute top-0 left-0 w-2 h-2 mt-3 ml-3 bg-red-500 animate-ping rounded-full"></span>
    return (
        <div>
            <div className={`fixed flex flex-col z-[9999] max-h-screen h-screen border-r-1 border-black text-gray-400 bg-gray-900`}>
                <a className="flex items-center mx-4 my-3" href="#">
                    <SmuLogo />
                    <span className="ml-2 text-sm font-bold">SMU</span>
                </a>
                <div className="flex flex-col items-center border-t border-black">
                    <NavLink onClick={() => navigate('/app')} className={`relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300}`}
                        to={`/app`}>
                        <GoTriangleRight className='w-4 h-4' />
                        <span className='pl-2'>Mapa</span>
                    </NavLink>
                    {
                        items.map((item, index) => {
                            return (
                                <NavLink
                                    onMouseEnter={() => setAlert(false)}
                                    key={index} onClick={() => handdleSelected(index)} className={`relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${selected === index ? 'text-gray-200 bg-gray-700' : ''}`}
                                    to={`/local/${ceco + item.path}`}>
                                    {(item.name === 'Events') ? <GoAlert className='w-4 h-4' /> : item.icon}
                                    {(alert && item.name === 'Events') ? <GoAlert className='absolute top-4 left-3 w-4 h-4 text-red-500 animate-ping' /> : null}
                                    <span className='pl-2'>{item.name}</span>
                                    {(item.name === 'Mantencion') ? (
                                        <IconContext.Provider onClick={handleDowload} value={{ className: 'w-6 h-6 p-1 rounded-full ml-24 border border-gray-300 hover:bg-gray-300 transition al ease-in-out hover:text-gray-900' }}>
                                            <HiDownload onClick={handleDowload} />
                                        </IconContext.Provider>
                                    ) : ''}
                                    {(item.name === 'Events') ? (
                                        <div className='ml-24' onClick={handleSendAlert}>
                                            <IconContext.Provider value={{ className: 'w-7 h-7 p-1 rounded-full hover:bg-gray-300 transition al ease-in-out hover:text-gray-900' }}>
                                                <AiOutlinePlusCircle />
                                            </IconContext.Provider>
                                        </div>
                                    ) : ''}
                                </NavLink>
                            )
                        })
                    }
                </div>
                <a onClick={hanndleLoggout}
                    className="absolute bottom-0 grid hover:cursor-pointer place-items-center h-12 w-full bg-slate-700 hover:bg-red-600 hover:text-red-100 transition-colors">
                    Cerrar Sesion
                </a>
            </div>
        </div>
    )
}

export default Sidebar