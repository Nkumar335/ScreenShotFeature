import styled from "styled-components";

export const FieldWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 10px;
`;

export const SelectField = styled.select`
  width: calc(100% - 16px); 
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline-none;
`;

export const InputField = styled.input`
  width: calc(100% - 20px); 
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline-none;
`;

export const TextArea = styled.textarea`
  width: calc(100% - 20px); 
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline-none;
`;
