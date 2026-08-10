import { prisma } from "@/lib/prisma";
import type { CreateUserInput, UpdateUserInput } from "@/server/validations/user.schema";

export const userService = {
  list() {
    return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  },

  getById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  create(data: CreateUserInput) {
    return prisma.user.create({ data });
  },

  update(id: string, data: UpdateUserInput) {
    return prisma.user.update({ where: { id }, data });
  },

  remove(id: string) {
    return prisma.user.delete({ where: { id } });
  },
};
