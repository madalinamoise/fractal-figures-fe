import {IGitRepositoryContributor} from './IGitRepositoryContributor';

export default interface IGitRepositoryData {
  contributors: Array<IGitRepositoryContributor>;
  name: string;
  noOfLines: number;
  repoUrl: string;
}
