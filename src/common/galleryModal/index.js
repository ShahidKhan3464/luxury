import React from 'react';
import Modal from 'react-modal';
import { DarkBGColor } from '../globalStyle';
import { GalleryModalContainer, ModalCrossIcon } from './style';

const Index = ({ customStyle = null, viewPhotosModalHandler, setViewPhotosModalHandler, children }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            border: 'none',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: customStyle === 'none' ? 'unset' : '100%',
            height: customStyle === 'none' ? 'unset' : '100%',
            background: customStyle === 'none' ? 'transparent' : `${DarkBGColor}`,
        },
    };

    function closeModal() {
        setViewPhotosModalHandler(false);
    }

    return (
        <GalleryModalContainer>
            <Modal
                ariaHideApp={false}
                style={customStyles}
                onRequestClose={closeModal}
                isOpen={viewPhotosModalHandler}
            >
                <ModalCrossIcon>
                    {customStyle === 'none' ? <div /> : <img onClick={closeModal} src='images/crossIcon.svg' alt='crossIcon' />}
                </ModalCrossIcon>
                {children}
            </Modal>
        </GalleryModalContainer>
    )
}

export default Index