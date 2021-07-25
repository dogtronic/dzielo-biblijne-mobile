import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/settings';
import {Information} from '../../types/Information.model';

// Models
import {SectionImages} from '../../types/SectionImages.model';

export type SettingsState = {
  isSettingsLoading: boolean;
  sectionImages?: SectionImages;
  contactDetails?: Information;
  isContactDetialsLoading: boolean;
  recommendedDetails?: Information;
  isRecommendedDetailsLoading: boolean;
};

const initialState: SettingsState = {
  isSettingsLoading: true,
  sectionImages: undefined,
  isContactDetialsLoading: true,
  isRecommendedDetailsLoading: true,
};

export type SettingsActions = ActionType<typeof actions>;

const settingsReducer = createReducer<SettingsState, SettingsActions>(
  initialState,
)
  .handleAction(actions.getAppSettings.success, (state, action) => ({
    ...state,
    isSettingsLoading: false,
    sectionImages: action.payload.sectionImages,
  }))
  .handleAction(actions.getContact.request, state => ({
    ...state,
    isContactDetialsLoading: true,
  }))
  .handleAction(actions.getContact.success, (state, action) => ({
    ...state,
    isContactDetialsLoading: false,
    contactDetails: action.payload,
  }))
  .handleAction(actions.getRecommended.request, state => ({
    ...state,
    isRecommendedDetailsLoading: true,
  }))
  .handleAction(actions.getRecommended.success, (state, action) => ({
    ...state,
    isRecommendedDetailsLoading: false,
    recommendedDetails: action.payload,
  }));

export default settingsReducer;
