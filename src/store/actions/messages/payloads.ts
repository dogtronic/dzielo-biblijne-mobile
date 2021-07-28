import {Message} from '../../types/Message.model';

export interface GetMessagesRequestPayload {
  limit: number;
  offset: number;
  filter?: string;
  withReset?: boolean;
}

export interface GetMessagesSuccessPayload {
  messages: Message[];
  areMoreData: boolean;
  withReset?: boolean;
}

export interface GetMessageDetailsRequestPayload {
  messageId: number;
}
