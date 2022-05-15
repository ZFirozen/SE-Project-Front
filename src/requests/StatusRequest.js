import axios from "axios";

async function getStatus() {
    // const data = await new Promise((resolve, reject) => {
    //     const status = db
    //     if (status) {
    //         resolve(status);
    //     } else {
    //         reject({});
    //     }
    // })
    const data = await axios.get("http://localhost:3000/contract/individual");
    //D组后端url: http://124.222.168.27:8080/contract/
    return data.data;
}

export {
    getStatus
}

const db = [
    {
        name: 'G1001',
        status: 'Testing'
    },
    {
            name: 'G1002',
            status: 'Finished'
        },
]