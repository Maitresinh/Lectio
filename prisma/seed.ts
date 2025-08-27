import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lectio.local' },
    update: {},
    create: {
      email: 'admin@lectio.local',
      username: 'admin',
      name: 'Administrator',
      password: adminPassword,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create sample reader user
  const readerPassword = await bcrypt.hash('reader123', 10);
  const reader = await prisma.user.upsert({
    where: { email: 'reader@lectio.local' },
    update: {},
    create: {
      email: 'reader@lectio.local',
      username: 'reader',
      name: 'Sample Reader',
      password: readerPassword,
      role: UserRole.READER,
      status: UserStatus.ACTIVE,
    },
  });

  console.log('✅ Reader user created:', reader.email);

  // Create sample book
  const book = await prisma.book.upsert({
    where: { id: 'sample-book-1' },
    update: {},
    create: {
      id: 'sample-book-1',
      title: 'Alice au Pays des Merveilles',
      author: 'Lewis Carroll',
      isbn: '978-2-07-061234-5',
      description: 'Un classique de la littérature jeunesse',
      fileName: 'alice-au-pays-des-merveilles.epub',
      filePath: '/books/alice-au-pays-des-merveilles.epub',
      fileSize: 1024000,
      mimeType: 'application/epub+zip',
      uploadedBy: admin.id,
      isActive: true,
      isPublic: true,
    },
  });

  console.log('✅ Sample book created:', book.title);

  // Create sample group
  const group = await prisma.group.upsert({
    where: { slug: 'club-lecture-classique' },
    update: {},
    create: {
      name: 'Club de Lecture Classique',
      description: 'Un groupe pour découvrir les grands classiques de la littérature',
      slug: 'club-lecture-classique',
      ownerId: admin.id,
      isActive: true,
      isPublic: false,
      maxMembers: 50,
    },
  });

  console.log('✅ Sample group created:', group.name);

  // Add book to group
  await prisma.groupBook.upsert({
    where: { 
      groupId_bookId: {
        groupId: group.id,
        bookId: book.id,
      }
    },
    update: {},
    create: {
      groupId: group.id,
      bookId: book.id,
      isActive: true,
      addedBy: admin.id,
    },
  });

  // Add reader to group
  await prisma.groupMember.upsert({
    where: {
      userId_groupId: {
        userId: reader.id,
        groupId: group.id,
      }
    },
    update: {},
    create: {
      userId: reader.id,
      groupId: group.id,
      role: 'MEMBER',
    },
  });

  console.log('✅ Reader added to group');

  // Create sample annotation
  const annotation = await prisma.annotation.create({
    data: {
      userId: reader.id,
      bookId: book.id,
      groupId: group.id,
      text: 'Alice was beginning to get very tired of sitting by her sister on the bank.',
      content: 'Ceci marque le début de l\\'aventure d\\'Alice. Le contraste entre l\\'ennui du quotidien et l\\'extraordinaire qui va suivre.',
      pageNumber: 1,
      color: 'YELLOW',
      type: 'NOTE',
      isPrivate: false,
    },
  });

  console.log('✅ Sample annotation created');

  // Create reading progress
  await prisma.readingProgress.upsert({
    where: {
      userId_bookId: {
        userId: reader.id,
        bookId: book.id,
      }
    },
    update: {},
    create: {
      userId: reader.id,
      bookId: book.id,
      groupId: group.id,
      percentage: 15.5,
      currentPage: 12,
      totalTime: 1800, // 30 minutes
      lastReadAt: new Date(),
    },
  });

  console.log('✅ Reading progress created');

  // Create feed item
  await prisma.feedItem.create({
    data: {
      groupId: group.id,
      userId: reader.id,
      type: 'ANNOTATION_CREATED',
      content: {
        annotationId: annotation.id,
        bookTitle: book.title,
        text: annotation.text.substring(0, 50) + '...',
      },
    },
  });

  console.log('✅ Feed item created');

  console.log(`
🎉 Database seeded successfully!

📧 Login credentials:
   Admin: admin@lectio.local / admin123
   Reader: reader@lectio.local / reader123

📚 Sample data created:
   - 1 book: ${book.title}
   - 1 group: ${group.name}
   - 1 annotation with reading progress
   - Activity feed items

🚀 You can now start the application!
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });