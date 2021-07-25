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
  areHomiliesLoading: boolean;
  areMoreHomilies: boolean;
  homilies: Reading[];
  areNationalReadingsLoading: boolean;
  areMoreNationalReadings: boolean;
  nationalReadings: Reading[];
};

const initialState: ReadingsState = {
  readings: [],
  areReadingsLoading: true,
  readingDetails: undefined,
  isReadingLoading: true,
  sections: [],
  areHomiliesLoading: true,
  areMoreHomilies: true,
  homilies: [],
  areNationalReadingsLoading: true,
  areMoreNationalReadings: true,
  nationalReadings: [],
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
  }))
  .handleAction(actions.getHomilies.request, state => ({
    ...state,
    areHomiliesLoading: true,
  }))
  .handleAction(actions.getHomilies.success, (state, action) => ({
    ...state,
    areHomiliesLoading: false,
    homilies: action.payload.withReset
      ? action.payload.homilies
      : [...state.homilies, ...action.payload.homilies],
    areMoreHomilies: action.payload.areMoreData,
  }))
  .handleAction(actions.getNationalReadings.request, state => ({
    ...state,
    areNationalReadingsLoading: true,
  }))
  .handleAction(actions.getNationalReadings.success, (state, action) => ({
    ...state,
    areNationalReadingsLoading: false,
    nationalReadings: action.payload.withReset
      ? action.payload.nationalReadings
      : [...state.nationalReadings, ...action.payload.nationalReadings],
    areMoreNationalReadings: action.payload.areMoreData,
  }));

export default readingsReducer;
