"use client";

import { CameraIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [done, setDone] = useState(false);

  return (
    <main className="flex justify-center p-16">
      <Card className="w-[75em]">
        <CardHeader className="bg-primary-200">
          <div className="flex flex-row justify-between w-full">
            <h2 className="text-4xl">Questions</h2>
            <Input
              classNames={{
                base: "w-[40em] h-10 place-self-center",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search for questions / concepts..."
              size="sm"
              startContent={<MagnifyingGlassIcon className="w-6" />}
              type="search"
            />
            <Button
              isIconOnly
              className="bg-primary-200"
              onPress={() => {
                onOpen();
                setTimeout(() => {
                  setDone(true);
                }, 2000);
              }}
            >
              <CameraIcon />
            </Button>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              isDismissable={false}
              isKeyboardDismissDisabled={true}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-4xl">
                      Question Upload
                    </ModalHeader>
                    <ModalBody>
                      <div className="text-2xl">
                        {done ? (
                          <p>Question Uploaded</p>
                        ) : (
                          <div className="flex flex-row gap-6">
                            <Spinner />
                            <p>Uploading Question...</p>
                          </div>
                        )}
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onPress={onClose}
                        disabled={!done}
                      >
                        Done
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-4 gap-8">
            {true /* done */ &&
              [
                {
                  q: "Paper 1 Q17",
                  year: 2023,
                  parts: [
                    { p: "a", url: "/demo/Math_2023_17_a" },
                    { p: "b", url: "/static" },
                  ],
                },
                {
                  q: "Paper 1 Q18",
                  year: 2023,
                  parts: [
                    { p: "a", url: "" },
                    { p: "b", url: "" },
                  ],
                },
                {
                  q: "Paper 2 Q15",
                  year: 2023,
                },
                {
                  q: "Paper 2 Q30",
                  year: 2023,
                },
                {
                  q: "Paper 1 Q15",
                  year: 2022,
                  parts: [
                    { p: "a", url: "" },
                    { p: "b(i)", url: "" },
                    { p: "b(ii)", url: "" },
                  ],
                },
                {
                  q: "Paper 1 Q16",
                  year: 2022,
                  parts: [
                    { p: "a", url: "" },
                    { p: "b", url: "" },
                    { p: "c", url: "" },
                  ],
                },
                {
                  q: "Paper 2 Q29",
                  year: 2022,
                },
              ].map(({ q, parts, year }) => (
                <Card
                  className="py-4"
                  isPressable
                  as={Link}
                  href={parts && parts[0].url}
                >
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-default-700 text-lg">
                      HKDSE Mathematics {year}
                    </p>
                    <h4 className="font-bold text-2xl">{q}</h4>
                  </CardHeader>
                  {parts && (
                    <CardFooter>
                      <div className="grid grid-cols-3 justify-between gap-2">
                        {parts.map(({ p, url }) => (
                          <Button
                            className="text-lg bg-primary-100"
                            as={Link}
                            href={url}
                          >
                            {p}
                          </Button>
                        ))}
                      </div>
                    </CardFooter>
                  )}
                </Card>
              ))}
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
