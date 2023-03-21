import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SmuLogo from '../../assets/svgs/SmuLogo'
import { setAuthLogout } from '../../state/slices/authSlice'
import { setLocalsLoggout, setSelectedFormat, setSelectedSuper, setSelectedJefeSuper, setSelectedAdmin, setSelectedEvent } from '../../state/slices/localsSlice'
import { setViewsLogout } from '../../state/slices/viewsSlice'
import { BiFilterAlt } from 'react-icons/bi'

const FilterSideBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showFilters, setShowFilters] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [userFilter, setUserFilter] = useState({})

    const selectedFormat = useSelector(state => state.locals.selectedFormat);
    const selectedEvent = useSelector(state => state.locals.selectedEvent);
    const selectedJefeSuper = useSelector(state => state.locals.selectedJefeSuper);
    const selectedSuper = useSelector(state => state.locals.selectedSuper);
    const selectedAdmin = useSelector(state => state.locals.selectedAdmin);
    const userRole = useSelector(state => state.auth.role);
    const usersFilters = useSelector((state) => state.locals.info ? state.locals.info.uniqueUsers : {});

    const user = useSelector((state) => {
        if (state.auth) {
            return state.auth
        }
    })

    useEffect(() => {
        if (usersFilters) {
            setUserFilter(usersFilters)
        }
    }, [usersFilters])

    const hanndleLoggout = () => {
        dispatch(setAuthLogout())
        dispatch(setLocalsLoggout())
        dispatch(setViewsLogout())
        navigate('/')
    }

    const switchRole = (elem) => {
        switch (elem) {
            case 1:
                return 'Getente'
            case 2:
                return 'Sub Gerente'
            case 3:
                return 'Jefe de Mantención'
            case 4:
                return 'Supervisor'
            case 5:
                return 'Administrador'
        }
    }

    return (
        <>
            <div className='z-50 absolute right-0 h-[10vh] w-screen md:h-screen md:w-[26vw]'>
                <div className={`flex rounded-lg bg-slate-900 text-slate-300 w-[90vw] md:w-80 m-5 transition-all duration-500
                    `}>
                    <div className="w-[70%] pl-5 py-2 uppercase cursor-pointer text-sm flex gap-5 justify-evenly items-center">
                        <div className=''>
                            <SmuLogo />
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-semibold'>{user.user}</span>
                            <span className='font-light'>{switchRole(user.role)}</span>
                        </div>
                    </div>
                    <BiFilterAlt
                        onClick={() => setShowMenu(!showMenu)}
                        className={`absolute cursor-pointer top-12 text-slate-300 h-6 w-6 md:hidden right-10 -translate-x-1/2 -translate-y-1/2`}
                    />
                </div>
                {(userRole <= 4) && (
                    <div className={`${(showMenu === true) ? 'flex' : 'opacity-0 ease-out transform translate-y-[100vh] -z-50'} md:translate-y-0 md:opacity-100 md:z-50 md:flex rounded-lg bg-slate-900 text-slate-300 
                w-[90vw] md:w-80 m-5 md:mt-5 transition-all duration-500 ease-in-out
                `}>
                        <nav className='py-5 w-full grid grid-rows-5 gap-6'>
                            <div className='px-5 flex flex-col gap-2'>
                                <label className='' htmlFor="formato">Formato:</label>
                                <select
                                    onChange={({ target }) => {
                                        const newValue = target.value === '<empty string>' ? '' : target.value;
                                        dispatch(setSelectedFormat(newValue))
                                    }}
                                    value={selectedFormat}
                                    className='h-8 py-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="format" id="format" form="formatSelector">
                                    <option value="">Todos</option>
                                    <option value="UNI">Unimarc</option>
                                    <option value="ALVI">Alvi</option>
                                    <option value="S10">Super 10</option>
                                    <option value="M10">Mayorista 10</option>
                                </select>
                            </div>

                            <div className='px-5 flex flex-col gap-2'>
                                <label className='' htmlFor="eventos">Eventos:</label>
                                <select
                                    onChange={({ target }) => {
                                        const newValue = target.value === '<empty string>' ? '' : target.value;
                                        dispatch(setSelectedEvent(newValue))
                                    }}
                                    value={selectedEvent}
                                    className='h-8 py-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="format" id="format" form="formatSelector">
                                    <option value="">Todos</option>
                                    <option value="1">Con eventos</option>
                                    <option value="0">Sin eventos</option>
                                </select>
                            </div>

                            {(usersFilters && userRole <= 3) && Object.keys(usersFilters).length > 0 && (
                                <div className='px-5 flex flex-col gap-2'>
                                    <label className='' htmlFor="jefeMant">Jefe de Mantenimiento:</label>
                                    <select
                                        onChange={({ target }) => {
                                            //console.log('Target value', target.value)
                                            const newValue = target.value === '<empty string>' ? '' : target.value;
                                            dispatch(setSelectedJefeSuper(newValue))
                                        }}
                                        value={selectedJefeSuper}
                                        className='h-8 py-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="format" id="format" form="formatSelector">
                                        <option value="">Todos</option>
                                        {Object.values(userFilter).map((user) => {
                                            if (user.role === 'jefeSupervisor') {
                                                return (
                                                    <option key={user.rut} value={user.rut}>
                                                        {user.firstName} {user.surname}
                                                    </option>
                                                )
                                            }
                                        })}
                                    </select>
                                </div>
                            )}

                            {(userRole <= 4) &&
                                <div className='px-5 flex flex-col gap-2'>
                                    <label className='' htmlFor="supervisor">Supervisor:</label>
                                    <select
                                        onChange={({ target }) => {
                                            //console.log('Target value', target.value)
                                            const newValue = target.value === '<empty string>' ? '' : target.value;
                                            dispatch(setSelectedSuper(newValue))
                                        }}
                                        value={selectedSuper}
                                        className='h-8 py-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="format" id="format" form="formatSelector">
                                        <option value="">Todos</option>
                                        {Object.values(userFilter).map((user) => {
                                            if (user.role === 'supervisor') {
                                                return (
                                                    <option key={user.rut} value={user.rut}>
                                                        {user.firstName} {user.surname}
                                                    </option>
                                                )
                                            }
                                        })}
                                    </select>
                                </div>}

                            <div className='px-5 flex flex-col gap-2'>
                                <label className='' htmlFor="administrador">Administrador:</label>
                                <select
                                    onChange={({ target }) => {
                                        //console.log('Target value', target.value)
                                        const newValue = target.value === '<empty string>' ? '' : target.value;
                                        dispatch(setSelectedAdmin(newValue))
                                    }}
                                    value={selectedAdmin}
                                    className='h-8 py-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="format" id="format" form="formatSelector">
                                    <option value="">Todos</option>
                                    {Object.values(userFilter).map((user) => {
                                        if (user.role === 'administrador') {
                                            return (
                                                <option key={user.rut} value={user.rut}>
                                                    {user.firstName} {user.surname}
                                                </option>
                                            )
                                        }
                                    })}
                                </select>
                            </div>
                        </nav>
                    </div>
                )}
                <a onClick={hanndleLoggout}
                    className={`z-50 hidden rounded-lg md:grid hover:cursor-pointer place-items-center h-12 bg-slate-700 hover:bg-red-600 text-red-100 transition-colors
                    w-[90vw]
                    md:w-80
                    m-5
                    md:m-5
                    `}>
                    Crear nueva alerta
                </a>

                <a onClick={hanndleLoggout}
                    className={`z-50 ${(showMenu === true) ? 'grid' : 'opacity-0 ease-out transform translate-y-5 -z-50'} md:translate-y-0 md:opacity-100 rounded-lg md:grid hover:cursor-pointer place-items-center h-12 bg-slate-700 hover:bg-red-600 text-red-100 transition-all ease-in-out
                w-[90vw]
                md:w-80
                m-5
                md:m-5 duration-500
                `}>
                    Cerrar Sesion
                </a>
            </div>
            <a onClick={hanndleLoggout}
                className={`z-50 md:hidden absolute bottom-0 left-0 rounded-lg hover:cursor-pointer grid place-items-center h-12 bg-slate-700 hover:bg-red-600 text-red-100 transition-all ease-in-out
                        w-[50vw]
                        md:w-80
                        m-5
                        md:m-5
                        `}>
                Crear nueva alerta
            </a>
        </>
    )
}

