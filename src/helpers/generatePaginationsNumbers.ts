
// [1,2,3,4,5, ..., 7]
// [1,2,3, ...,48,49, 50]
export const generatePaginationNumbers = ( currentPage: number, totalPages: number  ) => {

    // si el numero total de paginas es menor a 7
    // vamos a mostrar todas las paginas sin puntos suspensivos
    if ( totalPages <= 7 ) {
        return Array.from( { length: totalPages }, ( _, i ) => i + 1 ); //  [1,2,3,4,5,6,7]
    }

    // si la pagina actual esta entre las primeras 3 paginas
    // vamos a mostrar las primeras 3 paginas, puntos suspensivos, y las ultimas 2
    if ( currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages]; // [1,2,3,'...',49,50]
    }

    // si la pagina actual esta entre las ultimas 3 paginas
    // mostrar las primeras 2 paginas, puntos suspensivos, y las ultimas 3
    if ( currentPage >= totalPages - 2 ) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]; // [1,2,'...',48,49,50]
    }


    // si la pagina actual esta en medio
    // mostrar la primer pagina, puntos suspensivos, la pagina actual y las ultimas 2
    return [1,'...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1, totalPages]; // [1,2,'...',47,48,49,'...',50]

}