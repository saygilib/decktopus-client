import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PresentationCardType } from "../types/PresentationCard";
import CreatePresentation from "./CreatePresentation";
import PresentationCard from "./PresentationCard";
import SortMenu from "./menu/SortMenu";
import PresentationCreateMenu from "./popups/PresentationCreateMenu";
import PresentationServices from "../services/PresentationServices";
import LocalStorageActions from "../utils/localStorageActions";
import { useNotification } from "../context/NotificationContext";
const Dashboard = () => {
  const [presentationCards, setPresentationCards] = useState<
    PresentationCardType[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [anchorElSort, setAnchorElSort] = React.useState<null | HTMLElement>(
    null
  );
  const isOpenSort = Boolean(anchorElSort);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const PresentationServicesObject = new PresentationServices();
  const { showError, showSuccess } = useNotification();
  const handleMenuClose = () => {
    setAnchorElSort(null);
  };
  const handleCreateDialogOpen = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
  };

  const handleCreateSave = async (
    newName: string,
    selectedImage: File | null
  ) => {
    if (newName && selectedImage) {
      const token = LocalStorageActions.getToken() || "";
      const createdBy = Number(LocalStorageActions.getUserId());
      const formData = new FormData();
      formData.append("presentationName", newName);
      formData.append("createdBy", createdBy as any);
      if (selectedImage) {
        formData.append("thumbnail", selectedImage);
      }

      try {
        PresentationServicesObject.createPresentations(formData, token)
          .then((res) => {
            if (res.data.isSuccess) {
              showSuccess(
                res.data.message || "Presentation created successfully!"
              );
              window.location.reload();
            } else
              showError(res.data.message || "Couldn't create presentation");
          })
          .catch((err) => {
            if (err)
              showError(
                err.message || "Error occured while creating the presentation."
              );
          });
      } catch (err) {
        console.error("Error creating new presentation:", err);
        showError("Error occured while creating the presentation.");
      }

      setIsCreateDialogOpen(false);
    } else {
      showError("Please fill the missing parts.");
    }
  };

  const fetchPresentations = async () => {
    const token = LocalStorageActions.getToken() || "";

    await PresentationServicesObject.getPresentations(token)
      .then((res) => {
        if (res.data.isSuccess) {
          showSuccess("Presentations retrieved successfully.");
          setPresentationCards(res.data.presentations);
          setLoading(false);
        } else showError(res.data.message || "Couldn't fetch presentations.");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          showError(err.message || "Couldn't fetch presentations.");
          setLoading(false);
        }
      });
  };

  const handleSort = (sortBy: string) => {
    let sortedCards = [...presentationCards];

    switch (sortBy) {
      case "title-asc":
        sortedCards.sort((a, b) =>
          a.presentationName.localeCompare(b.presentationName)
        );
        break;
      case "title-desc":
        sortedCards.sort((a, b) =>
          b.presentationName.localeCompare(a.presentationName)
        );
        break;
      case "recently-modified":
        sortedCards.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
      case "oldest-modified":
        sortedCards.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
        break;
      default:
        break;
    }

    setPresentationCards(sortedCards);
  };

  useEffect(() => {
    fetchPresentations();
  }, []);

  const handlePresentationDelete = (id: number) => {
    setPresentationCards((prevCards) =>
      prevCards.filter((card) => card.id !== id)
    );
  };
  const handlePresentationRename = (id: number, newName: string) => {
    setPresentationCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, presentationName: newName } : card
      )
    );
  };
  return (
    <Container>
      <div className="font-size-md my-4 fw-bold">Create a presentation</div>
      <div className="row">
        <CreatePresentation onClick={handleCreateDialogOpen} />
      </div>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="font-size-md fw-bold">Decks</div>
            <div className="text-gray font-size-sm mb-4">
              {presentationCards?.length || 0} files
            </div>
          </div>

          <SortMenu
            isOpen={isOpenSort}
            anchorEl={anchorElSort}
            setAnchorEl={setAnchorElSort}
            handleMenuClose={handleMenuClose}
            handleSort={handleSort}
          />
        </div>
      </div>
      <div className="row">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="row">
            {presentationCards.map((item, index) => (
              <PresentationCard
                key={index}
                id={item.id}
                createdBy={item.user}
                updatedAt={item.updatedAt}
                thumbnail={`http://localhost:3000${item.thumbnail}`}
                presentationName={item.presentationName}
                createdAt={item.createdAt}
                onDelete={handlePresentationDelete}
                onUpdate={handlePresentationRename}
              />
            ))}
          </div>
        )}
      </div>

      <PresentationCreateMenu
        isDialogOpen={isCreateDialogOpen}
        onClose={handleCreateDialogClose}
        onSave={handleCreateSave}
      />
    </Container>
  );
};

export default Dashboard;
