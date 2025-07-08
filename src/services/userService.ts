import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

// Basic email validation regex (simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Define types for input data to ensure type safety
// Note: Prisma generates types that can often be used directly or adapted.
// For instance, Prisma.UserCreateInput could be used.
// However, custom types allow for more specific validation points if needed.
export type UserCreateData = {
  email: string;
  name: string;
  company?: string | null;
  role?: string | null;
};

export type UserUpdateData = Partial<UserCreateData>;

export const userService = {
  async createUser(data: UserCreateData): Promise<User> {
    if (!data.email || !data.name) {
      throw new Error('Email and name are required for creating a user.');
    }
    if (!EMAIL_REGEX.test(data.email)) {
      throw new Error('Invalid email format.');
    }
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }
    return prisma.user.create({ data });
  },

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany({
      include: { deals: true, guides: true }, // Optionally include related data
    });
  },

  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: { deals: true, guides: true }, // Optionally include related data
    });
  },

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
      include: { deals: true, guides: true }, // Optionally include related data
    });
  },

  async updateUser(id: string, data: UserUpdateData): Promise<User | null> {
    if (data.email === '') {
      throw new Error('Email cannot be empty.');
    }
    if (data.email && !EMAIL_REGEX.test(data.email)) {
      throw new Error('Invalid email format.');
    }
    if (data.name === '') {
      throw new Error('Name cannot be empty.');
    }
    // If email is being changed, check if the new email already exists for another user
    if (data.email) {
      const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
      if (existingUser && existingUser.id !== id) {
        throw new Error('Another user with this email already exists.');
      }
    }
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  async deleteUser(id: string): Promise<User | null> {
    // Consider implications of deleting a user with related deals/guides.
    // Prisma by default might prevent deletion if there are related records
    // depending on relation settings (e.g. onDelete: Cascade | Restrict).
    // The current schema does not specify onDelete behavior, so it defaults to Restrict.
    // This means deletion will fail if user has related deals or guides.
    // For a true "soft delete", you'd add an `isDeleted` flag to the model.

    // Example of how to handle cascading deletes if not set in schema (not recommended, better in schema)
    // return prisma.$transaction(async (tx) => {
    //   await tx.guide.deleteMany({ where: { userId: id } });
    //   await tx.deal.deleteMany({ where: { userId: id } });
    //   return tx.user.delete({ where: { id } });
    // });
    return prisma.user.delete({
      where: { id },
    });
  },
};
