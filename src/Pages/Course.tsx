import { useState, useEffect } from "react";
import { courseService } from "../services/CourseService";
import { useParams, useNavigate} from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import InputError from "../components/InputError";
interface CourseDetails {
  id: number;
  name: string;
  image: string;
  count: number;
  is_user_registered: boolean;
}

export default function Course() {

    const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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
    try {
        await courseService.registerToCourse(id);
        setMessage('You have successfully registered to this course');
        setIsSubmitting(false);
        getCourse();
      } catch (error) {
        setIsSubmitting(false);
        if (error instanceof Error) { 
          setError("You already registered to this course");
        } else {
          setError('An unexpected error occurred.');
        }
      }
  };

  const unRegisterForCourse = async () => {
    setIsSubmitting(true);
    try {
        await courseService.unRegisterToCourse(id);
        setMessage('You have successfully unregistered to this course');
        setIsSubmitting(false);
        getCourse();
      } catch (error) {
        setIsSubmitting(false);
        if (error instanceof Error) { 
          setError("You are not registered to this course");
        } else {
          setError('An unexpected error occurred.');
        }
      }
  };

  return (
    <div className="py-12">
      {isLoading ? (
        <div className="flex justify-center items-center    ">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-between">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex-grow">
            <div className="p-6 text-gray-900 flex flex-col items-center">
              <img
                src={courseDetails?.image}
                alt="Course"
                className="w-48 h-48 object-cover"
              />
              <div>{courseDetails?.name}</div>
            </div>
          </div>
          <div className="ml-4 w-96 bg-gray-100 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <h2 className="font-semibold text-lg">Course Details</h2>
              <p>Participants: {courseDetails?.count}</p>
              {courseDetails?.is_user_registered ? (
                <>
                  <p>You are already registered to this course </p>
                  <button
                    onClick={unRegisterForCourse}
                    disabled={isSubmitting}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Unregister
                  </button>
                  <div className="text-sm text-green-600">{message}</div>   
                </>
              ) : (
                <>
                  <button
                  disabled={isSubmitting}
                    onClick={registerForCourse}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Register
                  </button>
                  <InputError message={error} className="mt-2" />
                  <div className="text-sm text-green-600">{message}</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
