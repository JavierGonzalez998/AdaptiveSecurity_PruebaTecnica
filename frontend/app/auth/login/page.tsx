import FormLogin from "./form/formlogin";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Login() {
  return (
    <main className="container font-montserrat h-[90vh] flex flex-col justify-center items-center">
      <section className="w-96 h-96 bg-white flex flex-col justify-center items-center mt-5 shadow-lg">
        <h1 className="mt-5 text-center font-semibold text-lg">Inicio de sesión</h1>
        <FormLogin />
      </section>
      <div className="my-10 flex flex-col gap-5 justify-center items-center">
        <p>¿No tienes cuenta?</p>
        <Link href="/auth/register">
          <Button className="bg-green-500 hover:bg-green-700">
            Regístrate
          </Button>
        </Link>
      </div>
    </main>
  );
}
