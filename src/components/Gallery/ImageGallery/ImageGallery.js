import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { StyledGallery } from './ImageGallery.styled';

export function ImageGallery({ dataImages, onOpenModal }) {
  return (
    <StyledGallery>
      {dataImages.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onOpenModal={onOpenModal}
        />
      ))}
    </StyledGallery>
  );
}
