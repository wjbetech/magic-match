import React from 'react'
import { useState, useEffect } from "react"
import Card from "./components/Card"
import { v4 as uuidv4 } from 'uuid'

const cardImages = [
  { "src": "/assets/helmet.png", matched: false },
  { "src": "/assets/diamond-ring.png", matched: false },
  { "src": "/assets/potion.png", matched: false },
  { "src": "/assets/scroll.png", matched: false },
  { "src": "/assets/shield.png", matched: false },
  { "src": "/assets/sword.png", matched: false },
]

export default function App() {
  // state setters
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [flipState, setFlipState] = useState(false);
  const [clickable, setClickable] = useState(true)

  // useEffect
  useEffect(() => {
    if (choiceOne && choiceTwo) {

      if (choiceOne || choiceTwo) {
        setFlipState(true)
      }

      // map out matched cards
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
      } else {
        console.log("No Match! Try again")
        setChoiceOne("")
        setChoiceTwo("")
      }
    }
  }, [choiceOne, choiceTwo])

  // double and shuffle cards
  const cardHandler = () => {
    // doouble cards, map over and give random id
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuidv4() }))
    // put cards into state
    setCards(shuffledCards);  
    setTurns(0)
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
          <Card 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            clickable={clickable}
          />
        ))}
      </div>

    </div>
  )
}
