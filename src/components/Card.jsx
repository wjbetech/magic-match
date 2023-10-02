import React from 'react'

const Card = ({ card, handleChoice }) => {

  const handleClick = () => {
    handleChoice(card)
  }

  return (
    <div className="card">

        {/* back of card - pattern bg */}
        <div 
            className="card-back" 
            onClick={handleClick}>
        </div>

        {/* front of card - icon  */}
        <div className="card-front">
            <img 
                src={card.src} 
                alt="image card" 
            />
        </div>

    </div>
  )
}

export default Card
