async function getStatus() {
    const data = await new Promise((resolve, reject) => {
        const status = db;
        if (status) {
            resolve(status);
        } else {
            reject({});
        }
    })
    return data;
}

export {
    getStatus
}

const db = {
    "G1001": {
        "status": "testing"
    },
    "G1002": {
        "status": "finished"
    }
}