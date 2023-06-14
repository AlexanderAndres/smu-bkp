import React, { useState } from "react";
import { useEffect } from "react";

const LocalNavbar = ({ local }) => {
  //   useEffect(() => {
  //     console.log("[LOCAL SELECTED NAV]", local);
  //     return () => {};
  //   });

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className="fixed z-50 h-20 w-screen bg-neutral-900/95 border-b-[.5px] border-gray-600 flex items-center justify-around">
      <div className="h-full w-80 py-2 px-4 pl-12">
        <h1 className="text-2xl text-gray-200">{local?.ceco}</h1>
        <p className="text-gray-200">{local?.name}</p>
      </div>
      <ul className="flex flex-row items-center justify-evenly gap-10 font-bold">
        <li className="cursor-pointer relative group" onClick={() => toggleDropdown(0)}>
          Deteccion de incendios
          <span className="absolute -bottom-1 left-0 w-0 bg-red-500 h-0.5 transition-all duration-500 group-hover:w-full"></span>
          {activeDropdown === 0 && (
            <div className="absolute left-0 w-full bg-white shadow-lg">
              {/* Contenido del dropdown */}
              {/* Aquí puedes agregar los elementos del dropdown */}
              Aª
            </div>
          )}
        </li>
        <li className="cursor-pointer relative group">
          Mantencion
          <span className="absolute -bottom-1 left-0 w-0 bg-red-500 h-0.5 transition-all duration-500 group-hover:w-full"></span>
        </li>
        <li className="cursor-pointer relative group">
          Refrigeracion
          <span className="absolute -bottom-1 left-0 w-0 bg-red-500 h-0.5 transition-all duration-500 group-hover:w-full"></span>
        </li>
        <li className="cursor-pointer relative group">
          Arquitectura
          <span className="absolute -bottom-1 left-0 w-0 bg-red-500 h-0.5 transition-all duration-500 group-hover:w-full"></span>
        </li>
        <li className="cursor-pointer relative group">
          Area de permisos
          <span className="absolute -bottom-1 left-0 w-0 bg-red-500 h-0.5 transition-all duration-500 group-hover:w-full"></span>
        </li>
      </ul>
    </div>
  );
};

export default LocalNavbar;
