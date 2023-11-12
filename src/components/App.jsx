import { Component } from 'react';
import { fetchImages } from 'api/fetchImages';
import { ImageGallery } from './Gallery/ImageGallery/ImageGallery';
import { Searchbar } from './SearchBar/SearchBar';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Loader } from './Loader/Loader';
import { MyModal } from './Modal/Modal';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  state = {
    dataImages: [],
    searchQuery: '',
    page: 1,
    per_page: 12,
    isLoading: false,
    error: false,
    showModal: false,
    largeImageURL: '',
    tagImageAlt: '',
    availablePages: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, per_page, availablePages } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      const clearName = searchQuery.split('/')[1];
      try {
        this.setState({ isLoading: true, error: false });
        const initialImages = await fetchImages(clearName, page);
        this.setState(prevState => {
          return {
            dataImages: [...prevState.dataImages, ...initialImages.hits],
            availablePages: Math.ceil(initialImages.totalHits / per_page),
          };
        });
        if (availablePages > 0) {
          toast.success('Successfully found!');
        } else {
          toast.error(
            'Nothing found. Check the correctness of the search word.'
          );
        }
      } catch (error) {
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
      page,
      availablePages,
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

            {page !== availablePages && dataImages.length >= 11 && (
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
        <Toaster />
      </div>
    );
  }
}
