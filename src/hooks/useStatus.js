/* eslint-disable */
import React, {useState, useEffect} from 'react'

export const useStatus = (status) => {
  const [statusData, setStatusData] = useState([])

  useEffect(() => {
    fetch(`https://ehrsystembackend.herokuapp.com/KNH/staff/accounts/${status}`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
            setStatusData(data.data)
          }
          else{
            setStatusData([])
          }
      })
  }, [status])

  return statusData

}