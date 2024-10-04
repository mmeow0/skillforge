import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { getUserData, toggleSubscription } from "../../api/authApi";
import { setUserData } from "../../store/userSlice";

type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  is_subscribed: boolean;
};

export const UserProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extract user data from Redux
  const { name, email } = useSelector((state: RootState) => state.user);

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setCourses(userData.courses);
        dispatch(setUserData(userData));
      } catch (error) {
        console.error("Failed to fetch user data", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [dispatch, navigate]);

  const handleToggleSubscription = async (courseId: string) => {
    try {
      await toggleSubscription(courseId);
      // Reload user profile after successful subscription toggle
      const profileData = await getUserData();
      setCourses(profileData.courses);
      dispatch(setUserData(profileData));
    } catch (error) {
      console.error("Failed to toggle subscription", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">User Profile</h1>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Name: {name}</h2>
          <p className="text-lg text-gray-600">Email: {email}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            My Courses
          </h2>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id} // Use unique identifier
                  className="bg-white p-6 border border-gray-300 rounded-lg shadow-sm flex flex-col"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{course.description}</p>
                  <p className="text-gray-500 mb-4">
                    <strong>Category:</strong> {course.category}
                  </p>
                  <div className="flex-grow"></div>
                  <button
                    onClick={() => handleToggleSubscription(course.id)}
                    className={`${
                      course.is_subscribed
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } text-white py-2 px-4 rounded transition-colors duration-300`}
                  >
                    Unsubscribe
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No courses enrolled.</p>
          )}
        </div>
      </div>
    </div>
  );
};
