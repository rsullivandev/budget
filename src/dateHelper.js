const today = new Date();
let mm = today.getMonth()+1;
mm = mm.toString().padStart(2, '0');
let yyyy = today.getFullYear();
let yy = yyyy.toString().slice(2);
let dd = new Date(yyyy, mm, 0).getDate().toString().padStart(2, '0');

getDate = () => {
    return dd;
}

getMonth = () => {
    return mm;
}

getYearFull = () => {
    return yyyy;
}

getYearShort = () => {
    return yy;
}