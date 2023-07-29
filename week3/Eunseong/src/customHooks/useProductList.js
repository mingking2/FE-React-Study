import { useState } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';


const useProductList = (initVal) => {
  const [data, setData] = useState(initVal)
  const getProductList = () => {
    return data.map((data) => {
      return (
        <Link to={`/product/${data.name}`}
          state={{ price: data.price }}
          key={data.name}
          style={{ textDecoration: "none", margin: "30px" }}>
          <Paper key={data.name}>
            <Grid container spacing={1} sx={{ position: "relative", height: "150px", padding: "10px" }}>
              <Grid xs={2} sx={{
                backgroundImage: `url(/img/${data.name}.jpg)`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}>
              </Grid>
              <Grid xs={10} sx={{}}>
                <Typography variant="h5" gutterBottom>{data.name}</Typography>
                <Typography variant="h6" gutterBottom>
                  {data.price.toLocaleString('ko-KR')}
                  <Typography variant="h7" gutterBottom sx={{ marginLeft: "10px" }}>
                    won
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Link>
      )
    });
  } 
  return getProductList()
}

export default useProductList