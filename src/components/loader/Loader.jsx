import * as React from "react"
import './loader.css'
import SvgLoader from "./SvgLoader"

const Loader = (props = true) => (
    <div className={props.show ? "LoaderContainer bg-slate-800" : 'hidden'}>
        <div className="jelly-triangle absolute">
            <div className="jelly-triangle__dot"></div>
            <div className="jelly-triangle__traveler"></div>
        </div>
        <SvgLoader />
    </div>
)

export default Loader
