import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/settings';
import {Photo} from '../../types/Curiosity.model';
import {Information} from '../../types/Information.model';

// Models
import {SectionImages} from '../../types/SectionImages.model';

export type SettingsState = {
  isSettingsLoading: boolean;
  settingsError: boolean;
  sectionImages?: SectionImages;
  contactDetails?: Information;
  isContactDetialsLoading: boolean;
  contactError: boolean;
  recommendedDetails?: Information;
  isRecommendedDetailsLoading: boolean;
  recommendedError: boolean;
  isMessageToAdministratorSending: boolean;
  messageSentInfo?: string;
  photoOfTheWeek?: Photo;
};

const initialState: SettingsState = {
  isSettingsLoading: true,
  settingsError: false,
  sectionImages: undefined,
  isContactDetialsLoading: true,
  isRecommendedDetailsLoading: true,
  isMessageToAdministratorSending: false,
  contactError: false,
  recommendedError: false,
};

export type SettingsActions = ActionType<typeof actions>;

const settingsReducer = createReducer<SettingsState, SettingsActions>(
  initialState,
)
  .handleAction(actions.getAppSettings.request, state => ({
    ...state,
    isSettingsLoading: true,
    settingsError: false,
  }))
  .handleAction(actions.getAppSettings.success, (state, action) => ({
    ...state,
    isSettingsLoading: false,
    sectionImages: action.payload.sectionImages,
  }))
  .handleAction(actions.getAppSettings.failure, state => ({
    ...state,
    isSettingsLoading: false,
    settingsError: true,
  }))
  .handleAction(actions.getContact.request, state => ({
    ...state,
    isContactDetialsLoading: true,
    contactError: false,
  }))
  .handleAction(actions.getContact.success, (state, action) => ({
    ...state,
    isContactDetialsLoading: false,
    contactDetails: action.payload,
  }))
  .handleAction(actions.getContact.failure, state => ({
    ...state,
    isContactDetialsLoading: false,
    contactError: true,
  }))
  .handleAction(actions.getRecommended.request, state => ({
    ...state,
    isRecommendedDetailsLoading: true,
    recommendedError: false,
  }))
  .handleAction(actions.getRecommended.success, (state, action) => ({
    ...state,
    isRecommendedDetailsLoading: false,
    recommendedDetails: action.payload,
  }))
  .handleAction(actions.getRecommended.failure, state => ({
    ...state,
    isRecommendedDetailsLoading: false,
    recommendedError: true,
  }))
  .handleAction(actions.sendMessageToAdministrator.request, state => ({
    ...state,
    isMessageToAdministratorSending: true,
  }))
  .handleAction(
    actions.sendMessageToAdministrator.success,
    (state, action) => ({
      ...state,
      isMessageToAdministratorSending: false,
      messageSentInfo: action.payload,
    }),
  )
  .handleAction(actions.getPhotoOfTheWeek.success, (state, action) => ({
    ...state,
    photoOfTheWeek: action.payload,
  }))
  .handleAction(actions.clearMessageToAdministratorResponse, state => ({
    ...state,
    messageSentInfo: undefined,
  }));

export default settingsReducer;
