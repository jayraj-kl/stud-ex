import { prisma } from "@/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        name: true,
        emailVerified: true,
        image: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const verifyCredentials = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  } catch {
    return null;
  }
};
