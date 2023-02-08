import React from 'react'
import Table from '../../../components/Table'
import JsonData from '../../../assets/data.json'

const Mantenaince = () => {
  return (
    <div className="min-w-full min-h-screen">
      <Table data={JsonData} />
    </div>
  )
}

export default Mantenaince