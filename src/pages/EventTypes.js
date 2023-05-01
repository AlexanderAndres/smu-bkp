export const items = {
    // Amago de incendio #probado
    1: {
        checkboxes: [
            { id: 1, text: 'Olor a quemado', value: 1, name: 'olorQuemado', defaultValue: 0 },
            { id: 2, text: 'Llama latente', value: 1, name: 'llamaLatente', defaultValue: 0 },
            { id: 3, text: 'Alarma de humo activada', value: 1, name: 'alarmaHumo', defaultValue: 0 },
            { id: 4, text: 'Se llamó a bomberos', value: 1, name: 'avisoBomberos', defaultValue: 0 },
        ],
        selectors: [
            {
                id: 5, name: 'lugar_id', placeholder: 'Lugar afectado', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona el lugar afectado' },
                    { value: 1, text: 'Sala de ventas' },
                    { value: 2, text: 'Recepción' },
                    { value: 3, text: 'Baños' },
                    { value: 4, text: 'Oficinas' },
                    { value: 5, text: 'Cubierta' },
                    { value: 6, text: 'Sala de máquinas' },
                    { value: 7, text: 'Sala de Arqueo' },
                    { value: 8, text: 'Exterior' }
                ]
            }
        ],
    },
    // Caída de frío #probado
    2: {
        checkboxes: [],
        selectors: [
            {
                id: 7, name: 'lugar', placeholder: 'Indica el lugar afectado', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona lugar afectado' },
                    { value: 1, text: 'Cámaras' },
                    { value: 2, text: 'Murales' },
                    { value: 3, text: 'Islas' },
                    { value: 4, text: 'Vitrinas' }
                ]
            }, {
                id: 8, name: 'rangoTemperatura', placeholder: 'Indica el rango de temperatura', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona rango de temperatura' },
                    { value: 1, text: 'Media temperatura' },
                    { value: 2, text: 'Baja temperatura' }
                ]
            }
        ],
    },
    //Caída por trabajos en altura #probado
    3: {
        checkboxes: [
            { id: 1, text: '¿Se avisó a urgencias?', value: 1, name: 'avisoUrgencias', defaultValue: 0 },
        ],
        selectors: [
            {
                id: 10, name: 'personal', placeholder: 'Personal de equipo', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona el tipo de personal afectado' },
                    { value: 1, text: 'Personal de equipo interno' },
                    { value: 2, text: 'Personal de proveedor' },
                ]
            },
            {
                id: 11, name: 'consiente', placeholder: 'Estado del/los pacientes', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona el estado del/los pacientes' },
                    { value: 3, text: 'Conciente' },
                    { value: 4, text: 'Inconciente' },
                ]
            },
            {
                id: 12, name: 'altura', placeholder: 'Rango de altura', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona rango de altura' },
                    { value: 5, text: 'De 1,8mts a 5mts' },
                    { value: 6, text: 'De 5mts a 10mts' },
                    { value: 7, text: 'Sobre 10mts' },
                ]
            },
            {
                id: 13, name: 'fractura', placeholder: '¿Existe fractura?', defaultValue: 0, options: [
                    { value: '', text: 'Indica si existe o no fractura' },
                    { value: 8, text: 'Presenta fractura' },
                    { value: 9, text: 'No presenta fractura' },
                ]
            },
            {
                id: 14, name: 'autorizado', placeholder: '¿El trabajo estaba autorizado?', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona si el trabajo fue autorizado' },
                    { value: 10, text: 'Estaba autorizado' },
                    { value: 11, text: 'No estaba autorizado' },
                ]
            }

        ],
    },
    // Corte de electricidad principal #probado
    4: {
        checkboxes: [
            { id: 1, text: 'Se llamó a compañía electrica para recabar más información', value: 1, name: 'compania', defaultValue: 0 },
        ],
        selectors: [
            {
                id: 16, name: 'programado', placeholder: 'Corte Programado', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona si el corte fue programado' },
                    { value: 1, text: 'Programado' },
                    { value: 2, text: 'No programado' },
                ]
            }, {
                id: 17, name: 'estadoGenerador', placeholder: 'Estado del generador', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona el estado del generador' },
                    { value: 1, text: 'Generador en servicio' },
                    { value: 2, text: 'Generador en servicio, pero no respalda al local' },
                    { value: 3, text: 'Generador no partió o fuera de servicio' }
                ]
            },
            {
                id: 18, name: 'respaldaFrio', placeholder: 'Respalda frio', defaultValue: 0, options: [
                    { value: '', text: '¿Respalda frio?' },
                    { value: 1, text: 'Si, respalda frío' },
                    { value: 2, text: 'No respalda frío' }
                ]
            },
            {
                id: 19, name: 'cortoCircuito', placeholder: '¿Se aprecia corto circuito?', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona si se aprecia corto circuito' },
                    { value: 1, text: 'Si' },
                    { value: 2, text: 'No' }
                ]
            }
        ],
    },
    // Corte de agua #probado
    5: {
        checkboxes: [
            { id: 1, text: 'Se llamó a compañía para recabar más información', value: 1, name: 'compania', defaultValue: 0 }
        ],
        selectors: [
            {
                id: 2, name: 'programado', placeholder: 'Corte Programado', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona si el corte fue programado' },
                    { value: 1, text: 'Programado' },
                    { value: 2, text: 'No programado' },
                ]
            },
            {
                id: 3, name: 'incidenteAgua', placeholder: 'Selecciona el incidente principal', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona el incidente principal' },
                    { value: 1, text: 'Rotura de circuito principal' },
                    { value: 2, text: 'Robo de cañeria'},
                    { value: 3, text: 'Problema en sistema interno, propio del local'}
                ]
            }
        ],
    },
    // Generador Fallando #probado
    6: {
        checkboxes: [ ],
        selectors: [
            {
                id: 1, name: 'incidenteGen', placeholder: 'Incidente', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona el incidente' },
                    { value: 1, text: 'No parte' },
                    { value: 2, text: 'Panel de control alarmado' },
                    { value: 3, text: 'Problema presentado durante prueba semanal' },
                    { value: 4, text: 'Olor a quemado' },
                    { value: 5, text: 'Perdida de fluidos hidráulicos' },
                    { value: 6, text: 'Falta de combustible' }
                ]
            }
        ],
    },
    // Vandalismo
    7: {
        checkboxes: [
            { id: 1, text: 'Robo', value: 1, name: 'robo', defaultValue: 0 },
            { id: 2, text: 'Detenidos', value: 1, name: 'detenidos', defaultValue: 0 },
            { id: 3, text: 'Daños del local', value: 1, name: 'daniosLocal', defaultValue: 0 },
            { id: 4, text: 'Daños al personal', value: 1, name: 'daniosPersonal', defaultValue: 0 },
            { id: 5, text: 'Se llamó a carabineros', value: 1, name: 'llamadaCarabineros', defaultValue: 0 }
        ],
        selectors: [
            {
                id: 6, name: 'lugarVandalismo', placeholder: 'Lugar afectado', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona el lugar afectado' },
                    { value: 1, text: 'Sala de ventas' },
                    { value: 2, text: 'Recepción' },
                    { value: 3, text: 'Sala de Arqueo' },
                    { value: 4, text: 'Exterior' }
                ]
            }
        ],
    },
    // Fuga de gas/olor a gas
    8: {
        checkboxes: [
            { id: 4, text: 'Se llamó a bomberos', value: 1, name: 'avisoBomberos', defaultValue: 0 },
        ],
        selectors: [
            {
                id: 3, name: 'sucesoGas', placeholder: '¿A que se debe la fuga?', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona a que se debe la fuga' },
                    { value: 1, text: 'No se detectó la fuente' },
                    { value: 2, text: 'Rotura de cañería' },
                    { value: 3, text: 'Robo de cañería' },
                    { value: 4, text: 'Olor a gas, fuente no detectada' }

                ]
            },
            {
                id: 4, name: 'lugarAfectado', placeholder: 'Lugar afectado', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona el lugar afectado' },
                    { value: 1, text: 'Sala de ventas' },
                    { value: 2, text: 'Recepción' },
                    { value: 3, text: 'Baños' },
                    { value: 4, text: 'Oficinas' },
                    { value: 5, text: 'Cubierta' },
                    { value: 6, text: 'Sala de máquinas' },
                    { value: 7, text: 'Sala de Arqueo' },
                    { value: 8, text: 'Exterior' }
                ]
            }
        ]
    },
    // Filtración de agua mayor
    9: {
        checkboxes: [
            { id: 1, text: 'Se llamó a compañía', value: 1, name: 'llamadoCompania', defaultValue: 0 },
        ],
        selectors: [
            {
                id: 2, name: 'sucesoAgua', placeholder: '¿A que se debe la filtración?', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona a que se debe la filtración' },
                    { value: 1, text: 'Fuente no detectada' },
                    { value: 2, text: 'Rotura de cañería' },
                    { value: 3, text: 'Robo de cañería' },
                    { value: 4, text: 'Problema externo' },
                    { value: 5, text: 'Problema interno' },
                    { value: 6, text: 'Rotura de red de suministro' },
                    { value: 7, text: 'Rotura de circuito interno o propio del local' }
                ]
            },
            {
                id: 4, name: 'lugar_id', placeholder: 'Lugar afectado', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona el lugar afectado' },
                    { value: 1, text: 'Sala de ventas' },
                    { value: 2, text: 'Recepción' },
                    { value: 3, text: 'Baños' },
                    { value: 4, text: 'Oficinas' },
                    { value: 5, text: 'Cubierta' },
                    { value: 6, text: 'Sala de máquinas' },
                    { value: 7, text: 'Sala de Arqueo' },
                    { value: 8, text: 'Exterior' }
                ]
            }
        ]
    },
    // Problemas por lluvia
    10: {
        checkboxes: [ ],
        selectors: [
            {
                id: 5, name: 'lugar_id', placeholder: 'Lugar afectado', defaultValue: 0, options: [
                    { value: '', text: 'Selecciona el lugar afectado' },
                    { value: 1, text: 'Sala de ventas' },
                    { value: 2, text: 'Recepción' },
                    { value: 3, text: 'Baños' },
                    { value: 4, text: 'Oficinas' },
                    { value: 5, text: 'Cubierta' },
                    { value: 6, text: 'Sala de máquinas' },
                    { value: 7, text: 'Sala de Arqueo' },
                    { value: 8, text: 'Exterior' }
                ]
            }
        ]
    },
}