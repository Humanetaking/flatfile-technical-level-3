import styled from 'styled-components'
import Select from 'react-select';

//I'm following the established code layout but I would suggest grouping the type with the component
// a types.ts in this /src/component/board folder... 
import {Board} from '../../types/board'

const BoardContainer = styled.div`
  background-color: rgb(49, 121, 186);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #393939;
  overflow-y: hidden;
  overflow-x: auto;
  position: absolute;
  padding: 5px;
  align-items: flex-start;
`

const StyledBoardHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgb(49, 121, 186);
`;

const LeftQueue = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 10px;
`;

const BoardSelector = styled.div`
  width: 280px;
  border-radius: 3px;
  color: black;
  padding: 10px;
`;

type BoardHeaderType = {
  currentBoard?: Board,
  boards: Board[]
}

export const BoardHeader = ({currentBoard, boards}: BoardHeaderType) => {
    const options = boards.map((element: { id: number; title: string; }) => ({
        "value": element.id, "label": element.title
    }));

    const setBoardChange = ({value}: any) => {
      let boardId = value
      boards.forEach(board => {
        if(boardId == board.id){
          currentBoard = board
        }
      })
    }
    return (
        <StyledBoardHeader>
            <LeftQueue>
                <BoardSelector>
                    <Select
                        value={options[0]}
                        label="Board"
                        options={options}
                        isSearchable={false}
                        onChange={(value) => setBoardChange(value)}
                    />
                </BoardSelector>
            </LeftQueue>
        </StyledBoardHeader>
    )
}
