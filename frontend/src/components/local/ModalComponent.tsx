import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface IModalComponent {
    triggerButton: JSX.Element;
    footer?: JSX.Element;
    closeButton?: JSX.Element;
    confirmButton?: JSX.Element;
}

export function ModalComponent({
    triggerButton,
    footer,
    closeButton,
    confirmButton,
}: IModalComponent) {
    return (
        <Dialog>
            <DialogTrigger asChild>{triggerButton}</DialogTrigger>
            <DialogContent className="sm:max-w-[325px]">
                <DialogHeader className="my-2">
                    <DialogTitle>Remover motorista</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja remover o motorista 01?
                    </DialogDescription>
                </DialogHeader>
                {footer ? (
                    footer
                ) : (
                    <div className="flex justify-between">
                        <DialogPrimitive.Close>
                            {closeButton}
                        </DialogPrimitive.Close>
                        <DialogPrimitive.Close>
                            {confirmButton}
                        </DialogPrimitive.Close>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
