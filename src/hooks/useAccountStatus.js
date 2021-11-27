/* eslint-disable */
import { useState, useEffect } from "react"
import { useBaseUrl } from "./useBaseUrl"

export const useAccountStatus = (status) => {
  const [data, setData] = useState([])
  const base = useBaseUrl()

  useEffect(() => {
    fetch(`${base}/KNH/staff/accounts/${status}`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
              setData(data.data);
          }
          else{
              console.log("no data");
          }
      })
  }, [status, base])

  return { data }
}