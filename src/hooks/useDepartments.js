/* eslint-disable */
import {useState, useEffect} from 'react';
import { useBaseUrl } from './useBaseUrl';

export const useDepartments = () => {
  const [departments, setDepartments] = useState([])
  const base = useBaseUrl()

  useEffect(() => {
    fetch(`${base}/KNH/staff/department/all`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Found") {
            setDepartments(data.data)
        }
        else{
            setDepartments([])
        }
    })
  }, [base])

  return { departments }
}
