export default function Win({score, chrono}) {

  return (
    <div className="Win">
      <h2>YOU WIN !!!</h2>
      <h3>SCORE : {score}</h3>
      <h3>TIME : {chrono}</h3>
    </div>
  )
}
