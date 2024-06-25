import { Link } from 'react-router-dom';
const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`}>
    
    <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
      <img className="w-full h-48 object-cover" src={course.image} alt={course.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">{course.name}</div>
      </div>
    </div>
    </Link>
  );
};

export default CourseCard;