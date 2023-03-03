import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SmuLogo from '../../assets/svgs/SmuLogo'
import { setAuthLogout } from '../../state/slices/authSlice'
import { setLocalsLoggout, setSelectedFormat, setSelectedSuper, setSelectedJefeSuper, setSelectedAdmin } from '../../state/slices/localsSlice'
import { setViewsLogout } from '../../state/slices/viewsSlice'
import { filterGeoJson } from '../../state/slices/localsSlice'

const FilterSideBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showFilters, setShowFilters] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [userRole, setUserRole] = useState(0)
    const [userFilter, setUserFilter] = useState({})

    const selectedFormat = useSelector(state => state.locals.selectedFormat);
    const usersFilters = useSelector((state) => state.locals.info ? state.locals.info.uniqueUsers : {});

    const user = useSelector((state) => {
        if (state.auth) {
            //console.log('State in FILTER', state.auth)
            return state.auth
        }
    })

    useEffect(() => {
        setUserRole(0)
        setUserFilter(usersFilters)
        //setUserRole(user.role)
    }, [])

    const hanndleLoggout = () => {
        dispatch(setAuthLogout())
        dispatch(setLocalsLoggout())
        dispatch(setViewsLogout())
        navigate('/')
    }

    return (
        <div
            onMouseOver={() => {
                //console.log('Show menu true')
                if (userRole >= 4) {
                    setShowMenu(true)
                }
            }}

            onMouseLeave={() => {
                if (userRole >= 4) {
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
                        <label className='' htmlFor="cars">Formato:</label>
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

                    {Object.keys(usersFilters).length > 0 && (
                        <div className='px-2'>
                            <label className='' htmlFor="supervisor">Jefe de supervisor:</label>
                            <select
                                onChange={({ target }) => {
                                    //console.log('Target value', target.value)
                                    const newValue = target.value === '<empty string>' ? '' : target.value;
                                    dispatch(setSelectedJefeSuper(newValue))
                                }}
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

                    <div className='px-2'>
                        <label className='' htmlFor="supervisor">Supervisor:</label>
                        <select
                            onChange={({ target }) => {
                                //console.log('Target value', target.value)
                                const newValue = target.value === '<empty string>' ? '' : target.value;
                                dispatch(setSelectedSuper(newValue))
                            }}
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
                    </div>

                    <div className='px-2'>
                        <label className='' htmlFor="supervisor">Administrador:</label>
                        <select
                            onChange={({ target }) => {
                                //console.log('Target value', target.value)
                                const newValue = target.value === '<empty string>' ? '' : target.value;
                                dispatch(setSelectedAdmin(newValue))
                            }}
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
    )
}

export default FilterSideBar