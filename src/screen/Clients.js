import React,{ useState, useEffect } from "react";
import { AdminNavbar } from "@molecule"
import { Form, Button, Container, Row, Col, Table, Modal, ProgressBar } from "react-bootstrap/"
import CustomLinks from "@screen/Customlinks"
import { Link } from "react-router-dom"
import CloseIcon from '@material-ui/icons/Close';
import styled from "@emotion/styled";
import axios from "axios"
var convert = require('xml-js');

require('dotenv').config({
    allowEmptyValues: true,
    path: '.'
})

const Content = styled.div({
    height: "auto",
    minHeight: "100vh"
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

const UpperCol = styled(Col)({
    display: "flex",
    alignItems: "baseline",
    marginTop: "20px",
})

const SaveButton = styled(Button)({
    margin: "30px auto 40px auto",
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

const FileLabel = styled.label({
    margin: "15px 0 0 3%",
    width: "94%"
})

const TableData = styled.td({
    padding: "5px", 
    fontSize: "14px",
    textAlign: "center"
})

const Required = styled.span({
    color: "red",
})

const ProgressBarData = styled(ProgressBar)({
    marginTop: "10px",
})

export default function Clients() {

    // hide and show the edit fields
    const [adminLoad, setAdminLoad] = useState(true)
    // activate when cloning
    const [cloneLoad, setCloneLoad] = useState(false)

    //getting overall items/data from clubdata
    const [items, setItems] = useState([]);

    //getting the id of specific client/clubdata
    const [value, setValue] = useState(0);

    //getting the id of specific client/clubdata for clone
    const [valueCustom, setValueCustom] = useState(0);

    //for appcode duplication
    const [countAppcode, setCountAppcode] = useState(0);

    //getting and setting clubname and id/appcode
    const [clubData, setClubData] = useState({
        clubname: "",
        clubid: "",
    })

    //For populating the fields using xml data
    const [field, setField] = useState({

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

    //showing and closing of cloning modal
    const [showCloneModal, setShowCloneModal] = useState(false);
    const handleShowCloneModal = () => setShowCloneModal(true);
    const handleCloseCloneModal = () => setShowCloneModal(false)

    //disable add new customlink when nothing is selected
    const [disableAddCLButton, setDisableAddCLButton] = useState(true);
    const handleDisableAddCLButton = () => setDisableAddCLButton(false);

    //disable clone new client when nothing is selected
    const [disableCloneButton, setDisableCloneButton] = useState(true);
    const handleDisableCloneButton = () => setDisableCloneButton(false);

    //Get all data from clubdata
    useEffect(() => {
        setInterval(() => {
            fetch(process.env.REACT_APP_API_URL+"/clubdata")
            .then(res => res.json())
            .then( res => {
                setItems(res.data)
            })
            .catch(err => {
                console.log(err)
            })
	    }, 1000);
    }, [])

    //Get specific data by ID
    useEffect(() => {

            if(value==0){
                handleClearData()
            }else{
                 //for customlink
                setValueCustom(value)

                let userID = value
                const url = process.env.REACT_APP_API_URL+"/get/"+userID
                fetch(url)
                .then(res => res.json())
                .then(res=>{

                    //xml to json
                    const data = res.data[0]
                    const xmlText = "<root>"+data.contentxml+"</root>"
                    var xmlResult = convert.xml2json(xmlText, {compact: true, spaces: 4});
                    const xmlJSON = JSON.parse(xmlResult)
                    const xml = xmlJSON.root

                    setAdminLoad(false)

                    URL.revokeObjectURL(previewImage.previewImage1)
                    URL.revokeObjectURL(previewImage.previewImage2)
                    URL.revokeObjectURL(previewImage.previewImage3)
                    URL.revokeObjectURL(previewImage.previewImage4)
                    URL.revokeObjectURL(previewImage.previewImage5)
                    URL.revokeObjectURL(previewImage.previewImage6)
                    URL.revokeObjectURL(previewImage.previewImageHeader)

                    setFileKey(Date.now())

                    setPreviewImage({
                        previewImage1:"",
                        previewImage2:"", 
                        previewImage3:"",
                        previewImage4:"",
                        previewImage5:"",
                        previewImage6:"",
                        previewImageHeader:"",
                    })

                    setFile({
                        image1:"",
                        image2:"", 
                        image3:"",
                        image4:"",
                        image5:"",
                        image6:"",
                        imageHeader:"",
                    })

                    setFileDateHeader("")
                    setFileDate1("")
                    setFileDate2("")
                    setFileDate3("")
                    setFileDate4("")
                    setFileDate5("")
                    setFileDate6("")

                    //setting clubname and id/appcode
                    setClubData({
                        clubname: data.clubname,
                        clubid: data.club_id,
                    })

                    //setting data for every field xml data -> json
                    setField({

                        logo: xml.logo._text==undefined ? "" : xml.logo._text,
                        publickey: xml.publickey._text==undefined ? "" : xml.publickey._text,
                        cmd_button_mode: xml.cmd_button_mode._text==undefined ? "" : xml.cmd_button_mode._text,
                        cmd_url: xml.cmd_url._text==undefined ? "" : xml.cmd_url._text,
                        cmd_text: xml.cmd_text._text==undefined ? "" : xml.cmd_text._text,
                        customtext: xml.customtext._text==undefined ? "" : xml.customtext._text,
                        customurl: xml.customurl._text==undefined ? "" : xml.customurl._text,

                        offers1: "",
                        offers2: "",
                        offers3: "",
                        offers4: "",
                        offers5: "",
                        offers6: "",

                        mainbtn1: {
                            title: xml.mainbtn1.title._text==undefined ? "" : xml.mainbtn1.title._text,
                            url: xml.mainbtn1.url._text==undefined ? "" : xml.mainbtn1.url._text,
                        },
                
                        mainbtn2: {
                            title: xml.mainbtn2.title._text==undefined ? "" : xml.mainbtn2.title._text,
                            url: xml.mainbtn2.url._text==undefined ? "" : xml.mainbtn2.url._text,
                        },

                        menubtn1: {
                            icon: xml.menubtn1.icon._text==undefined ? "" : xml.menubtn1.icon._text,
                            title: xml.menubtn1.title._text==undefined ? "" : xml.menubtn1.title._text,
                            url: xml.menubtn1.url._text==undefined ? "" : xml.menubtn1.url._text,
                        },
                
                        menubtn2: {
                            icon: xml.menubtn2.icon._text==undefined ? "" : xml.menubtn2.icon._text,
                            title: xml.menubtn2.title._text==undefined ? "" : xml.menubtn2.title._text,
                            url: xml.menubtn2.url._text==undefined ? "" : xml.menubtn2.url._text,
                        },
                
                        menubtn3: {
                            icon: xml.menubtn3.icon._text==undefined ? "" : xml.menubtn3.icon._text,
                            title: xml.menubtn3.title._text==undefined ? "" : xml.menubtn3.title._text,
                            url: xml.menubtn3.url._text==undefined ? "" : xml.menubtn3.url._text,
                        },

                        menubtn4: {
                            icon: xml.menubtn4.icon._text==undefined ? "" : xml.menubtn4.icon._text,
                            title: xml.menubtn4.title._text==undefined ? "" : xml.menubtn4.title._text,
                            url: xml.menubtn4.url._text==undefined ? "" : xml.menubtn4.url._text,
                            cmenu: xml.menubtn4.cmenu._text==undefined ? "" : xml.menubtn4.cmenu._text,
                        },
                
                        menubtn5: {
                            icon: xml.menubtn5.icon._text==undefined ? "" : xml.menubtn5.icon._text,
                            title: xml.menubtn5.title._text==undefined ? "" : xml.menubtn5.title._text,
                            url: xml.menubtn5.url._text==undefined ? "" : xml.menubtn5.url._text,
                            cmenu: xml.menubtn5.cmenu._text==undefined ? "" : xml.menubtn5.cmenu._text,
                        }, 
                        
                        menubtn6: {
                            icon: xml.menubtn6.icon._text==undefined ? "" : xml.menubtn6.icon._text,
                            title: xml.menubtn6.title._text==undefined ? "" : xml.menubtn6.title._text,
                            url: xml.menubtn6.url._text==undefined ? "" : xml.menubtn6.url._text,
                            cmenu: xml.menubtn6.cmenu._text==undefined ? "" : xml.menubtn6.cmenu._text,
                        },

                        couponbtn: {
                            icon: xml.couponbtn.icon._text==undefined ? "" : xml.couponbtn.icon._text,
                            title: xml.couponbtn.title._text==undefined ? "" : xml.couponbtn.title._text,
                            showbtn: xml.couponbtn.showbtn._text==undefined ? "" : xml.couponbtn.showbtn._text,
                            coupondata : {
                                sponsorheader: xml.couponbtn.coupondata.sponsorheader._text==undefined ? "" : xml.couponbtn.coupondata.sponsorheader._text,
                                image1: xml.couponbtn.coupondata.image1._text==undefined ? "" : xml.couponbtn.coupondata.image1._text,
                                url1: xml.couponbtn.coupondata.url1._text==undefined ? "" : xml.couponbtn.coupondata.url1._text,
                                image2:  xml.couponbtn.coupondata.image2._text==undefined ? "" : xml.couponbtn.coupondata.image2._text,
                                url2:  xml.couponbtn.coupondata.url2._text==undefined ? "" : xml.couponbtn.coupondata.url2._text,
                                image3:  xml.couponbtn.coupondata.image3._text==undefined ? "" : xml.couponbtn.coupondata.image3._text,
                                url3:  xml.couponbtn.coupondata.url3._text==undefined ? "" : xml.couponbtn.coupondata.url3._text,
                                image4:  xml.couponbtn.coupondata.image4._text==undefined ? "" : xml.couponbtn.coupondata.image4._text,
                                url4: xml.couponbtn.coupondata.url4._text==undefined ? "" : xml.couponbtn.coupondata.url4._text,
                                image5:  xml.couponbtn.coupondata.image5._text==undefined ? "" : xml.couponbtn.coupondata.image5._text,
                                url5:  xml.couponbtn.coupondata.url5._text==undefined ? "" : xml.couponbtn.coupondata.url5._text,
                                image6:  xml.couponbtn.coupondata.image6._text==undefined ? "" : xml.couponbtn.coupondata.image6._text,
                                url6:  xml.couponbtn.coupondata.url6._text==undefined ? "" : xml.couponbtn.coupondata.url6._text,
                            }
                        }
                    })
                    
                })
                .catch(err => {
                    console.log(err)
                })
            }

    }, [value])



    //For uploading images to server
    const onSubmit = async e => {

        e.preventDefault();

        if(clubData.clubid==""){
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
                        setFile({ ...file, imageHeader: "" })
                        setPreviewImage({ ...previewImage, previewImageHeader: "" })
                        setFileDateHeader("")
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
                        setFile({ ...file, image1: "" })
                        setPreviewImage({ ...previewImage, previewImage1: "" })
                        setFileDate1("")
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
                setFile({ ...file, image2: "" })
                        setPreviewImage({ ...previewImage, previewImage2: "" })
                setFileDate2("")
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
                setFile({ ...file, image3: "" })
                        setPreviewImage({ ...previewImage, previewImage3: "" })
                setFileDate3("")
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
                setFile({ ...file, image4: "" })
                        setPreviewImage({ ...previewImage, previewImage4: "" })
                setFileDate4("")
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
                setFile({ ...file, image5: "" })
                        setPreviewImage({ ...previewImage, previewImage5: "" })
                setFileDate5("")
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
                setFile({ ...file, image6: "" })
                        setPreviewImage({ ...previewImage, previewImage6: "" })
                setFileDate6("")
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

    //getting the appcode for duplication
    useEffect(() => {
        let club_id = clubData.clubid
        const url = process.env.REACT_APP_API_URL+"/getapp/"+club_id
        fetch(url)
        .then(res => res.json())
        .then(res=>{
             const data = res.data
             setCountAppcode(data.length)
        })
        .catch(err => {
            console.log(err)
        })
    }, [clubData.clubid])

    //For updating the xml clients data 
    function handleUpdateClientData(){

        var options = {compact: true, ignoreComment: true, spaces: 4, ignoreAttributes: "<root>"};
        var result = convert.json2xml(JSON.stringify({

                logo: fileDateHeader.replace(/:/g,"")+field.logo,
                publickey: field.publickey,
                cmd_button_mode: field.cmd_button_mode,
                cmd_url: field.cmd_url,
                cmd_text: field.cmd_text,
                customtext: field.customtext,
                customurl: field.customurl,

                offers1: "",
                offers2: "",
                offers3: "",
                offers4: "",
                offers5: "",
                offers6: "",

                mainbtn1: {
                    title: field.mainbtn1.title,
                    url: field.mainbtn1.url                
                },
        
                mainbtn2: {
                    title: field.mainbtn2.title,
                    url: field.mainbtn2.url
                },

                menubtn1: {
                    icon: field.menubtn1.icon,
                    title: field.menubtn1.title,
                    url: field.menubtn1.url,
                },
        
                menubtn2: {
                    icon: field.menubtn2.icon,
                    title: field.menubtn2.title,
                    url: field.menubtn2.url,
                },
        
                menubtn3: {
                    icon: field.menubtn3.icon,
                    title: field.menubtn3.title,
                    url: field.menubtn3.url,
                },

                menubtn4: {
                    icon: field.menubtn4.icon,
                    title: field.menubtn4.title,
                    url: field.menubtn4.url,
                    cmenu: field.menubtn4.cmenu,
                },
        
                menubtn5: {
                    icon: field.menubtn5.icon,
                    title: field.menubtn5.title,
                    url: field.menubtn5.url,
                    cmenu: field.menubtn5.cmenu,
                }, 
                
                menubtn6: {
                    icon: field.menubtn6.icon,
                    title: field.menubtn6.title,
                    url: field.menubtn6.url,
                    cmenu: field.menubtn6.cmenu,
                },

                couponbtn: {
                    icon: field.couponbtn.icon,
                    title: field.couponbtn.title,
                    showbtn: field.couponbtn.showbtn,
                    coupondata : {
                        sponsorheader: field.couponbtn.coupondata.sponsorheader,
                        image1: fileDate1.replace(/:/g,"")+field.couponbtn.coupondata.image1,
                        url1: field.couponbtn.coupondata.url1,
                        image2:  fileDate2.replace(/:/g,"")+field.couponbtn.coupondata.image2,
                        url2:  field.couponbtn.coupondata.url2,
                        image3:  fileDate3.replace(/:/g,"")+field.couponbtn.coupondata.image3,
                        url3:  field.couponbtn.coupondata.url3,
                        image4:  fileDate4.replace(/:/g,"")+field.couponbtn.coupondata.image4,
                        url4: field.couponbtn.coupondata.url4,
                        image5:  fileDate5.replace(/:/g,"")+field.couponbtn.coupondata.image5,
                        url5:  field.couponbtn.coupondata.url5,
                        image6:  fileDate6.replace(/:/g,"")+field.couponbtn.coupondata.image6,
                        url6:  field.couponbtn.coupondata.url6,
                    }
                }

        }), options);

        if(clubData.clubid==""){

            alert("AppCode is Required!")

        } else{

            if (countAppcode>=2){
                alert("The App Code already exists. Change the App Code and try again.")
            } else{
                
                //  get parameter id
                let Id = value
                // url 
                const baseUrl = process.env.REACT_APP_API_URL+"/update/"+Id
    
                const datapost = {
                    clubname : clubData.clubname,
                    club_id : clubData.clubid,
                    contentxml : result
                }
    
                axios.post(baseUrl,datapost)
                .then(res=>{
                    if (res.data.success===true) {
                        alert(res.data.message)
    
                        setValue(0)
    
                        setClubData({
                            clubname: "",
                            clubid: "",
                        })
                        
                        setField({
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
    
                        setFile({
                            image1:"",
                            image2:"", 
                            image3:"",
                            image4:"",
                            image5:"",
                            image6:"",
                            imageHeader:"",
                        })
    
               
                    }
                    else {
                        alert(res.data.message)
                    }
    
                }).catch(error=>{
                    alert("Error 34 "+error)
                })
            }
        }

        
    }

    //For updating the xml clients data (Cloning purposes)
    function handleCloneClientData(){

            setValueCustom(0)
            setAdminLoad(false)
            setCloneLoad(true)

            //setting clubname and id/appcode
            setClubData({ 
                clubname: clubData.clubname+" Cloned Client",
                clubid: "",
            })

            handleCloseCloneModal()

    }

    function handleCloneClientDataSave(){

        
        var options = {compact: true, ignoreComment: true, spaces: 4, ignoreAttributes: "<root>"};
        var result = convert.json2xml(JSON.stringify({

                logo: fileDateHeader.replace(/:/g,"")+field.logo,
                publickey: field.publickey,
                cmd_button_mode: field.cmd_button_mode,
                cmd_url: field.cmd_url,
                cmd_text: field.cmd_text,
                customtext: field.customtext,
                customurl: field.customurl,

                offers1: "",
                offers2: "",
                offers3: "",
                offers4: "",
                offers5: "",
                offers6: "",

                mainbtn1: {
                    title: field.mainbtn1.title,
                    url: field.mainbtn1.url                
                },
        
                mainbtn2: {
                    title: field.mainbtn2.title,
                    url: field.mainbtn2.url
                },

                menubtn1: {
                    icon: field.menubtn1.icon,
                    title: field.menubtn1.title,
                    url: field.menubtn1.url,
                },
        
                menubtn2: {
                    icon: field.menubtn2.icon,
                    title: field.menubtn2.title,
                    url: field.menubtn2.url,
                },
        
                menubtn3: {
                    icon: field.menubtn3.icon,
                    title: field.menubtn3.title,
                    url: field.menubtn3.url,
                },

                menubtn4: {
                    icon: field.menubtn4.icon,
                    title: field.menubtn4.title,
                    url: field.menubtn4.url,
                    cmenu: field.menubtn4.cmenu,
                },
        
                menubtn5: {
                    icon: field.menubtn5.icon,
                    title: field.menubtn5.title,
                    url: field.menubtn5.url,
                    cmenu: field.menubtn5.cmenu,
                }, 
                
                menubtn6: {
                    icon: field.menubtn6.icon,
                    title: field.menubtn6.title,
                    url: field.menubtn6.url,
                    cmenu: field.menubtn6.cmenu,
                },

                couponbtn: {
                    icon: field.couponbtn.icon,
                    title: field.couponbtn.title,
                    showbtn: field.couponbtn.showbtn,
                    coupondata : {
                        sponsorheader: field.couponbtn.coupondata.sponsorheader,
                        image1: fileDate1.replace(/:/g,"")+field.couponbtn.coupondata.image1,
                        url1: field.couponbtn.coupondata.url1,
                        image2:  fileDate2.replace(/:/g,"")+field.couponbtn.coupondata.image2,
                        url2:  field.couponbtn.coupondata.url2,
                        image3:  fileDate3.replace(/:/g,"")+field.couponbtn.coupondata.image3,
                        url3:  field.couponbtn.coupondata.url3,
                        image4:  fileDate4.replace(/:/g,"")+field.couponbtn.coupondata.image4,
                        url4: field.couponbtn.coupondata.url4,
                        image5:  fileDate5.replace(/:/g,"")+field.couponbtn.coupondata.image5,
                        url5:  field.couponbtn.coupondata.url5,
                        image6:  fileDate6.replace(/:/g,"")+field.couponbtn.coupondata.image6,
                        url6:  field.couponbtn.coupondata.url6,
                    }
                }

        }), options);
        
        if(clubData.clubid==""){
            alert("AppCode is Required!")
        }else{
            if (countAppcode>=2){
                alert("The App Code already exists. Change the App Code and try again.")
            } else{
                
              const baseUrl = process.env.REACT_APP_API_URL+"/clone"

                const datapost = {
                    clubname : clubData.clubname,
                    club_id : clubData.clubid,
                    contentxml : result
                }

                axios.post(baseUrl,datapost)
                .then(res=>{
                    if (res.data.success===true) {
                        alert(res.data.message)

                        setValue(0)

                        setCloneLoad(false)

                        setClubData({
                            clubname: "",
                            clubid: "",
                        })
                        
                        setField({
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

                        setFile({
                            image1:"",
                            image2:"", 
                            image3:"",
                            image4:"",
                            image5:"",
                            image6:"",
                            imageHeader:"",
                        })

            
                    }
                    else {
                        alert(res.data.message)
                    }

                }).catch(error=>{
                    alert("Error 34 "+error)
                })
            }
        }
        
    }

    function handleClearData(){

        setValue(0)
        setValueCustom(0)

        URL.revokeObjectURL(previewImage.previewImage1)
        URL.revokeObjectURL(previewImage.previewImage2)
        URL.revokeObjectURL(previewImage.previewImage3)
        URL.revokeObjectURL(previewImage.previewImage4)
        URL.revokeObjectURL(previewImage.previewImage5)
        URL.revokeObjectURL(previewImage.previewImage6)
        URL.revokeObjectURL(previewImage.previewImageHeader)

        setFileKey(Date.now())

        setPreviewImage({
            previewImage1:"",
            previewImage2:"", 
            previewImage3:"",
            previewImage4:"",
            previewImage5:"",
            previewImage6:"",
            previewImageHeader:"",
        })

        setFile({
            image1:"",
            image2:"", 
            image3:"",
            image4:"",
            image5:"",
            image6:"",
            imageHeader:"",
        })

        setFileDateHeader("")
        setFileDate1("")
        setFileDate2("")
        setFileDate3("")
        setFileDate4("")
        setFileDate5("")
        setFileDate6("")

        setDisplayPreview("none")

        setClubData({
            clubname: "",
            clubid: "",
        })

        setField({
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

    }
 

    return (
        <div>
        <Content>
        <AdminNavbar />
            <form onSubmit={onSubmit}>
                <Container>
                    <Row>
                        <Col xs={8}>
                            <Form.Control as="select" value={value} 
                                onChange={ e => 
                                    {
                                        setValue(e.target.value)
                                        setDisplayPreview("block")
                                        setCloneLoad(false)
                                        handleDisableAddCLButton()
                                    }
                                }>
                                <option value="">Select a Client to View/Edit</option>
                                {
                                    items.map(item => (
                                        <option key={item.id} value={item.id}>
                                            { item.clubname.replace(/%20|"/g,' ') }
                                        </option>
                                    ))
                                }
                            </Form.Control>
                        </Col>
                        <Col xs={4}>
                            <Link style={{ marginRight: "10px" }} className="btn btn-success" to="/new">Add New Client</Link>
                            <Link className="btn btn-info" onClick={() => {
                                handleClearData()
                                handleShowCloneModal()

                            }}>Clone New Client</Link>
                        </Col>
                    </Row>
                    <DataContainer style={{ display: adminLoad ? "none" : "block" }}>
                        <Row>
                            <Col xs={10}>
                                <Form.Group controlId="clubname">
                                    <Form.Label>Clients Name</Form.Label>
                                    <Form.Control type="text" value={clubData.clubname.replace(/%20|"/g,' ')} 
                                    onChange={
                                        e => setClubData({ ...clubData, clubname: e.target.value })
                                    }/>
                                </Form.Group>

                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <Form.Group>
                                    <Form.Label>App Code</Form.Label>
                                    <Form.Control type="text" value={clubData.clubid.replace(/%20|"/g,' ')} 
                                    onChange={
                                        e => setClubData({ ...clubData, clubid: e.target.value })
                                    }/>
                                </Form.Group>
                            </Col>
			                <Col xs={2}>
                                <Form.Group>
                                    <Form.Label>Journey Option</Form.Label>
                                    <Form.Control as="select" value={field.cmd_button_mode} 
                                        onChange={  
                                            e => setField({ ...field, cmd_button_mode: e.target.value }) 
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
                                                setField({ ...field, logo: e.target.files[0].name.replace(/-/g,"") })
                                            setPreviewImage({ ...previewImage, previewImageHeader: URL.createObjectURL(e.target.files[0])  })
                                            setFileDateHeader(new Date().toISOString())
                                        }
				                    }/>
                                <FileLabel htmlFor="app-image" className="custom-file-label">
                                { field.logo }
                                </FileLabel>
                            </UpperCol>
			                <Col xs={2}>
                                <HeaderImageCol>
                                    <img src={ previewImage.previewImageHeader=="" ? process.env.REACT_APP_API_URL+"/uploads/"+field.logo : previewImage.previewImageHeader } style={{ height: "180px", width: "100%", display: displayPreview}} />
                                </HeaderImageCol>
                            </Col>
                        </Row>
                    </DataContainer>
                    <DataContainer style={{ display: adminLoad ? "none" : "block" }}>
                        <Title>Welcome Message</Title>
                        <Row>
                            <Col xs={2}>
                                <FormLabel>Message : </FormLabel>
                            </Col>
                            <Col xs={10}>
                                <Form.Group>
                                    <Form.Control type="text" value={field.customtext.replace(/%20/g,' ')}
                                    onChange={
                                        e => setField({ ...field, customtext: e.target.value })
                                    }/>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <FormLabel>Link : </FormLabel>
                            </Col>
                            <Col xs={10}>
                                <Form.Group>
                                    <Form.Control type="text" value={ field.customurl==null ? field.customurl : field.customurl.replace(/&amp;frasl;|&frasl;/g,"/")}
                                    onChange={
                                        e => setField({ ...field, customurl: e.target.value })
                                    }/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </DataContainer>
                    <DataContainer style={{ display: adminLoad ? "none" : "block" }}>
                        <Title>Homepage Links</Title>
                        <Row>
                            <Col xs={3}>
                                <Form.Group>
                                    <Form.Label>Button Label</Form.Label>
                                    <Form.Control type="text" value={field.mainbtn1.title.replace(/%20/g,' ')}
                                    onChange={
                                        e => setField({ ...field, mainbtn1: {
                                            title : e.target.value,
                                            url: field.mainbtn1.url
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                            <Col xs={9}>
                                <Form.Group>
                                    <Form.Label>Button Link</Form.Label>
                                    <Form.Control type="text" value={ field.mainbtn1.url==null ? field.mainbtn1.url : field.mainbtn1.url.replace(/&amp;frasl;|&frasl;/g,"/")}
                                    onChange={
                                        e => setField({ ...field, mainbtn1: {
                                            title : field.mainbtn1.title,
                                            url: e.target.value
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group>
                                    <Form.Control type="text" value={field.mainbtn2.title.replace(/%20/g,' ')}
                                    onChange={
                                        e => setField({ ...field, mainbtn2: {
                                            title : e.target.value,
                                            url: field.mainbtn2.url
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                            <Col xs={9}>
                                <Form.Group >
                                    <Form.Control type="text" value={ field.mainbtn2.url==null ? field.mainbtn2.url : field.mainbtn2.url.replace(/&amp;frasl;|&frasl;/g,"/")}
                                    onChange={
                                        e => setField({ ...field, mainbtn2: {
                                            title : field.mainbtn2.title,
                                            url: e.target.value
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </DataContainer>
                    <DataContainer style={{ display: adminLoad ? "none" : "block" }}>
                        <Title>Menu Screen</Title>
                        <Row>
                            <Col xs={{span: 2, offset: 1}}>
                                <Form.Group>
                                    <Form.Label>Icon</Form.Label>
                                    <Form.Control as="select" value={field.menubtn1.icon} onChange={
                                        e => setField({ ...field, menubtn1: {
                                            icon: e.target.value,
                                            title: field.menubtn1.title,
                                            url: field.menubtn1.url,
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
                            <Col xs={3}>
                                <Form.Group>
                                    <Form.Label>Button Label</Form.Label>
                                    <Form.Control type="text" value={field.menubtn1.title.replace(/%20/g,' ')}
                                    onChange={
                                        e => setField({ ...field, menubtn1: {
                                            icon: field.menubtn1.icon,
                                            title: e.target.value,
                                            url: field.menubtn1.url,
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Button Link</Form.Label>
                                    <Form.Control type="text" value={field.menubtn1.url==null ? field.menubtn1.url : field.menubtn1.url.replace(/&amp;frasl;|&frasl;/g,"/")}
                                    onChange={
                                        e => setField({ ...field, menubtn1: {
                                            icon: field.menubtn1.icon,
                                            title: field.menubtn1.title,
                                            url: e.target.value,
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{span: 2, offset: 1}}>
                                <Form.Group>
                                    <Form.Control as="select" value={field.menubtn2.icon} onChange={
                                        e => setField({ ...field, menubtn2: {
                                            icon: e.target.value,
                                            title: field.menubtn2.title,
                                            url: field.menubtn2.url,
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
                            <Col xs={3}>
                                <Form.Group>
                                    <Form.Control type="text" value={field.menubtn2.title.replace(/%20/g,' ')}
                                    onChange={
                                        e => setField({ ...field, menubtn2: {
                                            icon: field.menubtn2.icon,
                                            title: e.target.value,
                                            url: field.menubtn2.url,
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Control type="text" value={field.menubtn2.url==null ? field.menubtn2.url : field.menubtn2.url.replace(/&amp;frasl;|&frasl;/g,"/")}
                                    onChange={
                                        e => setField({ ...field, menubtn2: {
                                            icon: field.menubtn2.icon,
                                            title: field.menubtn2.title,
                                            url: e.target.value,
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{span: 2, offset: 1}}>
                                <Form.Group>
                                    <Form.Control as="select" value={field.menubtn3.icon} onChange={
                                        e => setField({ ...field, menubtn3: {
                                            icon: e.target.value,
                                            title: field.menubtn3.title,
                                            url: field.menubtn1.url,
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
                            <Col xs={3}>
                                <Form.Group>
                                    <Form.Control type="text" value={field.menubtn3.title.replace(/%20/g,' ')}
                                    onChange={
                                        e => setField({ ...field, menubtn3: {
                                            icon: field.menubtn3.icon,
                                            title: e.target.value,
                                            url: field.menubtn3.url,
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>  
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Control type="text" value={field.menubtn3.url==null ? field.menubtn3.url : field.menubtn3.url.replace(/&amp;frasl;|&frasl;/g,"/")}
                                    onChange={
                                        e => setField({ ...field, menubtn3: {
                                            icon: field.menubtn3.icon,
                                            title: field.menubtn3.title,
                                            url: e.target.value,
                                        }})
                                    }/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                                <Checkbox type="checkbox" 
                                    checked={ field.menubtn4.cmenu==="true" ? false : true }
                                    onChange={
                                        () => field.menubtn4.cmenu === "false" ? 
                                        setField({ ...field, menubtn4: {
                                            icon : field.menubtn4.icon,
                                            title: field.menubtn4.title,
                                            url: field.menubtn4.url,
                                            cmenu: "true"
                                        }}) : 
                                        setField({ ...field, menubtn4: {
                                            icon : field.menubtn4.icon,
                                            title: field.menubtn4.title,
                                            url: field.menubtn4.url,
                                            cmenu: "false"
                                        }}) 
                                    }
                                />
                            </Col>
                            <Col xs={2}>
                                <Form.Group >
                                    <Form.Control as="select" value={field.menubtn4.icon} 
                                    onChange={
                                        e => setField({ ...field, menubtn4: {
                                            icon: e.target.value,
                                            title: field.menubtn4.title,
                                            url: field.menubtn4.url,
                                            cmenu: field.menubtn4.cmenu,
                                        }})
                                    }
                                    readOnly={ field.menubtn4.cmenu==="true" ? true : false }>
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
                            <Col xs={3}>
                                <Form.Group >
                                    <Form.Control type="text" value={field.menubtn4.title==null ? field.menubtn4.title : field.menubtn4.title.replace(/%20/g,' ')}
                                    onChange={
                                        e => setField({ ...field, menubtn4: {
                                            icon: field.menubtn4.icon,
                                            title: e.target.value,
                                            url: field.menubtn4.url,
                                            cmenu: field.menubtn4.cmenu,
                                        }})
                                    }
                                    readOnly={ field.menubtn4.cmenu==="true" ? true : false }/>
                                </Form.Group>
                            </Col>  
                            <Col xs={6}>
                                <Form.Group >
                                    <Form.Control type="text" value={field.menubtn4.url==null ? field.menubtn4.url : field.menubtn4.url.replace(/&amp;frasl;|&frasl;/g,"/")}
                                    onChange={
                                        e => setField({ ...field, menubtn4: {
                                            icon: field.menubtn4.icon,
                                            title: field.menubtn4.title,
                                            url: e.target.value,
                                            cmenu: field.menubtn4.cmenu,
                                        }})
                                    }
                                    readOnly={ field.menubtn4.cmenu==="true" ? true : false }/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                                <Checkbox type="checkbox" 
                                    checked={ field.menubtn5.cmenu==="true" ? false : true }
                                    onChange={
                                        () => field.menubtn5.cmenu === "false" ? 
                                        setField({ ...field, menubtn5: {
                                            icon : field.menubtn5.icon,
                                            title: field.menubtn5.title,
                                            url: field.menubtn5.url,
                                            cmenu: "true"
                                        }}) : 
                                        setField({ ...field, menubtn5: {
                                            icon : field.menubtn5.icon,
                                            title: field.menubtn5.title,
                                            url: field.menubtn5.url,
                                            cmenu: "false"
                                        }}) 
                                    }
                                />
                            </Col>
                            <Col xs={2}>
                                <Form.Group >
                                    <Form.Control as="select" value={field.menubtn5.icon} 
                                    onChange={
                                        e => setField({ ...field, menubtn5: {
                                            icon: e.target.value,
                                            title: field.menubtn5.title,
                                            url: field.menubtn5.url,
                                            cmenu: field.menubtn5.cmenu,
                                        }})
                                    }
                                    readOnly={ field.menubtn5.cmenu==="true" ? true : false }>
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
                            <Col xs={3}>
                                <Form.Group >
                                    <Form.Control type="text" value={field.menubtn5.title==null ? field.menubtn5.title : field.menubtn5.title.replace(/%20/g,' ')}
                                    onChange={
                                        e => setField({ ...field, menubtn5: {
                                            icon: field.menubtn5.icon,
                                            title: e.target.value,
                                            url: field.menubtn5.url,
                                            cmenu: field.menubtn5.cmenu,
                                        }})
                                    }
                                    readOnly={ field.menubtn5.cmenu==="true" ? true : false }/>
                                </Form.Group>
                            </Col>  
                            <Col xs={6}>
                                <Form.Group >
                                    <Form.Control type="text" value={field.menubtn5.url==null ? field.menubtn5.url : field.menubtn5.url.replace(/&amp;frasl;|&frasl;/g,"/")}
                                    onChange={
                                        e => setField({ ...field, menubtn5: {
                                            icon: field.menubtn5.icon,
                                            title: field.menubtn5.title,
                                            url: e.target.value,
                                            cmenu: field.menubtn5.cmenu,
                                        }})
                                    }
                                    readOnly={ field.menubtn5.cmenu==="true" ? true : false }/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                                <Checkbox type="checkbox" 
                                    checked={ field.menubtn6.cmenu==="true" ? false : true }
                                    onChange={
                                        () => field.menubtn6.cmenu === "false" ? 
                                        setField({ ...field, menubtn6: {
                                            icon : field.menubtn6.icon,
                                            title: field.menubtn6.title,
                                            url: field.menubtn6.url,
                                            cmenu: "true"
                                        }}) : 
                                        setField({ ...field, menubtn6: {
                                            icon : field.menubtn6.icon,
                                            title: field.menubtn6.title,
                                            url: field.menubtn6.url,
                                            cmenu: "false"
                                        }}) 
                                    }
                                />
                            </Col>
                            <Col xs={2}>
                                <Form.Group>
                                    <Form.Control as="select" value={field.menubtn6.icon} 
                                    onChange={
                                        e => setField({ ...field, menubtn6: {
                                            icon: e.target.value,
                                            title: field.menubtn6.title,
                                            url: field.menubtn6.url,
                                            cmenu: field.menubtn6.cmenu,
                                        }})
                                    }
                                    readOnly={ field.menubtn6.cmenu==="true" ? true : false }>
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
                            <Col xs={3}>
                                <Form.Group >
                                    <Form.Control type="text" value={field.menubtn6.title==null ? field.menubtn6.title : field.menubtn6.title.replace(/%20/g,' ')}
                                    onChange={
                                        e => setField({ ...field, menubtn6: {
                                            icon: field.menubtn6.icon,
                                            title: e.target.value,
                                            url: field.menubtn6.url,
                                            cmenu: field.menubtn6.cmenu,
                                        }})
                                    }
                                    readOnly={ field.menubtn6.cmenu==="true" ? true : false }/>
                                </Form.Group>
                            </Col>  
                            <Col xs={6}>
                                <Form.Group >
                                    <Form.Control type="text" value={field.menubtn6.url==null ? field.menubtn6.url : field.menubtn6.url.replace(/&amp;frasl;|&frasl;/g,"/")}
                                    onChange={
                                        e => setField({ ...field, menubtn6: {
                                            icon: field.menubtn6.icon,
                                            title: field.menubtn6.title,
                                            url: e.target.value,
                                            cmenu: field.menubtn6.cmenu,
                                        }})
                                    }
                                    readOnly={ field.menubtn6.cmenu==="true" ? true : false }/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                            <Checkbox type="checkbox" 
                                    checked={ field.couponbtn.showbtn==="true" ? true : false }
                                    onChange={
                                        () => field.couponbtn.showbtn === "true" ? 
                                        setField({ ...field, couponbtn: {
                                            icon: field.couponbtn.icon,
                                            title: field.couponbtn.title,
                                            showbtn: "false",
                                            coupondata : {
                                                sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                image1: field.couponbtn.coupondata.image1,
                                                url1: field.couponbtn.coupondata.url1,
                                                image2: field.couponbtn.coupondata.image2,
                                                url2: field.couponbtn.coupondata.url2,
                                                image3: field.couponbtn.coupondata.image3,
                                                url3: field.couponbtn.coupondata.url3,
                                                image4: field.couponbtn.coupondata.image4,
                                                url4: field.couponbtn.coupondata.url4,
                                                image5: field.couponbtn.coupondata.image5,
                                                url5: field.couponbtn.coupondata.url5,
                                                image6: field.couponbtn.coupondata.image6,
                                                url6: field.couponbtn.coupondata.url6,
                                            }
                                        }}) : 
                                        setField({ ...field, couponbtn: {
                                            icon: field.couponbtn.icon,
                                            title: field.couponbtn.title,
                                            showbtn: "true",
                                            coupondata : {
                                                sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                image1: field.couponbtn.coupondata.image1,
                                                url1: field.couponbtn.coupondata.url1,
                                                image2: field.couponbtn.coupondata.image2,
                                                url2: field.couponbtn.coupondata.url2,
                                                image3: field.couponbtn.coupondata.image3,
                                                url3: field.couponbtn.coupondata.url3,
                                                image4: field.couponbtn.coupondata.image4,
                                                url4: field.couponbtn.coupondata.url4,
                                                image5: field.couponbtn.coupondata.image5,
                                                url5: field.couponbtn.coupondata.url5,
                                                image6: field.couponbtn.coupondata.image6,
                                                url6: field.couponbtn.coupondata.url6,
                                            }
                                        }}) 
                                    }
                                />
                            </Col>
                            <Col xs={2}>
                                <FormLabel>Sponsor </FormLabel>
                            </Col>
                            <Col xs={9}>
                                <Form.Group >
                                    <Form.Control type="text" value={field.couponbtn.title.replace(/%20/g,' ')}
                                    onChange={
                                        e => setField({ ...field, couponbtn: {
                                            icon: field.couponbtn.icon,
                                            title: e.target.value,
                                            showbtn: field.couponbtn.showbtn,
                                            coupondata : {
                                                sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                image1: field.couponbtn.coupondata.image1,
                                                url1: field.couponbtn.coupondata.url1,
                                                image2: field.couponbtn.coupondata.image2,
                                                url2: field.couponbtn.coupondata.url2,
                                                image3: field.couponbtn.coupondata.image3,
                                                url3: field.couponbtn.coupondata.url3,
                                                image4: field.couponbtn.coupondata.image4,
                                                url4: field.couponbtn.coupondata.url4,
                                                image5: field.couponbtn.coupondata.image5,
                                                url5: field.couponbtn.coupondata.url5,
                                                image6: field.couponbtn.coupondata.image6,
                                                url6: field.couponbtn.coupondata.url6,
                                            }
                                        }})
                                    }
                                    readOnly={ field.couponbtn.showbtn==="true" ? false : true }/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </DataContainer>
                    <DataContainer style={{ display: adminLoad ? "none" : "block" }}>
                        <Row>
                            <Col xs={6}>
                                <Form.Group >
                                    <Form.Label>Resources Header</Form.Label>
                                    <Form.Control type="text" 
                                    value={field.couponbtn.coupondata.sponsorheader==null ? field.couponbtn.coupondata.sponsorheader : field.couponbtn.coupondata.sponsorheader.replace(/%20/g,' ')}
                                    onChange={
                                        e => setField({ ...field, couponbtn: {
                                            icon: field.couponbtn.icon,
                                            title: field.couponbtn.title,
                                            showbtn: field.couponbtn.showbtn,
                                            coupondata : {
                                                sponsorheader: e.target.value,
                                                image1: field.couponbtn.coupondata.image1,
                                                url1: field.couponbtn.coupondata.url1,
                                                image2: field.couponbtn.coupondata.image2,
                                                url2: field.couponbtn.coupondata.url2,
                                                image3: field.couponbtn.coupondata.image3,
                                                url3: field.couponbtn.coupondata.url3,
                                                image4: field.couponbtn.coupondata.image4,
                                                url4: field.couponbtn.coupondata.url4,
                                                image5: field.couponbtn.coupondata.image5,
                                                url5: field.couponbtn.coupondata.url5,
                                                image6: field.couponbtn.coupondata.image6,
                                                url6: field.couponbtn.coupondata.url6,
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
                                                    <img src={ previewImage.previewImage1=="" ? process.env.REACT_APP_API_URL+"/uploads/resources/"+field.couponbtn.coupondata.image1 : previewImage.previewImage1 } 
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
                                                         setField({ ...field, couponbtn: {
                                                            icon: field.couponbtn.icon,
                                                            title: field.couponbtn.title,
                                                            showbtn: field.couponbtn.showbtn,
                                                            coupondata : {
                                                                sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                                image1: e.target.files[0].name.replace(/-/g,""),
                                                                url1: field.couponbtn.coupondata.url1,
                                                                image2: field.couponbtn.coupondata.image2,
                                                                url2: field.couponbtn.coupondata.url2,
                                                                image3: field.couponbtn.coupondata.image3,
                                                                url3: field.couponbtn.coupondata.url3,
                                                                image4: field.couponbtn.coupondata.image4,
                                                                url4: field.couponbtn.coupondata.url4,
                                                                image5: field.couponbtn.coupondata.image5,
                                                                url5: field.couponbtn.coupondata.url5,
                                                                image6: field.couponbtn.coupondata.image6,
                                                                url6: field.couponbtn.coupondata.url6,
                                                            }
                                                        }})
                                                            setPreviewImage({ ...previewImage, previewImage1: URL.createObjectURL(e.target.files[0])  })
                                                            setFileDate1(new Date().toISOString())
                                                    }
                                                }
                                                />
                                                <FileLabel htmlFor="customFile" className="custom-file-label">
                                                { field.couponbtn.coupondata.image1 }
                                                </FileLabel>
						
                                            </Col>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <Form.Control type="text" 
                                                value={field.couponbtn.coupondata.url1==null ? 
                                                    field.couponbtn.coupondata.url1 : 
                                                    field.couponbtn.coupondata.url1.replace(/&amp;frasl;|&frasl;/g,"/")}
                                                onChange={
                                                    e => setField({ ...field, couponbtn: {
                                                        icon: field.couponbtn.icon,
                                                        title: field.couponbtn.title,
                                                        showbtn: field.couponbtn.showbtn,
                                                        coupondata : {
                                                            sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                            image1: field.couponbtn.coupondata.image1,
                                                            url1: e.target.value,
                                                            image2: field.couponbtn.coupondata.image2,
                                                            url2: field.couponbtn.coupondata.url2,
                                                            image3: field.couponbtn.coupondata.image3,
                                                            url3: field.couponbtn.coupondata.url3,
                                                            image4: field.couponbtn.coupondata.image4,
                                                            url4: field.couponbtn.coupondata.url4,
                                                            image5: field.couponbtn.coupondata.image5,
                                                            url5: field.couponbtn.coupondata.url5,
                                                            image6: field.couponbtn.coupondata.image6,
                                                            url6: field.couponbtn.coupondata.url6,
                                                        }
                                                    }})
                                                }/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Row>
                                            <Col xs={5}>
                                                <ImageCol>
                                                    <img src={ previewImage.previewImage2=="" ? process.env.REACT_APP_API_URL+"/uploads/resources/"+field.couponbtn.coupondata.image2 : previewImage.previewImage2 } 
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
                                                         setField({ ...field, couponbtn: {
                                                            icon: field.couponbtn.icon,
                                                            title: field.couponbtn.title,
                                                            showbtn: field.couponbtn.showbtn,
                                                            coupondata : {
                                                                sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                                image1: field.couponbtn.coupondata.image1,
                                                                url1: field.couponbtn.coupondata.url1,
                                                                image2: e.target.files[0].name.replace(/-/g,""),
                                                                url2: field.couponbtn.coupondata.url2,
                                                                image3: field.couponbtn.coupondata.image3,
                                                                url3: field.couponbtn.coupondata.url3,
                                                                image4: field.couponbtn.coupondata.image4,
                                                                url4: field.couponbtn.coupondata.url4,
                                                                image5: field.couponbtn.coupondata.image5,
                                                                url5: field.couponbtn.coupondata.url5,
                                                                image6: field.couponbtn.coupondata.image6,
                                                                url6: field.couponbtn.coupondata.url6,
                                                            }
                                                        }})
                                                            setPreviewImage({ ...previewImage, previewImage2: URL.createObjectURL(e.target.files[0])  })
                                                            setFileDate2(new Date().toISOString())
                                                    }
                                                }
                                                />
                                                <FileLabel htmlFor="customFile2" className="custom-file-label">
                                                { field.couponbtn.coupondata.image2 }
                                                </FileLabel>
                                            </Col>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <Form.Control type="text" 
                                                value={field.couponbtn.coupondata.url2==null ? 
                                                    field.couponbtn.coupondata.url2 : 
                                                    field.couponbtn.coupondata.url2.replace(/&amp;frasl;|&frasl;/g,"/")}
                                                onChange={
                                                    e => setField({ ...field, couponbtn: {
                                                        icon: field.couponbtn.icon,
                                                        title: field.couponbtn.title,
                                                        showbtn: field.couponbtn.showbtn,
                                                        coupondata : {
                                                            sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                            image1: field.couponbtn.coupondata.image1,
                                                            url1: field.couponbtn.coupondata.url1,
                                                            image2: field.couponbtn.coupondata.image2,
                                                            url2: e.target.value,
                                                            image3: field.couponbtn.coupondata.image3,
                                                            url3: field.couponbtn.coupondata.url3,
                                                            image4: field.couponbtn.coupondata.image4,
                                                            url4: field.couponbtn.coupondata.url4,
                                                            image5: field.couponbtn.coupondata.image5,
                                                            url5: field.couponbtn.coupondata.url5,
                                                            image6: field.couponbtn.coupondata.image6,
                                                            url6: field.couponbtn.coupondata.url6,
                                                        }
                                                    }})
                                                }/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Row>
                                            <Col xs={5}>
                                                 <ImageCol>
                                                    <img src={ previewImage.previewImage3=="" ? process.env.REACT_APP_API_URL+"/uploads/resources/"+field.couponbtn.coupondata.image3 : previewImage.previewImage3 } 
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
                                                         setField({ ...field, couponbtn: {
                                                            icon: field.couponbtn.icon,
                                                            title: field.couponbtn.title,
                                                            showbtn: field.couponbtn.showbtn,
                                                            coupondata : {
                                                                sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                                image1: field.couponbtn.coupondata.image1,
                                                                url1: field.couponbtn.coupondata.url1,
                                                                image2: field.couponbtn.coupondata.image2,
                                                                url2: field.couponbtn.coupondata.url2,
                                                                image3: e.target.files[0].name.replace(/-/g,""),
                                                                url3: field.couponbtn.coupondata.url3,
                                                                image4: field.couponbtn.coupondata.image4,
                                                                url4: field.couponbtn.coupondata.url4,
                                                                image5: field.couponbtn.coupondata.image5,
                                                                url5: field.couponbtn.coupondata.url5,
                                                                image6: field.couponbtn.coupondata.image6,
                                                                url6: field.couponbtn.coupondata.url6,
                                                            }
                                                        }})
                                                            setPreviewImage({ ...previewImage, previewImage3: URL.createObjectURL(e.target.files[0])  })
                                                            setFileDate3(new Date().toISOString())

                                                    }
                                                }
                                                />
                                                <FileLabel htmlFor="customFile3" className="custom-file-label">
                                                { field.couponbtn.coupondata.image3 }
                                                </FileLabel>
                                            </Col>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <Form.Control type="text" 
                                                value={field.couponbtn.coupondata.url3==null ? 
                                                    field.couponbtn.coupondata.url3 : 
                                                    field.couponbtn.coupondata.url3.replace(/&amp;frasl;|&frasl;/g,"/")}
                                                onChange={
                                                    e => setField({ ...field, couponbtn: {
                                                        icon: field.couponbtn.icon,
                                                        title: field.couponbtn.title,
                                                        showbtn: field.couponbtn.showbtn,
                                                        coupondata : {
                                                            sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                            image1: field.couponbtn.coupondata.image1,
                                                            url1: field.couponbtn.coupondata.url1,
                                                            image2: field.couponbtn.coupondata.image2,
                                                            url2: field.couponbtn.coupondata.url2,
                                                            image3: field.couponbtn.coupondata.image3,
                                                            url3: e.target.value,
                                                            image4: field.couponbtn.coupondata.image4,
                                                            url4: field.couponbtn.coupondata.url4,
                                                            image5: field.couponbtn.coupondata.image5,
                                                            url5: field.couponbtn.coupondata.url5,
                                                            image6: field.couponbtn.coupondata.image6,
                                                            url6: field.couponbtn.coupondata.url6,
                                                        }
                                                    }})
                                                }/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Row>
                                            <Col xs={5}>
                                                 <ImageCol>
                                                    <img src={ previewImage.previewImage4=="" ? process.env.REACT_APP_API_URL+"/uploads/resources/"+field.couponbtn.coupondata.image4 : previewImage.previewImage4 } 
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
                                                         setField({ ...field, couponbtn: {
                                                            icon: field.couponbtn.icon,
                                                            title: field.couponbtn.title,
                                                            showbtn: field.couponbtn.showbtn,
                                                            coupondata : {
                                                                sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                                image1: field.couponbtn.coupondata.image1,
                                                                url1: field.couponbtn.coupondata.url1,
                                                                image2: field.couponbtn.coupondata.image2,
                                                                url2: field.couponbtn.coupondata.url2,
                                                                image3: field.couponbtn.coupondata.image3,
                                                                url3: field.couponbtn.coupondata.url3,
                                                                image4: e.target.files[0].name.replace(/-/g,""),
                                                                url4: field.couponbtn.coupondata.url4,
                                                                image5: field.couponbtn.coupondata.image5,
                                                                url5: field.couponbtn.coupondata.url5,
                                                                image6: field.couponbtn.coupondata.image6,
                                                                url6: field.couponbtn.coupondata.url6,
                                                            }
                                                        }})
                                                            setPreviewImage({ ...previewImage, previewImage4: URL.createObjectURL(e.target.files[0])  })
                                                            setFileDate4(new Date().toISOString())

                                                    }
                                                }
                                                />
                                                <FileLabel htmlFor="customFile4" className="custom-file-label">
                                                { field.couponbtn.coupondata.image4 }
                                                </FileLabel>
                                            </Col>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <Form.Control type="text" 
                                                value={field.couponbtn.coupondata.url4==null ? 
                                                    field.couponbtn.coupondata.url4 : 
                                                    field.couponbtn.coupondata.url4.replace(/&amp;frasl;|&frasl;/g,"/")}
                                                onChange={
                                                    e => setField({ ...field, couponbtn: {
                                                        icon: field.couponbtn.icon,
                                                        title: field.couponbtn.title,
                                                        showbtn: field.couponbtn.showbtn,
                                                        coupondata : {
                                                            sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                            image1: field.couponbtn.coupondata.image1,
                                                            url1: field.couponbtn.coupondata.url1,
                                                            image2: field.couponbtn.coupondata.image2,
                                                            url2: field.couponbtn.coupondata.url2,
                                                            image3: field.couponbtn.coupondata.image3,
                                                            url3: field.couponbtn.coupondata.url3,
                                                            image4: field.couponbtn.coupondata.image4,
                                                            url4: e.target.value,
                                                            image5: field.couponbtn.coupondata.image5,
                                                            url5: field.couponbtn.coupondata.url5,
                                                            image6: field.couponbtn.coupondata.image6,
                                                            url6: field.couponbtn.coupondata.url6,
                                                        }
                                                    }})
                                                }/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Row>
                                            <Col xs={5}>
                                                 <ImageCol>
                                                    <img src={ previewImage.previewImage5=="" ? process.env.REACT_APP_API_URL+"/uploads/resources/"+field.couponbtn.coupondata.image5 : previewImage.previewImage5 } 
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
                                                         setField({ ...field, couponbtn: {
                                                            icon: field.couponbtn.icon,
                                                            title: field.couponbtn.title,
                                                            showbtn: field.couponbtn.showbtn,
                                                            coupondata : {
                                                                sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                                image1: field.couponbtn.coupondata.image1,
                                                                url1: field.couponbtn.coupondata.url1,
                                                                image2: field.couponbtn.coupondata.image2,
                                                                url2: field.couponbtn.coupondata.url2,
                                                                image3: field.couponbtn.coupondata.image3,
                                                                url3: field.couponbtn.coupondata.url3,
                                                                image4: field.couponbtn.coupondata.image4,
                                                                url4: field.couponbtn.coupondata.url4,
                                                                image5: e.target.files[0].name.replace(/-/g,""),
                                                                url5: field.couponbtn.coupondata.url5,
                                                                image6: field.couponbtn.coupondata.image6,
                                                                url6: field.couponbtn.coupondata.url6,
                                                            }
                                                        }})
                                                            setPreviewImage({ ...previewImage, previewImage5: URL.createObjectURL(e.target.files[0])  })
                                                            setFileDate5(new Date().toISOString())
                                                    }
                                                }
                                                />
                                                <FileLabel htmlFor="customFile5" className="custom-file-label">
                                                { field.couponbtn.coupondata.image5 }
                                                </FileLabel>
                                            </Col>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <Form.Control type="text" 
                                                value={field.couponbtn.coupondata.url5==null ? 
                                                    field.couponbtn.coupondata.url5 : 
                                                    field.couponbtn.coupondata.url5.replace(/&amp;frasl;|&frasl;/g,"/")}
                                                onChange={
                                                    e => setField({ ...field, couponbtn: {
                                                        icon: field.couponbtn.icon,
                                                        title: field.couponbtn.title,
                                                        showbtn: field.couponbtn.showbtn,
                                                        coupondata : {
                                                            sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                            image1: field.couponbtn.coupondata.image1,
                                                            url1: field.couponbtn.coupondata.url1,
                                                            image2: field.couponbtn.coupondata.image2,
                                                            url2: field.couponbtn.coupondata.url2,
                                                            image3: field.couponbtn.coupondata.image3,
                                                            url3: field.couponbtn.coupondata.url3,
                                                            image4: field.couponbtn.coupondata.image4,
                                                            url4: field.couponbtn.coupondata.url4,
                                                            image5: field.couponbtn.coupondata.image5,
                                                            url5: e.target.value,
                                                            image6: field.couponbtn.coupondata.image6,
                                                            url6: field.couponbtn.coupondata.url6,
                                                        }
                                                    }})
                                                }/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Row>
                                            <Col xs={5}>
                                                  <ImageCol>
                                                        <img src={ previewImage.previewImage6=="" ? process.env.REACT_APP_API_URL+"/uploads/resources/"+field.couponbtn.coupondata.image6 : previewImage.previewImage6 } 
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
                                                         setField({ ...field, couponbtn: {
                                                            icon: field.couponbtn.icon,
                                                            title: field.couponbtn.title,
                                                            showbtn: field.couponbtn.showbtn,
                                                            coupondata : {
                                                                sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                                image1: field.couponbtn.coupondata.image1,
                                                                url1: field.couponbtn.coupondata.url1,
                                                                image2: field.couponbtn.coupondata.image2,
                                                                url2: field.couponbtn.coupondata.url2,
                                                                image3: field.couponbtn.coupondata.image3,
                                                                url3: field.couponbtn.coupondata.url3,
                                                                image4: field.couponbtn.coupondata.image4,
                                                                url4: field.couponbtn.coupondata.url4,
                                                                image5: field.couponbtn.coupondata.image5,
                                                                url5: field.couponbtn.coupondata.url5,
                                                                image6: e.target.files[0].name.replace(/-/g,""),
                                                                url6: field.couponbtn.coupondata.url6,
                                                            }
                                                        }})
                                                            setPreviewImage({ ...previewImage, previewImage6: URL.createObjectURL(e.target.files[0])  })
                                                            setFileDate6(new Date().toISOString())
                                                    }
                                                }
                                                />
                                                <FileLabel htmlFor="customFile6" className="custom-file-label">
                                                { field.couponbtn.coupondata.image6 }
                                                </FileLabel>
                                            </Col>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <Form.Control type="text" 
                                                value={field.couponbtn.coupondata.url6==null ? 
                                                    field.couponbtn.coupondata.url6 : 
                                                    field.couponbtn.coupondata.url6.replace(/&amp;frasl;|&frasl;/g,"/")}
                                                onChange={
                                                    e => setField({ ...field, couponbtn: {
                                                        icon: field.couponbtn.icon,
                                                        title: field.couponbtn.title,
                                                        showbtn: field.couponbtn.showbtn,
                                                        coupondata : {
                                                            sponsorheader: field.couponbtn.coupondata.sponsorheader,
                                                            image1: field.couponbtn.coupondata.image1,
                                                            url1: field.couponbtn.coupondata.url1,
                                                            image2: field.couponbtn.coupondata.image2,
                                                            url2: field.couponbtn.coupondata.url2,
                                                            image3: field.couponbtn.coupondata.image3,
                                                            url3: field.couponbtn.coupondata.url3,
                                                            image4: field.couponbtn.coupondata.image4,
                                                            url4: field.couponbtn.coupondata.url4,
                                                            image5: field.couponbtn.coupondata.image5,
                                                            url5: field.couponbtn.coupondata.url5,
                                                            image6: field.couponbtn.coupondata.image6,
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
                            <div style={{ margin: "0 auto", display: cloneLoad ? "none" : "block" }}>
                                <SaveButton type="submit" value="Save" variant="outline-dark" onClick={handleUpdateClientData} style={{ display: adminLoad ? "none" : "block" }}>Save Clients Data</SaveButton>
                            </div>
                            <div style={{ margin: "0 auto", display: cloneLoad ? "block" : "none" }}>
                                <SaveButton type="submit" value="Save" variant="outline-dark" onClick={handleCloneClientDataSave} style={{ display: adminLoad ? "none" : "block" }}>Save Clients Clone Data</SaveButton>
                            </div>
                        </Row>
                    </Container>

                    <CustomLinks 
                        value={valueCustom}
                        disableAdd={disableAddCLButton}
                        adminLoad={adminLoad}
                    />
        
                    
                {/* Modal for cloning client */}
                <Modal show={showCloneModal} onHide={() => {
                    handleClearData()
                    handleCloseCloneModal()
                }} backdrop="static">
                    <Modal.Header closeButton={CloseIcon}>
                        <Modal.Title>Clone New Client</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control as="select" value={value} 
                            onChange={ e => 
                                {
                                    setValue(e.target.value)
                                    handleDisableCloneButton()
                                }
                            }>
                            <option value=""></option>
                            {
                                items.map(item => (
                                    <option key={item.id} value={item.id}>
                                        { item.clubname.replace(/%20|"/g,' ') }
                                    </option>
                                ))
                            }
                        </Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={()=>{
                            handleClearData()
                            handleCloseCloneModal()
                        }}>Cancel</Button>
                        <Button variant="primary" disabled={value=="" ? true : disableCloneButton} onClick={handleCloneClientData}>Create Clone</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal for cloning client */}
            </form>
        </Content>
        </div>
    );
}
