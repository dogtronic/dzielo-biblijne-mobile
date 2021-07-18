import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/settings';

// Models
import {SectionImages} from '../../types/SectionImages.model';

export type SettingsState = {
  isSettingsLoading: boolean;
  sectionImages?: SectionImages;
};

const initialState: SettingsState = {
  isSettingsLoading: true,
  sectionImages: undefined,
};

export type SettingsActions = ActionType<typeof actions>;

const settingsReducer = createReducer<SettingsState, SettingsActions>(
  initialState,
).handleAction(actions.getAppSettings.success, (state, action) => ({
  ...state,
  isSettingsLoading: false,
  sectionImages: action.payload.sectionImages,
}));

export default settingsReducer;
