"use client";
import { Formik, Form } from "formik";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Register } from "@/lib/conn/auth/register";
import { useRouter } from "next/navigation";
export default function FormRegister() {
  const router = useRouter();
  return (
    <Formik
        initialValues={{
            checked: false,
            name: '',
            lastname: '',
            email: '',
            address: '',
            password: '',
            confirmPassword:''
        }}

        onSubmit={async(values, {setSubmitting}) => {
            const body = {name:values.name,last_name:values.lastname,email:values.email, address:values.address, password:values.password, role: values.checked ? "Volunteer":"User"}
            const res = await Register(body)
            if(res.status == 200){
              router.push("/auth/login")
            }
            setSubmitting(false)
        }}
    >
      {({values, setFieldValue}) => (
        <Form className="bg-white p-3">
          <div>
            <p className="text-center">Tipo de usuario</p>
            <div className="flex justify-center items-center gap-3">
              <p>Usuario</p>
              <Switch checked={values.checked} onCheckedChange={(e) => setFieldValue('checked', e )}  />
              <p>Voluntario</p>
            </div>
          </div>
          <div>
            <label htmlFor="name">Nombre</label>
            <Input type="text" name="name" id="name" value={values.name} onChange={(e) => setFieldValue("name", e.target.value)}></Input>
          </div>
          <div>
            <label htmlFor="lastname">Apellido</label>
            <Input type="text" name="lastname" id="lastname" value={values.lastname} onChange={(e) => setFieldValue("lastname", e.target.value)}></Input>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input type="email" name="email" id="email" value={values.email} onChange={(e) => setFieldValue("email", e.target.value)}></Input>
          </div>
          <div>
            <label htmlFor="address">Dirección</label>
            <Input type="text" name="address" id="address" value={values.address} onChange={(e) => setFieldValue("address", e.target.value)}></Input>
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <Input type="password" name="password" id="password" value={values.password} onChange={(e) => setFieldValue("password", e.target.value)}></Input>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <Input type="password" name="confirmPassword" id="confirmPassword" value={values.confirmPassword} onChange={(e) => setFieldValue("confirmPassword", e.target.value)}></Input>
          </div>
          <div className="mt-5 w-full flex justify-center items-center">
            <Button className="bg-rose-400 hover:bg-rose-600">
                Registrarse
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
