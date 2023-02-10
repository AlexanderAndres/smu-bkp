import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SmuLogo from '../../assets/svgs/SmuLogo'
import { setAuthLogout } from '../../state/slices/authSlice'
import { setLocalsLoggout } from '../../state/slices/localsSlice'
import { setViewsLogout } from '../../state/slices/viewsSlice'

const FilterSideBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showFilters, setShowFilters] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [userRole, setUserRole] = useState(0)

    const user = useSelector((state) => {
        if (state.auth) {
            //console.log('State in FILTER', state.auth)
            return state.auth
        }
    })

    useEffect(() => {
        setUserRole(user.role)
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

            className={`absolute ${userRole >= 4 ? 'h-auto' : 'h-full'} transition-all duration-700 ease-in-out top-0 right-0 w-64 bg-gray-900 text-gray-100 
            flex flex-col gap-4 z-50`}>
            <div className="p-4 flex flex-row uppercase font-semibold cursor-pointer text-md">
                <SmuLogo className='absolute' />
                <span className='ml-12 pt-1'>{user.user}</span>
            </div>
            {(userRole <= 4) ? (
                <nav className='pt-10 h-full grid grid-rows-6'>
                    <div className='px-2'>
                        <label className='' htmlFor="cars">Selecciona un formato:</label>
                        <select
                            className='h-8 py-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="format" id="format" form="formatSelector">
                            <option value="uni">All</option>
                            <option value="uni">Unimarc</option>
                            <option value="alvi">Alvi</option>
                            <option value="s10">Super 10</option>
                            <option value="m10">Mayorista 10</option>
                        </select>
                    </div>

                    <div className='px-2'>
                        <label className='' htmlFor="supervisor">Selecciona un supervisor:</label>
                        <select className='h-8 py-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="format" id="format" form="formatSelector">
                            <option value="name1">Name 1</option>
                            <option value="name2">Name 2c</option>
                            <option value="name3">Name 3</option>
                            <option value="name4">Name 4</option>
                        </select>
                    </div>
                </nav>
            ) : (null)
            }
            <div className={`grid place-items-center row-end-7 place-self-center h-52 w-full bg-gray-700 ${(userRole <= 4) ? '' : `${showMenu ? '' : 'hidden'} py-5`}`}>
                <a onClick={hanndleLoggout}
                    className="rounded-lg grid hover:cursor-pointer place-items-center h-8 w-36 hover:bg-red-700 border border-red-200 hover:border-red-500 hover:text-red-100 transition-colors">
                    Loggout
                </a>
            </div>
        </div>
    )
}

export default FilterSideBar