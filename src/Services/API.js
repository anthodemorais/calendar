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
                    resolve(res, data.token)
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

export { url, loginRequest };