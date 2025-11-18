import { useForm, type SubmitHandler } from 'react-hook-form'
import { useUser } from "@/contexts/UserContext"
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

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
  const [formError, setFormError] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  
  useEffect(() => {
    if (isSubmitted) {
      reset({ email: "", phone:"", password: "", confirmPassword: "" })
    }
    setIsSubmitted(false)
    setFormError("")

  }, [isSubmitted, reset])

  const onSubmit: SubmitHandler<RegisterInputs> = (data: RegisterInputs) => {

    if(!data.email || !data.password || !data.phone || !data.confirmPassword){
        setFormError('Please fill in all fields')
        return
    } else if(data.password !== data.confirmPassword) {
        setFormError('Passwords do not match')
        return
    }

    setFormError('')

    try {
        actions.createUser(data)
    }  catch(error: any) {
          console.log(error.message)
          return
    }

    if(setIsRegisterModalOpen) {
      setIsRegisterModalOpen(false)
    }

    setIsSubmitted(true)
    return
  }
  
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <p>Email</p>            
            <input type="email" id="email" {...register("email", { required: true })}/>
            {errors.email && errors.email.type === "required" && <p className="text-red-500 text-xs italic mt-1">Enter an email address</p>}
        </div>
        <div>
            <p>Mobile</p>            
            <input type="text" id="phone" {...register("phone", { required: true })} />
            {errors.phone && errors.phone.type === "required" && <p className="text-red-500 text-xs italic mt-1">Enter a valid phone number</p>}
        </div>
        <div>
            <p>Password</p>            
            <input type="password" id="password" {...register("password", { required: true })}/>
            {errors.password && errors.password.type === "required" && <p className="text-red-500 text-xs italic mt-1">Enter a password</p>}
        </div>
        <div>
            <p>Confirm password</p>            
            <input type="password" id="confirmPassword" {...register("confirmPassword", { required: true })}/>
            {errors.email && errors.email.type === "required" && <p className="text-red-500 text-xs italic mt-1">Repeat password</p>}
        </div>

        <div>
          <p className="text-red-500 text-sm italic mb-3">{formError}</p>
        </div>

        <button type="submit">SIGN UP</button>
      </form>
    </div>
  )
}
export default RegisterForm