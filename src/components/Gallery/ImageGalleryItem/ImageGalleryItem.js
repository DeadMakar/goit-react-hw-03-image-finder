import {
  StyledImageGalleryItem,
  ImageGalleryItemPic,
} from './ImageGalleryItem.styled';

export function ImageGalleryItem({ image, onOpenModal }) {
  return (
    <StyledImageGalleryItem as="li">
      <ImageGalleryItemPic
        height={260}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onOpenModal(image)}
      />
    </StyledImageGalleryItem>
  );
}
