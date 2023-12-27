const TableIndexVacuna = ({ isDarkMode, data}) => {
    return (
        <>
         <div className={isDarkMode ? 'table-index-d' : 'table-index'} style={{width: "auto"}}>
            <table className={isDarkMode ? 'table-container-index-d' : 'table-container-index'}>
                <thead>
                    <tr>
                        <th>Puesto</th>
                        <th>Salario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Aplicador de vacunas</td>
                        <td>${data[0].SueldosySalariosDesglozados.aplicadorVacunas}</td>
                    </tr>
                    <tr>
                        <td>Ayudante general</td>
                        <td>${data[0].SueldosySalariosDesglozados.ayudanteGeneral}</td>
                    </tr>
                    <tr>
                        <td>Lavandera</td>
                        <td>${data[0].SueldosySalariosDesglozados.lavandera}</td>
                    </tr>
                    <tr>
                        <td>Veterinario</td>
                        <td>${data[0].SueldosySalariosDesglozados.veterinario}</td>
                    </tr>
                    <tr>
                        <td>Vigilantes</td>
                        <td>${data[0].SueldosySalariosDesglozados.vigilantes}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}
export default TableIndexVacuna;