import { courseService } from "../services/CourseService";
import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    const response = await courseService.getCourseList();
    setCourses(response.data);
  };

  useEffect(() => {
    getCourses();
  }, []);
  console.log(courses);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900">Course List</div>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
