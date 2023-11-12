import { StyledBtn, StyledBtnBox } from './LoadMoreBtn.styled';

export function LoadMoreBtn({ onLoadMore }) {
  return (
    <StyledBtnBox>
      <StyledBtn onClick={onLoadMore} type="button">
        load more
      </StyledBtn>
    </StyledBtnBox>
  );
}
