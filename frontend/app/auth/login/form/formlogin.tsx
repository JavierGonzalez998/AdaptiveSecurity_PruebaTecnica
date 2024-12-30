"use client";
import { Formik, Form} from "formik";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { login } from "@/lib/conn/auth/login";
import { useSessionStore } from "@/zustand/providers/sessionStateProvider";
import { useRouter } from "next/navigation";
export default function FormLogin() {
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };
  const { setSession } = useSessionStore((store) => store);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async(values, { setSubmitting, resetForm }) => {
        console.log("hola")
        const res = await login(values.email, values.password);
        console.log(res);
        if (res.status === 200) {
          setSession({ access: res.access, refresh: res.refresh, role: res.role });
          router.push("/");
        } else {
          alert("Error al iniciar sesión");
        }
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values,setFieldValue,}) => (
        <Form className="h-96 flex flex-col justify-evenly items-center">
          <div className="flex flex-col justify-center items-center my-5">
            <label htmlFor="email">Email</label>
            <Input type="email" name="email" value={values.email} onChange={(e) => setFieldValue("email", e.target.value)} />
          </div>
          <div className="flex flex-col justify-center items-center my-5">
            <label htmlFor="password">Password</label>
            <Input type="password" name="password" value={values.password} onChange={(e) => setFieldValue("password", e.target.value)} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <Button type="submit" className="bg-green-600 hover:bg-green-800">
              Iniciar sesión
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
