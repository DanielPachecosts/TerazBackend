import { ProjectRepoInt } from "../domain/project-repo";

export class Get {
  constructor(private projectRepo: ProjectRepoInt) {}

  async run(id: string) {
    return await this.projectRepo.getProject(id);
  }
}
