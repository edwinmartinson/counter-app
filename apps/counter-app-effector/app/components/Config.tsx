import { useState } from "react";
import { Form } from "react-router";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button, Input, Switch } from "package-ui";
import { useUnit } from "effector-react";
import { $counter, counterConfig } from "~/store/effector";

export default function Config() {
  let [isOpen, setIsOpen] = useState(false);
  let [isDelayed, setIsDelayed] = useState(false);

  const [counter, config] = useUnit([$counter, counterConfig]);

  const handle = {
    open: () => {
      if (counter.isLoading) return;

      setIsOpen(true);
      setIsDelayed(counter.isDelayed);
    },
    close: () => {
      setIsOpen(false);
    },
    submit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const max = formData.get("max") as string;
      const delay = formData.get("delay") as string;

      config({
        isDelayed,
        max: Number.parseInt(max),
        delay: Number.parseInt(delay),
      });

      handle.close();
    },
  };

  return (
    <>
      <Button variant="pilled" onClick={handle.open}>
        configure
      </Button>

      <Dialog className="relative z-50" open={isOpen} onClose={handle.close}>
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

              <Form
                id="config-form"
                onSubmit={handle.submit}
                className="space-y-2"
              >
                <Input
                  name="max"
                  type="number"
                  label="Max count"
                  defaultValue={counter.max}
                />
                <Input
                  name="delay"
                  type="number"
                  label="Delay (sec)"
                  defaultValue={counter.delay}
                />
                <Switch
                  name="delayActive"
                  label="Enable delay"
                  description="This will delay the operations."
                  checked={isDelayed}
                  onChange={() => setIsDelayed((state) => !state)}
                />
              </Form>
            </section>

            <div className="mt-8 flex gap-2">
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit" form="config-form">
                Save
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
