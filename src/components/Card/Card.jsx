import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function SpotCard({component,height,image,hpath, name, address}){
    return (
        
        <Card sx={{ maxWidth: 400}}>  {/* Is the max width of a card */}
            <CardActionArea>

                <CardMedia
                    component="img"
                    height= "200"
                    image={image}
                />

                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {address}
                    </Typography>
                </CardContent>

            </CardActionArea>
        </Card>
    );
}