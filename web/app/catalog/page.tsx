"use client";

import { CameraIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
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
        <CardHeader className="bg-primary-50">
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
              placeholder="Type to search..."
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
          <div className="grid grid-cols-4">
            {done &&
              ["Paper 1 Q17"].map((v) => (
                <Card
                  className="py-4"
                  isPressable
                  as={Link}
                  href="/demo/Math_2023_17_a"
                >
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-default-700 text-lg">
                      HKDSE Mathematics
                    </p>
                    <h4 className="font-bold text-2xl">{v}</h4>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
