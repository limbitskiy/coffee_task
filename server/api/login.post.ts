import { z } from "zod";
import users from "./users.json";

const bodySchema = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
});

export default defineEventHandler(async (event) => {
  const { login, password } = await readValidatedBody(event, bodySchema.parse);

  const activeUsers = users.filter((user) => user.active);

  const foundUser = activeUsers.find((user) => user.credentials.username === login && user.credentials.password === password);

  if (foundUser) {
    const userFullName = foundUser.name + " " + foundUser.surname;
    await setUserSession(event, {
      user: {
        name: userFullName,
      },
    });
    return { user: { name: userFullName } };
  }

  throw createError({
    statusCode: 401,
    message: "Bad credentials",
  });
});
