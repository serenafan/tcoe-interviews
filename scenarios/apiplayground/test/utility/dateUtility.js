const dayjs = require('dayjs')
const getCurrentDate = () => {
    return dayjs().format("D-MMMM-YYYY");
}

const getTomorrowDate = () => {
    return dayjs().add(1, 'day').format("D-MMMM-YYYY");
}

const getYesterdayDate = () => {
    return dayjs().subtract(1, 'day').format("D-MMMM-YYYY");
}

module.exports = {getCurrentDate, getTomorrowDate, getYesterdayDate}