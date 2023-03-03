import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/loader/Loader'
import { fetchLocalFoodCooling } from '../../../state/slices/viewsSlice'

const FoodCooling = () => {
    const data = useSelector((state) => state.views.frio_alimentario.data[0])

    const { ceco } = useSelector(state => state.views.local.data[0])
    const dispatch = useDispatch()

    const [dataFetched, setDataFetched] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!dataFetched) {
            dispatch(fetchLocalFoodCooling(ceco)).then((data) => {
                setDataFetched(true)
                setLoading(false)
            })
        }

        return () => { }
    }, [])

    if (loading || !data) {
        return <Loader show={loading ? true : false} />
    } else {
        console.log('Datos [fetchLocalFoodCooling]:', data)
    }

    return (
        <div>FoodCooling</div>
    )
}

export default FoodCooling
