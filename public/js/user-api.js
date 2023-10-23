async function login(user, pass) {
    let res = await postApi("/users", { userName: user, password: pass })
    if (res.ok) {
        let user = await res.json()
        sessionStorage.setItem("token", user.id)
        sessionStorage.setItem("currentUser", JSON.stringify(user))
    }
}

function tempLogin() {
    sessionStorage.setItem("token", "2")
    sessionStorage.setItem("currentUser", JSON.stringify({ id: "2", role: "customer" }))
}