import { ProjectRepoInt } from "../domain/project-repo";

export class GetAll {
  constructor(private projectRepo: ProjectRepoInt) {}

  async run() {
    return await this.projectRepo.getAllProjects();
  }
}
