import { useUser } from "@/contexts/UserContext"
import type { Dispatch, SetStateAction } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"

type LoginFormProps = {
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>
}

const LoginForm = ({ setIsLoginModalOpen }: LoginFormProps) => {

   const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>({ defaultValues: { email: "", password: "" } })
  
  const { actions } = useUser()

  const onSubmit: SubmitHandler<LoginInputs> = async(data: LoginInputs) => {

    if(!data.email || !data.password){
      console.log('Please fill in all fields')
      return
    }

    try {
      await actions.loginUser(data)
      // navigate(location.state?.from || '/')
    } catch(error: any) {
      console.log(error.response?.data?.message || 'Something went wrong')
      return
    } 
  }
  
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <p>Email</p>            
            <input type="email" id=""  {...register("email", { required: true })}/>
        </div>
        <div>
            <p>Password</p>            
            <input type="password" id=""  {...register("password", { required: true })}/>
            <p>Forgot password?</p>
        </div>

        <button type="submit">LOG IN</button>
      </form>
    </div>
  )
}
export default LoginForm