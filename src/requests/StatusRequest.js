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