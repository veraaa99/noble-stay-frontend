import { useForm, type SubmitHandler } from 'react-hook-form'
import { useUser } from "@/contexts/UserContext"
import type { Dispatch, SetStateAction } from 'react'

type RegisterFormProps = {
  setIsRegisterModalOpen?: Dispatch<SetStateAction<boolean>>
}

const RegisterForm = ({ setIsRegisterModalOpen }: RegisterFormProps ) => {
   const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputs>({ defaultValues: { email: "", phone:"", password: "", confirmPassword: "" } })

  const { actions } = useUser()

  const onSubmit: SubmitHandler<RegisterInputs> = async(data: RegisterInputs) => {

      if(!data.email || !data.password || !data.phone || !data.confirmPassword){
          console.log('Please fill in all fields')
          return
      } else if(data.password !== data.confirmPassword) {
          console.log('Passwords do not match')
          return
      }

      try {
          await actions.createUser(data)
          if(setIsRegisterModalOpen) {
            setIsRegisterModalOpen(false)
          }
          
      }  catch(error: any) {
            console.log(error.message)
            return
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