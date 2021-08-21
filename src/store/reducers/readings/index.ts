import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/readings';
import {Curiosity, Photo} from '../../types/Curiosity.model';

// Models
import {Reading, SectionType} from '../../types/Reading.model';

export type ReadingsState = {
  readings: Reading[];
  areReadingsLoading: boolean;
  readingsError: boolean;
  readingDetails?: Reading;
  isReadingLoading: boolean;
  readingDetailsError: boolean;
  sections: SectionType[];
  areHomiliesLoading: boolean;
  areMoreHomilies: boolean;
  homiliesError: boolean;
  homilies: Reading[];
  areNationalReadingsLoading: boolean;
  areMoreNationalReadings: boolean;
  nationalReadingsError: boolean;
  nationalReadings: Reading[];

  curiosities: Curiosity[];
  areCuriositiesLoading: boolean;
  areMoreCuriosities: boolean;
  curiositiesError: boolean;
  photos: Photo[];
  arePhotosLoading: boolean;
  areMorePhotos: boolean;
  photosError: boolean;
};

const initialState: ReadingsState = {
  readings: [],
  areReadingsLoading: true,
  readingsError: false,
  readingDetails: undefined,
  readingDetailsError: false,
  isReadingLoading: true,
  sections: [],
  areHomiliesLoading: true,
  areMoreHomilies: true,
  homiliesError: false,
  homilies: [],
  areNationalReadingsLoading: true,
  areMoreNationalReadings: true,
  nationalReadingsError: false,
  nationalReadings: [],
  areCuriositiesLoading: false,
  areMoreCuriosities: false,
  curiosities: [],
  curiositiesError: false,
  arePhotosLoading: false,
  areMorePhotos: false,
  photos: [],
  photosError: false,
};

export type ReadingsActions = ActionType<typeof actions>;

const readingsReducer = createReducer<ReadingsState, ReadingsActions>(
  initialState,
)
  .handleAction(actions.getCurrentReadings.request, state => ({
    ...state,
    areReadingsLoading: true,
    readingsError: false,
  }))
  .handleAction(actions.getCurrentReadings.success, (state, action) => ({
    ...state,
    areReadingsLoading: false,
    readings: action.payload.readings.sort((v, w) =>
      v.reading_type.priority > w.reading_type.priority ? 1 : -1,
    ),
    sections: action.payload.sections,
  }))
  .handleAction(actions.getCurrentReadings.failure, state => ({
    ...state,
    areReadingsLoading: false,
    readingsError: true,
  }))
  .handleAction(actions.getReadingDetails.request, state => ({
    ...state,
    isReadingLoading: true,
    readingDetailsError: false,
  }))
  .handleAction(actions.getReadingDetails.success, (state, action) => ({
    ...state,
    isReadingLoading: false,
    readingDetails: action.payload,
  }))
  .handleAction(actions.getReadingDetails.failure, state => ({
    ...state,
    isReadingLoading: false,
    readingDetailsError: true,
  }))
  .handleAction(actions.getHomilies.request, state => ({
    ...state,
    areHomiliesLoading: true,
    homiliesError: false,
  }))
  .handleAction(actions.getHomilies.success, (state, action) => ({
    ...state,
    areHomiliesLoading: false,
    homilies: action.payload.withReset
      ? action.payload.homilies
      : [...state.homilies, ...action.payload.homilies],
    areMoreHomilies: action.payload.areMoreData,
  }))
  .handleAction(actions.getHomilies.failure, state => ({
    ...state,
    areHomiliesLoading: false,
    homiliesError: true,
  }))
  .handleAction(actions.getNationalReadings.request, state => ({
    ...state,
    areNationalReadingsLoading: true,
    nationalReadingsError: false,
  }))
  .handleAction(actions.getNationalReadings.success, (state, action) => ({
    ...state,
    areNationalReadingsLoading: false,
    nationalReadings: action.payload.withReset
      ? action.payload.nationalReadings
      : [...state.nationalReadings, ...action.payload.nationalReadings],
    areMoreNationalReadings: action.payload.areMoreData,
  }))
  .handleAction(actions.getNationalReadings.failure, state => ({
    ...state,
    areNationalReadingsLoading: false,
    nationalReadingsError: true,
  }))
  .handleAction(actions.getCuriosities.request, state => ({
    ...state,
    areCuriositiesLoading: true,
    curiositiesError: false,
  }))
  .handleAction(actions.getCuriosities.success, (state, action) => ({
    ...state,
    areCuriositiesLoading: false,
    curiosities: action.payload.withReset
      ? action.payload.curiosities
      : [...state.curiosities, ...action.payload.curiosities],
    areMoreCuriosities: action.payload.areMoreData,
  }))
  .handleAction(actions.getCuriosities.failure, state => ({
    ...state,
    areCuriositiesLoading: false,
    curiositiesError: true,
  }))
  .handleAction(actions.getPhotos.request, state => ({
    ...state,
    arePhotosLoading: true,
    photosError: false,
  }))
  .handleAction(actions.getPhotos.success, (state, action) => ({
    ...state,
    arePhotosLoading: false,
    photos: action.payload.withReset
      ? action.payload.photos
      : [...state.photos, ...action.payload.photos],
    areMorePhotos: action.payload.areMoreData,
  }))
  .handleAction(actions.getPhotos.failure, state => ({
    ...state,
    arePhotosLoading: false,
    photosError: true,
  }));

export default readingsReducer;
