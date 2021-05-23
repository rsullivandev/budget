class dateHelper {

    constructor(inputDate) {
        this.curDate = inputDate;
        this.mm = (this.curDate.getMonth() + 1).toString().padStart(2, '0');
        this.yyyy = this.curDate.getFullYear();
        this.yy = this.yyyy.toString().slice(2);
        this.dd = new Date(this.yyyy, this.mm, 0).getDate().toString().padStart(2, '0');
    }

    getDate = () => {
        return this.dd;
    }

    getMonth = () => {
        return this.mm;
    }

    getYearFull = () => {
        return this.yyyy;
    }

    getYearShort = () => {
        return this.yy;
    }

}

module.exports = {
    dateHelper: dateHelper
}