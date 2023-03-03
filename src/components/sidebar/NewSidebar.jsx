import React, { useState } from 'react';
import { BsFillHouseFill, BsLightbulbFill } from 'react-icons/bs';
import { FaCloudMeatball, FaFireExtinguisher, FaMapMarkerAlt } from 'react-icons/fa';
import { GiElectric } from 'react-icons/gi';
import { GoAlert } from 'react-icons/go';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { CgRatio } from 'react-icons/cg';
import { IoIosSnow } from 'react-icons/io';
import { MdElectricalServices, MdHealthAndSafety } from 'react-icons/md';
import { TbPrison } from 'react-icons/tb';
import { WiDaySnowWind } from 'react-icons/wi';
import { useDispatch } from 'react-redux';
import SmuLogo from '../../assets/svgs/SmuLogo';
import { setAuthLogout } from '../../state/slices/authSlice';
import { setLocalsLoggout } from '../../state/slices/localsSlice';
import { setViewsLogout } from '../../state/slices/viewsSlice';

import { NavLink, useNavigate, useParams } from 'react-router-dom';


const NewSidebar = () => {
    const items = [
        {
            name: "Mapa",
            path: "/app",
            icon: < FaMapMarkerAlt />
        },
        {
            name: "Events",
            path: "",
            icon: < GoAlert />
        },
        {
            name: "Arquitectura",
            path: "arquitectura",
            icon: < CgRatio />
        },
        {
            name: "Extinción de incendios",
            path: "incendios",
            icon: < FaFireExtinguisher />
        },
        {
            name: "Mantencion",
            path: "mantencion",
            icon: < MdHealthAndSafety />
        },
        {
            name: "Iluminación sala de ventas",
            path: "ilum-ventas",
            icon: < BsLightbulbFill />
        },
        {
            name: "Cubierta",
            path: "cubierta",
            icon: < BsFillHouseFill />
        },
        {
            name: "Climatización",
            path: "climatizacion",
            icon: < WiDaySnowWind />
        },
        {
            name: "Frio alimentario",
            path: "frio-alimentario",
            icon: < IoIosSnow />
        },
        {
            name: "Cortina metálica",
            path: "cortina",
            icon: < TbPrison />
        },
        {
            name: "Sistema eléctrico",
            path: "sistema-electrico",
            icon: < MdElectricalServices />
        },
        {
            name: "Generación eléctrica",
            path: "generacion-electrica",
            icon: < GiElectric />
        },
        {
            name: "Gases refrigerantes",
            path: "gases",
            icon: < FaCloudMeatball />
        }
    ]

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const hanndleLoggout = () => {
        dispatch(setAuthLogout())
        dispatch(setLocalsLoggout())
        dispatch(setViewsLogout())
        navigate('/')
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div
            onMouseOver={handleOpen}
            onMouseLeave={handleClose}
            //onClick={handleMobileOpen}
            className={`z-50 fixed h-screen ${open ? 'w-72' : 'w-20'} bg-gray-900 transition-all duration-500`}
        >
            <div className="flex flex-col h-full">
                <div className={`flex justify-evenly items-center gap-0 py-4 transition-all duration-500 h-20`}>
                    <SmuLogo className={`${!open && 'absolute'}`} />
                    <h1 className={``} style={{ opacity: open ? 1 : 0, transitionDuration: open ? '1.5s' : '0.01s', whiteSpace: 'nowrap' }}>
                        SMU CONNECT
                    </h1>
                </div>
                <div className={`h-[80%] transition-all duration-500`}>
                    <ul className={`flex flex-col h-full gap-y-4 justify-evenly transition-all duration-500`}>
                        {items.map((menu, index) => (
                            <li key={menu.name}>
                                <NavLink to={menu.path} className={`flex flex-row gap-x-4 items-center px-2 transition-all duration-500 cursor-pointer hover:bg-gray-800 w-[90%] h-8 mx-3 rounded-sm `}>
                                    <div className={`${!open && 'absolute right-9 transition-all duration-500'}`}>
                                        {menu.icon}
                                    </div>
                                    <span className={`ml-2 transition-all duration-500`}
                                        style={{
                                            opacity: open ? 1 : 0,
                                            transitionDuration: open ? '1.5s' : '0.01s',
                                            whiteSpace: 'nowrap'
                                        }}>
                                        {menu.name}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <a
                        onClick={hanndleLoggout}
                        className="absolute bottom-0 flex flex-row gap-2 transition-all duration-500 justify-center items-center hover:cursor-pointer h-12 w-full bg-slate-700 hover:bg-red-600 hover:text-red-100"
                    >
                        <span className={`${open ? '' : 'absolute'}`}
                            style={{
                                opacity: open ? 1 : 0, transitionDuration: open ? '2,5s' : '0.1s',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Cerrar Sesion
                        </span>
                        <RiLogoutCircleLine className={`${!open && "rotate-180 transition-all duration-500"}`} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewSidebar;
