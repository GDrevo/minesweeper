import Cell from "./Cell"

export default function Minefield({grid, handleClick, handleRightClick}) {

  return (
    <div className="Minefield">
      <div className="board">
        {grid.map((cell) => {
          return (
            <Cell
              key={cell.id}
              id={cell.id}
              mine={cell.mine}
              uncovered={cell.uncovered}
              handleClick={() => handleClick(cell.id)}
              minesNear={cell.minesNear}
              flag={cell.flag}
              handleRightClick={(e) => handleRightClick(cell.id, e)}
            />
          )
        })}
      </div>
    </div>
  )
}
