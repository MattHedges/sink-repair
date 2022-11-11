import { fetchPlumbers, fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

// fetchRequests function from dataAccess.js is called 
const render = () => {
    fetchRequests()
    .then(() => fetchPlumbers())
    .then(
    () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)