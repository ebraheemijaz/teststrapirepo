import React, { useState } from 'react'
import {
    ModalLayout,
    ModalBody, ModalHeader, ModalFooter,
    Typography, Button, Box, TextInput
} from '@strapi/design-system';
import { useForm, Controller } from "react-hook-form";
import { Alert } from '@strapi/design-system';

export default function SendModal({ setShowModal, handleSend }) {
    const [showError, setShowError] = useState(false)
    const { control, handleSubmit } = useForm({
        defaultValues: {
            test: '',
        }
    });

    const onSubmit = data => {
        handleSend(data)
        setShowModal('')
    };

    return (
        <ModalLayout onClose={() => { setShowModal('') }} labelledBy="title">
            {showError && <Alert variant="danger" onClose={() => setShowError(false)} closeLabel="Close alert" title="Title">Fill all required fields.</Alert>}
            <form onSubmit={handleSubmit(onSubmit)}>

                <ModalHeader>
                    <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                        Send
                    </Typography>
                </ModalHeader>
                <ModalBody>
                    <Box>
                        <Controller
                            name="test"
                            control={control}
                            render={({ field }) => <TextInput
                                placeholder="Enter"
                                label="Test"
                                name="est"
                                {...field}
                            />}
                        />
                    </Box>
                </ModalBody>
                <ModalFooter
                    startActions={
                        <Button onClick={() => { setShowModal('') }} variant="tertiary">
                            Cancel
                        </Button>
                    }
                    endActions={
                        <>
                            <Button type="submit">
                                Send
                            </Button>
                        </>
                    }
                />
            </form>
        </ModalLayout>
    )
}
