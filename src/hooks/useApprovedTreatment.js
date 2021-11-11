/* eslint-disable */
import {useState, useEffect} from 'react';
import { useAuth } from './AuthProvider';
const axios = require('axios').default;

export const useApprovedTreatment = () => {
  const [data, setData] = useState([])
  const { currentUser } = useAuth();

  useEffect(() => {
    axios.get(`https://ehrsystembackend.herokuapp.com/KNH/appointments/doctor/approved?doctor_id=${currentUser.national_id}`)
      .then((data) => {
          if (data.data.message == "Found") {
            setData(data.data.data)
            console.log(data.data.data)
          }
          else{
            console.log("Not Found")
          }                
      })
      .catch((error) => {
          console.log(error);
      });
  }, [])

  return { data }
}
