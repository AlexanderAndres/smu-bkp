import React, { useState } from 'react'
import { Element, Link } from "react-scroll";
import Pantalla1 from '../../pages/arq/Pantalla1';
import Pantalla2 from '../../pages/arq/Pantalla2';
import Pantalla3 from '../../pages/arq/Pantalla3';

const HorizontalScroll = () => {
    const [pantallaActiva, setPantallaActiva] = useState("Pantalla1");

    return (
        <div className="w-full h-full mt-8 bg-cyan-900">
            <div className="text-lg font-bold mb-4">Título del menú</div>
            <div className="flex justify-between px-4 py-2 bg-gray-700">
                <ul className="flex">
                    <li className={`mx-4 cursor-pointer hover:text-blue-500 ${pantallaActiva === "Pantalla1" && "text-blue-500"}`} onClick={() => setPantallaActiva("Pantalla1")} >
                        <Link to="pantalla1" spy={true} smooth={true} offset={-70} duration={500} name="Pantalla 1" />
                        Pantalla 1
                    </li>
                    <li
                        className={`mx-4 cursor-pointer hover:text-blue-500 ${pantallaActiva === "Pantalla2" && "text-blue-500"}`} onClick={() => setPantallaActiva("Pantalla2")} >
                        <Link to="pantalla2" spy={true} smooth={true} offset={-70} duration={500} name="Pantalla 2" />
                        Pantalla 2
                    </li>
                    <li
                        className={`mx-4 cursor-pointer hover:text-blue-500 ${pantallaActiva === "Pantalla3" && "text-blue-500"}`} onClick={() => setPantallaActiva("Pantalla3")} >
                        <Link to="pantalla3" spy={true} smooth={true} offset={-70} duration={500} name="Pantalla 3" />
                        Pantalla 3
                    </li>
                </ul>
            </div>
            {pantallaActiva === "Pantalla1" && <Element className='h-full w-full flex-1'> <Pantalla1 /> </Element>}
            {pantallaActiva === "Pantalla2" && <Element className='h-full w-full'> <Pantalla2 /> </Element>}
            {pantallaActiva === "Pantalla3" && <Element className='h-full w-full'> <Pantalla3 /> </Element>}
        </div >
    );
}

export default HorizontalScroll