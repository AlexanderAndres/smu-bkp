import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state/slices/authSlice";
import { setInfo } from "../../state/slices/localsSlice";
import { fetchMarkers } from "../../state/thunks/fetchMarkers";

const Login = () => {
  const [error, setError] = useState("");

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpperCase = (fieldName, value) => {
    if (fieldName === "email" && typeof value === "string") {
      return value.toUpperCase();
    }
    return value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "email" ? handleUpperCase(name, value) : value;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      email: name === "email" ? newValue : prevCredentials.email,
      password: name === "password" ? value : prevCredentials.password,
    }));
  };

  const login = async (user) => {
    await axios
      .get(
        `https://smu-api.herokuapp.com/api/login/${user.email}/${user.password}`
      )
      .then((response) => {
        //console.log('[Login response]:', response)
        dispatch(
          setLogin({
            user: response.data.name,
            token: response.data.token,
            rut: response.data.rut,
            role: response.data.rol,
          })
        );

        dispatch(fetchMarkers(response.data.rut)).then((resp) => {
          console.log("[THEN]");
          if (response.data.rol === 5) {
            console.log(
              "[THEN === 5]",
              resp.payload.geoJson.data.features[0].properties.ceco
            );
            navigate(
              "/local/" + resp.payload.geoJson.data.features[0].properties.ceco
            );
          } else {
            navigate("/app");
            //console.log('[THEN !== 5]')
          }
        });
      })
      .catch((err) => {
        setError(err);

        setTimeout(() => {
          setError("");
        }, 2500);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("[Credentials]:", credentials);
    login(credentials);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-screen h-screen text-gray-200 bg-slate-950 grid place-items-center"
    >
      {error !== "" ? (
        <div className="absolute top-5 right-5 bg-white py-4 px-6 max-w-md border-l-4 border-red-600 rounded-lg flex items-center gap-3 shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Error</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        </div>
      ) : null}


        <div className="sm:w-[75vw] md:w-[38vw] mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative h-[55vh] px-12 py-12 bg-slate-950 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-center space-x-6">
              <div className="space-y-2 text-slate-200 w-full flex flex-col justify-evenly">

                <div className="flex flex-col">
                  <label className="text-lg font-medium">Email</label>
                  <input
                    name="email"
                    onChange={handleChange}
                    className="w-full border-b border-gray-700 p-4 mt-1 bg-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-lg font-medium">Password</label>
                  <input
                    name="password"
                    onChange={handleChange}
                    className="w-full border-b border-gray-700 p-4 mt-1 bg-transparent"
                    placeholder="Enter your password"
                    type={"password"}
                  />
                </div>

                <div className="mt-8 flex flex-col gap-y-4">
                  <button className="bg-gradient-to-r from-red-600 to-orange-600 py-2 mt-10 text-gray-200 bg-slate-700 rounded-xl font-bold text-lg">
                    Sign in
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
        
    </form>
  );
};

export default Login;

/* 
<div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
        <h1 className='text-5xl font-semibold'>Bienvenido!</h1>
        <p className='font-medium text-lg text-gray-500 mt-4'>Por favor, ingresa tus datos.</p>
        <div className='mt-8'>
          <div className='flex flex-col'>
            <label className='text-lg font-medium'>Email</label>
            <input
              name='email'
              onChange={handleChange}
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder="Enter your email" />
          </div>
          <div className='flex flex-col mt-4'>
            <label className='text-lg font-medium'>Password</label>
            <input
              name='password'
              onChange={handleChange}
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder="Enter your password"
              type={"password"}
            />
          </div>
          <div className='mt-8 flex justify-between items-center'>
            <div>
              <input type="checkbox" id='remember' />
              <label className='ml-2 font-medium text-base' htmlFor="remember">Remember for 30 days</label>
            </div>
            <button className='font-medium text-base text-gray-900'>Forgot password?</button>
          </div>
          <div className='mt-8 flex flex-col gap-y-4'>
            <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 text-gray-400 bg-slate-700 rounded-xl font-bold text-lg'>Sign in</button>
          </div>
          <div className='mt-8 flex justify-center items-center'>
            <p className='font-medium text-base'>Don't have an account?</p>
          </div>
        </div>
      </div>
*/
