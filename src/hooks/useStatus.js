/* eslint-disable */
import React, {useState, useEffect} from 'react'
import { useBaseUrl } from './useBaseUrl'

export const useStatus = (status) => {
  const [statusData, setStatusData] = useState([])
  const base = useBaseUrl()

  useEffect(() => {
    fetch(`${base}/KNH/staff/accounts/${status}`)
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