import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Form, Button, Container, Row, Col, ProgressBar } from "react-bootstrap/"
import { AdminNavbar, Drawer } from "@molecule"
import { Link, useLocation } from "react-router-dom"
import axios from 'axios';
var convert = require('xml-js');

require('dotenv').config({
    allowEmptyValues: true,
    path: '.'
})

const Content = styled.div({
    height: "auto",
})

const Required = styled.span({
  color: "red",
})


const DataContainer = styled.div(({ theme }) => ({
    backgroundColor: "#fff",
    padding: "20px 30px",
    boxShadow: theme.shadows.default,
    marginTop: "20px",
}))

const FormLabel = styled.span({
    fontSize: "1rem",
    color: "#717171",
    fontWeight: 600,
    marginTop: "15px",
    marginRight: "20px",
    display: "block",
})

const Title = styled.h1({
    fontSize: "2rem",
    color: "#717171",
    fontWeight: 400,
    marginBottom: "30px",
})

const Checkbox = styled(Form.Check)({
    marginTop: "5px",
    marginLeft: "1rem",
    '& input[type=checkbox]': {
        height: "25px",
        width: "25px",
    }
})

const SaveButton = styled(Button)({
    margin: "30px auto 40px auto",
})

const FileLabel = styled.label({
    margin: "15px 0 0 3%",
    width: "94%"
})

const UpperCol = styled(Col)({
    display: "flex",
    alignItems: "baseline",
    marginTop: "20px",
})

const ProgressBarData = styled(ProgressBar)({
    marginTop: "10px",
})

const ImageCol = styled.div({
    height: "140px",
    width: "100%",
    boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3)'
})

const HeaderImageCol = styled.div({
    height: "180px",
    marginTop: "-90px",
    width: "100%",
    boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3)'
})

