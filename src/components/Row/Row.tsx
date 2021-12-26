import { useEffect, useState } from 'react';
import instance from 'instance';
import './style.scss';
import YouTube from 'react-youtube';

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

type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

export const Row: React.VFC<Props> = ({ title, fetchUrl, isLargeRow }) => {
  //Movieの配列
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>('');

  useEffect(() => {
    // 初回読み込みかfetchUrlに変更があった場合に発火
    const fetchData = async () => {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      try {
        let trailerUrl = await instance.get(
          `/movie/${movie.id}/videos?api_key=9640cd5590a22950b9cb1dcc3f907453`
        );
        setTrailerUrl(trailerUrl.data.results[0]?.key);

        if (trailerUrl.data.results.length === 0) {
          throw new Error('映像がありません');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
