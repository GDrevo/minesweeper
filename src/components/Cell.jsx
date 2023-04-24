// export default function Cell({mine, id, uncovered, handleClick, minesNear, flag, handleRightClick}) {
//   const minesNumber = <h5>{minesNear}</h5>
//   const bomb = <img src="mine.png" alt="mine" className="mine-png" />

//   return (
//     <div className={uncovered ? 'Cell uncovered' : 'Cell'} onClick={handleClick} onContextMenu={handleRightClick}>
//       {mine ? bomb : minesNumber}
//       <p>{flag ? 'a' : 'b'}</p>
//     </div>
//   )
// }

export default function Cell({mine, id, uncovered, handleClick, minesNear, flag, handleRightClick}) {
  const minesNumber = <h5>{uncovered ? minesNear : ''}</h5>
  const bomb = uncovered ? <img src="mine.png" alt="mine" className="mine-png" /> : <></>

  return (
    <div className={uncovered ? 'Cell uncovered' : 'Cell'} onClick={handleClick} onContextMenu={handleRightClick}>
      {mine ? bomb : minesNumber}
      {flag ? <img src="flag.png" alt="flag" className="flag-png" /> : <></>}
    </div>
  )
}
