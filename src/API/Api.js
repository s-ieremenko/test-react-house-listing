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

    static async uploadImage(id, url, headers, method, file) {
        const formData = new FormData()
        formData.append('image', file, file.name)
        await fetch(`${url}/${id}/upload`, {
            headers,
            body: formData,
            method,
        })
    }

    static async editHouse(id, url, headers, body, method) {
        const res = await fetch(`${url}/${id}`, {
            headers,
            body,
            method,
        })
        const resJson = await res.json()
        return resJson
    }

    static async deleteHouse(id, url, headers, method) {
        await fetch(`${url}/${id}`, {
            headers,
            method,
        })
    }
}
