import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const MovieCard = ({movie}) => {
  return (
    <Card sx={{ maxWidth: 345, margin: "auto", marginTop: "10px", padding: "5px"}}>
      <CardMedia
        sx={{ height: 500, backgroundSize: "cover", borderRadius: "4px"}}
        image={"https://image.tmdb.org/t/p/original" + movie.poster_path}
        title={movie.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;