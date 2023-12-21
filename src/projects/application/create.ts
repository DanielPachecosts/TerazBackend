import { ProjectDto } from "../domain/project-dto";
import { ProjectRepoInt } from "../domain/project-repo";

export class Create {
  constructor(private projectRepo: ProjectRepoInt) {}

  async run(project: ProjectDto) {
    return await this.projectRepo.createProject(project);
  }
}
