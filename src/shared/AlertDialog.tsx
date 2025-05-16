import { AlertDialog, AlertDialogBody, AlertDialogCloseButton,
    AlertDialogContent, AlertDialogFooter, AlertDialogHeader, 
    AlertDialogOverlay, Button } 
from "@chakra-ui/react"
import { useRef } from "react"

interface IProps {
    isOpen: boolean;
    title:string;
    description:string;
    cancelText:string;
    okText:string;
    isloading:boolean
    onOkHandler:()=> void
    onClose: () => void;
}

export default function CustomAlertDialog({ cancelText="Cancel",description,title,okText='Ok',isOpen,isloading, onClose,onOkHandler }: IProps) {
    const cancelRef = useRef<HTMLButtonElement>(null); 
    
    return (
        
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay bg={"blackAlpha.500"} />

                <AlertDialogContent>
                    <AlertDialogHeader>{title}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                            {description}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            {cancelText}
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={onOkHandler} isLoading={isloading}>
                            {okText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
