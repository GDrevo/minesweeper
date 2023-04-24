export default function Header({mines, chrono, handleClick}) {

  return (
    <div className="Header">
      <h1>Minesweeper</h1>
      <div className="header-options">
        <div className="header-option">
          <img src="mine.png" alt="mine" className="header-img" />
          <h3>{mines}</h3>
        </div>
        <img src="replay.png" alt="reset-button" className="replay-button" onClick={handleClick} />
        <div className="header-option">
          <img src="chrono.png" alt="chronometer" className="header-img" />
          <h3>{chrono}</h3>
        </div>
      </div>
    </div>
  )
}
