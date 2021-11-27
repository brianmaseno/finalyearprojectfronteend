/* eslint-disable */
import {useState, useEffect} from 'react';
import { useBaseUrl } from './useBaseUrl';

export const usePendingLab = () => {
  const [pending, setPending] = useState("")
  const base = useBaseUrl()

  useEffect(() => {
    fetch(`${base}/KNH/patient/lab/tests/requests`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Requests Found") {
            setPending(data.data.length)
            console.log(data.data.length);
        }
        else{
            console.log("no Lab Record");
        }
    })
  }, [base])

  return { pending }
}
