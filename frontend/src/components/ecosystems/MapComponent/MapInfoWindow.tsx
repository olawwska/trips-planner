import { FC } from 'react';
// components
import { Typography, Card, CardActions, CardMedia, Link } from '@mui/material';
// types
import { IInfoWindowDataType } from '../../types';

const MapInfoWindow: FC<{ infoWindowData: IInfoWindowDataType }> = ({ infoWindowData }) => {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <Typography sx={{ fontFamily: 'Roboto' }} gutterBottom variant="subtitle2">
          {infoWindowData?.attraction}
        </Typography>
        <CardMedia sx={{ height: 140 }} image={infoWindowData?.photo} title="attraction" />
        <CardActions>
          <Link
            component="button"
            underline="none"
            variant="body2"
            href={infoWindowData?.website}
            onClick={() => {
              if (infoWindowData?.website) {
                window.location.href = infoWindowData?.website;
              }
            }}
          >
            Check website
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default MapInfoWindow;
