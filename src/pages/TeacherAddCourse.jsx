import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/TeacherAddCourse.css';
import Navbar from '../components/NavbarTeacher';

const TeacherAddCourse = () => {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [timeSlots, setTimeSlots] = useState([{ day: '', start_time: '', end_time: '' }]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('กรุณาเข้าสู่ระบบ');
      navigate('/');
      return;
    }

    try {
      await axios.post('http://localhost:3000/courses/create', {
        course_code: courseCode,
        course_name: courseName,
        course_time_slots: timeSlots
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('สร้างคอร์สสำเร็จ');
    } catch (err) {
      console.error(err);
      alert('สร้างคอร์สไม่สำเร็จ');
    }
  };

  const handleSlotChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][name] = value;
    setTimeSlots(updatedTimeSlots);
  };

  const addSlot = () => {
    setTimeSlots([...timeSlots, { day: '', start_time: '', end_time: '' }]);
  };

  const removeSlot = (index) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots.splice(index, 1); 
    setTimeSlots(updatedTimeSlots);
  };

  return (
    <div className="course-form-container">
      <Navbar />
      <h2>สร้างคอร์สใหม่</h2>
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
                <option value="">เลือกวัน</option>
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
};

export default TeacherAddCourse;
