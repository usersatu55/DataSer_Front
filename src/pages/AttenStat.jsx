import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function AttenStat() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { course_code, course_name } = location.state || {};

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/atten/");
        setStudents(response.data.Attendance);
      } catch (err) {
        setError("Failed to fetch students");
      }
    };

    fetchStudents();
  }, []);

  const toggleStatus = (index) => {
    setStudents((prevStudents) => {
      const newStudents = [...prevStudents];
      const currentStatus = newStudents[index].status;

    
      if (currentStatus === "present") {
        newStudents[index].status = "late";
      } else if (currentStatus === "late") {
        newStudents[index].status = "absent";
      } else if (currentStatus === "absent") {
        newStudents[index].status = "leave";
      } else {
        newStudents[index].status = "present";
      }

      return newStudents;
    });
  };

  const renderStatusCircle = (status, index) => {
    let bgColor;
    switch (status) {
      case "present":
        bgColor = "bg-green-500";
        break;
      case "late":
        bgColor = "bg-orange-500";
        break;
      case "absent":
        bgColor = "bg-red-500";
        break;
      case "leave":
        bgColor = "bg-blue-500";
        break;
      default:
        bgColor = "bg-gray-300";
    }

    return (
      <button
        className={`inline-block w-4 h-4 ${bgColor} rounded-full`}
        onClick={() => toggleStatus(index)}
      />
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center py-8">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            สถานะการเข้าเรียนล่าสุด
          </h1>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
            <h2 className="text-xl font-semibold pb-8">
              {course_code} {course_name}
            </h2>

            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ลำดับ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      รหัสนักศึกษา
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ชื่อ-นามสกุล
                    </th>
                    <th scope="col" className="px-6 py-3">
                      1/09/24
                    </th>
                    <th scope="col" className="px-6 py-3">
                      8/09/24
                    </th>
                    <th scope="col" className="px-6 py-3">
                      19/09/24
                    </th>
                    <th scope="col" className="px-6 py-3">
                      30/09/24
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={index}
                      className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {index + 1}
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {student.student_id}
                      </th>
                      <td className="px-6 py-4">
                        {student.student_fname} {student.student_lname}
                      </td>
                      {/* Each column for a different date */}
                      {[1, 8, 19, 30].map((date) => (
                        <td key={date} className="px-6 py-4 ">
                          {renderStatusCircle(student.status, index)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttenStat;
