import Categories from "./NewsComponent/Categories";
import { useParams } from "react-router-dom"; // useParams를 가져옴
import NewsList from "./NewsComponent/NewsList";
import { Link } from 'react-router-dom';


const NewsPage = () => {
  // useParams 훅을 사용하여 category 값을 추출
  const { category } = useParams();

  // 카테고리가 선택되지 않았으면 기본값 all로 사용
  const selectedCategory = category || "all";

  return (
    <div>
      <Link to="/">홈으로 이동</Link>
      <h1>News Page</h1>
      <Categories />
      <NewsList category={selectedCategory} />
    </div>
  );
};

export default NewsPage;
