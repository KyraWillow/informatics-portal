import { prisma } from "../config/db.config.js";
import { AppError } from "../middlewares/error.middleware.js";
import type { Blog, BlogCreate, BlogUpdate } from "../models/blog.model.js";

export async function getAllBlogs(): Promise<Blog[]> {
  const data = await prisma.blog.findMany();
  return data;
}

export async function createBlog(data: BlogCreate): Promise<Blog> {
  const checkData = await prisma.blog.findFirst({
    where: { title: data.title },
  });

  if (checkData) {
    throw new AppError("Blog with this title already exists", 409);
  }

  const newData = await prisma.blog.create({
    data: {
      title: data.title,
      content: data.content,
      image: data.image,
    },
  });
  return newData;
}

export async function updateBlog(id: string, data: BlogUpdate): Promise<Blog> {
  const checkData = await prisma.blog.findFirst({
    where: { id: id },
  });

  if (!checkData) {
    throw new AppError("Blog not found", 404);
  }

  const updateData = await prisma.blog.update({
    where: { id },
    data: data,
  });
  return updateData;
}

export async function deleteBlog(id: string): Promise<void> {
  const checkData = await prisma.blog.findFirst({
    where: { id: id },
  });

  if (!checkData) {
    throw new AppError("Blog not found", 404);
  }

  await prisma.blog.delete({
    where: { id },
  });
}
