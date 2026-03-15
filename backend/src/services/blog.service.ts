import { prisma } from "../config/db.config.js";
import { AppError } from "../middlewares/error.middleware.js";
import type { Blog, BlogCreate, BlogUpdate } from "../models/blog.model.js";

export async function getAllBlogs(): Promise<Blog[]> {
  const data = await prisma.blog.findMany();

  if (!data) {
    throw new AppError("Blogs tidak tersedia", 404);
  }

  return data;
}

export async function createBlog(data: BlogCreate): Promise<Blog> {
  const newData = await prisma.blog.create({
    data: {
      title: data.title,
      content: data.content,
      image: data.image,
    },
  });

  if (!newData) {
    throw new AppError("Gagal membuat blog", 500);
  }

  return newData;
}

export async function updateBlog(id: string, data: BlogUpdate): Promise<Blog> {
  const updateData = await prisma.blog.update({
    where: { id },
    data: data,
  });

  if (!updateData) {
    throw new AppError("Gagal memperbarui blog", 500);
  }

  return updateData;
}

export async function deleteBlog(id: string): Promise<void> {
  const deleteBlog = await prisma.blog.delete({
    where: { id },
  });

  if (!deleteBlog) {
    throw new AppError("Gagal menghapus blog", 500);
  }
}
