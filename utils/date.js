module.exports = {
    compareDate: (strd1, strd2, isIncludeTime) => {
        let d1 = new Date(strd1)
        let d2 = new Date(strd2)
        let date1 = new Date(d1.getYear(), d1.getMonth(), d1.getDate())
        let date2 = new Date(d2.getYear(), d2.getMonth(), d2.getDate())
        if (isIncludeTime) {
            return d1.getTime() - d2.getTime();
        }
        return date1.getTime() - date2.getTime();

    }
}