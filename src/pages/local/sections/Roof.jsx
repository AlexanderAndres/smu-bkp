import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/loader/Loader'
import { fetchLocalCubierta } from '../../../state/slices/viewsSlice'

const Roof = () => {
    const data = useSelector((state) => state.views.cubierta.data)
    const [modal, setModal] = useState({})
    const [showModal, setShowModal] = useState(false)

    const { ceco } = useSelector(state => state.views.local.data[0])
    const dispatch = useDispatch()

    const [dataFetched, setDataFetched] = useState(false)
    const [loading, setLoading] = useState(true)
    const closeModal = () => {
        setShowModal(false)
        setModal({})
    }

    useEffect(() => {
        if (!dataFetched) {
            dispatch(fetchLocalCubierta(ceco)).then((data) => {
                setDataFetched(true)
                setLoading(false)
            })
        }

        return () => { }
    }, [])

    const handleModal = (img) => {
        // console.log('Image from modal:', img)
        setModal(img)
        setShowModal(true)
    }

    if (loading || !data) {
        return <Loader show={loading ? true : false} />
    }

    return (
        <>
            <div className='w-full min-h-screen grid place-items-center'>
                <div className="grid grid-cols-12 grid-rows-12 rounded-xl bg-slate-700 h-[90%] gap-2 w-[95%] p-6 drop-shadow-lg shadow-white">
                    <div className='rounded-xl h-40 grid place-items-center col-span-6 row-span-1 col-start-1 row-start-1 bg-slate-100 text-gray-900 first-line p-5'>
                        <p className=''><b>Tipo Canoas:</b>{data[0].tipo}</p>
                    </div>

                    <div className="grid grid-cols-2 grid-rows-3 gap-4 col-start-7 row-start-1 col-span-6 row-span-1">
                        <div className="bg-slate-600 rounded-xl col-start-1 col-span-3 row-span-3 bg-cover bg-center"
                            style={{ backgroundImage: `url(${data[0].pic})` }}
                            onClick={() => handleModal(data[0].pic)}
                        >
                        </div>
                    </div>
                </div>
                {showModal ? (
                    <div className="grid transition-all place-items-center h-screen w-screen absolute z-[999999] overflow-x-hidden overflow-y-auto inset-0 outline-none focus:outline-none bg-gray-900">
                        <div id="menu" className="w-[90%] h-[90%]">
                            <div className="w-96 md:w-full md:h-full dark:bg-gray-800 relative flex flex-col justify-center items-center bg-gray-900 py-16 px-4 md:px-24 xl:pt-24 xl:px-36">
                                <div role="banner">
                                    <img src={modal} alt="" className='h-full pb-6' />
                                </div>
                                <button onClick={closeModal} className="text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" aria-label="close">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default Roof