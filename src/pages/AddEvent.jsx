import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PageLoader from '../components/loader/PageLoader'

const SendAlert = () => {
    const [loading, setLoading] = useState(true)
    const [eventsTypes, setEventsTypes] = useState([])
    const [checkboxs, setCheckboxs] = useState([])
    const [selectors, setSelectors] = useState([])
    const [formState, setFormState] = useState({ eventType: 0, checkboxs: {}, selectors: {} });
    const [selectedItem, setSelectedItem] = useState(0)

    const items = {
        3: {
            checkboxs: [{ id: 1, text: 'Personal del equipo interno', value: 1, name: 'interno' }, { id: 2, text: 'Personal de proveedor', value: 1, name: 'proveedor' }, { id: 3, text: 'Personal Inconsciente', value: 1, name: 'inconsciente' }, { id: 4, text: 'Personal Consciente', value: 1, name: 'consciente' },
            ],
            selectors: [
                {
                    id: 5, name: 'conciente', placeholder: 'Estado del/los pascientes', options: [{ value: '', text: 'Selecciona el estado del/los pascientes' }, { value: 1, text: 'Conciente' }, { value: 2, text: 'Inconciente' }]
                },
                {
                    id: 6, name: 'altura', placeholder: 'Rango de altura', options: [{ value: '', text: 'Selecciona rango de altura' }, { value: 1, text: 'De 1,8mts a 5mts' }, { value: 2, text: 'De 5mts a 10mts' }, { value: 3, text: 'Sobre 10mts' }]
                },
                {
                    id: 7, name: 'fractura', placeholder: '¿Existe fractura?', options: [{ value: '', text: 'Indica si existe o no fractura' }, { value: 1, text: 'Presenta fractura' }, { value: 2, text: 'No presenta fractura' }]
                },
                {
                    id: 8, name: 'autorizado', placeholder: '¿El trabajo estaba autorizado?', options: [{ value: '', text: 'Selecciona si el trabajo fue autorizado' }, { value: 1, text: 'Estaba autorizado' }, { value: 2, text: 'No estaba autorizado' }]
                },
            ],
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    useEffect(() => {
        axios.get(`https://smu-api.herokuapp.com/api/alert/types`).then((resp) => setEventsTypes(resp.data.data)).finally(setLoading(false));
        return () => { }
    }, [])

    useEffect(() => {
        if (formState.eventType in items) {
            setCheckboxs(items[formState.eventType].checkboxs);
            setSelectors(items[formState.eventType].selectors);
        } else {
            setCheckboxs([]);
            setSelectors([]);
        }
    }, [formState.eventType]);

    console.log('[FormState]:', formState)

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <>
            <PageLoader show={loading ? true : false} /><PageLoader show={loading ? true : false} />
            <form onSubmit={handleSubmit} className={`flex flex-col gap-2 min-h-screen w-screen p-8 bg-gray-800`}>
                <label className={`text-lg font-medium text-white`}>Elige un Tipo de alerta</label>

                <select name="eventType" value={formState.eventType} onChange={handleChange} className={`bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}>
                    <option value=''>Seleccione un tipo!</option>
                    {eventsTypes.map(type => <option onClick={() => setSelectedItem(type.id)} key={type.id} value={type.id}>{type.type}</option>)}
                </select>

                <span className={`pt-3 text-lg font-medium text-white`}>Detalles del Evento</span>
                {/* Aquí necesito los checkbox y selectors */}
                <div className={``}>
                    {checkboxs.map((checkbox) => (
                        <div key={checkbox.id} className={`flex items-center text-sm text-white my-2`}>
                            <label className={``}>
                                <input
                                    className='mr-2'
                                    type="checkbox"
                                    name={checkbox.name}
                                    checked={formState.checkboxs[checkbox.name] || false}
                                    onChange={(e) => {
                                        const { name, checked } = e.target;
                                        setFormState((prevState) => ({
                                            ...prevState,
                                            checkboxs: {
                                                ...prevState.checkboxs,
                                                [name]: checked,
                                            },
                                        }));
                                    }}
                                />
                                {checkbox.text}
                            </label>
                        </div>
                    ))}
                </div>
                <div className={``}>
                    {selectors.map((selector) => (
                        <div key={selector.id} className={`py-2`}>
                            <label htmlFor={selector.name}>{selector.placeholder}</label>
                            <select
                                className={`bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                                name={selector.name}
                                value={formState.selectors[selector.name] || ""}
                                onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFormState((prevState) => ({
                                        ...prevState,
                                        selectors: {
                                            ...prevState.selectors,
                                            [name]: value,
                                        },
                                    }));
                                }}
                            >
                                {selector.options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <textarea
                    type="text"
                    rows={5}
                    name="descripcion"
                    className="w-full min-h-[80px] text-sm p-4 text-slate-900 bg-gray-100 border-gray-300 rounded ring-offset-gray-800 focus:ring-2"
                    onChange={e => {
                        handleCount(e.target.value.length)
                        handleChange(e)
                    }}
                />
                <p>{500 - count}</p>
                <button onSubmit={handleSubmit} className={`active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 text-gray-400 bg-slate-700 rounded-xl font-bold text-lg hover:bg-red-900`}> Enviar </button>
                <button
                    className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 text-gray-400 bg-slate-700 rounded-xl font-bold text-lg hover:bg-red-900'>
                    Ir a eventos del local
                </button>
            </form>
        </>
    )
}

export default SendAlert