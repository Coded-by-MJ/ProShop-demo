import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        display: "block",
        width: "100px",
        height: "100px",
        margin: "50px auto",
      }}
    />
  );
}
export default Loader;
