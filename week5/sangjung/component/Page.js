import { useParams } from 'react-router-dom';
import PageNavBar from './PageNavBar';

const Page = () => {
    const {category} = useParams();

    return (
        <>
            <PageNavBar category={category} />
        </>
    )
}

export default Page;