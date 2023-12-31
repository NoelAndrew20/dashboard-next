import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/context/DarkModeContext';

const Search = ({ data, setData, word }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [search, setSearch] = useState("");
    const [originalData, setOriginalData] = useState(data);
    const [selectedEntries, setSelectedEntries] = useState("all");
    const router = useRouter();
   
    useEffect(() => {
        const filterKey = 
        router.pathname === "/RegistroUsuarios" ? "usuario" 
        : router.pathname === "/RegistroTransporte" ? "camion" 
        : router.pathname === "/Medicamento" ? "PO_Name" 
        : router.pathname === "/MateriasPrimas" ? "Item_Name" 
        : router.pathname === "/RFID" ? "rfid" 
        : router.pathname === "/Alertas" ? "fecha" 
        : "";
    
        const filteredData = search
            ? originalData.filter(item =>
                item[filterKey].toLowerCase().includes(search.toLowerCase())
              )
            : originalData;
    
        const numberOfEntries = parseInt(selectedEntries);
        const slicedData = filteredData.slice(0, selectedEntries === "all" ? filteredData.length : numberOfEntries);
    
        setData(slicedData);
    }, [search, selectedEntries, originalData, router.pathname]);

    return (
        <div className="flex justify-between">
            <div className={isDarkMode ? "flex inner-search-d" : "flex inner-search"}>
                <div>
                    <input
                        type="text"
                        placeholder={`Buscar por ${word}...`}
                        onChange={(e) => { setSearch(e.target.value) }}
                        className="border border-gray-300 rounded outline-none focus:border-none" 
                    />
                </div>
                <div className="inner-search-icon">
                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 15.5L19 19" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="#ADADAD" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <div>
                <label>Show entries:</label>
                <select
                    className={isDarkMode ? "entries-container-d focus:border-none" : "entries-container focus:border-none"}
                    value={selectedEntries}
                    onChange={(e) => setSelectedEntries(e.target.value)}
                >
                    <option value="all">Todos</option>
                    <option value="10">10</option>
                    <option value="5">5</option>
                    <option value="2">2</option>
                </select>
            </div>
        </div>
    )
}
export default Search;