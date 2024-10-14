import {
  Card,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import Vector from "../../assets/images/Vector.png";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface PresentationCreateMenuProps {
  presentation?: string;
  isDialogOpen: boolean;
  onClose: () => void;
  onSave: (newName: string, selectedImage: File | null) => void;
}

const PresentationCreateMenu = ({
  isDialogOpen,
  onClose,
  onSave,
}: PresentationCreateMenuProps) => {
  const [presentationName, setPresentationName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSave = () => {
    onSave(presentationName, selectedImage);
    onClose();
  };
  const handleClose = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setPresentationName("");
    onClose();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    console.log(file);

    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleClose}
      maxWidth={"sm"}
      fullWidth={true}
    >
      <DialogContent>
        <div className="d-flex justify-content-between align-items-center mb-3">
          {" "}
          <div className="font-size-lg fw-bold ">Create Presentation</div>
          <Button className="p-0 text-dark " onClick={handleClose}>
            <FontAwesomeIcon className="fs-2x font-size-lg " icon={faXmark} />
          </Button>
        </div>

        <Card>
          <div className="p-3">
            <div className="font-size-md fw-bold ">Presentation Name</div>
            <div className="font-size-md fw-bold text-ellipsis">
              <TextField
                id="outlined-basic"
                label="Presentation Name"
                variant="outlined"
                color="secondary"
                value={presentationName}
                onChange={(e) => setPresentationName(e.target.value)}
                fullWidth
              />
            </div>

            <div className="mt-4">
              <div className="font-size-md fw-bold mb-2">
                Presentation Thumbnail
              </div>
              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="upload-image"
              />

              <label htmlFor="upload-image" className="w-100">
                <div className="row mx-0 w-100 align-items-center p-2 file-input-label">
                  <div className="col-1">
                    <img src={Vector} />
                  </div>
                  <div className="col-9 text-gray fw-bold font-size-md">
                    {!selectedImage
                      ? `Upload a picture for your presentation thumbnail. PNG or JPG
                    (rec 16:9) `
                      : `${selectedImage.name}`}
                  </div>
                  <div className="col-2">
                    {" "}
                    <Button
                      variant="outlined"
                      component="span"
                      fullWidth
                      className="font-size-sd text-gray browse-btn"
                    >
                      Browse
                    </Button>
                  </div>
                </div>
              </label>
            </div>
            <div className="row  pt-4">
              <div className="col-md-3 offset-md-9">
                {" "}
                <Button
                  onClick={handleSave}
                  className={
                    !selectedImage || !presentationName
                      ? `text-white bg-gray-2 create-btn w-100`
                      : `text-white bg-purple create-btn w-100`
                  }
                  variant="contained"
                  disabled={selectedImage && presentationName ? false : true}
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PresentationCreateMenu;
