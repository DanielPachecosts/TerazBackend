import { UpdateProjectDto } from "../domain/project-dto";
import { ProjectRepoInt } from "../domain/project-repo";

export class Update {
  constructor(private projectRepo: ProjectRepoInt) {}

  async run(id: string, updates: UpdateProjectDto) {
    return await this.projectRepo.updateProject(id, updates);
  }
}
