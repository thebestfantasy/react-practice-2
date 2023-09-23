import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import MyModal from 'components/Modal/MyModal';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    error: null,
    isEmpty: false,
    isVisible: false,
    isShowModal: false,
    largeImage: '',
    tag: '',
  };

  componentDidUpdate = (_, prevState) => {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  };

  getPhotos = async (query, page) => {
    if (!query) return;
    this.setState({ isLoading: true });
    try {
      const {
        photos,
        total_results,
        per_page,
        page: curentPage,
      } = await ImageService.getImages(query, page);
      if (photos.length === 0) {
        this.setState({ isEmpty: true });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        isVisible: curentPage < Math.ceil(total_results / per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = value => {
    this.setState({ query: value, page: 1, images: [] });
  };

  onLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  onOpenModal = (largeImage, tag) => {
    this.setState({ isShowModal: true, largeImage: largeImage, tag: tag });
  };

  onCloseModal = () => {
    this.setState({ isShowModal: false, largeImage: '', tag: '' });
  };

  render() {
    const {
      images,
      isLoading,
      isEmpty,
      isVisible,
      error,
      isShowModal,
      largeImage,
      tag,
    } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {error && (
          <Text textAlign="center">❌ Something went wrong - {error}</Text>
        )}
        {images.length > 0 && (
          <Grid>
            {images.map(({ id, avg_color, src, alt }) => (
              <GridItem
                key={id}
                onClick={() => this.onOpenModal(src.large, alt)}
              >
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
          </Grid>
        )}
        {isVisible && !isLoading && images.length > 0 && (
          <Button onClick={this.onLoadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        )}
        <MyModal
          modalIsOpen={isShowModal}
          closeModal={this.onCloseModal}
          src={largeImage}
          tag={tag}
        />
      </>
    );
  }
}
