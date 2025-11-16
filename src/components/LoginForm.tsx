import { useUser } from "@/contexts/UserContext"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"

type LoginFormProps = {
  setIsLoginModalOpen?: Dispatch<SetStateAction<boolean>>
}

const LoginForm = ({ setIsLoginModalOpen }: LoginFormProps) => {
   const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>({ defaultValues: { email: "", password: "" } })
  
  const { actions } = useUser()
  const [formError, setFormError] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  useEffect(() => {
    if (isSubmitted) {
      reset({ email: "", password: "" })
    }
    setIsSubmitted(false)
    setFormError("")

  }, [isSubmitted, reset])

  const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
   
    if(!data.email || !data.password){
      setFormError('Please fill in all fields')
      return
    }

    setFormError('')

    try {
      await actions.loginUser(data)
    } catch(error: any) {
      setFormError(error.response?.data?.message || 'Something went wrong')
      return
    }
    
    if(setIsLoginModalOpen) {
      setIsLoginModalOpen(false)
    }
    setIsSubmitted(true)
    return
  }
  
  return (
    <div>
      <form action="" onSubmit={handleSubmit(async(data) => await onSubmit(data))}>
        <div>
            <p>Email</p>            
            <input type="email" id=""  {...register("email", { required: true })}/>
            {errors.email && errors.email.type === "required" && <p className="text-red-500 text-xs italic mt-1">Enter an email address</p>}
        </div>
        <div>
            <p>Password</p>            
            <input type="password" id=""  {...register("password", { required: true })}/>
            {errors.password && errors.password.type === "required" && <p className="text-red-500 text-xs italic mt-1">Enter a password</p>}
            <p>Forgot password?</p>
        </div>

        <div>
          <p className="text-red-500 text-sm italic mb-3">{formError}</p>
        </div>

        <button className="cursor-pointer" type="submit">LOG IN</button>
      </form>
    </div>
  )
}
export default LoginForm