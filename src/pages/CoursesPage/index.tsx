import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCourses, toggleSubscription, deleteCourse } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { AddCourseModal } from "../../components/AddCourseModal";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { generatePastelColor } from "../../shared/ui/utils/generatePastelColor";

type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  is_subscribed: boolean;
  instructor_name: string;
  instructor_image: string | null;
};

export const CoursesPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    try {
      const coursesData = await getCourses();
      setCourses(coursesData);
    } catch (error) {
      console.error("Failed to fetch courses", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate]);

  const handleAddCourseClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCourseAdded = () => {
    fetchCourses();
  };

  const handleToggleSubscription = async (courseId: string) => {
    try {
      await toggleSubscription(courseId);
      fetchCourses();
    } catch (error) {
      console.error("Failed to toggle subscription", error);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      fetchCourses();
    } catch (error) {
      console.error("Failed to delete course", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-8">
          IT-наставничество.
        </h1>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Поиск курсов..."
            className="p-3 w-1/2 shadow-lg rounded-l-lg focus:outline-none"
          />
          <button className="bg-indigo-200 p-3 rounded-r-lg shadow-lg hover:bg-indigo-400 transition-colors text-gray-700">
            Найти
          </button>
        </div>
        <button
          className="mb-6 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition-colors"
          onClick={handleAddCourseClick}
        >
          Новый курс
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.id}
                className={`p-4 border border-gray-300 rounded-lg shadow-md bg-${generatePastelColor()} relative`}
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleToggleSubscription(course.id)}
                    aria-label={
                      course.is_subscribed ? "Unsubscribe" : "Subscribe"
                    }
                  >
                    {course.is_subscribed ? (
                      <FaHeart className="text-2xl text-indigo-500" />
                    ) : (
                      <FaRegHeart className="text-2xl text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center mb-4">
                  <img
                    src={course.instructor_image || ""}
                    alt="Instructor"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <span className="text-gray-800">
                    {course.instructor_name}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {course.title}
                </h3>
                <p className="text-gray-600">{course.description}</p>
                <p className="text-gray-500">
                  <strong>Category:</strong> {course.category}
                </p>
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    aria-label="Delete"
                  >
                    <FaTrash className="text-2xl text-gray-300 hover:text-gray-500 transition-colors" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No courses available.</p>
          )}
        </div>
      </div>
      <AddCourseModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAddCourse={handleCourseAdded}
      />
    </div>
  );
};
