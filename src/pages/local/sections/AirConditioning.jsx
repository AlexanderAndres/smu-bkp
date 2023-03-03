import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageLoader from '../../../components/loader/PageLoader'
import { fetchLocalClimat } from '../../../state/slices/viewsSlice'

const AirConditioning = () => {
    const data = useSelector((state) => state.views.climatizacion.data[0])

    const { ceco } = useSelector(state => state.views.local.data[0])
    const dispatch = useDispatch()

    const [dataFetched, setDataFetched] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!dataFetched) {
            dispatch(fetchLocalClimat(ceco)).then((data) => {
                setDataFetched(true)
                setLoading(false)
            })
        }

        return () => { }
    }, [])

    if (loading || !data) {
        return <Loader show={loading ? true : false} />
    } else {
        console.log('Datos [Clima]:', data)
    }

    return (
        <>
            <div>AirConditioning</div>
        </>
    )
}

export default AirConditioning