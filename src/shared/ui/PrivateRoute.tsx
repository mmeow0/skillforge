import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const PrivateRoute: React.FC<{ element: JSX.Element }> = ({
  element,
}) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};
