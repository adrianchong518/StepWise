import Icon from "@/app/icon.svg";
import { Link } from "@nextui-org/link";
import { Navbar, NavbarBrand } from "@nextui-org/navbar";

export default function Navigation() {
  return (
    <Navbar maxWidth="lg" isBordered className="bg-primary-100">
      <NavbarBrand>
        <Link href="/" color="foreground" className="gap-2">
          <Icon width="48" height="48" />
          <p className="font-bold text-2xl text-inherit">StepWise</p>
        </Link>
      </NavbarBrand>
    </Navbar>
  );
}
