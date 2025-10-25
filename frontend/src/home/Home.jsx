import { useState, useEffect} from "react";
import React from "react";
import './Home.css';
import NavBar from '../components/NavBar/navbar'

const ProgressBar = ({ progress, labelprgs}) => {
    return (
        <div className='progress-bar'>
            <div className='track-progress'>
                <div className='fill-progress' style={{ width: `${progress}%` }}>
                    <span className='progress-label'>{labelprgs || `${progress}%`}</span>
                </div>
            </div>
        </div>
    );
};

export default function Home() {

    const [date, setDate] = useState("Mon 15");

    const weekdays = ["Mon 15", "Tue 16", "Wed 17", "Thu 18", "Fri 19"];

    return (
        <div id='home-container'>
            <img src='./src/assets/notifications.png' className='notifs-button'></img>
            <img src='./src/assets/Home.png' alt='Home' className='home-header-img'/>
            
            <div className='progress-bar-container'>
                <p>Degree Progress:</p>
                <ProgressBar progress={60} label="Degree Progress"/>
                <p className='completed-units'>96 of 120 units completed</p>
            </div>

            <div className='reminders-container'>
                <div className='reminder-row'>
                    <div className='layout-reminder' />
                    <img src='./src/assets/Reminders.png' className='reminder-header-label'></img>
                    <img src='./src/assets/add_circle.png' className='add-reminder-button'></img>
                </div>
            </div>

            <div className='schedule-container'>
                <div className='view-schedule'>
                    <img src='./src/assets/myschedule.png' className='schedule-label'></img>
                    <div className='row-weekdays'>
                        {weekdays.map(weekday => (
                            <div
                                key={weekday} 
                                className={`date-container ${date === weekday ? "selected" : ""}`} 
                                onClick={() => setDate(weekday)}
                            >
                                {weekday}
                            </div>
                        ))}
                    </div>

                    </div>
                </div>
            <NavBar />
        </div>
    )
}