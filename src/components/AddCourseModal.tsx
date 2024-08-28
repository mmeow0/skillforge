import React, { useState } from "react";
import { addCourse } from "../api/authApi";
import { useDispatch } from "react-redux";
import { addCourse as addCourseAction } from "../store/userSlice";

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCourse: () => void;
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onClose,
  onAddCourse,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [instructorImage, setInstructorImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleAddCourse = async () => {
    if (
      !title ||
      !description ||
      !category ||
      !instructorName ||
      !instructorImage
    ) {
      setError("All fields are required");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const newCourse = {
        title,
        description,
        category,
        instructor_name: instructorName,
        instructor_image: instructorImage,
      };
      const response = await addCourse(newCourse);
      dispatch(addCourseAction(response)); // Update Redux state
      onAddCourse(); // Refresh course list
      onClose(); // Close modal
    } catch (error) {
      console.error("Failed to add course", error);
      setError("Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setInstructorName("");
    setInstructorImage("");
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Instructor Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Instructor Image URL</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={instructorImage}
              onChange={(e) => setInstructorImage(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={handleAddCourse}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Course"}
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
