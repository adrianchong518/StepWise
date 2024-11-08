import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

export default function Page() {
  return (
    <main className="flex items-center justify-center h-svh">
      <Card className="max-w-[400px] bg-primary-100 p-6">
        <CardHeader>
          <h1 className="text-3xl">
            Welcome to <strong>StepWise</strong>
          </h1>
        </CardHeader>
        <CardFooter>
          <Button
            size="lg"
            color="primary"
            endContent={<ArrowRightIcon className="w-5 md:w-6" />}
            as={Link}
            href="/demo"
          >
            <span className="font-medium">Get Started</span>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
