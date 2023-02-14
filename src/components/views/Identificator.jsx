import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Identificator = () => {
    const [data, setData] = useState([])
    const local = useSelector((state) => state.views.local.data[0])
    //console.log('Data on identificator:', data)
    useEffect(() => {
        if (local) {
            setData(local)
        }
        return () => { }
    }, [local])

    return (
        <div className='grid place-items-start max-h-28'>
            <div className="bg-slate-100 text-gray-900 px-10 py-5 h-auto w-auto rounded-xl my-4 ml-7">
                <p className=''>{data.name} <b>#{data.ceco}</b></p>
                <p className=''><b>{data.address}</b> {data.region}</p>
            </div>
        </div>
    )
}

export default Identificator