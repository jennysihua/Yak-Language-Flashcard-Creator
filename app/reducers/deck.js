import axios from 'axios'

const initialState = []

const GET_ALL_DECKS = 'GET_DECKS'
const ADD_NEW_DECK = 'ADD_NEW_DECK'
const EDIT_DECK = 'EDIT_DECK'

const gotAllDecks = decks => ({
  type: GET_ALL_DECKS,
  decks
})

const addedNewDeck = deck => ({
  type: ADD_NEW_DECK,
  deck
})

const editedDeck = deck => ({
  type: EDIT_DECK,
  deck
})

export const getAllDecks = () => async dispatch => {
  const { data } = await axios.get(`/api/decks`)
  dispatch(gotAllDecks(data))
}

export const addNewDeck = deck => async dispatch => {
  const { data } = await axios.post(`/api/decks`, deck)
  dispatch(addedNewDeck(data))
}

export const editDeck = deck => async dispatch => {
  const { data } = await axios.put(`/api/decks/${deck.id}`, deck)
  dispatch(editedDeck(data))
}

export const addCardToDeck = (deckId, cardId) => async dispatch => {
  const { data } = await axios.post(`/api/decks/${deckId}/${cardId}`)
  dispatch(editedDeck(data))
}

export const removeCardFromDeck = (deckId, cardId) => async dispatch => {
  const { data } = await axios.delete(`/api/decks/${deckId}/${cardId}`)
  dispatch(editedDeck(data))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DECKS: {
      return action.decks
    }
    case ADD_NEW_DECK: {
      return [...state, ...action.deck]
    }
    case EDIT_DECK: {
      return state.map(deck => {
        if (deck.id === action.deck.id) return action.deck
        return deck
      })
    }
    default: {
      return state
    }
  }
}
