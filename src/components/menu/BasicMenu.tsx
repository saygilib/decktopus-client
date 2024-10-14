import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorIcon from "@mui/icons-material/MoreHoriz";
interface BasicMenuProps {
    isOpen: boolean;
    anchorEl: HTMLElement | null;
    setAnchorEl: (el: HTMLElement | null) => void;
    handleMenuClose: () => void;
    onRename: () => void; 
    onDelete: () => void;
  }
  
  const BasicMenu = ({
    isOpen,
    anchorEl,
    setAnchorEl,
    handleMenuClose,
    onRename,
    onDelete,
  }: BasicMenuProps) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    return (
      <div className="text-gray">
        <IconButton
          id="basic-button"
          aria-controls={isOpen ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onRename();
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <div className="font-size-sd fw-bold ms-2">Rename</div>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onDelete();
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
            <div className="font-size-sd fw-bold ms-2">Delete</div>
          </MenuItem>
        </Menu>
      </div>
    );
  };
  export default BasicMenu