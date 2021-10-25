/* eslint-disable */
import React, {useState, useEffect} from 'react'

export const useDoctorAppointments = (status, doctor_id) => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`https://ehrsystembackend.herokuapp.com/KNH/appointments/doctor/${status}?doctor_id=${doctor_id}`)
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

  return { data }

}