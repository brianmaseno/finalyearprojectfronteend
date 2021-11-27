/* eslint-disable */
import {useState, useEffect} from 'react';
import { useBaseUrl } from './useBaseUrl';

export const usePatients = () => {
  const [patients, setPatients] = useState([])
  const base = useBaseUrl()

  useEffect(() => {
    fetch(`${base}/KNH/patient/allpatients`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Patients Records available") {
            setPatients(data.data)
            console.log(data.data);
        }
        else{
            console.log("no Patient");
        }
    })
  }, [base])

  return { patients }
}
