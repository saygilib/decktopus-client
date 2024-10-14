import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
interface PresentationDeleteMenuProps {
  isDialogOpen: boolean;
  onClose: () => void; 
  onDelete: () => void;
}

const PresentationDeleteMenu = ({
  isDialogOpen,
  onClose,
  onDelete,
}: PresentationDeleteMenuProps) => {
  return (
    <Dialog open={isDialogOpen} onClose={onClose} maxWidth={"sm"} fullWidth={true}>
      <div className="fw-bold font-size-lg px-3 pt-3">Delete Presentation</div>
      <DialogContent>
        <div>Are you sure you want to delete this presentation?</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className="text-gray border"  >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PresentationDeleteMenu;
