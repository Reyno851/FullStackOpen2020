import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterStateChange, setFilterInput } from '../reducers/filterReducer'

const Filter = () => {
  const style = {
    marginBottom: 10
  }

  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state.anecdotes) 

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    console.log(event.target.value)

    if (event.target.value === '') { // If user input is empty, filter state should be ALL
      dispatch(filterStateChange('ALL'))
    } else { // Else if there is input, filter state should be FILTERED. Input should be dispatched to the store as well
      dispatch(filterStateChange('FILTERED'))
      dispatch(setFilterInput(event.target.value))
    }
    
  }


  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter