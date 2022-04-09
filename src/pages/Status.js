import React, { useState, useEffect } from "react"
import { getStatus } from "../requests"
import { Paper } from "../components"

export default function Status() {
    const [state, setState] = useState([]);
    let Body = [];
    useEffect(() => {
        const fetchState = () => getStatus().then(data => {
            for (var index in data) {
                let value = data[index]
                Body.push(
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{value.status}</td>
                    </tr>
                )
            }
            setState(Body)
        })
        fetchState()
    }, [])

    return (
        <Paper>
            <p
                style={{
                    fontWeight: "bold",
                    fontSize: `30px`,
                }}
            >流转状态</p>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>订单号</th>
                        <th>状态</th>
                    </tr>
                </thead>
                <tbody>
                    {state}
                </tbody>
            </table>
        </Paper>
    )
}