const getCurrentTime = () => {
    let now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
}
const getCurrentDate = () => {
    let now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
}
const getNow = () => {
    return `${getCurrentDate()}T${getCurrentTime()}`
}
module.exports = {
    getNow: getNow
}