import { z } from "zod";

const registerUserSchema = z.object({
  name: z
    .string()
    .min(3, "نام شما باید از 2 کاراکتر باشد")
    .max(10, "نام شما نیاید از 10 کاراکتر بیشتر باشد"),
  lastName: z
    .string()
    .min(5, "نام خانودگی باید بیش از 4 کاراکتر باشد")
    .max(15, "نام خانوادگی نباید بیشتر از 15 کاراکتر باشد"),
  userName: z
    .string()
    .min(7, "نام کاربری باید از 6 کاراکتر بیشتر باشد")
    .max(20, "نام کاربری نباید بیشتر از 20 کاراکتر باشد"),
  phone: z
    .string()
    .regex(
      /^(09)(1[0-9]|2[0-2]|3[0-4]|90[1-9]|9[1-9][0-9]?|0[1-5])[0-9]{7}$/g,
      "شماره موبایل نا معتبر",
    ),
  password: z
    .string()
    .min(8, "کلمه ی عبور باید بیش از 7 کاراکتر باشد")
    .max(20, "کلمه ی عبور نباید بیش از 20 کارکتر باشد"),
});

const validationRegisterResultFunc = (data:unknown) => {
  return registerUserSchema.safeParse(data);
};

const loginSchema = z.object({
  userName: z
    .string()
    .min(7, "نام کاربری باید از 6 کاراکتر بیشتر باشد")
    .max(20, "نام کاربری نباید بیشتر از 20 کاراکتر باشد"),
  password: z
    .string()
    .min(8, "کلمه ی عبور باید بیش از 7 کاراکتر باشد")
    .max(20, "کلمه ی عبور نباید بیش از 20 کارکتر باشد"), 
})

const loginDataValidation = (data: unknown) => {
  return loginSchema.safeParse(data)
}

export {validationRegisterResultFunc, loginDataValidation}