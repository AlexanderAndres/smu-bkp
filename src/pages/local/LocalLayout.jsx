import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { useDispatch } from 'react-redux';
import { fetchLocalArc, fetchLocalFire, setArc } from '../../state/slices/localSlice';


const LocalLayout = () => {
    const { ceco } = useParams();
    const [loading, setLoading] = useState(true)
    const [dataFetched, setDataFetched] = useState(false);

    const dispatch = useDispatch()

    const dataFetch = [dispatch(fetchLocalArc(ceco)), dispatch(fetchLocalFire(ceco))]

    useEffect(() => {
        if (!dataFetched) {
            Promise.all(dataFetch).then(data => {
                //console.log('-> Promis All to fech state', data)
                setDataFetched(true)
                setLoading(false)
            })
        }
    }, [])

    return (
        <>
            {/* heading section */}
            {/* sidebar section */}
            <Loader show={loading ? true : false} />
            <section className=''>
                <div className='grid grid-cols-12'>
                    <div className='col-span-3 bg-black h-screen md:col-span-2'>
                        <Sidebar />
                    </div>


                    <div className='col-span-9 bg-gray-900 h-screen pl-10 md:col-span-10 overflow-y-auto'>
                        <Outlet ceco={ceco} />
                    </div>
                </div>
            </section>
        </>
    )

}

export default LocalLayout