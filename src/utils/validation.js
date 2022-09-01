const validation = (values) => {
    let validationErrors = {}

    for (let key in values) {
        if (!values[key]) {
            validationErrors[key] = 'Required field'
        }
    }
    return validationErrors
}

export default validation
