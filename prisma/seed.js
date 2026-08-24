/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

function requireEnv(name) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    console.error(`Missing required environment variable: ${name}`);
    console.error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD before running `npm run db:seed` — " +
        "there is no default password. See .env.example."
    );
    process.exit(1);
  }
  return value;
}

async function main() {
  const email = requireEnv("SEED_ADMIN_EMAIL");
  const password = requireEnv("SEED_ADMIN_PASSWORD");
  const name = process.env.SEED_ADMIN_NAME || "TK Motors Admin";

  if (password.length < 8) {
    console.error("SEED_ADMIN_PASSWORD must be at least 8 characters.");
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user ${email} already exists — skipping. No changes made.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { name, email, passwordHash, role: "ADMIN" },
  });

  console.log(`Created first admin user: ${email}`);
  console.log("Sign in at /admin/login with the credentials you set in your");
  console.log("environment. Once in, create your day-to-day admin account(s)");
  console.log("from Admin -> Admin users and remove this seed account if you");
  console.log("no longer need it.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
