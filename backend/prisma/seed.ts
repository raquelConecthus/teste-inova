import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Departments
  const vendas = await prisma.department.create({
    data: { name: 'Vendas' },
  });
  const engenharia = await prisma.department.create({
    data: { name: 'Engenharia' },
  });
  const sourcing = await prisma.department.create({
    data: { name: 'Sourcing' },
  });

  // Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Raquel',
      email: 'raq@email.com',
      password: '123',
      departmentId: vendas.id,
    },
  });
  const user2 = await prisma.user.create({
    data: {
      name: 'Harley',
      email: 'har@email.com',
      password: '123',
      departmentId: engenharia.id,
    },
  });
  const user3 = await prisma.user.create({
    data: {
      name: 'Lucas',
      email: 'luc@email.com',
      password: '123',
      departmentId: sourcing.id,
    },
  });

  const creatorPermission = await prisma.permission.create({
    data: {
      can_create: true,
      can_read: true,
      can_update: true,
      can_delete: true,
      can_approve: false,
    },
  });

  const adminPermission = await prisma.permission.create({
    data: {
      can_create: true,
      can_read: true,
      can_update: true,
      can_delete: true,
      can_approve: true,
    },
  });

  const approverPermission = await prisma.permission.create({
    data: {
      can_create: false,
      can_read: true,
      can_update: false,
      can_delete: false,
      can_approve: true,
    },
  });

  const creatorRole = await prisma.role.create({
    data: {
      name: 'Criador',
      permission: {
        connect: { id: creatorPermission.id },
      },
    },
  });

  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
      permission: {
        connect: { id: adminPermission.id },
      },
    },
  });

  const approverRole = await prisma.role.create({
    data: {
      name: 'Aprovador',
      permission: {
        connect: { id: approverPermission.id },
      },
    },
  });

  // Phases
  const phase1 = await prisma.phase.create({
    data: {
      name: 'CE',
      description: 'Análise e cotação',
    },
  });
  const phase2 = await prisma.phase.create({
    data: {
      name: 'Planning',
      description: 'Planejamento do próximos passos',
    },
  });
  const phase3 = await prisma.phase.create({
    data: {
      name: 'Development',
      description: 'Desenvolvimento',
    },
  });

  // User Roles
  await prisma.user_Roles.createMany({
    data: [
      {
        userId: user1.id,
        roleId: approverRole.id,
        phaseId: phase1.id,
      },
      {
        userId: user2.id,
        roleId: creatorRole.id,
        phaseId: phase3.id,
      },
    ],
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
