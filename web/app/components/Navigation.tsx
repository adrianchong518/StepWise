import Icon from "@/app/icon.svg";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Navbar, NavbarBrand } from "@nextui-org/navbar";

export default function Navigation() {
  return (
    <Navbar isBordered maxWidth="full" className="h-10 bg-primary-50">
      <NavbarBrand>
        <Button
          as={Link}
          href="/"
          color="default"
          variant="light"
          disableRipple
          disableAnimation
          startContent={<Icon width="48" height="48" />}
        >
          <p className="font-bold text-xl text-inherit">StepWise</p>
        </Button>
      </NavbarBrand>
    </Navbar>
  );
}
