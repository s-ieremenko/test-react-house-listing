import React, { useState } from 'react'

const UploadFile = ({ listing, setListing }) => {
    const [file, setFile] = useState('')
    const handleChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        formData.append('fileName', file.name)
        try {
            let res = await fetch(
                'https://api.intern.d-tt.nl/api/houses/:houseId/upload',
                {
                    method: 'POST',
                    body: formData,

                    headers: {
                        'X-Api-Key': process.env.REACT_APP_API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            )
            let resJson = await res.json()
            console.log(resJson)
            // if (res.status === 200 || res.status === 201) {
            //     setHousesList([...housesList, listing])
            // }
        } catch (e) {
            console.log('error')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>upload file</p>
                <input type="file" onChange={handleChange} />
                <button type></button>
            </form>
        </div>
    )
}

export default UploadFile
