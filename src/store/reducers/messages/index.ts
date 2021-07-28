import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/messages';

// Models
import {Message} from '../../types/Message.model';

export type MessagesState = {
  messages: Message[];
  areMessagesLoading: boolean;
  areMoreMessages: boolean;

  messageDetails?: Message;
  isMessageLoading: boolean;

  newMessages: Message[];
};

const initialState: MessagesState = {
  messages: [],
  areMessagesLoading: true,
  areMoreMessages: true,
  messageDetails: undefined,
  isMessageLoading: true,
  newMessages: [],
};

export type MessagesActions = ActionType<typeof actions>;

const messagesReducer = createReducer<MessagesState, MessagesActions>(
  initialState,
)
  .handleAction(actions.getMessages.request, state => ({
    ...state,
    areMessagesLoading: true,
  }))
  .handleAction(actions.getMessages.success, (state, action) => ({
    ...state,
    areMessagesLoading: false,
    messages: action.payload.withReset
      ? action.payload.messages
      : [...state.messages, ...action.payload.messages],
    areMoreMessages: action.payload.areMoreData,
  }))
  .handleAction(actions.getMessageDetails.request, state => ({
    ...state,
    isMessageLoading: true,
  }))
  .handleAction(actions.getMessageDetails.success, (state, action) => ({
    ...state,
    isMessageLoading: false,
    messageDetails: action.payload,
  }))
  .handleAction(actions.getNewMessages.success, (state, action) => ({
    ...state,
    newMessages: action.payload,
  }));

export default messagesReducer;
