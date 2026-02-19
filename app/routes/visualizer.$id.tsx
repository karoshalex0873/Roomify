import { useParams } from "react-router";

const VisualizerId = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Visualizer</h1>
      <p>Project id: {id}</p>
    </div>
  )
}

export default VisualizerId
