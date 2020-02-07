import swal from "sweetalert";

const url = "http://localhost:8000/api";

const loginRequest = (email, password) => {
    return new Promise((resolve, reject) => {
        fetch(url + "/login_check", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: email, password: password}),
        })
        .then((res) => res.json())
        .then(data => {
            if (data.token) {
                fetch(url + "/users", {
                    headers: {
                        Authorization: "Bearer " + data.token
                    }
                })
                .then(res => res.json())
                .then(res => {
                    res.token = data.token
                    resolve(res)
                })
            }
            else {
                reject()
            }
        })
        .catch(() => {
            swal({
                title: "Erreur",
                text: "Mauvais mot de passe ou email",
                icon: "error"
            })
            reject()
        })
    })
}

const getAvailabilities = (token) => {
    return new Promise((resolve, reject) => {
        fetch(`${url}/availabilities`, {
            headers: {
                Authorization: "Bearer " + token
            },
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

const addAvailability = (token, date, doctor) => {
    return new Promise((resolve, reject) => {
        fetch(`${url}/availabilities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({ doctor: `/api/users/${doctor}`, date: date })
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

const bookAvailability = (token, client, doctor) => {
    return new Promise((resolve, reject) => {
        fetch(`${url}/reservations`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({ client: `/api/users/${client}`, doctor: `/api/users/${doctor}` })
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

const getReservations = (token) => {
    return new Promise((resolve, reject) => {
        fetch(`${url}/reservations`, {
            headers: {
                Authorization: "Bearer " + token
            },
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

const deleteReservation = (token, id) => {
    return new Promise((resolve, reject) => {
        fetch(`${url}/reservations/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            },
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

const deleteAvailability = (token, id) => {
    return new Promise((resolve, reject) => {
        fetch(`${url}/availabilities/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            },
        })
        .then(res => resolve())
        .catch(error => reject(error))
    })
}

export { url, loginRequest, getAvailabilities, addAvailability, bookAvailability, getReservations, deleteReservation, deleteAvailability };