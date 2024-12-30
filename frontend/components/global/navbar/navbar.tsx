"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { logout } from "@/lib/conn/auth/login";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/zustand/providers/sessionStateProvider";
export default function Navbar() {
  const router = useRouter();
  const { session, removeSession } = useSessionStore((store) => store);
  const handleLogout = async () => {
    if (session) {
      const response = await logout(session.access, session.refresh);
      if (response.status == 200) {
        removeSession();
        router.push("/");
      }
    }
  };
  const buttonStyle =
    "bg-transparent hover:bg-transparent focus:bg-transparent";
  return (
    <div className="w-full h-16 sticky top-0 bg-rose-200 flex justify-center items-center z-50">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${buttonStyle}`}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dogs" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${buttonStyle}`}
              >
                Perritos
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/#about" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${buttonStyle}`}
              >
                Acerca de nosotros
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {session ? (
            <>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">
                  Perfil
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-1">
                    <ListItem href="/profile" title="mi perfil">
                      Información personal y datos de perritos adoptados
                    </ListItem>
                    {session.role === "Admin" && (
                      <ListItem href="/admin" title="Admin">
                        Administración de usuarios y animales
                      </ListItem>
                    )}
                    {session.role === "Volunteer" && (
                      <ListItem href="/volunteer" title="Panel de Voluntarios">
                        Administración de estados de adopción
                      </ListItem>
                    )}
                    <ListItem>
                      <button
                        onClick={handleLogout}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          Cerrar sesión
                        </div>
                      </button>
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </>
          ) : (
            <NavigationMenuItem>
              <Link href="/auth/login" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${buttonStyle}`}
                >
                  Iniciar Sesion
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
