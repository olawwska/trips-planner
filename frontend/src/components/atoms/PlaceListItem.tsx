import { FC } from 'react';
// components
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
// icons
import DeleteIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
// types
import { PlaceListItemType } from '../types';

const PlaceListItem: FC<PlaceListItemType> = ({
  id,
  onDelete,
  name,
  onHandleFocus,
  onHandleClick,
}) => {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton
          size="large"
          edge="end"
          aria-label="delete"
          onClick={() => {
            onDelete(id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton
        onMouseEnter={() => {
          if (onHandleFocus) {
            onHandleFocus();
          }
        }}
        onClick={() => {
          if (onHandleClick) {
            onHandleClick(id);
          }
        }}
      >
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};

export default PlaceListItem;
