import React, { useEffect, useState } from 'react'
import { GoAlert, GoTriangleRight } from "react-icons/go";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import SmuLogo from '../../assets/svgs/SmuLogo'
import './sidebar.css'

import MenuItems from './items.json'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthLogout } from '../../state/slices/authSlice';
import { setLocalsLoggout } from '../../state/slices/localsSlice';
import { setViewsLogout } from '../../state/slices/viewsSlice';

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