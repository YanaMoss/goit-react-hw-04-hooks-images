import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import ImageGallery from '../ImageGallery/ImageGallery';
import { fetchImageId } from '../../services/image-api';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';

export default function App() {
  const [query, setQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (id !== '') {
      setLoading(() => true);
      fetchImageId({ id: id })
        .then(response => {
          setId(() => response.data.hits[0].id);
          setImageName(() => response.data.hits[0].tags);
          setOpenModal(() => 'true');
          setImageUrl(() => response.data.hits[0].largeImageURL);
        })
        .finally(() => setLoading(() => false));
    }
  }, [id]);

  const handleImage = query => {
    setQuery(state => query);
  };

  const getImage = id => {
    setId(() => id);
  };

  const toggleModal = () => {
    setOpenModal(() => !openModal);
  };

  return (
    <div>
      <Searchbar onSubmit={handleImage} />
      <ImageGallery query={query} onClick={getImage} />
      {openModal && (
        <Modal onClose={toggleModal}>
          <img src={imageUrl} alt={imageName} />
        </Modal>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loading && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
    </div>
  );
}
