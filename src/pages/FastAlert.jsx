import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/loader/PageLoader";
import { openLocalEvent } from "../state/slices/viewsSlice";
import { items } from "./EventTypes";

const FastAlert = () => {
  const locals = useSelector(
    (state) => state.locals.info.geoJson.data.features
  );

  const [localSelected, setLocalSelected] = useState({});
  const [checkboxes, setcheckboxes] = useState([]);
  const [selectors, setSelectors] = useState([]);
  const [formState, setFormState] = useState({
    type_id: 0,
    checkboxes: {},
    selectors: {},
  });
  const [eventsTypes, setEventsTypes] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ret, setRet] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (locals) {
  //     console.log(locals);
  //   }
  //   return () => {};
  // }, [locals]);

  // useEffect(() => {
  //   console.log("[Local selected]", localSelected);
  // }, [localSelected]);

  useEffect(() => {
    axios
      .get(`https://smu-api.herokuapp.com/api/alert/types`)
      .then((resp) => setEventsTypes(resp.data.data))
      .finally(setLoading(false));
    return () => {};
  }, []);

  useEffect(() => {
    if (formState.type_id in items) {
      setcheckboxes(items[formState.type_id].checkboxes);
      setSelectors(items[formState.type_id].selectors);
    } else {
      setcheckboxes([]);
      setSelectors([]);
      setFormState({
        type_id: 0,
        checkboxes: {},
        selectors: {},
        descripcion: "",
      });
    }
  }, [formState.type_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("[Elemente value]:", value);

    setLocalSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handletype_idChange = (e) => {
    const type_id = e.target.value;
    const checkboxes = {};
    const selectors = {};
    for (let i in items[type_id].checkboxes) {
      const checkbox = items[type_id].checkboxes[i];
      checkboxes[checkbox.name] = checkbox.defaultValue;
    }
    for (let i in items[type_id].selectors) {
      const selector = items[type_id].selectors[i];
      selectors[selector.name] = selector.defaultValue;
    }
    setFormState({ type_id, checkboxes, selectors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ceco = localSelected.localSelected;

    const formData = Object.entries({
      ...formState,
      ...formState.checkboxes,
      ...formState.selectors,
      ceco,
      estado: 1,
    }).reduce((acc, [key, value]) => {
      acc[key] = value.toString();
      return acc;
    }, {});

    delete formData.checkboxes;
    delete formData.selectors;

    // console.log("[DATA]:", formData);

    dispatch(openLocalEvent(formData))
      .then((data) => {
        setRet({ type: 1, text: data.payload.message });
        setTimeout(() => {
          setRet({});
        }, 2500);
        // console.log("Devuelta:", data.payload.message);
        setFormState({
          type_id: 0,
          checkboxes: {},
          selectors: {},
          descripcion: "",
        });
      })
      .catch((data) => {
        setTimeout(() => {
          setRet({});
        }, 2500);
        setRet({ type: 0, text: "Ocurrió un error al crear el evento" });
      });

    // console.log("Nuevo Evento", formData);
  };

  const handleCount = (e) => {
    if (e <= 500) {
      setCount(e);
    }
  };

  const handleNav = () => {
    navigate(`/local/${localSelected.localSelected}`);
  };

  const handleNavMap = () => {
    navigate(`/app`);
  };

  return (
    <div className={`min-h-screen p-5 md:p-10`}>
      <PageLoader show={loading ? true : false} />
      <PageLoader show={loading ? true : false} />
      {ret?.type ? (
        <div
          className={`fixed top-5 right-5 bg-white py-4 px-6 max-w-md border-l-4 ${
            ret.type === 0 ? "border-red-600" : "border-green-600"
          } rounded-lg flex items-center gap-3 shadow-lg`}
        >
          <div>
            <h3 className="font-semibold text-gray-700">
              {ret.type === 0 ? "Error" : "Agregado"}
            </h3>
            <p className="text-gray-700">{ret.text}</p>
          </div>
        </div>
      ) : null}
      <label className={`text-lg font-medium text-white`}>
        Selecciona un local
      </label>

      <select
        name="localSelected"
        value={localSelected.ceco}
        onChange={handleChange}
        className={`bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
      >
        <option value="">Selecciona un local!</option>
        {locals.map((local) => (
          <option key={local.properties.ceco} value={local.properties.ceco}>
            {local.properties.ceco}, {local.properties.name}
          </option>
        ))}
      </select>

      {localSelected?.localSelected && (
        <div>
          {/* <p className={`pl-8 text-xl`}>
            {local.localType} <b>{local.naem} #{local.ceco}</b>
            <br />
            {local.address}, {local.city}
          </p> */}

          <form
            onSubmit={handleSubmit}
            className={`flex flex-col mt-5 gap-2 h-full w-full bg-gray-800`}
          >
            <label className={`text-lg font-medium text-white`}>
              Elige un Tipo de alerta
            </label>

            <select
              name="type_id"
              value={formState.type_id}
              onChange={handletype_idChange}
              className={`bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
            >
              <option value="">Seleccione un tipo!</option>
              {eventsTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>

            <span className={`pt-3 text-lg font-medium text-white`}>
              Detalles del Evento
            </span>
            {/* Aquí necesito los checkbox y selectors */}
            <div className={``}>
              {checkboxes.map((checkbox) => (
                <div
                  key={checkbox.id}
                  className={`flex items-center text-sm text-white my-2`}
                >
                  <label className={``}>
                    <input
                      className="mr-2"
                      type="checkbox"
                      name={checkbox.name}
                      checked={formState.checkboxes[checkbox.name] || 0}
                      onChange={(e) => {
                        const { name, checked } = e.target;
                        setFormState((prevState) => ({
                          ...prevState,
                          checkboxes: {
                            ...prevState.checkboxes,
                            [name]: checked ? 1 : 0,
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
                    value={formState.selectors[selector.name] || 0}
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
            <label htmlFor="description" className={`py-2 text-md`}>
              Descripcion detallada del evento
            </label>
            <textarea
              type="text"
              rows={5}
              name="description"
              className="w-full min-h-[80px] text-sm p-4 text-slate-900 bg-gray-100 border-gray-300 rounded ring-offset-gray-800 focus:ring-2"
              // onChange={e => {
              //   handleCount(e.target.value.length)
              //   handleChange(e)
              // }}

              onChange={(e) => {
                const { name, value } = e.target;
                setFormState((prevState) => ({
                  ...prevState,
                  [name]: value,
                }));
              }}
            />
            <p>{500 - count}</p>

            <div className={`py-2`}>
              <label htmlFor={"estadoLocal_id"}> </label>
              <select
                className={`bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                name={"estadoLocal_id"}
                value={formState.selectors["estadoLocal_id"] || 0}
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
                <option value=""> Selecciona el estado del local </option>
                <option value="1"> Abierto </option>
                <option value="2"> Cerrado </option>
                <option value="3"> Fuera de servicio </option>
              </select>
            </div>

            <button
              onSubmit={handleSubmit}
              className={`active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 text-gray-400 bg-slate-700 rounded-xl font-bold text-lg hover:bg-red-900`}
            >
              {" "}
              Enviar{" "}
            </button>
            <button
              onClick={handleNav}
              className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 text-gray-400 bg-slate-700 rounded-xl font-bold text-lg hover:bg-red-900"
            >
              Ir a eventos del local
            </button>
          </form>
        </div>
      )}

      <button
        onClick={handleNavMap}
        className="mt-5 w-24 h-12 active:duration-75 transition-all ease-in-out text-gray-400 bg-slate-700 rounded-xl font-bold text-lg hover:bg-red-900"
      >
        Map
      </button>
    </div>
  );
};

export default FastAlert;
