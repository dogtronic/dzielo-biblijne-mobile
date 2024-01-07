import {createAsyncAction} from 'typesafe-actions';

// Models
import {Place, Region} from '../../types/Region.model';
import {GetPlacesFromRegionRequestPayload} from './payloads';

export const getRegions = createAsyncAction(
  'GET_REGIONS',
  'GET_REGIONS_SUCCESS',
  'GET_REGIONS_FAILURE',
)<undefined, Region[], undefined>();

export const getPlacesFromRegion = createAsyncAction(
  'GET_PLACES_FROM_REGION',
  'GET_PLACES_FROM_REGION_SUCCESS',
  'GET_PLACES_FROM_REGION_FAILURE',
)<GetPlacesFromRegionRequestPayload, Place[], undefined>();
