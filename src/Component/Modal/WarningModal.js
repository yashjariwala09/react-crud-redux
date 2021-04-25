import React from "react";
import Modal from "./Modal";

function WarnningModal(props) {
  const { open, oncloseModal, totalSelectedTask, onSubmit } = props;

  return (
    <Modal
      isOpen={open}
      onSubmit={onSubmit}
      handleClose={oncloseModal}
      submitButtonName={"Confirm"}
      cancelButton={true}
      title={totalSelectedTask + " task selected"}
    >
      <div style={{ marginBottom: "10px", color: "#f50057" }}>
        {`You are about to delete ${totalSelectedTask} task. Are you sure you want to continue?`}
      </div>
    </Modal>
  );
}

export default WarnningModal;
