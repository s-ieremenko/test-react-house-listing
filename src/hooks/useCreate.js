// import { useState, useEffect, useCallback } from 'react'
//
// export const useCreate = (url, headers) => {
//     const [listing, setListing] = useState({
//         constructionYear: '',
//         description: '',
//         hasGarage: 'false',
//         streetName: '',
//         price: '',
//         bedrooms: '',
//         bathrooms: '',
//         size: '',
//         houseNumber: '',
//         numberAddition: '',
//         zip: '',
//         city: '',
//     })
//     const [file, setFile] = useState('')
//         const createListing = useCallback(async () => {
//         try {
//             let res = await fetch(
//                 'https://api.intern.d-tt.nl/api/houses',
//                 {
//                     method: 'POST',
//                     body: JSON.stringify({
//                         ...listing,
//                         hasGarage: listing.hasGarage === 'true',
//                         constructionYear:
//                             listing.constructionYear.split('/')[2],
//                     }),
//                     headers: {
//                         'X-Api-Key': process.env.REACT_APP_API_KEY,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             )
//             let resJson = await res.json()
//
//             const formData = new FormData()
//             formData.append('image', file, file.name)
//
//             await fetch(
//                 `https://api.intern.d-tt.nl/api/houses/${resJson.id}/upload`,
//                 {
//                     method: 'POST',
//                     body: formData,
//
//                     headers: {
//                         'X-Api-Key': process.env.REACT_APP_API_KEY,
//                     },
//                 }
//             )
//         } catch (e) {
//             console.log('error')
//         }
//     }, [])
//
//     useEffect(() => {
//         getHouses()
//     }, [getHouses, url])
//     return [ file, setFile, listing]
// }
// }
