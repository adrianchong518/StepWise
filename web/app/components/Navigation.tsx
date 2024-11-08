import Icon from "@/app/icon.svg";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Navbar, NavbarBrand } from "@nextui-org/navbar";

export default function Navigation() {
  return (
    <Navbar isBordered className="bg-primary-50">
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
          <p className="font-bold text-2xl text-inherit">StepWise</p>
        </Button>
      </NavbarBrand>
    </Navbar>
  );
}
