import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red,blue } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {yellow} from "@material-ui/core/colors";
import stronk from './laptop.jpg';
export default function CourseCard(props) {
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <div style={{ position:'relative' }}>
                <CardMedia
                    component="img"
                    height="100"
                    image={stronk}
                    alt="Course photo"

                />
                    <div style={{ position:'absolute',fontSize:'16px',borderRadius:'4px',top:25,right:30,color:'#fff',backgroundColor:'#ea5252',padding:'3px 8px' }}>
                        <span>{props.price}Eur</span>
                    </div>
                </div>
                <CardContent>
                    <Typography variant="body" color="#595959">
                      <h5>{props.name}</h5>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        by user{props.userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ display:'flex',alignItems: 'center',gap:1}}>
                        <StarIcon sx={{ color: '#ffa200' }}/>
                        <StarIcon  sx={{ color: '#ffa200' }}/>
                        <StarIcon  sx={{ color: '#ffa200' }}/>
                        <StarIcon  sx={{ color: '#ffa200' }}/>
                        <StarIcon  sx={{ color: '#ffa200' }}/>
                        {props.score}
                        <div style={{ fontSize:12 }}> ({props.rating})</div>

                    </Typography>
                </CardContent>

            </Card>
        </div>
    )
}
