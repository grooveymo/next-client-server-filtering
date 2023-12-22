const data = [
  {
    id: 1,
    email: 'johndoe@email.com',
    name: 'John Doe',
    role: 'Developer',
    department: 'Ecommerce',
    employeeType: 'Permanent',
  },
  {
    id: 2,
    email: 'janedoe@email.com',
    name: 'Jane Doe',
    role: 'Product Owner',
    department: 'Insurance',
    employeeType: 'Contract',
  },
  {
    id: 3,
    email: 'alexsmith@email.com',
    name: 'Alex Smith',
    role: 'Manager',
    department: 'Health & Medcare',
    employeeType: 'Permanent',
  },
  {
    id: 4,
    email: 'emilyjones@email.com',
    name: 'Emily Jones',
    role: 'Tester',
    department: 'Ecommerce',
    employeeType: 'Contract',
  },
  {
    id: 5,
    email: 'michaelbrown@email.com',
    name: 'Michael Brown',
    role: 'Developer',
    department: 'Insurance',
    employeeType: 'Permanent',
  },
  {
    id: 6,
    email: 'sarahwilliams@email.com',
    name: 'Sarah Williams',
    role: 'Product Owner',
    department: 'Health & Medcare',
    employeeType: 'Contract',
  },
  {
    id: 7,
    email: 'davidmiller@email.com',
    name: 'David Miller',
    role: 'Manager',
    department: 'Ecommerce',
    employeeType: 'Permanent',
  },
  {
    id: 8,
    email: 'kimberlyjohnson@email.com',
    name: 'Kimberly Johnson',
    role: 'Tester',
    department: 'Insurance',
    employeeType: 'Contract',
  },
  {
    id: 9,
    email: 'williamdavis@email.com',
    name: 'William Davis',
    role: 'Developer',
    department: 'Health & Medcare',
    employeeType: 'Permanent',
  },
  {
    id: 10,
    email: 'marywilson@email.com',
    name: 'Mary Wilson',
    role: 'Product Owner',
    department: 'Ecommerce',
    employeeType: 'Contract',
  },
  {
    id: 11,
    email: 'jamesthomas@email.com',
    name: 'James Thomas',
    role: 'Manager',
    department: 'Insurance',
    employeeType: 'Permanent',
  },
  {
    id: 12,
    email: 'jenniferrobinson@email.com',
    name: 'Jennifer Robinson',
    role: 'Tester',
    department: 'Health & Medcare',
    employeeType: 'Contract',
  },
  {
    id: 13,
    email: 'robertking@email.com',
    name: 'Robert King',
    role: 'Developer',
    department: 'Ecommerce',
    employeeType: 'Permanent',
  },
  {
    id: 14,
    email: 'michelleevans@email.com',
    name: 'Michelle Evans',
    role: 'Product Owner',
    department: 'Insurance',
    employeeType: 'Contract',
  },
  {
    id: 15,
    email: 'richardcooper@email.com',
    name: 'Richard Cooper',
    role: 'Manager',
    department: 'Health & Medcare',
    employeeType: 'Permanent',
  },
];

import { PrismaClient } from '@prisma/client';
let db = new PrismaClient();

// REMOVE THIS
async function setupUsers() {
  const promises = data.map((item) =>
    db.user.create({
      data: { ...item },
    })
  );

  return Promise.all(promises);
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/month/{year}`;
}
const statuses = ['draft', 'pending', 'paid', 'overdue'];
const generateStatus = () => {
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};
async function setupInvoices() {
  const data = Array.from({ length: 100 }, (_, index) => ({
    name: `Invoice ${index + 1}`,
    value: Math.random() * 1000,
    dueDate: formatDate(new Date()),
    status: generateStatus(), // Set initial status to pending
  }));

  const promises = data.map((item) =>
    db.invoice.create({
      data: { ...item },
    })
  );

  return Promise.all(promises);

  // await db.invoice.createMany({
  //   data: Array.from({ length: 100 }, (_, index) => ({
  //   name: Invoice ${index + 1},
  //   value: Math.random() * 1000, // Generate random value between 0 and 1000
  //   dueDate: formatDate(new Date()), // Format current date as dd/mm/yyyy
  //   status: 'pending', // Set initial status to pending
  //   })),
  //   });
  //   console.log('Seeded 100 invoices successfully!');
  //   } catch (error) {
  //   console.error('Error seeding invoices:', error);
  //   } finally {
  //   await prisma.$disconnect();
  //   }
}

async function seed() {
  // setupUsers();
  setupInvoices();
}

seed();
