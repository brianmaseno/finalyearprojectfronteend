/* eslint-disable */
import {useState, useEffect} from 'react';
import { useAuth } from '../hooks/AuthProvider';
import { useBaseUrl } from './useBaseUrl';

export const useNotification = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const base = useBaseUrl();

  useEffect(() => {
    fetch(`${base}/KNH/staff/viewNotifications?id=${currentUser.national_id}`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Found") {
            setNotifications(data.data);
            console.log(data.data);
        }
        else{
            console.log("no Notification");
        }
    })
  }, [currentUser, base])

  return { notifications }
}
