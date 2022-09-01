export default class HouseService {
    static async getAll(url, headers) {
        const response = await fetch(url, { headers })
        return response.json()
    }

    static async createHouse(url, headers, body, method) {
        const res = await fetch(url, { headers, body, method })
        const resJson = await res.json()
        return resJson
    }

    static async uploadImage(id, url, headers, body, method, file) {
        const formData = new FormData()
        formData.append('image', file, file.name)
        await fetch(`${url}/${id}/upload`, {
            headers,
            body: formData,
            method,
        })
    }

    static async deleteHouse(id, url, headers, method) {
        await fetch(`${url}/${id}`, {
            headers,
            method,
        })
    }
}
// try {
//     let res = await fetch(
//         'https://api.intern.d-tt.nl/api/houses',
//         {
//             method: 'POST',
//             body: JSON.stringify({
//                 ...listing,
//                 hasGarage: listing.hasGarage === 'true',
//                 constructionYear:
//                     listing.constructionYear.split('/')[2],
//             }),
//             headers: {
//                 'X-Api-Key': process.env.REACT_APP_API_KEY,
//                 'Content-Type': 'application/json',
//             },
//         }
//     )
//     let resJson = await res.json()
//
//     const formData = new FormData()
//     formData.append('image', file, file.name)
//
//     await fetch(
//         `https://api.intern.d-tt.nl/api/houses/${resJson.id}/upload`,
//         {
//             method: 'POST',
//             body: formData,
//
//             headers: {
//                 'X-Api-Key': process.env.REACT_APP_API_KEY,
//             },
//         }
//     )
// } catch (e) {
//     console.log('error')
// }
