"use client";
import { loginUser } from "@/utils/actions/loginUser";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();
  const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      const res = await loginUser(data);
      console.log(res);
      if (res.success) {
        alert(res.message);
        localStorage.setItem("accessToken", res.accessToken);
        router.push("/");
      } else {
        alert("something went wrong!");
      }

      console.log("res", res);
    } catch (err: any) {
      console.log("asasa");
      console.error(err.message);
      throw new Error(err.message);
    }

    // Add your form submission logic here, e.g., API call
  };

  return (
    <div className="my-10">
      <h1 className="text-center text-4xl mb-5">
        Login <span className="text-accent">Here</span>
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Image
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
            width={500}
            height={200}
            alt="login page"
            className="w-full h-[85%]"
          />
        </div>

        <div className="card w-[70%] h-[80%] shadow-xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control mt-5">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="input input-bordered"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-accent btn-outline">
                Login
              </button>
            </div>
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <Link className="text-accent" href="/register">
                Create an account
              </Link>
            </p>
          </form>
          <p className="text-center">Or Sign Up Using</p>
          <div className="flex justify-center mb-10 mt-2">
            <button
              className="btn btn-circle"
              onClick={() =>
                signIn("google", {
                  callbackUrl:
                    "https://nextjs-authentication-starter-pack-omitul-omituls-projects.vercel.app/dashboard",
                })
              }
            >
              <Image
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                width={50}
                height={50}
                alt="google logo"
              />
            </button>
            <button
              className="btn btn-circle"
              onClick={() =>
                signIn("github", { callbackUrl: `${window.location.origin}` })
              }
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                width={35}
                height={35}
                alt="github logo"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
