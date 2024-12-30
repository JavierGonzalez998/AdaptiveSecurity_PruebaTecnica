import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FormRegister from "./form/formRegister";
import Link from "next/link";
export default function Register() {
  return (
    <main className="container font-montserrat h-[90vh] flex flex-col justify-center items-center">
      <div>
        <Alert>
          <AlertTitle>Atención ⚠️</AlertTitle>
          <AlertDescription>
            🦴 Si deseas registrarte como voluntario, Debe esperar a que el
            administrador apruebe su ingreso. Tendrá accesso a su cuenta como
            usuario y una vez aprobado podrá acceder a las funciones de
            voluntario 🦴
          </AlertDescription>
        </Alert>
        <h2 className="font-semibold text-xl my-5 ">
          Si deseas registrarte. Por favor completa los siguientes campos:
        </h2>
        <FormRegister/>
        <div className="bg-white">
            <h4 className="text-lg text-center py-3">Si ya tienes una cuenta <span><Link href="/auth/login" className="text-rose-400 hover:text-rose-600">Inicia Sesión</Link></span></h4>
        </div>
      </div>
    </main>
  );
}
