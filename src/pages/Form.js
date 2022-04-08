import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Paper, JSONSchemaForm } from "../components"
import { getForm } from "../requests"

export default function Form() {
  const [schema, setSchema] = useState(null);
  let params = useParams();
  useEffect(() => {
    console.log(`form/${params.formId}`)
    getForm(params.formId).then(data=>{
      setSchema(data);
    })
  }, [params])
  return (
    <Paper>
      {/* {JSON.stringify(schema)} */}
      <JSONSchemaForm schema={schema}/>
    </Paper>
  )
}