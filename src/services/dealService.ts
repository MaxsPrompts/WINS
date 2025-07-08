import { PrismaClient, Deal, DealStage } from '@prisma/client';

const prisma = new PrismaClient();

// Define types for input data
type DealCreateData = {
  userId: string;
  contactName: string;
  company: string;
  stage: DealStage;
  context?: string | null;
};

type DealUpdateData = Partial<Omit<DealCreateData, 'userId'>>; // userId typically shouldn't be updated

export const dealService = {
  async createDeal(data: DealCreateData): Promise<Deal> {
    if (!data.userId || !data.contactName || !data.company || !data.stage) {
      throw new Error('User ID, contact name, company, and stage are required for creating a deal.');
    }
    // Ensure user exists
    const userExists = await prisma.user.findUnique({ where: { id: data.userId } });
    if (!userExists) {
      throw new Error(`User with ID ${data.userId} not found.`);
    }
    return prisma.deal.create({ data });
  },

  async getAllDeals(): Promise<Deal[]> {
    return prisma.deal.findMany({
      where: { deletedAt: null },
      include: { user: true, guides: true }, // Optionally include related user and guides
    });
  },

  async getDealById(id: string): Promise<Deal | null> {
    return prisma.deal.findUnique({
      where: { id, deletedAt: null },
      include: { user: true, guides: true }, // Optionally include related user and guides
    });
  },

  async getDealsByUserId(userId: string): Promise<Deal[]> {
    return prisma.deal.findMany({
      where: { userId, deletedAt: null },
      include: { guides: true }, // Optionally include related guides
    });
  },

  async getDealsByStage(userId: string, stage: DealStage): Promise<Deal[]> {
    // First, ensure the user exists (optional, but good practice if userId isn't validated upstream)
    // const user = await prisma.user.findUnique({ where: { id: userId } });
    // if (!user) {
    //   throw new Error(`User with ID ${userId} not found.`);
    // }
    return prisma.deal.findMany({
      where: { userId, stage, deletedAt: null },
      include: {
        // user: true, // Not needed as we are querying for a specific user
        guides: true
      },
    });
  },

  // Method to get deals including soft-deleted ones, for admin purposes perhaps
  async getAllDealsIncludingDeleted(): Promise<Deal[]> {
    return prisma.deal.findMany({
      include: { user: true, guides: true },
    });
  },

  async updateDeal(id: string, data: DealUpdateData): Promise<Deal | null> {
    if (data.contactName === '') {
      throw new Error('Contact name cannot be empty.');
    }
    if (data.company === '') {
      throw new Error('Company cannot be empty.');
    }
    // Add other specific field validations as necessary e.g. for stage
    if (data.stage && !Object.values(DealStage).includes(data.stage)) {
        throw new Error(`Invalid deal stage: ${data.stage}`);
    }

    // Ensure the deal exists before attempting to update
    const dealExists = await prisma.deal.findUnique({ where: { id } });
    if (!dealExists) {
        throw new Error(`Deal with ID ${id} not found.`);
    }

    return prisma.deal.update({
      where: { id },
      data,
    });
  },

  // Soft delete a deal
  async deleteDeal(id: string): Promise<Deal | null> {
    // Before soft deleting, ensure the deal exists and is not already deleted
    const deal = await prisma.deal.findUnique({
        where: { id, deletedAt: null },
    });

    if (!deal) {
        throw new Error(`Deal with ID ${id} not found or already deleted.`);
    }

    // Note: Soft deleting a deal does not automatically soft-delete its guides.
    // This logic would need to be added if required (e.g., iterate guides and soft delete them).
    // For now, guides will remain, but queries for guides should also check if their parent deal is soft-deleted if necessary.
    return prisma.deal.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  // Hard delete a deal (permanent)
  async forceDeleteDeal(id: string): Promise<Deal | null> {
    // This is a permanent deletion.
    // Consider implications for related guides if not handled by schema (onDelete: Cascade)
    // If guides should also be hard-deleted, a transaction might be needed:
    // return prisma.$transaction(async (tx) => {
    //   await tx.guide.deleteMany({ where: { dealId: id } }); // or soft delete guides first
    //   return tx.deal.delete({ where: { id } });
    // });
    // For now, assuming if hard-delete is called, related data is handled or accepted to be restricted by FK constraints
    return prisma.deal.delete({
      where: { id }, // This will delete regardless of deletedAt status
    });
  },
};
