/* eslint-disable */
import {useState, useEffect} from 'react';
import { useBaseUrl } from './useBaseUrl';

export const useDrugs = () => {
  const [drug, setDrug] = useState([])
  const base = useBaseUrl()

  useEffect(() => {
    fetch(`${base}/KNH/patient/drugs/all`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Found") {
            setDrug(data.data)
        }
        else{
            console.log("no Drug");
        }
    })
  }, [base])

  return { drug }
}
