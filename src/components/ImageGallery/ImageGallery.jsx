import { useState, useEffect, useRef } from 'react';
import Loader from 'react-loader-spinner';
import { Button } from '../Button/Button';
import { fetchImages } from '../../services/image-api';
import { ImageGalleryItem } from './ImageGalleryItem';
import { ImageGalleryContainer } from './ImageGallery.styled';

export default function ImageGallery({ query, onClick }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState('');
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (query !== '') {
      setLoading(true);
      fetchImages({ page: page, query: query })
        .then(response => {
          setImages(state => [...state, ...response.data.hits]);
          setTotal(response.data.totalHits);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .finally(() => setLoading({ loading: false }));
    }
  }, [page, query]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const getImage = imageId => {
    onClick(imageId);
  };

  return (
    <div>
      {loading && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
      <ImageGalleryContainer>
        {images.map(({ id, largeImageURL, tags }) => (
          <ImageGalleryItem
            id={id}
            url={largeImageURL}
            name={tags}
            getImage={getImage}
          />
        ))}
      </ImageGalleryContainer>
      {images.length < total && (
        <Button
          type={'button'}
          title={'Load more'}
          onClick={() => nextPage({ page })}
        />
      )}
    </div>
  );
}
