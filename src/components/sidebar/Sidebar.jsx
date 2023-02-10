import React, { useEffect, useState } from 'react'
import { GoAlert, GoTriangleRight } from "react-icons/go";
import { HiDownload } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import SmuLogo from '../../assets/svgs/SmuLogo'
import './sidebar.css'

import MenuItems from './items.json'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthLogout } from '../../state/slices/authSlice';
import { setLocalsLoggout } from '../../state/slices/localsSlice';
import { downloadMantenaince, setViewsLogout } from '../../state/slices/viewsSlice';
import FileSaver from 'file-saver';
import axios from 'axios';
//import XLSX from 'sheetjs-style'

const Sidebar = () => {
    const [selected, setSelected] = useState(0)

    const { ceco } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [alert, setAlert] = useState(false)
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
            <div className="fixed flex flex-col max-w-full z-[9999] items-center max-h-screen h-screen overflow-hidden border-r-1 border-black text-gray-400 bg-gray-900">
                <a className="flex items-center px-3 mt-3" href="#">
                    <SmuLogo />
                    <span className="ml-2 text-sm font-bold">SMU</span>
                </a>
                <div className="w-full px-2">
                    <div className="flex flex-col items-center w-full mt-3 border-t border-black">
                        <NavLink onClick={() => navigate('/app')} className={`relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300}`}
                            to={`/app`}>
                            <GoTriangleRight className='w-4 h-4' />
                            <span className='pl-2'>Mapa</span>
                        </NavLink>
                        {
                            MenuItems.map((item, index) => {
                                return (
                                    <NavLink
                                        onMouseEnter={() => setAlert(false)}
                                        key={index} onClick={() => handdleSelected(index)} className={`relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${selected === index ? 'text-gray-200 bg-gray-700' : ''}`}
                                        to={`/local/${ceco + item.path}`}>
                                        {(item.name === 'Events') ? <GoAlert className='w-4 h-4' /> : <GoTriangleRight className='w-4 h-4' />}
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
                </div>
                <a onClick={hanndleLoggout}
                    className="flex hover:cursor-pointer items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300">
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="ml-2 text-sm font-medium">Loggout</span>
                </a>
            </div>
        </div>
    )
}

export default Sidebar