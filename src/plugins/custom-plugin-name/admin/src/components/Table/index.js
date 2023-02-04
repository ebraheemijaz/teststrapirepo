import React, { useState } from 'react'
import {
    BaseHeaderLayout,
    Layout, Box, Button, Table, Thead,
    Tbody, Tr, Td, Th, TFooter, BaseCheckbox,
    IconButton, Typography, VisuallyHidden, Flex, LinkButton
} from '@strapi/design-system';
import Plus from '@strapi/icons/Plus';
import CarretDown from '@strapi/icons/CarretDown';

export default function CustomTable({ data, setShowModal, setData, checkAll, setCheckAll }) {
    const COL_COUNT = 4
    const ROW_COUNT = data.length


    return (
        <>
            <Box paddingTop={8} paddingLeft={8} paddingRight={8}>
                <Flex justifyContent={'flex-end'}>
                    <Button disabled={data.filter(e => e.checked).length === 0} onClick={() => setShowModal('SEND_MODAL')}>
                        Send
                    </Button>
                </Flex>
            </Box>
            <Box padding={8} background="neutral100">
                <Table colCount={COL_COUNT} rowCount={ROW_COUNT} footer={<TFooter onClick={() => setShowModal('ADD_MODAL')} icon={<Plus />}>Add</TFooter>}>
                    <Thead>
                        <Tr>
                            <Th>
                                <BaseCheckbox aria-label="Select all entries" value={checkAll} onValueChange={(val) => {
                                    setCheckAll(val)
                                    setData(data.map(e => ({ ...e, checked: val })))
                                }} />
                            </Th>
                            <Th>
                                <Typography variant="sigma">Name</Typography>
                            </Th>
                            <Th>
                                <Typography variant="sigma">Email</Typography>
                            </Th>
                            <Th action={<IconButton label="Sort on Title" icon={<CarretDown />} noBorder />}>
                                <Typography variant="sigma">Title</Typography>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((entry, index) =>
                            <Tr key={entry.email}>
                                <Td>
                                    <BaseCheckbox
                                        value={entry.checked}
                                        onValueChange={(val) => {
                                            data[index].checked = val
                                            const allTrue = data.every(
                                                value => value.checked === true
                                            );
                                            allTrue ? setCheckAll(true) : setCheckAll(false)
                                            setData([...data])
                                        }}
                                    />
                                </Td>
                                <Td>
                                    <Typography textColor="neutral800">{entry.firstName}</Typography>
                                </Td>
                                <Td>
                                    <Typography textColor="neutral800">{entry.email}</Typography>
                                </Td>
                                <Td>
                                    <Typography textColor="neutral800">{entry.title}</Typography>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Box>
        </>
    )
}
