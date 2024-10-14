import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";

interface CreatePresentationProps {
  onClick: () => void; 
}

const CreatePresentation = ({ onClick }: CreatePresentationProps) => {
  return (
    <div className="col-lg-2 col-md-3 col-6 mb-3 ">
      <Button sx={{ width: "100%", background: "white" }} onClick={onClick}> 
        <Card>
          <FontAwesomeIcon icon={faSquarePlus} />
          <div className="title-card">Create a new presentation</div>
        </Card>
      </Button>
    </div>
  );
};

export default CreatePresentation;
