const validation = (values) => {
    let validationErrors = {}

    if (
        new Date(values.constructionYear) >
        new Date().toLocaleString()
    ) {
        validationErrors.constructionYear = 'Invalid date'
    }
    for (let key in values) {
        if (!values[key] && values[key] !== false) {
            validationErrors[key] = 'Required field missing'
        }
    }

    return validationErrors
}

export default validation
