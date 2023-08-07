"use client"
import { useState } from 'react';

const Selector = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    
    };
    return(
    <div className="selector">
        <div>
            <button type="button" className="selector-btn" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={toggleDropdown}>
                Options
            <svg className="arrow" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
            </button>
        </div>
        {isOpen && (
        <div className="menu" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            <div className="pt-1 pt-2" role="none">
            <a href="#" className="item" role="menuitem" tabIndex="-1" id="menu-item-0">La purísima</a>
            <a href="#" className="item" role="menuitem" tabIndex="-1" id="menu-item-1">Opcion 2</a>
            <a href="#" className="item" role="menuitem" tabIndex="-1" id="menu-item-2">Opcion 3</a>
            </div>
        </div>
        )}
    </div>
    )
}
export default Selector;