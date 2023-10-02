import React from 'react'
import { useState, useEffect } from "react"
import Card from "./components/Card"
import { v4 as uuidv4 } from 'uuid'

const cardImages = [
  { "src": "/assets/helmet.png" },
  { "src": "/assets/diamond-ring.png" },
  { "src": "/assets/potion.png" },
  { "src": "/assets/scroll.png" },
  { "src": "/assets/shield.png" },
  { "src": "/assets/sword.png" },
]

export default function App() {

  // state setters
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // useEffect
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("Match!")
      } else {
        console.log("No Match!")
      }
      setChoiceOne("")
      setChoiceTwo("")
      console.log("Board reset")
    }
  }, [choiceTwo])

  // double and shuffle cards
  const cardHandler = () => {

    // doouble cards, map over and give random id
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuidv4() }))

    // put cards into state
    setCards(shuffledCards);  

  }

  // handle choices
  const handleChoice = (card) => {
    
    // update choices
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

    // increment turns
    setTurns(turns + 1)
  }

  return (
    <div className="App">
      
      <h1>Magic Match</h1>
      <button onClick={cardHandler}>
        New Game
      </button>
      <p className="turns">Turns: {turns}</p>

      {/* generate grid */}
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>

    </div>
  )
}
