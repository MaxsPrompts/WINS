import { PrismaClient, DealStage, MeetingType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice Wonderland',
      company: 'Wonderland Inc.',
      role: 'Sales Rep',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob The Builder',
      company: 'Construction Co.',
      role: 'Account Manager',
    },
  });

  console.log(`Created users: ${user1.name}, ${user2.name}`);

  // Create Deals for User1
  const deal1User1 = await prisma.deal.create({
    data: {
      userId: user1.id,
      contactName: 'Mad Hatter',
      company: 'TeaParty LLC',
      stage: DealStage.PROSPECTING,
      context: 'Initial contact made, interested in our AI solution.',
    },
  });

  const deal2User1 = await prisma.deal.create({
    data: {
      userId: user1.id,
      contactName: 'Cheshire Cat',
      company: 'Grinning Goods',
      stage: DealStage.DISCOVERY,
      context: 'Scheduled a discovery call to understand needs.',
    },
  });

  console.log(`Created deals for ${user1.name}`);

  // Create Deals for User2
  const deal1User2 = await prisma.deal.create({
    data: {
      userId: user2.id,
      contactName: 'Wendy',
      company: 'FixIt Felix Jr.',
      stage: DealStage.PROPOSAL,
      context: 'Sent proposal for construction management software.',
    },
  });

  console.log(`Created deals for ${user2.name}`);

  // Create Guides for Deal1User1
  const guide1Deal1User1 = await prisma.guide.create({
    data: {
      userId: user1.id,
      dealId: deal1User1.id,
      meetingType: MeetingType.DISCOVERY,
      content: {
        greeting: "Hello Mad Hatter!",
        keyQuestions: ["What are your biggest challenges with tea parties?", "How can AI improve your guest experience?"],
        talkingPoints: ["Our AI can predict tea preferences.", "Automated RSVP management."]
      }
    },
  });

  console.log(`Created guides for ${deal1User1.contactName}`);

  console.log(`Seeding finished.`);
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
