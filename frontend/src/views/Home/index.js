import React, { Component } from 'react'
import * as services from '../../Services'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modalVisible: false,
            newData: [],
            newName: '',
            newAddr: '',
            newOrder: '',
            newTime: '',
        }

    }
    async componentDidMount() {
        this.getOrder();
        console.log(this.state.data)
    }

    getOrder = async () => {
        console.log('get')
        this.setState({ data: await services.getOrders() })
    }


    deleteOrders = async (id) => {
        await services.deleteOrders(id)
        await this.getOrder();
    }
    updateOrders = async (id, e) => {
        this.setState({
            newName: e.name,
            newAddr: e.Address,
            newTime: e.Time,
            newOrder: e.order,
            idToUpdate: id
        })

        this.handleModal()
    }

    onUpdateSubmited = async () => {
        const newData = {
            name: this.state.newName,
            Address: this.state.newAddr,
            Time: this.state.newTime,
            order: this.state.newOrder
        }
      
        console.log(newData)
        await services.updateOrders(this.state.idToUpdate, newData)
        await this.getOrder();
        this.handleModal();
    }
    renderTable = () => {
        const { data } = this.state;
        if (data) {
            return data.map((e, i) => {
                return <div key={i} id="info2" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <div  style={{ width: '13.5%' }} > {e.id}</div>
                    <div  style={{ width: '13.5%' }} > {e.name}</div>
                    <div  style={{ width: '13%' }} > {e.Address}</div>
                    <div  style={{ width: '13.3%' }} > {e.Time}</div>
                    <div  style={{ width: '13.5%' }} > {e.order}</div>
                    <Button variant="outline-danger" onClick={() => this.deleteOrders(e.id)} style={{ width: '7%' }} > ลบ</Button>
                    <Button variant="outline-warning" onClick={() => this.updateOrders(e.id, e)} style={{ width: '7%' }} > แก้ไข</Button>
                </div>
            })
        }
    }
    onSubmit = async () => {
        const { name, Address, Time, order } = this.state;
        const newData = {
            name, Address, Time, order
        }
        await services.createOrders(newData)
        await this.getOrder();
    }
    handleModal = (id, e) => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }
    render() {
        return (
            <div>
                <div id="inputtap" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    <input value={this.state.address} onChange={e => this.setState({ Address: e.target.value })} />
                    <input value={this.state.time} onChange={e => this.setState({ Time: e.target.value })} />
                    <input value={this.state.order} onChange={e => this.setState({ order: e.target.value })} />
                    <Button variant="primary" onClick={() => this.onSubmit()}>submit</Button>
                </div>
                <div id="info">
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <div id = "id1" style={{ width: '13%'}} > id</div>
                        <div id = "name1" style={{ width: '15%' }} > name</div>
                        <div id = "address1" style={{ width: '14%' }} > address</div>
                        <div id = "time1" style={{ width: '14%' }} > time</div>
                        <div id = "order1" style={{ width: '15%' }} > order</div>
                    </div>
                </div>
                {this.renderTable()}
                <Modal show={this.state.modalVisible} onHide={() => this.handleModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>แก้ไขข้อมูล</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={e => this.setState({ newName: e.target.value })} value={this.state.newName} type="text" placeholder="enter name" />

                                <Form.Label>Address</Form.Label>
                                <Form.Control onChange={e => this.setState({ newAddr: e.target.value })} value={this.state.newAddr} type="text" placeholder="enter address" />

                                <Form.Label>Time</Form.Label>
                                <Form.Control onChange={e => this.setState({ newTime: e.target.value })} value={this.state.newTime} type="text" placeholder="enter time" />

                                <Form.Label>Order</Form.Label>
                                <Form.Control onChange={e => this.setState({ newOrder: e.target.value })} value={this.state.newOrder} type="text" placeholder="enter order" />

                            </Form.Group>
                        </Form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModal()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.onUpdateSubmited()}>
                            Save Changes
                         </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}


