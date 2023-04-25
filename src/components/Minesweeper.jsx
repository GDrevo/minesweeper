import { useEffect, useRef, useState } from "react"
import Header from "./Header"
import Minefield from "./Minefield"
import newGame from "../newGame"
import Win from "./Win"

export default function Minesweeper() {
  const mineNumber = 15
  const [chrono, setChrono] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [board, setBoard] = useState([])
  const intervalRef = useRef(null)
  const [mode, setMode] = useState('win')
  const [score, setScore] = useState(0)
  const [finalChrono, setFinalChrono] = useState(0)

  useEffect(() => {
    const newGrid = newGame()
    setBoard(newGrid)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  const resetGame = () => {
    const newGrid = newGame()
    setMode('game')
    setBoard(newGrid)
    setIsPlaying(false)
    setChrono(0)
    clearInterval(intervalRef.current)
  }

  const startChrono = () => {
    setIsPlaying(true)
    intervalRef.current = setInterval(() => {
      setChrono(prevChrono => prevChrono + 1)
    }, 1000);
  }

  const checkVictory = () => {
    const mines = board.filter(cell => cell.mine)
    const flag = board.filter(cell => cell.flag)
    const allFlagged = mines.every(mine => board.find(cell => cell.id === mine.id && cell.flag))
    const isComplete = flag.length === mines.length
    if (allFlagged && isComplete) {
      const time = chrono
      const score = Math.round(100000 / time)
      setScore(score)
      setFinalChrono(time)
      setIsPlaying(false)
      setChrono(0)
      clearInterval(intervalRef.current)
      setMode('win')
    }
  }

  const uncoverCell = (id) => {
    const cellToUncover = board.find(cell => cell.id === id)
    if (cellToUncover.flag) {
      toggleFlag(id)
    }
    if (cellToUncover.mine) {
      setIsPlaying(false)
      setChrono(0)
      clearInterval(intervalRef.current)
      setMode('lose')
    }
    if (isPlaying === false) {
      startChrono()
    }
    const boardCopy = [...board]
    for (let i = 0; i < boardCopy.length; i++) {
      if (boardCopy[i].id === id) {
        boardCopy[i].uncovered = true
        setBoard(boardCopy)
        break
      }
    }
  }

  const toggleFlag = (id, e) => {
    if (e) {
      e.preventDefault()
    }
    const cellToCheck = board.find(cell => cell.id === id)
    if (cellToCheck.uncovered) {
      return
    }
    const boardCopy = [...board]
    for (let i = 0; i < boardCopy.length; i++) {
      if (boardCopy[i].id === id) {
        if (boardCopy[i].flag === true) {
          boardCopy[i].flag = false
        } else if (boardCopy[i].flag === false) {
          boardCopy[i].flag = true
        }
        setBoard(boardCopy)
        break
      }
    }
    checkVictory()
  }

  return (
    <div className="Minesweeper">
      <Header
        mines={mineNumber}
        chrono={chrono}
        handleClick={resetGame}
      />
      {mode === 'game' && <Minefield
        grid={board}
        handleClick={uncoverCell}
        handleRightClick={toggleFlag}
        lost={false}
      />}
      {mode === 'win' && <Win
        score={score}
        chrono={finalChrono}
      />
      }
      {mode === 'lose' && <Minefield
        grid={board}
        handleClick={uncoverCell}
        handleRightClick={toggleFlag}
        lost={true}
      />}
    </div>
  )
}
