import type { Request, Response, NextFunction } from "express";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../services/blog.service.js";

export async function index(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await getAllBlogs();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function store(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, content, image } = req.body;
    const result = await createBlog({ title, content, image });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function update(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;
    const result = await updateBlog(id, { title, content, image });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function destroy(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    await deleteBlog(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
