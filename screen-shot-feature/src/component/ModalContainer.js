import React from "react";
import Modal from "react-modal";
import Select from "react-select";
import 'react-toastify/dist/ReactToastify.css';
import { MdDraw } from "react-icons/md";
import { LuRectangleHorizontal } from "react-icons/lu";
import { BsEraserFill } from "react-icons/bs";
import { MdOutlineZoomIn } from "react-icons/md";
import { MdOutlineZoomOut } from "react-icons/md";
import { FieldWrapper, Label, InputField, TextArea } from "./styles";

import useTicketRaise from "./hooks/useTicketRaise";
import { IMPACT_OPTIONS, SECTION_OPTIONS, SUB_SECTION_OPTIONS } from "./options";

function ModalContainer({ showModal, setShowModal, croppedImageUrl }) {
  const { data, handleChange, handleRaiseTicket } = useTicketRaise();

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <div className="modal_container">
          <div className="left">
            <div className="header">
              <div className="header_title">Screen Shot Based Ticket</div>
              <div className="info">
                Please use PLL button to mark any PLL information in the screenshot.
              </div>
            </div>
            <div className="img_div">
              <img src="https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=" alt="not found"/>
            </div>
            <div className="footer">
              <div className="actions">
                <div className="left_actions">
                  <div className="draw">
                    <MdDraw />
                  </div>
                  <div className="pll_info">
                    <LuRectangleHorizontal />
                  </div>
                  <div className="erase">
                    <BsEraserFill />
                  </div>
                </div>
                <div className="clear">Clear</div>
                <div className="rigth_actions">
                  <div>
                    <MdOutlineZoomIn />
                  </div>
                  <div>
                    <MdOutlineZoomOut />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rigth">
            <h4>Issue Type</h4>
            <div className="issue_type">
              <div className="bug_btn">Bug</div>
              <div className="enh_btn">Enhancement</div>
            </div>
            <div className="fields">
              <FieldWrapper>
                <Label>Impacts:</Label>
                <Select
                  placeholder="Select Impact"
                  name="impacts"
                  defaultValue={{
                    value: "stop me from doing my work",
                    label: "Stop me from doing my work",
                  }}
                  value={IMPACT_OPTIONS.find((option) => option.value === data.impacts)}
                  onChange={(selectedOption) => handleChange("impacts", selectedOption.value)}
                  options={IMPACT_OPTIONS}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Label>Title:</Label>
                <InputField type="text" name="title" placeholder="Book a Title" value={data.title} onChange={(e) => handleChange("title", e.target.value)} />
              </FieldWrapper>{" "}
              <FieldWrapper>
                <Label>Description:</Label>
                <TextArea name="description" placeholder="Enter Description"  value={data.description} onChange={(e) => handleChange("description", e.target.value)}/>
              </FieldWrapper>{" "}
              <FieldWrapper>
                <Label>Section:</Label>
                <Select
                  placeholder="Select Section"
                  name="section"
                  defaultValue={{ value: "loan", label: "Loan" }}
                  value={SECTION_OPTIONS.find((option) => option.value === data.section)}
                  onChange={(selectedOption) => handleChange("section", selectedOption.value)}
                  options={SECTION_OPTIONS}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Label>Sub Section:</Label>
                <Select
                  placeholder="Select Sub Section"
                  name="sub_section"
                  defaultValue={{ value: "home page", label: "Home Page" }}
                  options={SUB_SECTION_OPTIONS}
                  value={SUB_SECTION_OPTIONS.find((option) => option.value === data.sub_section)}
                  onChange={(selectedOption) => handleChange("sub_section", selectedOption.value)}
                />
              </FieldWrapper>
            </div>
            <div className="action_btn">
              <button className="cancel_btn" onClick={handleCancel}>Cancel</button>
              <button className="raise_ticket_btn" onClick={handleRaiseTicket}>Raise Ticket </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalContainer;
