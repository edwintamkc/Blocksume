const validateNumber = (str) => {
    var arr = str.split('')
    
    for(let i = 0; i < arr.length; i++){
        // < 0 || > 9
        if( str.charCodeAt(i) < 48 || str.charCodeAt(i) > 57) {
            return false
        }
    }

    return true
}

export default { validateNumber }