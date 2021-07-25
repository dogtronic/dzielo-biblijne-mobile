import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/readings';

// Models
import {Reading, SectionType} from '../../types/Reading.model';

export type ReadingsState = {
  readings: Reading[];
  areReadingsLoading: boolean;
  readingDetails?: Reading;
  isReadingLoading: boolean;
  sections: SectionType[];
};

const initialState: ReadingsState = {
  readings: [],
  areReadingsLoading: true,
  readingDetails: undefined,
  isReadingLoading: true,
  sections: [],
};

export type ReadingsActions = ActionType<typeof actions>;

const readingsReducer = createReducer<ReadingsState, ReadingsActions>(
  initialState,
)
  .handleAction(actions.getCurrentReadings.request, state => ({
    ...state,
    areReadingsLoading: true,
  }))
  .handleAction(actions.getCurrentReadings.success, (state, action) => ({
    ...state,
    areReadingsLoading: false,
    readings: action.payload.readings,
    sections: action.payload.sections,
  }))
  .handleAction(actions.getReadingDetails.request, state => ({
    ...state,
    isReadingLoading: true,
  }))
  .handleAction(actions.getReadingDetails.success, (state, action) => ({
    ...state,
    isReadingLoading: false,
    readingDetails: action.payload,
  }));

export default readingsReducer;
