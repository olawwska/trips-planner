import { FC } from 'react';
// components
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
// icons
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
// types
import { PlaceListItemType } from '../types';

const PlaceListItem: FC<PlaceListItemType> = ({
  id,
  onDelete,
  name,
  onHandleFocus,
  onHandleClick,
  onHandleMouseOut,
  setIsOpenDialog,
  setAttractionForm,
}) => {
  const handleSetAttractionId = () => {
    if (setAttractionForm) {
      setAttractionForm((prevState) => ({
        ...prevState,
        id: id,
      }));
    }
  };
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <>
          <IconButton
            size="large"
            edge="end"
            aria-label="edit"
            onClick={() => {
              setIsOpenDialog && setIsOpenDialog(true);
              setAttractionForm && handleSetAttractionId();
            }}
          >
            <EditIcon />
          </IconButton>
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
        onMouseEnter={() => {
          onHandleFocus && onHandleFocus();
        }}
        onMouseLeave={() => {
          onHandleMouseOut && onHandleMouseOut();
        }}
        onClick={() => {
          onHandleClick && onHandleClick(id);
        }}
      >
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};

export default PlaceListItem;
