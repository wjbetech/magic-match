import React from 'react'

const Card = ({ card, handleChoice, flipped }) => {

  const handleClick = () => {
    handleChoice(card)
  }

  return (
    <div className="card">
        {flipped
        ? <div className="card-front">
            <img 
                src={card.src} 
                alt="image card" 
            />
        </div>
        : <div 
            className="card-back" 
            onClick={handleClick}>
        </div>
        }
    </div>
  )
}

export default Card
