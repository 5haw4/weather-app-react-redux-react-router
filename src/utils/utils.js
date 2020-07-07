
export const getDayNameByIndex = (index) => {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index]
}

export const isStrOnlyLetter = (str) => {
    return /^[a-zA-Z ]+$/.test(str)
}