import { FC } from 'react';
// components
import { Typography, Card, CardContent, CardActions, CardMedia, Link } from '@mui/material';
// types
import { IInfoWindowDataType } from '../../types';

const MapInfoWindow: FC<{ infoWindowData: IInfoWindowDataType }> = ({ infoWindowData }) => {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={infoWindowData?.photo} title="attraction" />
        <CardContent>
          <Typography
            sx={{ fontFamily: 'Roboto' }}
            gutterBottom
            variant="subtitle2"
          >{`Rating: ${infoWindowData?.rating}`}</Typography>
        </CardContent>
        <CardActions>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              if (infoWindowData?.website) {
                console.log(infoWindowData?.website);
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
