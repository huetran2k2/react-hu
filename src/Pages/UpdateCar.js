import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarList from './CarList';
import { useNavigate } from 'react-router-dom';

const UpdateCar = () => {
    let navigate = useNavigate();
    const [manuList, setManuList] = useState([]);
    const { id } = useParams();
    const [car, setCar] = useState({
        name: '',
        price: '',
        mf_id: '',
        image: '',
    });
    const { name, price, mf_id, image } = car;
    // const [name, setName] = useState('');
    // const [price, setPrice] = useState(0);
    // const [mf_id, setMf_id] = useState('');
    const fetchData = () => {
        return axios.get(`http://127.0.0.1:8000/api/showdetail/${id}`).then((response) =>
            setCar((prevState) => ({
                ...prevState,
                name: response.data.name,
                price: response.data.price,
                mf_id: response.data.mf_id,
                image: response.data.image,
            })),
        );
    };

    const getManu = async () => {
        const res = await axios('http://127.0.0.1:8000/api/manu');
        const manuList = res.data;
        setManuList(manuList);
    };
    useEffect(() => {
        fetchData();
        getManu();
    }, []);
    const UpdateData = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('mf_id', mf_id);
        formData.append('image', car.image);

        axios.post(`http://127.0.0.1:8000/api/update/${id}`, formData).then((res) => {
            alert('Đã Cập nhật Thành Công');
            if (res.statusText === 'OK') {
                return navigate('/');
            }
        });
    };
    const handleOnChange = (field, event) => {
        setCar((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }));
    };
    const onChangeImage = (event) => {
        const preImg = document.getElementById('preview-img');
        const file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = (e) => {
                const obj_url = URL.createObjectURL(file);
                preImg.setAttribute('src', obj_url);
                URL.revokeObjectURL(obj_url);
            };

            //
        }
        setCar((previousState) => {
            return { ...previousState, image: event.target.files[0].name };
        });

    };

    
    return (
        <div className='container'>    
        <form onSubmit={UpdateData}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1"> Name </label>
                <input type="text" name="name" className="form-control" value={name} onChange={(value) => handleOnChange('name', value)} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1"> Image </label> <input type="file" className="form-control" onChange={onChangeImage} />
                <img  id="preview-img" className="img-thumbnail img-fluid" style={{width:200} } src={image ? 'http://localhost:8000/image/' + image : '#'} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1"> Price </label>
                <input
                    type="text"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={(value) => handleOnChange('price', value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1"> Manufacturer </label>
                <select className="form-control" onChange={(value) => handleOnChange('mf_id', value)}>
              
                    {manuList.map((manu, index) => {
                        return (
                            <option value={manu.id} key={index}>
                       
                                {manu.mf_name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
                
                Submit
            </button>
        </form>
        </div>
    );
};
export default UpdateCar;
