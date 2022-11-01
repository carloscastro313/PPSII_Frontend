import React from "react";
import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";

const LoadingModal = ({ show = false }) => {
  return (
    <Modal zIndex="z-20" show={show}>
      <div className="flex justify-center items-center w-full h-full">
        <Spinner />
      </div>
    </Modal>
  );
};

export default LoadingModal;
