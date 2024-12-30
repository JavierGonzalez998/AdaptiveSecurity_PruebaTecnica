import { getDogs } from "@/lib/conn/dogs/getDogs";
import DogCard from "@/components/global/cards/dogCard";
import { Dog } from "@/components/global/cards/dogCard";
import {
  CarouselComponent,
  CarouselComponentItem,
} from "@/components/global/carousel/carousel";
import { Button } from "@/components/ui/button";
import Adopcion1 from "@/public/adopcion1.jpg";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
  const dogs = await getDogs();
  return (
    <div className="font-montserrat">
      <h1 className="text-center font-semibold text-2xl">
        Bienvenidos al refugio Patitas
      </h1>
      <p className="text-center text-lg">
        Aquí encontrarás a tu nuevo mejor amigo
      </p>
      <section className="flex flex-col justify-center mt-5">
        <h2 className="font-xl font-semibold text-center">
          algunas de nuestras patitas felices:
        </h2>
        <div className="w-full h-96 flex justify-center items-center mt-10">
          <CarouselComponent>
            {dogs &&
              dogs.results.map((dog: Dog) => {
                return (
                  <CarouselComponentItem key={dog.id}>
                    <DogCard dog={dog} />
                  </CarouselComponentItem>
                );
              })}
          </CarouselComponent>
        </div>
      </section>
      <section className="flex flex-col justify-center mt-5">
        <h2 className="font-xl font-semibold text-center">¿Quieres adoptar?</h2>
        <Link href="/auth/login" className="w-full flex justify-center items-center">
          <Button className="w-1/4 mx-auto mt-5 bg-green-500 hover:bg-green-700">
            ¡Adopta!
          </Button>
        </Link>
      </section>
      <section className="mt-20 h-[90vh] px-10 lg:px-0" id="about">
        <h3 className="text-center font-semibold text-2xl">
          Acerca de nosotros
        </h3>
        <p>
          En Patitas nos dedicamos a rescatar perros de la calle y brindarles un
          hogar temporal hasta que encuentren una familia definitiva.
        </p>
        <p>
          Contamos con un equipo de voluntarios que se encargan de alimentarlos,
          bañarlos y cuidarlos.
        </p>
        <p>
          Además, nos encargamos de esterilizarlos y vacunarlos para que estén
          listos para ser adoptados.
        </p>
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="my-10 flex justify-center items-center">
            <Image
              src={Adopcion1}
              alt="adopcion"
              className="w-1/2 h-1/2 object-cover rounded-md shadow-lg"
            />
          </div>
          <p>
            En Patitas creemos que todos los perros merecen una segunda
            oportunidad y un hogar donde los amen y cuiden.
          </p>
        </div>
        <h3 className="text-center font-semibold text-2xl my-5">
          ¿Cómo puedes ayudar?
        </h3>
        <p className="text-center">
          Si quieres ayudar, puedes hacerlo de la siguiente manera:
        </p>
        <ul className="list-disc flex flex-col justify-center items-center">
          <li>Adoptando a uno</li>
          <li>Siendo voluntario</li>
          <li>Donando</li>
        </ul>
        <h3 className="text-center font-semibold text-2xl my-5">Contacto</h3>
        <p className="text-center">
          Si quieres adoptar o ayudar, puedes contactarnos en:
        </p>
        <p className="text-center">Teléfono: 1234567890</p>
      </section>
    </div>
  );
}
