import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Section from './components/section'
import SectionI from './types/section'
import {BoardHeader} from './components/board'

import Cookies from 'universal-cookie';

import './App.css'
import { Board } from './types/board'

export const BoardContainer = styled.div`
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

function App() {
  const [sections, setSections] = useState<SectionI[]>([])
  const [boards, setBoards] = useState<Board[]>([])
  const [currentBoard, setCurrentBoard] = useState<Board>()
  const cookies = new Cookies();

  const setCookie = (key: string, value: string) => {
    cookies.set(key, value, { path: '/' });
  }
  
  const getBoards = async () => {
    const boards = await axios.get('http://localhost:3001/boards').then((response) => {
      return response.data
    })
    let currentBoard = cookies.get('currentBoard')
    if (!currentBoard) {
      setCookie('currentBoard', boards[0])
      currentBoard = boards[0]
    }
    setCurrentBoard(currentBoard)
    setBoards(boards)
  }

  useEffect(() => {
    getBoards();
  }, [])

  const sortedSections = async () => {
      axios.get('http://localhost:3001/sections/'+currentBoard?.id).then((response) => {
      // Section order is determined by ID so sort by ID
      const result = response.data.sort((a: SectionI, b: SectionI) => a.id - b.id)
      setSections(result)
      })
    }

  useEffect(() => {
    sortedSections();
  }, [currentBoard?.id]);

  const onCardSubmit = (sectionId: number, title: string) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { sectionId, title }
    }).then((response) => {
      let sectionsClone: SectionI[] = [...sections]
      for (let i = 0; i < sectionsClone.length; i++) {
        let section: SectionI = sectionsClone[i]
        if (section.id == sectionId) {
          section.cards.push({
            id: response.data.id,
            title: response.data.title,
            section_id: sectionId
          })
          setSections(sectionsClone)
        }
      }
    })
  }

  return (
    <div>
      <BoardHeader currentBoard={currentBoard} boards={boards}/>
      <BoardContainer>
        {sections.map((section: SectionI) => {
          return <Section section={section} onCardSubmit={onCardSubmit}></Section>
        })}
      </BoardContainer>
    </div>
  )
}

export default App
