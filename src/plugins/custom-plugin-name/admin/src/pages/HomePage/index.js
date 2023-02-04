import React, { useState, useEffect } from 'react';
import pluginId from '../../pluginId';
import {
  BaseHeaderLayout,
  Layout, Box, Button, Loader
} from '@strapi/design-system';
import AddModal from '../../components/AddModal';
import Table from '../../components/Table';
import SendModal from '../../components/SendModal';

const API_URL = "http://demo5648508.mockable.io/candidates"

const HomePage = () => {
  const [showModal, setShowModal] = useState('')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([]);
  const [checkAll, setCheckAll] = useState(false)


  const getCandidates = async () => {
    setLoading(true)
    let response = await fetch(API_URL)
    response = await response.json()
    setData(response)
    setLoading(false)
  }

  const handleCreateNew = async (apiData) => {
    let response = await fetch(API_URL, { method: 'POST', body: JSON.stringify(apiData) })
    response = await response.json()
    setData(response)
  }

  const handleSend = async (apiData) => {
    apiData.emails = data.filter(e => e.checked).map(e => e.email)
    let response = await fetch(API_URL, { method: 'POST', body: JSON.stringify(apiData) })
    response = await response.json()
    setCheckAll(false)
    setData(response)
  }

  useEffect(() => {
    getCandidates()
  }, [])

  return (
    <Layout>
      <Box background="neutral100">
        <BaseHeaderLayout
          title="Custom Plugin Name"
          as="h2"
        />
      </Box>
      {loading && (
        <Box padding={8} background="neutral100">
          <Loader >Loading content...</Loader>
        </Box>
      )}
      {!loading && (
        <Table
          data={data}
          setData={setData}
          setShowModal={setShowModal}
          checkAll={checkAll}
          setCheckAll={setCheckAll} />
      )}
      {showModal === 'ADD_MODAL' && <AddModal setShowModal={setShowModal} handleCreateNew={handleCreateNew} />}
      {showModal === 'SEND_MODAL' && <SendModal setShowModal={setShowModal} handleSend={handleSend} />}
    </Layout>
  );
};

export default HomePage;
