"use client";
import React from 'react'
import { Link } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useModalStore } from '@/stores/modal-store';


export const MoreOptionsModalKey = "MoreOptions";

const MoreOptions = () => {
    const { modalClose, modalKey } = useModalStore();
    return (

        <Modal isOpen={modalKey === MoreOptionsModalKey} onOpenChange={modalClose} hideCloseButton={true} >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody className="mt-3 mb-3 cursor-pointer items-center">
                            <Link href="/">
                                <p className="text-danger font-bold">
                                    Report
                                </p>

                            </Link>
                            <hr className="w-full border-gray-300" />
                            <Link href="/">
                                <p className="text-danger font-bold">
                                    Unfollow
                                </p>
                            </Link>
                            <hr className="w-full border-gray-300" />
                            <Link href="/">
                                <p className="text-black">
                                    Add to favorites
                                </p>
                            </Link>
                            <hr className="w-full border-gray-300" />
                            <Link href="/">
                                <p className="text-black">
                                    Go to post
                                </p>
                            </Link>
                            <hr className="w-full border-gray-300" />
                            <Link href="/">
                                <p className="text-black">
                                    Share to ...
                                </p>
                            </Link>
                            <hr className="w-full border-gray-300" />
                            <Link href="/">
                                <p className="text-black">
                                    Copy link
                                </p>
                            </Link>
                            <hr className="w-full border-gray-300" />
                            <Link href="/" >
                                <p className="text-black">
                                    Embed
                                </p>
                            </Link>
                            <hr className="w-full border-gray-300" />
                            <Link href="/" >
                                <p className="text-black">
                                    About this account
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

export default MoreOptions