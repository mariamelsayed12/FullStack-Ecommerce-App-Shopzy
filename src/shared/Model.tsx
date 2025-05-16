import { Button, Modal,
        ModalBody, ModalCloseButton,
        ModalContent, ModalFooter, ModalHeader,
        ModalOverlay }
        from "@chakra-ui/react"
import {  ReactNode } from "react"

        interface IProps {
            title:string
            okText:string
            CancelText:string
            children:ReactNode
            isOpen: boolean;
            isloading:boolean
            onOkClick:()=> void
            onClose: () => void;
        }
        

function CustomeModel({isOpen,onClose,title,okText="Done",children,CancelText="Cancel" ,onOkClick,isloading}:IProps) {
    return (
        <>
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='slideInBottom'
        >
            
            <ModalOverlay bg={"blackAlpha.500"} />
            <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {children}
            </ModalBody>
            <ModalFooter>
                <Button  mr={3} onClick={onClose}>
                    {CancelText}
                </Button>
                <Button variant='solid' colorScheme="blue"  isLoading={isloading} onClick={onOkClick}>{okText}</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    )
}

export default CustomeModel