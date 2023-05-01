import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editFoodCooling } from '../state/slices/viewsSlice'
import PageLoader from './loader/PageLoader'

const EditFoodCooling = () => {
    const navigate = useNavigate()
    const local = useSelector((state) => state.views.local.data[0])

    const data = useSelector((state) => state.views.frio_alimentario?.data?.[0])
    const [ret, setRet] = useState({})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        cantidadCentral: data.cantidadCentral,
        capacidadCentral: data.capacidadCentral,
        suministroCentral: data.suministroCentral,
        unidadesCondensadoras: data.unidadesCondensadoras,
        cantidadUniConden: data.cantidadUniConden,
        capacidadUniConden: data.capacidadUniConden,
        suministroUniConden: data.suministroUniConden,
    }) 


    const handleNavFc = () => {
        navigate(`/local/${local.ceco}/frio-alimentario`)
    }

    const handleSubmit = event => {
        event.preventDefault()
        setLoading(true)
        dispatch(editFoodCooling({ id: data.id, info: formValues })).then(
            () => {
                console.log('Editado correctamente')
                setTimeout(() => {
                    navigate(`/local/${local.ceco}/frio-alimentario`)
                }, 1500)
            }
        )
        console.log(formValues)
    }
    return (
        <>
            <PageLoader show={loading ? true : false} /><PageLoader show={loading ? true : false} />
            <div className="min-h-screen w-screen px-6 md:p-8 bg-gray-800">
                <h1 className='text-xl py-4'>Editor estado de frio alimentario local: {local.ceco}</h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className={`py-2`}>
                        <label className={`my-2 text-md`}>Cantidad y tipo de central/es</label>
                        <textarea
                            type="text"
                            value={formValues.cantidadCentral}
                            onChange={(e) =>
                                setFormValues({ ...formValues, cantidadCentral: e.target.value })
                            }
                            name="description"
                            className="w-full h-[35px] text-sm p-2 mt-2 text-slate-900 bg-gray-100 border-gray-300 rounded ring-offset-gray-800 focus:ring-2"
                        />
                    </div>
                    <div className={`py-2`}>
                        <label className={`my-2 text-md`}>Capacidad de la/s central/es</label>
                        <textarea
                            type="text"
                            value={formValues.capacidadCentral}
                            onChange={(e) =>
                                setFormValues({ ...formValues, capacidadCentral: e.target.value })
                            }
                            name="description"
                            className="w-full h-[35px] text-sm p-2 mt-2 text-slate-900 bg-gray-100 border-gray-300 rounded ring-offset-gray-800 focus:ring-2"
                        />
                    </div>

                    <div className={`py-2`}>
                        <label className={`my-2 text-md`}>Central/es suministra</label>
                        <textarea
                            type="text"
                            value={formValues.suministroCentral}
                            onChange={(e) =>
                                setFormValues({ ...formValues, suministroCentral: e.target.value })
                            }
                            name="description"
                            className="w-full h-[55px] text-sm p-2 mt-2 text-slate-900 bg-gray-100 border-gray-300 rounded ring-offset-gray-800 focus:ring-2"
                        />
                    </div>

                    <div className={`py-2`}>
                        <label className={`my-2 text-md`}>¿tiene unidades condensadoras?</label>
                        <select
                            value={formValues.unidadesCondensadoras}
                            onChange={(e) =>
                                setFormValues({ ...formValues, unidadesCondensadoras: e.target.value })
                            }
                        >
                            <option value="1">si</option>
                            <option value="0">no</option>
                        </select>
                    </div>

                    {formValues.unidadesCondensadoras !== '0' &&
                        (
                            <>
                                <div className={`py-2`}>
                                    <label className={`my-2 text-md`}>Cant Unidades condensadoras</label>
                                    <textarea
                                        type="text"
                                        value={formValues.cantidadUniConden}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, cantidadUniConden: e.target.value })
                                        }
                                        name="description"
                                        className="w-full h-[35px] text-sm p-2 mt-2 text-slate-900 bg-gray-100 border-gray-300 rounded ring-offset-gray-800 focus:ring-2"
                                    />
                                </div>

                                <div className={`py-2`}>
                                    <label className={`my-2 text-md`}>Capacidad de unidades condensadoras</label>
                                    <textarea
                                        type="text"
                                        value={formValues.capacidadUniConden}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, capacidadUniConden: e.target.value })
                                        }
                                        name="description"
                                        className="w-full h-[35px] text-sm p-2 mt-2 text-slate-900 bg-gray-100 border-gray-300 rounded ring-offset-gray-800 focus:ring-2"
                                    />
                                </div>

                                <div className={`py-2`}>
                                    <label className={`my-2 text-md`}>suministro de unidades condensadoras</label>
                                    <textarea
                                        type="text"
                                        value={formValues.suministroUniConden}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, suministroUniConden: e.target.value })
                                        }
                                        name="description"
                                        className="w-full h-[35px] text-sm p-2 mt-2 text-slate-900 bg-gray-100 border-gray-300 rounded ring-offset-gray-800 focus:ring-2"
                                    />
                                </div>
                            </>
                        )
                    }
                    <button className={`my-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 text-gray-400 bg-slate-700 rounded-xl font-bold text-lg hover:bg-red-900`}> Guardar cambios </button>
                    <button
                        onClick={handleNavFc}
                        className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 text-gray-400 bg-slate-700 rounded-xl font-bold text-lg hover:bg-red-900'>
                        Ir a frio alimentario
                    </button>
                </form>
            </div>
        </>
    )
}

export default EditFoodCooling