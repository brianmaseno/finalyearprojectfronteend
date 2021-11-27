/* eslint-disable */
import React, {useState, useEffect} from 'react'
import { useBaseUrl } from './useBaseUrl'

export const useAppointments = (status) => {
  const [data, setData] = useState([])
  const base = useBaseUrl()

  useEffect(() => {
    fetch(`${base}/KNH/appointments/all/${status}`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
            setData(data.data)
          }
          else{
            setData([])
          }
      })
  }, [status, base])

  return { data }

}