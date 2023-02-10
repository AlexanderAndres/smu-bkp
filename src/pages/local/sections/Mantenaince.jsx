import React, { useState } from 'react'
import Table from '../../../components/Table'
import JsonData from '../../../assets/data.json'
import { downloadMantenaince } from '../../../state/slices/viewsSlice'
import { useDispatch, useSelector } from 'react-redux'

const Mantenaince = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.views.mantencion.data)
  const [fetched, setFeched] = useState(false)

  return (
    <div className="min-w-full min-h-screen">
      <Table data={data} />
    </div>
  )
}

export default Mantenaince