function nowDate(): Date {
    let date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
}

function compareDate(date1: Date | string, date2: Date | string) {
    let sameDate =
        new Date(date1).toLocaleDateString() ===
        new Date(date2).toLocaleDateString()
    return sameDate
}

export { nowDate, compareDate }
