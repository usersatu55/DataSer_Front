import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from '../components/NavbarTeacher';
import axios from 'axios';

import '../css/TeacherAddCourse.css'


function TeacherAddCourse() {
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [timeSlots, setTimeSlots] = useState([{ day: '', start_time: '', end_time: '' }]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const courseData = {
            course_code: courseCode,
            course_name: courseName,
            course_time_slots: timeSlots,
            attendance_status: 'closed' 
        };

        try {
            const response = await axios.post('http://localhost:3000/courses/create', courseData);
            alert('Course created successfully!');
           
            setCourseCode('');
            setCourseName('');
            setTimeSlots([{ day: '', start_time: '', end_time: '' }]);
        } catch (error) {
            console.error('There was an error creating the course!', error);
            alert('Failed to create course');
        }
    };

    const handleSlotChange = (index, event) => {
        const newSlots = [...timeSlots];
        newSlots[index][event.target.name] = event.target.value;
        setTimeSlots(newSlots);
    };

    const addSlot = () => {
        setTimeSlots([...timeSlots, { day: '', start_time: '', end_time: '' }]);
    };

    const removeSlot = (index) => {
        const newSlots = timeSlots.filter((_, i) => i !== index);
        setTimeSlots(newSlots);
    };

    return (
        <div className="course-form-container">
            <Navbar/>
            <h2>Add New Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="courseCode">รหัสวิชา</label>
                    <input
                        type="text"
                        id="courseCode"
                        name="course_code"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="courseName">ชื่อวิชา</label>
                    <input
                        type="text"
                        id="courseName"
                        name="course_name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>เวลาเรียน</label>
                    {timeSlots.map((slot, index) => (
                        <div key={index} className="time-slot">
                            <select
                                name="day"
                                value={slot.day}
                                onChange={(e) => handleSlotChange(index, e)}
                                required
                            >
                                <option value="">Select Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                            <input
                                type="time"
                                name="start_time"
                                value={slot.start_time}
                                onChange={(e) => handleSlotChange(index, e)}
                                required
                            />
                            <input
                                type="time"
                                name="end_time"
                                value={slot.end_time}
                                onChange={(e) => handleSlotChange(index, e)}
                                required
                            />
                            <button type="button" onClick={() => removeSlot(index)}>ลบ</button>
                        </div>
                    ))}
                    <button type="button" onClick={addSlot}>เพิ่มเวลาเรียน</button>
                </div>
                <button type="submit">สร้างคอร์ส</button>
            </form>
        </div>
    );
}

export default TeacherAddCourse;