export default FilterSideBar

/*
<div
            onMouseOver={() => {
                //console.log('Show menu true')
                if (userRole >= 4) {
                    setShowMenu(true)
                } else {
                    setShowMenu(false)
                }
            }}

            onMouseLeave={() => {
                if (userRole >= 4) {
                    setShowMenu(false)
                } else {
                    setShowMenu(false)
                }
            }}

            className={`absolute hidden xl:block ${userRole >= 4 ? 'h-auto' : 'h-full'} transition-all duration-700 ease-in-out top-0 right-0 w-64 bg-gray-900 text-gray-100 
            flex flex-col gap-4 z-50`}>
            <div className="p-4 flex flex-row uppercase font-semibold cursor-pointer text-md">
                <SmuLogo className='absolute' />
                <span className='ml-12 pt-1'>{user.user}</span>
            </div>
            {(userRole <= 4) ? (
                <nav className='pt-10 h-[70%] grid grid-rows-6'>
                    <div className='px-2'>
                        <label className='' htmlFor="formato">Formato:</label>
                        <select
                            onChange={({ target }) => {
                                const newValue = target.value === '<empty string>' ? '' : target.value;
                                dispatch(setSelectedFormat(newValue))
                            }}
                            value={selectedFormat}
                            className='h-8 py-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="format" id="format" form="formatSelector">
                            <option value="">Todos</option>
                            <option value="UNI">Unimarc</option>
                            <option value="ALVI">Alvi</option>
                            <option value="S10">Super 10</option>
                            <option value="M10">Mayorista 10</option>
                        </select>
                    </div>

                    <div className='px-2'>
                        <label className='' htmlFor="eventos">Eventos:</label>
                        <select
                            onChange={({ target }) => {
                                const newValue = target.value === '<empty string>' ? '' : target.value;
                                dispatch(setSelectedEvent(newValue))
                            }}
                            value={selectedEvent}
                            className='h-8 py-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="format" id="format" form="formatSelector">
                            <option value="">Todos</option>
                            <option value="1">Con eventos</option>
                            <option value="0">Sin eventos</option>
                        </select>
                    </div>

                    {(usersFilters && userRole <= 3) && Object.keys(usersFilters).length > 0 && (
                        <div className='px-2'>
                            <label className='' htmlFor="jefeMant">Jefe de Mantenimiento:</label>
                            <select
                                onChange={({ target }) => {
                                    //console.log('Target value', target.value)
                                    const newValue = target.value === '<empty string>' ? '' : target.value;
                                    dispatch(setSelectedJefeSuper(newValue))
                                }}
                                value={selectedJefeSuper}
                                className='h-8 py-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="format" id="format" form="formatSelector">
                                <option value="">Todos</option>
                                {Object.values(userFilter).map((user) => {
                                    if (user.role === 'jefeSupervisor') {
                                        return (
                                            <option key={user.rut} value={user.rut}>
                                                {user.firstName} {user.surname}
                                            </option>
                                        )
                                    }
                                })}
                            </select>
                        </div>
                    )}

                    {(userRole <= 4) &&
                        <div className='px-2'>
                            <label className='' htmlFor="supervisor">Supervisor:</label>
                            <select
                                onChange={({ target }) => {
                                    //console.log('Target value', target.value)
                                    const newValue = target.value === '<empty string>' ? '' : target.value;
                                    dispatch(setSelectedSuper(newValue))
                                }}
                                value={selectedSuper}
                                className='h-8 py-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="format" id="format" form="formatSelector">
                                <option value="">Todos</option>
                                {Object.values(userFilter).map((user) => {
                                    if (user.role === 'supervisor') {
                                        return (
                                            <option key={user.rut} value={user.rut}>
                                                {user.firstName} {user.surname}
                                            </option>
                                        )
                                    }
                                })}
                            </select>
                        </div>}

                    <div className='px-2'>
                        <label className='' htmlFor="administrador">Administrador:</label>
                        <select
                            onChange={({ target }) => {
                                //console.log('Target value', target.value)
                                const newValue = target.value === '<empty string>' ? '' : target.value;
                                dispatch(setSelectedAdmin(newValue))
                            }}
                            value={selectedAdmin}
                            className='h-8 py-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="format" id="format" form="formatSelector">
                            <option value="">Todos</option>
                            {Object.values(userFilter).map((user) => {
                                if (user.role === 'administrador') {
                                    return (
                                        <option key={user.rut} value={user.rut}>
                                            {user.firstName} {user.surname}
                                        </option>
                                    )
                                }
                            })}
                        </select>
                    </div>
                </nav>
            ) : (null)
            }<a onClick={hanndleLoggout}
                className="absolute bottom-0 grid hover:cursor-pointer place-items-center h-12 w-full bg-slate-700 hover:bg-red-600 hover:text-red-100 transition-colors">
                Cerrar Sesion
            </a>
        </div>
*/