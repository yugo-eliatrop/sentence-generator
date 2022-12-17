import { ApplicationService, SentenceGeneratorService } from '../application';
import { dataReader } from './DataReader';

const sentenceGeneratorService = new SentenceGeneratorService();

export const app = new ApplicationService(dataReader, sentenceGeneratorService);
