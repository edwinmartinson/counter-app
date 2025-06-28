import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { Form } from "react-router";
import { Button, Input, Switch } from "package-ui";

export default function Config() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="pilled" onClick={() => setIsOpen(true)}>
        configure
      </Button>

      <Dialog
        className="relative z-50"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DialogBackdrop className="bg-surface-primary/50 fixed inset-0 backdrop-blur-sm" />

        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel
            transition
            className="bg-surface-primary ring-surface-tertiary w-85 rounded-2xl p-4 ring transition duration-200 ease-in [--anchor-gap:--spacing(4)] data-closed:translate-y-[16px] data-closed:scale-90 data-closed:opacity-0"
          >
            <section className="space-y-4">
              <div className="space-y-2">
                <DialogTitle className="text-lg font-medium">
                  Configure counter
                </DialogTitle>
                <Description className="text-content-secondary text-sm">
                  Modify the fields below to change counter behaviour
                </Description>
              </div>

              <Form className="space-y-2">
                <Input type="number" label="Max count" />
                <Switch
                  label="Async Mode"
                  description="This enables async mode."
                />
              </Form>
            </section>

            <div className="mt-8 flex gap-2">
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsOpen(false)}>Save</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
