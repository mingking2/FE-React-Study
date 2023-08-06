import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './modules/MainPage';
import ProductDetail from "./modules/ProductDetail";



function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/product/:name" element={<ProductDetail />}></Route>
       </Routes>
    </BrowserRouter>
  );
}

export default App;
