import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
// components
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
// icons
import DeleteIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
// types
import { PlaceListItemType } from '../types';

const PlaceListItem: FC<PlaceListItemType> = ({ id, onDelete, place }) => {
  const navigate = useNavigate();

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <>
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
        </>
      }
    >
      <ListItemButton
        onClick={() => {
          if (place.type === 'city') {
            return navigate(`/attractions/${id}`);
          }
        }}
      >
        <ListItemText primary={place.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default PlaceListItem;
