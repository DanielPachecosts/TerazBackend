export interface ProjectDto {
  brand: string;
  description: string;
  video: string;
  images: string[];
}

export interface SavedProjectDto extends ProjectDto {
  _id: string;
}

export interface UpdateProjectDto extends Partial<ProjectDto> {}
