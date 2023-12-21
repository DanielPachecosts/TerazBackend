import { ProjectRepoInt } from "../domain/project-repo";

export class UpdateImage {
  constructor(private projectRepo: ProjectRepoInt) {}

  async run(id: string, update: string | string[], position?: any) {
    return await this.projectRepo.updateImages(id, update, position);
  }
}
