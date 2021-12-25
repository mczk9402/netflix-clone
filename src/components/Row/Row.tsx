import { useEffect, useState } from 'react';
import instance from 'instance';
import './style.scss';

const base_url = 'https://image.tmdb.org/t/p/original';

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  //Movieの配列
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // 初回読み込みかfetchUrlに変更があった場合に発火
    async function fetchData() {
      // fetchUrlでAPIを叩く
      const request = await instance.get(fetchUrl);
      // Moviesに代入
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row-posters">
        {movies?.map((movie, index) => (
          <img
            key={index}
            className={`Row-poster ${isLargeRow ? 'Row-poster-large' : ''}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};
