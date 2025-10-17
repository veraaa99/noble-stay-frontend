import { useNavigate } from "react-router"

const NotFound = () => {

  const navigate = useNavigate()

  return (
    <div>
      <div>
        <h1>404 Not found</h1>
        <p>The page you were looking for does not exist.</p>
        <button onClick={() => navigate('/')}>Go back to start</button>
      </div>
    </div>
  )
}
export default NotFound