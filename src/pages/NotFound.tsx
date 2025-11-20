import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="m-auto">
      <div>
        <h1>404 Not found</h1>
        <p>The page you were looking for does not exist.</p>
        <button className="btn-primary" onClick={() => navigate("/")}>
          Go back to start
        </button>
      </div>
    </div>
  );
};
export default NotFound;
