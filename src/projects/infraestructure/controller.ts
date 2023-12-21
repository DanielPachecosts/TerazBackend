import { Request, Response } from "express";
import { existsSync } from "node:fs";
import { unlinkSync } from "fs";
import { Create } from "../application/create";
import { GetAll } from "../application/get-all";
import { Get } from "../application/get";
import { Update } from "../application/update";
import { Remove } from "../application/remove";
import { UpdateImage } from "../application/update-image";
import config from "../../config";

interface FileObject {
  [fieldname: string]: Express.Multer.File[];
}

export class ProjectController {
  constructor(
    private create: Create,
    private getAll: GetAll,
    private get: Get,
    private update: Update,
    private remove: Remove,
    private updateImage: UpdateImage
  ) {}

  async createProject(req: Request, res: Response) {
    try {
      let body = req.body;
      const files = req.files as FileObject;
      const basePath = `${config.HOST}${config.staticsDir}`;

      const video = files["video"]?.map((video) => basePath + video.filename);
      const videoUrl = video?.length ? video[0] : undefined;

      const imageUrls = files["images"]?.map(
        (image) => basePath + image.filename
      );

      const newProject = {
        ...body,
        video: videoUrl,
        images: imageUrls,
      };

      const project = await this.create.run(newProject);

      res.status(200).send(project);
    } catch (error: any) {
      this.removeFilesInError(req);
      res.status(500).send({ message: error.message });
    }
  }

  async getAllProjects(req: Request, res: Response) {
    try {
      const projects = await this.getAll.run();
      res.status(200).send(projects);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async getProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await this.get.run(id);
      res.status(200).send(project);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const projectUpdated = await this.update.run(id, updates);
      res.status(200).send(projectUpdated);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async removeProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const videoPath = await this.getVideoFilePath(id);
      const imagesPaths = await this.getImageFilePath(id, undefined);

      const isDeleted = await this.remove.run(id);

      if (isDeleted) {
        if (videoPath) {
          this.removeFileFromServer(videoPath);
        }

        if (imagesPaths) {
          this.removeFileFromServer(imagesPaths);
        }
      }
      res.status(200).send(isDeleted);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async updateProjectVideo(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const files = req.files as FileObject;
      if (!files || !files["video"] || files["video"].length === 0) {
        throw new Error("No video provided");
      }

      const filename = files["video"][0].filename;

      const basePath = `${config.HOST}${config.staticsDir}`;
      const videoUrl = basePath + filename;
      const update = { video: videoUrl };

      const existingVideoPath = await this.getVideoFilePath(id);
      const projectUpdated = await this.update.run(id, update);

      if (projectUpdated && existingVideoPath) {
        this.removeFileFromServer(existingVideoPath);
      }

      res.status(200).send(projectUpdated);
    } catch (error: any) {
      this.removeFilesInError(req);

      res.status(500).send({ message: error.message });
    }
  }

  async updateProjectImages(req: Request, res: Response) {
    try {
      const files = req.files as FileObject;
      const images = files["images"];

      if (!images || images.length === 0) {
        throw new Error("No images provided");
      }

      const { id } = req.params;
      const { position } = req.query;

      const basePath = `${config.HOST}${config.staticsDir}`;

      const imagesUrl =
        images.length === 1
          ? basePath + images[0].filename
          : images.map((image) => basePath + image.filename);

      const existingImagePaths = await this.getImageFilePath(id, position);

      const projectUpdated = await this.updateImage.run(
        id,
        imagesUrl,
        position
      );

      if (projectUpdated && existingImagePaths) {
        this.removeFileFromServer(existingImagePaths);
      }
      res.status(200).send(projectUpdated);
    } catch (error: any) {
      this.removeFilesInError(req);
      res.status(500).send({ message: error.message });
    }
  }

  async getVideoFilePath(id: string) {
    const project = await this.get.run(id);
    if (project["video"]) {
      const path = project["video"].split("/").pop();
      return config.uploadsDir! + path;
    }
    return null;
  }

  async getImageFilePath(id: string, position: any) {
    const project = await this.get.run(id);
    const images = project["images"];

    if (
      !images ||
      (position !== undefined &&
        (images[position] === undefined || images[position] === null))
    ) {
      return null;
    }

    if (position && images[position] && images[position] !== null) {
      const path = images[position].split("/").pop();
      return config.uploadsDir! + path;
    }

    const path = project["images"].map(
      (image) => config.uploadsDir! + image?.split("/").pop()
    );

    return path;
  }

  removeFileFromServer(filepath: string | string[]) {
    if (typeof filepath === "string") {
      if (existsSync(filepath)) {
        unlinkSync(filepath);
      }
    } else {
      filepath.forEach((file) => {
        if (existsSync(file)) {
          unlinkSync(file);
        }
      });
    }
  }

  removeFilesInError(req: Request) {
    const files = req.files as FileObject;
    const videoPath = "video" in files ? files.video[0].path : "";
    const imagesPaths =
      "images" in files ? files.images.map((image) => image.path) : "";

    this.removeFileFromServer(videoPath);
    this.removeFileFromServer(imagesPaths);
  }
}