export default function NewImpact() {

    const [newData, setNewData] = useState({

        clientsname: "",
        appcode: "",

        welcomemessage: "",
        welcomelink: "",
        btnlabel1: "",
        btnlink1: "",
        btnlabel2: "",
        btnlink2: "",

        menuicon1: "",
        menutitle1: "",
        menulink1: "",

        menuicon2: "",
        menutitle2: "",
        menulink2: "",

        menuicon3: "",
        menutitle3: "",
        menulink3: "",

        menuicon4: "",
        menutitle4: "",
        menulink4: "",
        menucmenu4: true,

        menuicon5: "",
        menutitle5: "",
        menulink5: "",
        menucmenu5: true,

        menuicon6: "",
        menutitle6: "",
        menulink6: "",
        menucmenu6: true,

        sponsor: "",
        sponsorbtn: true,

    })

    const [newxml, setNewxml] = useState({

        logo: "",
        publickey: "",
        cmd_button_mode: "",
        cmd_url: "",
        cmd_text: "",
        customtext: "",
        customurl: "",

        offers1: "",
        offers2: "",
        offers3: "",
        offers4: "",
        offers5: "",
        offers6: "",

        mainbtn1: {
            title: "",
            url: ""
        },

        mainbtn2: {
            title: "",
            url: ""
        },

        menubtn1: {
            icon: "",
            title: "",
            url: ""
        },

        menubtn2: {
            icon: "",
            title: "",
            url: ""
        },

        menubtn3: {
            icon: "",
            title: "",
            url: ""
        },

        menubtn4: {
            icon: "",
            title: "",
            url: "",
            cmenu: "false"
        },

        menubtn5: {
            icon: "",
            title: "",
            url: "",
            cmenu: "false"
        }, 
        
        menubtn6: {
            icon: "",
            title: "",
            url: "",
            cmenu: "false"
        },

        couponbtn: {
            icon: "",
            title: "",
            showbtn: "true",
            coupondata : {
                sponsorheader: "",
                image1: "",
                url1: "",
                image2: "",
                url2: "",
                image3: "",
                url3: "",
                image4: "",
                url4: "",
                image5: "",
                url5: "",
                image6: "",
                url6: "",
            }
        }

    })

    //setting and getting the uploaded file/image
    const [file, setFile] = useState({
        image1:"",
        image2:"", 
        image3:"",
        image4:"",
        image5:"",
        image6:"",
	    imageHeader:"",
    })

    const [fileDateHeader , setFileDateHeader] = useState("") 
    const [fileDate1 , setFileDate1] = useState("")
    const [fileDate2 , setFileDate2] = useState("")
    const [fileDate3 , setFileDate3] = useState("")
    const [fileDate4 , setFileDate4] = useState("")
    const [fileDate5 , setFileDate5] = useState("")
    const [fileDate6 , setFileDate6] = useState("")

    const [filekey, setFileKey] = useState("")

    const [uploadPercentage1 , setUploadPercentage1] = useState(0)
    const [uploadPercentage2 , setUploadPercentage2] = useState(0)
    const [uploadPercentage3 , setUploadPercentage3] = useState(0)
    const [uploadPercentage4 , setUploadPercentage4] = useState(0)
    const [uploadPercentage5 , setUploadPercentage5] = useState(0)
    const [uploadPercentage6 , setUploadPercentage6] = useState(0)
    const [uploadPercentageHeader , setUploadPercentageHeader] = useState(0)

    const [displayProgressBar, setDisplayProgressBar] = useState("none")

     //setting and getting the preview in uploaded file/image
     const [previewImage, setPreviewImage] = useState({
        previewImage1:"",
        previewImage2:"", 
        previewImage3:"",
        previewImage4:"",
        previewImage5:"",
        previewImage6:"",
	    previewImageHeader:"",
    })

    const [displayPreview, setDisplayPreview] = useState("none")

    const [appCodeData, setAppCodeData] = useState(false)


    function handleClear(){

        setNewData({

            clientsname: "",
            appcode: "",
    
            welcomemessage: "",
            welcomelink: "",
            btnlabel1: "",
            btnlink1: "",
            btnlabel2: "",
            btnlink2: "",
    
            menuicon1: "",
            menutitle1: "",
            menulink1: "",
    
            menuicon2: "",
            menutitle2: "",
            menulink2: "",
    
            menuicon3: "",
            menutitle3: "",
            menulink3: "",
    
            menuicon4: "",
            menutitle4: "",
            menulink4: "",
            menucmenu4: true,
    
            menuicon5: "",
            menutitle5: "",
            menulink5: "",
            menucmenu5: true,
    
            menuicon6: "",
            menutitle6: "",
            menulink6: "",
            menucmenu6: true,
    
            sponsor: "",
            sponsorbtn: true,
    
        })

        setNewxml({

            logo: "",
            publickey: "",
            cmd_button_mode: "",
            cmd_url: "",
            cmd_text: "",
            customtext: "",
            customurl: "",
    
            offers1: "",
            offers2: "",
            offers3: "",
            offers4: "",
            offers5: "",
            offers6: "",
    
            mainbtn1: {
                title: "",
                url: ""
            },
    
            mainbtn2: {
                title: "",
                url: ""
            },
    
            menubtn1: {
                icon: "",
                title: "",
                url: ""
            },
    
            menubtn2: {
                icon: "",
                title: "",
                url: ""
            },
    
            menubtn3: {
                icon: "",
                title: "",
                url: ""
            },
    
            menubtn4: {
                icon: "",
                title: "",
                url: "",
                cmenu: "false"
            },
    
            menubtn5: {
                icon: "",
                title: "",
                url: "",
                cmenu: "false"
            }, 
            
            menubtn6: {
                icon: "",
                title: "",
                url: "",
                cmenu: "false"
            },
    
            couponbtn: {
                icon: "",
                title: "",
                showbtn: "true",
                coupondata : {
                    sponsorheader: "",
                    image1: "",
                    url1: "",
                    image2: "",
                    url2: "",
                    image3: "",
                    url3: "",
                    image4: "",
                    url4: "",
                    image5: "",
                    url5: "",
                    image6: "",
                    url6: "",
                }
            }
    
        })

        setDisplayPreview("none")

        URL.revokeObjectURL(previewImage.previewImage1)
        URL.revokeObjectURL(previewImage.previewImage2)
        URL.revokeObjectURL(previewImage.previewImage3)
        URL.revokeObjectURL(previewImage.previewImage4)
        URL.revokeObjectURL(previewImage.previewImage5)
        URL.revokeObjectURL(previewImage.previewImage6)
        URL.revokeObjectURL(previewImage.previewImageHeader)

        setFile({
            image1:"",
            image2:"", 
            image3:"",
            image4:"",
            image5:"",
            image6:"",
            imageHeader:"",
        })

        setPreviewImage({
            previewImage1:"",
            previewImage2:"", 
            previewImage3:"",
            previewImage4:"",
            previewImage5:"",
            previewImage6:"",
            previewImageHeader:"",
        })

        setFileDateHeader("") 
        setFileDate1("")
        setFileDate2("")
        setFileDate3("")
        setFileDate4("")
        setFileDate5("")
        setFileDate6("")

    }


    //For uploading images to server
    const onSubmit = async e => {

        e.preventDefault();

        if(newData.appcode==""){
            alert("Failed Uploading Image, Appcode Required!")
        } else{
            setDisplayProgressBar("block")
            setFileKey(Date.now())

            const formData1 = new FormData();
            formData1.append('fileFirst', file.image1);
            formData1.append('newNameFirst', fileDate1.replace(/:/g,""));
            
            const formData2 = new FormData();
            formData2.append('fileSecond', file.image2);
            formData2.append('newNameSecond', fileDate2.replace(/:/g,""));

            const formData3 = new FormData();
            formData3.append('fileThird', file.image3);
            formData3.append('newNameThird', fileDate3.replace(/:/g,""));
            
            const formData4 = new FormData();
            formData4.append('fileFourth', file.image4);
            formData4.append('newNameFourth', fileDate4.replace(/:/g,""));

            const formData5 = new FormData();
            formData5.append('fileFifth', file.image5);
            formData5.append('newNameFifth', fileDate5.replace(/:/g,""));

            const formData6 = new FormData();
            formData6.append('fileSixth', file.image6);
            formData6.append('newNameSixth', fileDate6.replace(/:/g,""));

            const formData7 = new FormData();
            formData7.append('fileHeader', file.imageHeader);
            formData7.append('newNameHeader', fileDateHeader.replace(/:/g,""));

            if(file.imageHeader === undefined || file.imageHeader.length == 0  ){
                console.log(true)
            } else {
                try {
                    const res = await axios.post(process.env.REACT_APP_API_URL+'/uploadheader', formData7 ,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: ProgressEvent => {
                        setUploadPercentageHeader(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))

                        //Clear Percentage
                        setTimeout(() => setUploadPercentageHeader(0), 2000)
                    }
                    });
                    console.log(res.data.msg)
        
                } catch (err) {
                    if (err.response.status === 500) {
                        alert('Not all Images/Icons is/are updated!');
                    } else {
                        alert(err.response.data.msg);
                    }
                }
                console.log(false)
            }

            if(file.image1 === undefined || file.image1.length == 0  ){
                console.log(true)
            } else {
                try {
                    const res = await axios.post(process.env.REACT_APP_API_URL+'/upload', formData1 ,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: ProgressEvent => {
                        setUploadPercentage1(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))

                        //Clear Percentage
                        setTimeout(() => setUploadPercentage1(0), 2000)
                    }
                    });
                    console.log(res.data.msg)
        
                } catch (err) {
                    if (err.response.status === 500) {
                        alert('Not all Images/Icons is/are updated!');
                    } else {
                        alert(err.response.data.msg);
                    }
                }
                console.log(false)
            }
            
            if(file.image2 === undefined || file.image2.length == 0  ){
                console.log(true)
            } else {
                try {
                    const res = await axios.post(process.env.REACT_APP_API_URL+'/upload2', formData2 ,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: ProgressEvent => {
                        setUploadPercentage2(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))

                        //Clear Percentage
                        setTimeout(() => setUploadPercentage2(0), 2000)
                    }
                    });
                    console.log(res.data.msg)
        
                } catch (err) {
                    if (err.response.status === 500) {
                        alert('Not all Images/Icons is/are updated!');
                    } else {
                        alert(err.response.data.msg);
                    }
                }
                console.log(false)
            }

            if(file.image3 === undefined || file.image3.length == 0  ){
                console.log(true)
            } else {
                try {
                    const res = await axios.post(process.env.REACT_APP_API_URL+'/upload3', formData3 ,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: ProgressEvent => {
                        setUploadPercentage3(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))

                        //Clear Percentage
                        setTimeout(() => setUploadPercentage3(0), 2000)
                    }
                    });
                    console.log(res.data.msg)
        
                } catch (err) {
                    if (err.response.status === 500) {
                        alert('Not all Images/Icons is/are updated!');
                    } else {
                        alert(err.response.data.msg);
                    }
                }

                console.log(false)
            }


            if(file.image4 === undefined || file.image4.length == 0  ){
                console.log(true)
            } else {
                try {
                    const res = await axios.post(process.env.REACT_APP_API_URL+'/upload4', formData4 ,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: ProgressEvent => {
                        setUploadPercentage4(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))

                        //Clear Percentage
                        setTimeout(() => setUploadPercentage4(0), 2000)
                    }
                    });
                    console.log(res.data.msg)
        
                } catch (err) {
                    if (err.response.status === 500) {
                        alert('Not all Images/Icons is/are updated!');
                    } else {
                        alert(err.response.data.msg);
                    }
                }

                console.log(false)
            }

            if(file.image5 === undefined || file.image5.length == 0  ){
                console.log(true)
            } else {
                try {
                    const res = await axios.post(process.env.REACT_APP_API_URL+'/upload5', formData5 ,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: ProgressEvent => {
                        setUploadPercentage5(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))

                        //Clear Percentage
                        setTimeout(() => setUploadPercentage5(0), 2000)
                    }
                    });
                    console.log(res.data.msg)
        
                } catch (err) {
                    if (err.response.status === 500) {
                        alert('Not all Images/Icons is/are updated!');
                    } else {
                        alert(err.response.data.msg);
                    }
                }

                console.log(false)
            }

            if(file.image6 === undefined || file.image6.length == 0  ){
                console.log(true)
            } else {
                try {
                    const res = await axios.post(process.env.REACT_APP_API_URL+'/upload6', formData6 ,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: ProgressEvent => {
                        setUploadPercentage6(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))

                        //Clear Percentage
                        setTimeout(() => setUploadPercentage6(0), 2000)
                    }
                    });
                    console.log(res.data.msg)
        
                } catch (err) {
                    if (err.response.status === 500) {
                        alert('Not all Images/Icons is/are updated!');
                    } else {
                        alert(err.response.data.msg);
                    }
                }
                console.log(false)
            }

        }
       
    }


    function handleSave(){

        var options = {compact: true, ignoreComment: true, spaces: 4, ignoreAttributes: "<root>"};
        var result = convert.json2xml(JSON.stringify({

            logo: fileDateHeader.replace(/:/g,"")+newxml.logo,
            publickey: newxml.publickey,
            cmd_button_mode: newxml.cmd_button_mode,
            cmd_url: newxml.cmd_url,
            cmd_text: newxml.cmd_text,
            customtext: newxml.customtext,
            customurl: newxml.customurl,

            offers1: "",
            offers2: "",
            offers3: "",
            offers4: "",
            offers5: "",
            offers6: "",

            mainbtn1: {
                title: newxml.mainbtn1.title,
                url: newxml.mainbtn1.url                
            },
    
            mainbtn2: {
                title: newxml.mainbtn2.title,
                url: newxml.mainbtn2.url
            },

            menubtn1: {
                icon: newxml.menubtn1.icon,
                title: newxml.menubtn1.title,
                url: newxml.menubtn1.url,
            },
    
            menubtn2: {
                icon: newxml.menubtn2.icon,
                title: newxml.menubtn2.title,
                url: newxml.menubtn2.url,
            },
    
            menubtn3: {
                icon: newxml.menubtn3.icon,
                title: newxml.menubtn3.title,
                url: newxml.menubtn3.url,
            },

            menubtn4: {
                icon: newxml.menubtn4.icon,
                title: newxml.menubtn4.title,
                url: newxml.menubtn4.url,
                cmenu: newxml.menubtn4.cmenu,
            },
    
            menubtn5: {
                icon: newxml.menubtn5.icon,
                title: newxml.menubtn5.title,
                url: newxml.menubtn5.url,
                cmenu: newxml.menubtn5.cmenu,
            }, 
            
            menubtn6: {
                icon: newxml.menubtn6.icon,
                title: newxml.menubtn6.title,
                url: newxml.menubtn6.url,
                cmenu: newxml.menubtn6.cmenu,
            },

            couponbtn: {
                icon: newxml.couponbtn.icon,
                title: newxml.couponbtn.title,
                showbtn: newxml.couponbtn.showbtn,
                coupondata : {
                    sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                    image1: fileDate1.replace(/:/g,"")+newxml.couponbtn.coupondata.image1,
                    url1: newxml.couponbtn.coupondata.url1,
                    image2:  fileDate2.replace(/:/g,"")+newxml.couponbtn.coupondata.image2,
                    url2:  newxml.couponbtn.coupondata.url2,
                    image3:  fileDate3.replace(/:/g,"")+newxml.couponbtn.coupondata.image3,
                    url3:  newxml.couponbtn.coupondata.url3,
                    image4:  fileDate4.replace(/:/g,"")+newxml.couponbtn.coupondata.image4,
                    url4: newxml.couponbtn.coupondata.url4,
                    image5:  fileDate5.replace(/:/g,"")+newxml.couponbtn.coupondata.image5,
                    url5:  newxml.couponbtn.coupondata.url5,
                    image6:  fileDate6.replace(/:/g,"")+newxml.couponbtn.coupondata.image6,
                    url6:  newxml.couponbtn.coupondata.url6,
                }
            }

    }), options);

        if(newData.clientsname=="" || newData.appcode==""){
            alert("Please Fill Up Important Fields!")
        }else{
            const baseUrl = process.env.REACT_APP_API_URL+"/create"

            const datapost = {
                clubname : newData.clientsname,
                club_id : newData.appcode,
                contentxml : result,
            }

            axios.post(baseUrl,datapost)
            .then(response=>{
                if (response.data.success===true) {
                    alert(response.data.message)
                    handleClear()
                }
                else {
                    alert(response.data.message)
                    // window.location.reload();
                }
            }).catch(error=>{
                alert("Error 34 "+error)
            })
        }

    }


    return (
        <Content>
        <AdminNavbar />
            <form onSubmit={onSubmit}>
                <Container>
                    <Row>
                        <Col xs={8}>
                            <Form.Group controlId="clubname">
                                <Form.Label>Clients Name <Required>*</Required></Form.Label>
                                <Form.Control type="text" value={newData.clientsname}
                                onChange={
                                    e => setNewData({ ...newData, clientsname: e.target.value })
                                } />
                                <Form.Text className="text-muted">
                                    Please Fill Up this Clientt Name Field.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                       
                        <UpperCol xs={2}>
                            <Link style={{ marginRight: "10px" }} className="btn btn-success" onClick={()=>{
                                handleClear()
                                window.location.replace('/clients')
                            }}>Back to Clients</Link>
                        </UpperCol>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>App Code <Required>*</Required></Form.Label>
                                <Form.Control type="text" value={newData.appcode}
                                onChange={
                                    e => setNewData({ ...newData, appcode: e.target.value })
                                }/>
                                <Form.Text className="text-muted">
                                    Please Fill Up this AppCode Field.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col xs={2}>
                            <Form.Group>
                                <Form.Label>Journey Option</Form.Label>
                                <Form.Control as="select" value={newxml.cmd_button_mode} 
                                    onChange={  
                                        e => setNewxml({ ...newxml, cmd_button_mode: e.target.value }) 
                                    }>
                                    <option value=""></option>
                                    <option value="TCODE">T-Code</option>
                                    <option value="HIDDEN">Hidden</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <UpperCol xs={6}>
                            <input type='file' id='app-image' className="custom-file-input" key={filekey}
                                onChange={
                                    e => {
                                            setFile({ ...file, imageHeader: e.target.files[0] })
                                            setNewxml({ ...newxml, logo: e.target.files[0].name.replace(/-/g,"") })
                                            setPreviewImage({ ...previewImage, previewImageHeader: URL.createObjectURL(e.target.files[0])  })
                                            setFileDateHeader(new Date().toISOString())
                                            setDisplayPreview("block")
                                    }
                                }/>
                            <FileLabel htmlFor="app-image" className="custom-file-label">
                            { newxml.logo }
                            </FileLabel>
                        </UpperCol>
                        <Col xs={2}>
                            <HeaderImageCol>
                            <img src={ previewImage.previewImageHeader } style={{ height: "180px", width: "100%", display: displayPreview}} />
                            </HeaderImageCol>
                        </Col>
                    </Row>
                    <DataContainer>
                        <Title>Welcome Message</Title>
                        <Row>
                            <Col xs={2}>
                                <FormLabel>Message : </FormLabel>
                            </Col>
                            <Col xs={10}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.customtext}
                                onChange={
                                    e => setNewxml({ ...newxml, customtext: e.target.value })
                                }/>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <FormLabel>Link : </FormLabel>
                            </Col>
                            <Col xs={10}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.customurl}
                                onChange={
                                    e => setNewxml({ ...newxml, customurl: e.target.value })
                                }/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </DataContainer>
                    <DataContainer>
                        <Title>Homepage Links</Title>
                        <Row>
                            <Col xs={3}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Button Label</Form.Label>
                                    <Form.Control type="text" value={newxml.mainbtn1.title}
                                    onChange={
                                        e => setNewxml({ ...newxml, mainbtn1: {
                                            title : e.target.value,
                                            url: newxml.mainbtn1.url
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                            <Col xs={9}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Button Link</Form.Label>
                                    <Form.Control type="text" value={newxml.mainbtn1.url}
                                    onChange={
                                        e => setNewxml({ ...newxml, mainbtn1: {
                                            title: newxml.mainbtn1.title,
                                            url : e.target.value
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.mainbtn2.title}
                                     onChange={
                                        e => setNewxml({ ...newxml, mainbtn2: {
                                            title : e.target.value,
                                            url: newxml.mainbtn2.url
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                            <Col xs={9}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.mainbtn2.url}
                                    onChange={
                                        e => setNewxml({ ...newxml, mainbtn2: {
                                            title: newxml.mainbtn2.title,
                                            url : e.target.value
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </DataContainer>
                    <DataContainer>
                        <Title>Menu Screen</Title>
                        <Row>
                            <Col xs={{span: 2, offset: 1}}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Icon</Form.Label>
                                     <Form.Control as="select" value={newxml.menubtn1.icon} onChange={
                                        e => setNewxml({ ...newxml, menubtn1: {
                                            icon : e.target.value,
                                            title: newxml.menubtn1.title,
                                            url: newxml.menubtn1.url
                                        }})
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
                                        <option value="12">News</option>
                                        <option value="13">Calendar</option>
                                        <option value="14">News</option>
                                        <option value="15">Maps</option>
                                        <option value="16">Videos</option>
                                        <option value="17">Merchandize</option>
                                        <option value="18">Signal</option>
                                        <option value="19">Team</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Button Label</Form.Label>
                                    <Form.Control type="text" value={newxml.menubtn1.title}
                                    onChange={
                                        e => setNewxml({ ...newxml, menubtn1: {
                                            icon : newxml.menubtn1.icon,
                                            title: e.target.value,
                                            url: newxml.menubtn1.url
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Button Link</Form.Label>
                                    <Form.Control type="text" value={newxml.menubtn1.url}
                                    onChange={
                                        e => setNewxml({ ...newxml, menubtn1: {
                                            icon : newxml.menubtn1.icon,
                                            title: newxml.menubtn1.title,
                                            url: e.target.value
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{span: 2, offset: 1}}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control as="select" value={newxml.menubtn2.icon} onChange={
                                        e => setNewxml({ ...newxml, menubtn2: {
                                            icon : e.target.value,
                                            title: newxml.menubtn2.title,
                                            url: newxml.menubtn2.url
                                        }})
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
                                        <option value="12">News</option>
                                        <option value="13">Calendar</option>
                                        <option value="14">News</option>
                                        <option value="15">Maps</option>
                                        <option value="16">Videos</option>
                                        <option value="17">Merchandize</option>
                                        <option value="18">Signal</option>
                                        <option value="19">Team</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.menubtn2.title}
                                    onChange={
                                        e => setNewxml({ ...newxml, menubtn2: {
                                            icon : newxml.menubtn2.icon,
                                            title: e.target.value,
                                            url: newxml.menubtn2.url
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.menubtn2.url}
                                    onChange={
                                        e => setNewxml({ ...newxml, menubtn2: {
                                            icon : newxml.menubtn2.icon,
                                            title: newxml.menubtn2.title,
                                            url: e.target.value
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{span: 2, offset: 1}}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control as="select" value={newxml.menubtn3.icon} onChange={
                                        e => setNewxml({ ...newxml, menubtn3: {
                                            icon : e.target.value,
                                            title: newxml.menubtn3.title,
                                            url: newxml.menubtn3.url
                                        }})
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
                                        <option value="12">News</option>
                                        <option value="13">Calendar</option>
                                        <option value="14">News</option>
                                        <option value="15">Maps</option>
                                        <option value="16">Videos</option>
                                        <option value="17">Merchandize</option>
                                        <option value="18">Signal</option>
                                        <option value="19">Team</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.menubtn3.title}
                                    onChange={
                                        e => setNewxml({ ...newxml, menubtn3: {
                                            icon : newxml.menubtn3.icon,
                                            title: e.target.value,
                                            url: newxml.menubtn3.url
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.menubtn3.url}
                                    onChange={
                                        e => setNewxml({ ...newxml, menubtn3: {
                                            icon : newxml.menubtn3.icon,
                                            title: newxml.menubtn3.title,
                                            url: e.target.value
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                                <Checkbox type="checkbox" 
                                    defaultChecked={ newData.menucmenu4 === true ? true : false }
                                    onChange={
                                        () => newxml.menubtn4.cmenu === "false" ? 
                                        setNewxml({ ...newxml, menubtn4: {
                                            icon : newxml.menubtn4.icon,
                                            title: newxml.menubtn4.title,
                                            url: newxml.menubtn4.url,
                                            cmenu: "true"
                                        }}) : 
                                        setNewxml({ ...newxml, menubtn4: {
                                            icon : newxml.menubtn4.icon,
                                            title: newxml.menubtn4.title,
                                            url: newxml.menubtn4.url,
                                            cmenu: "false"
                                        }}) 
                                    }
                                />
                            </Col>
                            <Col xs={2}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control as="select" value={newxml.menubtn4.icon} onChange={
                                        e => setNewxml({ ...newxml, menubtn4: {
                                            icon : e.target.value,
                                            title: newxml.menubtn4.title,
                                            url: newxml.menubtn4.url,
                                            cmenu: newxml.menubtn4.cmenu,
                                        }})
                                    } 
                                    readOnly={ newxml.menubtn4.cmenu === "false" ? false : true }>
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
                                        <option value="12">News</option>
                                        <option value="13">Calendar</option>
                                        <option value="14">News</option>
                                        <option value="15">Maps</option>
                                        <option value="16">Videos</option>
                                        <option value="17">Merchandize</option>
                                        <option value="18">Signal</option>
                                        <option value="19">Team</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.menubtn4.title}
                                    onChange={
                                        e => setNewxml({ ...newxml, menubtn4: {
                                            icon : newxml.menubtn4.icon,
                                            title: e.target.value,
                                            url: newxml.menubtn4.url,
                                            cmenu: newxml.menubtn4.cmenu,
                                        }})
                                    }
                                    readOnly={ newxml.menubtn4.cmenu === "false" ? false : true }/>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.menubtn4.url}
                                    onChange={
                                        e => setNewxml({ ...newxml, menubtn4: {
                                            icon : newxml.menubtn4.icon,
                                            title: newxml.menubtn4.title,
                                            url: e.target.value,
                                            cmenu: newxml.menubtn4.cmenu,
                                        }})
                                    }
                                    readOnly={ newxml.menubtn4.cmenu === "false" ? false : true }/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                                <Checkbox type="checkbox" 
                                    defaultChecked={ newData.menucmenu5 === true ? true : false }
                                    onChange={
                                        () => newxml.menubtn5.cmenu === "false" ? 
                                        setNewxml({ ...newxml, menubtn5: {
                                            icon : newxml.menubtn5.icon,
                                            title: newxml.menubtn5.title,
                                            url: newxml.menubtn5.url,
                                            cmenu: "true"
                                        }}) : 
                                        setNewxml({ ...newxml, menubtn5: {
                                            icon : newxml.menubtn5.icon,
                                            title: newxml.menubtn5.title,
                                            url: newxml.menubtn5.url,
                                            cmenu: "false"
                                        }}) 
                                    }
                                />
                            </Col>
                            <Col xs={2}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control as="select" value={newxml.menubtn5.icon} onChange={
                                            e => setNewxml({ ...newxml, menubtn5: {
                                                icon : e.target.value,
                                                title: newxml.menubtn5.title,
                                                url: newxml.menubtn5.url,
                                                cmenu: newxml.menubtn5.cmenu,
                                            }})
                                        } 
                                        readOnly={ newxml.menubtn5.cmenu === "false" ? false : true }>
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
                                            <option value="12">News</option>
                                            <option value="13">Calendar</option>
                                            <option value="14">News</option>
                                            <option value="15">Maps</option>
                                            <option value="16">Videos</option>
                                            <option value="17">Merchandize</option>
                                            <option value="18">Signal</option>
                                            <option value="19">Team</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.menubtn5.title}
                                    onChange={
                                        e => setNewxml({ ...newxml, menubtn5: {
                                            icon : newxml.menubtn5.icon,
                                            title: e.target.value,
                                            url: newxml.menubtn5.url,
                                            cmenu: newxml.menubtn5.cmenu,
                                        }})
                                    }
                                    readOnly={ newxml.menubtn5.cmenu === "false" ? false : true }/>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.menubtn5.url}
                                    onChange={
                                        e => setNewxml({ ...newxml, menubtn5: {
                                            icon : newxml.menubtn5.icon,
                                            title: newxml.menubtn5.title,
                                            url: e.target.value,
                                            cmenu: newxml.menubtn5.cmenu,
                                        }})
                                    }
                                    readOnly={ newxml.menubtn5.cmenu === "false" ? false : true }/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                                <Checkbox type="checkbox" 
                                    defaultChecked={ newData.menucmenu6 === true ? true : false }
                                    onChange={
                                        () => newxml.menubtn6.cmenu === "false" ? 
                                        setNewxml({ ...newxml, menubtn6: {
                                            icon : newxml.menubtn6.icon,
                                            title: newxml.menubtn6.title,
                                            url: newxml.menubtn6.url,
                                            cmenu: "true"
                                        }}) : 
                                        setNewxml({ ...newxml, menubtn6: {
                                            icon : newxml.menubtn6.icon,
                                            title: newxml.menubtn6.title,
                                            url: newxml.menubtn6.url,
                                            cmenu: "false"
                                        }}) 
                                    }
                                />
                            </Col>
                            <Col xs={2}>
                                <Form.Group controlId="formBasicEmail">
                                     <Form.Control as="select" value={newxml.menubtn6.icon} onChange={
                                            e => setNewxml({ ...newxml, menubtn6: {
                                                icon : e.target.value,
                                                title: newxml.menubtn6.title,
                                                url: newxml.menubtn6.url,
                                                cmenu: newxml.menubtn6.cmenu,
                                            }})
                                        } 
                                        readOnly={ newxml.menubtn6.cmenu === "false" ? false : true }>
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
                                            <option value="12">News</option>
                                            <option value="13">Calendar</option>
                                            <option value="14">News</option>
                                            <option value="15">Maps</option>
                                            <option value="16">Videos</option>
                                            <option value="17">Merchandize</option>
                                            <option value="18">Signal</option>
                                            <option value="19">Team</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.menubtn6.title}
                                    onChange={
                                        e => setNewxml({ ...newxml, menubtn6: {
                                            icon : newxml.menubtn6.icon,
                                            title: e.target.value,
                                            url: newxml.menubtn6.url,
                                            cmenu: newxml.menubtn6.cmenu,
                                        }})
                                    }
                                    readOnly={ newxml.menubtn6.cmenu === "false" ? false : true }/>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.menubtn6.url}
                                    onChange={
                                        e => setNewxml({ ...newxml, menubtn6: {
                                            icon : newxml.menubtn6.icon,
                                            title: newxml.menubtn6.title,
                                            url: e.target.value,
                                            cmenu: newxml.menubtn6.cmenu,
                                        }})
                                    }
                                    readOnly={ newxml.menubtn6.cmenu === "false" ? false : true }/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                                <Checkbox type="checkbox" 
                                    defaultChecked={ newData.sponsorbtn === true ? true : false }
                                    onChange={
                                        () => newxml.couponbtn.showbtn === "true" ? 
                                        setNewxml({ ...newxml, couponbtn: {
                                            icon: newxml.couponbtn.icon,
                                            title: newxml.couponbtn.title,
                                            showbtn: "false",
                                            coupondata : {
                                                sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                image1: newxml.couponbtn.coupondata.image1,
                                                url1: newxml.couponbtn.coupondata.url1,
                                                image2: newxml.couponbtn.coupondata.image2,
                                                url2: newxml.couponbtn.coupondata.url2,
                                                image3: newxml.couponbtn.coupondata.image3,
                                                url3: newxml.couponbtn.coupondata.url3,
                                                image4: newxml.couponbtn.coupondata.image4,
                                                url4: newxml.couponbtn.coupondata.url4,
                                                image5: newxml.couponbtn.coupondata.image5,
                                                url5: newxml.couponbtn.coupondata.url5,
                                                image6: newxml.couponbtn.coupondata.image6,
                                                url6: newxml.couponbtn.coupondata.url6,
                                            }
                                        }}) : 
                                        setNewxml({ ...newxml, couponbtn: {
                                            icon: newxml.couponbtn.icon,
                                            title: newxml.couponbtn.title,
                                            showbtn: "true",
                                            coupondata : {
                                                sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                image1: newxml.couponbtn.coupondata.image1,
                                                url1: newxml.couponbtn.coupondata.url1,
                                                image2: newxml.couponbtn.coupondata.image2,
                                                url2: newxml.couponbtn.coupondata.url2,
                                                image3: newxml.couponbtn.coupondata.image3,
                                                url3: newxml.couponbtn.coupondata.url3,
                                                image4: newxml.couponbtn.coupondata.image4,
                                                url4: newxml.couponbtn.coupondata.url4,
                                                image5: newxml.couponbtn.coupondata.image5,
                                                url5: newxml.couponbtn.coupondata.url5,
                                                image6: newxml.couponbtn.coupondata.image6,
                                                url6: newxml.couponbtn.coupondata.url6,
                                            }
                                        }}) 
                                    }
                                />
                            </Col>
                            <Col xs={2}>
                                <FormLabel>Sponsor </FormLabel>
                            </Col>
                            <Col xs={9}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={newxml.couponbtn.title}
                                    onChange={
                                        e => setNewxml({ ...newxml, couponbtn: {
                                            icon: newxml.couponbtn.icon,
                                            title: e.target.value,
                                            showbtn: newxml.couponbtn.showbtn,
                                            coupondata : {
                                                sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                image1: newxml.couponbtn.coupondata.image1,
                                                url1: newxml.couponbtn.coupondata.url1,
                                                image2: newxml.couponbtn.coupondata.image2,
                                                url2: newxml.couponbtn.coupondata.url2,
                                                image3: newxml.couponbtn.coupondata.image3,
                                                url3: newxml.couponbtn.coupondata.url3,
                                                image4: newxml.couponbtn.coupondata.image4,
                                                url4: newxml.couponbtn.coupondata.url4,
                                                image5: newxml.couponbtn.coupondata.image5,
                                                url5: newxml.couponbtn.coupondata.url5,
                                                image6: newxml.couponbtn.coupondata.image6,
                                                url6: newxml.couponbtn.coupondata.url6,
                                            }
                                        }})
                                    }
                                    readOnly={ newxml.couponbtn.showbtn === "true" ? false : true }/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </DataContainer>
                    <DataContainer>
                        <Row>
                            <Col xs={6}>
                                <Form.Group >
                                    <Form.Label>Resources Header</Form.Label>
                                    <Form.Control type="text" 
                                    value={newxml.couponbtn.coupondata.sponsorheader==null ? newxml.couponbtn.coupondata.sponsorheader : newxml.couponbtn.coupondata.sponsorheader.replace(/%20/g,' ')}
                                    onChange={
                                        e => setNewxml({ ...newxml, couponbtn: {
                                            icon: newxml.couponbtn.icon,
                                            title: newxml.couponbtn.title,
                                            showbtn: newxml.couponbtn.showbtn,
                                            coupondata : {
                                                sponsorheader: e.target.value,
                                                image1: newxml.couponbtn.coupondata.image1,
                                                url1: newxml.couponbtn.coupondata.url1,
                                                image2: newxml.couponbtn.coupondata.image2,
                                                url2: newxml.couponbtn.coupondata.url2,
                                                image3: newxml.couponbtn.coupondata.image3,
                                                url3: newxml.couponbtn.coupondata.url3,
                                                image4: newxml.couponbtn.coupondata.image4,
                                                url4: newxml.couponbtn.coupondata.url4,
                                                image5: newxml.couponbtn.coupondata.image5,
                                                url5: newxml.couponbtn.coupondata.url5,
                                                image6: newxml.couponbtn.coupondata.image6,
                                                url6: newxml.couponbtn.coupondata.url6,
                                            }
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                               <Row>
                                    <Col xs={6}>
                                        <Row>
                                            <Col xs={5}>
                                                <ImageCol>
                                                <img src={ previewImage.previewImage1 } 
                                                style={{ height: "140px", width: "100%", display: displayPreview}} /> 
						                        </ImageCol>
                                            </Col>
					                        <Col  xs={12} style={{ display: displayProgressBar }}>
                                                <ProgressBarData animated striped variant="success" now={uploadPercentage1} label={`${uploadPercentage1}%`} />
                                            </Col>
                                            <Col  xs={12}>
                                                <input type='file' id='customFile' className="custom-file-input" key={filekey}
                                                onChange={ e => 
                                                    {
                                                         setFile({ ...file, image1: e.target.files[0] })
                                                         setNewxml({ ...newxml, couponbtn: {
                                                            icon: newxml.couponbtn.icon,
                                                            title: newxml.couponbtn.title,
                                                            showbtn: newxml.couponbtn.showbtn,
                                                            coupondata : {
                                                                sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                                image1: e.target.files[0].name.replace(/-/g,""),
                                                                url1: newxml.couponbtn.coupondata.url1,
                                                                image2: newxml.couponbtn.coupondata.image2,
                                                                url2: newxml.couponbtn.coupondata.url2,
                                                                image3: newxml.couponbtn.coupondata.image3,
                                                                url3: newxml.couponbtn.coupondata.url3,
                                                                image4: newxml.couponbtn.coupondata.image4,
                                                                url4: newxml.couponbtn.coupondata.url4,
                                                                image5: newxml.couponbtn.coupondata.image5,
                                                                url5: newxml.couponbtn.coupondata.url5,
                                                                image6: newxml.couponbtn.coupondata.image6,
                                                                url6: newxml.couponbtn.coupondata.url6,
                                                            }
                                                        }})
                                                    setPreviewImage({ ...previewImage, previewImage1: URL.createObjectURL(e.target.files[0])  })
                                                    setFileDate1(new Date().toISOString())
                                                    setDisplayPreview("block")
                                                    }
                                                }
                                                />
                                                <FileLabel htmlFor="customFile" className="custom-file-label">
                                                { newxml.couponbtn.coupondata.image1 }
                                                </FileLabel>
						
                                            </Col>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <Form.Control type="text" 
                                                value={newxml.couponbtn.coupondata.url1==null ? 
                                                    newxml.couponbtn.coupondata.url1 : 
                                                    newxml.couponbtn.coupondata.url1.replace(/&amp;frasl;|&frasl;/g,"/")}
                                                onChange={
                                                    e => setNewxml({ ...newxml, couponbtn: {
                                                        icon: newxml.couponbtn.icon,
                                                        title: newxml.couponbtn.title,
                                                        showbtn: newxml.couponbtn.showbtn,
                                                        coupondata : {
                                                            sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                            image1: newxml.couponbtn.coupondata.image1,
                                                            url1: e.target.value,
                                                            image2: newxml.couponbtn.coupondata.image2,
                                                            url2: newxml.couponbtn.coupondata.url2,
                                                            image3: newxml.couponbtn.coupondata.image3,
                                                            url3: newxml.couponbtn.coupondata.url3,
                                                            image4: newxml.couponbtn.coupondata.image4,
                                                            url4: newxml.couponbtn.coupondata.url4,
                                                            image5: newxml.couponbtn.coupondata.image5,
                                                            url5: newxml.couponbtn.coupondata.url5,
                                                            image6: newxml.couponbtn.coupondata.image6,
                                                            url6: newxml.couponbtn.coupondata.url6,
                                                        }
                                                    }})
                                                }/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Row>
                                            <Col xs={5}>
                                                <ImageCol>
                                                <img src={ previewImage.previewImage2 } 
                                                style={{ height: "140px", width: "100%", display: displayPreview}} /> 
						                        </ImageCol>
                                            </Col>
 					                        <Col  xs={12} style={{ display: displayProgressBar }}>
                                                <ProgressBarData animated striped variant="success" now={uploadPercentage2} label={`${uploadPercentage2}%`} />
                                            </Col>
                                            <Col  xs={12}>
                                                <input type='file' id='customFile2' className="custom-file-input" key={filekey}
                                                onChange={ e => 
                                                    {
                                                         setFile({ ...file, image2: e.target.files[0] })
                                                         setNewxml({ ...newxml, couponbtn: {
                                                            icon: newxml.couponbtn.icon,
                                                            title: newxml.couponbtn.title,
                                                            showbtn: newxml.couponbtn.showbtn,
                                                            coupondata : {
                                                                sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                                image1: newxml.couponbtn.coupondata.image1,
                                                                url1: newxml.couponbtn.coupondata.url1,
                                                                image2: e.target.files[0].name.replace(/-/g,""),
                                                                url2: newxml.couponbtn.coupondata.url2,
                                                                image3: newxml.couponbtn.coupondata.image3,
                                                                url3: newxml.couponbtn.coupondata.url3,
                                                                image4: newxml.couponbtn.coupondata.image4,
                                                                url4: newxml.couponbtn.coupondata.url4,
                                                                image5: newxml.couponbtn.coupondata.image5,
                                                                url5: newxml.couponbtn.coupondata.url5,
                                                                image6: newxml.couponbtn.coupondata.image6,
                                                                url6: newxml.couponbtn.coupondata.url6,
                                                            }
                                                        }})
                                                        setPreviewImage({ ...previewImage, previewImage2: URL.createObjectURL(e.target.files[0])  })
                                                        setFileDate2(new Date().toISOString())
                                                        setDisplayPreview("block")
                                                    }
                                                }
                                                />
                                                <FileLabel htmlFor="customFile2" className="custom-file-label">
                                                { newxml.couponbtn.coupondata.image2 }
                                                </FileLabel>
                                            </Col>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <Form.Control type="text" 
                                                value={newxml.couponbtn.coupondata.url2==null ? 
                                                    newxml.couponbtn.coupondata.url2 : 
                                                    newxml.couponbtn.coupondata.url2.replace(/&amp;frasl;|&frasl;/g,"/")}
                                                onChange={
                                                    e => setNewxml({ ...newxml, couponbtn: {
                                                        icon: newxml.couponbtn.icon,
                                                        title: newxml.couponbtn.title,
                                                        showbtn: newxml.couponbtn.showbtn,
                                                        coupondata : {
                                                            sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                            image1: newxml.couponbtn.coupondata.image1,
                                                            url1: newxml.couponbtn.coupondata.url1,
                                                            image2: newxml.couponbtn.coupondata.image2,
                                                            url2: e.target.value,
                                                            image3: newxml.couponbtn.coupondata.image3,
                                                            url3: newxml.couponbtn.coupondata.url3,
                                                            image4: newxml.couponbtn.coupondata.image4,
                                                            url4: newxml.couponbtn.coupondata.url4,
                                                            image5: newxml.couponbtn.coupondata.image5,
                                                            url5: newxml.couponbtn.coupondata.url5,
                                                            image6: newxml.couponbtn.coupondata.image6,
                                                            url6: newxml.couponbtn.coupondata.url6,
                                                        }
                                                    }})
                                                }/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Row>
                                            <Col xs={5}>
                                                 <ImageCol>
                                                <img src={ previewImage.previewImage3 } 
                                                style={{ height: "140px", width: "100%", display: displayPreview}} /> 
						                        </ImageCol>
                                            </Col>
 					                        <Col  xs={12} style={{ display: displayProgressBar }}>
                                                <ProgressBarData animated striped variant="success" now={uploadPercentage3} label={`${uploadPercentage3}%`} />
                                            </Col>
                                            <Col  xs={12}>
                                                <input type='file' id='customFile3' className="custom-file-input" key={filekey}
                                                onChange={ e => 
                                                    {
                                                         setFile({ ...file, image3: e.target.files[0] })
                                                         setNewxml({ ...newxml, couponbtn: {
                                                            icon: newxml.couponbtn.icon,
                                                            title: newxml.couponbtn.title,
                                                            showbtn: newxml.couponbtn.showbtn,
                                                            coupondata : {
                                                                sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                                image1: newxml.couponbtn.coupondata.image1,
                                                                url1: newxml.couponbtn.coupondata.url1,
                                                                image2: newxml.couponbtn.coupondata.image2,
                                                                url2: newxml.couponbtn.coupondata.url2,
                                                                image3: e.target.files[0].name.replace(/-/g,""),
                                                                url3: newxml.couponbtn.coupondata.url3,
                                                                image4: newxml.couponbtn.coupondata.image4,
                                                                url4: newxml.couponbtn.coupondata.url4,
                                                                image5: newxml.couponbtn.coupondata.image5,
                                                                url5: newxml.couponbtn.coupondata.url5,
                                                                image6: newxml.couponbtn.coupondata.image6,
                                                                url6: newxml.couponbtn.coupondata.url6,
                                                            }
                                                        }})
                                                        setPreviewImage({ ...previewImage, previewImage3: URL.createObjectURL(e.target.files[0])  })
                                                        setFileDate3(new Date().toISOString())
                                                        setDisplayPreview("block")

                                                    }
                                                }
                                                />
                                                <FileLabel htmlFor="customFile3" className="custom-file-label">
                                                { newxml.couponbtn.coupondata.image3 }
                                                </FileLabel>
                                            </Col>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <Form.Control type="text" 
                                                value={newxml.couponbtn.coupondata.url3==null ? 
                                                    newxml.couponbtn.coupondata.url3 : 
                                                    newxml.couponbtn.coupondata.url3.replace(/&amp;frasl;|&frasl;/g,"/")}
                                                onChange={
                                                    e => setNewxml({ ...newxml, couponbtn: {
                                                        icon: newxml.couponbtn.icon,
                                                        title: newxml.couponbtn.title,
                                                        showbtn: newxml.couponbtn.showbtn,
                                                        coupondata : {
                                                            sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                            image1: newxml.couponbtn.coupondata.image1,
                                                            url1: newxml.couponbtn.coupondata.url1,
                                                            image2: newxml.couponbtn.coupondata.image2,
                                                            url2: newxml.couponbtn.coupondata.url2,
                                                            image3: newxml.couponbtn.coupondata.image3,
                                                            url3: e.target.value,
                                                            image4: newxml.couponbtn.coupondata.image4,
                                                            url4: newxml.couponbtn.coupondata.url4,
                                                            image5: newxml.couponbtn.coupondata.image5,
                                                            url5: newxml.couponbtn.coupondata.url5,
                                                            image6: newxml.couponbtn.coupondata.image6,
                                                            url6: newxml.couponbtn.coupondata.url6,
                                                        }
                                                    }})
                                                }/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Row>
                                            <Col xs={5}>
                                                 <ImageCol>
                                                <img src={ previewImage.previewImage4 } 
                                                style={{ height: "140px", width: "100%", display: displayPreview}} /> 
						                        </ImageCol>
                                            </Col>
 					                        <Col  xs={12} style={{ display: displayProgressBar }}>
                                                <ProgressBarData animated striped variant="success" now={uploadPercentage4} label={`${uploadPercentage4}%`} />
                                            </Col>
                                            <Col  xs={12}>
                                                <input type='file' id='customFile4' className="custom-file-input" key={filekey}
                                                onChange={ e => 
                                                    {
                                                         setFile({ ...file, image4: e.target.files[0] })
                                                         setNewxml({ ...newxml, couponbtn: {
                                                            icon: newxml.couponbtn.icon,
                                                            title: newxml.couponbtn.title,
                                                            showbtn: newxml.couponbtn.showbtn,
                                                            coupondata : {
                                                                sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                                image1: newxml.couponbtn.coupondata.image1,
                                                                url1: newxml.couponbtn.coupondata.url1,
                                                                image2: newxml.couponbtn.coupondata.image2,
                                                                url2: newxml.couponbtn.coupondata.url2,
                                                                image3: newxml.couponbtn.coupondata.image3,
                                                                url3: newxml.couponbtn.coupondata.url3,
                                                                image4: e.target.files[0].name.replace(/-/g,""),
                                                                url4: newxml.couponbtn.coupondata.url4,
                                                                image5: newxml.couponbtn.coupondata.image5,
                                                                url5: newxml.couponbtn.coupondata.url5,
                                                                image6: newxml.couponbtn.coupondata.image6,
                                                                url6: newxml.couponbtn.coupondata.url6,
                                                            }
                                                        }})
                                                        setPreviewImage({ ...previewImage, previewImage4: URL.createObjectURL(e.target.files[0])  })
                                                        setFileDate4(new Date().toISOString())
                                                        setDisplayPreview("block")

                                                    }
                                                }
                                                />
                                                <FileLabel htmlFor="customFile4" className="custom-file-label">
                                                { newxml.couponbtn.coupondata.image4 }
                                                </FileLabel>
                                            </Col>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <Form.Control type="text" 
                                                value={newxml.couponbtn.coupondata.url4==null ? 
                                                    newxml.couponbtn.coupondata.url4 : 
                                                    newxml.couponbtn.coupondata.url4.replace(/&amp;frasl;|&frasl;/g,"/")}
                                                onChange={
                                                    e => setNewxml({ ...newxml, couponbtn: {
                                                        icon: newxml.couponbtn.icon,
                                                        title: newxml.couponbtn.title,
                                                        showbtn: newxml.couponbtn.showbtn,
                                                        coupondata : {
                                                            sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                            image1: newxml.couponbtn.coupondata.image1,
                                                            url1: newxml.couponbtn.coupondata.url1,
                                                            image2: newxml.couponbtn.coupondata.image2,
                                                            url2: newxml.couponbtn.coupondata.url2,
                                                            image3: newxml.couponbtn.coupondata.image3,
                                                            url3: newxml.couponbtn.coupondata.url3,
                                                            image4: newxml.couponbtn.coupondata.image4,
                                                            url4: e.target.value,
                                                            image5: newxml.couponbtn.coupondata.image5,
                                                            url5: newxml.couponbtn.coupondata.url5,
                                                            image6: newxml.couponbtn.coupondata.image6,
                                                            url6: newxml.couponbtn.coupondata.url6,
                                                        }
                                                    }})
                                                }/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Row>
                                            <Col xs={5}>
                                                 <ImageCol>
                                                <img src={  previewImage.previewImage5 } 
                                                style={{ height: "140px", width: "100%", display: displayPreview}} /> 
						                        </ImageCol>
                                            </Col>
 					                        <Col  xs={12} style={{ display: displayProgressBar }}>
                                                <ProgressBarData animated striped variant="success" now={uploadPercentage5} label={`${uploadPercentage5}%`} />
                                            </Col>
                                            <Col  xs={12}>
                                                <input type='file' id='customFile5' className="custom-file-input" key={filekey}
                                                onChange={ e => 
                                                    {
                                                         setFile({ ...file, image5: e.target.files[0] })
                                                         setNewxml({ ...newxml, couponbtn: {
                                                            icon: newxml.couponbtn.icon,
                                                            title: newxml.couponbtn.title,
                                                            showbtn: newxml.couponbtn.showbtn,
                                                            coupondata : {
                                                                sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                                image1: newxml.couponbtn.coupondata.image1,
                                                                url1: newxml.couponbtn.coupondata.url1,
                                                                image2: newxml.couponbtn.coupondata.image2,
                                                                url2: newxml.couponbtn.coupondata.url2,
                                                                image3: newxml.couponbtn.coupondata.image3,
                                                                url3: newxml.couponbtn.coupondata.url3,
                                                                image4: newxml.couponbtn.coupondata.image4,
                                                                url4: newxml.couponbtn.coupondata.url4,
                                                                image5: e.target.files[0].name.replace(/-/g,""),
                                                                url5: newxml.couponbtn.coupondata.url5,
                                                                image6: newxml.couponbtn.coupondata.image6,
                                                                url6: newxml.couponbtn.coupondata.url6,
                                                            }
                                                        }})
                                                        setPreviewImage({ ...previewImage, previewImage5: URL.createObjectURL(e.target.files[0])  })
                                                        setFileDate5(new Date().toISOString())
                                                        setDisplayPreview("block")
                                                    }
                                                }
                                                />
                                                <FileLabel htmlFor="customFile5" className="custom-file-label">
                                                { newxml.couponbtn.coupondata.image5 }
                                                </FileLabel>
                                            </Col>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <Form.Control type="text" 
                                                value={newxml.couponbtn.coupondata.url5==null ? 
                                                    newxml.couponbtn.coupondata.url5 : 
                                                    newxml.couponbtn.coupondata.url5.replace(/&amp;frasl;|&frasl;/g,"/")}
                                                onChange={
                                                    e => setNewxml({ ...newxml, couponbtn: {
                                                        icon: newxml.couponbtn.icon,
                                                        title: newxml.couponbtn.title,
                                                        showbtn: newxml.couponbtn.showbtn,
                                                        coupondata : {
                                                            sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                            image1: newxml.couponbtn.coupondata.image1,
                                                            url1: newxml.couponbtn.coupondata.url1,
                                                            image2: newxml.couponbtn.coupondata.image2,
                                                            url2: newxml.couponbtn.coupondata.url2,
                                                            image3: newxml.couponbtn.coupondata.image3,
                                                            url3: newxml.couponbtn.coupondata.url3,
                                                            image4: newxml.couponbtn.coupondata.image4,
                                                            url4: newxml.couponbtn.coupondata.url4,
                                                            image5: newxml.couponbtn.coupondata.image5,
                                                            url5: e.target.value,
                                                            image6: newxml.couponbtn.coupondata.image6,
                                                            url6: newxml.couponbtn.coupondata.url6,
                                                        }
                                                    }})
                                                }/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Row>
                                            <Col xs={5}>
                                                  <ImageCol>
                                                <img src={ previewImage.previewImage6=="" ? "" : previewImage.previewImage6 } 
                                                style={{ height: "140px", width: "100%", display: displayPreview}} /> 
						                        </ImageCol>
                                            </Col>
 					                        <Col  xs={12} style={{ display: displayProgressBar }}>
                                                <ProgressBarData animated striped variant="success" now={uploadPercentage6} label={`${uploadPercentage6}%`} />
                                            </Col>
                                            <Col  xs={12}>
                                                <input type='file' id='customFile6' className="custom-file-input" key={filekey}
                                                onChange={ e => 
                                                    {
                                                         setFile({ ...file, image6: e.target.files[0] })
                                                         setNewxml({ ...newxml, couponbtn: {
                                                            icon: newxml.couponbtn.icon,
                                                            title: newxml.couponbtn.title,
                                                            showbtn: newxml.couponbtn.showbtn,
                                                            coupondata : {
                                                                sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                                image1: newxml.couponbtn.coupondata.image1,
                                                                url1: newxml.couponbtn.coupondata.url1,
                                                                image2: newxml.couponbtn.coupondata.image2,
                                                                url2: newxml.couponbtn.coupondata.url2,
                                                                image3: newxml.couponbtn.coupondata.image3,
                                                                url3: newxml.couponbtn.coupondata.url3,
                                                                image4: newxml.couponbtn.coupondata.image4,
                                                                url4: newxml.couponbtn.coupondata.url4,
                                                                image5: newxml.couponbtn.coupondata.image5,
                                                                url5: newxml.couponbtn.coupondata.url5,
                                                                image6: e.target.files[0].name.replace(/-/g,""),
                                                                url6: newxml.couponbtn.coupondata.url6,
                                                            }
                                                        }})
                                                            setPreviewImage({ ...previewImage, previewImage6: URL.createObjectURL(e.target.files[0])  })
                                                            setFileDate6(new Date().toISOString())
                                                            setDisplayPreview("block")

                                                    }
                                                }
                                                />
                                                <FileLabel htmlFor="customFile6" className="custom-file-label">
                                                { newxml.couponbtn.coupondata.image6 }
                                                </FileLabel>
                                            </Col>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <Form.Control type="text" 
                                                value={newxml.couponbtn.coupondata.url6==null ? 
                                                    newxml.couponbtn.coupondata.url6 : 
                                                    newxml.couponbtn.coupondata.url6.replace(/&amp;frasl;|&frasl;/g,"/")}
                                                onChange={
                                                    e => setNewxml({ ...newxml, couponbtn: {
                                                        icon: newxml.couponbtn.icon,
                                                        title: newxml.couponbtn.title,
                                                        showbtn: newxml.couponbtn.showbtn,
                                                        coupondata : {
                                                            sponsorheader: newxml.couponbtn.coupondata.sponsorheader,
                                                            image1: newxml.couponbtn.coupondata.image1,
                                                            url1: newxml.couponbtn.coupondata.url1,
                                                            image2: newxml.couponbtn.coupondata.image2,
                                                            url2: newxml.couponbtn.coupondata.url2,
                                                            image3: newxml.couponbtn.coupondata.image3,
                                                            url3: newxml.couponbtn.coupondata.url3,
                                                            image4: newxml.couponbtn.coupondata.image4,
                                                            url4: newxml.couponbtn.coupondata.url4,
                                                            image5: newxml.couponbtn.coupondata.image5,
                                                            url5: newxml.couponbtn.coupondata.url5,
                                                            image6: newxml.couponbtn.coupondata.image6,
                                                            url6: e.target.value,
                                                        }
                                                    }})
                                                }/>
                                        </Form.Group>
                                    </Col>
                               </Row>
                            </Col>
                        </Row> 
                    </DataContainer>
                    <Row>
                        <SaveButton type="submit" value="Save" variant="outline-dark" onClick={handleSave} >Save Clients Data</SaveButton>
                    </Row>
                </Container>
            </form>
        </Content>
    );
    
}