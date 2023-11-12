import { Component } from 'react';
import { BackdropStyled, ModalStyled } from './Modal.styled';

export class MyModal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return (
      <BackdropStyled onClick={this.handleOverlayClick}>
        <ModalStyled>{this.props.children}</ModalStyled>
      </BackdropStyled>
    );
  }
}
