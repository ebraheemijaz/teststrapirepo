import React, { useState } from 'react'
import {
    ModalLayout,
    ModalBody, ModalHeader, ModalFooter,
    Typography, Button, Box, TextInput
} from '@strapi/design-system';
import { useForm, Controller } from "react-hook-form";
import { Alert } from '@strapi/design-system';

export default function AddModal({ setShowModal, handleCreateNew }) {
    const [showError, setShowError] = useState(false)
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            email: '',
        }
    });

    const onSubmit = data => {
        if (data.name.trim() === '' || data.email.trim() === '') {
            setShowError(true)
            return
        }
        handleCreateNew(data)
        setShowModal('')
    };

    return (
        <ModalLayout onClose={() => { setShowModal('') }} labelledBy="title">
            {showError && <Alert variant="danger" onClose={() => setShowError(false)} closeLabel="Close alert" title="Title">Fill all required fields.</Alert>}
            <form onSubmit={handleSubmit(onSubmit)}>

                <ModalHeader>
                    <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                        New Candidate
                    </Typography>
                </ModalHeader>
                <ModalBody>
                    <Box>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <TextInput
                                placeholder="Enter Name"
                                label="Name"
                                name="name"
                                {...field}
                                required
                            />}
                        />
                    </Box>
                    <Box>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <TextInput
                                placeholder="Enter Email"
                                label="Email"
                                name="email"
                                {...field}
                                required
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
                                Invite
                            </Button>
                        </>
                    }
                />
            </form>
        </ModalLayout>
    )
}
