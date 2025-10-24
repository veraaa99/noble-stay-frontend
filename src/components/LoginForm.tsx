import { useUser } from "@/contexts/UserContext"
import { useForm, type SubmitHandler } from "react-hook-form"

type LoginInputs = {
  email: string, 
  password: string
}

const LoginForm = () => {

   const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>({ defaultValues: { email: "", password: "" } })
  
  const { actions, users } = useUser()

  const onSubmit: SubmitHandler<LoginInputs> = (data: LoginInputs) => {
  
    const existingUser: User | undefined = users.find(u => u.email == data.email)

    if (!existingUser) {
      console.log("Error: User not found")
    } else {
      const _user: User = { 
        id: existingUser.id, 
        email: data.email.trim(),
        phone: existingUser.phone.trim(),
        password: data.password.trim()      
      }

      if (existingUser.password == _user.password) {
        actions.setUser(_user)
        // setIsSubmitted(true)
        // onSuccess()
      } else {
        console.log("Error: Wrong password")
      }
    }
      return
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