import { useState, useEffect } from 'react';
import React from 'react';
import './notifications.css';
import notifsData from './mockNotification'

//function Notifications({ notifs})} {
function Notifications() {
    const [notifs, setNotifs] = useState(notifsData);
    const [notifsFilter, setFilter] = useState('All');

    const markallRead = () => {
        setNotifs(previous =>
            previous.map(notif => ({ ...notif, read: true}))
        );
    };

    if (!notifs || !Array.isArray(notifs)) {
        return <div>No notifications yet</div>;
    }

    const notificationsFilter = notifs.filter(notif => {
        if (notifsFilter === 'Unread') {
            return !notif.read;
        }
        return true;
    });

    return (
        <div id='notifications-case'>
            <img src='/src/assets/arrow_left_white.png' className='back-arrow-white'></img>
            <img src='/src/assets/NotifsHeader.png' alt='Notifications' className='notifs-header-image'/>
            <div className='add-notif-container'>
                <img src='/src/assets/add_circle.png' className='add-reminder-button'></img>
            </div>
            
            <div className='notifs-container'>
                <div className='buttons-row'>
                    <div className='buttons-filter'>
                        <button className={`button-filter-all ${notifsFilter === 'All' ? 'active': ''}`} onClick={() => setFilter('All')}>All</button>
                        <button className={`button-filter-unread ${notifsFilter === 'Unread' ? 'active': ''}`} onClick={() => setFilter('Unread')}>Unread</button>
                    </div>
                        
                    <button className='mark-read-button' onClick={markallRead}>Mark all as read</button>
                </div>

                <div className='line'></div>

                <div className='items'>
                    {notificationsFilter.length > 0 ? (
                        notificationsFilter.map(notif => (
                            <div key={notif.id} className={`items ${notif.read ? 'read' : 'unread'}`}>
                                <p>{notif.message}</p>
                            </div>
                        ))
                    ) : (
                        <p className='no-notifs'>No notifications yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Notifications;