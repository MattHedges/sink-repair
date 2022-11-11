const mainContainer = document.querySelector("#container")

const applicationState = {

    //property called requests with an empty array to hold external data that is fetched 
requests: []
}

const API = "http://localhost:8088"


//function below pulls information from database.json to be used 
export const fetchRequests = () => {
    // fetch pulls info from API interpolation.../requests referes to specific element in array
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                // applicationState (line1) 
                applicationState.requests = serviceRequests
            }
        )
}


export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}


export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

export const saveCompletion = (completionObj) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completionObj)
    }

    return fetch(`${API}/completions`, fetchOptions)
    .then(response => response.json())
    .then(
        (data) => {
            mainContainer.dispatchEvent(new CustomeEvent("StateChanged"))
        })
}

export const fetchCompletions = () => {
    return fetch (`${API}/completions`)
    .then(response => response.json())
    .then(
        (data => (
            applicationState.completions = data
        ))
    )
}