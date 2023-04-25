import Cell from "./Cell"

export default function Minefield({grid, handleClick, handleRightClick, lost}) {

  return (
    <div className="Minefield">
      <div className="board">
        {lost === false
        ?
          grid.map((cell) => {
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
          })
        :
          grid.map((cell) => {
            return (
              <Cell
                key={cell.id}
                id={cell.id}
                mine={cell.mine}
                uncovered={cell.uncovered}
                handleClick={null}
                minesNear={cell.minesNear}
                flag={cell.flag}
                handleRightClick={null}
              />
            )
          })
        }
      </div>
    </div>
  )
}
