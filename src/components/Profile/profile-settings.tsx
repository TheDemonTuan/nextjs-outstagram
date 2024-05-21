import { useModalStore } from '@/stores/modal-store';
import { Link } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React from 'react'


export const ProfileSettingModalKey = "ProfileSettings";

const ProfileSettings = () => {
    const { modalClose, modalKey } = useModalStore();
    return (
        <Modal isOpen={modalKey === ProfileSettingModalKey} onOpenChange={modalClose} hideCloseButton={true}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody className="mt-3 mb-3 cursor-pointer items-center">
                            <Link href="/">
                                <p className="text-black">
                                    Apps and websites
                                </p>

                            </Link>
                            <hr className="w-full border-gray-300" />
                            <Link href="/">
                                <p className="text-black">
                                    QR code
                                </p>
                            </Link>
                            <hr className="w-full border-gray-300" />
                            <Link href="/">
                                <p className="text-black">
                                    Notifications
                                </p>
                            </Link>
                            <hr className="w-full border-gray-300" />
                            <Link href="/">
                                <p className="text-black">
                                    Settings and privacy
                                </p>
                            </Link>
                            <hr className="w-full border-gray-300" />
                            <Link href="/">
                                <p className="text-black">
                                    Meta Verfied
                                </p>
                            </Link>
                            <hr className="w-full border-gray-300" />
                            <Link href="/">
                                <p className="text-black">
                                    Supervision
                                </p>
                            </Link>
                            <hr className="w-full border-gray-300" />
                            <Link href="/" >
                                <p className="text-danger">
                                    Log Out
                                </p>
                            </Link>

                            <hr className="w-full border-gray-300" />
                            <Link onPress={onClose}>
                                <p className="text-black">
                                    Cancel
                                </p>
                            </Link>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>

    )
}

export default ProfileSettings