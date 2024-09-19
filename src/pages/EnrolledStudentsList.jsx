import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavbarTeacher";

function EnrolledStudentsList() {
  const { course_code } = useParams();
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/enroll/byc`, {
          params: { course_code },
        });

        if (response.data.Enrollments.length > 0) {
          setEnrolledStudents(response.data.Enrollments);
        } else {
          setEnrolledStudents([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch enrolled students");
      }
    };

    fetchEnrolledStudents();
  }, [course_code]);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center py-8">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            รายชื่อนักศึกษาที่ลงทะเบียน
          </h1>

          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">รหัสนักศึกษา</th>
                  <th scope="col" className="px-6 py-3">ชื่อ-นามสกุล</th>
                </tr>
              </thead>
              <tbody>
                {enrolledStudents.map((student, index) => (
                  <tr key={index} className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {student.student_id}
                    </th>
                    <td className="px-6 py-4">
                      {student.student_fname} {student.student_lname}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrolledStudentsList;
