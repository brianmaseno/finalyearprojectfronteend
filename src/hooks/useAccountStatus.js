/* eslint-disable */
import { useState, useEffect } from "react"

export const useAccountStatus = (status) => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`https://ehrsystembackend.herokuapp.com/KNH/staff/accounts/${status}`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
              setData(data.data);
          }
          else{
              console.log("no data");
          }
      })
  }, [status])

  return { data }
}