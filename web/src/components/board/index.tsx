import Select from 'react-select';

//I'm following the established code layout but I would suggest grouping the type with the component
// a types.ts in this /src/component/board folder... 
import {Board} from '../../types/board'
import {
  StyledBoardHeader,
  LeftQueue,
  BoardSelector,
  AddBoardComponent,
  AddBoardDetails,
  AddBoardTextArea,
  SubmitButton, 
  SubmitButtonDiv,
  AddBoardDiv
  } from './styled-components'
import React, { useState } from 'react';

type BoardHeaderType = {
  addBoard: Function,
  currentBoard: Board,
  setCurrentBoard: Function,
  boards: Board[]
}

export const BoardHeader = ({addBoard, currentBoard, setCurrentBoard, boards}: BoardHeaderType) => {
    const [isTempBoardActive, setIsTempBoardActive] = useState(false)
    const [boardText, setBoardText] = useState('')


    const options = boards.map((element: { id: number; title: string; }) => ({
        "value": element.id, "label": element.title
    }));

    const setBoardChange = ({value}: any) => {
      let boardId = value
      boards.forEach(board => {
        if(value == board.id){
          setCurrentBoard(board)
        }
      })
    }

    let placeholderValue = {
      value: 0,
      label: currentBoard.id != 0 ? currentBoard.title : "Create a Board ->"
    }

    return (
        <StyledBoardHeader>
            <LeftQueue>
                <BoardSelector>
                    <Select
                        value={placeholderValue}
                        label="Board"
                        options={options}
                        isSearchable={false}
                        onChange={(value) => setBoardChange(value)}
                    />
                </BoardSelector>

                {isTempBoardActive ? (
                  <AddBoardDiv>
                    <AddBoardComponent>
                      <AddBoardDetails>
                        <AddBoardTextArea
                          placeholder='New Board Name'
                          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setBoardText(e.target.value)
                          }
                        />
                      </AddBoardDetails>
                    </AddBoardComponent>
                    <SubmitButtonDiv>
                      <SubmitButton
                        type='button'
                        value='Add Board'
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                          e.preventDefault()

                          if (boardText) {
                            addBoard(boardText)
                          }

                          setIsTempBoardActive(false)
                        }}
                      />
                    </SubmitButtonDiv>
                  </AddBoardDiv>
                ) : (
                  <button onClick={() => setIsTempBoardActive(true)}>
                    <span>Add Board</span>
                  </button>
                )}
            </LeftQueue>
        </StyledBoardHeader>
    )
}
