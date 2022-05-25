import axios from "axios";

async function getStatus() {
    console.log(process.env.REACT_APP_BACKEND_SERVER)
    const data = await axios.get(process.env.REACT_APP_BACKEND_SERVER+"/api/entrust");
    return data.data;
}

export {
    getStatus
}