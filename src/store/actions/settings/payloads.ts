import {SectionImages} from '../../types/SectionImages.model';

export interface GetAppSettingsResponsePayload {
  sectionImages: SectionImages;
}

export interface SendMessageToAdministratorRequestPayload {
  name: string;
  content: string;
}
