import { TacOpsCardData } from "../types/card";

export function toggleCardSelection(
  card: TacOpsCardData,
  selectedCards: TacOpsCardData[],
  setSelectedCards: (cardList: TacOpsCardData[]) => void
)
  {
    const index = selectedCards.findIndex(c => c.title === card.title);
    if (index > -1){
      const updatedCards = [...selectedCards]
      updatedCards.splice(index, 1)
      setSelectedCards(updatedCards)
    } else {
      setSelectedCards([...selectedCards, card])
    }
}
