import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface MenuItemObject {
  item: ReactNode;
  onClick: () => void;
}

interface DropDownMenuProps {
  menuLabel: ReactNode;
  menuItems: MenuItemObject[];
}

export default function DropDownMenu({
  menuLabel,
  menuItems,
}: DropDownMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit" // Add color="inherit" to ensure text is visible
      >
        {menuLabel}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems.map((i, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose();
              i.onClick();
            }}
          >
            {i.item}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
