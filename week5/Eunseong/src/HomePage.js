import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const HomePage = () => {
  return (
    <Container maxWidth="">
      <Box sx={{ flexGrow: 1, marginTop: "50vh"}}>
        <Grid container spacing={1}>
        
          <Grid xs={4}>
            <Link to={"/TodoPage"} style={{textDecoration: "none"}}>
              <Paper sx={{textAlign: "center"}}>
                <Typography variant="h6" gutterBottom>
                  TodoPage
                </Typography>
              </Paper>
            </Link>
          </Grid>

          <Grid xs={4}>
            <Link to={"/MoviePage"} style={{textDecoration: "none"}}>
              <Paper sx={{textAlign: "center"}}>
                <Typography variant="h6" gutterBottom>
                  MoviePage
                </Typography>
              </Paper>
            </Link>
          </Grid>

          <Grid xs={4}>
            <Link to={"/WeatherPage"} style={{textDecoration: "none"}}>
              <Paper sx={{textAlign: "center"}}>
                <Typography variant="h6" gutterBottom>
                  WeatherPage
                </Typography>
              </Paper>
            </Link>
          </Grid>

        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage;