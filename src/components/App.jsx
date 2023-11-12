import { Component } from 'react';
import { fetchImages } from 'api/fetchImages';
import { ImageGallery } from './Gallery/ImageGallery/ImageGallery';
import { Searchbar } from './SearchBar/SearchBar';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Loader } from './Loader/Loader';
import { MyModal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  state = {
    dataImages: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    error: false,
    showModal: false,
    largeImageURL: '',
    tagImageAlt: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (
      (prevState.searchQuery !== searchQuery || prevState.page !== page) &&
      !this.state.isLoading
    ) {
      const clearName = this.state.searchQuery.split('/')[1];
      try {
        this.setState({ isLoading: true, error: false });
        const initialImages = await fetchImages(clearName, this.state.page);
        this.setState({ dataImages: initialImages, page: 1 });
      } catch (error) {
        if (this.state.dataImages.length === 0) {
          toast.error(`${clearName} not found`);
        }
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleFormSubmit = newQuery => {
    this.setState({
      searchQuery: `${Date.now()}/${newQuery}`,
      page: 1,
      dataImages: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleOpenModal = image => {
    const { largeImageURL, tags } = image;
    this.setState({
      showModal: true,
      largeImageURL,
      tagImageAlt: tags,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
      tagImageAlt: '',
    });
  };

  render() {
    const {
      dataImages,
      showModal,
      largeImageURL,
      tagImageAlt,
      isLoading,
      error,
    } = this.state;

    return (
      <div>
        <Searchbar onFormSubmit={this.handleFormSubmit} />

        {isLoading && <Loader />}

        {error && <h1>{error.message}</h1>}

        {!isLoading && !error && (
          <>
            <ImageGallery
              dataImages={dataImages}
              onOpenModal={this.handleOpenModal}
            />

            {error && (
              <b>
                Oops! Something went wrong! Please try reloading this page! 🥹
              </b>
            )}

            {dataImages.length >= 11 && (
              <LoadMoreBtn onLoadMore={this.handleLoadMore} />
            )}
          </>
        )}

        {showModal && (
          <MyModal onCloseModal={this.handleCloseModal}>
            <img src={largeImageURL} alt={tagImageAlt} />
          </MyModal>
        )}
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
