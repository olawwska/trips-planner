import { FC, useState } from 'react';
// components
import { ListItem, ListItemButton, ListItemText, Typography, Grid } from '@mui/material';
// icons
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
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
  addRating,
  rating,
}) => {
  const [attractionRating, setAttractionRating] = useState<number | null>(rating ?? null);

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
        <ListItemText
          primary={
            <Grid
              container
              alignItems="flex-end"
              justifyContent="space-between"
              sx={{ width: '90%' }}
            >
              <Typography>{name}</Typography>
              {addRating && (
                <Rating
                  name="simple-controlled"
                  value={attractionRating}
                  onChange={(event, newValue) => {
                    setAttractionRating(newValue);
                    addRating({ id: id, rating: newValue });
                  }}
                />
              )}
            </Grid>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default PlaceListItem;
