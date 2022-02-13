import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function SpotCard({component,height,image}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
         component={component}
         height={height}
         image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Campus Spot
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a dolor gravida, aliquam tellus ut, porttitor risus.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}