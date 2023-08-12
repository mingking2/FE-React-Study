import Pages from './pages/Pages';
import { BrowserRouter} from 'react-router-dom';


const App = () => {

    return (
        <BrowserRouter>
            <Pages/>
        </BrowserRouter>
    )
}

export default App;