import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


interface props {
    children: React.ReactNode
}

export function CarouselComponent({children} :props) {
  return (
    <Carousel opts={{
        align: "start",
      }}
      className="w-full max-w-sm">
      <CarouselContent>
        {children}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}


export function CarouselComponentItem({children} :props) {
    return (
        <CarouselItem>
            {children}
        </CarouselItem>
    )
}   
