/* eslint-disable */
import {useState, useEffect} from 'react';
import { useBaseUrl } from './useBaseUrl';

export const useLab = () => {
  const [lab, setLab] = useState([])
  const base = useBaseUrl()

  useEffect(() => {
    fetch(`${base}/KNH/patient/lab/tests/report`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Report Found") {
            setLab(data.data)
            console.log(data.data);
        }
        else{
            console.log("no Lab Record");
        }
    })
  }, [base])

  return { lab }
}
