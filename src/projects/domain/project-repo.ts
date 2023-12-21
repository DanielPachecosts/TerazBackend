import { ProjectDto, SavedProjectDto, UpdateProjectDto } from "./project-dto";

export interface ProjectRepoInt {
  createProject(project: ProjectDto): Promise<SavedProjectDto>;
  getAllProjects(): Promise<SavedProjectDto[] | []>;
  getProject(id: string): Promise<SavedProjectDto>;
  updateProject(
    id: string,
    updates: UpdateProjectDto
  ): Promise<SavedProjectDto>;
  removeProject(id: string): Promise<boolean>;
  updateImages(
    id: string,
    update: string | string[],
    position?: any
  ): Promise<SavedProjectDto>;
}
