import {
  Card,
  TextField,
  Button,
  Dialog,
  DialogActions,
} from "@mui/material";
import React from "react";

interface PresentationEditMenuProps {
  currentName?: string;
  isDialogOpen: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
}

const PresentationEditMenu = ({
  currentName = "",
  isDialogOpen,
  onClose,
  onSave,
}: PresentationEditMenuProps) => {
  const [newName, setNewName] = React.useState(currentName);

  const handleSave = () => {
    onSave(newName);
    onClose();
  };

  return (
    <Dialog open={isDialogOpen} onClose={onClose} maxWidth={"sm"} fullWidth={true}>      
        <div className="fw-bold font-size-lg px-3 pt-3">Rename Presentation</div>

        <Card>
          <div className="p-3">
            
              <div className="font-size-md fw-bold text-ellipsis">
                <TextField
                  id="outlined-basic"
                  label="Presentation Name"
                  variant="outlined"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  fullWidth
                />
              </div>
        
          </div>
        </Card>
   
      <DialogActions>
        <Button onClick={onClose} className="text-gray border">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PresentationEditMenu;
