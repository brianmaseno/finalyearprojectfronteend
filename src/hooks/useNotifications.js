/* eslint-disable */
import {useState, useEffect} from 'react';
import { useBaseUrl } from './useBaseUrl';
import { useLoggedInUser } from './useLoggedInUser';

export const useNotification = () => {
  const { user } = useLoggedInUser();
  const [notifications, setNotifications] = useState([]);
  const base = useBaseUrl();

  useEffect(() => {
    fetch(`${base}/KNH/staff/viewNotifications?id=${user.national_id}`)
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
  }, [user, base])

  return { notifications }
}
