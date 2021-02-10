import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Form, Button, Container, Row, Col, Table, Modal  } from "react-bootstrap/"
import InboxIcon from '@material-ui/icons/Inbox';
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios"
var convert = require('xml-js');

require('dotenv').config({
    allowEmptyValues: true,
    path: '.'
})

const TableMain = styled(Table)({
    boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3)'
})

const CustomButton = styled(Button)({
    marginBottom: "10px",
    marginLeft: "5px",
})

const Required = styled.span({
    color: "red",
})

const TableData = styled.td({
    padding: "5px", 
    fontSize: "14px",
    textAlign: "center"
})


export default function CustomLinks({ value, disableAdd, adminLoad }) {

    // getting id fo deactivation
    const [deactivateID, setDeactivateID] = useState(0)

    //showing and closing of update modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    //showing and closing of deactivate modal
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const handleCloseDeactivateModal = () => setShowDeactivateModal(false);
    const handleShowDeactivateModal = () => setShowDeactivateModal(true)

    //showing and closing of add modal
    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);


    //getting and setting table items
    const [tableItems, setTableItems] = useState([]);

    const [customLinkData, setCustomLinkData] = useState({
        id: 0,
        icon: "",
        shortname: "",
        longname: "",
        url: "",
        team_open: "",
        team_zip: "",
        team_age: "",
        team_gender: "",
        team_level : "",
        team_season: ""
    })

    const [ newCustomLinkData, setNewCustomLinkData] = useState({
        icon: "",
        shortname: "",
        longname: "",
        url: "",
        team_open: "",
        team_zip: "",
        team_age: "",
        team_gender: "",
        team_level : "",
        team_season: ""
    })

    //Get Customlink data by ID
    useEffect(() => {

                let userID = value
                const url = process.env.REACT_APP_API_URL+"/customlink/get/"+userID
                fetch(url)
                .then(res => res.json())
                .then(res=>{
    
                    if (res.success) {
                        const data = res.data
                        setTableItems(data)
                    }
                    else {
                    alert("Error Web Service!")
                    }
    
                })
                .catch(err => {
                    console.log(err)
                })
        
        
    }, [value])
    

    //For updating of Specific customlink
    function handleUpdateCustomLink(){

        var options = {compact: true, ignoreComment: true, spaces: 4, ignoreAttributes: "<root>"};
        var result = convert.json2xml(JSON.stringify({
            team_open: customLinkData.team_open,
            team_age: customLinkData.team_age,
            team_gender: customLinkData.team_gender,
            team_level: customLinkData.team_level,
            team_season: customLinkData.team_season,
            team_zip: customLinkData.team_zip,
        }), options);

        //  get parameter id
        let Id = customLinkData.id
        // url 
        const baseUrl = process.env.REACT_APP_API_URL+"/customlink/update/"+Id

        const datapost = {
            clubimpact_id: value,
            icon: customLinkData.icon,
            shortname: customLinkData.shortname,
            longname: customLinkData.longname,
            url: customLinkData.url,
            costum_fields: result
        }

        axios.post(baseUrl,datapost)
        .then(res=>{
             if (res.data.success===true) {
                 alert(res.data.message)
                 setTableItems(res.data.data)
                 setCustomLinkData({
                    id: 0,
                    icon: "",
                    shortname: "",
                    longname: "",
                    url: "",
                    team_open: "",
                    team_zip: "",
                    team_age: "",
                    team_gender: "",
                    team_level : "",
                    team_season: ""
                })
                handleCloseUpdateModal()
             }
             else {
                 alert("Error")
             }
 
         }).catch(error=>{
             alert("Error 34 "+error)
         })
        
    }

    //For Adding a Specific customlink
    function handleAddCustomLink(){

        let club_id = value
        const baseUrl = process.env.REACT_APP_API_URL+"/customlink/create"

        var options = {compact: true, ignoreComment: true, spaces: 4, ignoreAttributes: "<root>"};
        var result = convert.json2xml(JSON.stringify({
            team_open: newCustomLinkData.team_open,
            team_age: newCustomLinkData.team_age,
            team_gender: newCustomLinkData.team_gender,
            team_level: newCustomLinkData.team_level,
            team_season: newCustomLinkData.team_season,
            team_zip: newCustomLinkData.team_zip,
        }), options);

        const datapost = {
            clubimpact_id: club_id,
            icon : newCustomLinkData.icon,
            shortname : newCustomLinkData.shortname,
            longname : newCustomLinkData.longname,
            url : newCustomLinkData.url,
            deleted : 0,
            costum_fields: result
        }

        if ((newCustomLinkData.shortname=="" || newCustomLinkData.longname=="") || newCustomLinkData.url==""){
            alert("Please Fill Up Important Fields!")
        } else{
            axios.post(baseUrl,datapost)
            .then(res=>{
                if (res.data.success===true) {
                    alert(res.data.message)
                    setTableItems( tableItems => [...tableItems, {
                        id: res.data.data.id,
                        clubimpact_id: club_id,
                        icon : newCustomLinkData.icon,
                        shortname : newCustomLinkData.shortname,
                        longname : newCustomLinkData.longname,
                        url : newCustomLinkData.url,
                        deleted : 0,
                        costum_fields: result
                    }])
                    setNewCustomLinkData({
                        icon: "",
                        shortname: "",
                        longname: "",
                        url: "",
                        team_open: "",
                        team_zip: "",
                        team_age: "",
                        team_gender: "",
                        team_level : "",
                        team_season: ""
                    })
                    handleCloseAddModal()
                } else {
                    alert(res.data.message)
                }
            }).catch(error=>{
                alert("Error 34 "+error)
            })
        }

    }

    //For deactivation of Specific customlink
    function handleDeactivate(){

        let id = deactivateID
        const baseUrl = process.env.REACT_APP_API_URL+"/customlink/deactivate/"+id

        const datapost = {
            deleted: 1,
            clubimpact_id: value
        }

        axios.post(baseUrl,datapost)
        .then(res=>{
             if (res.data.success===true) {
                alert(res.data.message)
                setTableItems(res.data.data)
                handleCloseDeactivateModal()
             }
             else {
                 alert("Error")
             }
 
         }).catch(error=>{
             alert("Error 34 "+error)
         })
    }
       

    return (
        <div>
            <Container style={{ display: adminLoad ? "none" : "block" }}>
                <Row>
                    <CustomButton variant="outline-primary" onClick={handleShowAddModal} disabled={disableAdd}>Add New Custom Link</CustomButton>
                    <TableMain striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th style={{width: "60px"}}>Icon</th>
                                <th >Name</th>
                                <th >Description</th>
                                <th >Link</th>
                                <th style={{width: "60px"}}>Active</th>
                                <th style={{width: "320px"}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableItems === undefined || tableItems.length == 0 ? 
                                <tr>
                                    <td colSpan="6" style={{ fontWeight: "500", fontSize: "18px", textAlign: "center" }}>No Data Available <InboxIcon/></td>
                                </tr> : 
                                tableItems.map(tableItem => (
                                    <tr key={tableItem.id} value={tableItem.id}>
                                        <TableData>{ tableItem.icon }</TableData>
                                        <TableData>{ tableItem.shortname.replace(/%20|"|&frasl;/g,' ').replace(/&amp;/g,'&') }</TableData>
                                        <TableData>{ tableItem.longname.replace(/%20|"|&frasl;/g,' ').replace(/&amp;/g,'&') }</TableData>
                                        <TableData>{ tableItem.url.replace(/&amp;frasl;|&frasl;/g,'/') }</TableData>
                                        <TableData>{ tableItem.deleted===0 ? "Active" : "Inactive" }</TableData>
                                        <TableData>
                                            <CustomButton variant="outline-info" size="sm" 
                                            onClick={
                                                e => {

                                                    //xml to json
                                                    const xmlCustomLinkText = "<root>"+tableItem.costum_fields+"</root>"
                                                    var xmlCustomLinkResult = convert.xml2json(xmlCustomLinkText, {compact: true, spaces: 4});
                                                    const xmlCustomLinkJSON = JSON.parse(xmlCustomLinkResult)
                                                    const xmlCustomLink = xmlCustomLinkJSON.root

                                                    setCustomLinkData({
                                                        id: tableItem.id,
                                                        icon: tableItem.icon,
                                                        shortname: tableItem.shortname,
                                                        longname: tableItem.longname,
                                                        url: tableItem.url,
                                                        team_open:  xmlCustomLink.team_open === undefined || tableItems.length == 0 ? "" : xmlCustomLink.team_open._text,
                                                        team_zip: xmlCustomLink.team_zip === undefined || tableItems.length == 0 ? "" : xmlCustomLink.team_zip._text,
                                                        team_age: xmlCustomLink.team_age === undefined || tableItems.length == 0 ? "" : xmlCustomLink.team_age._text,
                                                        team_gender: xmlCustomLink.team_gender === undefined || tableItems.length == 0 ? "" : xmlCustomLink.team_gender._text,
                                                        team_level : xmlCustomLink.team_level === undefined || tableItems.length == 0 ? "" : xmlCustomLink.team_level._text,
                                                        team_season: xmlCustomLink.team_season === undefined || tableItems.length == 0 ? "" : xmlCustomLink.team_season._text,
                                                    })
                                                    
                                                    handleShowUpdateModal()
                                                }
                                            }
                                            ><EditIcon/></CustomButton>
                                            <CustomButton variant="outline-danger" size="sm"
                                                onClick={
                                                    e => {
                                                        setDeactivateID(tableItem.id)
                                                        handleShowDeactivateModal()
                                                    }
                                                }
                                            ><DeleteForeverIcon/></CustomButton>
                                        </TableData>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </TableMain>
                </Row>
            </Container>
                {/* Add New CustomLin Modal */}
                <Modal size="lg" show={showAddModal} onHide={handleCloseAddModal} animation={true}>
                    <Modal.Header closeButton={CloseIcon}>
                    <Modal.Title>Add New Custom Link</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="Icon">
                                        <Form.Label>Icon <Required>*</Required></Form.Label>
                                        <Form.Control as="select" value={newCustomLinkData.icon} 
                                        onChange={
                                            e => setNewCustomLinkData({ ...newCustomLinkData, icon: e.target.value})
                                        }>
                                            <option value=""></option>
                                            <option value="1">Shopping</option>
                                            <option value="2">Website</option>
                                            <option value="3">Facebook</option>
                                            <option value="4">Twitter</option>
                                            <option value="5">Merchandise</option>
                                            <option value="6">Tag</option>
                                            <option value="7">Settings</option>
                                            <option value="8">Star</option>
                                            <option value="9">Diamond</option>
                                            <option value="10">Pinterest</option>
                                            <option value="11">Youtube</option>
                                            <option value="12">Instagram</option>
                                            <option value="13">FAQ</option>
                                            <option value="14">News</option>
                                            <option value="15">Calendar</option>
                                            <option value="16">Maps</option>
                                            <option value="17">Videos</option>
                                            <option value="18">Merchandize</option>
                                            <option value="19">Signal</option>
                                            <option value="20">Team</option>
                                        </Form.Control>
                                        <Form.Text className="text-muted">
                                            Please Select One in Icon Field.
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group >
                                        <Form.Label>Name <Required>*</Required></Form.Label>
                                        <Form.Control type="text" value={newCustomLinkData.shortname} 
                                        onChange={
                                            e => setNewCustomLinkData({ ...newCustomLinkData, shortname: e.target.value })
                                        }/>
                                        <Form.Text className="text-muted">
                                            Please Fill Up Description Field.
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.Label>Description <Required>*</Required></Form.Label>
                                        <Form.Control type="text" value={newCustomLinkData.longname} 
                                        onChange={
                                            e => setNewCustomLinkData({ ...newCustomLinkData, longname: e.target.value })
                                        }/>
                                        <Form.Text className="text-muted">
                                            Please Fill Up Name Field.
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group >
                                        <Form.Label>Link <Required>*</Required></Form.Label>
                                        <Form.Control type="text" value={newCustomLinkData.url} 
                                        onChange={
                                            e => setNewCustomLinkData({ ...newCustomLinkData, url: e.target.value })
                                        }/>
                                        <Form.Text className="text-muted">
                                            Please Fill Up Name Field.
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseAddModal}>Close</Button>
                        <Button variant="primary" onClick={handleAddCustomLink}>Save</Button>
                    </Modal.Footer>
                </Modal>
                {/* Add New CustomLin Modal */}
                {/* Update Modal*/}
                <Modal size="lg" show={showUpdateModal} onHide={handleCloseUpdateModal} animation={true}>
                    <Modal.Header closeButton={CloseIcon}>
                        <Modal.Title>Edit Selected CustomLink</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col xs={12}>
                                    <Form.Group >
                                        <Form.Label>Icon</Form.Label>
                                        <Form.Control as="select" value={customLinkData.icon} 
                                        onChange={
                                            e => setCustomLinkData({ ...customLinkData, icon: e.target.value})
                                        }>
                                            <option value=""></option>
                                            <option value="1">Shopping</option>
                                            <option value="2">Website</option>
                                            <option value="3">Facebook</option>
                                            <option value="4">Twitter</option>
                                            <option value="5">Merchandise</option>
                                            <option value="6">Tag</option>
                                            <option value="7">Settings</option>
                                            <option value="8">Star</option>
                                            <option value="9">Diamond</option>
                                            <option value="10">Pinterest</option>
                                            <option value="11">Youtube</option>
                                            <option value="12">Instagram</option>
                                            <option value="13">FAQ</option>
                                            <option value="14">News</option>
                                            <option value="15">Calendar</option>
                                            <option value="16">Maps</option>
                                            <option value="17">Videos</option>
                                            <option value="18">Merchandize</option>
                                            <option value="19">Signal</option>
                                            <option value="20">Team</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" value={customLinkData.shortname.replace(/%20|"/g,' ')} 
                                        onChange={
                                            e => setCustomLinkData({ ...customLinkData, shortname: e.target.value })
                                        }/>
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" value={customLinkData.longname.replace(/%20|"/g,' ')} 
                                        onChange={
                                            e => setCustomLinkData({ ...customLinkData, longname: e.target.value })
                                        }/>
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group >
                                        <Form.Label>Link</Form.Label>
                                        <Form.Control type="text" value={customLinkData.url.replace(/&amp;frasl;|&frasl;/g,"/")} 
                                        onChange={
                                            e => setCustomLinkData({ ...customLinkData, url: e.target.value })
                                        }/>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group >
                                        <Form.Label>Team Age</Form.Label>
                                        <Form.Control as="select" value={customLinkData.team_age} 
                                        onChange={
                                            e => setCustomLinkData({ ...customLinkData, team_age: e.target.value})
                                        }>
                                            <option value=""></option>
                                            <option value="1">U06</option>
                                            <option value="2">U07</option>
                                            <option value="3">U08</option>
                                            <option value="4">U09</option>
                                            <option value="5">U10</option>
                                            <option value="6">U11</option>
                                            <option value="7">U12</option>
                                            <option value="8">U13</option>
                                            <option value="9">U14</option>
                                            <option value="10">U15</option>
                                            <option value="11">U16</option>
                                            <option value="12">U17</option>
                                            <option value="13">U18</option>
                                            <option value="14">U19</option>
                                            <option value="15">U20</option>
                                            <option value="16">U21</option>
                                            <option value="17">OVR</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group >
                                        <Form.Label>Team Gender</Form.Label>
                                        <Form.Control as="select" value={customLinkData.team_gender} 
                                        onChange={
                                            e => setCustomLinkData({ ...customLinkData, team_gender: e.target.value})
                                        }>
                                            <option value=""></option>
                                            <option value="1">B</option>
                                            <option value="2">G</option>
                                            <option value="3">C</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group >
                                        <Form.Label>Club Zip</Form.Label>
                                        <Form.Control type="text" value={customLinkData.team_zip==null ? "" : customLinkData.team_zip.replace(/%20|"/g,' ')} 
                                        onChange={
                                            e => setCustomLinkData({ ...customLinkData, team_zip: e.target.value })
                                        }/>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group >
                                        <Form.Label>Team Level</Form.Label>
                                        <Form.Control as="select" value={customLinkData.team_level} 
                                        onChange={
                                            e => setCustomLinkData({ ...customLinkData, team_level: e.target.value})
                                        }>
                                            <option value=""></option>
                                            <option value="1">R</option>
                                            <option value="2">C</option>
                                            <option value="3">P</option>
                                            <option value="4">E</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group >
                                        <Form.Label>Season</Form.Label>
                                        <Form.Control as="select" value={customLinkData.team_season} 
                                        onChange={
                                            e => setCustomLinkData({ ...customLinkData, team_season: e.target.value})
                                        }>
                                            <option value=""></option>
                                            <option value="1">F</option>
                                            <option value="2">S</option>
                                            <option value="3">Y</option>
                                            <option value="4">U</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group >
                                        <Form.Label>Open</Form.Label>
                                        <Form.Control type="text" value={customLinkData.team_open==null ? "" : customLinkData.team_open.replace(/%20|"/g,' ')} 
                                        onChange={
                                            e => setCustomLinkData({ ...customLinkData, team_open: e.target.value })
                                        }/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseUpdateModal}>Close</Button>
                        <Button variant="primary" onClick={handleUpdateCustomLink}>Save</Button>
                    </Modal.Footer>
                </Modal>
                {/* Update Modal*/}
                {/* Modal for deactivation */}
                <Modal show={showDeactivateModal} onHide={handleCloseDeactivateModal}>
                    <Modal.Header closeButton={CloseIcon}>
                        <Modal.Title>Warning!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you really want to deactivate this custom link?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseDeactivateModal}>No</Button>
                        <Button variant="primary" onClick={handleDeactivate}>Yes</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal for deactivation */}
                
        </div>
    );
}