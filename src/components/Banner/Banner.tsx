import instance from 'instance';
import { useEffect, useState } from 'react';
import { requests } from 'request.js';
import './style.scss';

type movieProps = {
  title?: string;
  name?: string;
  original_name?: string;
  backdrop_path?: string;
  overview?: string;
};

export const Banner = () => {
  const [movie, setMovie] = useState<movieProps>({});

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(requests.feachNetflixOriginals);
      // apiからランダムで値を取得
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
    };

    fetchData();
  }, []);

  // descriptionの切り捨て関数
  const truncate = (str: any, n: number) => {
    // undefinedを弾く
    if (str !== undefined) {
      // substr(何番目の文字から、何個の文字まで); n - 1 は 番号は0からカウントされるため
      return str.length > n ? str?.substr(0, n - 1) + '...' : str;
    }
  };

  return (
    <header
      className="Banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="Banner-contents">
        <h1 className="banner-title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="Banner-buttons">
          <button className="Banner-button">Play</button>
          <button className="Banner-button">My List</button>
        </div>
        <p className="Banner-description">{truncate(movie?.overview, 150)}</p>
      </div>
      <div className="Banner-fadeBottom" />
    </header>
  );
};
