import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const CarList = () => {
    const [car, setCar] = useState([{
        CarList: [],
        Isload: false,
        image: {}, file: {},

    }]);

    const [manuList, setManuList] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [mf_id, setMf_id] = useState('');

    const CreateData = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", name)
        formData.append("price", price)
        formData.append("mf_id", mf_id)
        formData.append("image", car.image)

        axios.post("http://127.0.0.1:8000/api/showcar", formData).then((res) => {
            alert("Đã Thêm Thành Công")
        })
    }


    const handlerImageFile = (e) => {
        setCar({
            ...car,
            file: e.target.files && e.target.files.length ? URL.createObjectURL(e.target.files[0]) : car.file,
            image: e.target.files && e.target.files.length ? e.target.files[0] : car.image,
        })
    }

    useEffect(() => {
        const getCar = async () => {
            const res = await axios("http://127.0.0.1:8000/api/showapi");
            const carList = await res.data;
            setCar({ CarList: carList, Isload: true })
        };
        const getManu = async () => {
            const res = await axios("http://127.0.0.1:8000/api/manu");
            const manuList = res.data;
            setManuList(manuList)
        };
        getManu()
        if (!car.Isload) getCar();
    }, [car]);
    const handleDelete = async (id) => {
        const res = await axios.delete(`http://127.0.0.1:8000/api/delete/${id}`);
        setCar((prevState) => ({
            CarList: prevState.CarList.data
            
        }))
    }

    return (
        <div className='container'>
            <Button variant="primary" onClick={handleShow}>
                Create
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={CreateData}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Image</label>
                            <input type="file" className="form-control" onChange={(e) => handlerImageFile(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Price</label>
                            <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Manufacturer</label>
                            <select className="form-control" onChange={(e) => setMf_id(e.target.value)}>
                                {
                                    manuList.map((manu, index) => {
                                        return (    
                                                <option value={manu.id} key={index}>{manu.mf_name} </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {car.Isload ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">name</th>
                            <th scope="col">image</th>
                            <th scope="col">price</th>
                            <th scope="col">manufacturer</th>
                            <th scope='col'>select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!!car.CarList.data && car.CarList.data.map((cars, index) => {
                            return (
                                <tr key={index}>
                                    {/* <td scope="row"></td> */}
                                    <td>{cars.name}</td>
                                    <td><img src={"http://127.0.0.1:8000/image/" + cars.image} style={{ width: '300px' }} alt="" /></td>
                                    <td>{cars.price}</td>
                                    <td>{cars.name_mfs}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleDelete(cars.id)}>Delete</button>
                                    </td>
                                    <td>
                                        <Link to ={`Update/${cars.id}`}>Update</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            ) :
                <div>No data in API </div>
            }
        </div>
    )
}
export default CarList;