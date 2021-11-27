/* eslint-disable */
import {useState, useEffect} from 'react';
import { useBaseUrl } from './useBaseUrl';

export const usePrescribedDrugs = (status) => {
  const [data, setData] = useState([])
  const base = useBaseUrl()

  useEffect(() => {
    fetch(`${base}/KNH/patient/drugs/${status}`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Found") {
            setData(data.data.length)
        }
        else{
            console.log("no Record");
        }
    })
  }, [base])

  return data
}
