import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useProductList from '../customHooks/useProductList';


const MainPage = () => {

  const productList = useProductList([
  { name: "S23", price: 1190000 },
  { name: "S22", price: 1080000 },
  { name: "S21", price: 980000 },])

  return (
    <Container fixed sx={{
      position: "relative",
    }}>
      <Typography variant="h3" gutterBottom>Product List</Typography>
      {productList}
    </Container>
  );
}

export default MainPage;