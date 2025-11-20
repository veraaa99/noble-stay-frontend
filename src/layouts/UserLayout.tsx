import { useUser } from "@/contexts/UserContext";
import { Navigate, Outlet } from "react-router";

const UserLayout = () => {
  const { currentUser, authReady } = useUser();

  return currentUser && authReady ? <Outlet /> : <Navigate to="/" replace />;
};
export default UserLayout;
