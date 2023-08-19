import { useState, useCallback } from 'react';
import Categories from './Categories';
//import NewsList from './compoent/News/NewsList';

const News = () => {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback(category => setCategory(category), []);
  
  return (
    <div>
      <Categories category={category} onSelect={onSelect}/>
      <p>속보 : newsapi는 localhost에서 보내는 api 요청만 받는다고 합니다</p>
      ㅋㅋ
      {/* <NewsList category={category}/> */}
    </div>
  );
};

export default News;
