import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/loader/Loader'
import { fetchCortina } from '../../../state/slices/viewsSlice'

const SteelScreen = () => {
    const data = useSelector((state) => state.views.climatizacion)

    const { ceco } = useSelector(state => state.views.local.data[0])
    const dispatch = useDispatch()

    const [dataFetched, setDataFetched] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!dataFetched) {
            dispatch(fetchCortina(ceco)).then((data) => {
                setDataFetched(true)
                setLoading(false)
            })
        }

        return () => { }
    }, [])

    if (loading || !data) {
        return <Loader show={loading ? true : false} />
    } else {
        // console.log('Datos [fetchCortina]:', data)
    }

    return (
        <div>SteelScreen</div>
    )
}

export default SteelScreen