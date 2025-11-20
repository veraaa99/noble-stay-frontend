import { useUser } from "@/contexts/UserContext";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type LoginFormProps = {
  setIsLoginModalOpen?: Dispatch<SetStateAction<boolean>>;
};

const LoginForm = ({ setIsLoginModalOpen }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>({ defaultValues: { email: "", password: "" } });

  const { actions } = useUser();
  const [formError, setFormError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      reset({ email: "", password: "" });
    }
    setIsSubmitted(false);
    setFormError("");
  }, [isSubmitted, reset]);

  const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
    if (!data.email || !data.password) {
      setFormError("Please fill in all fields");
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      await actions.loginUser(data);
    } catch (error: any) {
      setFormError(error.response?.data?.message || "Something went wrong");
      return;
    }

    if (setIsLoginModalOpen) {
      setIsLoginModalOpen(false);
    }

    setIsSubmitted(true);
    setLoading(false);
    return;
  };

  return (
    <div>
      <form
        action=""
        className="flex flex-col items-center my-3"
        onSubmit={handleSubmit(async (data) => await onSubmit(data))}
      >
        <div className="mb-5 sm:mb-2">
          <p className="caption">Email</p>
          <input
            type="email"
            className="bg-white pl-3 pr-7 py-2 border-1 border-(--sidebar-border) rounded-sm text-xs"
            id=""
            {...register("email", { required: true })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="text-(--error) text-xs mt-1">
              Enter an email address
            </p>
          )}
        </div>
        <div className="mb-3 sm:mb-2">
          <p className="caption">Password</p>
          <input
            type="password"
            className="bg-white pl-3 pr-7 py-2 border-1 border-(--sidebar-border) rounded-sm text-xs"
            id=""
            {...register("password", { required: true })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="text-(--error) text-xs mt-1">Enter a password</p>
          )}
          <p className="caption text-(--gray) underline">Forgot password?</p>
        </div>

        <div>
          <p className="text-(--error) text-xs mb-3">{formError}</p>
        </div>

        <button
          className="cursor-pointer btn-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? <p>Logging in...</p> : "LOG IN"}
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
