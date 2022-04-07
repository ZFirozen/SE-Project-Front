import React from "react"
import { useParams } from "react-router-dom"
import { Paper } from "../components"

export default function Form() {
    let params = useParams()
    return (
        <Paper>
            form+{params.formId}
        </Paper>
    )
}