/* eslint-disable */
import React, {useState, useEffect} from 'react'
import { useBaseUrl } from './useBaseUrl'

export const useDoctorAppointments = (status, doctor_id) => {
  const [data, setData] = useState([])
  const base = useBaseUrl()

  useEffect(() => {
    fetch(`${base}/KNH/appointments/doctor/${status}?doctor_id=${doctor_id}`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
            setData(data.data)
          }
          else{
            setData([])
          }
      })
  }, [base])

  return { data }

}