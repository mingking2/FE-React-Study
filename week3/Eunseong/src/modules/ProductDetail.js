//import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useParams, useLocation } from 'react-router-dom';


const ProductDetail = () => {
  const location = useLocation();
  const {name} = useParams();
  return (
    <Container fixed sx={{
      position: "relative",
    }}>
      <Card sx={{ maxWidth: 500, 
        marginLeft: "auto",
        marginRight: "auto", 
      }}>
      <CardMedia
        sx={{ height: 500, backgroundSize: "contain"}}
        image={`/img/${name}.jpg`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {location.state.price.toLocaleString('ko-KR')}
          <Typography variant="h7" gutterBottom sx={{marginLeft: "10px"}}>
            won
          </Typography>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy</Button>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
    </Container>
  );
};

export default ProductDetail;