import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LogIn() {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  interface MyObject {
    email: string;
    password: string;
  }

  const validUser: MyObject = {
    email: "admin@test.com",
    password: "Password@123",
  };
  localStorage.setItem("Person", JSON.stringify(validUser));

  const handleLogin: SubmitHandler<LoginFormValues> = (data) => {
    const storedUser: MyObject | null = JSON.parse(localStorage.getItem("Person") || "null");

    if (data.email === storedUser?.email && data.password === storedUser?.password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/Featuer");
    } else {
      toast.error("Invalid Field", {
        description: "Enter Valid Email And Password",
        style: {
          backgroundColor: "#E32220",
        },
      });
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("isLoggedIn");
    if (storedAuth === "true") {
      navigate("/Featuer");
    }
  }, [navigate]);

  return (
    <div className="flex w-full justify-center p-6">
      <div className="grid h-110 p-8 w-100 border border-gray-200 rounded-md m-20 shadow-md">
        <h2 className="text-2xl font-bold">Login</h2>
        <p className="text-sm text-gray-400">
          Enter your email below to login to your account
        </p>

        {/* Email Input */}
        <Label className="font-semibold text-start text-sm mt-3 mb-1">
          Email
        </Label>
        <Input
          className="mb-3"
          id="email"
          placeholder="m@example.com"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mb-3">{errors.email.message}</p>
        )}
        <div className="flex justify-between mt-3 mb-1">
          <Label className="font-semibold text-sm">Password</Label>
          <a className="cursor-pointer hover:underline hover:underline-offset-2 text-sm">
            Forgot your password?
          </a>
        </div>
        <div className="flex mb-3 justify-between align-middle">
          <Input
            className="border"
            id="password"
            type={type}
            {...register("password")}
            autoComplete="current-password"
          />
          <span
            className="flex justify-around items-center"
            onClick={handleToggle}
          >
            <Icon
              className="absolute mr-10 cursor-pointer"
              icon={icon}
              size={15}
            />
          </span>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 mb-3">{errors.password.message}</p>
        )}
        <Button className="mb-3" onClick={handleSubmit(handleLogin)}>
          Login
        </Button>
        <Button variant="outline" className="mb-3">
          Login with Google
        </Button>
        <p className="text-sm text-center my-3">
          Don't have an account?{" "}
          <a className="cursor-pointer hover:underline hover:underline-offset-2 text-primary">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LogIn;