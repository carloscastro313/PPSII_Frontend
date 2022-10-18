import React from "react";
import { useContext } from "react";
import ErrorContext from "../../contexts/errorPopup/ErrorContext";
import Button from "../Button/Button";
import Container from "../Container/Container";
import Modal from "../Modal/Modal";

const ErrorModal = () => {
  const { show, closeError, msg } = useContext(ErrorContext);

  return (
    <Modal show={show}>
      <Container cssClass="w-[300px] h-[500px] bg-red-300">
        <div className="flex flex-col gap-5">
          <h1 className="text-xl text-center">Error</h1>
          <div className="h-[350px] overflow-x-auto">
            <p>{msg}</p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
            ducimus cumque architecto voluptatibus quam! Veniam voluptatem vel
            enim? Possimus earum, dolorem cum nobis in nihil dolores qui ab
            libero quas? Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Vitae fugiat deleniti blanditiis molestias ab tenetur error,
            labore harum iusto dolores. Esse perspiciatis voluptatem voluptates
            at nesciunt, nobis qui aspernatur minus Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Eius exercitationem error quam in
            veritatis sunt, labore facilis velit quod voluptates nostrum sequi
            veniam facere dicta dolorem! Id accusamus veniam cumque.
          </div>
          <div className="flex justify-center content-center">
            <Button name="Cerrar" onClickEvent={closeError} />
          </div>
        </div>
      </Container>
    </Modal>
  );
};

export default ErrorModal;
