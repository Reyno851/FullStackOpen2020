import axios from 'axios'
import { useEffect, useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }   

    return {
        type,
        value,
        onChange
    }
}
  
export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios
            .get(baseUrl)
            .then(response => {
                console.log('promise fulfilled')
                setResources(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const create = async (resource) => {
        console.log('created')
        const response = await axios.post(baseUrl, resource)
        setResources(resources.concat(response.data))
        return response.data
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}

