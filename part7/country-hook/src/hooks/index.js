import { useState, useEffect } from 'react'
import axios from 'axios'

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
  
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    
    useEffect(() => {
      // Include condition to make effect only run when name changes. 
      // This is to prevent useEffect() running on first render when there is no country name defined
      if (name) {  
        console.log("Country input changed")
        axios
        .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        .then(response => {
          console.log('promise fulfilled')
          setCountry({data: response.data[0], found: true})
        })
        .catch(error => {
          setCountry({data: null, found: false})
        })
      }
    }, [name])

    return country
}