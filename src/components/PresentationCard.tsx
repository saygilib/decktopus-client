import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { formatDistanceToNow } from "date-fns";
import * as React from "react";
import TestPicture from "../assets/images/testpicture.png";
import PresentationServices from "../services/PresentationServices";
import { PresentationCardType } from "../types/PresentationCard";
import LocalStorageActions from "../utils/localStorageActions";
import BasicMenu from "./menu/BasicMenu";
import PresentationDeleteMenu from "./popups/PresentationDeleteMenu";
import PresentationEditMenu from "./popups/PresentationEditMenu";
import { useNotification } from "../context/NotificationContext";
const PresentationCard = (props: PresentationCardType) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [presentationName, setPresentationName] = React.useState(
    props.presentationName
  );
  const { showError, showSuccess } = useNotification();
  const isOpen = Boolean(anchorEl);
  const displayDate =
    props.createdAt === props.updatedAt
      ? `Created: ${formatDistanceToNow(new Date(props.createdAt))} ago.`
      : `Last update: ${formatDistanceToNow(new Date(props.updatedAt))} ago.`;
  const PresentationServicesObject = new PresentationServices();
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRenameClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    console.log(props.createdBy.id);

    if (props.createdBy.id == Number(LocalStorageActions.getUserId())) {
      const id = props.id;
      const token = LocalStorageActions.getToken() || "";
      await PresentationServicesObject.deletePresentation(id, token)
        .then((res) => {
          if (res.data.isSuccess) {
            console.log("Presentation deleted:", res);
            showSuccess(
              res.data.message || "Presentation deleted successfully."
            );
            props.onDelete(props.id);
          }
        })
        .catch((err) => {
          console.log("error while deleting presentation", err);
          showError(err.message || "error while deleting presentation");
        });

      handleDeleteDialogClose();
    } else showError("You can't delete another user's presentation.");
  };
  const handleSaveName = async (newName: string) => {
    const id = props.id;
    const token = LocalStorageActions.getToken() || "";
    const createdBy = Number(LocalStorageActions.getUserId());
    await PresentationServicesObject.updatePresentation(
      { newName, createdBy, id },
      token
    )
      .then((res) => {
        console.log(res);

        if (res.data.isSuccess) {
          setPresentationName(newName);
          showSuccess(res.data.message);
          props.onUpdate(props.id, newName);
        } else {
          showError(res.data.message);
        }
      })
      .catch((err) => {
        console.log("Error while renaming presentation:", err);
        showError(err.message || "Error occured.");
      });

    handleEditDialogClose();
  };
  return (
    <div className="col-lg-2 col-md-3 col-6 mb-3">
      <Card>
        <div className={` ${isOpen ? "dashboard-card" : ""}`}>
          <div className={`p-3`}>
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="font-size-md fw-bold text-ellipsis">
                  {props.presentationName}
                </div>
                <BasicMenu
                  isOpen={isOpen}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  handleMenuClose={handleMenuClose}
                  onRename={handleRenameClick}
                  onDelete={handleDeleteClick}
                />
              </div>

              <div className="text-gray font-size-sm mb-4">{displayDate}</div>
            </div>

            <CardMedia
              component="img"
              image={props.thumbnail || TestPicture}
              alt="Presentation Thumbnail"
            />
            <div className="text-gray lato-light font-size-sd text-end mt-3">{`Created By ${props.createdBy.username}`}</div>
          </div>
        </div>
      </Card>

      <PresentationEditMenu
        currentName={props.presentationName}
        isDialogOpen={isEditDialogOpen}
        onClose={handleEditDialogClose}
        onSave={handleSaveName}
      />

      <PresentationDeleteMenu
        isDialogOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PresentationCard;
