import { GoAlert } from "react-icons/go";
import { FaMapMarkerAlt, FaFireExtinguisher, FaCloudMeatball } from "react-icons/fa";
import { MdHealthAndSafety, MdElectricalServices } from "react-icons/md";
import { BsLightbulbFill, BsFillHouseFill } from "react-icons/bs";
import { WiDaySnowWind } from "react-icons/wi";
import { IoIosSnow } from "react-icons/io";
import { TbPrison } from "react-icons/tb";
import { GiElectric } from "react-icons/gi";

export const items = [
    {
        name: "Events",
        path: "/",
        icon: < GoAlert />
    },
    {
        "name": "Arquitectura ",
        "path": "/arquitectura",
        "icon": < FaMapMarkerAlt />
    },
    {
        "name": "Extinción de incendios",
        "path": "/incendios",
        "icon": < FaFireExtinguisher />
    },
    {
        "name": "Mantencion",
        "path": "/mantencion",
        "icon": < MdHealthAndSafety />
    },
    {
        "name": "Iluminación sala de ventas",
        "path": "/ilum-ventas",
        "icon": < BsLightbulbFill />
    },
    {
        "name": "Cubierta",
        "path": "/cubierta",
        "icon": < BsFillHouseFill />
    },
    {
        "name": "Climatización",
        "path": "/climatizacion",
        "icon": < WiDaySnowWind />
    },
    {
        "name": "Frio alimentario",
        "path": "/frio-alimentario",
        "icon": < IoIosSnow />
    },
    {
        "name": "Cortina metálica",
        "path": "/cortina",
        "icon": < TbPrison />
    },
    {
        "name": "Sistema eléctrico",
        "path": "/sistema-electrico",
        "icon": < MdElectricalServices />
    },
    {
        "name": "Generación eléctrica",
        "path": "/generacion-electrica",
        "icon": < GiElectric />
    },
    {
        "name": "Gases refrigerantes",
        "path": "/gases",
        "icon": < FaCloudMeatball />
    }
]