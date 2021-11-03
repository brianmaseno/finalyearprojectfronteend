/* eslint-disable */
import {useState, useEffect} from 'react';
const axios = require('axios').default;

export const useApprovedTreatment = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`https://ehrsystembackend.herokuapp.com/KNH/patient/lab/tests/requests/approved`)
      .then((data) => {
          if (data.data.message == "Requests Found") {
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
