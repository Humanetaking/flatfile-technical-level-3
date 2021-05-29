import styled from 'styled-components'

export const StyledBoardHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgb(49, 121, 186);
`;

export const LeftQueue = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 10px;
`;

export const BoardSelector = styled.div`
  width: 280px;
  border-radius: 3px;
  color: black;
  padding: 10px;
`;

export const AddBoardDiv = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
  border-radius: 3px;
  color: black;
  padding: 10px;
`;

export const AddBoardComponent = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  display: flex;
  margin-top: 8px;
  margin-bottom: 8px;
  max-width: 300px;
  max-height: 40px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
`

export const AddBoardDetails = styled.div`
  padding: 6px 8px 2px;
  z-index: 10;
`

export const AddBoardTextArea = styled.textarea`
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  height: 48px;
  background: none;
  border: none;
  box-shadow: none;
  margin-top: 4px;
  margin-bottom: 4px;
  max-height: 48px;
  min-height: 24px;
  padding: 0;
  width: 80%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  outline: none;
  border-radius: 3px;
`

export const SubmitButtonDiv = styled.div`
  height: 32px;
`

export const SubmitButton = styled.input`
  background-color: #5aac44;
  box-shadow: none;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
`