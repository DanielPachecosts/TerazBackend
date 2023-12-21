import { ProjectRepoInt } from "../domain/project-repo";

export class Remove {
  constructor(private projectRepo: ProjectRepoInt) {}

  async run(id: string) {
    return await this.projectRepo.removeProject(id);
  }
}
