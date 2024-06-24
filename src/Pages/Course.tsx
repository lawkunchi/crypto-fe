import { useState, useEffect } from "react";
import { courseService } from "../services/CourseService";
import { useParams } from "react-router-dom";

interface CourseDetails {
  id: number;
  name: string;
  image: string;
  count: number;
  is_user_registered: boolean;
}

export default function Course() {
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { id } = useParams();
  const getCourse = async () => {
    const response = await courseService.getCourse(id);
    console.log(response.data, "course datials");
    setCourseDetails(response.data);
  };

  useEffect(() => {
    setTimeout(() => {
      getCourse();
      setIsLoading(false);
    }, 2000);
  }, []);

  const registerForCourse = async () => {
    setIsSubmitting(true);
    await courseService.registerToCourse(id);
    setIsSubmitting(false);
  };
  const unRegisterForCourse = async () => {
    setIsSubmitting(true);
    await courseService.unRegisterToCourse(id);
    setIsSubmitting(false);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-between">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex-grow">
          <div className="p-6 text-gray-900 flex flex-col items-center">
            {isLoading ? (
              <div>Loading course details...</div>
            ) : (
              <>
                <img
                  src={courseDetails?.image}
                  alt="Course"
                  className="w-48 h-48 object-cover"
                />
                <div>Course: {courseDetails?.name}</div>
              </>
            )}
            {toastMessage && <div className="mt-4">{toastMessage}</div>}
          </div>
        </div>
        <div className="ml-4 w-96 bg-gray-100 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6">
            <h2 className="font-semibold text-lg">Course Details</h2>
            <p>Participants: {courseDetails?.count}</p>
            {courseDetails?.is_user_registered ? (
              <>
                <button
                  onClick={unRegisterForCourse}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Unregister
                </button>
                <p>You are registered to this course </p>{" "}
              </>
            ) : (
              <button
                onClick={registerForCourse}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Register
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
