import React, {useEffect, useState} from "react";
import axios from "../shared/axios";
import ServerNotification from "./ServerNotification";


const ServerNotifications = ({notificationUrl}) => {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        async function getNotifications() {
            let res = await axios.get(notificationUrl);
            let data = res.data._embedded.notifications;
            setNotifications(data);
        }
        getNotifications();
    },[notificationUrl, notifications]);

    return(
        <div style={{marginTop:'80px'}}>
            {
                notifications.map((n,i) => (
                    <ServerNotification
                        key={i}
                        message={n.message}/>
                ))
            }
        </div>
    );
}
export default ServerNotifications;
