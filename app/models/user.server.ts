import type { Password, Skill, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User, Skill } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

// export async function getSkillByUser(user: User["id"]) {
//   return prisma.skillsOnUsers.findMany({ where: { userId: user } });
// }

export async function createUser(
  email: User["email"],
  password: string,
  experince: User["experince"],
  yearExperience: User["yearExperience"],
  ruolo: User["ruolo"]
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      experince,
      yearExperience,
      ruolo,
    },
  });
}

//update ruole and experince
export async function updateProfile(
  experince: User["experince"],
  yearExperience: User["yearExperience"],
  ruolo: User["ruolo"],
  id: User["id"]
) {
  return prisma.user.update({
    data: {
      experince,
      yearExperience,
      ruolo,
    },
    where: {
      id,
    },
  });
}

export function createSkill(
  name: Skill["name"],

  userId: Skill["userId"]
) {
  return prisma.skill.create({
    data: {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function getSkillListItems({ userId }: { userId: User["id"] }) {
  return prisma.skill.findMany({
    where: { userId },
    select: { id: true, name: true },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
