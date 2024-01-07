import {createReducer, ActionType} from 'typesafe-actions';
import {countries} from '../../../assets/translations/countries';
import * as actions from '../../actions/map';

// Models
import {Country, Place, Region} from '../../types/Region.model';

export type MapState = {
  regions: Region[];
  areRegionsLoading: boolean;
  regionsError: boolean;
  places: Place[];
  arePlacesLoading: boolean;
  placesError: boolean;
  countries: Country[];
};

const initialState: MapState = {
  regions: [],
  areRegionsLoading: true,
  regionsError: false,
  places: [],
  arePlacesLoading: false,
  placesError: false,
  countries: [],
};

export type MapActions = ActionType<typeof actions>;

const mapReducer = createReducer<MapState, MapActions>(initialState)
  .handleAction(actions.getRegions.request, state => ({
    ...state,
    areRegionsLoading: true,
    regionsError: false,
  }))
  .handleAction(actions.getRegions.success, (state, action) => {
    const countriesMap = new Map<string, string>();

    action.payload.forEach(region => {
      countriesMap.set(region.country, region.country);
    });

    return {
      ...state,
      areRegionsLoading: false,
      regions: action.payload.map(v => {
        const position = JSON.parse(v.position);
        return {...v, lng: position.lng, lat: position.lat};
      }),
      countries: Array.from(countriesMap.keys()).map(
        w => countries.find(z => z.alpha2 === w)!,
      ),
    };
  })
  .handleAction(actions.getRegions.failure, state => ({
    ...state,
    areRegionsLoading: false,
    regionsError: true,
  }))
  .handleAction(actions.getPlacesFromRegion.request, state => ({
    ...state,
    arePlacesLoading: true,
    placesError: false,
  }))
  .handleAction(actions.getPlacesFromRegion.success, (state, action) => ({
    ...state,
    arePlacesLoading: false,
    places: action.payload.map(v => {
      const position = JSON.parse(v.position);
      return {...v, lng: position.lng, lat: position.lat};
    }),
  }))
  .handleAction(actions.getPlacesFromRegion.failure, state => ({
    ...state,
    arePlacesLoading: false,
    placesError: true,
  }));

export default mapReducer;
