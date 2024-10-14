import { IconButton, Menu, MenuItem } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

interface SortMenuProps {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  handleMenuClose: () => void;
  handleSort: (sortBy: string) => void; 
}

const SortMenu = ({
  isOpen,
  anchorEl,
  setAnchorEl,
  handleMenuClose,
  handleSort,
}: SortMenuProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (sortBy: string) => {
    handleSort(sortBy); 
    handleMenuClose(); 
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
        <div className="text-dark text-sort fw-bold">
          <SortIcon className="me-1" />
          Sort by
        </div>
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className="div-sort"
      >
        <MenuItem onClick={() => handleMenuItemClick("title-asc")}>
          <div className="font-size-sd fw-bold py-1">Title (A-Z)</div>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("title-desc")}>
          <div className="font-size-sd fw-bold py-1">Title (Z-A)</div>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("recently-modified")}>
          <div className="font-size-sd fw-bold py-1">Recently Modified</div>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("oldest-modified")}>
          <div className="font-size-sd fw-bold py-1">Oldest Modified</div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SortMenu;
