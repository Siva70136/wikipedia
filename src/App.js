import { useState } from 'react';
import { Circles,Bars} from 'react-loader-spinner'
import ImageCard from './components/imageCards';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSubmit = (e) => {
    setLoad(true);
    e.preventDefault();
    getInfo(query, page);
    setQuery('');
  };
  /*const load=()=>{
    const nextPage = page + 1;
    console.log(nextPage,query1);
    setPage(nextPage);
    getInfo(query1,page);
  }*/

  const handleRecentSearchClick = (query) => {
    setPage(1);
    getInfo(query, page);
  };

  const getInfo = async (query, page) => {
    console.log(query);
    const res = await fetch(`https://api.unsplash.com/search/photos/?page=${page}&query=${query}&client_id=2DzTpg9g1fT0C4uo-vvtMCVq01aEYW81s2S1KuYfzvQ`);
    if (res.status == 200) {
      const data1 = await res.json();
      if (page === 1) {
        setData(data1.results)
        setLoad(false);
      } else {
        setData((prevImages) => [...prevImages, ...data.results]);
        setLoad(false);
      }
      setRecentSearches((prevSearches) => {
        const newSearches = [query, ...prevSearches.filter((item) => item !== query)];
        return newSearches;
      });

      data.map(each => {
        console.log(each);
      })
    }
    else {
      setLoad(true);
    }
  }



  return (
    <div className=''>
      <div className='search-container'>
        <form onSubmit={handleSubmit} className="image-search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images..."
            className="search"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      <div className="recent-searches">
        {recentSearches.map((search, index) => (
          <span
            key={index}
            onClick={() => handleRecentSearchClick(search)}
            className="recent-search-item"
          >
            {search}
          </span>
        ))}
      </div>
      <div className='imagecards-container'>
        {load ? <div className="loader-container" data-testid="loader">
        < Circles type="ThreeDots" color="#3b82f6" height="50" width="50" />
        </div> :
          data.map(each => {
            return (
              <ImageCard data={each} key={each.id} />
            )
          })
        }
      </div>

    </div>
  )

}

export default App;
