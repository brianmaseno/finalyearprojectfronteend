/* eslint-disable */
import {useState, useEffect} from 'react';
import { useAuth } from '../hooks/AuthProvider';

export const useNotification = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(`https://ehrsystembackend.herokuapp.com/KNH/staff/viewNotifications?id=${currentUser.username}`)
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
  }, [currentUser])

  return { notifications }
}
