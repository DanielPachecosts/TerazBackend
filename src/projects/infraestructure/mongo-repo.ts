import { Project } from "../domain/Project";
import {
  ProjectDto,
  SavedProjectDto,
  UpdateProjectDto,
} from "../domain/project-dto";
import { ProjectRepoInt } from "../domain/project-repo";
import projectModel from "./mongo-schema";

export class ProjectsMongoRepository implements ProjectRepoInt {
  async createProject(projectFromReq: ProjectDto): Promise<SavedProjectDto> {
    const { brand, description, video, images } = projectFromReq;

    const newProject = new projectModel(
      new Project(brand, description, video, images)
    );

    const projectSaved = await newProject.save();
    return projectSaved;
  }

  async getAllProjects(): Promise<SavedProjectDto[] | []> {
    const projects = await projectModel.find();
    return projects;
  }

  async getProject(id: string): Promise<SavedProjectDto> {
    const project = await projectModel.findOne({ _id: id });

    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }

  async updateProject(
    id: string,
    updates: UpdateProjectDto
  ): Promise<SavedProjectDto> {
    const projectUpdated = await projectModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!projectUpdated) {
      throw new Error("Project not found");
    }
    return projectUpdated;
  }

  async removeProject(id: string): Promise<boolean> {
    const project = await projectModel.findOneAndDelete({ _id: id });
    if (!project) {
      throw new Error("Project not found");
    }
    return true;
  }

  async updateImages(
    id: string,
    updates: string | string[],
    position?: any
  ): Promise<SavedProjectDto> {
    const updateQuery: any = {};

    if (position !== undefined && position >= 4) {
      throw new Error("image not found");
    }

    updateQuery.$set = position
      ? { [`images.${position}`]: updates }
      : { images: updates };

    const projectUpdated = await projectModel.findByIdAndUpdate(
      id,
      updateQuery,
      {
        new: true,
      }
    );

    if (!projectUpdated) {
      throw new Error("Project not found");
    }
    return projectUpdated;
  }
}
