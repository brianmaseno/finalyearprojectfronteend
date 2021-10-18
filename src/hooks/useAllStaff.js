/* eslint-disable */
import React, {useState, useEffect} from 'react'

export const useAllStaff = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("https://ehrsystembackend.herokuapp.com/KNH/staff/all")
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
            setData(data.data)
          }
          else{
            setData([])
          }
      })
  }, [])

  return data

}