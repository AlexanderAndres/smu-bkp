import React from 'react'

const Table = ({ data }) => {
    //console.log('The Data object', data)
    return (
        <div className='bg-gray-900 min-w-full '>
            <div className="w-full p-6">
                <table className="table-fixed bg-gray-900">
                    <thead className='bg-slate-800'>
                        <tr>
                            <th className="px-2 py-2 border-r">Estado</th>
                            <th className="px-2 py-1 border-x">Especialidad</th>
                            <th className="px-2 py-1 border-x">Q de equipos</th>
                            <th className="px-2 py-1 border-x">Periodicidad establecida</th>
                            <th className="px-2 py-1 border-x">Periodicidad real</th>
                            <th className="px-2 py-1 border-x">Nombre Empresa</th>
                            <th className="px-2 py-1 border-x">Costo</th>
                            <th className="px-2 py-1 border-x">EN</th>
                            <th className="px-2 py-1 border-x">FEB</th>
                            <th className="px-2 py-1 border-x">MAR</th>
                            <th className="px-2 py-1 border-x">ABR</th>
                            <th className="px-2 py-1 border-x">MAY</th>
                            <th className="px-2 py-1 border-x">JUN</th>
                            <th className="px-2 py-1 border-x">JUL</th>
                            <th className="px-2 py-1 border-x">AGOS</th>
                            <th className="px-2 py-1 border-x">SEPT</th>
                            <th className="px-2 py-1 border-x">OCT</th>
                            <th className="px-2 py-1 border-x">NOV</th>
                            <th className="px-2 py-1 border-l">DIC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((line, i) => {
                                return (
                                    <tr key={i} className='hover:bg-slate-600'>
                                        <td className="px-2 py-1 border">{(line.Estado == '&nbsp;') ? '' : line.Estado}</td>
                                        <td className="px-2 py-1 border">{(line.Especialidad == '&nbsp;') ? '' : line.Especialidad}</td>
                                        <td className="px-2 py-1 border">{(line.Q_de_equipos == '&nbsp;') ? '' : line.Q_de_equipos}</td>
                                        <td className="px-2 py-1 border">{(line.Periodicidad_establecida == '&nbsp;') ? '' : line.Periodicidad_establecida}</td>
                                        <td className="px-2 py-1 border">{(line.Periodicidad_real == '&nbsp;') ? '' : line.Periodicidad_real}</td>
                                        <td className="px-2 py-1 border">{(line.Nombre_Empresa == '&nbsp;') ? '' : line.Nombre_Empresa}</td>
                                        <td className="px-2 py-1 border">{(line.Costo == '&nbsp;') ? '' : line.Costo}</td>
                                        <td className="px-2 py-1 border">{(line.EN == '&nbsp;') ? '' : line.EN}</td>
                                        <td className="px-2 py-1 border">{(line.FEB == '&nbsp;') ? '' : line.FEB}</td>
                                        <td className="px-2 py-1 border">{(line.MAR == '&nbsp;') ? '' : line.MAR}</td>
                                        <td className="px-2 py-1 border">{(line.ABR == '&nbsp;') ? '' : line.ABR}</td>
                                        <td className="px-2 py-1 border">{(line.MAY == '&nbsp;') ? '' : line.MAY}</td>
                                        <td className="px-2 py-1 border">{(line.JUN == '&nbsp;') ? '' : line.JUN}</td>
                                        <td className="px-2 py-1 border">{(line.JUL == '&nbsp;') ? '' : line.JUL}</td>
                                        <td className="px-2 py-1 border">{(line.AGOS == '&nbsp;') ? '' : line.AGOS}</td>
                                        <td className="px-2 py-1 border">{(line.SEPT == '&nbsp;') ? '' : line.SEPT}</td>
                                        <td className="px-2 py-1 border">{(line.OCT == '&nbsp;') ? '' : line.OCT}</td>
                                        <td className="px-2 py-1 border">{(line.NOV == '&nbsp;') ? '' : line.NOV}</td>
                                        <td className="px-2 py-1 border">{(line.DIC == '&nbsp;') ? '' : line.DIC}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table