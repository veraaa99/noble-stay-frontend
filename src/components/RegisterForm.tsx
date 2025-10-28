import { useForm, type SubmitHandler } from 'react-hook-form'
import { useUser } from "@/contexts/UserContext"

type RegisterInputs = {
  email: string, 
  phone: string,
  password: string,
  confirmPassword: string
}

const RegisterForm = () => {
   const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputs>({ defaultValues: { email: "", phone:"", password: "", confirmPassword: "" } })

  const { actions, users } = useUser()

  const onSubmit: SubmitHandler<RegisterInputs> = (data: RegisterInputs) => {

    if(data.confirmPassword !== data.password) {
      console.log("Error: Passwords don't match")
      return
    }

    const _user: User = { 
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1, 
      email: data.email.trim(), 
      phone: data.phone.trim(),
      password: data.password.trim()
    }
    
    const existingUser: User | undefined = users.find((u) => u.email == _user.email)

    if (!existingUser) {
      actions.createUser(_user)
      actions.setUser(_user)
      // setIsSubmitted(true)
    } else {
      console.log("Email is already in use")
      // setFormError("Användarnamnet är redan taget")
    }

    return
  }
  
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <p>Email</p>            
            <input type="email" id="email" {...register("email", { required: true })}/>
        </div>
        <div>
            <p>Mobile</p>            
            <input type="text" id="phone" {...register("phone", { required: true })} />
        </div>
        <div>
            <p>Password</p>            
            <input type="password" id="password" {...register("password", { required: true })}/>
            <p>Your password must be at least 6 characters long</p>
        </div>
        <div>
            <p>Confirm password</p>            
            <input type="password" id="confirmPassword" {...register("confirmPassword", { required: true })}/>
        </div>

        <button type="submit">SIGN UP</button>
      </form>
    </div>
  )
}
export default RegisterForm