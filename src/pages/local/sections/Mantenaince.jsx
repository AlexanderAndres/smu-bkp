import React, { useEffect, useState } from 'react'
import Table from '../../../components/Table'
import JsonData from '../../../assets/data.json'
import { downloadMantenaince, fetchLocalMantenaince } from '../../../state/slices/viewsSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/loader/Loader'

const Mantenaince = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.views.mantencion.data)

  const [dataFetched, setDataFetched] = useState(false)
  const [loading, setLoading] = useState(true)

  const { ceco } = useSelector(state => state.views.local.data[0])
  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchLocalMantenaince(ceco)).then((data) => {
        setDataFetched(true)
        setLoading(false)
      })
    }

    return () => { }
  }, [])

  if (loading || !data) {
    return <Loader show={loading ? true : false} />
  }

  return (
    <div className="min-w-full min-h-screen">
      <Table data={data} />
    </div>
  )
}

export default Mantenaince