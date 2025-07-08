import { PrismaClient, Guide, MeetingType, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Define types for input data
// Prisma.JsonValue is used for the 'content' field if it's defined as Json in schema
type GuideCreateData = {
  userId: string;
  dealId: string;
  meetingType: MeetingType;
  content?: Prisma.JsonValue | null; // Or string if content is Text
};

// Guides are often immutable once created. If updates are allowed:
type GuideUpdateData = Partial<{
  meetingType: MeetingType;
  content: Prisma.JsonValue | null; // Or string
}>;

export const guideService = {
  async createGuide(data: GuideCreateData): Promise<Guide> {
    if (!data.userId || !data.dealId || !data.meetingType) {
      throw new Error('User ID, Deal ID, and Meeting Type are required for creating a guide.');
    }
    // Ensure user exists
    const userExists = await prisma.user.findUnique({ where: { id: data.userId } });
    if (!userExists) {
      throw new Error(`User with ID ${data.userId} not found.`);
    }
    // Ensure deal exists
    const dealExists = await prisma.deal.findUnique({ where: { id: data.dealId } });
    if (!dealExists) {
      throw new Error(`Deal with ID ${data.dealId} not found.`);
    }
    // Ensure the deal belongs to the user (optional, but good for data integrity)
    if (dealExists.userId !== data.userId) {
        throw new Error(`Deal with ID ${data.dealId} does not belong to user ${data.userId}.`);
    }

    return prisma.guide.create({ data });
  },

  async getAllGuides(): Promise<Guide[]> {
    return prisma.guide.findMany({
      where: { deletedAt: null },
      include: { user: true, deal: true }, // Optionally include related user and deal
    });
  },

  async getGuideById(id: string): Promise<Guide | null> {
    return prisma.guide.findUnique({
      where: { id, deletedAt: null },
      include: { user: true, deal: true }, // Optionally include related user and deal
    });
  },

  async getGuidesByUserId(userId: string): Promise<Guide[]> {
    return prisma.guide.findMany({
      where: { userId, deletedAt: null },
      include: { deal: true }, // Optionally include related deal
    });
  },

  async getGuidesByDealId(dealId: string): Promise<Guide[]> {
    // Also check if the parent deal is not soft-deleted
    const deal = await prisma.deal.findUnique({ where: { id: dealId, deletedAt: null }});
    if (!deal) {
        // Or return empty array, depending on desired behavior if deal is deleted or not found
        throw new Error(`Deal with ID ${dealId} not found or has been deleted.`);
    }
    return prisma.guide.findMany({
      where: { dealId, deletedAt: null },
      include: { user: true }, // Optionally include related user
    });
  },

  // Method to get guides including soft-deleted ones, for admin purposes perhaps
  async getAllGuidesIncludingDeleted(): Promise<Guide[]> {
    return prisma.guide.findMany({
      include: { user: true, deal: true },
    });
  },

  // If guides are updatable, uncomment this:
  // async updateGuide(id: string, data: GuideUpdateData): Promise<Guide | null> {
  //   return prisma.guide.update({
  //     where: { id },
  //     data,
  //   });
  // },

  // Soft delete a guide
  async deleteGuide(id: string): Promise<Guide | null> {
    const guide = await prisma.guide.findUnique({
        where: { id, deletedAt: null }
    });

    if (!guide) {
        throw new Error(`Guide with ID ${id} not found or already deleted.`);
    }

    return prisma.guide.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  // Hard delete a guide (permanent)
  async forceDeleteGuide(id: string): Promise<Guide | null> {
    return prisma.guide.delete({
      where: { id }, // This will delete regardless of deletedAt status
    });
  },
};
