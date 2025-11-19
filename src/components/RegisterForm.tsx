import { useForm, type SubmitHandler } from "react-hook-form";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type RegisterFormProps = {
  setIsRegisterModalOpen?: Dispatch<SetStateAction<boolean>>;
};

const RegisterForm = ({ setIsRegisterModalOpen }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputs>({
    defaultValues: { email: "", phone: "", password: "", confirmPassword: "" },
  });

  const { actions } = useUser();
  const [formError, setFormError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmitted) {
      reset({ email: "", phone: "", password: "", confirmPassword: "" });
    }
    setIsSubmitted(false);
    setFormError("");
  }, [isSubmitted, reset]);

  const onSubmit: SubmitHandler<RegisterInputs> = (data: RegisterInputs) => {
    if (!data.email || !data.password || !data.phone || !data.confirmPassword) {
      setFormError("Please fill in all fields");
      return;
    } else if (data.password !== data.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      actions.createUser(data);
    } catch (error: any) {
      console.log(error.message);
      return;
    }

    if (setIsRegisterModalOpen) {
      setIsRegisterModalOpen(false);
    }

    setIsSubmitted(true);
    setLoading(false);
    return;
    return;
  };

  return (
    <div>
      <form
        action=""
        className="flex flex-col items-center my-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <p className="caption">Email</p>
          <input
            type="email"
            className="bg-white pl-3 pr-7 py-2 border-1 border-(--sidebar-border) rounded-sm"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="text-red-500 text-xs italic mt-1">
              Enter an email address
            </p>
          )}
        </div>
        <div className="mb-3">
          <p className="caption">Mobile</p>
          <input
            type="text"
            className="bg-white pl-3 pr-7 py-2 border-1 border-(--sidebar-border) rounded-sm"
            id="phone"
            {...register("phone", { required: true })}
          />
          {errors.phone && errors.phone.type === "required" && (
            <p className="text-red-500 text-xs italic mt-1">
              Enter a valid phone number
            </p>
          )}
        </div>
        <div className="mb-3">
          <p className="caption">Password</p>
          <input
            type="password"
            className="bg-white pl-3 pr-7 py-2 border-1 border-(--sidebar-border) rounded-sm"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="text-red-500 text-xs italic mt-1">Enter a password</p>
          )}
        </div>
        <div className="mb-3">
          <p className="caption">Confirm password</p>
          <input
            type="password"
            className="bg-white pl-3 pr-7 py-2 border-1 border-(--sidebar-border) rounded-sm"
            id="confirmPassword"
            {...register("confirmPassword", { required: true })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="text-red-500 text-xs italic mt-1">Repeat password</p>
          )}
        </div>

        <div>
          <p className="text-red-500 text-sm italic mb-3">{formError}</p>
        </div>

        <button
          className="cursor-pointer btn-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? <p>Creating new user...</p> : "SIGN UP"}
        </button>
      </form>
    </div>
  );
};
export default RegisterForm;
