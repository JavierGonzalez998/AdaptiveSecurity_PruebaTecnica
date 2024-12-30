"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { userDataType } from "./profileInfo";
import { profileSchema } from "@/components/global/Schemas/UserSchema";
import { EditProfile } from "@/lib/conn/user/editProfile";
import { logout} from "@/lib/conn/auth/login";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/zustand/providers/sessionStateProvider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Formik, Field, Form, ErrorMessage } from "formik";

interface props {
  user: userDataType;
}
export default function ButtonUpdateProfile({ user }: props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        className="my-5 bg-rose-400 hover:bg-rose-600"
        onClick={() => setOpen(true)}
      >
        Actualizar perfil
      </Button>
      <DialogProfile open={open} onClose={() => setOpen(false)} user={user} />
    </>
  );
}

interface dialogProps {
  open: boolean;
  onClose: () => void;
  user: userDataType;
}





function DialogProfile({ open, onClose, user }: dialogProps) {
    const router = useRouter()
    const {session, removeSession} = useSessionStore((store) => store)
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-3xl">
        <DialogHeader>
          <DialogTitle>Actualizar Perfil</DialogTitle>
          <DialogDescription>
            Para actualizar su perfil, ingrese los siguientes datos
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            name: user.name,
            lastname: user.last_name,
            address: user.address,
            email: user.email,
            password: '',
            confirmPassword: ''
          }}
          onSubmit={async(values, { setSubmitting }) => {
            const submitValues:Record<string, string | number> = {}
            if(values.password.trim() !== ""){
                submitValues["password"] = values.password
            }
            submitValues["name"] = values.name
            submitValues["lastname"] = values.lastname
            submitValues["address"] = values.address
            submitValues["email"] = values.email
            if(session){
               const res = await EditProfile(session.access, submitValues)
               if(res.status == 200){
                    const logoutRes = await logout(session.access,session.refresh)
                    if(logoutRes.status == 200){
                        removeSession()
                        onClose();
                        router.push("/auth/login")
                    }
               }
            }
            

            setSubmitting(false);
          }}
          validationSchema={profileSchema}
        >
          <Form className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="name">Nombre:</label>
              <Field
                className="shadow-lg border rounded-md"
                name="name"
                id="name"
                type="text"
              />
              <ErrorMessage name="name" component="p"/>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="lastname">Apellido:</label>
              <Field
                className="shadow-lg border rounded-md"
                name="lastname"
                id="lastname"
                type="text"
              />
              <ErrorMessage name="lastname" component="p"/>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="address">Direccion:</label>
              <Field
                className="shadow-lg border rounded-md"
                name="address"
                id="addresss"
                type="text"
              />
              <ErrorMessage name="address" component="p"/>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="email">Correo:</label>
              <Field
                className="shadow-lg border rounded-md"
                name="email"
                id="email"
                type="email"
              />
              <ErrorMessage name="email" component="p"/>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="password">Nueva Contraseña:</label>
              <Field
                className="shadow-lg border rounded-md"
                name="password"
                id="password"
                type="password"
              />
              <ErrorMessage name="password" component="p"/>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <Field
                className="shadow-lg border rounded-md"
                name="confirmPassword"
                id="confirmPassword"
                type="password"
              />
              <ErrorMessage name="confirmPassword" component="p"/>
            </div>
            <div className="w-full flex justify-center items-center my-5 col-span-2">
              <Button type="submit" className="bg-rose-500 hover:bg-rose-600">
                Actualizar mis datos
              </Button>
            </div>
          </Form>
        </Formik>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
